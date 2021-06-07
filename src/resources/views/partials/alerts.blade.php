@if( $errors->any() )
  <div class="alert alert-danger">
    {!! implode('<br>', $errors->all('<span>:message</span>')) !!}
  </div>
@endif

@if(session()->has('alert_error'))
  <div class="alert alert-danger">
    {{ session()->get('alert_error') }}
  </div>
@endif

@if(session()->has('alert_info'))
  <div class="alert alert-info">
    {{ session()->get('alert_info') }}
  </div>
@endif

@if(session()->has('alert_success'))
  <div class="alert alert-success">
    {{ session()->get('alert_success') }}
  </div>
@endif
