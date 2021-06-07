@php
    use Illuminate\Pagination\Paginator;

    Paginator::useBootstrap();
@endphp

@extends('layouts.master')
@section('title', __('Contacts'))
@section('content')
    <div class="container ml-1">
        <div class="row">
            @include('partials.sidebar')
            <div class="col-lg-8 col-sm-8 margin-tb">
                <div class="pull-left">
                    <h2>Crud operations for Contacts</h2>
                </div>
{{--                @if(\Illuminate\Support\Facades\Auth::user()->hasAnyRole('Administrator'))--}}
{{--                    <div class="pull-right">--}}
{{--                        <a class="btn btn-primary" href="{{ route('countries.create') }}"> Create New Country</a>--}}
{{--                    </div>--}}
                    <div class="pull-right">
                        <a href="javascript:void(0);" data-target="#addContactModal" data-toggle="modal" class="btn btn-success"> Create New Contact </a>
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Web</th>
                        <th width="480px">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Show Contact Modal -->
    <div class="modal fade" id="showContactModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Contact Info</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <label for="title" id="countryId"></label><br>
                    <label for="title" id="contactFirstName"></label><br>
                    <label for="title" id="contactLastName"></label><br>
                    <label for="title" id="contactPhone"></label><br>
                    <label for="title" id="contactEmail"></label><br>
                    <label for="title" id="contactWeb"></label><br>
                    <div class="col-md-12 mb-2">
                        <img id="image_preview_container" src="{{ url('/images/') }}"
                             alt="preview image" style="max-height: 150px;">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Create Contact modal -->
    <div class="modal fade" id="addContactModal" tabindex="-1" role="dialog" aria-labelledby="addContactModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addContactModalLabel"> Create Contact </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"> × </span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST" id="contactForm" enctype="multipart/form-data">
                        {{-- @csrf --}}
                        <input type="hidden" id="id_hidden" name="id" />
                        <input type="hidden" name="agencyId" id="agencyId" />
                        <div class="form-group">
                            <label for="first_name">First Name <span class="text-danger">*</span></label>
                            <input type="text" name="first_name" id="first_name" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="first_name">Last Name <span class="text-danger">*</span></label>
                            <input type="text" name="last_name" id="last_name" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="agency_id">Agency:</label>
                            <select name="agency_id" id="agency_id" class="form-control">
                                <option value="0">-- Select Agency --</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone <span class="text-danger">*</span></label>
                            <input type="text" name="phone" id="phone" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="email">Email <span class="text-danger">*</span></label>
                            <input type="text" name="email" id="email" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="web">Web <span class="text-danger">*</span></label>
                            <input type="text" name="web" id="web" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="avatar">Avatar <span class="text-danger">*</span></label>
                            <input type="file" name="avatar" id="avatar" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <img id="image_preview_container" src="{{ url('/images/') }}"
                                 alt="preview image" style="max-height: 150px;">
                        </div>
                        <button type="submit" id="createContactBtn" class="btn btn-primary"> Save </button>
                    </form>
                </div>
                <div class="modal-footer">
{{--                    <button type="submit" id="createContactBtn" class="btn btn-primary"> Save </button>--}}
                </div>
                <div class="result"></div>
            </div>
        </div>
    </div>

    <!-- Update Contact modal -->
    <div class="modal fade" id="editContactModal" tabindex="-1" role="dialog" aria-labelledby="editContactModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addPostModalLabel"> Edit Contact </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"> × </span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST" id="contactForm" enctype="multipart/form-data">
                        {{-- @csrf --}}
                        <input type="hidden" name="countryId" id="countryId" />
                        <div class="form-group">
                            <label for="first_name">First Name <span class="text-danger">*</span></label>
                            <input type="text" name="first_name" id="first_name" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="first_name">Last Name <span class="text-danger">*</span></label>
                            <input type="text" name="last_name" id="last_name" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="email">Email <span class="text-danger">*</span></label>
                            <input type="text" name="email" id="email" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="web">Web <span class="text-danger">*</span></label>
                            <input type="text" name="web" id="web" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label for="avatar">Avatar <span class="text-danger">*</span></label>
                            <input type="file" name="avatar" id="avatar" class="form-control" value="">
                        </div>
                        <div class="col-md-12 mb-2">
                            <img id="image_preview_container" src="{{ url('/images/') }}"
                                 alt="preview image" style="max-height: 150px;">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="updateCountryBtn" onclick="updateCountry()" class="btn btn-primary"> Save </button>
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
                    <label for="title"> Successfully deleted Contact. <span class="text-danger">*</span></label>
                </div>
                <div class="modal-footer">
                    <button type="button" id="addSuccessBtn" class="btn btn-primary" data-dismiss="modal"> Close </button>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')

    <script src="{{ url('/js/contacts/scripts.js') }}"></script>
@endpush
