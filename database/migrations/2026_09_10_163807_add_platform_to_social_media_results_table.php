<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('social_media_results', function (Blueprint $table) {
            $table->string('platform', 20)->default('twitter')->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('social_media_results', function (Blueprint $table) {
            $table->dropColumn('platform');
        });
    }
};
