@php
    use Illuminate\Pagination\Paginator;
    Paginator::useBootstrap();
@endphp

@extends('layouts.master')
@extends('partials.sidebar')
@section('title', __('Route'))
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-lg-12 margin-tb">
                <div class="pull-left">
                    <h2>Crud operations for routes</h2>
                </div>
                @if(\Illuminate\Support\Facades\Auth::user()->hasAnyRole('Administrator'))
                    <div class="pull-right">
                        <a class="btn btn-primary" href="{{ route('routes.create') }}"> Create New Route</a>
                    </div>
                @endif
            </div>
        </div>

    @if ($message = Session::get('success'))
        <div class="alert alert-success mt-3">
            <p>{{ $message }}</p>
        </div>
    @endif

    <table class="table table-bordered mt-3">
        <tr>
            <th>No</th>
            <th>Name</th>
            <th width="280px">Action</th>
        </tr>
        @foreach ($routes as $route)
            <tr>
                <td>{{ ++$i }}</td>
                <td>{{ $route->name }}</td>

                <td>
                    <form action="{{ route('routes.destroy',$route->id) }}" method="POST">

                        <a class="btn btn-info" href="{{ route('routes.show',$route->id) }}">Show</a>

                        @if(\Illuminate\Support\Facades\Auth::user()->hasAnyRole('Administrator'))
                            <a class="btn btn-primary" href="{{ route('routes.edit',$route->id) }}">Edit</a>
                        @endif

                        @csrf
                        @method('DELETE')
                        @if(\Illuminate\Support\Facades\Auth::user()->hasAnyRole('Administrator'))
                            <button type="submit" class="btn btn-danger">Delete</button>
                        @endif
                    </form>
                </td>
            </tr>
        @endforeach
    </table>
        {!!  $routes->links() !!}
    </div>
@endsection

