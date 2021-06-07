<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class ContactController extends BaseController
{

    public function index()
    {
        $contacts = Contact::all();

        return view('contacts.index');
    }

//    public function show($id)
//    {
//        $transmission = Transmission::findOrFail($id);
//
//        return view('transmissions.show',compact('transmission'));
//    }

    public function create()
    {
        return view('contacts.create');
    }
//
//
//    public function store(Request $request)
//    {
//        $request->validate([
//            'name' => 'required',
//        ]);
//
//        Transmission::create($request->all());
//
//        return redirect()->route('transmissions.index')
//            ->with('success','Transmission created successfully.');
//    }
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
