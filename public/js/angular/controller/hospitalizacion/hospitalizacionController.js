/**
 * Created by user on 22/04/2021.
 */
app.controller('hospitalizacionController', function ($scope,$timeout,DTOptionsBuilder, accesorioService){
    $scope.anios = [];
    $scope.meses = [];
    $scope.procesamiento = {};
    $scope.procesamiento.tipo_operacion = 1;
    $scope.procesamiento.operacion = 1;
    $scope.procesamiento.anio_mes = 1;

    $scope.cambiarTipoOperacion = function (opcion) {
        $scope.procesamiento.operacion = opcion;
    }

    $scope.cambiarOperacion = function (opcion) {
        $scope.procesamiento.anio_mes = opcion;
    }

    $scope.procesarAtencionGestante = function () {
        accesorioService.procesarAtencionesGestante($scope.procesamiento).success(function (data) {
            if (data.confirm){
                alertify.success("Se realizo Exitosamente la Operacion");
            }else{
                alertify.success("Error");
            }
        });
    }

    $scope.procesarPlanificacionFamiliar = function () {
        accesorioService.procesarDataPlanificacionFamiliar($scope.procesamiento).success(function (data) {
            if (data.confirm){
                alertify.success("Se realizo Exitosamente la Operacion");
            }else{
                alertify.success("Error");
            }
        });
    }

    $scope.procesarSaludMental = function () {
        accesorioService.procesarDataSaludMental($scope.procesamiento).success(function (data) {
            if (data.confirm){
                alertify.success("Se realizo Exitosamente la Operacion");
            }else{
                alertify.success("Error");
            }
        });
    }

    $scope.limpiarAtencionesMaterno = function () {
        accesorioService.limpiarAtencionesGestante($scope.procesamiento).success(function (data) {
            if (data.confirm){
                alertify.success("Se realizo Exitosamente la Operacion");
            }else{
                alertify.success("Error");
            }
        });
    }

    $scope.generarAnio = function () {
        var fecha = new Date();
        var anio = fecha.getFullYear();
        for(var i=anio; i>=2019; i--){
            $scope.anios.push({anio:i});
        }
    }

    $scope.generarMeses = function () {
        for (var i=1 ; i<=12 ; i++){
            $scope.meses.push({mes:i});
        }
    }

    $scope.generarAnio();
    $scope.generarMeses();
});

