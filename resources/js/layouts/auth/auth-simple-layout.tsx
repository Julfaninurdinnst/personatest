import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-400/10" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/5 blur-2xl dark:bg-pink-400/5" />

            <div className="relative z-10 w-full max-w-md">
                <div className="rounded-3xl border border-gray-200/70 bg-white/85 p-8 shadow-2xl shadow-gray-200/40 backdrop-blur-md sm:p-10 dark:border-gray-600/60 dark:bg-gray-800/85 dark:shadow-black/40">
                    <div className="mb-8 flex flex-col items-center gap-3 text-center">
                        <Link
                            href={home()}
                            className="inline-flex items-center gap-2.5 text-2xl font-black tracking-tight text-gray-900 dark:text-white"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/25">
                                <AppLogoIcon className="h-5 w-5 fill-current" />
                            </span>
                            Perso
                            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                                Test
                            </span>
                        </Link>

                        {title && (
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {title}
                            </h1>
                        )}

                        {description && (
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                {description}
                            </p>
                        )}
                    </div>

                    {children}

                    <div className="mt-8 flex items-center justify-center gap-2 border-t border-gray-100 pt-6 text-xs font-medium text-gray-400 dark:border-gray-700/60 dark:text-gray-500">
                        <span>⚡ Hasil instan</span>
                        <span className="text-gray-300 dark:text-gray-600">
                            ·
                        </span>
                        <span>🔒 Aman & privat</span>
                        <span className="text-gray-300 dark:text-gray-600">
                            ·
                        </span>
                        <span>🆓 Gratis</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
