@extends('main')

@section('title')
    Inicio
@endsection

@section('bodycontroller')
    id='homeController' ng-controller='homeController'
@endsection

@section('content-header')
    <h4 class="page-title">Inicio</h4>
@endsection

@section('content')
    <div class="row">
        <div class="col-sm-6 col-md-3">
            <div class="card card-stats card-round">
                <div class="card-body ">
                    <div class="row align-items-center">
                        <div class="col-icon">
                            <div class="icon-big text-center icon-danger bubble-shadow-small">
                                <i class="flaticon-users"></i>
                            </div>
                        </div>
                        <div class="col col-stats ml-3 ml-sm-0">
                            <div class="numbers">
                                <p class="card-category">Emergencias</p>
                                <h4 class="card-title">@{{ reporte.total_emergencia | number:0 }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-3">
            <div class="card card-stats card-round">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-icon">
                            <div class="icon-big text-center icon-primary bubble-shadow-small">
                                <i class="flaticon-users"></i>
                            </div>
                        </div>
                        <div class="col col-stats ml-3 ml-sm-0">
                            <div class="numbers">
                                <p class="card-category">Urgencias</p>
                                <h4 class="card-title">@{{ reporte.total_urgencia | number:0 }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-3">
            <div class="card card-stats card-round">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-icon">
                            <div class="icon-big text-center icon-warning bubble-shadow-small">
                                <i class="fas fa-heartbeat"></i>
                            </div>
                        </div>
                        <div class="col col-stats ml-3 ml-sm-0">
                            <div class="numbers">
                                <p class="card-category">Trat. > 1 día</p>
                                <h4 class="card-title">@{{ reporte.total_tratamiento | number:0 }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-7">
            <div class="card">
                <div class="card-header bg-success">
                    <div class="card-head-row ">
                        <div class="card-title " style="color: #ffffff !important;"> Atenciones del Mes Actual</div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-container">
                        <canvas id="multipleLineChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="card">
                <div class="card-header bg-info">
                    <div class="card-head-row">
                        <div class="card-title" style="color: #ffffff !important;"> Atenciones del Año Actual</div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-container">
                        <canvas id="pieChart" style="width: 50%; height: 50%"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-warning">
                    <div class="card-head-row">
                        <div class="card-title" style="color: #ffffff !important;"> Atenciones del Año Actual</div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-container">
                        <canvas id="barChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de inicio -->
    <div id="modal-inicio" class="modal fade" aria-hidden="true">
        <div class="modal-dialog modal-open">
            <div class="modal-content">
                <div class="modal-header red2-bg">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title"><i class="fa fa-exclamation"></i> Aviso</h5>
                </div>
                <div class="modal-content">
                    <h3 class="text-center m-t-none m-b">Se realizó cambios en el sistema</h3>
                    {{--<div class="alert alert-success">
                        <strong>Actualizacion a la Fecha 13/06/2019</strong>
                        <p>Se Agrego el Modulo de planilla para los días Trabajados Mensualizados.</p>
                    </div>--}}
                    <div class="alert alert-warning">
                        <strong>Nota</strong>
                        <p>Deben eliminar los datos de navegación del Historial del navegador Google Chrome y volver a ingresar al sistema http://www.vycsoft.com/indicadoresfed/</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-lg-12">
                            <center>
                                <button type="button" class="btn btn-sm btn-white" data-dismiss="modal"><i class="fa fa-times"></i> Cerrar</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('javascripts')
    @parent
    <script src="js/angular/controller/homeController.js"></script>
    <script>

        $(function () {
            //Notify
            $.notify({
                icon: 'flaticon-alarm-1',
                title: 'SEUM',
                message: 'Sistema Emergencia y Urgencias Médicas',
            },{
                type: 'info',
                placement: {
                    from: "bottom",
                    align: "right"
                },
                time: 1000,
            });

            $(window).resize(function() {
                $(window).width();
            });

        });
    </script>
@endsection
