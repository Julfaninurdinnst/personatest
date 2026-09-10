<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    private const PROVIDERS = ['google', 'github'];

    public function redirect(string $provider): RedirectResponse
    {
        abort_unless(in_array($provider, self::PROVIDERS, true), 404);

        $config = config("services.{$provider}");

        if (empty($config['client_id']) || empty($config['client_secret'])) {
            return redirect()->route('login')->withErrors([
                'email' => "Login {$provider} belum dikonfigurasi. Coba gunakan email & password atau daftar manual.",
            ]);
        }

        $driver = Socialite::driver($provider);

        if ($provider === 'github') {
            $driver->scopes(['user:email']);
        }

        return $driver->redirect();
    }

    public function callback(string $provider): RedirectResponse
    {
        abort_unless(in_array($provider, self::PROVIDERS, true), 404);

        try {
            $socialUser = Socialite::driver($provider)->user();

            if ($provider === 'github' && ! $socialUser->getEmail()) {
                $emails = Socialite::driver($provider)
                    ->scopes(['user:email'])
                    ->user()->getRaw()['emails'] ?? [];

                $verifiedEmail = collect($emails)
                    ->map(fn ($email) => (array) $email)
                    ->firstWhere('verified', true)['email'] ?? null;
            }
        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors([
                'email' => 'Gagal login melalui ' . ucfirst($provider) . '. Silakan coba lagi.',
            ]);
        }

        $email = $socialUser->getEmail() ?? $verifiedEmail ?? null;
        $providerId = $socialUser->getId();

        $user = User::query()
            ->where('auth_provider', $provider)
            ->where('auth_provider_id', $providerId)
            ->first();

        if (! $user && $email) {
            $user = User::where('email', $email)->first();

            if ($user) {
                $user->forceFill([
                    'auth_provider' => $provider,
                    'auth_provider_id' => $providerId,
                    'avatar' => $socialUser->getAvatar(),
                ])->save();
            }
        }

        if (! $user) {
            $user = User::create([
                'name' => $socialUser->getName() ?: $socialUser->getNickname() ?: $providerId,
                'email' => $email ?: sprintf('%s-%s@oauth.local', $provider, $providerId),
                'password' => null,
                'auth_provider' => $provider,
                'auth_provider_id' => $providerId,
                'avatar' => $socialUser->getAvatar(),
                'email_verified_at' => now(),
            ]);
        }

        Auth::login($user, true);

        return redirect()->intended(config('fortify.home', '/'));
    }
}