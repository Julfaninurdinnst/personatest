<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialMediaResult extends Model
{
    protected $fillable = [
        'platform',
        'handle',
        'result_code',
        'scores',
        'category_name',
        'category_description',
        'author_name',
        'author_avatar',
        'author_description',
        'tweet_count',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'scores' => 'array',
            'completed_at' => 'datetime',
        ];
    }
}
