<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container">
    <span class="navbar-brand">{{ config('app.name') }}</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="main_navigation">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="{{ url('/') }}">{{ __('Countries') }}</a>
        </li>
        <li class="nav-item">
           <a class="nav-link" href="{{ route('back.countries.favorites') }}">{{ __('Favorites') }}</a>
        </li>
        <li class="nav-item">
           <a class="nav-link" href="{{ route('back.settings.index') }}">{{ __('Settings') }}</a>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
           <a class="nav-link" href="{{ route('back.logout') }}">{{ __('Logout') }}</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
