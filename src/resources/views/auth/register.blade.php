@extends('layouts.master')
@section('title', __('Add new user'))
@section('content')
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-4 offset-sm-4">
      <div class="card mt-5">
        <div class="card-body">
          <h5 class="card-title text-center mb-3">{{ __('Add new user') }}</h5>
          @include('partials.alerts')
          <form action="{{ route('register.custom') }}" method="post">
            @csrf
              <div class="mb-3">
                  <label for="name" class="form-label">{{ __('Name') }}</label>
                  <input type="text" class="form-control" id="name" name="name" autocomplete="off" value="{{ old('name') }}">
              </div>
              <div class="mb-3">
                  <label for="username" class="form-label">{{ __('Username') }}</label>
                  <input type="text" class="form-control" id="username" name="username" autocomplete="off" value="{{ old('username') }}">
              </div>
            <div class="mb-3">
              <label for="email" class="form-label">{{ __('Email') }}</label>
              <input type="text" class="form-control" id="email" name="email" autocomplete="off" value="{{ old('email') }}">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">{{ __('Password') }}</label>
              <input type="password" class="form-control" id="password" name="password">
            </div>
            <div class="mb-3">
                <strong>Role:</strong>
                <select id="role" name="role" class="form-control">
                    <option value="">--- Select Role ---</option>
                        <option value="Administrator" >{{ 'Administrator'  }}</option>
                        <option value="Registered" >{{ 'Registered' }}</option>
                </select>

              </div>
            <div class="text-end">
                <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
