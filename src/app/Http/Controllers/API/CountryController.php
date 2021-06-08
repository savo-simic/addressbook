<?php

namespace App\Http\Controllers\API;

use App\Models\City;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Response;


class CountryController extends BaseController
{
    public function index(Request $request)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $country = Country::get();

        return [
            'status' => "success",
            'data'   => $country,
        ];
    }

    public function cities($id)
    {

        $cities  = City::where('country_id', $id)->get();

        return [
            'status' => "success",
            'data'   => $cities,
        ];
    }

    public function show($id)
    {
        $country = Country::findOrFail($id);


        return [
            'status' => "success",
            'data'   => $country,
        ];
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
        ]);

        $country = Country::create($data);

        if (is_null($country)) {
            return response(['status' => "failed"]);
        }

        return [
            'status' => "success",
            'data'   => $country,
        ];
    }

    public function update(Request $request, $id)
    {
        $country = Country::find($id);
        if (!$country) {
            return 'Not country found.';
        }

        $data = $request->validate([
            'name' => ['required'],
        ]);

        $country->update($data);

        return [
            'status'  => "success",
            'data'    => $country,
            'Message' => "Successfully updated",
        ];
    }

    public function destroy($id)
    {
        $country = Country::findOrFail($id);
        $country->delete();

        return [
            'status'  => "success",
            'Message' => "Successfully deleted",
        ];
    }
}
