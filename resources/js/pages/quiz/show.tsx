import { Head } from '@inertiajs/react';
import AuthNav from '@/components/auth-nav';
import { useEffect, useState } from 'react';

interface Category {
    id: number;
    code: string;
    name: string;
    description: string;
}

interface Quiz {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    questions_count: number;
    estimated_minutes: number;
    level: string;
    categories: Category[];
}

interface Props {
    quiz: Quiz;
    is_locked?: boolean;
}

const categoryEmoji: Record<string, string> = { A: '🔮', B: '⚡', C: '🌿' };
const categoryColor: Record<string, string> = {
    A: 'from-violet-500 to-indigo-600',
    B: 'from-orange-500 to-rose-500',
    C: 'from-emerald-500 to-teal-500',
};

const levelConfig: Record<
    string,
    { label: string; emoji: string; badge: string }
> = {
    sederhana: {
        label: 'Sederhana',
        emoji: '⚡',
        badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
    },
    lengkap: {
        label: 'Lengkap',
        emoji: '📊',
        badge: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
    },
    mendalam: {
        label: 'Mendalam & Akurat',
        emoji: '🔬',
        badge: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
    },
};

export default function QuizShow({ quiz, is_locked = false }: Props) {
    const [mounted, setMounted] = useState(false);
    const level = levelConfig[quiz.level] || levelConfig.lengkap;

    useEffect(() => {
        requestAnimationFrame(() => setMounted(true));
    }, []);

    return (
        <>
            <Head title={`${quiz.title} — PersoTest`} />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-12 pb-12 dark:from-white dark:via-gray-100 dark:to-white">
                    <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/5 dark:bg-gray-900/5" />
                    <div className="absolute top-5 -right-10 h-48 w-48 rounded-full bg-white/5 dark:bg-gray-900/5" />
                    <div className="absolute top-4 right-4 z-20">
                        <AuthNav light />
                    </div>

                    <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                        <a
                            href="/quiz"
                            className="inline-flex items-center gap-1 text-sm text-gray-400 transition hover:text-white dark:text-gray-500 dark:hover:text-gray-900"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Semua Kuis
                        </a>

                        <div className="mt-8 text-center">
                            <span
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${level.badge}`}
                            >
                                {level.emoji} {level.label}
                            </span>
                            <h1 className="mt-4 text-2xl font-black text-white sm:text-3xl dark:text-gray-900">
                                {quiz.title}
                            </h1>
                            {quiz.description && (
                                <p className="mt-3 text-sm text-gray-400 sm:text-base dark:text-gray-500">
                                    {quiz.description}
                                </p>
                            )}
                            <div className="mt-4 flex items-center justify-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <svg
                                        className="h-3.5 w-3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {quiz.questions_count} pertanyaan
                                </span>
                                <span>·</span>
                                <span className="flex items-center gap-1">
                                    <svg
                                        className="h-3.5 w-3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    ±{quiz.estimated_minutes} menit
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mx-auto -mt-6 max-w-2xl px-4 sm:px-6 lg:px-8">
                    {/* Categories preview */}
                    {quiz.categories.length > 0 && (
                        <div
                            className={`rounded-2xl border border-gray-200/60 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all delay-100 duration-500 dark:border-gray-700/60 dark:bg-gray-800/90 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        >
                            <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                                Kemungkinan Hasil
                            </h3>
                            <div className="space-y-3">
                                {quiz.categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50"
                                    >
                                        <div
                                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${categoryColor[category.code] || 'from-gray-500 to-gray-600'} text-lg text-white shadow-md`}
                                        >
                                            {categoryEmoji[category.code] ||
                                                '✨'}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">
                                                {category.code} —{' '}
                                                {category.name}
                                            </div>
                                            <div className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                                                {category.description}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Start button / login gate */}
                    <div
                        className={`mt-4 transition-all delay-200 duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    >
                        {is_locked ? (
                            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white/70 p-6 text-center dark:border-gray-600 dark:bg-gray-800/70">
                                <span className="text-3xl">🔒</span>
                                <h3 className="mt-3 text-base font-bold text-gray-900 dark:text-white">
                                    Login untuk mengikuti kuis ini
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Kuis {level.label.toLowerCase()} butuh akun
                                    agar hasil analisismu tersimpan.
                                </p>
                                <div className="mt-5 flex gap-3">
                                    <a
                                        href="/login"
                                        className="flex-1 rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 px-4 py-3 text-center text-sm font-bold text-white shadow-lg transition hover:scale-[1.01] dark:from-white dark:to-gray-200 dark:text-gray-900"
                                    >
                                        Masuk
                                    </a>
                                    <a
                                        href="/register"
                                        className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                    >
                                        Daftar
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <a
                                href={`/quiz/${quiz.slug}/question`}
                                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4 text-base font-bold text-white shadow-xl transition-all duration-200 hover:scale-[1.01] hover:shadow-2xl dark:from-white dark:to-gray-200 dark:text-gray-900"
                            >
                                Mulai Kuis
                                <svg
                                    className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>

                    <div className="h-12" />
                </div>
            </div>
        </>
    );
}
