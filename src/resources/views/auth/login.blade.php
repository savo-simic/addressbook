@extends('layouts.master')
@section('title', __('Login'))
@section('content')
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-4 offset-sm-4">
      <div class="card mt-5">
        <div class="card-body">
          <h5 class="card-title text-center mb-3">{{ __('Login') }}</h5>
          @include('partials.alerts')
{{--          <form action="" method="post" id="login">--}}
{{--            @csrf--}}
            <div class="mb-3">
              <label for="username" class="form-label">{{ __('Email') }}</label>
              <input type="text" class="form-control" id="email" name="email" autocomplete="off" value="{{ old('email') }}">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">{{ __('Password') }}</label>
              <input type="password" class="form-control" id="password" name="password">
            </div>
            <div class="text-end">
                <button type="submit" class="btn btn-primary" id="login">{{ __('Login') }}</button>
            </div>
{{--          </form>--}}
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
@push('scripts')
    <script src="{{ url('/js/login/scripts.js') }}"></script>
@endpush
