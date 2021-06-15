<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Models\SocialAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{

    public function loginUrl(): JsonResponse
    {
        return Response::json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }


    public function loginCallback(): JsonResponse
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = null;

        DB::transaction(function () use ($googleUser, &$user) {
            $socialAccount = SocialAccount::firstOrNew(
                ['social_id' => $googleUser->getId(), 'social_provider' => 'google'],
                ['social_name' => $googleUser->getName()]
            );

            if (!($user = $socialAccount->user)) {
                $user = User::create([
                    'email' => $googleUser->getEmail(),
                    'name' => $googleUser->getName(),
                ]);
                $socialAccount->fill(['user_id' => $user->id])->save();
            }
        });
        $accessToken = $user->createToken('authToken')->accessToken;

        $user->setRoles(['Contact']);

        return Response::json([
            'user' => $user,
            'google_user' => $googleUser,
            'access_token' => $accessToken
        ]);
    }
}
