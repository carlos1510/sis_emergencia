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
                        {{-- <div class="col-lg-6">
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
                                              
                        </div> --}}
                        
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Tipo Profesional:</label>
                                <div>
                                    
                                    <label class="form-radio-label">
                                        <input class="form-radio-input" type="radio" value="MEDICO" name="tipo_profesional" ng-model="filtro.tipo_profesional" ng-change="listaprofesionales()">
                                        <span class="form-radio-sign">Personal Médico Atención</span>
                                    </label>
                                    <label class="form-radio-label">
                                        <input class="form-radio-input" type="radio" value="NO_MEDICO" name="tipo_profesional" ng-model="filtro.tipo_profesional" ng-change="listaprofesionales()">
                                        <span class="form-radio-sign">Personal No Medico</span>
                                    </label>
                                </div>
                                
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Estado de Impresión:</label>
                                <div>
                                    <label class="form-radio-label">
                                        <input class="form-radio-input" type="radio" value="" name="estado_impresion" ng-model="filtro.estado_impresion" >
                                        <span class="form-radio-sign">Todos</span>
                                    </label>
                                    <label class="form-radio-label">
                                        <input class="form-radio-input" type="radio" value="0" name="estado_impresion" ng-model="filtro.estado_impresion" >
                                        <span class="form-radio-sign">Pendientes</span>
                                    </label>
                                    <label class="form-radio-label">
                                        <input class="form-radio-input" type="radio" value="1" name="estado_impresion" ng-model="filtro.estado_impresion" >
                                        <span class="form-radio-sign">Impresos</span>
                                    </label>
                                </div>
                                
                            </div>
                        </div>
                        
                        
                    </div>
                    <div class="row">
                       
                            <div class="col-lg-2">                            
                                <div class="form-group">
                                    <label>Establecimiento: <span class="text-danger">*</span></label>
                                    <select class="form-control form-control-sm" id="cmbCod_2000Buscar" style="width: 100% !important;"   ng-model="filtro.cod_2000" name="cod_2000" ng-change="listaprofesionales()">
                                        <option value="">---</option>
                                        <option  ng-repeat="item in lista_establecimientoshis" value="@{{ item.codigo_unico }}">@{{ item.nombre_establecimiento }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-2 col-sm-12">
                                <div class="form-group">
                                    <label>Profesional:</label>
                                    <select class="form-control form-control-sm" id="cmbProfesionalBuscar" style="width: 100% !important;"   ng-model="filtro.idprofesional" name="idprofesional" >
                                        <option value="">---</option>
                                        <option  ng-repeat="item in lista_profesionales" value="@{{ item.idprofesional}}">@{{item.apellido_paterno_personal}} @{{item.apellido_materno_personal}} @{{item.nombres_personal}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <div class="form-group">
                                    <label>Fecha De:</label>
                                    <div class="input-group date"  >
                                        <div class="input-group-prepend">
                                            <span  class="input-group-text" ><i class="fa fa-calendar"  ></i></span>
                                        </div>
                                        <input class="form-control form-control-sm" type="text" id="fecha_iniciotxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-change="getDateInicio();" ng-model="filtro.fecha_inicio" name="fecha_inicio"  readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <div class="form-group">
                                    <label>Fecha Hasta:</label>
                                    <div class="input-group date">
                                        <div class="input-group-prepend">
                                            <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                        </div>
                                        <input class="form-control form-control-sm" type="text" id="fecha_finaltxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-change="fecha_final();" ng-model="filtro.fecha_final" name="fecha_final" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <div style="padding-top: 37px !important;">
                                    <button type="button" class="btn btn-sm btn-block btn-primary" ng-click="buscar();" ng-disabled="miFormulario.$invalid" ><i class="fa fa-search"></i> Buscar</button>
                                </div>
                                
                            </div>
                            <div class="col-lg-2">
                                <div style="padding-top: 37px ;">
                                    <button class="btn btn-success btn-block  btn-sm" ng-click="implementacionHis();">
                                        <i class="fa fa-print"></i>
                                        Imprimir
                                    </button>
                                </div>   
                            </div>
                            
                        
                    </div>
                </div>
                <div class="card-footer no-padding" id="lista_bloqueoDiv"  style="padding: 0px !important;">
                    <div class="table-responsive" id="lista_bloqueo2Div" style="padding-top: 15px !important;">
                        <table  class="table table-bordered">
                            <thead>
                            <tr>
                                <th>item</th>
                                <th scope="col">Nro. Doc.</th>
                                <th scope="col">Paciente</th>
                                <th scope="col">HC</th>
                                <th scope="col">Fecha de Atención</th>
                                <th scope="col">Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="item in lista">
                                <td>@{{$index+1}}</td>
                                <td>@{{ item.nro_documento }}</td>
                                
                                <td>@{{ item.nombres_paciente }} </td>
                                <td>@{{ item.hc }}</td>
                                <td>@{{ item.fecha_atencion }}</td>
                                
                                
                                <td>@{{ item.impresion }}</td>
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
