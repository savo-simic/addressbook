<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    const ROLE_ADMINISTRATOR = 'Administrator';
    const ROLE_CONTACT = 'Contact';

    protected $fillable = [
        'role'
    ];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
