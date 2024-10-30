@extends('app')
@section('title') @endsection

@section('stylesheets')
    <link rel="icon" href="{{ asset('template/assets/img/icon.ico') }}" type="image/x-icon"/>

    <!-- Fonts and icons -->
    <script src="{{ asset('template/assets/js/plugin/webfont/webfont.min.js') }}"></script>
    <script>
        WebFont.load({
            google: {"families":["Open+Sans:300,400,600,700"]},
            custom: {"families":["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands"], urls: ['template/assets/css/fonts.css']},
            active: function() {
                sessionStorage.fonts = true;
            }       
        });
    </script>

    <!-- CSS Files -->
    <link rel="stylesheet" href="{{ asset('template/assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('template/assets/css/azzara.min.css') }}">

    <!-- CSS Just for demo purpose, don't include it in your project -->
    <link rel="stylesheet" href="{{ asset('template/assets/css/demo.css') }}">
    <!-- Select2 -->
    <link rel="stylesheet" href="{{ asset('plugins/select2/css/select2.min.css') }}">

    <link href="{{ asset('plugins/datapicker/datepicker3.css') }}" rel="stylesheet">


@endsection

@section('body')

    <div class="wrapper">
        <!--
            Tip 1: You can change the background color of the main header using: data-background-color="blue | purple | light-blue | green | orange | red"
        -->
        <div class="main-header" data-background-color="purple">
            <!-- Logo Header -->
            <div class="logo-header">

                <a href="index.html" class="logo">
                    <img src="template/assets/img/logo_seum.png" alt="navbar brand" class="navbar-brand">
                </a>
                <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon">
						<i class="fa fa-bars"></i>
					</span>
                </button>
                <button class="topbar-toggler more"><i class="fa fa-ellipsis-v"></i></button>
                <div class="navbar-minimize">
                    <button class="btn btn-minimize btn-rounded">
                        <i class="fa fa-bars"></i>
                    </button>
                </div>
            </div>
            <!-- End Logo Header -->

            <!-- Navbar Header -->
            <nav class="navbar navbar-header navbar-expand-lg">
                <div class="container-fluid">
                    <ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
                        <li class="nav-item toggle-nav-search hidden-caret">
                            <a class="nav-link" data-toggle="collapse" href="#search-nav" role="button" aria-expanded="false" aria-controls="search-nav">
                                <i class="fa fa-search"></i>
                            </a>
                        </li>
                        <li class="nav-item dropdown hidden-caret">
                            <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false">
                                <div class="avatar-sm">
                                    <img src="{{ asset('template/assets/img/profile1.jpg') }}" alt="..." class="avatar-img rounded-circle">
                                </div>
                            </a>
                            <ul class="dropdown-menu dropdown-user animated fadeIn">
                                <li>
                                    <div class="user-box">
                                        <div class="avatar-lg"><img src="{{ asset('template/assets/img/profile1.jpg') }}" alt="image profile" class="avatar-img rounded"></div>
                                        <div class="u-text">
                                            <h4>{{ Session::get('nombres') }}</h4>
                                            <p class="text-muted"></p><!--<a href="profile.html" class="btn btn-rounded btn-danger btn-sm">View Profile</a>-->
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown-divider"></div>
                                    <!--<a class="dropdown-item" href="#">My Profile</a>
                                    <a class="dropdown-item" href="#">My Balance</a>
                                    <a class="dropdown-item" href="#">Inbox</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Account Setting</a>-->
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="{{ url('logout') }}">Cerrar Sesion</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <!-- End Navbar -->
        </div>

        <!-- Sidebar -->
        <div class="sidebar">

            <div class="sidebar-background"></div>
            <div class="sidebar-wrapper scrollbar-inner">
                <div class="sidebar-content">
                    <div class="user">
                        <div class="avatar-sm float-left mr-2">
                            <img src="{{ asset('template/assets/img/profile1.jpg') }}" alt="..." class="avatar-img rounded-circle">
                        </div>
                        <div class="info">
                            <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
								<span>
									{{ Session::get('nombres') }}
									<span class="user-level">{{ Session::get('nom_nivel') }}</span>
									<span class="user-level">@if(Session::get('idnivel') == 2) {{ Session::get('nom_disa') }} @elseif(Session::get('idnivel') == 3) {{ Session::get('nom_red') }} @elseif(Session::get('idnivel') == 4) {{ Session::get('nom_microred') }} @elseif(Session::get('idnivel') == 5 || Session::get('idnivel') == 6 || Session::get('idnivel') == 7) {{ Session::get('nom_eess') }} @endif</span>
									<span class="caret"></span>
								</span>
                            </a>
                            <div class="clearfix"></div>

                            <div class="collapse in" id="collapseExample">
                                <ul class="nav">
                                   <!-- <li>
                                        <a href="#profile">
                                            <span class="link-collapse">My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#edit">
                                            <span class="link-collapse">Edit Profile</span>
                                        </a>
                                    </li> -->
                                    <li>
                                        <a href="{{ url('logout') }}">
                                            <span class="link-collapse">Cerrar Sesión</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul class="nav">
                        <li @if(Session::get('menu_primario')=='home') class="nav-item active" @else class="nav-item" @endif>
                            <a href="{{ url('home') }}">
                                <i class="fas fa-home"></i>
                                <p>Inicio</p>
                            </a>
                        </li>
                        <li @if(Session::get('menu_primario')=='emergencia') class="nav-item active" @else class="nav-item" @endif>
                            <a href="{{ url('emergencia') }}">
                                <i class="fas fa-medkit"></i>
                                <p>Emergencia</p>
                            </a>
                        </li>

                        <!--<li @if(Session::get('menu_primario')=='hospitalizacion') class="nav-item active" @else class="nav-item" @endif>
                            <a href="{{ url('emergencia') }}">
                                <i class="fas fa-hospital"></i>
                                <p>Hospitalización</p>
                            </a>
                        </li>-->

                        {{-- <li @if(Session::get('menu_primario')=='his') class="nav-item active" @else class="nav-item" @endif>
                            <a href="{{ url('atencion_his') }}">
                                <i class="fas fa-file-invoice"></i>
                                <p>Atención HIS</p>
                            </a>
                        </li> --}}

                        <li  @if(Session::get('menu_primario')=='reportes')class="nav-item submenu active" @else class="nav-item" @endif>
                            <a data-toggle="collapse" href="#planin" @if(Session::get('menu_primario')=='reportes')class="collapse" @else class="" @endif >
                                <i class="fas fa-chart-line"></i>
                                <p>Reportes</p>
                                <span class="caret"></span>
                            </a>
                            <div id="planin" @if(Session::get('menu_primario')=='reportes')class="collapse show" @else class="collapse" @endif>
                                <ul class="nav nav-collapse">
                                    <li @if(Session::get('menu_secundario')=='registro_diario') class="active" @else class="" @endif>
                                        <a href="{{ url('registro_diario') }}">
                                            <span class="sub-item">Registro Diario</span>
                                        </a>
                                    </li>
                                    <li @if(Session::get('menu_secundario')=='nominal_emergencia') class="active" @else class="" @endif>
                                        <a href="{{ url('nominal_emergencia') }}">
                                            <span class="sub-item">Nominal Emergencia</span>
                                        </a>
                                    </li>
                                    
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a data-toggle="collapse" href="#custompages">
                                <i class="fas fa-cogs"></i>
                                <p>Configuracion</p>
                                <span class="caret"></span>
                            </a>
                            <div class="collapse" id="custompages">
                                <ul class="nav nav-collapse">
                                    @if(Session::get('idnivel') == 1 || Session::get('idnivel') ==2)
                                    <li>
                                        <a href="{{ url('importar') }}">
                                            <span class="sub-item">Importar</span>
                                        </a>
                                    </li>
                                    @endif
                                    <li>
                                        <a href="{{ url('profesional') }}">
                                            <span class="sub-item">Profesional</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- End Sidebar -->

        <div class="main-panel">
            <div class="content">
                <div class="page-inner">

                    <div class="page-header">

                        @yield('content-header')

                    </div>

                    @yield('content')

                </div>
            </div>

        </div>

        <!-- Custom template | don't include it in your project! -->
        <div class="custom-template">
            <div class="title">Settings</div>
            <div class="custom-content">
                <div class="switcher">
                    <div class="switch-block">
                        <h4>Topbar</h4>
                        <div class="btnSwitch">
                            <button type="button" class="changeMainHeaderColor" data-color="blue"></button>
                            <button type="button" class="selected changeMainHeaderColor" data-color="purple"></button>
                            <button type="button" class="changeMainHeaderColor" data-color="light-blue"></button>
                            <button type="button" class="changeMainHeaderColor" data-color="green"></button>
                            <button type="button" class="changeMainHeaderColor" data-color="orange"></button>
                            <button type="button" class="changeMainHeaderColor" data-color="red"></button>
                        </div>
                    </div>
                    <div class="switch-block">
                        <h4>Background</h4>
                        <div class="btnSwitch">
                            <button type="button" class="changeBackgroundColor" data-color="bg2"></button>
                            <button type="button" class="changeBackgroundColor selected" data-color="bg1"></button>
                            <button type="button" class="changeBackgroundColor" data-color="bg3"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="custom-toggle">
                <i class="flaticon-settings"></i>
            </div>
        </div>
        <!-- End Custom template -->
    </div>

@endsection

@section('javascripts')
        <!--   Core JS Files   -->
    <script src="{{ asset('template/assets/js/core/jquery.3.2.1.min.js') }}"></script>
    <script src="{{ asset('template/assets/js/core/popper.min.js') }}"></script>
    <script src="{{ asset('template/assets/js/core/bootstrap.min.js') }}"></script>

    <!-- jQuery UI -->
    <script src="{{ asset('template/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('template/assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js') }}"></script>

    <!-- jQuery Scrollbar -->
    <script src="{{ asset('template/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js') }}"></script>

    <!-- Moment JS -->
    <script src="{{ asset('template/assets/js/plugin/moment/moment.min.js') }}"></script>

    <!-- Chart JS -->
    <script src="{{ asset('template/assets/js/plugin/chart.js/chart.min.js') }}"></script>

    <!-- jQuery Sparkline -->
    <script src="{{ asset('template/assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js') }}"></script>

    <!-- Chart Circle -->
    <script src="{{ asset('template/assets/js/plugin/chart-circle/circles.min.js') }}"></script>

    <!-- Datatables -->
    <script src="{{ asset('template/assets/js/plugin/datatables/datatables.min.js') }}"></script>

    <!-- Bootstrap Notify -->
    <script src="{{ asset('template/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js') }}"></script>

    <!-- Bootstrap Toggle -->
    <script src="{{ asset('template/assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js') }}"></script>


    <!-- Sweet Alert -->
    <script src="{{ asset('template/assets/js/plugin/sweetalert/sweetalert.min.js') }}"></script>

    <!-- Azzara JS -->
    <script src="{{ asset('template/assets/js/ready.min.js') }}"></script>

    <!-- Select2 -->
    <script src="{{ asset('plugins/select2/js/select2.full.min.js') }}"></script>

    <script src="{{ asset('plugins/datapicker/bootstrap-datepicker.js') }}"></script>
    <script src="{{ asset('plugins/jasny/jasny-bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/jquery.blockUI.js') }}"></script>
    <script src="{{ asset('js/jspdf.min.js') }}"></script>




    <!--<script src="{{ asset('js/plugins/dataTables/datatables.min.js') }}"></script>
    <script src="{{ asset('js/plugins/dataTables/dataTables.bootstrap4.min.js') }}"></script>-->

    <!-- <script src="js/bootstrap-datepicker.js"></script>-->

    <!-- Sweet alert -->
    <!-- <script src="js/plugins/sweetalert/sweetalert.min.js"></script> -->

    <!-- Full Calendar -->
    <!--<script src="js/plugins/fullcalendar/fullcalendar.min.js"></script>-->
    <!--<script src="js/FullCalendar_v1.6.4.js"></script>-->

    <!-- Librerias AngularJS -->
    <script src="{{ asset('js/angular/angular.min.js') }}"></script>
    <script src="{{ asset('js/angular/app.js') }}"></script>
    <script src="{{ asset('js/angular/services.js') }}"></script>
    <script src="{{ asset('js/angular/angular-datatables.min.js') }}"></script>
    <script src="{{ asset('js/angular/ng-alertify.js') }}"></script>
    <script src="{{ asset('js/accesorios.js') }}"></script>
    <script src="{{ asset('js/numeric.js') }}"></script>
    <script>
        $(function () {

            $(window).resize(function() {
                $(window).width();
            });


            $('.changeMainHeaderColor').on('click', function(){
                if($(this).attr('data-color') == 'default'){
                    $('.main-header').removeAttr('data-background-color');
                } else {
                    $('.main-header').attr('data-background-color', $(this).attr('data-color'));
                }

                $(this).parent().find('.changeMainHeaderColor').removeClass("selected");
                $(this).addClass("selected");
                layoutsColors();
            });

            $('.changeBackgroundColor').on('click', function(){
                $('body').removeAttr('data-background-color');
                $('body').attr('data-background-color', $(this).attr('data-color'));
                $(this).parent().find('.changeBackgroundColor').removeClass("selected");
                $(this).addClass("selected");
            });

            var toggle_customSidebar = false,
                    custom_open = 0;

            if(!toggle_customSidebar) {
                var toggle = $('.custom-template .custom-toggle');

                toggle.on('click', (function(){
                            if (custom_open == 1){
                                $('.custom-template').removeClass('open');
                                toggle.removeClass('toggled');
                                custom_open = 0;
                            }  else {
                                $('.custom-template').addClass('open');
                                toggle.addClass('toggled');
                                custom_open = 1;
                            }
                        })
                );
                toggle_customSidebar = true;
            }
        });
    </script>

@endsection
