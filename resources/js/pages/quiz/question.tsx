import { Head } from '@inertiajs/react';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

interface Option {
    id: number;
    option_text: string;
    score_a: number;
    score_b: number;
    score_c: number;
    order: number;
}

interface Question {
    id: number;
    question_text: string;
    options: Option[];
    order: number;
}

interface Quiz {
    id: number;
    title: string;
    slug: string;
}

interface Props {
    quiz: Quiz;
    questions: Question[];
}

export default function QuizQuestion({ quiz, questions }: Props) {
    const total = questions.length;
    const storageKey = `quiz-${quiz.slug}-answers`;

    const [current, setCurrent] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(
        null,
    );
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const stored = sessionStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                setAnswers(parsed);
                const firstSaved = parsed[questions[0]?.id];
                setSelectedOptionId(firstSaved ?? null);
            }
        } catch {}
        setHydrated(true);

        const meta = document.querySelector('meta[name="csrf-token"]');
        if (meta) {
            setCsrfToken(meta.getAttribute('content') || '');
        }
    }, []);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [animating, setAnimating] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const saved = answers[questions[current]?.id];
        setSelectedOptionId(saved ?? null);
    }, [current]);

    const saveAnswer = useCallback(
        (optionId: number) => {
            setAnswers((prev) => {
                const next = { ...prev, [questions[current].id]: optionId };
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem(storageKey, JSON.stringify(next));
                }
                return next;
            });
        },
        [current, questions, storageKey],
    );

    const handleSelect = (optionId: number) => {
        setSelectedOptionId(optionId);
        saveAnswer(optionId);
    };

    const goTo = (nextIndex: number, dir: 'next' | 'prev') => {
        if (animating) return;
        setDirection(dir);
        setAnimating(true);
        setTimeout(() => {
            setCurrent(nextIndex);
            setTimeout(() => setAnimating(false), 50);
        }, 200);
    };

    const handleNext = () => {
        if (!selectedOptionId) return;
        if (current < total - 1) {
            goTo(current + 1, 'next');
        }
    };

    const handlePrev = () => {
        if (current > 0) {
            goTo(current - 1, 'prev');
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        setSubmitting(true);
    };

    const question = questions[current];
    const progress = ((current + 1) / total) * 100;
    const isLast = current === total - 1;

    return (
        <>
            <Head title={`${quiz.title}`} />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Back button */}
                    {current === 0 ? (
                        <a
                            href={`/quiz/${quiz.slug}`}
                            className="inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
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
                            Kembali
                        </a>
                    ) : (
                        <button
                            onClick={handlePrev}
                            className="inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
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
                            Sebelumnya
                        </button>
                    )}

                    {/* Progress bar */}
                    <div className="mt-6">
                        <div className="mb-3 flex items-center justify-between text-xs font-medium text-gray-400 dark:text-gray-500">
                            <span>
                                Pertanyaan {current + 1} dari {total}
                            </span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-gray-700 to-gray-900 transition-all duration-500 ease-out dark:from-white dark:to-gray-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Question card with transition */}
                    <div className="relative mt-8 overflow-hidden">
                        <div
                            className="transition-all duration-300 ease-out"
                            style={{
                                opacity: animating ? 0 : 1,
                                transform: animating
                                    ? direction === 'next'
                                        ? 'translateX(-30px)'
                                        : 'translateX(30px)'
                                    : 'translateX(0)',
                            }}
                        >
                            <div className="rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8 dark:border-gray-700/60 dark:bg-gray-800/80">
                                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                                    {question.question_text}
                                </h2>

                                <div className="mt-6 space-y-3">
                                    {question.options.map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() =>
                                                handleSelect(option.id)
                                            }
                                            disabled={submitting}
                                            className={`group w-full rounded-xl border-2 p-4 text-left text-sm transition-all duration-200 ${
                                                selectedOptionId === option.id
                                                    ? 'scale-[1.01] border-gray-900 bg-gray-900 text-white shadow-lg dark:border-white dark:bg-white dark:text-gray-900'
                                                    : 'border-gray-200 bg-white text-gray-700 hover:scale-[1.005] hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500'
                                            }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                <span
                                                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                                                        selectedOptionId ===
                                                        option.id
                                                            ? 'border-white bg-white/20 text-white dark:border-gray-900 dark:bg-gray-900/20 dark:text-gray-900'
                                                            : 'border-gray-300 text-gray-400 group-hover:border-gray-400 dark:border-gray-600 dark:group-hover:border-gray-500'
                                                    }`}
                                                >
                                                    {option.order}
                                                </span>
                                                {option.option_text}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Action button */}
                                <div className="mt-8">
                                    {isLast ? (
                                        <form
                                            method="POST"
                                            action={`/quiz/${quiz.slug}/submit`}
                                            onSubmit={handleSubmit}
                                        >
                                            <input
                                                type="hidden"
                                                name="_token"
                                                value={csrfToken}
                                            />
                                            {Object.entries(answers).map(
                                                ([questionId, optionId]) => (
                                                    <input
                                                        key={questionId}
                                                        type="hidden"
                                                        name="answers[]"
                                                        value={optionId}
                                                    />
                                                ),
                                            )}
                                            <button
                                                type="submit"
                                                disabled={
                                                    !selectedOptionId ||
                                                    submitting
                                                }
                                                className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 dark:from-white dark:to-gray-200 dark:text-gray-900"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    {submitting ? (
                                                        <>
                                                            <svg
                                                                className="h-4 w-4 animate-spin"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                />
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                                />
                                                            </svg>
                                                            Memproses...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Lihat Hasil
                                                            <svg
                                                                className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M9 5l7 7-7 7"
                                                                />
                                                            </svg>
                                                        </>
                                                    )}
                                                </span>
                                            </button>
                                        </form>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            disabled={
                                                !selectedOptionId || submitting
                                            }
                                            className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 dark:from-white dark:to-gray-200 dark:text-gray-900"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Selanjutnya
                                                <svg
                                                    className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5"
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
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dot indicators */}
                    <div className="mt-6 flex items-center justify-center gap-1.5">
                        {questions.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    if (!animating) {
                                        goTo(i, i > current ? 'next' : 'prev');
                                    }
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === current
                                        ? 'w-6 bg-gray-900 dark:bg-white'
                                        : i < current ||
                                            answers[questions[i]?.id]
                                          ? 'w-1.5 bg-gray-400 dark:bg-gray-500'
                                          : 'w-1.5 bg-gray-200 dark:bg-gray-700'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
