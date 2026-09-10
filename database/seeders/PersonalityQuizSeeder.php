<?php

namespace Database\Seeders;

use App\Models\Option;
use App\Models\PersonalityCategory;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Database\Seeder;

class PersonalityQuizSeeder extends Seeder
{
    public function run(): void
    {
        Quiz::query()->delete();

        $categories = [
            ['code' => 'A', 'name' => 'Pendiam (Introvert)', 'description' => 'Kamu adalah tipe orang yang lebih suka berada di lingkungan yang tenang. Kamu menikmati waktu sendiri atau bersama orang-orang terdekat. Kamu cenderung memikirkan sesuatu dengan matang sebelum bertindak, dan memiliki kedalaman emosional yang tinggi.'],
            ['code' => 'B', 'name' => 'Aktif (Extrovert)', 'description' => 'Kamu adalah tipe orang yang suka bergaul dan berinteraksi dengan banyak orang. Kamu mendapatkan energi dari aktivitas sosial, suka berbicara, dan cenderung bertindak spontan. Lingkungan yang ramai membuatmu merasa bersemangat.'],
            ['code' => 'C', 'name' => 'Seimbang (Ambivert)', 'description' => 'Kamu memiliki keseimbangan antara sifat pendiam dan aktif. Kamu bisa menikmati waktu sendiri maupun bersama orang lain, tergantung situasi. Kamu fleksibel dan mudah beradaptasi dengan berbagai kondisi sosial.'],
        ];

        $questionPool = $this->poolQuestions();

        $quizzes = [
            [
                'title' => 'Tes Kepribadian Kilat',
                'slug' => 'tes-kepribadian-kilat',
                'level' => 'sederhana',
                'description' => 'Kuis singkat hanya 4 pertanyaan yang langsung memberikan kamu hasil kepribadian: Introvert, Extrovert, atau Ambivert.',
                'estimated_minutes' => 1,
                'question_ids' => [0, 1, 2, 3],
            ],
            [
                'title' => 'Tes Kepribadian Lengkap',
                'slug' => 'tipe-kepribadian',
                'level' => 'lengkap',
                'description' => 'Kuis 8 pertanyaan untuk mengetahui tipe kepribadianmu secara lebih menyeluruh: Pendiam (Introvert), Aktif (Extrovert), atau Seimbang (Ambivert).',
                'estimated_minutes' => 2,
                'question_ids' => [0, 1, 2, 3, 4, 5, 6, 7],
            ],
            [
                'title' => 'Tes Kepribadian Mendalam',
                'slug' => 'tes-kepribadian-mendalam',
                'level' => 'mendalam',
                'description' => 'Kuis 15 pertanyaan dengan analisis paling akurat. Menelusuri berbagai aspek keseharianmu untuk menentukan tipe kepribadian yang tepat.',
                'estimated_minutes' => 4,
                'question_ids' => array_keys($questionPool),
            ],
        ];

        foreach ($quizzes as $quizData) {
            $quiz = Quiz::create([
                'title' => $quizData['title'],
                'slug' => $quizData['slug'],
                'description' => $quizData['description'],
                'level' => $quizData['level'],
                'estimated_minutes' => $quizData['estimated_minutes'],
            ]);

            foreach ($categories as $category) {
                PersonalityCategory::create([
                    'quiz_id' => $quiz->id,
                    ...$category,
                ]);
            }

            foreach ($quizData['question_ids'] as $order => $poolIndex) {
                $q = $questionPool[$poolIndex];
                $question = Question::create([
                    'quiz_id' => $quiz->id,
                    'question_text' => $q['text'],
                    'order' => $order + 1,
                ]);

                foreach ($q['options'] as $optionOrder => $optionData) {
                    Option::create([
                        'question_id' => $question->id,
                        'option_text' => $optionData['text'],
                        'score_a' => $optionData['a'],
                        'score_b' => $optionData['b'],
                        'score_c' => $optionData['c'],
                        'order' => $optionOrder + 1,
                    ]);
                }
            }
        }
    }

    private function poolQuestions(): array
    {
        return [
            [
                'text' => 'Di akhir pekan, apa yang paling kamu sukai?',
                'options' => [
                    ['text' => 'Membaca buku atau menonton film di rumah', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Hangout dengan banyak teman', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Tergantung mood, bisa di rumah atau jalan-jalan', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Ketika bertemu orang baru, kamu cenderung...',
                'options' => [
                    ['text' => 'Diam dan memperhatikan dulu', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Langsung menyapa dan memulai percakapan', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Tersenyum dan menunggu moment yang pas', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Lingkungan kerja yang paling kamu sukai...',
                'options' => [
                    ['text' => 'Sendiri atau dalam kelompok kecil', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Tim besar dengan banyak interaksi', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Bisa menyesuaikan, fleksibel', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Saat mengambil keputusan, kamu lebih suka...',
                'options' => [
                    ['text' => 'Memikirkannya sendiri secara mendalam', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Mendiskusikannya dengan orang lain', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Kombinasi dari keduanya', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Energi kamu paling besar saat...',
                'options' => [
                    ['text' => 'Berada di tempat yang tenang dan sunyi', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Berada di keramaian dan pesta', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Tergantung situasi dan kondisi', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Cara kamu bersosialisasi...',
                'options' => [
                    ['text' => 'Lebih suka percakapan satu lawan satu', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Suka berbicara di depan banyak orang', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Bisa di dua situasi, tergantung topik', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Setelah seharian beraktivitas, kamu biasanya...',
                'options' => [
                    ['text' => 'Butuh waktu sendiri untuk recharge', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Masih punya energi untuk bertemu orang', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Tergantung aktivitas sebelumnya', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Hobi yang paling kamu nikmati...',
                'options' => [
                    ['text' => 'Aktivitas yang bisa dilakukan sendiri', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Aktivitas yang melibatkan banyak orang', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Bervariasi, bisa sendiri atau berkelompok', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Saat mengikuti rapat atau diskusi kelompok, kamu biasanya...',
                'options' => [
                    ['text' => 'Lebih banyak mendengar dan berpikir', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Aktif mengemukakan pendapat', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Tanggap, ikut bicara jika ada ide', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Jika diberi pilihan liburan, kamu akan memilih...',
                'options' => [
                    ['text' => 'Liburan tenang di alam atau kafe yang sepi', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Liburan ramai dengan banyak teman', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Gabungan keduanya sesuai kondisi', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Bagaimana reaksimu saat masalah datang tiba-tiba?',
                'options' => [
                    ['text' => 'Diam dulu, menganalisis sendiri', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Cari bantuan dan bicara ke orang lain', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Tergantung besar kecilnya masalah', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Saat berbelanja atau memilih sesuatu, kamu...',
                'options' => [
                    ['text' => 'Pertimbangkan lama dan teliti', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Cepat memutuskan karena itu menarik', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Melihat-lihat dulu baru memutuskan', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Di tengah percakapan, kamu biasanya...',
                'options' => [
                    ['text' => 'Menjadi pendengar yang baik', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Sering yang memulai dan membawa topik', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Menyesuaikan peran sesuai situasi', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Menurut teman-temanmu, kamu adalah orang yang...',
                'options' => [
                    ['text' => 'Kalem, pendiam, dan misterius', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Ceria, ramai, dan menyejukkan', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Adaptif dan mudah bergaul', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
            [
                'text' => 'Saat ada event mendadak, reaksi pertamamu...',
                'options' => [
                    ['text' => 'Butuh waktu untuk menyiapkan diri', 'a' => 3, 'b' => 0, 'c' => 1],
                    ['text' => 'Langsung semangat dan siap pergi', 'a' => 0, 'b' => 3, 'c' => 1],
                    ['text' => 'Tergantung event dan mood', 'a' => 1, 'b' => 1, 'c' => 3],
                ],
            ],
        ];
    }
}
