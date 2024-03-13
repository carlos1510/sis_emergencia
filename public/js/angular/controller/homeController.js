/**
 * Created by carlo on 1/09/2018.
 */

app.controller('homeController', function ($scope,$timeout, accesorioService, DTOptionsBuilder){
    $scope.reporte = {};
    $scope.cantidad = {};

    var multipleLineChart = document.getElementById('multipleLineChart').getContext('2d');
    var barChart = document.getElementById('barChart').getContext('2d');
    var pieChart = document.getElementById('pieChart').getContext('2d');

    $scope.reporteGrafico = function () {
        $scope.reporte = {};
        $scope.reporte.total_urgencia = 0;
        $scope.reporte.total_emergencia = 0;
        $scope.reporte.total_tratamiento = 0;
        accesorioService.getReporteInicio({}).success(function (data) {
            for (var i = 0; i < data.data_total_u_e.length; i++){
                if (data.data_total_u_e[i].tipo_actividad == 'U'){
                    $scope.reporte.total_urgencia = data.data_total_u_e[i].total;
                }else {
                    if (data.data_total_u_e[i].tipo_actividad == 'E'){
                        $scope.reporte.total_emergencia = data.data_total_u_e[i].total;
                    }
                }
            }
            $scope.reporte.total_tratamiento = data.data_total_tratamiento;

            if ( data.data_total_u_e_dia_g1.length > 0 ){
                $scope.graficoMultiLine(data.data_total_u_e_dia_g1);
            }

            if ( data.data_total_u_e_anio_g2.length > 0 ){
                $scope.graficoPieChar(data.data_total_u_e_anio_g2);
            }

            if ( data.data_total_u_e_anio_g3.length > 0 ){
                $scope.graficoBarchar(data.data_total_u_e_anio_g3);
            }
        })
    }

    $scope.graficoBarchar = function (data) {
        var labels = [];
        var data_emergencia = [];
        var data_urgencia = [];
        var j = 0;
        var k = 0;
        for(var i=0; i<data.length; i++){
            if (data[i].mes == 1){
                labels[i] = "Ene";
                data_urgencia[i] = data[i].total_urgencia;
                data_emergencia[i] = data[i].total_emergencia;
            }else {
                if (data[i].mes == 2){
                    labels[i] = "Feb";
                    data_urgencia[i] = data[i].total_urgencia;
                    data_emergencia[i] = data[i].total_emergencia;
                }else {
                    if (data[i].mes == 3){
                        labels[i] = "Mar";
                        data_urgencia[i] = data[i].total_urgencia;
                        data_emergencia[i] = data[i].total_emergencia;
                    }else {
                        if (data[i].mes == 4){
                            labels[i] = "Abr";
                            data_urgencia[i] = data[i].total_urgencia;
                            data_emergencia[i] = data[i].total_emergencia;
                        }else {
                            if (data[i].mes == 5){
                                labels[i] = "May";
                                data_urgencia[i] = data[i].total_urgencia;
                                data_emergencia[i] = data[i].total_emergencia;
                            }else {
                                if (data[i].mes == 6){
                                    labels[i] = "Jun";
                                    data_urgencia[i] = data[i].total_urgencia;
                                    data_emergencia[i] = data[i].total_emergencia;
                                }else {
                                    if (data[i].mes == 7){
                                        labels[i] = "Jul";
                                        data_urgencia[i] = data[i].total_urgencia;
                                        data_emergencia[i] = data[i].total_emergencia;
                                    }else {
                                        if (data[i].mes == 8){
                                            labels[i] = "Ago";
                                            data_urgencia[i] = data[i].total_urgencia;
                                            data_emergencia[i] = data[i].total_emergencia;
                                        }else {
                                            if (data[i].mes == 9){
                                                labels[i] = "Set";
                                                data_urgencia[i] = data[i].total_urgencia;
                                                data_emergencia[i] = data[i].total_emergencia;
                                            }else {
                                                if (data[i].mes == 10){
                                                    labels[i] = "Oct";
                                                    data_urgencia[i] = data[i].total_urgencia;
                                                    data_emergencia[i] = data[i].total_emergencia;
                                                }else {
                                                    if (data[i].mes == 11){
                                                        labels[i] = "Nov";
                                                        data_urgencia[i] = data[i].total_urgencia;
                                                        data_emergencia[i] = data[i].total_emergencia;
                                                    }else {
                                                        if (data[i].mes == 12){
                                                            labels[i] = "Dic";
                                                            data_urgencia[i] = data[i].total_urgencia;
                                                            data_emergencia[i] = data[i].total_emergencia;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        var myBarChart = new Chart(barChart, {
            type: 'bar',
            data: {
                labels: labels,
                datasets : [{
                    label: "Urgencias",
                    backgroundColor: 'rgb(23, 125, 255)',
                    borderColor: 'rgb(23, 125, 255)',
                    data: data_urgencia,
                },
                {
                    label: "Emergencias",
                    backgroundColor: 'rgb(243, 84, 93)',
                    borderColor: 'rgb(243, 84, 93)',
                    data: data_emergencia,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
            }
        });
    }

    $scope.graficoPieChar = function (data) {
        var datos = [];
        for(var i=0; i<data.length; i++){
            if (data[i].tipo_actividad == 'U'){
                datos[0] = data[i].total;
            }
            if (data[i].tipo_actividad == 'E'){
                datos[1] = data[i].total;
            }
        }
        var myPieChart = new Chart(pieChart, {
            type: 'pie',
            data: {
                datasets: [{
                    data: datos,
                    backgroundColor :["#1d7af3","#f3545d"],
                    borderWidth: 0
                }],
                labels: ['Urgencias', 'Emergencias']
            },
            options : {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position : 'bottom',
                    labels : {
                        fontColor: 'rgb(154, 154, 154)',
                        fontSize: 11,
                        usePointStyle : true,
                        padding: 20
                    }
                },
                pieceLabel: {
                    render: 'percentage',
                    fontColor: 'white',
                    fontSize: 14,
                },
                tooltips: false,
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 20
                    }
                }
            }
        })
    }

    $scope.graficoMultiLine = function (data) {
        var labels = [];
        var data_emergencia = [];
        var data_urgencia = [];
        var j = 0;
        var k = 0;
        for(var i=0; i<data.length; i++){
            labels[i] = data[i].fecha;
            data_urgencia[i] = data[i].total_urgencia;
            data_emergencia[i] = data[i].total_emergencia;
        }
        var myMultipleLineChart = new Chart(multipleLineChart, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Urgencias",
                    borderColor: "#1d7af3",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#1d7af3",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    backgroundColor: 'transparent',
                    fill: true,
                    borderWidth: 2,
                    data: data_urgencia
                }, {
                    label: "Emergencias",
                    borderColor: "#f3545d",
                    pointBorderColor: "#FFF",
                    pointBackgroundColor: "#f3545d",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 1,
                    pointRadius: 4,
                    backgroundColor: 'transparent',
                    fill: true,
                    borderWidth: 2,
                    data: data_emergencia
                }]
            },
            options : {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'top',
                },
                tooltips: {
                    bodySpacing: 4,
                    mode:"nearest",
                    intersect: 0,
                    position:"nearest",
                    xPadding:10,
                    yPadding:10,
                    caretPadding:10
                },
                layout:{
                    padding:{left:15,right:15,top:15,bottom:15}
                }
            }
        });
    }

    $scope.reporteGrafico();

});
