<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class AgencyController extends BaseController
{

    public function index()
    {
        $agencies = Agency::all();

        return view('agencies.index');
    }
}
