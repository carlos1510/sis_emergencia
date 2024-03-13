@extends('main')

@section('title')
    Profesionales
@endsection

@section('bodycontroller')
    id='profesionalesController' ng-controller='profesionalesController'
@endsection

@section('content')

    <div class="row" ng-show="estado_registro == 1">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h4 class="card-title">Buscar Persona</h4>
                        <button class="btn btn-warning btn-round ml-auto btn-sm" ng-click="estado_registro = 0">
                            <i class="fa fa-arrow-circle-left"></i>
                            Regresar
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-group">
                                <label>Tipo de Documento:</label>
                                <select class="form-control form-control-sm" id="cmbTipoDocumentoBuscar" style="width: 100% !important;" ng-model="buscar.tipo_documento" ng-change="tipo_busqueda_persona()">
                                    <option value="">---</option>
                                    <option value="1">DNI</option>
                                    <option value="2">Carnet de Extranjería</option>
                                    <option value="3">Pasaporte</option>
                                    <option value="4">Documento de Identidad Extranjero</option>
                                    <option value="5">S/ DOCUMENTO</option>
                                    <option value="6">CNV</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-3" ng-show="buscar.ocultar_btn_registrar == 0">
                            <div class="form-group">
                                <label>Nro. Documento:</label>
                                <input type="text" class="form-control form-control-sm" ng-model="buscar.nro_documento">
                            </div>
                        </div>
                        <div class="col-lg-2"  ng-show="buscar.ocultar_btn_registrar == 0">
                            <div style="padding-top: 35px !important;">
                                <button type="button" class="btn btn-primary btn-sm btn-block" ng-click="buscarPersona()"><i class="fas fa-search"></i> Buscar</button>
                            </div>
                        </div>
                        <div class="col-lg-2" ng-show="buscar.ocultar_btn_registrar == 1">
                            <div style="padding-top: 35px !important;">
                                <button type="button" class="btn btn-info btn-sm btn-block" ng-click="nuevoRegistro(1, '')"><i class="fas fa-plus-circle"></i> Registrar Atención</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="table-responsive">
                        <table class="table table-bordered table-head-bg-info table-bordered-bd-info">
                            <thead>
                            <tr>
                                <th>Nro. Doc.</th>
                                <th>Apellidos y Nombres</th>
                                <th>Sexo</th>
                                <th>Establecimiento</th>
                                <th>Fecha Ingreso</th>
                                <th>Estado</th>
                                <th>Accion</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="item in personas">
                                <td>@{{ item.nro_documento }}</td>
                                <td>@{{ item.apellido_paterno }} @{{ item.apellido_materno }} @{{ item.nombres }}</td>
                                <td>@{{ item.sexo }}</td>
                                <td>@{{ item.nom_establecimiento }}</td>
                                <td>@{{ item.fecha_ingreso }}</td>
                                <td>@{{ item.estado }}</td>
                                <td>
                                    <center>
                                        <button type="button" class="btn btn-info btn-sm btn-block" ng-click="nuevoRegistro(2, item)"><i class="fas fa-plus-circle"></i> Registrar</button>
                                        <!--<button type="button" class="btn btn-icon btn-warning btn-round btn-sm" ng-click="nuevoRegistro(2, item)"><i class="fas fa-user-edit"></i></button>
                                        <button type="button" class="btn btn-icon btn-warning btn-round btn-sm" ng-click="nuevoRegistroUsuario(item)"><i class="fas fa-user-plus"></i></button>
                                        <button type="button" class="btn btn-icon btn-danger btn-round btn-sm" ng-click="nuevoRegistro(2, item)"><i class="fas fa-user-minus"></i></button>-->
                                    </center>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row" ng-show="estado_registro == 2">
       <div class="col-lg-12">
           <div class="card">
               <div class="card-header">
                   <div class="d-flex align-items-center">
                       <h4 class="card-title">Registrar Profesional</h4>
                       <button class="btn btn-warning btn-round ml-auto btn-sm" ng-click="estado_registro = 1">
                           <i class="fa fa-arrow-circle-left"></i>
                           Regresar a Busqueda
                       </button>
                   </div>
               </div>
               <form role="form" name="registroForm">
                   <div class="card-body pb-2">
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Tipo Documento: <span class="text-danger">(*)</span></label>
                                   <select class="form-control form-control-sm" disabled id="cmbTipoDocumento" style="width: 100% !important;" ng-model="registro.tipo_documento">
                                       <option value="">---</option>
                                       <option value="1">DNI</option>
                                       <option value="2">Carnet de Extranjería</option>
                                       <option value="3">Pasaporte</option>
                                       <option value="4">Documento de Identidad Extranjero</option>
                                       <option value="5">S/ DOCUMENTO</option>
                                       <option value="6">CNV</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Número Documento: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control form-control-sm" readonly ng-model="registro.nro_documento" name="registro_nro_documento"  required />
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Condición Contrato: <span class="text-danger">(*)</span></label>
                                   <select class="form-control" style="width: 100% !important;" id="cmbCondicionContrato" name="registro_condicion_contrato" required ng-model="registro.idcondicion_contrato">
                                       <option value="">---</option>
                                       <option value="1">NOMBRADO</option>
                                       <option value="2">CONTRATADO</option>
                                       <option value="3">SERUM</option>
                                       <option value="4">RESIDENTE</option>
                                       <option value="5">INTERNO</option>
                                       <option value="6">ALUMNO</option>
                                       <option value="7">AGENTE COMUNITARIO</option>
                                       <option value="8">OTROS</option>
                                       <option value="9">DESTACADO</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Tipo Profesión: <span class="text-danger">(*)</span></label>
                                   <select class="form-control" style="width: 100% !important;" id="cmbTipoProfesion" ng-model="registro.idprofesion" name="registro_tipo_profesion" required >
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_profesiones" value="@{{ item.id_profesion }}">@{{ item.descripcion }}</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Apellido Paterno: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control form-control-sm" ng-model="registro.apellido_paterno" name="registro_apellido_paterno" required />
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Apellido Materno: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control form-control-sm" ng-model="registro.apellido_materno" name="registro_apellido_materno" required />
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Nombres: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control form-control-sm" ng-model="registro.nombres" name="registro_nombres" required />
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Sexo: <span class="text-danger">(*)</span></label>
                                   <select  style="width: 100% !important;" id="cmbSexo" ng-model="registro.sexo" name="registro_sexo" required >
                                       <option value="">---</option>
                                       <option value="M">MASCULINO</option>
                                       <option value="F">FEMENINO</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Fecha Nacimiento:</label>
                                   <div class="input-group date">
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                       </div>
                                       <input class="form-control form-control-sm" type="text" id="fecha_nacimientotxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-model="registro.fecha_nacimiento">
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Nro. Telefono:</label>
                                   <input type="text" class="form-control form-control-sm" ng-model="registro.telefono" />
                               </div>
                           </div>
                           <div class="col-lg-6">
                               <div class="form-group">
                                   <label>Etnia:</label>
                                   <select class="form-control form-control-sm" style="width: 100% !important;" id="cmbIdEtnia" ng-model="registro.idetnia">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_etnias" value="@{{ item.id }}">@{{ item.desetni }}</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-4">
                               <div class="form-group">
                                   <label>Distrito Residencia: </label>
                                   <select class="form-control" style="width: 100% !important;" id="cmbIdUbigeo" ng-model="registro.idubigeo">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_ubigeos" value="@{{ item.id_ubigueo_reniec }}">@{{ item.provincia }} / @{{ item.distrito }}</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-8">
                               <div class="form-group">
                                   <label>Dirección:</label>
                                   <input type="text" class="form-control form-control-sm" ng-model="registro.direccion" />
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Codigo Colegiatura:</label>
                                   <input type="text" class="form-control form-control-sm" ng-model="registro.codigo_colegiatura" />
                               </div>
                           </div>
                           <div class="col-lg-6">
                               <div class="form-group">
                                   <label>Establecimiento:</label>
                                   <select class="form-control" style="width: 100% !important;" id="cmbCod_2000" ng-model="registro.cod_2000">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_establecimientos" value="@{{ item.codigo_unico }}">@{{ item.nom_red }} / @{{ item.codigo_unico }} - @{{ item.nombre_establecimiento }}</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Fecha Ingreso: <span class="text-danger">(*)</span></label>
                                   <div class="input-group date">
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                       </div>
                                       <input class="form-control form-control-sm" type="text" id="fecha_ingresotxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-model="registro.fecha_ingreso" name="registro_fecha_ingreso" required >
                                   </div>
                               </div>
                           </div>
                           <!--<div class="col-lg-3">
                               <div class="form-group">
                                   <label>Fecha Baja:</label>
                                   <div class="input-group date">
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                       </div>
                                       <input class="form-control form-control-sm" type="text" id="fecha_bajatxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-model="registro.fecha_baja">
                                   </div>
                               </div>
                           </div>-->
                       </div>
                   </div>
                   <div class="card-footer">
                       <center>
                           <button type="button" ng-click="salirRegistro()" class="btn btn-danger btn-sm"><i class="fa fa-times"></i> Salir</button>
                           <button type="button" class="btn btn-primary btn-sm" ng-click="guardarProfesional()"><i class="fa fa-save"></i> Guardar</button>
                       </center>
                   </div>
               </form>
           </div>
       </div>
   </div>

    <div class="row" ng-show="estado_registro == 3">
       <div class="col-lg-12">
           <div class="card">
               <div class="card-header">
                   <h5><i class="fa fa-align-justify"></i> Asignar Usuario</h5>
               </div>
               <form role="form" name="registroUsuarioForm">
                   <div class="card-body pb-2">
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Tipo Documento:</label>
                                   <select class="form-control form-control-sm" id="cmbTipoDocumento_usuario" style="width: 100% !important;" ng-model="registro_usuario.tipo_documento" disabled>
                                       <option value="">---</option>
                                       <option value="1">DNI</option>
                                       <option value="2">Carnet de Extranjería</option>
                                       <option value="3">Pasaporte</option>
                                       <option value="4">Documento de Identidad Extranjero</option>
                                       <option value="5">S/ DOCUMENTO</option>
                                       <option value="6">CNV</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Número Documento:</label>
                                   <input type="text" class="form-control form-control-sm" ng-model="registro_usuario.nro_documento" readonly />
                               </div>
                           </div>
                           <div class="col-lg-6">
                               <div class="form-group">
                                   <label>Nombre del Profesional:</label>
                                   <input type="text" class="form-control form-control-sm" ng-model="registro_usuario.nom_profesional" readonly />
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-check">
                                   <label>Acceso</label>
                                   <br>
                                   <label class="form-radio-label">
                                       <input class="form-radio-input" type="radio" value="1" name="accesoRadios" ng-model="registro_usuario.acceso" ng-change="nuevoAcceso()">
                                       <span class="form-radio-sign">SI</span>
                                   </label>
                                   <label class="form-radio-label ml-3">
                                       <input class="form-radio-input" type="radio" value="0" name="accesoRadios"  ng-model="registro_usuario.acceso" ng-change="nuevoAcceso()">
                                       <span class="form-radio-sign">NO</span>
                                   </label>
                               </div>
                           </div>
                           <div class="col-lg-3" ng-show="registro_usuario.acceso == 1">
                               <div class="form-group">
                                   <label>Usuario: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control form-control-sm" ng-model="registro_usuario.nick" name="nick_usuario" ng-required="registro_usuario.acceso == 1" />
                               </div>
                           </div>
                           <div class="col-lg-3" ng-show="registro_usuario.acceso == 1">
                               <div class="form-group">
                                   <label>Contraseña: <span class="text-danger">(*)</span></label>
                                   <input type="password" class="form-control form-control-sm" ng-model="registro_usuario.password" name="password_usuario" ng-required="registro_usuario.acceso == 1" />
                               </div>
                           </div>
                           <div class="col-lg-3" ng-show="registro_usuario.acceso == 1">
                               <div class="form-group">
                                   <label>Nivel: <span class="text-danger">(*)</span></label>
                                   <select class="form-control" style="width: 100% !important;" id="cmbNivel_usuario" ng-model="registro_usuario.idnivel" name="idnivel_usuario" ng-required="registro_usuario.acceso == 1" ng-change="listarEstablecimientosByNivel(); limpiarEESS();">
                                       <option value="">---</option>
                                       <option value="1">ADMINISTRADOR</option>
                                       <option value="2">DIRESA</option>
                                       <option value="3">RED</option>
                                       <option value="4">MICRO RED</option>
                                       <option value="5">ESTABLECIMIENTO</option>
                                       <option value="6">DIGITADOR</option>
                                       <option value="7">INVITADO</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-4" ng-show="registro_usuario.acceso == 1 && (registro_usuario.idnivel == 3 || registro_usuario.idnivel == 4 || registro_usuario.idnivel == 5)">
                               <div class="form-group">
                                   <label>Red: <span class="text-danger">(*)</span></label>
                                   <select class="form-control form-control-sm" id="cmbRed_usuario" style="width: 100% !important;" name="red_usuario" ng-change="listarMicroRedByRed()" ng-model="registro_usuario.codigo_red" ng-required="registro_usuario.idnivel == 3">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_redes" value="@{{ item.codigo_red }}">@{{ item.nom_red }}</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-4" ng-show="registro_usuario.acceso == 1 && (registro_usuario.idnivel == 4 || registro_usuario.idnivel == 5)">
                               <div class="form-group">
                                   <label>Micro Red: <span class="text-danger">(*)</span></label>
                                   <select class="form-control form-control-sm" id="cmbMicroRed_usuario" name="microred_usuario" style="width: 100% !important;" ng-change="listarEstablecimientosByNivel()" ng-model="registro_usuario.codigo_microred" ng-required="registro_usuario.idnivel == 4">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_microredes" value="@{{ item.codigo_microred }}">@{{ item.nom_microred }}</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-4" ng-show="registro_usuario.acceso == 1 && (registro_usuario.idnivel == 5 || registro_usuario.idnivel == 6 || registro_usuario.idnivel == 7)" >
                               <div class="form-group">
                                   <label>Establecimiento: <span class="text-danger">(*)</span></label>
                                   <select class="form-control form-control-sm" id="cmbEstablecimiento_usuario" name="cod_2000_usuario" style="width: 100% !important;" ng-model="registro_usuario.cod_2000" ng-required="registro_usuario.idnivel == 5 || registro_usuario.idnivel == 6 || registro_usuario.idnivel == 7">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_eess" value="@{{ item.codigo_unico }}">@{{ registro_usuario.idnivel==6?item.nom_eess:registro_usuario.idnivel==7?item.nom_eess:item.nombre_establecimiento }}</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       <!--<div class="row">
                           <div class="col-lg-12">
                               <div class="table table-responsive">
                                   <table class="table table-bordered ">
                                       <thead>
                                       <tr>
                                           <th colspan="3">Acceso del Usuario</th>
                                       </tr>
                                       <tr>
                                           <th scope="col">N°</th>
                                           <th scope="col">Descripcion Acceso</th>
                                           <th scope="col">
                                               <center>
                                                   <div class="form-check">
                                                       <label class="form-check-label">
                                                           <input class="form-check-input" type="checkbox" value="">
                                                           <span class="form-check-sign">Todos</span>
                                                       </label>
                                                   </div>
                                               </center>
                                           </th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       <tr>
                                           <td class="text-center">1</td>
                                           <td>
                                               Registro Emergencia
                                           </td>
                                           <td>
                                               <center>
                                                   <input class="form-check-input" type="checkbox" value="">
                                               </center>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td class="text-center">2</td>
                                           <td>
                                               Registro Hospitalizacion
                                           </td>
                                           <td>
                                               <center>
                                                   <input class="form-check-input" type="checkbox" value="">
                                               </center>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td class="text-center">3</td>
                                           <td>
                                               Reportes
                                           </td>
                                           <td>
                                               <center>
                                                   <input class="form-check-input" type="checkbox" value="">
                                               </center>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td class="text-center">4</td>
                                           <td>
                                               Registro de Profesionales
                                           </td>
                                           <td>
                                               <center>
                                                   <input class="form-check-input" type="checkbox" value="">
                                               </center>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td class="text-center">5</td>
                                           <td>
                                               Creación de Usuario
                                           </td>
                                           <td>
                                               <center>
                                                   <input class="form-check-input" type="checkbox" value="">
                                               </center>
                                           </td>
                                       </tr>
                                       <tr>
                                           <td class="text-center">5</td>
                                           <td>
                                               Importar Data
                                           </td>
                                           <td>
                                               <center>
                                                   <input class="form-check-input" type="checkbox" value="">
                                               </center>
                                           </td>
                                       </tr>
                                       </tbody>
                                   </table>
                               </div>
                           </div>
                       </div>-->
                   </div>
                   <div class="card-footer">
                       <center>
                           <button type="button" ng-click="salirRegistroUsuario()" class="btn btn-danger btn-sm"><i class="fa fa-times"></i> Salir</button>
                           <button type="button" class="btn btn-primary btn-sm" ng-click="guardarUsuario()"><i class="fa fa-save"></i> Guardar</button>
                       </center>
                   </div>
               </form>
           </div>
       </div>
   </div>

    <div class="row" ng-show="estado_registro == 0">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h4 class="card-title">Lista Profesionales</h4>
                        <!--<button class="btn btn-primary btn-round ml-auto btn-sm" ng-click="nuevaBusqueda()">
                            <i class="fa fa-plus"></i>
                            Agregar Nuevo
                        </button>-->
                    </div>
                </div>
                <div class="card-body">
                    <form role="form" name="filtroForm">
                        <div class="row" >
                            @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2)
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Red: <span class="text-danger">(*)</span></label>
                                        <select class="form-control" style="width: 100%;" id="cmbFiltroRed" ng-model="busqueda.codigo_red" ng-change="buscarFiltroMicroRed()" name="codigo_red" @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2) required @endif>
                                            <option value="">Seleccione</option>
                                            <option ng-repeat="item in filtros.redes" value="@{{ item.codigo_red }}">@{{ item.nom_red }}</option>
                                        </select>
                                    </div>
                                </div>
                            @endif
                            @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2 || Session::get('idnivel') == 3)
                                <div class="col-lg-3">
                                    <div class="form-group">
                                        <label>Micro Red: <span class="text-danger">(*)</span></label>
                                        <select class="form-control" style="width: 100%;" id="cmbFiltroMicrored" ng-model="busqueda.codigo_microred" ng-change="buscarFiltroEstablecimiento()" name="codigo_microred" @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2 || Session::get('idnivel') == 3) required @endif>
                                            <option value="">Seleccione</option>
                                            <option ng-repeat="item in filtros.microredes" value="@{{ item.codigo_microred }}">@{{ item.nom_microred }}</option>
                                        </select>
                                    </div>
                                </div>
                            @endif
                            @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2 || Session::get('idnivel') == 3 || Session::get('idnivel') == 4)
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Establecimiento: <span class="text-danger">(*)</span></label>
                                        <select class="form-control" style="width: 100%;" id="cmbFiltroEstablecimiento" ng-model="busqueda.cod_2000" name="cod_2000" @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2 || Session::get('idnivel') == 3 || Session::get('idnivel') == 4) required @endif>
                                            <option value="">Seleccione</option>
                                            <option ng-repeat="item in filtros.eess" value="@{{ item.codigo_unico }}">@{{ item.codigo_unico }} - @{{ item.nombre_establecimiento }}</option>
                                        </select>
                                    </div>
                                </div>
                            @endif
                            @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2 || Session::get('idnivel') == 3 || Session::get('idnivel') == 4)
                                <div class="col-lg-2">
                                    <div style="padding-top: 35px !important;">
                                        <button type="button" class="btn btn-sm btn-primary btn-block" ng-click="listar()"><i class="fa fa-search"></i> Buscar</button>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </form>
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Nro. Documento: </label>
                                    <input type="text" class="form-control form-control-sm" ng-model="busqueda.nro_documento" placeholder="Enter para Buscar" name="nro_documento" ng-keypress="buscarDni($event)" />
                                </div>
                            </div>

                        </div>

                </div>
                <div class="card-footer" id="lista_bloqueoDiv"  style="padding: 0px !important;">
                    <div class="table-responsive" style="padding-top: 15px !important;">
                        <table datatable="ng" dt-options="elementos.dtOptions" dt-instance="dtInstance" class="table table-hover table-color-red table-bordered">
                            <thead>
                            <th>N°</th>
                            <th>N° DOC.</th>
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
                                <td>@{{ item.numero_documento }}</td>
                                <td>@{{ item.nombres_personal }} @{{ item.apellido_paterno_personal }} @{{ item.apellido_materno_personal }}</td>
                                <td>@{{ item.nombre_establecimiento }}</td>
                                <td>@{{ item.nom_profesion }}</td>
                                <td>@{{ item.nick }}</td>
                                <td>
                                    <center>
                                        <label ng-class="{'badge badge-count badge-success': item.acceso == 1, 'badge badge-count badge-warning': item.acceso!=1}">@{{ (item.acceso==1?'SI':'NO') }}</label>
                                    </center>
                                </td>
                                <td>
                                    <center>
                                        <button type="button" ng-show="item.acceso != 1" class="btn btn-icon btn-success btn-round btn-sm tip" ng-click="nuevoRegistroUsuario(item)" title="Asignar Usuario"><i class="fas fa-user-plus"></i></button>
                                        <button type="button" ng-show="item.acceso == 1" class="btn btn-icon btn-danger btn-round btn-sm tip" title="Denegar Acceso"><i class="fas fa-times"></i></button>
                                        <!--<button type="button" class="btn btn-icon btn-info btn-round btn-sm tip" ng-click="nuevoRegistro(2, item)" title="Editar Profesional"><i class="fas fa-user-edit"></i></button>
                                        <button type="button" class="btn btn-icon btn-danger btn-round btn-sm tip" title="Dar de Baja"><i class="fas fa-user-minus"></i></button>-->
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

@endsection

@section('javascripts')
    @parent
    <script src="js/angular/controller/configuracion/profesionalesController.js"></script>
    <script>
        $(function () {
            $('select').select2();

            $('#fecha_nacimientotxt').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy'
            });

            $('#fecha_ingresotxt').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy'
            });

            $('#fecha_bajatxt').datepicker({
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