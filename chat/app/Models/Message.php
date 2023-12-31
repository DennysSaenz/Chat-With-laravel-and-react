<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;


    public function sender(): belongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function channel(): belongsTo
    {
        return $this->belongsTo(Channel::class);
    }

//    public function receiver(): BelongsTo
//    {
//        return $this->belongsTo(User::class);
//    }
//
//    public function sender(): BelongsTo
//    {
//        return $this->belongsTo(User::class);
//    }
}
