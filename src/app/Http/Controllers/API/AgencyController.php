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

        if ($request->ajax()) {
            $agencies = Agency::with('city')->get();
//            $agencies = Agency::get();
            return [
                'status' => "success",
                'data'   => $agencies,
            ];
        }

        return view('agencies.index');
    }

    public function show($id)
    {
        $agency = Agency::with('city')->findOrFail($id);


        return [
            'status' => "success",
            'data'   => $agency,
        ];
    }

    public function create(Request $request)
    {
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
        $agency = Agency::find($id);
        if (!$agency) {
            return 'Not agency found.';
        }

        $data = $request->validate([
            'name' => ['required'],
        ]);

        $agency->update($data);

        return [
            'status'  => "success",
            'data'    => $agency,
            'Message' => "Successfully updated",
        ];
    }

    public function destroy($id)
    {
        $agency = Agency::findOrFail($id);
        $agency->delete();

        return [
            'status'  => "success",
            'Message' => "Successfully deleted",
        ];
    }
}
