/**
 * Created by carlo on 1/09/2018.
 */

app.controller('importarController', function ($scope,$timeout,DTOptionsBuilder){
    $scope.anios = [];
    $scope.meses = [];
    $scope.importar = {};
    $scope.importar.tipodata = 1;

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
