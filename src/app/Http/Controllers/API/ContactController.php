<?php

namespace App\Http\Controllers\API;

use App\Models\Agency;
use App\Models\Contact;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Response;
use League\CommonMark\Inline\Element\Image;


class ContactController extends BaseController
{

    public function index(Request $request)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $contacts = Contact::with('agency')->get();

        return [
            'status' => "success",
            'data'   => $contacts,
        ];
    }

    public function show($id)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $contact = Contact::with(['agency','professions'])->find($id);
        if (!$contact) {
            return 'Contact Not found.';
        }

        return [
            'status' => "success",
            'data'   => $contact,
        ];
    }

    public function create(Request $request)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $data = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'agency_id' => 'required',
            'phone' => 'required',
            'email' => 'required',
            'web' => 'required',
            'avatar' => 'required',
        ]);

        $image = $request->avatar;
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageName = rand(10,1000).'.'.'png';
        \File::put(public_path('images'). '/' . $imageName, base64_decode($image));
        $data['avatar'] = $imageName;

        $professions = $request->professions;

        $contact = Contact::create($data);

        $contact->professions()->attach($professions);
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
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $contact = Contact::find($id);
        if (!$contact) {
            return 'Not contact found.';
        }

//        $data = $request->validate([
//            'first_name' => 'required',
//            'last_name' => 'required',
//            'agency_id' => 'required',
//            'phone' => 'required',
//            'email' => 'required',
//            'web' => 'required',
//        ]);
        $data = $request->all();

        if (!is_null($request->avatar)) {
            $image = public_path("images/{$request->avatar}");
            if (\File::exists($image)) {
                $data['avatar'] = $request->avatar;
            } else {
                unlink(public_path("images/{$contact->avatar}"));
                $image = $request->avatar;
                $image = str_replace('data:image/png;base64,', '', $image);
                $image = str_replace(' ', '+', $image);
                $imageName = rand(10,1000).'.'.'png';
                \File::put(public_path('images'). '/' . $imageName, base64_decode($image));
                $data['avatar'] = $imageName;
            }
        }

        $professions = $request->professions;
        $contact->professions()->detach();
        $contact->professions()->attach($professions);
        $contact->update($data);

        return [
            'status'  => "success",
            'data'    => $contact,
            'Message' => "Successfully updated",
        ];
    }

    public function search($searchTerm)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        return Contact::with('agency')
            ->where('first_name', 'LIKE', "%$searchTerm%" )
            ->orWhere('last_name','LIKE', "%$searchTerm%")
            ->orWhere('phone','LIKE', "%$searchTerm%")
            ->orWhere('email','LIKE', "%$searchTerm%")
            ->orWhere('web','LIKE', "%$searchTerm%")
            ->get();
    }

    public function destroy($id)
    {
        $user = \Auth::guard('api')->user();
        if (!$user) {
            return 'Not authenticated.';
        }

        $contact = Contact::findOrFail($id);
        $contact->delete();

        return [
            'status'  => "success",
            'Message' => "Successfully deleted",
        ];
    }
}
