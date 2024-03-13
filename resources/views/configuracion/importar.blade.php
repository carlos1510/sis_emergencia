@extends('main')

@section('title')
    Importar Datos
@endsection

@section('bodycontroller')
    id='importarController' ng-controller='importarController'
@endsection

@section('content')
    <div class="row">
        @if($errors->has('informacion'))
            <div class="col-lg-12">
                <div class="alert alert-success alert-dismissible">
                    <button class="close" aria-hidden="true" data-dismiss="alert" type="button">×</button>
                    <h5>
                        <i class="fa fa-check"></i>
                        Confirmado!
                    </h5>
                    {{ $errors->first('informacion') }}
                </div>
            </div>
        @endif
        @if($errors->has('error'))
            <div class="col-lg-12">
                <div class="alert alert-danger alert-dismissible">
                    <button class="close" aria-hidden="true" data-dismiss="alert" type="button">×</button>
                    <h5>
                        <i class="fa fa-ban"></i>
                        Error!
                    </h5>
                    {{ $errors->first('error') }}
                </div>
            </div>
        @endif
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="card ">
                <div class="card-header">
                    <h3 class="card-title">Cargar Archivos</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body pb-0">
                    <form role="form" action="importarArchivos" method="post" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" type="radio" id="formatoRadio1" name="formato" value="1" checked>
                                        <label for="formatoRadio1" class="custom-control-label">CSV</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" type="radio" id="formatoRadio2" name="formato" value="2">
                                        <label for="formatoRadio2" class="custom-control-label">EXCEL</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" type="radio" id="tiposeparadorRadio1" name="tiposeparador" checked value=";">
                                        <label for="tiposeparadorRadio1" class="custom-control-label">;</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" type="radio" id="tiposeparadorRadio2" name="tiposeparador" value="," >
                                        <label for="tiposeparadorRadio2" class="custom-control-label">,</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" type="radio" id="tipodataRadio1" name="tipodata" value="1" checked ng-model="importar.tipodata">
                                        <label for="tipodataRadio1" class="custom-control-label">Emergencias</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" type="radio" id="tipodataRadio2" name="tipodata" value="2" ng-model="importar.tipodata">
                                        <label for="tipodataRadio2" class="custom-control-label">Hospitalizacion</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<div class="row">
                            <div class="col-lg-4 col-sm-12">
                                <div class="form-group">
                                    <div class="custom-control custom-radio">
                                        <input class="custom-control-input" type="radio" id="tipodataRadio4" name="tipodata" value="4" checked ng-model="importar.tipodata">
                                        <label for="tipodataRadio4" class="custom-control-label">CNV</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" ng-show="importar.tipodata == 1 || importar.tipodata == 4">
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Año:</label>
                                    <select style="width: 100%" class="form-control" name="anio" ng-required="importar.tipodata == 4">
                                        <option value="">---</option>
                                        <option ng-repeat="item in anios" value="@{{ item.anio }}">@{{ item.anio }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="form-group">
                                    <label>Mes:</label>
                                    <select style="width: 100%" class="form-control" name="mes" ng-required="importar.tipodata == 4">
                                        <option value="">---</option>
                                        <option ng-repeat="item in meses" value="@{{ item.mes }}">@{{ item.mes }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>-->
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Archivo:</label>
                                    <input type="file" class="form-control-file" required name="file" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <button type="submit" class="btn btn-block btn-secondary"><i class="fas fa-cloud-upload-alt"></i> Cargar</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /.card-body -->
            </div>
        </div>
    </div>
@endsection

@section('javascripts')
    @parent
    <script src="js/angular/controller/configuracion/importarController.js"></script>
    <script>
        $(function () {
            //
        });
    </script>
@endsection