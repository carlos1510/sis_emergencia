@extends('main')

@section('title')
    Perfil | SIGEST
@endsection

@section('bodycontroller')
    id='perfilController' ng-controller='perfilController'
@endsection

@section('container')
    <div class="row">
        <div class="col-md-4">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>Imagen del Perfil</h5>
                </div>
                <div class="ibox-content no-padding border-left-right">
                    <img alt="image" class="img-responsive" src="img/perfil/user_default_profile.jpg">
                </div>
                <div class="ibox-content profile-content"></div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>Detalle del Perfil de Usuario</h5>
                    <div class="ibox-tools">
                        <button type="button" class="btn btn-sm btn-primary tip" title="Click para Editar" ng-click="activarDesactivarCampos(false)"><i class="fa fa-pencil"></i> Editar</button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-lg-6 b-r">
                            <div class="feed-element">
                                <label class="pull-left">DNI:</label>
                                <span class="text-success pull-right">@{{ perfil.dni }}</span>
                            </div>
                            <div class="feed-element">
                                <label class="pull-left">Apellido Paterno:</label>
                                <input type="text" class="form-control text-uppercase" id="paternotxt" ng-model="perfil.paterno" readonly />
                            </div>
                            <div class="form-group">
                                <label class="pull-left">Apellido Materno:</label>
                                <input type="text" class="form-control text-uppercase" id="maternotxt" ng-model="perfil.materno" readonly />
                            </div>
                            <div class="form-group">
                                <label class="pull-left">Nombres:</label>
                                <input type="text" class="form-control text-uppercase" id="nombrestxt" ng-model="perfil.nombres" readonly />
                            </div>
                            <div class="feed-element">
                                <label class="pull-left">Sexo:</label>
                                <div class="pull-right">
                                    <select  style="width: 120px !important;" id="cmbsexo" ng-model="perfil.sexo" disabled="true">
                                        <option value="M">MASCULINO</option>
                                        <option value="F">FEMENINO</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label >Telefono:</label>
                                <input type="text" class="form-control" id="telefonotxt" ng-model="perfil.telefono" readonly="true">
                            </div>
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="text" class="form-control" id="emailtxt" readonly="true" ng-model="perfil.email" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="feed-element">
                                <label class="pull-left">Colegiatura:</label>
                                <input type="text" class="form-control" id="colegiaturatxt" ng-model="perfil.codigo" readonly="true" />
                            </div>
                            <div class="feed-element">
                                <label class="pull-left">Establecimiento:</label>
                                <span class="text-success pull-right">@{{ perfil.eess }}</span>
                            </div>
                            <div class="feed-element">
                                <label class="pull-left">Profesión:</label>
                                <span class="text-success pull-right">@{{ perfil.profesion }}</span>
                            </div>
                            <div class="feed-element">
                                <label class="pull-left">Usuario:</label>
                                <span class="text-success pull-right">@{{ perfil.usuario }}</span>
                            </div>
                            <div class="form-group">
                                <label class="pull-left">Clave:</label>
                                <input type="password" class="form-control" id="clavetxt" ng-model="perfil.clave" readonly="true" />
                            </div>
                            <div class="form-group">
                                <label class="pull-left">Repite Clave:</label>
                                <input type="password" class="form-control" id="repiteclavetxt" ng-model="perfil.repiteclave" readonly="true" />
                                <span style="display: none;" id="error_clave_span" class="text-danger">Error!... Las claves no coinciden.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ibox-content profile-content">
                    <div class="row">
                        <div class="col-md-12">
                            <center>
                                <button type="button" class="btn btn-danger btn-sm" disabled="true" id="btncancelar" ng-click="activarDesactivarCampos(true)"><i class="fa fa-times"></i> Cancelar</button>
                                <button type="button" class="btn btn-success btn-sm" disabled="true" id="btnguardar" ng-click="guardar()"><i class="fa fa-check"></i> Guardar Cambios</button>
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
    <script src="js/angular/controller/perfil/perfilController.js"></script>
    <script>
        $(function () {
            $("select").select2();
        });
    </script>
@endsection