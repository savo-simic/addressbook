<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class CountryController extends BaseController
{

    public function index()
    {
        $countries = Country::latest()->paginate(5);

        return view('countries.index',compact('countries'))
            ->with('i', (request()->input('page', 1) - 1) * 5);
    }

//    public function show($id)
//    {
//        $transmission = Transmission::findOrFail($id);
//
//        return view('transmissions.show',compact('transmission'));
//    }

    public function create()
    {
        return view('countries.create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        Country::create($request->all());

        return redirect()->route('countries.index')
            ->with('success','Country created successfully.');
    }
//
//    public function edit($id)
//    {
//        $transmission = Transmission::findOrFail($id);
//
//        return view('transmissions.edit',compact('transmission'));
//    }
//
//    public function update(Request $request, $id)
//    {
//        $data = $request->validate([
//            'name' => 'required',
//        ]);
//
//        Transmission::whereId($id)->update($data);
//
//        return redirect()->route('transmissions.index')
//            ->with('success','Transmissions updated successfully');
//    }
//
//    public function destroy($id)
//    {
//        $transmission = Transmission::findOrFail($id);
//        $transmission->delete();
//
//        return redirect()->route('transmissions.index')
//            ->with('success','Transmission deleted successfully');
//    }
}
