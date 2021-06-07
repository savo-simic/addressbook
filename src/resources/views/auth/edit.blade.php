@php
    $user =\Illuminate\Support\Facades\Auth::user();
@endphp

@extends('layouts.master')
@extends('partials.sidebar')
@section('title', __('Edit user user'))
@section('content')
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-4 offset-sm-4">
      <div class="card mt-5">
        <div class="card-body">
          <h5 class="card-title text-center mb-3">{{ __('Edit user') }}</h5>
          @include('partials.alerts')
          <form action="{{ route('edit.user.password', ['user_id' => $user->id]) }}" method="post">
            @csrf
              <div class="mb-3">
                  <label for="username" class="form-label">{{ __('Username') }}</label>
                  <input type="text" class="form-control" id="username" name="username" autocomplete="off" value="{{  $user->username}}">
              </div>

            <div class="mb-3">
              <label for="password" class="form-label">{{ __('Password') }}</label>
              <input type="password" class="form-control" id="password" name="password">
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
