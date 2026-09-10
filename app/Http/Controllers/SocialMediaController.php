<?php

namespace App\Http\Controllers;

use App\Models\SocialMediaResult;
use App\Services\PersonalityAnalyzer;
use App\Services\TwitterService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SocialMediaController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('social/index');
    }

    public function analyze(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|min:1|max:50',
            'platform' => 'required|string|in:twitter,instagram,facebook,threads',
        ]);

        $platform = $validated['platform'];

        if ($platform !== 'twitter') {
            return back()->withErrors([
                'username' => 'Platform "'.$platform.'" belum tersedia. Gunakan X (Twitter) untuk sekarang.',
            ])->withInput();
        }

        $handle = ltrim(trim($validated['username']), '@');

        $twitterService = new TwitterService;
        $twitterData = $twitterService->getRecentTweets($handle, 20);

        if (isset($twitterData['error'])) {
            return back()->withErrors([
                'username' => $twitterData['error'],
            ])->withInput();
        }

        if (empty($twitterData['tweets'])) {
            return back()->withErrors([
                'username' => 'Tidak ada tweet yang ditemukan.',
            ])->withInput();
        }

        $combinedText = $twitterService->combineTweetsForAnalysis($twitterData['tweets']);

        $analyzer = new PersonalityAnalyzer;
        $analysis = $analyzer->analyze($combinedText);

        if (isset($analysis['error'])) {
            return back()->withErrors([
                'username' => $analysis['error'],
            ])->withInput();
        }

        $categoryDescriptions = [
            'A' => 'Kamu adalah tipe orang yang lebih suka berada di lingkungan yang tenang. Kamu menikmati waktu sendiri atau bersama orang-orang terdekat. Kamu cenderung memikirkan sesuatu dengan matang sebelum bertindak, dan memiliki kedalaman emosional yang tinggi.',
            'B' => 'Kamu adalah tipe orang yang suka bergaul dan berinteraksi dengan banyak orang. Kamu mendapatkan energi dari aktivitas sosial, suka berbicara, dan cenderung bertindak spontan. Lingkungan yang ramai membuatmu merasa bersemangat.',
            'C' => 'Kamu memiliki keseimbangan antara sifat pendiam dan aktif. Kamu bisa menikmati waktu sendiri maupun bersama orang lain, tergantung situasi. Kamu fleksibel dan mudah beradaptasi dengan berbagai kondisi sosial.',
        ];

        $categoryNames = [
            'A' => 'Pendiam (Introvert)',
            'B' => 'Aktif (Extrovert)',
            'C' => 'Seimbang (Ambivert)',
        ];

        $resultCode = $analysis['result_code'];

        $result = SocialMediaResult::create([
            'platform' => $platform,
            'handle' => $handle,
            'result_code' => $resultCode,
            'scores' => $analysis['scores'],
            'category_name' => $categoryNames[$resultCode] ?? 'Unknown',
            'category_description' => $categoryDescriptions[$resultCode] ?? '',
            'author_name' => $twitterData['author']['name'] ?? $handle,
            'author_avatar' => $twitterData['author']['avatar_url'] ?? '',
            'author_description' => $twitterData['author']['description'] ?? '',
            'tweet_count' => $twitterData['count'],
            'completed_at' => now(),
        ]);

        return redirect()->route('social.result', ['id' => $result->id]);
    }

    public function result(int $id): Response
    {
        $result = SocialMediaResult::findOrFail($id);

        return Inertia::render('social/result', [
            'result' => $result,
        ]);
    }
}
