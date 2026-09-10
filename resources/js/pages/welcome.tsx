import { Head } from '@inertiajs/react';
import AuthNav from '@/components/auth-nav';

export default function Welcome() {
    return (
        <>
            <Head title="PersoTest — Temukan Kepribadianmu" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                {/* Hero */}
                <div className="relative overflow-hidden">
                    <div className="absolute top-4 right-4 z-20">
                        <AuthNav light />
                    </div>
                    <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/10" />
                    <div className="absolute top-20 -right-20 h-72 w-72 rounded-full bg-purple-500/10" />
                    <div className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-pink-500/5" />

                    <div className="relative mx-auto max-w-4xl px-4 pt-20 pb-20 text-center sm:px-6 lg:px-8">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            Personality Analysis Platform
                        </div>

                        {/* Logo / Title */}
                        <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Perso
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Test
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">
                            Temukan tipe kepribadianmu melalui kuis interaktif
                            atau analisis postingan sosial media.
                        </p>

                        {/* CTA */}
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="/quiz"
                                className="group flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-gray-900 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                            >
                                <span className="text-lg">🧠</span>
                                Mulai Kuis
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
                            </a>
                            <a
                                href="/quiz/sosial-media"
                                className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10"
                            >
                                <span className="text-lg">🔍</span>
                                Analisis Sosmed
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
                            </a>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="border-t border-white/5 bg-gray-900/50">
                    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
                        <div className="grid gap-8 sm:grid-cols-2">
                            {/* Quiz Feature */}
                            <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl shadow-lg shadow-blue-500/20">
                                    🧠
                                </div>
                                <h2 className="mt-5 text-xl font-bold text-white">
                                    Kuis Kepribadian
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                                    Jawab pertanyaan singkat dan temukan apakah
                                    kamu Introvert, Extrovert, atau Ambivert.
                                    Hasil langsung dan bisa dibagikan ke sosmed.
                                </p>
                                <a
                                    href="/quiz"
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                                >
                                    Mulai Sekarang
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
                                </a>
                            </div>

                            {/* Social Media Feature */}
                            <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-2xl shadow-lg shadow-purple-500/20">
                                    🔍
                                </div>
                                <h2 className="mt-5 text-xl font-bold text-white">
                                    Analisis Sosmed
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                                    Masukkan username sosial media dan biarkan
                                    AI menganalisis kepribadianmu berdasarkan
                                    postingan. Mendukung X (Twitter), Instagram,
                                    dan lainnya.
                                </p>
                                <a
                                    href="/quiz/sosial-media"
                                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 transition hover:text-purple-300"
                                >
                                    Coba Sekarang
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
                                </a>
                            </div>
                        </div>

                        {/* Platform logos hint */}
                        <div className="mt-16 text-center">
                            <p className="text-xs font-medium tracking-widest text-gray-500 uppercase">
                                Segera hadir
                            </p>
                            <div className="mt-4 flex items-center justify-center gap-6">
                                {[
                                    {
                                        name: 'Instagram',
                                        color: 'from-pink-500 to-orange-400',
                                    },
                                    {
                                        name: 'Facebook',
                                        color: 'from-blue-600 to-blue-500',
                                    },
                                    {
                                        name: 'Threads',
                                        color: 'from-gray-300 to-gray-400',
                                    },
                                    {
                                        name: 'TikTok',
                                        color: 'from-gray-800 to-gray-900',
                                    },
                                ].map((p) => (
                                    <div
                                        key={p.name}
                                        className="flex flex-col items-center gap-1.5 opacity-40"
                                    >
                                        <div
                                            className={`h-8 w-8 rounded-full bg-gradient-to-br ${p.color}`}
                                        />
                                        <span className="text-[10px] text-gray-500">
                                            {p.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-white/5 py-8 text-center">
                    <p className="text-xs text-gray-500">
                        © 2026{' '}
                        <span className="font-semibold text-gray-400">
                            PersoTest
                        </span>
                        . Personality analysis powered by AI.
                    </p>
                </div>
            </div>
        </>
    );
}
