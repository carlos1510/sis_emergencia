@extends('main')

@section('title')
    Emergencias
@endsection

@section('bodycontroller')
    id='emergenciaController' ng-controller='emergenciaController'
@endsection

@section('content-header')
    <h4 class="page-title">Emergencia</h4>
    <ul class="breadcrumbs">
        <li class="nav-home">
            <a href="#">
                <i class="flaticon-home"></i>
            </a>
        </li>
        <li class="separator">
            <i class="flaticon-right-arrow"></i>
        </li>
        <li class="nav-item">
            <a href="#">Emergencia</a>
        </li>
    </ul>
@endsection

@section('content')

    <div class="row" ng-show="estado_registro == 1">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h4 class="card-title">Buscar Persona</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-group">
                                <label>Tipo de Documento:</label>
                                <select class="form-control " id="cmbTipoDocumentoBuscar" style="width: 100% !important;" ng-model="buscar.tipo_documento" ng-change="tipo_busqueda_persona()">
                                    <option value="">---</option>
                                    <option value="1">DNI</option>
                                    <option value="2">Carnet de Extranjería</option>
                                    <option value="3">Pasaporte</option>
                                    <option value="5">S/ DOCUMENTO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-3" ng-show="buscar.ocultar_btn_registrar == 0 && buscar.tipo_documento != ''">
                            <!--<div class="form-group" id="nro_doc_buscar">
                            </div>-->
                            <div class="form-group">
                                <label>Nro. Documento:</label>
                                <input type="text" class="form-control " id="nro_documentotxt" ng-model="buscar.nro_documento">
                            </div>
                        </div>
                        <div class="col-lg-2"  ng-show="buscar.ocultar_btn_registrar == 0">
                            <div style="padding-top: 35px !important;">
                                <button type="button" class="btn btn-primary btn-block" ng-click="buscarPersona()"><i class="fas fa-search"></i> Buscar</button>
                                <!--<button type="button" class="btn btn-primary btn-sm btn-block" ng-click="pruebaConsultarDni()"><i class="fas fa-search"></i> Buscar</button>-->
                            </div>
                        </div>
                        <div class="col-lg-2" ng-show="buscar.ocultar_btn_registrar == 1">
                            <div style="padding-top: 35px !important;">
                                <button type="button" class="btn btn-info btn-block" ng-click="nuevoRegistro(1, '')"><i class="fas fa-plus-circle"></i> Registrar Atención</button>
                            </div>
                        </div>
                        <div class="col-lg-2" >
                            <div style="padding-top: 35px !important;">
                                <button type="button" class="btn btn-danger btn-block" ng-click="regresar()"><i class="fas fa-reply"></i> Atrás</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer no-padding" id="lista_bloqueoDiv">
                    <div class="table-responsive" id="lista_bloqueo2Div">
                        <table class="table table-bordered table-head-bg-info table-bordered-bd-info mt-0">
                            <thead>
                                <tr>
                                    <th scope="col">Nro. Doc.</th>
                                    <th scope="col">Apellidos y Nombres</th>
                                    <th scope="col">Sexo</th>
                                    <th scope="col">Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in personas">
                                    <td>@{{ item.nro_documento }}</td>
                                    <td>@{{ item.apellido_paterno }} @{{ item.apellido_materno }} @{{ item.nombres }}</td>
                                    <td>@{{ item.sexo }}</td>
                                    <td>
                                        <center>
                                            <button type="button" class="btn btn-info btn-sm btn-block" ng-click="nuevoRegistro(2, item)"><i class="fas fa-plus-circle"></i> Registrar Atención</button>
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
                       <h4 class="card-title">Registrar Emergencia</h4>
                   </div>
               </div>
               <form role="form" name="emergenciaForm">
                   <div class="card-body no-padding">
                       <div class="row ">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Cod. EESS: <span class="text-danger">(*)</span></label>
                                   <div class="input-group">
                                       <input class="form-control  numero" type="text" aria-describedby="basic-addon1" aria-label="" ng-keypress="limpiarNombreEESS()"  placeholder="Codigo EESS" id="cod_2000" maxlength="9" ng-model="emergencia.cod_2000" name="cod_2000" required >
                                       <div class="input-group-prepend">
                                           <button class="btn btn-primary btn-sm" title="Clic para buscar" ng-click="buscarEESS()" type="button"><i ng-class="{'fa fa-spinner fa-spin': estado_bus_acomp == 2, 'fa fa-search': estado_bus_acomp != 2}" ></i></button>
                                       </div>
                                       <div class="input-group-prepend">
                                           <button class="btn btn-default btn-border btn-sm" title="Clic para Seleccionar" type="button" data-toggle="modal" data-target="#seleccionarEstablecimientoModal"><i class="fas fa-ellipsis-h"></i></button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-6">
                               <div class="form-group">
                                   <label>Establecimiento de Atención: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control " id="nombre_est_emergenciatxt" ng-model="emergencia.nom_est" readonly name="nom_est" required />
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Area de Atención: <span class="text-danger">(*)</span></label>
                                   <select class="form-control has-error" style="width: 100% !important;" id="cmbArea_atencion" ng-model="emergencia.area_atencion" name="area_atencion" required>
                                       <option value="">---</option>
                                       <option value="AREA DE EMERGENCIA">AREA DE EMERGENCIA</option>
                                       <option value="AREA DE EMERGENCIA COVID">AREA DE EMERGENCIA COVID</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-4">
                               <div class="form-group">
                                   <label>Tipo de Profesional Responsable de la Atención: <span class="text-danger">(*)</span></label>
                                   <select style="width: 100% !important;" ng-model="registro.tipo_profesional_atencion" id="cmbTipoProfesionalAtencion">
                                       <option value="">---</option>
                                       <option value="MEDICO">MÉDICO</option>
                                       <option value="ENFERMERO">ENFERMERO</option>
                                       <option value="OBSTETRA">OBSTETRA</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       <div class="row" ng-show="registro.tipo_profesional_atencion != ''">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Profesional de Atención: <span class="text-danger">(*)</span></label>
                                   <input type="hidden" ng-model="emergencia.idprofesional"/>
                                   <div class="input-group">
                                       <input class="form-control numero" type="text" aria-describedby="basic-addon1" aria-label="" placeholder="Nro. Doc." id="nro_documento_profesional" ng-model="emergencia.nro_doc_profecional" required name="nro_doc_profecional" >
                                       <div class="input-group-prepend">
                                           <button class="btn btn-primary btn-sm" title="Clic para buscar" ng-click="buscarPersonaProfesional()" type="button"><i ng-class="{'fa fa-spinner fa-spin': estado_bus_acomp == 3, 'fa fa-search': estado_bus_acomp != 3}" ></i></button>
                                       </div>
                                       <div class="input-group-prepend">
                                           <button class="btn btn-default btn-border btn-sm" title="Clic para Seleccionar" type="button" data-toggle="modal" data-target="#seleccionarProfesionalModal" ng-click="focoCampoBuscar('busqueda_texto_profesionaltxt')"><i class="fas fa-ellipsis-h"></i></button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-6">
                               <div class="form-group">
                                   <label>&nbsp;</label>
                                   <div class="input-group">
                                       <input class="form-control " type="text" aria-describedby="basic-addon1" id="nombre_profesional_emergencia_txt" ng-model="emergencia.nombre_profesional" required name="nombre_profesional" readonly>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Fecha Atención: <span class="text-danger">(*)</span></label>
                                   <div class="input-group date">
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                       </div>
                                       <input class="form-control has-error" type="text" id="fecha_atenciontxt" autocomplete="off" placeholder="dd/mm/yyyy" name="fecha_atencion" ng-model="emergencia.fecha_atencion" readonly required>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Hora: <span class="text-danger">(*)</span></label>
                                   <div class="input-group date">
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text"><i class="fa fa-clock"></i></span>
                                       </div>
                                       <input class="form-control has-error" type="text" autocomplete="off" placeholder="hh:ss" id="hora_atencion_txt" data-mask="99:99" ng-model="emergencia.hora_atencion" name="hora_atencion" ng-blur="validarHora('hora_atencion_txt')" required >
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text">24hrs.</span>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Hist. Clinica:</label>
                                   <input type="text" class="form-control text-uppercase numero2" ng-model="emergencia.hc" name="hc" maxlength="6" />
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Tipo de Seguro</label>
                                   <select class="form-control form-control-lg" style="width: 100% !important;" id="cmbIdFinanciador" ng-model="emergencia.idfinanciador" name="idfinanciador">
                                       <option value="">---</option>
                                       <option value="1">USUARIO</option>
                                       <option value="2">S.I.S</option>
                                       <option value="3">ESSALUD</option>
                                       <option value="4">S.O.A.T</option>
                                       <option value="5">SANIDAD F.A.P</option>
                                       <option value="6">SANIDAD NAVAL</option>
                                       <option value="7">SANIDAD EP</option>
                                       <option value="8">SANIDAD PNP</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Tipo Doc.: <span class="text-danger">(*)</span></label>
                                   <select class="form-control has-error" style="width: 100% !important;" id="cmbTipo_documento" ng-model="emergencia.tipo_documento" name="tipo_documento" disabled required>
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
                                   <label>Nro. Documento: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control has-error" ng-model="emergencia.nro_documento" name="nro_documento" readonly required />
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Etnia:</label>
                                   <select class="form-control" style="width: 100% !important;" id="cmbIdEtnia" ng-model="emergencia.idetnia" name="idetnia">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_etnias" value="@{{ item.id }}">@{{ item.desetni }}</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Sexo: <span class="text-danger">(*)</span></label>
                                   <select class="form-control form-control-lg has-error" style="width: 100% !important;" id="cmbSexo" ng-model="emergencia.sexo" name="sexo" required>
                                       <option value="">---</option>
                                       <option value="M">MASCULINO</option>
                                       <option value="F">FEMENINO</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-4">
                               <div class="form-group">
                                   <label>Apellido Paterno: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control has-error text-uppercase" maxlength="45" ng-model="emergencia.apellido_paterno" ng-readonly="estado_encontrado == 2"  name="apellido_paterno" required/>
                               </div>
                           </div>
                           <div class="col-lg-4">
                               <div class="form-group">
                                   <label>Apellido Materno: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control has-error text-uppercase" maxlength="45" ng-model="emergencia.apellido_materno" ng-readonly="estado_encontrado == 2"  name="apellido_materno" required/>
                               </div>
                           </div>
                           <div class="col-lg-4">
                               <div class="form-group">
                                   <label>Nombres: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control has-error text-uppercase" maxlength="45" ng-model="emergencia.nombres" ng-readonly="estado_encontrado == 2" name="nombres" required />
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Fecha Nacimiento: </label>
                                   <div class="input-group date">
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                       </div>
                                       <input class="form-control has-error" type="text" id="fecha_nacimientotxt" autocomplete="off" placeholder="dd/mm/yyyy" name="fecha_nacimiento" ng-model="emergencia.fecha_nacimiento" ng-change="calcularEdadFechaNacimiento()" readonly>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-2">
                               <div class="form-group">
                                   <label>Tipo Edad: <span class="text-danger">(*)</span></label>
                                   <select class="form-control text-uppercase has-error" style="width: 100% !important;" id="cmbTipo_edad" ng-model="emergencia.tipo_edad" name="tipo_edad" ng-change="cambiarTipoEdad()" required>
                                       <option value="">---</option>
                                       <option value="A">AÑO</option>
                                       <option value="M">MES</option>
                                       <option value="D">DIA</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-2">
                               <div class="form-group">
                                   <label>Edad: <span class="text-danger">(*)</span></label>
                                   <input type="text" class="form-control has-error numero2" maxlength="3" ng-model="emergencia.edad" name="edad" ng-blur="validarEdad()" required ng-readonly="emergencia.tipo_edad == ''" />
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>N° Celular:</label>
                                   <input type="text" class="form-control numero2" name="nro_celular" maxlength="9" ng-model="emergencia.telefono" />
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Distrito Residencia:</label>
                                   <select class="form-control form-control-lg" style="width: 100% !important;" id="cmbIdUbigeo" ng-model="emergencia.idubigeo" name="idubigeo">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_ubigeos" value="@{{ item.id_ubigueo_reniec }}">@{{ item.provincia }} / @{{ item.distrito }}</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-9">
                               <div class="form-group">
                                   <label>Dirección:</label>
                                   <input type="text" class="form-control  text-uppercase" ng-model="emergencia.direccion" name="direccion"/>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Tipo Doc. Acomp.:</label>
                                   <select class="form-control form-control-lg" style="width: 100% !important;" id="cmbTipo_doc_acomp" ng-model="emergencia.tipo_doc_acomp" name="tipo_doc_acomp">
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
                           <div class="col-lg-2">
                               <div class="form-group">
                                   <label>Nro. Doc. Acompañante</label>
                                   <div class="input-group">
                                       <input type="text" class="form-control  numero" ng-model="emergencia.nro_doc_acomp" id="nro_doc_acomp_txt" maxlength="10" ng-readonly="emergencia.tipo_doc_acomp == ''" name="nro_doc_acomp"/>
                                       <div class="input-group-prepend">
                                           <button class="btn btn-warning btn-sm" ng-click="buscarPersonaAcompanante()" type="button"><i ng-class="{'fa fa-spinner fa-spin': estado_bus_acomp == 1, 'fa fa-search': estado_bus_acomp != 1}" ></i></button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-5">
                               <div class="form-group">
                                   <label>Nombre del Acompañante:</label>
                                   <input type="text" class="form-control  text-uppercase" maxlength="150" ng-model="emergencia.nombre_acomp" name="nombre_acomp" ng-readonly="estado_encontrado_acomp == 2" />
                               </div>
                           </div>
                           <div class="col-lg-2">
                               <div class="form-group">
                                   <label>Telefono Acomp.:</label>
                                   <input type="text" class="form-control  numero2" maxlength="9" ng-model="emergencia.telefono_acomp" name="telefono_acomp" />
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-2">
                               <div class="form-group">
                                   <label>Presión Arterial: </label>
                                   <input type="text" class="form-control  numero2" id="presion_sistolica_txt" ng-model="emergencia.presion_sistolica" maxlength="3" ng-keyup="validarPresionSistolica(); calcularPresionArterialMedia()" />
                                   <span class="text-danger" style="display: none;" id="presion_sistolica_error_span"></span>
                               </div>
                           </div>
                           <div class="col-lg-1">
                               <div class="form-group text-center">
                                   <label>&nbsp;</label><br/>
                                   <label class="text-center">/</label>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>&nbsp;</label>
                                   <input type="text" class="form-control  numero2" id="presion_diastolica_txt" ng-model="emergencia.presion_diastolica" maxlength="3" ng-keyup="validarPresionDiastolica(); calcularPresionArterialMedia()" />
                                   <span class="text-danger" style="display: none;" id="presion_diastolica_txt_error_span"></span>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Presión Arterial Media: </label>
                                   <input type="text" class="form-control  numero2" ng-model="emergencia.presion_arterial_media" readonly />
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Saturación Oxigeno: </label>
                                   <input type="text" class="form-control numero2" ng-model="emergencia.saturacion_oxigeno" id="saturacion_oxigeno_txt" maxlength="2" ng-keyup="validarSaturacionOxigeno();" />
                                   <span class="text-danger" style="display: none;" id="saturacion_oxigeno_error_span"></span>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-2 col-sm-12">
                               <div class="form-group">
                                   <label>Frecuencia Cardiaca: </label>
                                   <input type="text" class="form-control  numero2" ng-model="emergencia.frecuencia_cardiaca" id="frecuencia_cardiaca_txt" maxlength="3" ng-keyup="validarFrecuenciaCardiaca();" />
                                   <span class="text-danger" style="display: none;" id="frecuencia_cardiaca_error_span"></span>
                               </div>
                           </div>
                           <div class="col-lg-2 col-sm-12">
                               <div class="form-group">
                                   <label>Frecuencia Respiratoria: </label>
                                   <input type="text" class="form-control numero2" ng-model="emergencia.frecuencia_respiratoria" id="frecuencia_respiratoria_txt" maxlength="2" ng-keyup="validarFrecuenciaRespiratoria();" />
                                   <span class="text-danger" style="display: none;" id="frecuencia_respiratoria_error_span"></span>
                               </div>
                           </div>
                           <div class="col-lg-2 col-sm-12">
                               <div class="form-group">
                                   <label>Temperatura: </label>
                                   <input type="text" class="form-control numero3" ng-model="emergencia.temperatura" id="temperatura_txt" maxlength="4" ng-keyup="validarTemperatura();" />
                                   <span class="text-danger" style="display: none;" id="temperatura_error_span"></span>
                               </div>
                           </div>
                           <div class="col-lg-3 col-sm-12">
                                <div class="form-group">
                                    <label>Peso: </label>
                                    <input type="text" class="form-control numero3" ng-model="emergencia.peso" id="peso_txt"  />
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-12">
                                <div class="form-group">
                                    <label>Talla: </label>
                                    <input type="text" class="form-control numero3" ng-model="emergencia.talla" id="talla_txt" />
                                </div>
                            </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Motivo de Atención: <span class="text-danger">(*)</span></label>
                                   <select class="form-control form-control-lg has-error" style="width: 100% !important;" id="cmbIdmotivo_atencion" ng-model="emergencia.idmotivo_atencion" name="idmotivo_atencion" required>
                                       <option value="">---</option>
                                       <option value="1">ACCIDENTE DE TRABAJO</option>
                                       <option value="2">ACCIDENTE EN EL HOGAR</option>
                                       <option value="3">ACCIDENTE DE TRANSITO</option>
                                       <option value="4">AGRESION</option>
                                       <option value="5">AUTOINFLINGIDO</option>
                                       <option value="6">DESASTRE NATURAL</option>
                                       <option value="8">ENVENAMIENTO</option>
                                       <option value="10">ENFERMEDAD SUBITA</option>
                                       <option value="11">ENFERMEDAD COMUN</option>
                                       <option value="12">COVID-19</option>
                                       <option value="13">ITU</option>
                                       <option value="14">DIABETES</option>
                                       <option value="15">OBITO</option>
                                       <option value="16">DOLOR DE ORINA</option>
                                       <option value="7">OTROS</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-9" ng-show="emergencia.idmotivo_atencion == 7">
                               <div class="form-group">
                                    <label>Descripción del Motivo de Atención:</label>
                                   <input type="text" class="form-control" placeholder="Máx. 255 carácteres" maxlength="255" ng-model="registro.motivo_atencion_descripcion">
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-4">
                               <div class="form-group">
                                   <label>Lugar de ocurrencia:</label>
                                   <select class="form-control " style="width: 100% !important;" id="cmbIdubigeo_lugar_ocurrencia" ng-model="emergencia.idubigeo_lugar_ocurrencia" name="idubigeo_lugar_ocurrencia">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_ubigeos" value="@{{ item.id_ubigueo_reniec }}">@{{ item.provincia }} / @{{ item.distrito }}</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-4">
                               <div class="form-group">
                                   <label>Tipo de Atención: <span class="text-danger">(*)</span></label>
                                   <select class="form-control has-error" style="width: 100% !important;" id="cmbTipo_actividad" ng-model="emergencia.tipo_actividad" name="tipo_actividad" required>
                                       <option value="">---</option>
                                       <option value="U">Urgencia</option>
                                       <option value="E">Emergencia</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Servicio: <span class="text-danger">(*)</span></label>
                                   <div class="input-group">
                                       <input class="form-control has-error" type="text" aria-describedby="basic-addon1" id="idupstxt" ng-model="emergencia.idups" name="idups" required readonly>
                                       <div class="input-group-prepend">
                                           <button class="btn btn-default btn-border btn-sm" type="button" title="Clic para Seleccionar" type="button" data-toggle="modal" data-target="#seleccionarUpsEmergenciaModal" ng-click="focoCampoBuscar('busqueda_texto_upstxt')"><i class="fas fa-ellipsis-h"></i></button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-9">
                               <div class="form-group">
                                   <label>&nbsp;</label>
                                   <input type="text" class="form-control text-uppercase" id="descripcion_upstxt" ng-model="emergencia.descripcion_ups" name="descripcion_ups" required readonly />
                               </div>
                           </div>
                       </div>

                       <div class="row">
                           <div class="col-lg-12">
                               <div class="table table-responsive">
                                   <table class="table table-bordered table-head-bg-warning table-bordered-bd-warning">
                                       <thead>
                                       <tr>
                                           <th scope="col">DX</th>
                                           <th scope="col">SI-NO</th>
                                           <th scope="col">Codigo CIE</th>
                                           <th scope="col">Descripcion CIE</th>
                                           <th scope="col">Tipo de Diagnóstico</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                           <tr>
                                               <td class="text-center">Dx1 <span class="text-danger">(*)</span></td>
                                               <td></td>
                                               <td>
                                                   <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia.codigo_dx1" id="codigo_dx1_txt" readonly />
                                               </td>
                                               <td>
                                                   <div ng-click="containerClicked(1);" >
                                                       <input type="text" class="form-control form-control-sm text-uppercase" id="descripcion_dx1_txt" placeholder="Escriba para buscar..." size="40" ng-model="emergencia.descripcion_dx1" ng-disabled="emergencia.dx1_si_no=='NO'" ng-keyup="fetchCIEX(1); limpiarActividadEmergenciaHIS(1)" ng-click="searchboxClicked($event);" />
                                                       <ul class="list-group" >
                                                           <li class="list-group-item" ng-click="setValue($index, 1, $event); addDiagnosticoEmergenciaHis(1, result)" ng-repeat="result in searchResult_1" >
                                                               @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                           </li>
                                                       </ul>
                                                   </div>
                                               </td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="P" name="tipo_diagnostico_dx1" ng-model="emergencia.tipo_diagnostico_dx1" ng-change="modificarTipoDiagnosticoEmergenciaHIS(1)">
                                                           <span class="form-radio-sign">P</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="D" name="tipo_diagnostico_dx1" ng-model="emergencia.tipo_diagnostico_dx1" ng-change="modificarTipoDiagnosticoEmergenciaHIS(1)">
                                                           <span class="form-radio-sign">D</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="R" name="tipo_diagnostico_dx1" ng-model="emergencia.tipo_diagnostico_dx1" ng-change="modificarTipoDiagnosticoEmergenciaHIS(1)">
                                                           <span class="form-radio-sign">R</span>
                                                       </label>
                                                   </center>
                                               </td>
                                           </tr>
                                           <tr>
                                               <td class="text-center">Dx2</td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="SI" name="dx2_si_no" ng-model="emergencia.dx2_si_no">
                                                           <span class="form-radio-sign">SI</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="NO" name="dx2_si_no" ng-model="emergencia.dx2_si_no" ng-change="emergencia.codigo_dx2=''; emergencia.descripcion_dx2=''; emergencia.tipo_diagnostico_dx2='P'; limpiarActividadEmergenciaHIS(2)">
                                                           <span class="form-radio-sign">NO</span>
                                                       </label>
                                                   </center>
                                               </td>
                                               <td>
                                                   <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia.codigo_dx2" readonly />
                                               </td>
                                               <td>
                                                   <div ng-click="containerClicked(2);" >
                                                       <input type="text" class="form-control form-control-sm text-uppercase" placeholder="Escriba para buscar..." size="40" ng-model="emergencia.descripcion_dx2" ng-disabled="emergencia.dx2_si_no=='NO'" ng-keyup="fetchCIEX(2); limpiarActividadEmergenciaHIS(2)" ng-click="searchboxClicked($event);" />
                                                       <ul class="list-group" >
                                                           <li class="list-group-item" ng-click="setValue($index, 2, $event); addDiagnosticoEmergenciaHis(2, result)" ng-repeat="result in searchResult_2" >
                                                               @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                           </li>
                                                       </ul>
                                                   </div>
                                               </td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="P" name="tipo_diagnostico_dx2" ng-model="emergencia.tipo_diagnostico_dx2" ng-change="modificarTipoDiagnosticoEmergenciaHIS(2)">
                                                           <span class="form-radio-sign">P</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="D" name="tipo_diagnostico_dx2" ng-model="emergencia.tipo_diagnostico_dx2" ng-change="modificarTipoDiagnosticoEmergenciaHIS(2)">
                                                           <span class="form-radio-sign">D</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="R" name="tipo_diagnostico_dx2" ng-model="emergencia.tipo_diagnostico_dx2" ng-change="modificarTipoDiagnosticoEmergenciaHIS(2)">
                                                           <span class="form-radio-sign">R</span>
                                                       </label>
                                                   </center>
                                               </td>
                                           </tr>
                                           <tr>
                                               <td class="text-center">Dx3</td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="SI" name="dx3_si_no" ng-model="emergencia.dx3_si_no">
                                                           <span class="form-radio-sign">SI</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="NO" name="dx3_si_no" ng-model="emergencia.dx3_si_no" ng-change="emergencia.codigo_dx3=''; emergencia.descripcion_dx3=''; emergencia.tipo_diagnostico_dx3='P'; limpiarActividadEmergenciaHIS(3)">
                                                           <span class="form-radio-sign">NO</span>
                                                       </label>
                                                   </center>
                                               </td>
                                               <td>
                                                   <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia.codigo_dx3" readonly />
                                               </td>
                                               <td>
                                                   <div ng-click="containerClicked(3);" >
                                                       <input type="text" class="form-control form-control-sm text-uppercase" placeholder="Escriba para buscar..." size="40" ng-model="emergencia.descripcion_dx3" ng-disabled="emergencia.dx3_si_no=='NO'" ng-keyup="fetchCIEX(3); limpiarActividadEmergenciaHIS(3)" ng-click="searchboxClicked($event);" />
                                                       <ul class="list-group" >
                                                           <li class="list-group-item" ng-click="setValue($index, 3, $event); addDiagnosticoEmergenciaHis(3, result)" ng-repeat="result in searchResult_3" >
                                                               @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                           </li>
                                                       </ul>
                                                   </div>
                                               </td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="P" name="tipo_diagnostico_dx3" ng-model="emergencia.tipo_diagnostico_dx3" ng-change="modificarTipoDiagnosticoEmergenciaHIS(3)">
                                                           <span class="form-radio-sign">P</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="D" name="tipo_diagnostico_dx3" ng-model="emergencia.tipo_diagnostico_dx3" ng-change="modificarTipoDiagnosticoEmergenciaHIS(3)">
                                                           <span class="form-radio-sign">D</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="R" name="tipo_diagnostico_dx3" ng-model="emergencia.tipo_diagnostico_dx3" ng-change="modificarTipoDiagnosticoEmergenciaHIS(3)">
                                                           <span class="form-radio-sign">R</span>
                                                       </label>
                                                   </center>
                                               </td>
                                           </tr>
                                           <tr>
                                               <td class="text-center">Dx4</td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="SI" name="dx4_si_no" ng-model="emergencia.dx4_si_no">
                                                           <span class="form-radio-sign">SI</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="NO" name="dx4_si_no" ng-model="emergencia.dx4_si_no" ng-change="emergencia.codigo_dx4=''; emergencia.descripcion_dx4=''; emergencia.tipo_diagnostico_dx4='P'; limpiarActividadEmergenciaHIS(4)">
                                                           <span class="form-radio-sign">NO</span>
                                                       </label>
                                                   </center>
                                               </td>
                                               <td>
                                                   <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia.codigo_dx4" readonly />
                                               </td>
                                               <td>
                                                   <div ng-click="containerClicked(4);" >
                                                       <input type="text" class="form-control form-control-sm text-uppercase" placeholder="Escriba para buscar..." size="40" ng-model="emergencia.descripcion_dx4" ng-disabled="emergencia.dx4_si_no=='NO'" ng-keyup="fetchCIEX(4); limpiarActividadEmergenciaHIS(4)" ng-click="searchboxClicked($event);" />
                                                       <ul class="list-group" >
                                                           <li class="list-group-item" ng-click="setValue($index, 4, $event); addDiagnosticoEmergenciaHis(4, result)" ng-repeat="result in searchResult_4" >
                                                               @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                           </li>
                                                       </ul>
                                                   </div>
                                               </td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="P" name="tipo_diagnostico_dx4" ng-model="emergencia.tipo_diagnostico_dx4" ng-change="modificarTipoDiagnosticoEmergenciaHIS(4)">
                                                           <span class="form-radio-sign">P</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="D" name="tipo_diagnostico_dx4" ng-model="emergencia.tipo_diagnostico_dx4" ng-change="modificarTipoDiagnosticoEmergenciaHIS(4)">
                                                           <span class="form-radio-sign">D</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="R" name="tipo_diagnostico_dx4" ng-model="emergencia.tipo_diagnostico_dx4" ng-change="modificarTipoDiagnosticoEmergenciaHIS(4)">
                                                           <span class="form-radio-sign">R</span>
                                                       </label>
                                                   </center>
                                               </td>
                                           </tr>
                                       </tbody>
                                   </table>
                               </div>
                           </div>
                       </div>

                       <div class="row">
                           <div class="col-lg-4">
                               <div class="form-group">
                                   <label>Tipo de Profesional Responsable del Procedimiento: <span class="text-danger">(*)</span></label>
                                   <select style="width: 100% !important;" ng-model="registro.tipo_profesional_procedimiento" id="cmbTipoProfesionalProcedimiento">
                                       <option value="">---</option>
                                       <option value="MEDICO">MÉDICO</option>
                                       <option value="ENFERMERO">ENFERMERO</option>
                                       <option value="OBSTETRA">OBSTETRA</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-3" ng-show="registro.tipo_profesional_procedimiento != ''">
                               <div class="form-group">
                                   <label>Profesional Responsable del Procedimiento: <span class="text-danger">(*)</span></label>
                                   <input type="hidden" ng-model="emergencia.idprofesional_no_medico"/>
                                   <div class="input-group">
                                       <input class="form-control numero" type="text" aria-describedby="basic-addon1" aria-label="" placeholder="Nro. Doc." id="nro_doc_profecional_no_medico" ng-model="emergencia.nro_doc_profecional_no_medico" required name="nro_doc_profecional_no_medico" >
                                       <div class="input-group-prepend">
                                           <button class="btn btn-primary " title="Clic para buscar" ng-click="buscarPersonaProfesionalNoMedico()" type="button"><i ng-class="{'fa fa-spinner fa-spin': estado_bus_acomp == 3, 'fa fa-search': estado_bus_acomp != 3}" ></i></button>
                                       </div>
                                       <div class="input-group-prepend">
                                           <button class="btn btn-default btn-border " title="Clic para Seleccionar" type="button" data-toggle="modal" data-target="#seleccionarProfesionalNoMedicoModal" ng-click="focoCampoBuscar('busqueda_texto_profesionalNoMedicotxt');"><i class="fas fa-ellipsis-h"></i></button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-5" ng-show="registro.tipo_profesional_procedimiento != ''">
                               <div class="form-group">
                                   <label>&nbsp;</label>
                                   <div class="input-group">
                                       <input class="form-control " type="text" aria-describedby="basic-addon1" id="nombre_profesional_no_medico_emergencia_txt" ng-model="emergencia.nombre_profesional_no_medico" required name="nombre_profesional_no_medico" readonly>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div class="row">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Servicio Procedimiento: <span class="text-danger">(*)</span></label>
                                    <div class="input-group">
                                        <input class="form-control form-control-sm has-error" type="text" aria-describedby="basic-addon1" aria-label="" ng-model="emergencia.idups_procedimiento" required readonly>
                                        <div class="input-group-prepend">
                                            <button class="btn btn-default btn-border btn-sm" type="button" title="Clic para Seleccionar" type="button" data-toggle="modal" data-target="#seleccionarUpsProcedimientoModal" ng-click="focoCampoBuscar('busqueda_texto_upsProctxt')"><i class="fas fa-ellipsis-h"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <input type="text" class="form-control form-control-sm text-uppercase" id="descripcion_upsProcedimiento_txt" ng-model="emergencia.descripcion_ups_proc" required readonly />
                                </div>
                            </div>
                        </div>

                       <div class="row">
                           <div class="col-lg-12">
                               <div class="table table-responsive">
                                   <table class="table table-bordered table-head-bg-info table-bordered-bd-info">
                                       <thead>
                                       <tr>
                                           <th scope="col">PROC.</th>
                                           <th scope="col">SI-NO</th>
                                           <th scope="col">Codigo CIE</th>
                                           <th scope="col">Descripcion CIE</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                           <tr>
                                               <td class="text-center">Proc1</td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="SI" name="proc1_si_no" ng-model="emergencia.proc1_si_no">
                                                           <span class="form-radio-sign">SI</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="NO" name="proc1_si_no" ng-model="emergencia.proc1_si_no" ng-change="emergencia.codigo_proc_1=''; emergencia.descripcion_proc_1=''; limpiarActividadEmergenciaHIS(5)">
                                                           <span class="form-radio-sign">NO</span>
                                                       </label>
                                                   </center>
                                               </td>
                                               <td>
                                                   <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia.codigo_proc_1" readonly />
                                               </td>
                                               <td>
                                                   <div ng-click="containerClickedProc(1);" >
                                                       <input type="text" class="form-control form-control-sm text-uppercase" size="40" ng-model="emergencia.descripcion_proc_1" placeholder="Escriba para buscar..." ng-disabled="emergencia.proc1_si_no=='NO'" ng-keyup="fetchCIEXProc(1); limpiarActividadEmergenciaHIS(5)" ng-click="searchboxClickedProc($event);" />
                                                       <ul class="list-group" >
                                                           <li class="list-group-item" ng-click="setValueProc($index, 1, $event); addDiagnosticoEmergenciaHis(5, result)" ng-repeat="result in searchResult_Proc_1" >
                                                               @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                           </li>
                                                       </ul>
                                                   </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <td class="text-center">Proc2</td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="SI" name="proc2_si_no" ng-model="emergencia.proc2_si_no">
                                                           <span class="form-radio-sign">SI</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="NO" name="proc2_si_no" ng-model="emergencia.proc2_si_no" ng-change="emergencia.codigo_proc_2=''; emergencia.descripcion_proc_2=''; limpiarActividadEmergenciaHIS(6)">
                                                           <span class="form-radio-sign">NO</span>
                                                       </label>
                                                   </center>
                                               </td>
                                               <td>
                                                   <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia.codigo_proc_2" readonly />
                                               </td>
                                               <td>
                                                   <div ng-click="containerClickedProc(2);" >
                                                       <input type="text" class="form-control form-control-sm text-uppercase" size="40" ng-model="emergencia.descripcion_proc_2" placeholder="Escriba para buscar..." ng-disabled="emergencia.proc2_si_no=='NO'" ng-keyup="fetchCIEXProc(2); limpiarActividadEmergenciaHIS(6)" ng-click="searchboxClickedProc($event);" />
                                                       <ul class="list-group" >
                                                           <li class="list-group-item" ng-click="setValueProc($index, 2, $event); addDiagnosticoEmergenciaHis(6, result)" ng-repeat="result in searchResult_Proc_2" >
                                                               @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                           </li>
                                                       </ul>
                                                   </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <td class="text-center">Proc3</td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="SI" name="proc3_si_no" ng-model="emergencia.proc3_si_no">
                                                           <span class="form-radio-sign">SI</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="NO" name="proc3_si_no" ng-model="emergencia.proc3_si_no" ng-change="emergencia.codigo_proc_3=''; emergencia.descripcion_proc_3=''; limpiarActividadEmergenciaHIS(7)">
                                                           <span class="form-radio-sign">NO</span>
                                                       </label>
                                                   </center>
                                               </td>
                                               <td>
                                                   <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia.codigo_proc_3" readonly />
                                               </td>
                                               <td>
                                                   <div ng-click="containerClickedProc(3);" >
                                                       <input type="text" class="form-control form-control-sm text-uppercase" size="40" ng-model="emergencia.descripcion_proc_3" placeholder="Escriba para buscar..." ng-disabled="emergencia.proc3_si_no=='NO'" ng-keyup="fetchCIEXProc(3); limpiarActividadEmergenciaHIS(7)" ng-click="searchboxClickedProc($event);" />
                                                       <ul class="list-group" >
                                                           <li class="list-group-item" ng-click="setValueProc($index, 3, $event); addDiagnosticoEmergenciaHis(7, result)" ng-repeat="result in searchResult_Proc_3" >
                                                               @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                           </li>
                                                       </ul>
                                                   </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <td class="text-center">Proc4</td>
                                               <td>
                                                   <center>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="SI" name="proc4_si_no" ng-model="emergencia.proc4_si_no">
                                                           <span class="form-radio-sign">SI</span>
                                                       </label>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="NO" name="proc4_si_no" ng-model="emergencia.proc4_si_no" ng-change="emergencia.codigo_proc_4=''; emergencia.descripcion_proc_4=''; limpiarActividadEmergenciaHIS(8)">
                                                           <span class="form-radio-sign">NO</span>
                                                       </label>
                                                   </center>
                                               </td>
                                               <td>
                                                   <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia.codigo_proc_4" readonly />
                                               </td>
                                               <td>
                                                   <div ng-click="containerClickedProc(4);" >
                                                       <input type="text" class="form-control form-control-sm text-uppercase" size="40" ng-model="emergencia.descripcion_proc_4" placeholder="Escriba para buscar..." ng-disabled="emergencia.proc4_si_no=='NO'" ng-keyup="fetchCIEXProc(4); limpiarActividadEmergenciaHIS(8)" ng-click="searchboxClickedProc($event);" />
                                                       <ul class="list-group" >
                                                           <li class="list-group-item" ng-click="setValueProc($index, 4, $event); addDiagnosticoEmergenciaHis(8, result)" ng-repeat="result in searchResult_Proc_4" >
                                                               @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                           </li>
                                                       </ul>
                                                   </div>
                                               </td>
                                           </tr>
                                       </tbody>
                                   </table>
                               </div>
                           </div>
                       </div>

                       <div class="row">
                           <div class="col-lg-12">
                               <div class="table table-responsive">
                                   <table class="table table-bordered table-head-bg-success table-bordered-bd-success">
                                       <thead>
                                       <tr>
                                           <th colspan="4" class="text-center">Entrega de Medicamentos<button type="button" class="btn btn-sm btn-default pull-right" data-toggle="modal" data-target="#seleccionarMedicamentoModal" ng-click="focoCampoBuscar('buscar_medicamento_txt')"><i class="fa fa-plus"></i> Agregar Medicamento</button></th>
                                       </tr>
                                       <tr>
                                           <th>#</th>
                                           <th>Descripcion Medicamento</th>
                                           <th>Cantidad</th>
                                           <th></th>
                                       </tr>
                                       </thead>
                                       <tbody>

                                           <tr ng-repeat="item in emergencia.detalle_medicamento" >
                                              <td>@{{ $index+1 }}</td>
                                              <td>@{{ item.descripcion }}</td>
                                              <td>
                                                 <input type="text" class="form-control form-control-sm numero_med" maxlength="5" ng-model="item.cantidad" />
                                              </td>
                                               <td>
                                                   <button type="button" class="btn btn-sm btn-danger" title="Quitar" ng-click="quitarMedicamento($index)"><i class="fa fa-times"></i></button>
                                               </td>
                                               <script>
                                                   $(function () {
                                                       $(".numero_med").numeric({decimal: ".", negative: false, scale: 3});
                                                   });
                                               </script>
                                           </tr>
                                       </tbody>
                                   </table>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Tratamiento Adicional:</label>
                                   <div>
                                       <label class="form-radio-label">
                                           <input class="form-radio-input" type="radio" value="SI" name="tratamiento_adicional" ng-model="emergencia.tratamiento_adicional">
                                           <span class="form-radio-sign">SI</span>
                                       </label>
                                       <label class="form-radio-label">
                                           <input class="form-radio-input" type="radio" value="NO" name="tratamiento_adicional" ng-model="emergencia.tratamiento_adicional" >
                                           <span class="form-radio-sign">NO</span>
                                       </label>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-3" ng-show="emergencia.tratamiento_adicional == 'SI'">
                               <div class="form-group">
                                   <label>N° de días de Tratamiento:</label>
                                   <input type="text" class="form-control form-control-sm numero" ng-model="emergencia.nro_dia_tratamiento" name="nro_dia_tratamiento" maxlength="2" >
                               </div>
                           </div>
                       </div>

                       <div class="row">
                           <div class="col-lg-6">
                               <div class="form-group">
                                   <label>Condición de Salida:</label>
                                   <select class="form-control form-control-sm" style="width: 100% !important;" id="cmbIdCondicion_salida" ng-model="emergencia.idcondicion_salida" name="idcondicion_salida">
                                       <option value="">---</option>
                                       <option value="1">ALTA MÉDICA</option>
                                       <option value="2">ALTA VOLUNTARIA</option>
                                       <option value="3">TRANSFERIADO / REFERIDO</option>
                                       <option value="4">FUGADO</option>
                                       <option value="5">FALLECIDO</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Fecha de Salida:</label>
                                   <div class="input-group date">
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                       </div>
                                       <input class="form-control form-control-sm" type="text" id="fecha_salidatxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-model="emergencia.fecha_salida" name="fecha_salida" readonly>
                                   </div>
                               </div>
                           </div>
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Hora de Salida: </label>
                                   <div class="input-group date">
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text"><i class="fa fa-clock"></i></span>
                                       </div>
                                       <input class="form-control form-control-sm has-error-2" type="text" autocomplete="off" placeholder="hh:ss" id="hora_salida_txt" data-mask="99:99" ng-model="emergencia.hora_salida" name="hora_salida" ng-blur="validarHoraSalida('hora_salida_txt')" >
                                       <div class="input-group-prepend">
                                           <span  class="input-group-text">24hrs.</span>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-lg-3">
                               <div class="form-group">
                                   <label>Destino:</label>
                                   <select class="form-control form-control-sm" style="width: 100% !important;" id="cmbIdDestino" ng-model="emergencia.iddestino" ng-change="iniciarCombo()" name="iddestino">
                                       <option value="">---</option>
                                       <option value="1">DOMICILIO</option>
                                       <option value="2">HOSPITALIZACION</option>
                                       <option value="3">TRANSFERIADO / REFERIDO</option>
                                       <option value="4">FUGA</option>
                                       <option value="5">DEFUNCION</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-4" ng-show="emergencia.iddestino == 3">
                               <div class="form-group">
                                   <label>Establecimiento:</label>
                                   <select class="form-control form-control-sm" style="width: 100% !important;" id="cmbCod_2000_referencia" ng-model="emergencia.cod_2000_referencia" name="cod_2000_referencia">
                                       <option value="">---</option>
                                       <option ng-repeat="item in lista_establecimientos" value="@{{ item.codigo_unico }}">@{{ item.nom_red }} / @{{ item.codigo_unico }} - @{{ item.nombre_establecimiento }}</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-lg-5" ng-show="emergencia.iddestino == 2">
                               <div class="form-group">
                                   <label>Servicio:</label>
                                   <select class="form-control form-control-sm" style="width: 100% !important;" id="cmbIdUps_hospitalizacion" ng-model="emergencia.idups_hospitalizacion" name="idups_hospitalizacion" >
                                       <option value="">---</option>
                                       <option ng-repeat="item in ups_hospitalizacion" value="@{{ item.codups }}">@{{ item.codups }} - @{{ item.desupsesp }}</option>
                                   </select>
                               </div>
                           </div>
                       </div>
                       
                       <div class="row">
                           <div class="col-lg-12">
                               <div class="panel panel-success">
                                   <div class="panel-heading">Actividad HIS Personal Médico</div>
                                   <div class="panel-body">
                                       <div class="row">
                                           <div class="col-lg-3">
                                               <div class="form-group">
                                                   <label>Establecimiento:</label>
                                                   <div>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="N" name="condicion_establecimiento" ng-model="emergencia.condicion_establecimiento">
                                                           <span class="form-radio-sign">N</span>
                                                       </label><br />
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="C" name="condicion_establecimiento" ng-model="emergencia.condicion_establecimiento" >
                                                           <span class="form-radio-sign">C</span>
                                                       </label><br />
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="R" name="condicion_establecimiento" ng-model="emergencia.condicion_establecimiento" >
                                                           <span class="form-radio-sign">R</span>
                                                       </label>
                                                   </div>
                                               </div>
                                           </div>
                                           <div class="col-lg-3">
                                               <div class="form-group">
                                                   <label>Servicio:</label>
                                                   <div>
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="N" name="condicion_servicio" ng-model="emergencia.condicion_servicio">
                                                           <span class="form-radio-sign">N</span>
                                                       </label><br />
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="C" name="condicion_servicio" ng-model="emergencia.condicion_servicio" >
                                                           <span class="form-radio-sign">C</span>
                                                       </label><br />
                                                       <label class="form-radio-label">
                                                           <input class="form-radio-input" type="radio" value="R" name="condicion_servicio" ng-model="emergencia.condicion_servicio" >
                                                           <span class="form-radio-sign">R</span>
                                                       </label>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                                   <div class="panel-footer">
                                       <div class="table-responsive">
                                           <table class="table table-bordered table-hover">
                                               <thead>
                                                   <tr>
                                                       <th rowspan="2">#</th>
                                                       <th class="text-center" rowspan="2">Descripción CIE</th>
                                                       <th class="text-center" colspan="3">Tipo de Diagnostico</th>
                                                       <th class="text-center" colspan="3">Lab</th>
                                                       <th class="text-center" rowspan="2">Codigo Ciex</th>
                                                   </tr>
                                                   <tr>
                                                       <th class="text-center">P</th>
                                                       <th class="text-center">D</th>
                                                       <th class="text-center">R</th>
                                                       <th class="text-center">1°</th>
                                                       <th class="text-center">2°</th>
                                                       <th class="text-center">3°</th>
                                                   </tr>
                                               </thead>
                                               <tbody>
                                                    <tr ng-repeat="item in emergencia.detalle_his">
                                                        <td>@{{ $index + 1 }}</td>
                                                        <td>@{{ item.descripcion_cie }}</td>
                                                        <td class="text-center">@{{ item.tipo_diagnostico=='P'?item.tipo_diagnostico:'' }}</td>
                                                        <td class="text-center">@{{ item.tipo_diagnostico=='D'?item.tipo_diagnostico:'' }}</td>
                                                        <td class="text-center">@{{ item.tipo_diagnostico=='R'?item.tipo_diagnostico:'' }}</td>
                                                        <td class="text-center">@{{ item.lab1 }}</td>
                                                        <td class="text-center">@{{ item.lab2 }}</td>
                                                        <td class="text-center">@{{ item.lab3 }}</td>
                                                        <td class="text-center">@{{ item.codigo_cie }}</td>
                                                    </tr>
                                               </tbody>
                                           </table>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="panel panel-danger">
                                    <div class="panel-heading">Actividad HIS Personal No Médico</div>
                                    <div class="panel-body">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th rowspan="2">#</th>
                                                        <th class="text-center" rowspan="2">Descripción CIE</th>
                                                        <th class="text-center" colspan="3">Tipo de Diagnostico</th>
                                                        <th class="text-center" colspan="3">Lab</th>
                                                        <th class="text-center" rowspan="2">Codigo Ciex</th>
                                                    </tr>
                                                    <tr>
                                                        <th class="text-center">P</th>
                                                        <th class="text-center">D</th>
                                                        <th class="text-center">R</th>
                                                        <th class="text-center">1°</th>
                                                        <th class="text-center">2°</th>
                                                        <th class="text-center">3°</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr ng-repeat="item in emergencia.detalle_his_nm">
                                                        <td>@{{ $index + 1 }}</td>
                                                        <td>@{{ item.descripcion_cie }}</td>
                                                        <td class="text-center">@{{ item.tipo_diagnostico=='P'?item.tipo_diagnostico:'' }}</td>
                                                        <td class="text-center">@{{ item.tipo_diagnostico=='D'?item.tipo_diagnostico:'' }}</td>
                                                        <td class="text-center">@{{ item.tipo_diagnostico=='R'?item.tipo_diagnostico:'' }}</td>
                                                        <td>
                                                            <input type="text" size="5" ng-show="item.item > 4" ng-model="item.lab1" maxlength="6"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" size="5" ng-show="item.item > 4" ng-model="item.lab2" maxlength="6"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" size="5" ng-show="item.item > 4" ng-model="item.lab3" maxlength="6"/>
                                                        </td>
                                                        <td class="text-center">@{{ item.codigo_cie }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                   <div class="card-footer">
                       <center>
                           <button type="button" class="btn btn-danger" ng-click="salirRegistro()"><i class="fa fa-times"></i> Salir</button>
                           <button type="button" class="btn btn-primary" ng-click="guardar()"><i class="fa fa-save"></i> Guardar</button>
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
                        <h4 class="card-title">Lista de Emergencias y Urgencias</h4>
                        <button class="btn btn-success btn-round ml-auto btn-sm" ng-click="nuevaBusqueda();">
                            <i class="fa fa-plus"></i>
                            Agregar Nuevo
                        </button>
                    </div>
                </div>
                <div id="lista_bloqueoDiv">
                    <div class="card-body">
                        <div class="row">
                            <!--<div class="col-lg-4">
                                <div class="form-group">
                                    <span>Red:</span>
                                    <select class="form-control form-control-sm" style="width: 100%;" id="cmbFiltroRed" ng-model="buscar.red" ng-change="buscarFiltroMicroRed()">
                                        <option value="">Seleccione</option>
                                        <option ng-repeat="item in filtros.redes" value="@{{ item.cod_mred }}">@{{ item.nom_red }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <span>Micro Red:</span>
                                    <select class="form-control form-control-sm" style="width: 100%;" id="cmbFiltroMicrored" ng-model="buscar.microred" ng-change="buscarFiltroEstablecimiento()">
                                        <option value="">Seleccione</option>
                                        <option ng-repeat="item in filtros.microredes" value="@{{ item.cod_microred }}">@{{ item.nom_mic }}</option>
                                    </select>
                                </div>
                            </div>-->
                            @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2  || Session::get('idnivel') == 3 || Session::get('idnivel') == 4)
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <span>Establecimiento:</span>
                                        <select class="form-control form-control-sm" style="width: 100%;" id="cmbFiltroEstablecimiento" ng-model="buscar.cod_2000">
                                            <option value="">Seleccione</option>
                                            <option ng-repeat="item in filtros.eess" value="@{{ item.codigo_unico }}">@{{ item.nombre_establecimiento }}</option>
                                        </select>
                                    </div>
                                </div>
                            @endif
                        </div>
                        <div class="row">
                            @if(Session::get('idnivel') == 5 || Session::get('idnivel') == 6 || Session::get('idnivel') == 7 )
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Profesional Registro</label>
                                        <select class="form-control" ng-model="busqueda.idusuarioregistro">
                                            <option value="">---</option>
                                            <option ng-repeat="item in listausuarios" value="@{{ item.id }}">@{{ item.apellido_paterno_personal }} @{{ item.apellido_materno_personal }} @{{ item.nombres_personal }}</option>
                                        </select>
                                    </div>
                                </div>
                            @endif
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Fecha Inicio</label>
                                    <div class="input-group date">
                                        <div class="input-group-prepend">
                                            <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                        </div>
                                        <input class="form-control form-control-sm" type="text" id="fecha_iniciotxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-model="busqueda.fecha_inicio">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Fecha Final</label>
                                    <div class="input-group date">
                                        <div class="input-group-prepend">
                                            <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                        </div>
                                        <input class="form-control form-control-sm" type="text" id="fecha_finaltxt" autocomplete="off" placeholder="dd/mm/yyyy" ng-model="busqueda.fecha_final">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <div style="padding-top: 35px !important;">
                                    <button type="button" class="btn btn-sm btn-primary btn-block" ng-click="listar()"><i class="fa fa-search"></i> Buscar</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label for="">Nro. Documento a Buscar:</label>
                                    <input type="text" class="form-control form-control-sm" id="nro_documento_buscartxt" placeholder="Presione Enter para buscar" ng-model="busqueda.nro_documento" maxlength="12" ng-keyup="validarNroDocumentoBuscar()" ng-keypress="buscarPacienteByDNI()" />
                                    <span class="text-danger" style="display: none;" id="nro_documento_buscar_span"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer" style="padding: 0px !important;" id="lista_emergencia_bloqueoDiv">
                        <div class="table-responsive" style="padding-top: 15px !important;">
                            <table datatable="ng" dt-options="elementos.dtOptions" dt-instance="dtInstance" class="table table-hover table-color-red table-bordered">
                                <thead>
                                <th></th>
                                <th>N°</th>
                                <th>TRATAMIENTO</th>
                                <th>DNI</th>
                                <th>NOMBRES PACIENTE</th>
                                <th>FECHA INGRESO Y HORA</th>
                                <th>FECHA SALIDA Y HORA</th>
                                <th>TIPO DE ATENCION</th>
                                <!--<th>MOTIVO DE ATENCION</th>-->
                                <th>SERVICIO-UPS</th>
                                <th>DIAGNOSTICO 1</th>
                                <th>PROCEDIMIENTO 1</th>
                                <th>CONDICION DE SALIDA</th>
                                <th>RESPONSABLE DEL REGISTRO</th>
                                </thead>
                                <tbody>
                                <tr ng-repeat="item in lista">
                                    <td>
                                        <div class="btn-group" >
                                            <button type="button" class="btn btn-xs btn-primary dropdown-toggle" data-toggle="dropdown"><i class="fa fa-cog"></i> Opc </button>
                                            <ul class="dropdown-menu" role="menu">
                                                <li ng-show="item.tratamiento_adicional == 'SI' && item.estado==1"><a href="javascript:void(0)" ng-click="prepararTratamiento(item); "><center><i class="fa fa-user-md"></i> Tratamiento</center></a></li>
                                                <li><a href="javascript:void(0)" ng-click="prepararEditarEmergencia(item); "><center><i class="fa fa-edit"></i> Editar</center></a></li>
                                                <li><a href="javascript:void(0)" ng-click="eliminarEmergencia(item)" class="text-danger" title="Eliminar"><center><i class="fas fa-eraser text-danger" ></i> Eliminar</center></a></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>@{{ ($index +1)  }}</td>
                                    <td class="text-center"><label class="badge badge-count badge-warning">@{{ item.nro_tratamiento }}/@{{ item.nro_trat_dia }}</label></td>
                                    <td>@{{ item.nro_documento }}</td>
                                    <td>@{{ item.nombres }} @{{ item.apellido_paterno }}</td>
                                    <td>@{{ item.fecha_atencion }} @{{ item.hora_atencion }}</td>
                                    <td>@{{ item.fecha_salida }} @{{ item.hora_salida }}</td>
                                    <td>@{{ (item.nom_tipo_actividad!='CONSULTA'?(item.nom_tipo_actividad!='EMERGENCIA'?'URG.':'EME.'):'CON.') }}</td>
                                    <!--<td>@{{ item.descripcion_motivo }}</td>-->
                                    <td>@{{ item.descripcion_ups }}</td>
                                    <td>@{{ item.codigo_dx1 }} - @{{ item.descripcion_dx1 }}</td>
                                    <td>@{{ item.codigo_proc_1 }} - @{{ item.descripcion_proc_1 }}</td>
                                    <td>@{{ item.descripcion_condicion }}</td>
                                    <td>@{{ item.nombre_profesional }}</td>
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

    <div class="row" ng-show="estado_registro == 3">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex align-items-center">
                        <h4 class="card-title">Registrar Tratamiento - Emergencia</h4>
                    </div>
                </div>
                <form role="form" name="emergenciaForm">
                    <div class="card-body no-padding">
                        <div class="row ">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Cod. EESS: <span class="text-danger">(*)</span></label>
                                    <div class="input-group">
                                        <input class="form-control form-control-sm numero" type="text" aria-describedby="basic-addon1" aria-label="" ng-keypress="limpiarNombreEESS()"  placeholder="Codigo EESS" id="cod_2000" maxlength="9" ng-model="emergencia_tratamiento.cod_2000" required >
                                        <div class="input-group-prepend">
                                            <button class="btn btn-primary btn-sm" title="Clic para buscar" ng-click="buscarEESS()" type="button"><i ng-class="{'fa fa-spinner fa-spin': estado_bus_acomp == 2, 'fa fa-search': estado_bus_acomp != 2}" ></i></button>
                                        </div>
                                        <div class="input-group-prepend">
                                            <button class="btn btn-default btn-border btn-sm" title="Clic para Seleccionar" type="button" data-toggle="modal" data-target="#seleccionarEstablecimientoModal"><i class="fas fa-ellipsis-h"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label>Establecimiento de Atención: <span class="text-danger">(*)</span></label>
                                    <input type="text" class="form-control form-control-sm" id="nom_est_tratamiento_txt" ng-model="emergencia_tratamiento.nom_est" readonly required />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Tipo de Profesional Responsable de la Atención: <span class="text-danger">(*)</span></label>
                                    <select style="width: 100% !important;" ng-model="emergencia_tratamiento.tipo_profesional_atencion" id="cmbTipoProfesionalAtencion_tratamiento">
                                        <option value="">---</option>
                                        <option value="MEDICO">MÉDICO</option>
                                        <option value="ENFERMERO">ENFERMERO</option>
                                        <option value="OBSTETRA">OBSTETRA</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row ">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Profesional Responsable de la Atención: <span class="text-danger">(*)</span></label>
                                    <input type="hidden" ng-model="emergencia_tratamiento.idprofesional"/>
                                    <div class="input-group">
                                        <input class="form-control form-control-sm numero" type="text" aria-describedby="basic-addon1" aria-label="" placeholder="Nro. Doc." id="nro_documento_profesional_tratamiento" ng-model="emergencia_tratamiento.nro_doc_profecional" required >
                                        <div class="input-group-prepend">
                                            <button class="btn btn-primary btn-sm" title="Clic para buscar" ng-click="buscarPersonaProfesional()" type="button"><i ng-class="{'fa fa-spinner fa-spin': estado_bus_acomp == 3, 'fa fa-search': estado_bus_acomp != 3}" ></i></button>
                                        </div>
                                        <div class="input-group-prepend">
                                            <button class="btn btn-default btn-border btn-sm" title="Clic para Seleccionar" type="button" data-toggle="modal" data-target="#seleccionarProfesionalModal" ng-click="focoCampoBuscar('busqueda_texto_profesionaltxt')"><i class="fas fa-ellipsis-h"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <div class="input-group">
                                        <input class="form-control form-control-sm" type="text" aria-describedby="basic-addon1" aria-label="" placeholder="" ng-model="emergencia_tratamiento.nombre_profesional" id="nombre_profesional_txt" required readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Area de Atención: <span class="text-danger">(*)</span></label>
                                    <select class="form-control form-control-sm has-error" style="width: 100% !important;" id="cmbArea_atencionTratamiento" ng-model="emergencia_tratamiento.area_atencion" required>
                                        <option value="">---</option>
                                        <option value="AREA DE EMERGENCIA">AREA DE EMERGENCIA</option>
                                        <option value="AREA DE EMERGENCIA COVID">AREA DE EMERGENCIA COVID</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Nro. Tratamiento:</label>
                                    <input type="text" class="form-control form-control-sm text-uppercase numero" ng-model="emergencia_tratamiento.nro_tratamiento" id="nro_tratamiento_txt" maxlength="1" />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Fecha Atención: <span class="text-danger">(*)</span></label>
                                    <div class="input-group date">
                                        <div class="input-group-prepend">
                                            <span  class="input-group-text"><i class="fa fa-calendar"></i></span>
                                        </div>
                                        <input class="form-control form-control-sm has-error" type="text" id="fecha_atencion_tratamiento_txt" autocomplete="off" placeholder="dd/mm/yyyy" ng-model="emergencia_tratamiento.fecha_atencion" readonly required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Hora: <span class="text-danger">(*)</span></label>
                                    <div class="input-group date">
                                        <div class="input-group-prepend">
                                            <span  class="input-group-text"><i class="fa fa-clock"></i></span>
                                        </div>
                                        <input class="form-control form-control-sm has-error" type="text" autocomplete="off" placeholder="hh:ss" id="hora_atencion_tratamiento_txt" data-mask="99:99" ng-model="emergencia_tratamiento.hora_atencion" ng-blur="validarHora('hora_atencion_tratamiento_txt')" required >
                                        <div class="input-group-prepend">
                                            <span  class="input-group-text">24hrs.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Tipo Doc.: <span class="text-danger">(*)</span></label>
                                    <select class="form-control form-control-sm has-error" style="width: 100% !important;" id="cmbTipo_documentoTratamiento" ng-model="emergencia_tratamiento.tipo_documento" disabled required>
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
                                    <label>Nro. Documento: <span class="text-danger">(*)</span></label>
                                    <input type="text" class="form-control form-control-sm has-error" ng-model="emergencia_tratamiento.nro_documento" readonly required />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Etnia:</label>
                                    <select class="form-control form-control-sm" style="width: 100% !important;" id="cmbIdEtniaTratamiento" ng-model="emergencia_tratamiento.idetnia" disabled >
                                        <option value="">---</option>
                                        <option ng-repeat="item in lista_etnias" value="@{{ item.id }}">@{{ item.desetni }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Sexo: <span class="text-danger">(*)</span></label>
                                    <select class="form-control form-control-sm has-error" style="width: 100% !important;" id="cmbSexoTratamiento" ng-model="emergencia_tratamiento.sexo" disabled>
                                        <option value="">---</option>
                                        <option value="M">MASCULINO</option>
                                        <option value="F">FEMENINO</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Apellido Paterno: <span class="text-danger">(*)</span></label>
                                    <input type="text" class="form-control form-control-sm has-error text-uppercase" maxlength="45" ng-model="emergencia_tratamiento.apellido_paterno" readonly />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Apellido Materno: <span class="text-danger">(*)</span></label>
                                    <input type="text" class="form-control form-control-sm has-error text-uppercase" maxlength="45" ng-model="emergencia_tratamiento.apellido_materno" readonly />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Nombres: <span class="text-danger">(*)</span></label>
                                    <input type="text" class="form-control form-control-sm has-error text-uppercase" maxlength="45" ng-model="emergencia_tratamiento.nombres" readonly />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-2">
                                <div class="form-group">
                                    <label>Tipo Edad: <span class="text-danger">(*)</span></label>
                                    <select class="form-control form-control-sm text-uppercase has-error" style="width: 100% !important;" id="cmbTipo_edadTratamiento" ng-model="emergencia_tratamiento.tipo_edad" disabled>
                                        <option value="">---</option>
                                        <option value="A">AÑO</option>
                                        <option value="M">MES</option>
                                        <option value="D">DIA</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <div class="form-group">
                                    <label>Edad: <span class="text-danger"></span></label>
                                    <input type="text" class="form-control form-control-sm has-error numero2" maxlength="3" ng-model="emergencia_tratamiento.edad" readonly />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Distrito Residencia:</label>
                                    <select class="form-control form-control-sm" style="width: 100% !important;" id="cmbIdUbigeoTratamiento" ng-model="emergencia_tratamiento.idubigeo" disabled >
                                        <option value="">---</option>
                                        <option ng-repeat="item in lista_ubigeos" value="@{{ item.id_ubigueo_reniec }}">@{{ item.provincia }} / @{{ item.distrito }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="form-group">
                                    <label>Dirección:</label>
                                    <input type="text" class="form-control form-control-sm text-uppercase" ng-model="emergencia_tratamiento.direccion" readonly />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-2">
                                <div class="form-group">
                                    <label>Presión Arterial: </label>
                                    <input type="text" class="form-control form-control-sm numero" id="presion_sistolica_tratamiento_txt" ng-model="emergencia_tratamiento.presion_sistolica" maxlength="3" ng-keyup="validarPresionSistolica(); calcularPresionArterialMedia()" />
                                    <span class="text-danger" style="display: none;" id="presion_sistolica_tratamientp_error_span"></span>
                                </div>
                            </div>
                            <div class="col-lg-1">
                                <div class="form-group text-center">
                                    <label>&nbsp;</label><br/>
                                    <label class="text-center">/</label>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <input type="text" class="form-control form-control-sm numero" id="presion_diastolica_tratamiento_txt" ng-model="emergencia_tratamiento.presion_diastolica" maxlength="3" ng-keyup="validarPresionDiastolica(); calcularPresionArterialMedia()" />
                                    <span class="text-danger" style="display: none;" id="presion_diastolica_tratamiento_txt_error_span"></span>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Presión Arterial Media: </label>
                                    <input type="text" class="form-control form-control-sm numero" ng-model="emergencia_tratamiento.presion_arterial_media" readonly />
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Saturación Oxigeno: </label>
                                    <input type="text" class="form-control form-control-sm numero" ng-model="emergencia_tratamiento.saturacion_oxigeno" id="saturacion_oxigeno_tratamiento_txt" maxlength="2" ng-keyup="validarSaturacionOxigeno();" />
                                    <span class="text-danger" style="display: none;" id="saturacion_oxigeno_tratamiento_error_span"></span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Frecuencia Cardiaca: </label>
                                    <input type="text" class="form-control form-control-sm numero" ng-model="emergencia_tratamiento.frecuencia_cardiaca" id="frecuencia_cardiaca_tratamiento_txt" maxlength="3" ng-keyup="validarFrecuenciaCardiaca();" />
                                    <span class="text-danger" style="display: none;" id="frecuencia_cardiaca_error_tratamiento_span"></span>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Frecuencia Respiratoria: </label>
                                    <input type="text" class="form-control form-control-sm numero2" ng-model="emergencia_tratamiento.frecuencia_respiratoria" id="frecuencia_respiratoria_txt" maxlength="2" ng-keyup="validarFrecuenciaRespiratoria();" />
                                    <span class="text-danger" style="display: none;" id="frecuencia_respiratoria_error_span"></span>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Temperatura: </label>
                                    <input type="text" class="form-control form-control-sm numero3" ng-model="emergencia_tratamiento.temperatura" id="temperatura_tratamiento_txt" maxlength="4" ng-keyup="validarTemperatura();" />
                                    <span class="text-danger" style="display: none;" id="temperatura_tratamiento_error_span"></span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Servicio: <span class="text-danger">(*)</span></label>
                                    <div class="input-group">
                                        <input class="form-control form-control-sm has-error" type="text" aria-describedby="basic-addon1" aria-label="" ng-model="emergencia_tratamiento.idups" required readonly>
                                        <div class="input-group-prepend">
                                            <button class="btn btn-default btn-border btn-sm" type="button" title="Clic para Seleccionar" type="button" data-toggle="modal" data-target="#seleccionarUpsEmergenciaModal" ng-click="focoCampoBuscar('busqueda_texto_upstxt')"><i class="fas fa-ellipsis-h"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-9">
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <input type="text" class="form-control form-control-sm text-uppercase" id="descripcion_upsTratamiento_txt" ng-model="emergencia_tratamiento.descripcion_ups" required readonly />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="table table-responsive">
                                    <table class="table table-bordered table-head-bg-warning table-bordered-bd-warning">
                                        <thead>
                                        <tr>
                                            <th scope="col">DX</th>
                                            <th scope="col">SI-NO</th>
                                            <th scope="col">Codigo CIE</th>
                                            <th scope="col">Descripcion CIE</th>
                                            <th scope="col">Tipo de Diagnóstico</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center">Dx1 <span class="text-danger">(*)</span></td>
                                            <td></td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia_tratamiento.codigo_dx1" id="codigo_dx1_tratamiento_txt" readonly />
                                            </td>
                                            <td>
                                                <div ng-click="containerClicked(1);" >
                                                    <input type="text" class="form-control form-control-sm text-uppercase" id="descripcion_dx1_tratamiento_txt" placeholder="Escriba para buscar..." size="40" ng-model="emergencia_tratamiento.descripcion_dx1" ng-disabled="emergencia_tratamiento.dx1_si_no=='NO'" ng-keyup="fetchCIEX(1); limpiarActividadEmergenciaTratamientoHIS(1)" ng-click="searchboxClicked($event);" />
                                                    <ul class="list-group" >
                                                        <li class="list-group-item" ng-click="setValue($index, 1, $event); addDiagnosticoEmergenciaTratamientoHis(1, result)" ng-repeat="result in searchResult_1" >
                                                            @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="P" name="tipo_diagnostico_tratamiento_dx1" ng-model="emergencia_tratamiento.tipo_diagnostico_dx1">
                                                        <span class="form-radio-sign">P</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="D" name="tipo_diagnostico_tratamiento_dx1" ng-model="emergencia_tratamiento.tipo_diagnostico_dx1">
                                                        <span class="form-radio-sign">D</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="R" name="tipo_diagnostico_tratamiento_dx1" ng-model="emergencia_tratamiento.tipo_diagnostico_dx1">
                                                        <span class="form-radio-sign">R</span>
                                                    </label>
                                                </center>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">Dx2</td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="SI" name="dx2_si_no_tratamiento" ng-model="emergencia_tratamiento.dx2_si_no">
                                                        <span class="form-radio-sign">SI</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="NO" name="dx2_si_no_tratamiento" ng-model="emergencia_tratamiento.dx2_si_no" ng-change="emergencia_tratamiento.codigo_dx2=''; emergencia_tratamiento.descripcion_dx2=''; emergencia_tratamiento.tipo_diagnostico_dx2='P'; limpiarActividadEmergenciaTratamientoHIS(2)">
                                                        <span class="form-radio-sign">NO</span>
                                                    </label>
                                                </center>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia_tratamiento.codigo_dx2" readonly />
                                            </td>
                                            <td>
                                                <div ng-click="containerClicked(2);" >
                                                    <input type="text" class="form-control form-control-sm text-uppercase" placeholder="Escriba para buscar..." size="40" ng-model="emergencia_tratamiento.descripcion_dx2" ng-disabled="emergencia_tratamiento.dx2_si_no=='NO'" ng-keyup="fetchCIEX(2); limpiarActividadEmergenciaTratamientoHIS(2)" ng-click="searchboxClicked($event);" />
                                                    <ul class="list-group" >
                                                        <li class="list-group-item" ng-click="setValue($index, 2, $event); addDiagnosticoEmergenciaTratamientoHis(2, result)" ng-repeat="result in searchResult_2" >
                                                            @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="P" name="tipo_diagnostico_tratamiento_dx2" ng-model="emergencia_tratamiento.tipo_diagnostico_dx2">
                                                        <span class="form-radio-sign">P</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="D" name="tipo_diagnostico_tratamiento_dx2" ng-model="emergencia_tratamiento.tipo_diagnostico_dx2">
                                                        <span class="form-radio-sign">D</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="R" name="tipo_diagnostico_tratamiento_dx2" ng-model="emergencia_tratamiento.tipo_diagnostico_dx2">
                                                        <span class="form-radio-sign">R</span>
                                                    </label>
                                                </center>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">Dx3</td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="SI" name="dx3_si_no_tratamiento" ng-model="emergencia_tratamiento.dx3_si_no">
                                                        <span class="form-radio-sign">SI</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="NO" name="dx3_si_no_tratamiento" ng-model="emergencia_tratamiento.dx3_si_no" ng-change="emergencia_tratamiento.codigo_dx3=''; emergencia_tratamiento.descripcion_dx3=''; emergencia_tratamiento.tipo_diagnostico_dx3='P'; limpiarActividadEmergenciaTratamientoHIS(3)">
                                                        <span class="form-radio-sign">NO</span>
                                                    </label>
                                                </center>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia_tratamiento.codigo_dx3" readonly />
                                            </td>
                                            <td>
                                                <div ng-click="containerClicked(3);" >
                                                    <input type="text" class="form-control form-control-sm text-uppercase" placeholder="Escriba para buscar..." size="40" ng-model="emergencia_tratamiento.descripcion_dx3" ng-disabled="emergencia_tratamiento.dx3_si_no=='NO'" ng-keyup="fetchCIEX(3); limpiarActividadEmergenciaTratamientoHIS(3)" ng-click="searchboxClicked($event);" />
                                                    <ul class="list-group" >
                                                        <li class="list-group-item" ng-click="setValue($index, 3, $event); addDiagnosticoEmergenciaTratamientoHis(3, result)" ng-repeat="result in searchResult_3" >
                                                            @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="P" name="tipo_diagnostico_tratamiento_dx3" ng-model="emergencia_tratamiento.tipo_diagnostico_dx3">
                                                        <span class="form-radio-sign">P</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="D" name="tipo_diagnostico_tratamiento_dx3" ng-model="emergencia_tratamiento.tipo_diagnostico_dx3">
                                                        <span class="form-radio-sign">D</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="R" name="tipo_diagnostico_tratamiento_dx3" ng-model="emergencia_tratamiento.tipo_diagnostico_dx3">
                                                        <span class="form-radio-sign">R</span>
                                                    </label>
                                                </center>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">Dx4</td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="SI" name="dx4_si_no_tratamiento" ng-model="emergencia_tratamiento.dx4_si_no">
                                                        <span class="form-radio-sign">SI</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="NO" name="dx4_si_no_tratamiento" ng-model="emergencia_tratamiento.dx4_si_no" ng-change="emergencia_tratamiento.codigo_dx4=''; emergencia_tratamiento.descripcion_dx4=''; emergencia_tratamiento.tipo_diagnostico_dx4='P'; limpiarActividadEmergenciaTratamientoHIS(4)">
                                                        <span class="form-radio-sign">NO</span>
                                                    </label>
                                                </center>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia_tratamiento.codigo_dx4" readonly />
                                            </td>
                                            <td>
                                                <div ng-click="containerClicked(4);" >
                                                    <input type="text" class="form-control form-control-sm text-uppercase" placeholder="Escriba para buscar..." size="40" ng-model="emergencia_tratamiento.descripcion_dx4" ng-disabled="emergencia_tratamiento.dx4_si_no=='NO'" ng-keyup="fetchCIEX(4); limpiarActividadEmergenciaTratamientoHIS(4)" ng-click="searchboxClicked($event);" />
                                                    <ul class="list-group" >
                                                        <li class="list-group-item" ng-click="setValue($index, 4, $event); addDiagnosticoEmergenciaTratamientoHis(4, result)" ng-repeat="result in searchResult_4" >
                                                            @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="P" name="tipo_diagnostico_tratamiento_dx4" ng-model="emergencia_tratamiento.tipo_diagnostico_dx4">
                                                        <span class="form-radio-sign">P</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="D" name="tipo_diagnostico_tratamiento_dx4" ng-model="emergencia_tratamiento.tipo_diagnostico_dx4">
                                                        <span class="form-radio-sign">D</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="R" name="tipo_diagnostico_tratamiento_dx4" ng-model="emergencia_tratamiento.tipo_diagnostico_dx4">
                                                        <span class="form-radio-sign">R</span>
                                                    </label>
                                                </center>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Tipo de Profesional Responsable del Procedimiento: <span class="text-danger">(*)</span></label>
                                    <select style="width: 100% !important;" ng-model="emergencia_tratamiento.tipo_profesional_procedimiento" id="cmbTipoProfesionalProcedimiento_tratamiento">
                                        <option value="">---</option>
                                        <option value="MEDICO">MÉDICO</option>
                                        <option value="ENFERMERO">ENFERMERO</option>
                                        <option value="OBSTETRA">OBSTETRA</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Profesional Responsable del Procedimiento: <span class="text-danger">(*)</span></label>
                                    <input type="hidden" ng-model="emergencia_tratamiento.idprofesional_no_medico" />
                                    <div class="input-group">
                                        <input class="form-control form-control-sm numero" type="text" aria-describedby="basic-addon1" aria-label="" placeholder="Nro. Doc." id="nro_doc_profecional_no_medico_tratamiento" ng-model="emergencia_tratamiento.nro_doc_profecional_no_medico" required name="nro_doc_profecional_no_medico_tratamiento" >
                                        <div class="input-group-prepend">
                                            <button class="btn btn-primary btn-sm" title="Clic para buscar" ng-click="buscarPersonaProfesionalNoMedico()" type="button"><i ng-class="{'fa fa-spinner fa-spin': estado_bus_acomp == 3, 'fa fa-search': estado_bus_acomp != 3}" ></i></button>
                                        </div>
                                        <div class="input-group-prepend">
                                            <button class="btn btn-default btn-border btn-sm" title="Clic para Seleccionar" type="button" data-toggle="modal" data-target="#seleccionarProfesionalNoMedicoModal"><i class="fas fa-ellipsis-h"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <div class="input-group">
                                        <input class="form-control form-control-sm" type="text" aria-describedby="basic-addon1" id="nombre_profesional_no_medico_tratamiento_txt" ng-model="emergencia_tratamiento.nombre_profesional_no_medico" required name="nombre_profesional_no_medico_tratamiento" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="table table-responsive">
                                    <table class="table table-bordered table-head-bg-info table-bordered-bd-info">
                                        <thead>
                                        <tr>
                                            <th scope="col" rowspan="2">PROC.</th>
                                            <th scope="col" class="text-center" rowspan="2">SI-NO</th>
                                            <th scope="col" class="text-center" rowspan="2">Codigo CIE</th>
                                            <th scope="col" class="text-center" rowspan="2">Descripcion CIE</th>
                                            <th scope="col" colspan="3" class="text-center">Lab</th>
                                        </tr>
                                        <tr>
                                            <th class="text-center">1°</th>
                                            <th class="text-center">2°</th>
                                            <th class="text-center">3°</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="text-center">Proc1</td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="SI" name="proc1_si_no_tratamiento" ng-model="emergencia_tratamiento.proc1_si_no">
                                                        <span class="form-radio-sign">SI</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="NO" name="proc1_si_no_tratamiento" ng-model="emergencia_tratamiento.proc1_si_no" ng-change="emergencia_tratamiento.codigo_proc_1=''; emergencia_tratamiento.descripcion_proc_1=''; emergencia_tratamiento.lab_p1_1=''; emergencia_tratamiento.lab_p1_2=''; emergencia_tratamiento.lab_p1_3=''; limpiarActividadEmergenciaTratamientoHIS(5)">
                                                        <span class="form-radio-sign">NO</span>
                                                    </label>
                                                </center>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia_tratamiento.codigo_proc_1" readonly />
                                            </td>
                                            <td>
                                                <div ng-click="containerClickedProcTratamiento(1);" >
                                                    <input type="text" class="form-control form-control-sm text-uppercase" size="40" ng-model="emergencia_tratamiento.descripcion_proc_1" placeholder="Escriba para buscar..." ng-disabled="emergencia_tratamiento.proc1_si_no=='NO'" ng-keyup="fetchCIEXProcTratamiento(1); limpiarActividadEmergenciaTratamientoHIS(5)" ng-click="searchboxClickedProcTratamiento($event);" />
                                                    <ul class="list-group" >
                                                        <li class="list-group-item" ng-click="setValueProcTratamiento($index, 1, $event); numeroProcedimientoNuevo(result.codigo_cie, 1); addDiagnosticoEmergenciaTratamientoHis(5, result)" ng-repeat="result in searchResult_tratamiento_Proc_1" >
                                                            @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p1_1" ng-keyup="modificarLabProc_his(5)" ng-disabled="emergencia_tratamiento.proc1_si_no=='NO'" />
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p1_2" ng-keyup="modificarLabProc_his(5)" ng-disabled="emergencia_tratamiento.proc1_si_no=='NO'" />
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p1_3" ng-keyup="modificarLabProc_his(5)" ng-disabled="emergencia_tratamiento.proc1_si_no=='NO'" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">Proc2</td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="SI" name="proc2_si_no_tratamiento" ng-model="emergencia_tratamiento.proc2_si_no">
                                                        <span class="form-radio-sign">SI</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="NO" name="proc2_si_no_tratamiento" ng-model="emergencia_tratamiento.proc2_si_no" ng-change="emergencia_tratamiento.codigo_proc_2=''; emergencia_tratamiento.descripcion_proc_2=''; emergencia_tratamiento.lab_p2_1=''; emergencia_tratamiento.lab_p2_2=''; emergencia_tratamiento.lab_p2_3=''; limpiarActividadEmergenciaTratamientoHIS(6)">
                                                        <span class="form-radio-sign">NO</span>
                                                    </label>
                                                </center>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia_tratamiento.codigo_proc_2" readonly />
                                            </td>
                                            <td>
                                                <div ng-click="containerClickedProcTratamiento(2);" >
                                                    <input type="text" class="form-control form-control-sm text-uppercase" size="40" ng-model="emergencia_tratamiento.descripcion_proc_2" placeholder="Escriba para buscar..." ng-disabled="emergencia_tratamiento.proc2_si_no=='NO'" ng-keyup="fetchCIEXProcTratamiento(2); limpiarActividadEmergenciaTratamientoHIS(6)" ng-click="searchboxClickedProcTratamiento($event);" />
                                                    <ul class="list-group" >
                                                        <li class="list-group-item" ng-click="setValueProcTratamiento($index, 2, $event); numeroProcedimientoNuevo(result.codigo_cie, 2); addDiagnosticoEmergenciaTratamientoHis(6, result)" ng-repeat="result in searchResult_tratamiento_Proc_2" >
                                                            @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p2_1" ng-keyup="modificarLabProc_his(6)" ng-disabled="emergencia_tratamiento.proc2_si_no=='NO'" />
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p2_2" ng-keyup="modificarLabProc_his(6)" ng-disabled="emergencia_tratamiento.proc2_si_no=='NO'" />
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p2_3" ng-keyup="modificarLabProc_his(6)" ng-disabled="emergencia_tratamiento.proc2_si_no=='NO'" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">Proc3</td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="SI" name="proc3_si_no_tratamiento" ng-model="emergencia_tratamiento.proc3_si_no">
                                                        <span class="form-radio-sign">SI</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="NO" name="proc3_si_no_tratamiento" ng-model="emergencia_tratamiento.proc3_si_no" ng-change="emergencia_tratamiento.codigo_proc_3=''; emergencia_tratamiento.descripcion_proc_3=''; emergencia_tratamiento.lab_p3_1=''; emergencia_tratamiento.lab_p3_2=''; emergencia_tratamiento.lab_p3_3=''; limpiarActividadEmergenciaTratamientoHIS(7)">
                                                        <span class="form-radio-sign">NO</span>
                                                    </label>
                                                </center>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia_tratamiento.codigo_proc_3" readonly />
                                            </td>
                                            <td>
                                                <div ng-click="containerClickedProcTratamiento(3);" >
                                                    <input type="text" class="form-control form-control-sm text-uppercase" size="40" ng-model="emergencia_tratamiento.descripcion_proc_3" placeholder="Escriba para buscar..." ng-disabled="emergencia_tratamiento.proc3_si_no=='NO'" ng-keyup="fetchCIEXProcTratamiento(3); limpiarActividadEmergenciaTratamientoHIS(7)" ng-click="searchboxClickedProcTratamiento($event);" />
                                                    <ul class="list-group" >
                                                        <li class="list-group-item" ng-click="setValueProcTratamiento($index, 3, $event); numeroProcedimientoNuevo(result.codigo_cie, 3); addDiagnosticoEmergenciaTratamientoHis(7, result)" ng-repeat="result in searchResult_tratamiento_Proc_3" >
                                                            @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p3_1" ng-keyup="modificarLabProc_his(7)" ng-disabled="emergencia_tratamiento.proc3_si_no=='NO'" />
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p3_2" ng-keyup="modificarLabProc_his(7)" ng-disabled="emergencia_tratamiento.proc3_si_no=='NO'" />
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p3_3" ng-keyup="modificarLabProc_his(7)" ng-disabled="emergencia_tratamiento.proc3_si_no=='NO'" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">Proc4</td>
                                            <td>
                                                <center>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="SI" name="proc4_si_no_tratamiento" ng-model="emergencia_tratamiento.proc4_si_no">
                                                        <span class="form-radio-sign">SI</span>
                                                    </label>
                                                    <label class="form-radio-label">
                                                        <input class="form-radio-input" type="radio" value="NO" name="proc4_si_no_tratamiento" ng-model="emergencia_tratamiento.proc4_si_no" ng-change="emergencia_tratamiento.codigo_proc_4=''; emergencia_tratamiento.descripcion_proc_4=''; emergencia_tratamiento.lab_p4_1=''; emergencia_tratamiento.lab_p4_2=''; emergencia_tratamiento.lab_p4_3=''; limpiarActividadEmergenciaTratamientoHIS(8)">
                                                        <span class="form-radio-sign">NO</span>
                                                    </label>
                                                </center>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm" size="10" ng-model="emergencia_tratamiento.codigo_proc_4" readonly />
                                            </td>
                                            <td>
                                                <div ng-click="containerClickedProcTratamiento(4);" >
                                                    <input type="text" class="form-control form-control-sm text-uppercase" size="40" ng-model="emergencia_tratamiento.descripcion_proc_4" placeholder="Escriba para buscar..." ng-disabled="emergencia_tratamiento.proc4_si_no=='NO'" ng-keyup="fetchCIEXProcTratamiento(4); limpiarActividadEmergenciaTratamientoHIS(8)" ng-click="searchboxClickedProcTratamiento($event);" />
                                                    <ul class="list-group" >
                                                        <li class="list-group-item" ng-click="setValueProcTratamiento($index, 4, $event); numeroProcedimientoNuevo(result.codigo_cie, 4); addDiagnosticoEmergenciaTratamientoHis(8, result)" ng-repeat="result in searchResult_tratamiento_Proc_4" >
                                                            @{{ result.codigo_cie }} - @{{ result.descripcion_cie }}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p4_1" ng-keyup="modificarLabProc_his(8)" ng-disabled="emergencia_tratamiento.proc4_si_no=='NO'" />
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p4_2" ng-keyup="modificarLabProc_his(8)" ng-disabled="emergencia_tratamiento.proc4_si_no=='NO'" />
                                            </td>
                                            <td>
                                                <input type="text" class="form-control-personalizado form-control-personalizado-sm" size="5" ng-model="emergencia_tratamiento.lab_p4_3" ng-keyup="modificarLabProc_his(8)" ng-disabled="emergencia_tratamiento.proc4_si_no=='NO'" />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="table table-responsive">
                                    <table class="table table-bordered table-head-bg-success table-bordered-bd-success">
                                        <thead>
                                        <tr>
                                            <th colspan="4" class="text-center">Entrega de Medicamentos<button type="button" class="btn btn-sm btn-default pull-right" data-toggle="modal" data-target="#seleccionarMedicamentoModal" ng-click="focoCampoBuscar('buscar_medicamento_txt')"><i class="fa fa-plus"></i> Agregar Medicamento</button></th>
                                        </tr>
                                        <tr>
                                            <th>#</th>
                                            <th>Descripcion Medicamento</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr ng-repeat="item in emergencia_tratamiento.detalle_medicamento" >
                                            <td>@{{ $index+1 }}</td>
                                            <td>@{{ item.descripcion }}</td>
                                            <td>
                                                <input type="text" class="form-control form-control-sm numero_med" maxlength="5" ng-model="item.cantidad" />
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-sm btn-danger" title="Quitar" ng-click="quitarMedicamento($index)"><i class="fa fa-times"></i></button>
                                            </td>
                                            <script>
                                                $(function () {
                                                    $(".numero_med").numeric({decimal: ".", negative: false, scale: 3});
                                                });
                                            </script>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="panel panel-success">
                                    <div class="panel-heading">Actividad HIS</div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <div class="form-group">
                                                    <label>Establecimiento:</label>
                                                    <div>
                                                        <label class="form-radio-label">
                                                            <input class="form-radio-input" type="radio" value="N" name="condicion_establecimiento_tratamiento" ng-model="emergencia_tratamiento.condicion_establecimiento">
                                                            <span class="form-radio-sign">N</span>
                                                        </label><br />
                                                        <label class="form-radio-label">
                                                            <input class="form-radio-input" type="radio" value="C" name="condicion_establecimiento_tratamiento" ng-model="emergencia_tratamiento.condicion_establecimiento" >
                                                            <span class="form-radio-sign">C</span>
                                                        </label><br />
                                                        <label class="form-radio-label">
                                                            <input class="form-radio-input" type="radio" value="R" name="condicion_establecimiento_tratamiento" ng-model="emergencia_tratamiento.condicion_establecimiento" >
                                                            <span class="form-radio-sign">R</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-3">
                                                <div class="form-group">
                                                    <label>Servicio:</label>
                                                    <div>
                                                        <label class="form-radio-label">
                                                            <input class="form-radio-input" type="radio" value="N" name="condicion_servicio_tratamiento" ng-model="emergencia_tratamiento.condicion_servicio">
                                                            <span class="form-radio-sign">N</span>
                                                        </label><br />
                                                        <label class="form-radio-label">
                                                            <input class="form-radio-input" type="radio" value="C" name="condicion_servicio_tratamiento" ng-model="emergencia_tratamiento.condicion_servicio" >
                                                            <span class="form-radio-sign">C</span>
                                                        </label><br />
                                                        <label class="form-radio-label">
                                                            <input class="form-radio-input" type="radio" value="R" name="condicion_servicio_tratamiento" ng-model="emergencia_tratamiento.condicion_servicio" >
                                                            <span class="form-radio-sign">R</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-footer">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-hover">
                                                <thead>
                                                <tr>
                                                    <th rowspan="2">#</th>
                                                    <th class="text-center" rowspan="2">Descripción CIE</th>
                                                    <th class="text-center" colspan="3">Tipo de Diagnostico</th>
                                                    <th class="text-center" colspan="3">Lab</th>
                                                    <th class="text-center" rowspan="2">Codigo Ciex</th>
                                                </tr>
                                                <tr>
                                                    <th class="text-center">P</th>
                                                    <th class="text-center">D</th>
                                                    <th class="text-center">R</th>
                                                    <th class="text-center">1°</th>
                                                    <th class="text-center">2°</th>
                                                    <th class="text-center">3°</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr ng-repeat="item in emergencia_tratamiento.detalle_his">
                                                    <td>@{{ $index + 1 }}</td>
                                                    <td>@{{ item.descripcion_cie }}</td>
                                                    <td class="text-center">@{{ item.tipo_diagnostico=='P'?item.tipo_diagnostico:'' }}</td>
                                                    <td class="text-center">@{{ item.tipo_diagnostico=='D'?item.tipo_diagnostico:'' }}</td>
                                                    <td class="text-center">@{{ item.tipo_diagnostico=='R'?item.tipo_diagnostico:'' }}</td>
                                                    <td class="text-center">@{{ item.lab1 }}</td>
                                                    <td class="text-center">@{{ item.lab2 }}</td>
                                                    <td class="text-center">@{{ item.lab3 }}</td>
                                                    <td class="text-center">@{{ item.codigo_cie }}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <center>
                            <button type="button" class="btn btn-danger" ng-click="salirRegistroTratamiento()"><i class="fa fa-times"></i> Salir</button>
                            <button type="button" class="btn btn-primary" ng-click="guardarTratamiento()"><i class="fa fa-save"></i> Guardar</button>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- MODALS -->
    <div class="modal fade" id="seleccionarProfesionalModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header no-bd">
                    <h5 class="modal-title">
                        <span class="fw-mediumbold">
                        Seleccionar Profesional </span>
                        <span class="fw-light">
                            Médico
                        </span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2 || Session::get('idnivel') == 3 || Session::get('idnivel') == 4)
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Establecimiento: </label>
                                    <select class="select" style="width: 100% !important;" id="cmbEstablecientoProf" ng-model="busqueda_profesional.cod_2000" ng-change="listarProfesionalByEESS()">
                                        <option value="">---</option>
                                        <option ng-repeat="item in lista_establecimientos" value="@{{ item.codigo_unico }}">@{{ item.nom_red }} / @{{ item.codigo_unico }} - @{{ item.nombre_establecimiento }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    @endif
                    <div class="row" ng-show="lista_profesionales.length > 0">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Texto a Buscar:</label>
                                <input type="text" class="form-control text-uppercase" id="busqueda_texto_profesionaltxt" ng-model="busqueda_texto" placeholder="Ingrese Texto a Buscar..." />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive mt-2" style="height: 300px;">
                            <table class="table table-bordered table-hover text-nowrap">
                                <thead>
                                    <th></th>
                                    <th>Nro. Documento</th>
                                    <th>Nombres</th>
                                    <th>Profesion</th>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in lista_profesionales | filter: busqueda_texto">
                                        <td><button type="button" class="btn btn-info btn-sm" ng-click="seleccionProfecional(item)" title="Seleccionar Profesional"><i class="fas fa-check"></i></button></td>
                                        <td>@{{ item.numero_documento }}</td>
                                        <td>@{{ item.nombres_personal }} @{{ item.apellido_paterno_personal }} @{{ item.apellido_materno_personal }}</td>
                                        <td>@{{ item.nom_profesion }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer no-bd">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="seleccionarProfesionalNoMedicoModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header no-bd">
                    <h5 class="modal-title">
                        <span class="fw-mediumbold">
                        Seleccionar Profesional </span>
                        <span class="fw-light">
                            No Médico
                        </span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @if(Session::get('idnivel') == 1 || Session::get('idnivel') == 2 || Session::get('idnivel') == 3 || Session::get('idnivel') == 4)
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Establecimiento: </label>
                                    <select class="select" style="width: 100% !important;" id="cmbEstablecientoProfNoMedico" ng-model="busqueda_profesional_nomedico.cod_2000" ng-change="listarProfesionalNoMedicoByEESS()">
                                        <option value="">---</option>
                                        <option ng-repeat="item in lista_establecimientos" value="@{{ item.codigo_unico }}">@{{ item.nom_red }} / @{{ item.codigo_unico }} - @{{ item.nombre_establecimiento }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    @endif
                    <div class="row" ng-show="lista_profesionales_nomedicos.length > 0">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Texto a Buscar:</label>
                                <input type="text" class="form-control text-uppercase" name="busqueda_texto_nomedico" id="busqueda_texto_profesionalNoMedicotxt" ng-model="busqueda_texto_nomedico" placeholder="Ingrese Texto a Buscar..." />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive mt-2" style="height: 300px;">
                            <table class="table table-bordered table-hover text-nowrap">
                                <thead>
                                <th></th>
                                <th>Nro. Documento</th>
                                <th>Nombres</th>
                                <th>Profesion</th>
                                </thead>
                                <tbody>
                                <tr ng-repeat="item in lista_profesionales_nomedicos | filter: busqueda_texto_nomedico">
                                    <td><button type="button" class="btn btn-info btn-sm" ng-click="seleccionProfecionalNoMedico(item)" title="Seleccionar Profesional"><i class="fas fa-check"></i></button></td>
                                    <td>@{{ item.numero_documento }}</td>
                                    <td>@{{ item.nombres_personal }} @{{ item.apellido_paterno_personal }} @{{ item.apellido_materno_personal }}</td>
                                    <td>@{{ item.nom_profesion }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer no-bd">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="seleccionarUpsEmergenciaModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header no-bd">
                    <h5 class="modal-title">
                        <span class="fw-mediumbold">
                        Seleccionar UPS </span>
                        <span class="fw-light">
                            Emergencias
                        </span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" ng-show="ups_emergencia.length > 0">
                        <div class="col-lg-12">
                           <div class="form-group">
                               <label>Busqueda:</label>
                               <input type="text" class="form-control text-uppercase" id="busqueda_texto_upstxt" ng-model="busqueda_texto_emerg" name="busqueda_texto_emerg" placeholder="Ingrese Texto a buscar" />
                           </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive mt-2" style="height: 300px;">
                            <table class="table table-bordered table-hover text-nowrap">
                                <thead>
                                    <th></th>
                                    <th>Codigo UPS</th>
                                    <th>Descripción UPS</th>
                                    <th>Servicio</th>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in ups_emergencia | filter: busqueda_texto_emerg">
                                        <td><button type="button" class="btn btn-info btn-sm" ng-click="seleccionUpsEmergencia(item)" title="Seleccionar UPS"><i class="fas fa-check"></i></button></td>
                                        <td>@{{ item.codups }}</td>
                                        <td>@{{ item.desupsesp }}</td>
                                        <td>@{{ item.desups }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer no-bd">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="seleccionarUpsProcedimientoModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header no-bd">
                    <h5 class="modal-title">
                        <span class="fw-mediumbold">
                        Seleccionar UPS </span>
                        <span class="fw-light">
                            Emergencia Procedimiento
                        </span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" ng-show="ups_emergencia.length > 0">
                        <div class="col-lg-12">
                           <div class="form-group">
                               <label>Busqueda:</label>
                               <input type="text" class="form-control text-uppercase" id="busqueda_texto_upsProctxt" ng-model="busqueda_texto_ups_proc" name="busqueda_texto_ups_proc" placeholder="Ingrese Texto a buscar" />
                           </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive mt-2" style="height: 300px;">
                            <table class="table table-bordered table-hover text-nowrap">
                                <thead>
                                    <th></th>
                                    <th>Codigo UPS</th>
                                    <th>Descripción UPS</th>
                                    <th>Servicio</th>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in ups_emergencia_proc | filter: busqueda_texto_ups_proc">
                                        <td><button type="button" class="btn btn-info btn-sm" ng-click="seleccionUpsEmergenciaProc(item)" title="Seleccionar UPS"><i class="fas fa-check"></i></button></td>
                                        <td>@{{ item.codups }}</td>
                                        <td>@{{ item.desupsesp }}</td>
                                        <td>@{{ item.desups }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer no-bd">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="seleccionarEstablecimientoModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header no-bd">
                    <h5 class="modal-title">
                        <span class="fw-mediumbold">
                        Seleccionar Establecimiento
                        </span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                       <div class="col-lg-6">
                           <div class="form-group">
                               <label>RED: <span class="text-danger">(*)</span></label>
                               <select class="form-control" style="width: 100% !important;" id="cmbRedBuscar" ng-model="buscar_eess.codigo_red" ng-change="listarMicroRedByRed()">
                                   <option value="">---</option>
                                   <option ng-repeat="item in lista_redes" value="@{{ item.codigo_red }}">@{{ item.nom_red }}</option>
                               </select>
                           </div>
                       </div>
                       <div class="col-lg-6">
                           <div class="form-group">
                               <label>MICRORED: <span class="text-danger">(*)</span></label>
                               <select class="form-control" style="width: 100% !important;" id="cmbMicroRedBuscar" ng-model="buscar_eess.codigo_microred" ng-change="listarEESSbyMicroRed()">
                                   <option value="">---</option>
                                   <option ng-repeat="item in lista_microredes" value="@{{ item.codigo_microred }}">@{{ item.nom_microred }}</option>
                               </select>
                           </div>
                       </div>
                    </div>
                    <div class="row" ng-show="ups_emergencia.length > 0">
                        <div class="col-lg-12">
                           <div class="form-group">
                               <label>Busqueda:</label>
                               <input type="text" class="form-control text-uppercase" ng-model="buscar_eess_texto" placeholder="Ingrese Texto a buscar" />
                           </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive mt-2" id="lista_eess_buscar" style="height: 300px;">
                            <table class="table table-bordered table-hover text-nowrap">
                                <thead>
                                    <th></th>
                                    <th>Codigo</th>
                                    <th>Nombre del Establecimiento</th>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in  lista_eess | filter: buscar_eess_texto">
                                        <td><button type="button" class="btn btn-info btn-sm" ng-click="seleccionEESS(item)" title="Seleccionar Establecimiento"><i class="fas fa-check"></i></button></td>
                                        <td>@{{ item.codigo_unico }}</td>
                                        <td>@{{ item.nombre_establecimiento }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer no-bd">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="seleccionarMedicamentoModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header no-bd">
                    <h5 class="modal-title">
                        <span class="fw-mediumbold">
                        Seleccionar Medicamento
                        </span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row" >
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Busqueda:</label>
                                <input type="text" class="form-control text-uppercase" id="buscar_medicamento_txt" ng-model="buscar_medicamento_texto" placeholder="Ingrese Texto a buscar" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="table-responsive mt-2" id="lista_medicamento_buscar" style="height: 300px;">
                            <table class="table table-bordered table-hover text-nowrap">
                                <thead>
                                    <th></th>
                                    <th>Descripcion Medicamento</th>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="item in  lista_medicamentos | filter: buscar_medicamento_texto">
                                        <td><button type="button" class="btn btn-info btn-sm" ng-click="seleccionMedicamento(item);" title="Seleccionar Medicamento"><i class="fas fa-check"></i></button></td>
                                        <td>@{{ item.descripcion }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer no-bd">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('javascripts')
    @parent
    <script src="{{ asset('js/angular/controller/emergencia/emergenciaController.js') }}"></script>
    <script src="{{ asset('js/accesorios.js') }}"></script>
    <script>
        $(function () {
            $('select').select2();
            $('.select').select2({
                dropdownParent: $('#seleccionarProfesionalNoMedicoModal')
            });
            $('.select').select2({
                dropdownParent: $('#seleccionarProfesionalModal')
            });
            $('#cmbEstablecientoProfNoMedico').select2({
                dropdownParent: $('#seleccionarProfesionalNoMedicoModal')
            });
            $('#cmbRedBuscar').select2({
                dropdownParent: $('#seleccionarEstablecimientoModal')
            });
            $('#cmbMicroRedBuscar').select2({
                dropdownParent: $('#seleccionarEstablecimientoModal')
            });
            //fecha_atenciontxt
            $('#fecha_atenciontxt').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy',
                endDate: new Date()
            }).on('changeDate',
                    function (selected) {
                        $('#fecha_salidatxt').datepicker('setStartDate', getDate(selected));
                    });

            $('#fecha_salidatxt').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy',
                endDate: new Date()
            });

            $('#fecha_nacimientotxt').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy',
                endDate: new Date()
            });

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

            $(".numero").numeric({decimal: false, negative: false});
            $(".numero3").numeric({ decimalPlaces: 1, altDecimal: '.', negative: false });


            var getDate = function (input) {
                return new Date(input.date.valueOf());
            }

        });
    </script>
@endsection
