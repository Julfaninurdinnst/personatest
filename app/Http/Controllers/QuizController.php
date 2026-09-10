<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Quiz;
use App\Models\QuizResult;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    private const LOCKED_LEVELS = ['lengkap', 'mendalam'];

    private function requiresLogin(Quiz $quiz): bool
    {
        return in_array($quiz->level, self::LOCKED_LEVELS, true);
    }

    private function ensureQuizAccess(Quiz $quiz)
    {
        if ($this->requiresLogin($quiz) && ! auth()->check()) {
            return redirect()->guest('/login');
        }

        return null;
    }

    public function index(): Response
    {
        $quizzes = Quiz::where('is_active', true)
            ->withCount('questions')
            ->get();

        return Inertia::render('quiz/index', [
            'quizzes' => $quizzes,
        ]);
    }

    public function show(string $slug): Response
    {
        $quiz = Quiz::where('slug', $slug)
            ->where('is_active', true)
            ->withCount('questions')
            ->with('categories')
            ->firstOrFail();

        return Inertia::render('quiz/show', [
            'quiz' => $quiz,
            'is_locked' => $this->requiresLogin($quiz) && ! auth()->check(),
        ]);
    }

    public function question(string $slug)
    {
        $quiz = Quiz::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        if ($redirect = $this->ensureQuizAccess($quiz)) {
            return $redirect;
        }

        $questions = $quiz->questions()
            ->with('options')
            ->orderBy('order')
            ->get();

        if ($questions->isEmpty()) {
            return redirect()->route('quiz.show', ['slug' => $slug]);
        }

        return Inertia::render('quiz/question', [
            'quiz' => $quiz,
            'questions' => $questions,
        ]);
    }

    public function submit(Request $request, string $slug)
    {
        $quiz = Quiz::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        if ($redirect = $this->ensureQuizAccess($quiz)) {
            return $redirect;
        }

        $validated = $request->validate([
            'answers' => 'required|array|size:'.$quiz->questions()->count(),
            'answers.*' => 'required|integer|exists:options,id',
        ]);

        $scores = ['a' => 0, 'b' => 0, 'c' => 0];

        foreach ($validated['answers'] as $optionId) {
            $option = Option::findOrFail($optionId);
            $scores['a'] += $option->score_a;
            $scores['b'] += $option->score_b;
            $scores['c'] += $option->score_c;
        }

        $maxScore = max($scores);
        $resultCode = collect($scores)
            ->filter(fn ($score) => $score === $maxScore)
            ->keys()
            ->first();

        $result = QuizResult::create([
            'quiz_id' => $quiz->id,
            'session_id' => $request->session()->getId(),
            'scores' => $scores,
            'result_code' => strtoupper($resultCode),
            'completed_at' => now(),
        ]);

        return redirect()->route('quiz.result', [
            'slug' => $slug,
            'id' => $result->id,
        ]);
    }

    public function result(string $slug, int $id): Response
    {
        $quiz = Quiz::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $result = QuizResult::where('quiz_id', $quiz->id)
            ->where('id', $id)
            ->firstOrFail();

        $category = $quiz->categories()
            ->where('code', $result->result_code)
            ->first();

        $totalScore = array_sum($result->scores);

        return Inertia::render('quiz/result', [
            'quiz' => $quiz,
            'result' => $result,
            'category' => $category,
            'totalScore' => $totalScore,
        ]);
    }
}
