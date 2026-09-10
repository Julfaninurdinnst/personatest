import { Head } from '@inertiajs/react';
import AuthNav from '@/components/auth-nav';

interface Quiz {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    questions_count: number;
    level: string;
    estimated_minutes: number;
}

interface Props {
    quizzes: Quiz[];
}

const levelConfig: Record<
    string,
    { label: string; badge: string; chip: string }
> = {
    sederhana: {
        label: 'Sederhana',
        badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
        chip: 'from-emerald-500 to-teal-500',
    },
    lengkap: {
        label: 'Lengkap',
        badge: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
        chip: 'from-orange-500 to-rose-500',
    },
    mendalam: {
        label: 'Mendalam & Akurat',
        badge: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
        chip: 'from-purple-500 to-indigo-600',
    },
};

const levelEmoji: Record<string, string> = {
    sederhana: '⚡',
    lengkap: '📊',
    mendalam: '🔬',
};

export default function QuizIndex({ quizzes }: Props) {
    return (
        <>
            <Head title="Personality Quiz — PersoTest" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-16 dark:from-white dark:via-gray-100 dark:to-white">
                    <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/5 dark:bg-gray-900/5" />
                    <div className="absolute top-5 -right-10 h-48 w-48 rounded-full bg-white/5 dark:bg-gray-900/5" />
                    <div className="absolute top-4 right-4 z-20">
                        <AuthNav light />
                    </div>

                    <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
                        <a
                            href="/"
                            className="inline-flex items-center gap-1 text-sm text-gray-400 transition hover:text-white dark:text-gray-500 dark:hover:text-gray-900"
                        >
                            ← PersoTest
                        </a>
                        <span className="mt-4 block text-5xl">🧠</span>
                        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl dark:text-gray-900">
                            Personality Quiz
                        </h1>
                        <p className="mt-3 text-sm text-gray-400 sm:text-base dark:text-gray-500">
                            Pilih tingkatan kuis sesuai yang kamu butuhkan
                        </p>
                    </div>
                </div>

                {/* Quiz list */}
                <div className="mx-auto -mt-8 max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {quizzes.map((quiz) => {
                            const level =
                                levelConfig[quiz.level] || levelConfig.lengkap;

                            return (
                                <a
                                    key={quiz.id}
                                    href={`/quiz/${quiz.slug}`}
                                    className="group block rounded-2xl border border-gray-200/60 bg-white/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-[1.005] hover:border-gray-300 hover:shadow-xl dark:border-gray-700/60 dark:bg-gray-800/90 dark:hover:border-gray-500"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {/* Level badge + title */}
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${level.badge}`}
                                                >
                                                    {levelEmoji[quiz.level]}{' '}
                                                    {level.label}
                                                </span>
                                                {(quiz.level === 'lengkap' ||
                                                    quiz.level ===
                                                        'mendalam') && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[11px] font-bold text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                                        <svg
                                                            className="h-3 w-3"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                            />
                                                        </svg>
                                                        Perlu Login
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="mt-3 text-lg font-bold text-gray-900 transition group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-200">
                                                {quiz.title}
                                            </h2>
                                            {quiz.description && (
                                                <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                                    {quiz.description}
                                                </p>
                                            )}
                                            <div className="mt-3 flex items-center gap-3 text-xs font-medium text-gray-400 dark:text-gray-500">
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
                                                    {quiz.questions_count}{' '}
                                                    pertanyaan
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
                                                    ±{quiz.estimated_minutes}{' '}
                                                    menit
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${level.chip} text-white shadow-md transition group-hover:scale-110`}
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
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}

                        {quizzes.length === 0 && (
                            <div className="rounded-2xl border border-gray-200/60 bg-white/90 p-12 text-center shadow-lg backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-800/90">
                                <span className="text-4xl">🔍</span>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">
                                    Belum ada kuis tersedia
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="h-12" />
                </div>
            </div>
        </>
    );
}
