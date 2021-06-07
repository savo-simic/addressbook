@php
    use Illuminate\Pagination\Paginator;

    Paginator::useBootstrap();
@endphp

@extends('layouts.master')
@section('title', __('Professions'))
@section('content')
    <div class="container ml-1">
        <div class="row">
            @include('partials.sidebar')
            <div class="col-lg-6 col-sm-6 margin-tb">
                <div class="pull-left">
                    <h2>Crud operations for Professions</h2>
                </div>
                {{--                @if(\Illuminate\Support\Facades\Auth::user()->hasAnyRole('Administrator'))--}}
                {{--                    <div class="pull-right">--}}
                {{--                        <a class="btn btn-primary" href="{{ route('countries.create') }}"> Create New Country</a>--}}
                {{--                    </div>--}}
                <div class="pull-right">
                    <a href="javascript:void(0);" data-target="#addProfessionModal" data-toggle="modal" class="btn btn-success"> Create New Profession </a>
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
                        <th width="280px">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Show Profession Modal -->
    <div class="modal fade" id="showProfessionModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Profession Info</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <label for="title" id="professionId"></label><br>
                    <label for="title" id="professionName"></label><br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Create Profession modal -->
    <div class="modal fade" id="addProfessionModal" tabindex="-1" role="dialog" aria-labelledby="addProfessionModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addPostModalLabel"> Create Profession </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"> × </span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST" id="professionForm">
                        {{-- @csrf --}}
                        <input type="hidden" id="id_hidden" name="id" />
                        <div class="form-group">
                            <label for="title"> Name <span class="text-danger">*</span></label>
                            <input type="text" name="name" id="name" class="form-control">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="createProfessionBtn" onclick="createProfession(event)" class="btn btn-primary"> Save </button>
                </div>
                <div class="result"></div>
            </div>
        </div>
    </div>

    <!-- Update Profession modal -->
    <div class="modal fade" id="editProfessionModal" tabindex="-1" role="dialog" aria-labelledby="editProfessionModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addProfessionModalLabel"> Edit Profession </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"> × </span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST" id="professionForm">
                        {{-- @csrf --}}
                        <input type="hidden" name="professionId" id="professionId" />
                        <div class="form-group">
                            <label for="professionName"> Name <span class="text-danger">*</span></label>
                            <input type="text" name="professionName" id="professionName" class="form-control" value="">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="updateProfessionBtn" onclick="updateProfession()" class="btn btn-primary"> Save </button>
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
                    <label for="title"> Successfully deleted Professions <span class="text-danger">*</span></label>
                </div>
                <div class="modal-footer">
                    <button type="button" id="addSuccessBtn" class="btn btn-primary" data-dismiss="modal"> Close </button>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')

    <script src="{{ url('/js/professions/scripts.js') }}"></script>
@endpush
