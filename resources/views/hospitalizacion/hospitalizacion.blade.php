@extends('main')

@section('title')
    Hospitalizacion
@endsection

@section('bodycontroller')
    id='hospitalizacionController' ng-controller='hospitalizacionController'
@endsection

@section('content')

   <div class="row">
       <div class="col-lg-12">
           <div class="card">
               <div class="card-header">
                   <h5><i class="fa fa-align-justify"></i> Registrar Profesional</h5>
               </div>
               <div class="card-body pb-2">
                   <div class="row">
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Tipo Documento:</label>
                               <select class="form-control" style="width: 100% !important;">
                                   <option value="">---</option>
                               </select>
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Número Documento:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Condición Contrato:</label>
                               <select class="form-control" style="width: 100% !important;">
                                   <option value="">---</option>
                               </select>
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Tipo Profesión:</label>
                               <select class="form-control" style="width: 100% !important;">
                                   <option value="">---</option>
                               </select>
                           </div>
                       </div>
                   </div>
                   <div class="row">
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Apellido Paterno:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Apellido Materno:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Nombres:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Sexo</label>
                               <select class="form-control" style="width: 100% !important;">
                                   <option value="">---</option>
                               </select>
                           </div>
                       </div>
                   </div>
                   <div class="row">
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Distrito Residencia:</label>
                               <select class="form-control" style="width: 100% !important;">
                                   <option value="">---</option>
                               </select>
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Dirección:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Fecha Nacimiento:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Nro. Telefono:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                   </div>
                   <div class="row">
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Codigo Colegiatura:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Establecimiento:</label>
                               <select class="form-control" style="width: 100% !important;">
                                   <option value="">---</option>
                               </select>
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Fecha Ingreso:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                       <div class="col-lg-3">
                           <div class="form-group">
                               <label>Fecha Baja:</label>
                               <input type="text" class="form-control" />
                           </div>
                       </div>
                   </div>
               </div>
               <div class="card-footer">
                   <center>
                       <button type="button" class="btn btn-danger"><i class="fa fa-times"></i> Salir</button>
                       <button type="button" class="btn btn-primary"><i class="fa fa-save"></i> Guardar</button>
                   </center>
               </div>
           </div>
       </div>
   </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5><i class="fa fa-align-justify"></i> Lista de Profesionales de Salud</h5>
                    <div class="ibox-tools">
                        <button type="button" data-toggle="modal" data-target="#modal-form" class="btn btn-sm btn-success" ng-click="nuevo()"><i class="fa fa-plus-circle"></i> Agregar Profesional</button>
                    </div>
                </div>
                <div id="lista_bloqueoDiv">
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <span>Red:</span>
                                        <select class="form-control" style="width: 100%;" id="cmbFiltroRed" ng-model="buscar.red" ng-change="buscarFiltroMicroRed()">
                                            <option value="">Seleccione</option>
                                            <option ng-repeat="item in filtros.redes" value="@{{ item.cod_mred }}">@{{ item.nom_red }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <span>Micro Red:</span>
                                        <select class="form-control" style="width: 100%;" id="cmbFiltroMicrored" ng-model="buscar.microred" ng-change="buscarFiltroEstablecimiento()">
                                            <option value="">Seleccione</option>
                                            <option ng-repeat="item in filtros.microredes" value="@{{ item.cod_microred }}">@{{ item.nom_mic }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <span>Establecimiento:</span>
                                        <select class="form-control" style="width: 100%;" id="cmbFiltroEstablecimiento" ng-model="buscar.establecimiento">
                                            <option value="">Seleccione</option>
                                            <option ng-repeat="item in filtros.eess" value="@{{ item.cod_2000 }}">@{{ item.nom_est }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div style="padding-top: 15px !important;">
                                        <center>
                                            <button type="button" class="btn btn-sm btn-success" ng-click="listar()"><i class="fa fa-search"></i> Buscar</button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-footer"  no-padding>
                        <div class="table-responsive" style="padding-top: 10px !important;">
                            <table datatable="ng" dt-options="elementos.dtOptions" dt-instance="dtInstance" class="table table-hover table-color-red table-bordered">
                                <thead>
                                <th>N°</th>
                                <th>DNI</th>
                                <th>NOMBRES</th>
                                <th>ESTABLECIMIENTO</th>
                                <th>PROFESION</th>
                                <th>USUARIO</th>
                                <th>ACCESO</th>
                                <th>ACCIONES</th>
                                </thead>
                                <tbody>
                                <tr ng-repeat="item in lista">
                                    <td>@{{ ($index +1)  }}</td>
                                    <td>@{{ item.dni }}</td>
                                    <td>@{{ item.nombres }} @{{ item.paterno }} @{{ item.materno }}</td>
                                    <td>@{{ item.eess }}</td>
                                    <td>@{{ item.profesion }}</td>
                                    <td>@{{ item.usuario }}</td>
                                    <td>
                                        <center>
                                            <label ng-class="{'label label-success': item.acceso == 1, 'label label-danger': item.acceso!=1}">@{{ (item.acceso==1?'SI':'NO') }}</label>
                                        </center>
                                    </td>
                                    <td>
                                        <center>
                                            <div class="btn-group">
                                                <!--<a href="javascript:void(0)" ng-class="{'btn btn-xs text-success': item.acceso !=1, 'btn btn-xs text-danger': item.acceso==1}" title="@{{ item.acceso==1?'Denegar Acceso':'Permitir Acceso' }}">
                                                    <i ng-class="{'fa fa-check-square-o': item.acceso!=1, 'fa fa-times': item.acceso==1}"></i>
                                                </a>-->
                                                <a href="javascript:void(0)" class="btn btn-xs text-warning tip" data-toggle="modal" data-target="#modal-form" title="Editar" ng-click="prepararEditar(item)"><i class="fa fa-pencil-square-o"></i></a>
                                            </div>
                                        </center>
                                    </td>
                                    <script>$('.tip').tooltip();</script>
                                </tr>
                                </tbody>
                                <tfoot></tfoot>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

@endsection

@section('javascripts')
    @parent
    <script src="js/angular/controller/hospitalizacion/hospitalizacionController.js"></script>
    <script>
        $(function () {
            //$('select').select2();

        });
    </script>
@endsection