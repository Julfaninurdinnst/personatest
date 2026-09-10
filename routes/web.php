<?php

use App\Http\Controllers\QuizController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\SocialMediaController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware('guest')->group(function () {
    Route::get('auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])
        ->where('provider', 'google|github')
        ->name('auth.provider.redirect');

    Route::get('auth/{provider}/callback', [SocialAuthController::class, 'callback'])
        ->where('provider', 'google|github')
        ->name('auth.provider.callback');
});

Route::get('quiz', [QuizController::class, 'index'])->name('quiz.index');

Route::get('quiz/sosial-media', [SocialMediaController::class, 'index'])->name('social.index');

Route::middleware('auth')->group(function () {
    Route::post('quiz/sosial-media/analyze', [SocialMediaController::class, 'analyze'])->name('social.analyze');
});

Route::get('quiz/sosial-media/result/{id}', [SocialMediaController::class, 'result'])->name('social.result');

Route::get('quiz/{slug}', [QuizController::class, 'show'])->name('quiz.show');
Route::get('quiz/{slug}/question', [QuizController::class, 'question'])->name('quiz.question');
Route::post('quiz/{slug}/submit', [QuizController::class, 'submit'])->name('quiz.submit');
Route::get('quiz/{slug}/result/{id}', [QuizController::class, 'result'])->name('quiz.result');

require __DIR__.'/settings.php';
