<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;


class UserController extends BaseController
{

    public function index(Request $request)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $users = User::all();

        return [
            'status' => "success",
            'data'   => $users,
        ];
    }

    public function show($id)
    {
        $user = User::find($id);
        if (is_null($user)) {
            return response(['status' => "failed"]);
        }

        return [
            'status' => "success",
            'data'   => $user,
        ];
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);
        $data['password'] = Hash::make($request->password);

        $user = User::create($data);
        $role = $request->role['role'];
        if ($role) {
            $user->setRoles([$role]);
        };

        if (is_null($user)) {
            return response(['status' => "failed"]);
        }

        return [
            'status' => "success",
            'data'   => $user,
        ];
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return 'No user found.';
        }

        $data = $request->validate([
            'name' => ['required'],
            'email' => ['required'],
//            'password' => ['required'],
        ]);
        $data['password'] = Hash::make($request->password);
        $role = $request->role['role'];
        if ($role) {
            $user->setRoles([$role]);
        };

        $user->update($data);

        return [
            'status'  => "success",
            'data'    => $user,
            'Message' => "Successfully updated",
        ];
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return 'No user found.';
        }

        $user->userRoles()->delete();
        $user->delete();

        return [
            'status'  => "success",
            'Message' => "Successfully deleted",
        ];
    }
}
