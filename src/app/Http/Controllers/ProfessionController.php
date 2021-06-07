<?php

namespace App\Http\Controllers;

use App\Models\Profession;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class ProfessionController extends BaseController
{

    public function index()
    {
        $profession = Profession::all();

        return view('professions.index');
    }
}
