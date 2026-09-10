<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PersonalityAnalyzer
{
    private string $apiUrl = 'https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli';

    private string $token;

    public function __construct()
    {
        $this->token = config('services.huggingface.token', '');
    }

    public function analyze(string $text): array
    {
        if (empty($this->token)) {
            return ['error' => 'HuggingFace token belum dikonfigurasi.'];
        }

        if (empty(trim($text))) {
            return ['error' => 'Tidak ada teks untuk dianalisis.'];
        }

        $truncatedText = mb_substr($text, 0, 3000);

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$this->token,
                'Content-Type' => 'application/json',
            ])
                ->timeout(30)
                ->post($this->apiUrl, [
                    'inputs' => $truncatedText,
                    'parameters' => [
                        'candidate_labels' => ['introvert', 'extrovert', 'ambivert'],
                        'multi_label' => false,
                    ],
                ]);

            if ($response->failed()) {
                Log::error('HuggingFace API error: '.$response->body());

                return ['error' => 'Gagal menganalisis teks.'];
            }

            $data = $response->json();

            if (! is_array($data) || ! isset($data[0])) {
                return ['error' => 'Format respons tidak valid.'];
            }

            $labels = [];
            $scores = [];
            $first = $data[0];

            if (isset($first['label'], $first['score'])) {
                // Format A: [{"label": "extrovert", "score": 0.91}, ...]
                foreach ($data as $entry) {
                    $labels[] = strtolower($entry['label']);
                    $scores[] = $entry['score'];
                }
            } elseif (isset($first['labels'], $first['scores'])) {
                // Format B: [{"sequence": "...", "labels": [...], "scores": [...]}]
                $labels = array_map('strtolower', $first['labels']);
                $scores = $first['scores'];
            } else {
                return ['error' => 'Format respons tidak valid.'];
            }

            $personalityScores = [];
            foreach ($labels as $i => $label) {
                $personalityScores[$label] = round($scores[$i] * 100, 1);
            }

            arsort($personalityScores);
            $topLabel = array_key_first($personalityScores);

            $codeMap = [
                'introvert' => 'A',
                'extrovert' => 'B',
                'ambivert' => 'C',
            ];

            return [
                'result_code' => strtoupper($codeMap[$topLabel] ?? 'C'),
                'result_label' => ucfirst($topLabel),
                'scores' => $personalityScores,
                'raw_text_length' => mb_strlen($text),
            ];
        } catch (\Exception $e) {
            Log::error('PersonalityAnalyzer error: '.$e->getMessage());

            return ['error' => 'Terjadi kesalahan saat analisis kepribadian.'];
        }
    }
}
