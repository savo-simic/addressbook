<?php

namespace App\Http\Controllers;

class AuthController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }
}
