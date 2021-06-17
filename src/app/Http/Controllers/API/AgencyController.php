<?php

namespace App\Http\Controllers\API;

use App\Models\Agency;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Response;


class AgencyController extends BaseController
{

    public function index(Request $request)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $agencies = Agency::with('city')->get();

        return [
            'status' => "success",
            'data'   => $agencies,
        ];
    }

    public function show($id)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $agency = Agency::with('city')->find($id);
        if (!$agency) {
            return 'Agency Not found.';
        }

        return [
            'status' => "success",
            'data'   => $agency,
        ];
    }

    public function create(Request $request)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $data = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'city_id' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'web' => 'required',
        ]);

        $agency = Agency::create($data);

        if (is_null($agency)) {
            return response(['status' => "failed"]);
        }

        return [
            'status' => "success",
            'data'   => $agency,
        ];
    }

    public function update(Request $request, $id)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $agency = Agency::find($id);
        if (!$agency) {
            return 'Not agency found.';
        }

//        $data = $request->validate([
//            'name' => ['required'],
//            'address' => ['required'],
//            'city_id' => ['required'],
//            'phone' => ['required'],
//            'email' => ['required'],
//            'web' => ['required'],
//        ]);
        $data = $request->all();

        $agency->update($data);

        return [
            'status'  => "success",
            'data'    => $agency,
            'Message' => "Successfully updated",
        ];
    }

    public function destroy($id)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $agency = Agency::find($id);
        if (!$agency) {
            return 'Not agency found.';
        }

        $agency->delete();

        return [
            'status'  => "success",
            'Message' => "Successfully deleted",
        ];
    }
}
