@php
    use Illuminate\Pagination\Paginator;

    Paginator::useBootstrap();
@endphp

@extends('layouts.master')
@section('title', __('Agencies'))
@section('content')
    <div class="container m-0">
        <div class="row">
            @include('partials.sidebar')
            <div class="col-lg-9 col-sm-9 margin-tb">
                <div class="pull-left">
                    <h2>Crud operations for agencies</h2>
                </div>
                {{--                @if(\Illuminate\Support\Facades\Auth::user()->hasAnyRole('Administrator'))--}}
                {{--                    <div class="pull-right">--}}
                {{--                        <a class="btn btn-primary" href="{{ route('countries.create') }}"> Create New Country</a>--}}
                {{--                    </div>--}}
                <div class="pull-right">
                    <a href="javascript:void(0);" data-target="#addAgencyModal" data-toggle="modal" class="btn btn-success"> Create New Agency </a>
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
                        <th>Address</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Web</th>
                        <th width="280px">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Show Agency Modal -->
    <div class="modal fade" id="showAgencyModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Agency Info</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <label for="title" id="agencyId"></label><br>
                    <label for="title" id="agencyName"></label><br>
                    <label for="title" id="agencyAddress"></label><br>
                    <label for="title" id="agencyCity"></label><br>
                    <label for="title" id="agencyPhone"></label><br>
                    <label for="title" id="agencyEmail"></label><br>
                    <label for="title" id="agencyWeb"></label>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Create Agency modal -->
    <div class="modal fade" id="addAgencyModal" tabindex="-1" role="dialog" aria-labelledby="addAgencyModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addPostModalLabel"> Create Agency </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"> × </span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST" id="agencyForm">
                        {{-- @csrf --}}
                        <input type="hidden" id="id_hidden" name="id" />
                        <div class="form-group">
                            <label for="name"> Name <span class="text-danger">*</span></label>
                            <input type="text" name="name" id="name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="address"> Address <span class="text-danger">*</span></label>
                            <input type="text" name="address" id="address" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="country_id">Country<span class="text-danger">*</span></label>
                            <select name="country_id" id="country_id" class="form-control">
                                <option value="0">-- Select Country --</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="city_id">City<span class="text-danger">*</span></label>
                            <select name="city_id" id="city_id" class="form-control">
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="phone"> Phone <span class="text-danger">*</span></label>
                            <input type="text" name="phone" id="phone" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="email"> Email <span class="text-danger">*</span></label>
                            <input type="text" name="email" id="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="web"> Web <span class="text-danger">*</span></label>
                            <input type="text" name="web" id="web" class="form-control">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="createAgencyBtn" onclick="createAgency(event)" class="btn btn-primary"> Save </button>
                </div>
                <div class="result"></div>
            </div>
        </div>
    </div>

    <!-- Update Agency modal -->
    <div class="modal fade" id="editAgencyModal" tabindex="-1" role="dialog" aria-labelledby="editAgencyModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addAgencyModalLabel"> Edit Agency </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"> × </span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST" id="agencyForm">
                        {{-- @csrf --}}
                        <input type="hidden" id="id_hidden" name="id" />
                        <div class="form-group">
                            <label for="name"> Name <span class="text-danger">*</span></label>
                            <input type="text" name="agencyName" id="agencyName" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="address"> Address <span class="text-danger">*</span></label>
                            <input type="text" name="agencyAddress" id="agencyAddress" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="country_id">Country<span class="text-danger">*</span></label>
                            <select name="country_id" id="country_id" class="form-control">
                                <option value="0">-- Select Country --</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="city_id">City<span class="text-danger">*</span></label>
                            <select name="city_id" id="city_id" class="form-control">
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="phone"> Phone <span class="text-danger">*</span></label>
                            <input type="text" name="agencyPhone" id="agencyPhone" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="email"> Email <span class="text-danger">*</span></label>
                            <input type="text" name="agencyEmail" id="agencyEmail" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="web"> Web <span class="text-danger">*</span></label>
                            <input type="text" name="agencyWeb" id="agencyWeb" class="form-control">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="updateCityBtn" onclick="updateAgency()" class="btn btn-primary"> Save </button>
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
                    <label for="title"> Successfully deleted Agency. <span class="text-danger">*</span></label>
                </div>
                <div class="modal-footer">
                    <button type="button" id="addSuccessBtn" class="btn btn-primary" data-dismiss="modal"> Close </button>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')

    <script src="{{ url('/js/agencies/scripts.js') }}"></script>
@endpush
