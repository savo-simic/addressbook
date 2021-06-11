<?php

namespace App\Http\Middleware;

use Closure;

class RolesChecker
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {
        /** @var \App\User $user */
        $user = $request->user();
        $canAccess = false;

        if ($user) {
            $canAccess = $user->hasAnyRole(...$roles);
        }

        return $canAccess ? $next($request) : response(['message' => 'Restricted access'], 403);
    }
}
