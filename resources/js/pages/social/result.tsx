import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface SocialMediaResult {
    id: number;
    platform: string;
    handle: string;
    result_code: string;
    scores: Record<string, number>;
    category_name: string;
    category_description: string;
    author_name: string | null;
    author_avatar: string | null;
    author_description: string | null;
    tweet_count: number;
    completed_at: string;
}

interface Props {
    result: SocialMediaResult;
}

const personalityStyles: Record<
    string,
    { gradient: string; emoji: string; colors: string[] }
> = {
    A: {
        gradient: 'from-violet-600 via-purple-600 to-indigo-700',
        emoji: '🔮',
        colors: [
            'from-violet-500 to-indigo-600',
            'from-purple-500 to-pink-500',
            'from-cyan-500 to-blue-500',
        ],
    },
    B: {
        gradient: 'from-orange-500 via-rose-500 to-pink-600',
        emoji: '⚡',
        colors: [
            'from-orange-500 to-rose-500',
            'from-amber-500 to-yellow-500',
            'from-red-500 to-pink-500',
        ],
    },
    C: {
        gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
        emoji: '🌿',
        colors: [
            'from-emerald-500 to-teal-500',
            'from-green-500 to-lime-500',
            'from-cyan-500 to-blue-500',
        ],
    },
};

const defaultStyle = {
    gradient: 'from-gray-600 to-gray-800',
    emoji: '✨',
    colors: [
        'from-gray-500 to-gray-700',
        'from-gray-400 to-gray-600',
        'from-gray-300 to-gray-500',
    ],
};

const labelMap: Record<string, string> = {
    introvert: 'Introvert',
    extrovert: 'Extrovert',
    ambivert: 'Ambivert',
};

export default function SocialResult({ result }: Props) {
    const style = personalityStyles[result.result_code] || defaultStyle;
    const [mounted, setMounted] = useState(false);
    const [showBars, setShowBars] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setMounted(true));
        const timer = setTimeout(() => setShowBars(true), 400);
        return () => clearTimeout(timer);
    }, []);

    const scores = result.scores || {};
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const maxScore = sortedScores.length > 0 ? sortedScores[0][1] : 100;

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `Kepribadianku adalah ${result.category_name} (${result.result_code}) berdasarkan analisis tweet! 🎯`;

    const shareWhatsApp = () => {
        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`,
            '_blank',
        );
    };

    const shareTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            '_blank',
        );
    };

    const shareFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            '_blank',
        );
    };

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <>
            <Head title={`${result.category_name} - Analisis Kepribadian`} />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                {/* Hero banner */}
                <div
                    className={`relative overflow-hidden bg-gradient-to-br ${style.gradient} pt-12 pb-20 transition-all duration-700`}
                >
                    <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10" />
                    <div className="absolute top-10 -right-16 h-48 w-48 rounded-full bg-white/5" />
                    <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-white/5" />

                    <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
                        <div
                            className={`transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        >
                            {/* Avatar */}
                            {result.author_avatar && (
                                <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-white/30 shadow-xl">
                                    <img
                                        src={result.author_avatar}
                                        alt={result.handle}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                            <span className="text-5xl sm:text-6xl">
                                {style.emoji}
                            </span>
                            <p className="mt-4 text-sm font-medium tracking-widest text-white/70 uppercase">
                                Kepribadianmu
                            </p>
                            <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">
                                {result.result_code}
                            </h1>
                            <h2 className="mt-3 text-xl font-bold text-white/90 sm:text-2xl">
                                {result.category_name}
                            </h2>
                            <p className="mt-2 text-sm text-white/60">
                                @{result.handle} · {result.tweet_count} tweet
                                dianalisis
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content card */}
                <div className="mx-auto -mt-12 max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={`rounded-2xl border border-gray-200/60 bg-white/90 p-6 shadow-xl backdrop-blur-sm transition-all delay-200 duration-700 sm:p-8 dark:border-gray-700/60 dark:bg-gray-800/90 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                    >
                        {/* Author info */}
                        {result.author_name && (
                            <div className="mb-6 flex items-center gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                                {result.author_avatar && (
                                    <img
                                        src={result.author_avatar}
                                        alt=""
                                        className="h-10 w-10 rounded-full"
                                    />
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                        {result.author_name}
                                    </p>
                                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                        @{result.handle}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <p className="text-center text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
                            {result.category_description}
                        </p>

                        {/* Score bars */}
                        <div className="mt-8">
                            <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                                Skor Kepribadian
                            </h3>
                            <div className="space-y-4">
                                {sortedScores.map(([label, score], i) => {
                                    const pct = Math.round(score);
                                    const isTop = i === 0;
                                    const colorIndex = i % style.colors.length;

                                    return (
                                        <div key={label}>
                                            <div className="mb-1.5 flex items-center justify-between">
                                                <span
                                                    className={`text-sm font-semibold capitalize ${isTop ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                                                >
                                                    {labelMap[label] || label}
                                                    {isTop && (
                                                        <span className="ml-1.5 inline-flex items-center rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-gray-900">
                                                            HASIL
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="text-sm text-gray-400 tabular-nums dark:text-gray-500">
                                                    {pct}%
                                                </span>
                                            </div>
                                            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                                <div
                                                    className={`h-full rounded-full bg-gradient-to-r ${style.colors[colorIndex]} transition-all duration-1000 ease-out`}
                                                    style={{
                                                        width: showBars
                                                            ? `${pct}%`
                                                            : '0%',
                                                        transitionDelay: isTop
                                                            ? '200ms'
                                                            : '0ms',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />

                        {/* Share section */}
                        <div>
                            <h3 className="mb-4 text-center text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                                Bagikan Hasil
                            </h3>
                            <div className="grid grid-cols-4 gap-3">
                                <button
                                    onClick={shareWhatsApp}
                                    className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-green-300 hover:bg-green-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-600 dark:hover:bg-green-950/30"
                                >
                                    <svg
                                        className="h-6 w-6 text-green-500 transition group-hover:scale-110"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                                        WhatsApp
                                    </span>
                                </button>

                                <button
                                    onClick={shareTwitter}
                                    className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500"
                                >
                                    <svg
                                        className="h-6 w-6 text-gray-900 transition group-hover:scale-110 dark:text-white"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                                        X
                                    </span>
                                </button>

                                <button
                                    onClick={shareFacebook}
                                    className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/30"
                                >
                                    <svg
                                        className="h-6 w-6 text-blue-600 transition group-hover:scale-110"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                                        Facebook
                                    </span>
                                </button>

                                <button
                                    onClick={copyLink}
                                    className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500"
                                >
                                    {copied ? (
                                        <svg
                                            className="h-6 w-6 text-green-500 transition group-hover:scale-110"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6 text-gray-400 transition group-hover:scale-110"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                            />
                                        </svg>
                                    )}
                                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                                        {copied ? 'Tersalin!' : 'Salin Link'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex gap-3">
                            <a
                                href="/quiz/sosial-media"
                                className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-center text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500"
                            >
                                Analisis Lagi
                            </a>
                            <a
                                href="/quiz"
                                className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-center text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500"
                            >
                                Kuis Lainnya
                            </a>
                        </div>
                    </div>

                    <div className="h-12" />
                </div>
            </div>
        </>
    );
}
