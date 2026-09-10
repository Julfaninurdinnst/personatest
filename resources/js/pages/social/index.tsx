import { Head, useForm, usePage } from '@inertiajs/react';
import AuthNav from '@/components/auth-nav';
import { useState } from 'react';

interface Platform {
    id: string;
    name: string;
    icon: React.ReactNode;
    enabled: boolean;
    color: string;
}

const platforms: Platform[] = [
    {
        id: 'twitter',
        name: 'X (Twitter)',
        enabled: true,
        color: 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        id: 'instagram',
        name: 'Instagram',
        enabled: false,
        color: 'border-pink-300 bg-pink-50 text-pink-600 dark:border-pink-700 dark:bg-pink-950/30 dark:text-pink-400',
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle
                    cx="17.5"
                    cy="6.5"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                />
            </svg>
        ),
    },
    {
        id: 'facebook',
        name: 'Facebook',
        enabled: false,
        color: 'border-blue-300 bg-blue-50 text-blue-600 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
    {
        id: 'threads',
        name: 'Threads',
        enabled: false,
        color: 'border-gray-300 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300',
        icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.34-.776-.963-1.394-1.803-1.79-.128 2.754-1.19 5.072-3.988 6.022-.56.19-1.16.278-1.776.268-2.31-.037-4.027-1.212-4.47-3.062-.332-1.378.153-3.02 1.42-4.777.814-1.122 1.887-1.962 3.134-2.472l.05-.02c.968-.386 2.003-.632 3.065-.734a14.07 14.07 0 0 1 .595-.024c.559 0 1.11.05 1.645.147l.252.06c.38.102.742.236 1.087.4.875.417 1.498 1.103 1.832 2.02.36.996.319 2.193-.118 3.533-.57 1.745-1.995 2.98-4.168 3.598-.538.153-1.102.227-1.68.22zm-.588-8.063c-.057 0-.115.001-.173.004-1.354.066-2.474.452-3.31 1.14-.698.577-1.151 1.345-1.345 2.271-.253 1.212.228 2.484 1.38 3.27.964.656 2.16.784 3.17.356 1.617-.687 2.365-2.56 2.116-4.708a7.17 7.17 0 0 0-.26-.848c-.482-1.276-1.36-1.416-1.578-1.485z" />
            </svg>
        ),
    },
];

export default function SocialIndex() {
    const { auth } = usePage<{ auth: { user: { id: number } | null } }>().props;
    const isLoggedIn = !!auth?.user;

    const { data, setData, post, processing, errors } = useForm({
        username: '',
        platform: 'twitter',
    });

    const [selectedPlatform, setSelectedPlatform] = useState('twitter');

    const handleSubmit = () => {
        setData('platform', selectedPlatform);
        post('/quiz/sosial-media/analyze');
    };

    const handlePlatformSelect = (platform: Platform) => {
        if (!platform.enabled) return;
        setSelectedPlatform(platform.id);
        setData('platform', platform.id);
    };

    return (
        <>
            <Head title="Analisis Kepribadian dari Sosmed — PersoTest" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 pt-16 pb-16">
                    <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10" />
                    <div className="absolute top-5 -right-10 h-48 w-48 rounded-full bg-white/5" />
                    <div className="absolute top-4 right-4 z-20">
                        <AuthNav light />
                    </div>
                    <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-white/5" />

                    <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
                        <a
                            href="/"
                            className="inline-flex items-center gap-1 text-sm text-white/50 transition hover:text-white/80"
                        >
                            ← PersoTest
                        </a>
                        <span className="mt-4 block text-5xl">🔍</span>
                        <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                            Analisis dari Sosmed
                        </h1>
                        <p className="mt-3 text-sm text-white/70 sm:text-base">
                            Pilih platform, masukkan username, dan temukan tipe
                            kepribadianmu
                        </p>
                    </div>
                </div>

                {/* Form card */}
                <div className="mx-auto -mt-8 max-w-2xl px-4 sm:px-6 lg:px-8">
                    {!isLoggedIn ? (
                        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/90">
                            <span className="text-4xl">🔒</span>
                            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                                Login untuk Menganalisis
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Kamu harus login atau daftar terlebih dahulu
                                untuk menganalisis kepribadian dari sosial
                                media.
                            </p>
                            <div className="mt-6 flex gap-3">
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
                        <div className="rounded-2xl border border-gray-200/60 bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-8 dark:border-gray-700/60 dark:bg-gray-800/90">
                            {processing ? (
                                /* Loading state */
                                <div className="py-8 text-center">
                                    <div className="relative mx-auto h-20 w-20">
                                        <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
                                        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-purple-600 dark:border-t-purple-400" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl">🧠</span>
                                        </div>
                                    </div>
                                    <h2 className="mt-6 text-lg font-bold text-gray-900 dark:text-white">
                                        Sedang Menganalisis
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Mengambil data dari{' '}
                                        {
                                            platforms.find(
                                                (p) =>
                                                    p.id === selectedPlatform,
                                            )?.name
                                        }{' '}
                                        dan menganalisis...
                                    </p>
                                    <div className="mt-6 space-y-2">
                                        {[
                                            'Mengambil data postingan',
                                            'Menganalisis dengan AI',
                                            'Menentukan tipe kepribadian',
                                        ].map((text, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500"
                                            >
                                                <div
                                                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-500"
                                                    style={{
                                                        animationDelay: `${i * 300}ms`,
                                                    }}
                                                />
                                                {text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Platform selector */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Pilih Platform
                                        </label>
                                        <div className="mt-3 grid grid-cols-2 gap-3">
                                            {platforms.map((platform) => (
                                                <button
                                                    key={platform.id}
                                                    type="button"
                                                    onClick={() =>
                                                        handlePlatformSelect(
                                                            platform,
                                                        )
                                                    }
                                                    disabled={!platform.enabled}
                                                    className={`relative flex items-center gap-3 rounded-xl border-2 p-3.5 text-left text-sm font-medium transition-all duration-200 ${
                                                        selectedPlatform ===
                                                            platform.id &&
                                                        platform.enabled
                                                            ? platform.color +
                                                              ' scale-[1.01] shadow-md'
                                                            : platform.enabled
                                                              ? 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-500'
                                                              : 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600'
                                                    }`}
                                                >
                                                    {platform.icon}
                                                    <span>{platform.name}</span>
                                                    {!platform.enabled && (
                                                        <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                                            SOON
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Username input */}
                                    <div className="mt-6">
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                                        >
                                            Username
                                        </label>
                                        <div className="relative mt-2">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
                                                @
                                            </span>
                                            <input
                                                id="username"
                                                type="text"
                                                value={data.username}
                                                onChange={(e) =>
                                                    setData(
                                                        'username',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={
                                                    selectedPlatform ===
                                                    'twitter'
                                                        ? 'username'
                                                        : 'username'
                                                }
                                                className="block w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-8 text-sm text-gray-900 placeholder-gray-400 transition focus:border-purple-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-purple-400"
                                                autoFocus
                                                autoComplete="off"
                                            />
                                        </div>
                                        {errors.username && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.username}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit button */}
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={
                                                !data.username.trim() ||
                                                !platforms.find(
                                                    (p) =>
                                                        p.id ===
                                                        selectedPlatform,
                                                )?.enabled
                                            }
                                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                                        >
                                            Analisis Kepribadian
                                            <svg
                                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                                        </button>
                                    </div>

                                    {/* Info */}
                                    <div className="mt-6 rounded-xl bg-purple-50 p-4 dark:bg-purple-950/30">
                                        <div className="flex gap-3">
                                            <svg
                                                className="h-5 w-5 flex-shrink-0 text-purple-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <div className="text-xs leading-relaxed text-purple-700 dark:text-purple-300">
                                                <p className="font-semibold">
                                                    Bagaimana cara kerjanya?
                                                </p>
                                                <p className="mt-1">
                                                    Kami mengambil postingan
                                                    terakhirmu dan
                                                    menganalisisnya menggunakan
                                                    AI untuk menentukan tipe
                                                    kepribadianmu. Analisis
                                                    bersifat probabilistik.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="h-12" />
                </div>
            </div>
        </>
    );
}
