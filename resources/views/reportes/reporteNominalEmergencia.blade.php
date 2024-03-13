@extends('main')

@section('title')
    Nominal - Emergencia
@endsection

@section('bodycontroller')
    id='reporteNominalEmergenciaController' ng-controller='reporteNominalEmergenciaController'
@endsection

@section('content-header')
    <h4 class="page-title">Reporte Nominal Emergencia</h4>
    <ul class="breadcrumbs">
        <li class="nav-home">
            <a href="{{ url('home') }}">
                <i class="flaticon-home"></i>
            </a>
        </li>
        <li class="separator">
            <i class="flaticon-right-arrow"></i>
        </li>
        <li class="nav-item">
            <a href="javascript:void(0)">Reportes</a>
        </li>
        <li class="separator">
            <i class="flaticon-right-arrow"></i>
        </li>
        <li class="nav-item">
            <a href="#">Nominal Emergencia</a>
        </li>
    </ul>
@endsection

@section('content')
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h4 class="card-title">Lista de Registros Nominal de Emergencias</h4>
                    </div>
                </div>
                <div class="card-body">
                    <form method="GET" role="form" action="{{ url('exportarReporteNominalEmergencia') }}">
                        {!! csrf_field() !!}
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Establecimiento:</label>
                                    <select class="form-control form-control-sm" id="cmbCod_2000Buscar" style="width: 100% !important;" ng-model="filtro.cod_2000" name="cod_2000" >
                                        <option value="">---</option>
                                        <option ng-repeat="item in lista_establecimientos" value="@{{ item.codigo_unico }}">@{{ item.nombre_establecimiento }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Fecha De:</label>
                                    <div class="input-group date">
                                        <div class="input-group-prepend">
                                            <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                        </div>
                                        <input class="form-control form-control-sm" type="text" id="fecha_iniciotxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-model="filtro.fecha_inicio" name="fecha_inicio" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Fecha Hasta:</label>
                                    <div class="input-group date">
                                        <div class="input-group-prepend">
                                            <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                        </div>
                                        <input class="form-control form-control-sm" type="text" id="fecha_finaltxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-model="filtro.fecha_final" name="fecha_final" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-1">
                                <div style="padding-top: 37px !important;">
                                    <button type="button" class="btn btn-sm btn-block btn-primary"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <div style="padding-top: 37px !important;">
                                    <button type="submit" class="btn btn-sm btn-block btn-success"><i class="fa fa-file-excel"></i> Exportar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-footer no-padding" id="lista_bloqueoDiv">
                    <div class="table-responsive" id="lista_bloqueo2Div">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Nro. Doc.</th>
                                <th scope="col">Paciente</th>
                                <th scope="col">HC</th>
                                <th scope="col">Fecha de Atención</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="item in personas">
                                <td>@{{ item.nro_documento }}</td>
                                <td>@{{ item.apellido_paterno }} @{{ item.apellido_materno }} @{{ item.nombres }}</td>
                                <td>@{{ item.sexo }}</td>
                                <td>@{{ item.sexo }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('javascripts')
    @parent
    <script src="js/angular/controller/reportes/reporteNominalEmergenciaController.js"></script>
    <script>
        $(function () {
            $('select').select2();
            $('#fecha_iniciotxt').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy'
            });

            $('#fecha_finaltxt').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy'
            });
        });
    </script>
@endsection