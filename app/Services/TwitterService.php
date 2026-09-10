<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TwitterService
{
    private string $baseUrl = 'https://api.fxtwitter.com/2/profile';

    public function getRecentTweets(string $handle, int $count = 20): array
    {
        $handle = ltrim($handle, '@');
        $url = "{$this->baseUrl}/{$handle}/statuses";

        try {
            $response = Http::timeout(15)
                ->get($url, [
                    'count' => $count,
                ]);

            if ($response->status() === 404) {
                return ['error' => 'Akun tidak ditemukan atau akun privat.'];
            }

            if ($response->status() === 429) {
                return ['error' => 'Terlalu banyak permintaan. Coba lagi sebentar.'];
            }

            if ($response->failed()) {
                return ['error' => 'Gagal mengambil data dari Twitter.'];
            }

            $data = $response->json();

            if (! isset($data['results']) || ! is_array($data['results'])) {
                return ['error' => 'Tidak ada tweet yang ditemukan.'];
            }

            $tweets = array_map(fn ($tweet) => [
                'text' => $tweet['text'] ?? '',
                'created_at' => $tweet['created_at'] ?? '',
                'likes' => $tweet['likes'] ?? 0,
                'replies' => $tweet['replies'] ?? 0,
                'reposts' => $tweet['reposts'] ?? 0,
                'views' => $tweet['views'] ?? 0,
            ], $data['results']);

            $author = null;
            if (isset($data['results'][0]['author'])) {
                $a = $data['results'][0]['author'];
                $author = [
                    'name' => $a['name'] ?? $handle,
                    'screen_name' => $a['screen_name'] ?? $handle,
                    'description' => $a['description'] ?? '',
                    'followers' => $a['followers'] ?? 0,
                    'following' => $a['following'] ?? 0,
                    'statuses' => $a['statuses'] ?? 0,
                    'avatar_url' => $a['avatar_url'] ?? '',
                ];
            }

            return [
                'tweets' => $tweets,
                'author' => $author,
                'count' => count($tweets),
            ];
        } catch (\Exception $e) {
            Log::error('TwitterService error: '.$e->getMessage());

            return ['error' => 'Terjadi kesalahan saat mengambil data Twitter.'];
        }
    }

    public function combineTweetsForAnalysis(array $tweets): string
    {
        return collect($tweets)
            ->take(20)
            ->map(fn ($t) => $t['text'])
            ->filter()
            ->implode("\n---\n");
    }
}
