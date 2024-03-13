/**
 * Created by User on 18/11/2021.
 */

app.controller('registroDiarioController', function ($scope,$timeout,homeService, DTOptionsBuilder){
    $scope.totales = {};
    $scope.cantidad = {};
    $scope.filtro = {};

    $scope.inicio = function () {
        var fecha = new Date();
        $scope.filtro.fecha_inicio = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();
        $scope.filtro.fecha_final = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();
        $scope.filtro.tipo_servicio = 'EMERGENCIA';
        $scope.filtro.tipo_profesional = 'ENFERMERO_OBSTETRIZ';
        $timeout(function () {
            $("#cmbProfesionalBuscar").val("").change();
        }, 0);
    }

    $scope.inicio();

});

