/**
 * Created by User on 18/11/2021.
 */

app.controller('reporteNominalEmergenciaController', function ($scope,$timeout, accesorioService, DTOptionsBuilder){
    $scope.totales = {};
    $scope.cantidad = {};
    $scope.filtro = {};
    $scope.lista_establecimientos = [];

    $scope.listarEstablecimientosRegistros = function () {
        accesorioService.listarEstablecimientosAtencion({}).success(function (data) {
            $scope.lista_establecimientos = data;
        });
    }

    $scope.inicio = function () {
        var fecha = new Date();
        $scope.filtro.fecha_inicio = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();
        $scope.filtro.fecha_final = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();

        $timeout(function () {
            $("#cmbCod_2000Buscar").val("").change();
        }, 0);
    }

    $scope.inicio();
    $scope.listarEstablecimientosRegistros();

});

