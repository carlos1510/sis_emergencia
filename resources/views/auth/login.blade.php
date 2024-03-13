@extends('layouts.app')

@section('content')
    <script src='{{ asset('template_login/js/jquery/1.10.2/jquery.min.js') }}'></script><script src="js/monetization.js" type="text/javascript"></script>
    <script>
        (function(){
            if(typeof _bsa !== 'undefined' && _bsa) {
                // format, zoneKey, segment:value, options
                _bsa.init('flexbar', 'CKYI627U', 'placement:w3layoutscom');
            }
        })();
    </script>
    <script>
        (function(){
            if(typeof _bsa !== 'undefined' && _bsa) {
                // format, zoneKey, segment:value, options
                _bsa.init('fancybar', 'CKYDL2JN', 'placement:demo');
            }
        })();
    </script>
    <script>
        (function(){
            if(typeof _bsa !== 'undefined' && _bsa) {
                // format, zoneKey, segment:value, options
                _bsa.init('stickybox', 'CKYI653J', 'placement:w3layoutscom');
            }
        })();
    </script>
    <!--<script>(function(v,d,o,ai){ai=d.createElement("script");ai.defer=true;ai.async=true;ai.src=v.location.protocol+o;d.head.appendChild(ai);})(window, document, "//a.vdo.ai/core/w3layouts_V2/vdo.ai.js?vdo=34");</script>-->
    <div id="codefund"><!-- fallback content --></div>
    <script src="{{ asset('template_login/js/funder.js') }}" async="async"></script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src='https://www.googletagmanager.com/gtag/js?id=UA-149859901-1'></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-149859901-1');
    </script>

    <script>
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', 'UA-149859901-1', 'demo.w3layouts.com');
        ga('require', 'eventTracker');
        ga('require', 'outboundLinkTracker');
        ga('require', 'urlChangeTracker');
        ga('send', 'pageview');
    </script>
    <script async src="{{ asset('template_login/js/autotrack.js') }}"></script>

    <meta name="robots" content="noindex">
    <link rel="stylesheet" href="{{ asset('template_login/images/demobar_w3_4thDec2019.css') }}">

    <!-- bg effect -->
    <div id="bg">
        <canvas></canvas>
        <canvas></canvas>
        <canvas></canvas>
    </div>
    <!-- //bg effect -->
    <!-- title -->
    <h1>Bienvenido</h1>
    <!-- //title -->
    <!---728x90--->

    <!-- content -->
    <div class="sub-main-w3">
        <form role="form" method="POST" action="{{ url('login') }}">
            {{ csrf_field() }}
            <h2>Inicie Sesión
                <i class="fas fa-level-down-alt"></i>
            </h2>
            <div class="form-style-agile {{ $errors->has('usuario') ? ' has-error' : '' }}" data-validate = "Ingrese Usuario">
                <label>
                    <i class="fas fa-user"></i>
                    Usuario
                </label>
                <input placeholder="Usuario" name="usuario" type="text" required="" value="{{ old('usuario') }}" >
                {!! $errors->first('usuario', '<center><strong class="help-block has-error">:message</strong></center>') !!}
            </div>
            <div class="form-style-agile {{ $errors->has('clave') ? ' has-error' : '' }}" data-validate="Ingrese password">
                <label>
                    <i class="fas fa-unlock-alt"></i>
                    Contraseña
                </label>
                <div class="input-group">
                    <input id="id_password" class="input-password" type="password" required="" placeholder="Contraseña" name="clave">
                    <div id="div-eye-passwd" class="input-group-addon" style="cursor: pointer;">
                        <i id="eye-addon" class="fa fa-eye-slash"></i>
                    </div>
                </div>
                {!! $errors->first('clave', '<strong class="help-block has-error">:message</strong>') !!}
            </div>
            <!-- checkbox -->
            <!--<div class="wthree-text">
                <ul>
                    <li>
                        <label class="anim">
                            <input type="checkbox" class="checkbox" >
                            <span>Mostrar Contraseña</span>
                        </label>
                    </li>
                </ul>
            </div>-->
            <!-- //checkbox -->
            <input type="submit" value="Entrar">
        </form>
    </div>
    <!-- //content -->
    <!---728x90--->
    <!-- copyright -->
    <div class="footer">
        <p>&copy; 2021 SUREM. | Desarrollado por
            <a href="http://vycsoft.com/" target="_blank">Carlos C. Vasquez Cisneros</a>
        </p>
    </div>
    <!-- //copyright -->
    <!---728x90--->

    <!-- Jquery -->
    <script src="{{ asset('template_login/js/jquery-3.3.1.min.js') }}"></script>
    <!-- //Jquery -->

    <!-- effect js -->
    <script src="{{ asset('template_login/js/canva_moving_effect.js') }}"></script>
    <!-- //effect js -->

@endsection

@section('javascript')
    <script>
        $(function () {
            $("#div-eye-passwd").mousedown(function () {
                $("#eye-addon").removeClass("fa-eye-slash").addClass("fa-eye");
                $(".input-password").attr("type", "text");
            }).mouseup(function () {
                $("#eye-addon").removeClass("fa-eye").addClass("fa-eye-slash");
                $(".input-password").attr("type", "password")
            });
        });
    </script>
@endsection