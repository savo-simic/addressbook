<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Check if User has any of the roles provided.
     *
     * @param mixed ...$roles
     * @return bool
     */
    public function hasAnyRole(...$roles)
    {
        foreach ($this->userRoles as $r) {
            if (in_array($r->role, $roles)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Returns list of user roles as array
     *
     * @param $value
     * @return mixed
     */
    public function getRolesAttribute($value)
    {
        return $this->userRoles
            ->map(function ($r) {
                return $r->role;
            })
            ->toArray();
    }

    public function userRoles()
    {
        return $this->hasMany(UserRole::class);
    }

    public function setRoles(array $userRoles)
    {
        DB::transaction(function () use ($userRoles) {
            $roles = function () use ($userRoles) {
                foreach ($userRoles as $r) {
                    yield ['role' => $r];
                };
            };

            $this->userRoles()->each(function ($r) {
                $r->delete();
            });

            $this->userRoles()->createMany($roles());
        });
    }
}
