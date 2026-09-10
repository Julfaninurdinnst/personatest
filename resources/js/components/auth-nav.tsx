import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
}

export default function AuthNav({ light = false }: { light?: boolean }) {
    const { auth } = usePage<{ auth: { user: AuthUser | null } }>().props;
    const user = auth?.user ?? null;
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        if (meta) {
            setCsrfToken(meta.getAttribute('content') || '');
        }
    }, []);

    if (user) {
        return (
            <form
                method="POST"
                action="/logout"
                className="flex items-center gap-2"
            >
                <input type="hidden" name="_token" value={csrfToken} />
                <span className="flex items-center gap-2">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt=""
                            className="h-8 w-8 rounded-full border border-white/20 object-cover"
                        />
                    ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-800 text-xs font-bold text-white dark:from-gray-200 dark:to-gray-400 dark:text-gray-900">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    )}
                    <span
                        className={`hidden text-sm font-medium sm:inline ${light ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                        {user.name}
                    </span>
                </span>
                <button
                    type="submit"
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        light
                            ? 'border border-white/20 text-white/80 hover:bg-white/10'
                            : 'border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                >
                    Keluar
                </button>
            </form>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${light ? '' : ''}`}>
            <a
                href="/login"
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    light
                        ? 'border border-white/20 text-white hover:bg-white/10'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
                Masuk
            </a>
            <a
                href="/register"
                className="rounded-full bg-gradient-to-r from-gray-900 to-gray-700 px-4 py-1.5 text-xs font-semibold text-white shadow transition hover:scale-[1.02] dark:from-white dark:to-gray-200 dark:text-gray-900"
            >
                Daftar
            </a>
        </div>
    );
}
