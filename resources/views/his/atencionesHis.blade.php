@extends('main')

@section('title')
    Atenciones His
@endsection

@section('bodycontroller')
    id='atencionHisController' ng-controller='atencionHisController'
@endsection

@section('content-header')
    <h4 class="page-title">Atenciones HIS</h4>
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
            <a href="javascript:void(0)">Atención His</a>
        </li>
    </ul>
@endsection

@section('content')
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h4 class="card-title">Lista de Actividades HIS a Imprimir</h4>
                        <button class="btn btn-success btn-round ml-auto btn-sm" ng-click="prepararImpresion();">
                            <i class="fa fa-print"></i>
                            Imprimir
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <form method="GET" role="form" action="{{ url('exportarReporteNominalEmergencia') }}">
                        {!! csrf_field() !!}
                        <div class="row">
                            <div class="col-lg-6">
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
                        </div>
                        <div class="row">
                            <div class="col-lg-2">
                                <div class="form-group">
                                    <label>Tipo Atención:</label>
                                    <select class="form-control form-control-sm" id="cmbTipoAtencion" style="width: 100% !important;" ng-model="filtro.tipo_atencion"  >
                                        <option value="">Todos</option>
                                        <option value="0">Médica (Diagnosticos)</option>
                                        <option value="1">No Médica (Procedimientos)</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="form-group">
                                    <label>Personal de Atención:</label>
                                    <select class="form-control form-control-sm" id="cmbEstadoImpresion" style="width: 100% !important;" ng-model="filtro.estado_impresion"  >
                                        <option value="">---</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <div class="form-group">
                                    <label>Estado Impresión:</label>
                                    <select class="form-control form-control-sm" id="cmbEstadoImpresion" style="width: 100% !important;" ng-model="filtro.estado_impresion"  >
                                        <option value="">Todos</option>
                                        <option value="0">Pendientes</option>
                                        <option value="1">Impresos</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div style="padding-top: 37px !important;">
                                    <button type="button" class="btn btn-sm btn-block btn-primary" ng-click="buscar();"><i class="fa fa-search" ></i> Buscar</button>
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
                                <th scope="col">N°</th>
                                <th scope="col">HC</th>
                                <th scope="col">Nro. Doc.</th>
                                <th scope="col">Paciente</th>
                                <th scope="col">Fecha de Atención</th>
                                <th scope="col">Estado de Impresión</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="item in personas">
                                <td>@{{ item.nro_documento }}</td>
                                <td>@{{ item.apellido_paterno }} @{{ item.apellido_materno }} @{{ item.nombres }}</td>
                                <td>@{{ item.sexo }}</td>
                                <td>@{{ item.sexo }}</td>
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
    <script src="js/angular/controller/his/atencionHisController.js"></script>
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
