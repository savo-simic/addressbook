<?php

namespace App\Http\Controllers\API;

use App\Models\Country;
use App\Models\Profession;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Response;


class ProfessionController extends BaseController
{

    public function index(Request $request)
    {
        $professions = Profession::all();

        return [
            'status' => "success",
            'data'   => $professions,
        ];
    }

    public function show($id)
    {
        $profession = Profession::findOrFail($id);

        return [
            'status' => "success",
            'data'   => $profession,
        ];
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
        ]);

        $profession = Profession::create($data);

        if (is_null($profession)) {
            return response(['status' => "failed"]);
        }

        return [
            'status' => "success",
            'data'   => $profession,
        ];
    }

    public function update(Request $request, $id)
    {
        $profession = Profession::find($id);
        if (!$profession) {
            return 'Not profession found.';
        }

//        $data = $request->validate([
//            'name' => ['required'],
//        ]);
        $data = $request->all();

        $profession->update($data);

        return [
            'status'  => "success",
            'data'    => $profession,
            'Message' => "Successfully updated",
        ];
    }

    public function destroy($id)
    {
        $profession = Profession::findOrFail($id);
        $profession->delete();

        return [
            'status'  => "success",
            'Message' => "Successfully deleted",
        ];
    }
}
