@php
    use Illuminate\Pagination\Paginator;

    Paginator::useBootstrap();
@endphp

@extends('layouts.master')
@section('title', __('Cities'))
@section('content')
    <div class="container ml-1">
        <div class="row">
            @include('partials.sidebar')
            <div class="col-lg-6 col-sm-6 margin-tb">
                <div class="pull-left">
                    <h2>Crud operations for cities</h2>
                </div>
                {{--                @if(\Illuminate\Support\Facades\Auth::user()->hasAnyRole('Administrator'))--}}
                {{--                    <div class="pull-right">--}}
                {{--                        <a class="btn btn-primary" href="{{ route('countries.create') }}"> Create New Country</a>--}}
                {{--                    </div>--}}
                <div class="pull-right">
                    <a href="javascript:void(0);" data-target="#addCityModal" data-toggle="modal" class="btn btn-success"> Create New City </a>
                </div>
                {{--                @endif--}}
                @if ($message = Session::get('success'))
                    <div class="alert alert-success mt-3">
                        <p>{{ $message }}</p>
                    </div>
                @endif
                <table class="table table-bordered mt-3" id="table">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th width="280px">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Show city Modal -->
    <div class="modal fade" id="showCityModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">City Info</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <label for="title" id="cityId"></label><br>
                    <label for="title" id="cityName"></label><br>
                    <label for="title" id="countryName"></label>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Create city modal -->
    <div class="modal fade" id="addCityModal" tabindex="-1" role="dialog" aria-labelledby="addCityModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addPostModalLabel"> Create City </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"> × </span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST" id="cityForm">
                        {{-- @csrf --}}
                        <input type="hidden" id="id_hidden" name="id" />
                        <div class="form-group">
                            <label for="title"> Name <span class="text-danger">*</span></label>
                            <input type="text" name="name" id="name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="country_id">Country:</label>
                            <select name="country_id" id="country_id" class="form-control">
                                <option value="0">-- Select Country --</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="createCityBtn" onclick="createCity(event)" class="btn btn-primary"> Save </button>
                </div>
                <div class="result"></div>
            </div>
        </div>
    </div>

    <!-- Update country modal -->
    <div class="modal fade" id="editCityModal" tabindex="-1" role="dialog" aria-labelledby="editCityModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addPostModalLabel"> Edit City </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"> × </span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST" id="cityForm">
                        {{-- @csrf --}}
                        <input type="hidden" name="cityId" id="cityId" />
                        <div class="form-group">
                            <label for="countryName"> Name <span class="text-danger">*</span></label>
                            <input type="text" name="cityName" id="cityName" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="country_id">Country:</label>
                            <select name="country_id" id="country_id" class="form-control">
                                <option value="0">-- Select Country --</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="updateCityBtn" onclick="updateCity()" class="btn btn-primary"> Save </button>
                </div>
                <div class="result"></div>
            </div>
        </div>
    </div>

    <!-- Create success modal -->
    <div class="modal fade" id="addSuccessModal" tabindex="-1" role="dialog" aria-labelledby="addSuccessModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addPostModalLabel"> Info </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"> × </span>
                    </button>
                </div>
                <div class="modal-body">
                    <label for="title"> Successfully deleted city. <span class="text-danger">*</span></label>
                </div>
                <div class="modal-footer">
                    <button type="button" id="addSuccessBtn" class="btn btn-primary" data-dismiss="modal"> Close </button>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')

    <script src="{{ url('/js/cities/scripts.js') }}"></script>
@endpush
