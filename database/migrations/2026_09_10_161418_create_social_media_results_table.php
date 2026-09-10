<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_media_results', function (Blueprint $table) {
            $table->id();
            $table->string('handle');
            $table->string('result_code', 10);
            $table->json('scores');
            $table->string('category_name');
            $table->text('category_description');
            $table->string('author_name')->nullable();
            $table->string('author_avatar')->nullable();
            $table->text('author_description')->nullable();
            $table->integer('tweet_count')->default(0);
            $table->timestamp('completed_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_media_results');
    }
};
