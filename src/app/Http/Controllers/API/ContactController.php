<?php

namespace App\Http\Controllers\API;

use App\Models\Agency;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Response;


class ContactController extends BaseController
{

    public function index(Request $request)
    {

        if ($request->ajax()) {
            $contacts = Contact::get();
//            $agencies = Agency::get();
            return [
                'status' => "success",
                'data'   => $contacts,
            ];
        }

        return view('contacts.index');
    }

    public function show($id)
    {
        $contact = Contact::findOrFail($id);

        return [
            'status' => "success",
            'data'   => $contact,
        ];
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'agency_id' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'web' => 'required',
            'avatar' => 'required',
        ]);


        $imageName = time().'.'.$request->avatar->getClientOriginalExtension();
        $data['avatar'] = $imageName;

        $request->avatar->move(public_path('images'), $imageName);
        $contact = Contact::create($data);

        if (is_null($contact)) {
            return response(['status' => "failed"]);
        }

        return [
            'status' => "success",
            'data'   => $contact,
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
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return [
            'status'  => "success",
            'Message' => "Successfully deleted",
        ];
    }
}
