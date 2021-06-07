@extends('layouts.master')
@extends('partials.sidebar')
@section('title', __('Edit'))
@section('content')

    <div class="container">
        <div class="row">
            <div class="col-lg-12 margin-tb mt-3">
                <div class="pull-left">
                    <h2>Edit Route</h2>
                </div>
                <div class="pull-right">
                    <a class="btn btn-primary" href="{{ route('routes.index') }}"> Back</a>
                </div>
            </div>
        </div>

        @if ($errors->any())
            <div class="alert alert-danger mt-3">
                <strong>Whoops!</strong> There were some problems with your input.<br><br>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('routes.update', $route->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 mt-3">
                    <div class="form-group">
                        <strong>Name:</strong>
                        <input type="text" name="name" value="{{ $route->name }}" class="form-control" placeholder="Name">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 mt-3">
                    <div class="form-group">
                        <strong>Transmission:</strong>
                        <select id="transmission" name="transmission_id" class="form-control">
                            <option value="">--- Select Transmission ---</option>
                            @foreach ($transmissions as $key => $value)
                                <option value="{{ $value }}" {{ $route->transmission_id == $value ? 'selected' : ''}}>{{ $key }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 mt-3">
                    <div class="form-group">
                        <strong>Parent id:</strong>
                        <select id="parent" name="parent_id" class="form-control">
                            <option value="">--- Select Route(optional) ---</option>
                            @foreach ($routes as $key => $value)
                                <option value="{{ $value }}" {{ $route->parent_id == $value ? 'selected' : ''}}>{{ $key }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 text-center mt-3">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>

        </form>
    </div>
@endsection

