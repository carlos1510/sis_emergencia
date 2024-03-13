@extends('main')

@section('title')
    Registro Diario - HIS
@endsection

@section('bodycontroller')
    id='registroDiarioController' ng-controller='registroDiarioController'
@endsection

@section('content-header')
    <h4 class="page-title">Registro Diario - HIS</h4>
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
            <a href="#">Registro Diario</a>
        </li>
    </ul>
@endsection

@section('content')
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h4 class="card-title">Lista de Reporte Registro Díario para HIS</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Tipo de Servicio:</label>
                                <div>
                                    <label class="form-radio-label">
                                        <input class="form-radio-input" type="radio" value="EMERGENCIA" name="tipo_servicio" ng-model="filtro.tipo_servicio">
                                        <span class="form-radio-sign">EMERGENCIA</span>
                                    </label>
                                    <label class="form-radio-label" style="display: none">
                                        <input class="form-radio-input" type="radio" value="HOSPITALIZACION" name="tipo_servicio" ng-model="filtro.tipo_servicio" >
                                        <span class="form-radio-sign">HOSPITALIZACION</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Tipo Profesional:</label>
                                <div>
                                    <label class="form-radio-label">
                                        <input class="form-radio-input" type="radio" value="MEDICO" name="tipo_profesional" ng-model="filtro.tipo_profesional">
                                        <span class="form-radio-sign">Personal Médico Atención</span>
                                    </label>
                                    <label class="form-radio-label">
                                        <input class="form-radio-input" type="radio" value="ENFERMERO_OBSTETRIZ" name="tratamiento_adicional" ng-model="filtro.tipo_profesional" >
                                        <span class="form-radio-sign">Personal Enfermero/Obstetriz Registro</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-group">
                                <label>Profesional:</label>
                                <select class="form-control form-control-sm" id="cmbProfesionalBuscar" style="width: 100% !important;" ng-model="filtro.id_profesional" >
                                    <option value="">---</option>
                                    <option ng-repeat="item in lista_profesional" value="@{{ item.idprofesional }}">@{{ item.nombres }} @{{ item.apellido_paterno }} @{{ item.apellido_materno }}</option>
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
                        <div class="col-lg-2">
                            <div style="padding-top: 37px !important;">
                                <button type="button" class="btn btn-sm btn-block btn-primary"><i class="fa fa-search"></i> Buscar</button>
                            </div>
                        </div>
                    </div>
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
    <script src="js/angular/controller/reportes/registroDiarioController.js"></script>
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
