<style>
    ::-webkit-scrollbar {
        display: none;
    }
    .sidebar-menu {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
        height: 100vh;
        width: 230px;
        overflow: hidden;
        background: #303641;
        box-shadow: 2px 0 32px rgba(0, 0, 0, 0.05);
        -webkit-transition: all 0.3s ease 0s;
        transition: all 0.3s ease 0s;
    }

    .sbar_collapsed .sidebar-menu {
        left: -280px;
    }

    .main-menu {
        height: calc(100% - 100px);
        overflow: hidden;
        padding: 20px 10px 0 0;
        -webkit-transition: all 0.3s ease 0s;
        transition: all 0.3s ease 0s;
    }

    .menu-inner {
        overflow-y: scroll;
        height: 100%;
    }

    .slimScrollBar {
        background: #fff!important;
        opacity: 0.1!important;
    }

    .sidebar-header {
        padding: 19px 32px 20px;
        background: #303641;
        border-bottom: 1px solid #343e50;
    }
    .sidebar-menu .logo{
        text-align: center;
    }
    .logo a {
        display: inline-block;
        max-width: 120px;
    }

    .metismenu >li >a {
        padding-left: 32px!important;
    }
    .metismenu li a {
        position: relative;
        display: block;
        color: #8d97ad;
        font-size: 15px;
        text-transform: capitalize;
        padding: 15px 15px;
        letter-spacing: 0;
        font-weight: 400;
    }

    .metismenu li a i {
        color: #6a56a5;
        -webkit-transition: all 0.3s ease 0s;
        transition: all 0.3s ease 0s;
    }

    .metismenu li a:after {
        position: absolute;
        content: '\f107';
        font-family: fontawesome;
        right: 15px;
        top: 12px;
        color: #8d97ad;
        font-size: 20px;
    }

    .metismenu li.active>a:after {
        content: '\f106';
    }

    .metismenu li a:only-child:after {
        content: '';
    }

    .metismenu li a span {
        margin-left: 10px;
    }

    .metismenu li.active>a,
    .metismenu li:hover>a {
        color: #fff;
    }

    .metismenu li li a {
        padding: 8px 20px;
    }

    .metismenu li ul {
        padding-left: 37px;
    }

    .metismenu >li:hover>a,
    .metismenu >li.active>a {
        color: #fff;
        background: #343942;
    }

    .metismenu li:hover>a,
    .metismenu li.active>a {
        color: #fff;
    }

    .metismenu li:hover>a i,
    .metismenu li.active>a i {
        color: #fff;
    }

    .metismenu li li a:after {
        top: 6px;
    }

</style>
<div class="col-md-3 col-lg-3 col-sm-3">
    <div class="sidebar-menu ">
        <div class="sidebar-header">
            <div class="logo">
                <p style="color: white">Dashboard</p>
            </div>
        </div>
        <div class="main-menu">
            <div class="menu-inner">
                <nav>
                    <ul class="metismenu" id="menu">
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('countries.index')}}">Countries</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('cities.index')}}">Cities</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('agencies.index')}}">Agencies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('contacts.index') }}">Contacts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('professions.index') }}">Professions</a>
                        </li>
    {{--                    <li class="nav-item">--}}
    {{--                        <a class="nav-link" href="{{ route('edit.user') }}">Edit user</a>--}}
    {{--                    </li>--}}
    {{--                    <li class="nav-item">--}}
    {{--                        <a class="nav-link" href="{{ route('signout') }}">Logout</a>--}}
    {{--                    </li>--}}
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>
