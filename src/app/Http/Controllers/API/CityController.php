<?php

namespace App\Http\Controllers\API;

use App\Models\City;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Response;


class CityController extends BaseController
{

    public function index(Request $request)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $cities = City::with('country')->get();

        return [
            'status' => "success",
            'data'   => $cities,
        ];
    }

    public function show($id)
    {
        $city = City::with('country')->findOrFail($id);
        if (is_null($city)) {
            return response(['status' => "failed"]);
        }

        return [
            'status' => "success",
            'data'   => $city,
        ];
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'country_id' => 'required'
        ]);

        $city = City::create($data);
        $city->load('country');

        if (is_null($city)) {
            return response(['status' => "failed"]);
        }

        return [
            'status' => "success",
            'data'   => $city,
        ];
    }

    public function update(Request $request, $id)
    {
        $city = City::find($id);
        if (!$city) {
            return 'Not city found.';
        }

//        $data = $request->validate([
//            'name' => ['required'],
//            'country_id' => ['required'],
//        ]);
        $data = $request->all();

        $city->update($data);
        $city->load('country');

        return [
            'status'  => "success",
            'data'    => $city,
            'Message' => "Successfully updated",
        ];
    }

    public function destroy($id)
    {
        $city = City::findOrFail($id);
        $city->delete();

        return [
            'status'  => "success",
            'Message' => "Successfully deleted",
        ];
    }
}
