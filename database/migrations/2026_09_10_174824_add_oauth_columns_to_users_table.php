<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('password')->nullable()->change();
            $table->string('auth_provider', 20)->nullable()->after('email');
            $table->string('auth_provider_id')->nullable()->after('auth_provider');
            $table->string('avatar')->nullable()->after('auth_provider_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['auth_provider', 'auth_provider_id', 'avatar']);
            $table->string('password')->nullable(false)->change();
        });
    }
};