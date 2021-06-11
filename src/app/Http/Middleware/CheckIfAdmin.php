<?php

namespace App\Http\Middleware;

use Closure;

class CheckIfAdmin
{
    /**
     * Checked that the logged in user is an administrator.
     *
     * --------------
     * VERY IMPORTANT
     * --------------
     * If you have both regular users and admins inside the same table,
     * change the contents of this method to check that the logged in user
     * is an admin, and not a regular user.
     *
     * @param \App\User $user [description]
     *
     * @return bool [description]
     */
    private function checkIfUserIsAdmin($user)
    {
        return $user->hasAnyRole('Administrator');
    }

}
