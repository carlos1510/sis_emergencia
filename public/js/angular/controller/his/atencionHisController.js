/**
 * Created by User on 18/11/2021.
 */

app.controller('atencionHisController', function ($scope,$timeout, accesorioService, DTOptionsBuilder){
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

    $scope.imprimirHis = function () {
        var date = new Date();
        var pdf = new jsPDF("p","mm","a4");
        //CABECERA
        pdf.setFontSize(5);
        pdf.text('LOTE', 5, 10); pdf.rect(20, 7, 15, 5, 'S');
        pdf.text('PAGINA', 5, 16); pdf.rect(20, 13, 15, 5, 'S');
        pdf.text('FECHA PROCES.', 5, 22); pdf.rect(23, 19, 20, 5, 'S');
        pdf.text('DNI DIGITADOR', 5, 28); pdf.rect(23, 25, 20, 5, 'S');

        pdf.setFontSize(12);
        pdf.setFont('Verdana','bold');
        pdf.text('MINISTERIO DE SALUD', 75, 13);
        pdf.setFontSize(9);
        pdf.setFont('Verdana','normal');
        pdf.text('OFICINA GENERAL DE TECNOLOGIAS DE LA INFORMACION', 50, 19);
        pdf.text('OFICINA DE GESTION DE LA INFORMACION', 60, 25);
        pdf.text('REGISTRO DIARIO DE ATENCION Y OTRAS ACTIVIDADES DE SALUD', 48, 31);

        pdf.setFontSize(5);
        pdf.rect(162, 7, 43, 16, 'S'); pdf.text('FIRMA Y SELLO RESPONSABLE HIS', 167, 10);
        pdf.setFontSize(7);
        pdf.rect(170, 23, 5, 5, 'S'); pdf.text('1', 172, 26);
        pdf.rect(175, 23, 30, 5, 'S'); pdf.text('TURNO', 185, 26);
        pdf.rect(170, 28, 12, 5, 'S'); pdf.text('M', 174, 32);
        pdf.rect(182, 28, 11, 5, 'S'); pdf.text('T', 186, 32);
        pdf.rect(193, 28, 12, 5, 'S'); pdf.text('N', 198, 32);
        // FIN DE CABECERA

        //INICIO DE CONTENIDO
        // linea 1
        pdf.setFontSize(5);
        pdf.rect(5, 33, 5, 5, 'S'); pdf.text('2', 6, 36);
        pdf.rect(10, 33, 7, 5, 'S'); pdf.text('AÑO', 12, 36);
        pdf.rect(17, 33, 2, 5, 'S'); pdf.text('3', 17.5, 36);
        pdf.rect(19, 33, 19, 5, 'S'); pdf.text('MES', 26, 36);
        pdf.rect(38, 33, 2, 5, 'S'); pdf.text('4', 38.5, 36);
        pdf.rect(40, 33, 52, 5, 'S'); pdf.text('NOMBRE DE ESTABLECIMIENTO DE SALUD (IPRESS)', 41, 36);
        pdf.rect(92, 33, 2, 5, 'S'); pdf.text('5', 92.5, 36);
        pdf.rect(94, 33, 64, 5, 'S'); pdf.text('UNIDAD PRODUCTORA DE SERVICIOS (UPS)', 95, 36);
        pdf.rect(158, 33, 3, 5, 'S'); pdf.text('6', 159, 36);
        pdf.rect(161, 33, 44, 5, 'S'); pdf.text('NOMBRE DEL RESPONSABLE DE ATENCIÓN', 162, 36);

        // linea 2
        pdf.rect(5, 38, 12, 7, 'S'); pdf.text('', 6, 39);
        pdf.rect(17, 38, 21, 7, 'S'); pdf.text('', 18, 39);
        pdf.rect(38, 38, 54, 7, 'S'); pdf.text('', 40, 39);
        pdf.rect(92, 38, 66, 7, 'S'); pdf.text('', 68, 39);
        pdf.rect(158, 38, 3, 7, 'S'); pdf.text('', 159, 39);
        pdf.rect(161, 38, 19, 7, 'S'); pdf.text('', 162, 39);
        pdf.rect(180, 38, 25, 7, 'S'); pdf.text('', 183, 39);

        // linea 3
        pdf.rect(5, 45, 12, 4, 'S'); pdf.text('7', 11, 48);
        pdf.rect(17, 45, 21, 4, 'S'); pdf.text('8', 26, 48);
        pdf.rect(38, 45, 7, 4, 'S'); pdf.text('9', 40, 48);
        pdf.rect(45, 45, 21, 4, 'S'); pdf.text('11', 50, 48);
        pdf.rect(66, 45, 10, 4, 'S'); pdf.text('13', 70, 48);
        pdf.rect(76, 45, 6, 4, 'S'); pdf.text('14', 77, 48);
        pdf.rect(82, 45, 10, 4, 'S'); pdf.text('15', 86, 48);
        pdf.rect(92, 45, 12, 4, 'S'); pdf.text('16', 98, 48);
        pdf.rect(104, 45, 5, 4, 'S'); pdf.text('17', 106, 48);
        pdf.rect(109, 45, 5, 4, 'S'); pdf.text('18', 110, 48);
        pdf.rect(114, 45, 47, 4, 'S'); pdf.text('19', 135, 48);
        pdf.rect(161, 45, 12, 4, 'S'); pdf.text('20', 165, 48);
        pdf.rect(173, 45, 12, 4, 'S'); pdf.text('21', 177, 48);
        pdf.rect(185, 45, 20, 4, 'S'); pdf.text('22', 193, 48);

        // linea 4
        pdf.rect(5, 49, 12, 12, 'S'); pdf.text('DIA', 10, 55);
        pdf.rect(17, 49, 21, 4, 'S'); pdf.text('D.N.I.', 25, 52);
        pdf.rect(17, 53, 21, 4, 'S'); pdf.text('HISTORIA CLINICA', 18, 56);
        pdf.rect(17, 57, 21, 4, 'S'); pdf.text('GESTANTE/PUERPERA', 18, 60);
        pdf.rect(38, 49, 7, 4, 'S'); pdf.text('FINANC.', 38.2, 52);
        pdf.rect(38, 53, 7, 4, 'S'); pdf.text('10', 40, 56);
        pdf.rect(38, 57, 7, 4, 'S'); pdf.text('ETNIA', 39, 60);
        pdf.setFontSize(4);
        pdf.rect(45, 49, 21, 4, 'S'); pdf.text('DISTRITO DE PROCEDENCIA', 45.5, 52);
        pdf.setFontSize(5);
        pdf.rect(45, 53, 21, 4, 'S'); pdf.text('12', 53, 56);
        pdf.rect(45, 57, 21, 4, 'S'); pdf.text('CENTRO POBLADO', 46, 60);
        pdf.rect(66, 49, 10, 12, 'S'); pdf.text('EDAD', 68, 55);
        pdf.rect(76, 49, 6, 12, 'S'); pdf.text('SEXO', 76.5, 55);
        pdf.setFontSize(4);
        pdf.rect(82, 49, 10, 12, 'S'); pdf.text('PERIMETRO', 82.5, 52); pdf.text('CEFALICO Y', 82.5, 56); pdf.text('ABDOMINAL', 82.5, 60);
        pdf.rect(92, 49, 12, 12, 'S'); pdf.text('EVALUACION', 93, 52); pdf.setFontSize(3.5); pdf.text('ANTROPOMETRICA', 92.3, 56); pdf.setFontSize(4); pdf.text('HEMOGLOBINA', 93, 60);
        pdf.setFontSize(4);
        pdf.rect(104, 49, 5, 12, 'S'); pdf.text('ESTA-', 104.5, 52); pdf.text('BLEC', 104.7, 56);
        pdf.rect(109, 49, 5, 12, 'S'); pdf.text('SER-', 109.5, 52); pdf.text('VICIO', 109.7, 56);
        pdf.setFontSize(5);
        pdf.rect(114, 49, 47, 12, 'S'); pdf.text('DIAGNOSTICO MOTIVO DE CONSULTA', 122, 52); pdf.text('Y/O ACTIVIDAD DE SALUD', 125, 56);
        pdf.rect(161, 49, 12, 8, 'S'); pdf.text('TIPO DE', 163.5, 52); pdf.setFontSize(4.5); pdf.text('DIAGNOSTICO', 162, 55);
        pdf.setFontSize(5);
        pdf.rect(161, 57, 4, 4, 'S');pdf.text('P', 162.5, 60);
        pdf.rect(165, 57, 4, 4, 'S');pdf.text('D', 166.5, 60);
        pdf.rect(169, 57, 4, 4, 'S');pdf.text('R', 170.5, 60);
        pdf.rect(173, 49, 12, 8, 'S'); pdf.text('VALOR', 175.5, 52); pdf.text('LAB', 175, 55);
        pdf.rect(173, 57, 4, 4, 'S');pdf.text('1°', 174.5, 60);
        pdf.rect(177, 57, 4, 4, 'S');pdf.text('2°', 178.5, 60);
        pdf.rect(181, 57, 4, 4, 'S');pdf.text('3°', 182.5, 60);
        pdf.rect(185, 49, 20, 12, 'S'); pdf.text('CÓDIGO', 191, 52); pdf.text('CIE / CPT', 191, 55);

        // linea 5
        pdf.rect(5, 61, 5, 20, 'S');pdf.text('1', 6.5, 63.5);
        pdf.rect(10, 61, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 63.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 63.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 63.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 67.5);
        pdf.rect(10, 69, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 69, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 73, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 77, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 69, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 75, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 69, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 75, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 69, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 69, 5, 4, 'S'); pdf.text('A', 73, 71.5);
        pdf.rect(71, 73, 5, 4, 'S'); pdf.text('M', 73, 75.5);
        pdf.rect(71, 77, 5, 4, 'S'); pdf.text('D', 73, 79.5);
        pdf.rect(76, 69, 6, 6, 'S'); pdf.text('M', 78, 72.5);
        pdf.rect(76, 75, 6, 6, 'S'); pdf.text('F', 78, 78.5);
        pdf.rect(82, 69, 5, 6, 'S'); pdf.text('PC', 83, 72.5);
        pdf.rect(82, 75, 5, 6, 'S'); pdf.text('Pab', 83, 78.5);
        pdf.rect(87, 69, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 75, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 69, 6, 4, 'S'); pdf.text('PESO', 92.5, 71.5);
        pdf.rect(92, 73, 6, 4, 'S'); pdf.text('TALLA', 92.3, 75.5);
        pdf.rect(92, 77, 6, 4, 'S'); pdf.text('Hb', 94, 79.5);
        pdf.rect(98, 69, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 73, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 77, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 69, 5, 4, 'S'); pdf.text('N', 105.5, 71.5);
        pdf.rect(104, 73, 5, 4, 'S'); pdf.text('C', 105.5, 75.5);
        pdf.rect(104, 77, 5, 4, 'S'); pdf.text('R', 105.5, 79.5);
        pdf.rect(109, 69, 5, 4, 'S'); pdf.text('N', 111, 71.5);
        pdf.rect(109, 73, 5, 4, 'S'); pdf.text('C', 111, 75.5);
        pdf.rect(109, 77, 5, 4, 'S'); pdf.text('R', 111, 79.5);
        pdf.rect(114, 69, 47, 4, 'S'); pdf.text('1', 114.5, 71.5);
        pdf.rect(114, 73, 47, 4, 'S'); pdf.text('2', 114.5, 75.5);
        pdf.rect(114, 77, 47, 4, 'S'); pdf.text('3', 114.5, 79.5);
        pdf.rect(161, 69, 4, 4, 'S'); pdf.text('P', 162.5, 71.5);
        pdf.rect(161, 73, 4, 4, 'S'); pdf.text('P', 162.5, 75.5);
        pdf.rect(161, 77, 4, 4, 'S'); pdf.text('P', 162.5, 79.5);
        pdf.rect(165, 69, 4, 4, 'S'); pdf.text('D', 166.5, 71.5);
        pdf.rect(165, 73, 4, 4, 'S'); pdf.text('D', 166.5, 75.5);
        pdf.rect(165, 77, 4, 4, 'S'); pdf.text('D', 166.5, 79.5);
        pdf.rect(169, 69, 4, 4, 'S'); pdf.text('R', 170.5, 71.5);
        pdf.rect(169, 73, 4, 4, 'S'); pdf.text('R', 170.5, 75.5);
        pdf.rect(169, 77, 4, 4, 'S'); pdf.text('R', 170.5, 79.5);
        pdf.rect(173, 69, 4, 4, 'S'); pdf.text('', 174.5, 71.5);
        pdf.rect(173, 73, 4, 4, 'S'); pdf.text('', 174.5, 75.5);
        pdf.rect(173, 77, 4, 4, 'S'); pdf.text('', 174.5, 79.5);
        pdf.rect(177, 69, 4, 4, 'S'); pdf.text('', 178.5, 71.5);
        pdf.rect(177, 73, 4, 4, 'S'); pdf.text('', 178.5, 75.5);
        pdf.rect(177, 77, 4, 4, 'S'); pdf.text('', 178.5, 79.5);
        pdf.rect(181, 69, 4, 4, 'S'); pdf.text('', 182.5, 71.5);
        pdf.rect(181, 73, 4, 4, 'S'); pdf.text('', 182.5, 75.5);
        pdf.rect(181, 77, 4, 4, 'S'); pdf.text('', 182.5, 79.5);
        pdf.rect(185, 69, 20, 4, 'S'); pdf.text('', 186.5, 71.5);
        pdf.rect(185, 73, 20, 4, 'S'); pdf.text('', 186.5, 75.5);
        pdf.rect(185, 77, 20, 4, 'S'); pdf.text('', 186.5, 79.5);

        // linea 6
        pdf.rect(5, 81, 5, 20, 'S'); pdf.text('2', 6.5, 83);
        pdf.rect(10, 81, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 84.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 84.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 84.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 87.5);
        pdf.rect(10, 89, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 89, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 93, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 97, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 89, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 95, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 89, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 95, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 89, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 89, 5, 4, 'S'); pdf.text('A', 73, 91.5);
        pdf.rect(71, 93, 5, 4, 'S'); pdf.text('M', 73, 95.5);
        pdf.rect(71, 97, 5, 4, 'S'); pdf.text('D', 73, 99.5);
        pdf.rect(76, 89, 6, 6, 'S'); pdf.text('M', 78, 92.5);
        pdf.rect(76, 95, 6, 6, 'S'); pdf.text('F', 78, 98.5);
        pdf.rect(82, 89, 5, 6, 'S'); pdf.text('PC', 83, 92.5);
        pdf.rect(82, 95, 5, 6, 'S'); pdf.text('Pab', 83, 98.5);
        pdf.rect(87, 89, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 95, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 89, 6, 4, 'S'); pdf.text('PESO', 92.5, 91.5);
        pdf.rect(92, 93, 6, 4, 'S'); pdf.text('TALLA', 92.3, 95.5);
        pdf.rect(92, 97, 6, 4, 'S'); pdf.text('Hb', 94, 99.5);
        pdf.rect(98, 89, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 93, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 97, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 89, 5, 4, 'S'); pdf.text('N', 105.5, 91.5);
        pdf.rect(104, 93, 5, 4, 'S'); pdf.text('C', 105.5, 95.5);
        pdf.rect(104, 97, 5, 4, 'S'); pdf.text('R', 105.5, 99.5);
        pdf.rect(109, 89, 5, 4, 'S'); pdf.text('N', 111, 91.5);
        pdf.rect(109, 93, 5, 4, 'S'); pdf.text('C', 111, 95.5);
        pdf.rect(109, 97, 5, 4, 'S'); pdf.text('R', 111, 99.5);
        pdf.rect(114, 89, 47, 4, 'S'); pdf.text('1', 114.5, 91.5);
        pdf.rect(114, 93, 47, 4, 'S'); pdf.text('2', 114.5, 95.5);
        pdf.rect(114, 97, 47, 4, 'S'); pdf.text('3', 114.5, 99.5);
        pdf.rect(161, 89, 4, 4, 'S'); pdf.text('P', 162.5, 91.5);
        pdf.rect(161, 93, 4, 4, 'S'); pdf.text('P', 162.5, 95.5);
        pdf.rect(161, 97, 4, 4, 'S'); pdf.text('P', 162.5, 99.5);
        pdf.rect(165, 89, 4, 4, 'S'); pdf.text('D', 166.5, 91.5);
        pdf.rect(165, 93, 4, 4, 'S'); pdf.text('D', 166.5, 95.5);
        pdf.rect(165, 97, 4, 4, 'S'); pdf.text('D', 166.5, 99.5);
        pdf.rect(169, 89, 4, 4, 'S'); pdf.text('R', 170.5, 91.5);
        pdf.rect(169, 93, 4, 4, 'S'); pdf.text('R', 170.5, 95.5);
        pdf.rect(169, 97, 4, 4, 'S'); pdf.text('R', 170.5, 99.5);
        pdf.rect(173, 89, 4, 4, 'S'); pdf.text('', 174.5, 91.5);
        pdf.rect(173, 93, 4, 4, 'S'); pdf.text('', 174.5, 95.5);
        pdf.rect(173, 97, 4, 4, 'S'); pdf.text('', 174.5, 99.5);
        pdf.rect(177, 89, 4, 4, 'S'); pdf.text('', 178.5, 91.5);
        pdf.rect(177, 93, 4, 4, 'S'); pdf.text('', 178.5, 95.5);
        pdf.rect(177, 97, 4, 4, 'S'); pdf.text('', 178.5, 99.5);
        pdf.rect(181, 89, 4, 4, 'S'); pdf.text('', 182.5, 91.5);
        pdf.rect(181, 93, 4, 4, 'S'); pdf.text('', 182.5, 95.5);
        pdf.rect(181, 97, 4, 4, 'S'); pdf.text('', 182.5, 99.5);
        pdf.rect(185, 89, 20, 4, 'S'); pdf.text('', 186.5, 91.5);
        pdf.rect(185, 93, 20, 4, 'S'); pdf.text('', 186.5, 95.5);
        pdf.rect(185, 97, 20, 4, 'S'); pdf.text('', 186.5, 99.5);

        // linea 7
        pdf.rect(5, 101, 5, 20, 'S'); pdf.text('3', 6.5, 103);

        pdf.rect(10, 101, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 104.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 104.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 104.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 107.5);
        pdf.rect(10, 109, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 109, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 113, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 117, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 109, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 115, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 109, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 115, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 109, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 109, 5, 4, 'S'); pdf.text('A', 73, 111.5);
        pdf.rect(71, 113, 5, 4, 'S'); pdf.text('M', 73, 115.5);
        pdf.rect(71, 117, 5, 4, 'S'); pdf.text('D', 73, 119.5);
        pdf.rect(76, 109, 6, 6, 'S'); pdf.text('M', 78, 112.5);
        pdf.rect(76, 115, 6, 6, 'S'); pdf.text('F', 78, 118.5);
        pdf.rect(82, 109, 5, 6, 'S'); pdf.text('PC', 83, 112.5);
        pdf.rect(82, 115, 5, 6, 'S'); pdf.text('Pab', 83, 118.5);
        pdf.rect(87, 109, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 115, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 109, 6, 4, 'S'); pdf.text('PESO', 92.5, 111.5);
        pdf.rect(92, 113, 6, 4, 'S'); pdf.text('TALLA', 92.3, 115.5);
        pdf.rect(92, 117, 6, 4, 'S'); pdf.text('Hb', 94, 119.5);
        pdf.rect(98, 109, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 113, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 117, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 109, 5, 4, 'S'); pdf.text('N', 105.5, 111.5);
        pdf.rect(104, 113, 5, 4, 'S'); pdf.text('C', 105.5, 115.5);
        pdf.rect(104, 117, 5, 4, 'S'); pdf.text('R', 105.5, 119.5);
        pdf.rect(109, 109, 5, 4, 'S'); pdf.text('N', 111, 111.5);
        pdf.rect(109, 113, 5, 4, 'S'); pdf.text('C', 111, 115.5);
        pdf.rect(109, 117, 5, 4, 'S'); pdf.text('R', 111, 119.5);
        pdf.rect(114, 109, 47, 4, 'S'); pdf.text('1', 114.5, 111.5);
        pdf.rect(114, 113, 47, 4, 'S'); pdf.text('2', 114.5, 115.5);
        pdf.rect(114, 117, 47, 4, 'S'); pdf.text('3', 114.5, 119.5);
        pdf.rect(161, 109, 4, 4, 'S'); pdf.text('P', 162.5, 111.5);
        pdf.rect(161, 113, 4, 4, 'S'); pdf.text('P', 162.5, 115.5);
        pdf.rect(161, 117, 4, 4, 'S'); pdf.text('P', 162.5, 119.5);
        pdf.rect(165, 109, 4, 4, 'S'); pdf.text('D', 166.5, 111.5);
        pdf.rect(165, 113, 4, 4, 'S'); pdf.text('D', 166.5, 115.5);
        pdf.rect(165, 117, 4, 4, 'S'); pdf.text('D', 166.5, 119.5);
        pdf.rect(169, 109, 4, 4, 'S'); pdf.text('R', 170.5, 111.5);
        pdf.rect(169, 113, 4, 4, 'S'); pdf.text('R', 170.5, 115.5);
        pdf.rect(169, 117, 4, 4, 'S'); pdf.text('R', 170.5, 119.5);
        pdf.rect(173, 109, 4, 4, 'S'); pdf.text('', 174.5, 111.5);
        pdf.rect(173, 113, 4, 4, 'S'); pdf.text('', 174.5, 115.5);
        pdf.rect(173, 117, 4, 4, 'S'); pdf.text('', 174.5, 119.5);
        pdf.rect(177, 109, 4, 4, 'S'); pdf.text('', 178.5, 111.5);
        pdf.rect(177, 113, 4, 4, 'S'); pdf.text('', 178.5, 115.5);
        pdf.rect(177, 117, 4, 4, 'S'); pdf.text('', 178.5, 119.5);
        pdf.rect(181, 109, 4, 4, 'S'); pdf.text('', 182.5, 111.5);
        pdf.rect(181, 113, 4, 4, 'S'); pdf.text('', 182.5, 115.5);
        pdf.rect(181, 117, 4, 4, 'S'); pdf.text('', 182.5, 119.5);
        pdf.rect(185, 109, 20, 4, 'S'); pdf.text('', 186.5, 111.5);
        pdf.rect(185, 113, 20, 4, 'S'); pdf.text('', 186.5, 115.5);
        pdf.rect(185, 117, 20, 4, 'S'); pdf.text('', 186.5, 119.5);

        // linea 8
        pdf.rect(5, 121, 5, 20, 'S'); pdf.text('4', 6.5, 123);

        pdf.rect(10, 121, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 124.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 124.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 124.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 127.5);
        pdf.rect(10, 129, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 129, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 133, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 137, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 129, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 135, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 129, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 135, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 129, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 129, 5, 4, 'S'); pdf.text('A', 73, 131.5);
        pdf.rect(71, 133, 5, 4, 'S'); pdf.text('M', 73, 135.5);
        pdf.rect(71, 137, 5, 4, 'S'); pdf.text('D', 73, 139.5);
        pdf.rect(76, 129, 6, 6, 'S'); pdf.text('M', 78, 133.5);
        pdf.rect(76, 135, 6, 6, 'S'); pdf.text('F', 78, 138.5);
        pdf.rect(82, 129, 5, 6, 'S'); pdf.text('PC', 83, 133.5);
        pdf.rect(82, 135, 5, 6, 'S'); pdf.text('Pab', 83, 138.5);
        pdf.rect(87, 129, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 135, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 129, 6, 4, 'S'); pdf.text('PESO', 92.5, 131.5);
        pdf.rect(92, 133, 6, 4, 'S'); pdf.text('TALLA', 92.3, 135.5);
        pdf.rect(92, 137, 6, 4, 'S'); pdf.text('Hb', 94, 139.5);
        pdf.rect(98, 129, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 133, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 137, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 129, 5, 4, 'S'); pdf.text('N', 105.5, 131.5);
        pdf.rect(104, 133, 5, 4, 'S'); pdf.text('C', 105.5, 135.5);
        pdf.rect(104, 137, 5, 4, 'S'); pdf.text('R', 105.5, 139.5);
        pdf.rect(109, 129, 5, 4, 'S'); pdf.text('N', 111, 131.5);
        pdf.rect(109, 133, 5, 4, 'S'); pdf.text('C', 111, 135.5);
        pdf.rect(109, 137, 5, 4, 'S'); pdf.text('R', 111, 139.5);
        pdf.rect(114, 129, 47, 4, 'S'); pdf.text('1', 114.5, 131.5);
        pdf.rect(114, 133, 47, 4, 'S'); pdf.text('2', 114.5, 135.5);
        pdf.rect(114, 137, 47, 4, 'S'); pdf.text('3', 114.5, 139.5);
        pdf.rect(161, 129, 4, 4, 'S'); pdf.text('P', 162.5, 131.5);
        pdf.rect(161, 133, 4, 4, 'S'); pdf.text('P', 162.5, 135.5);
        pdf.rect(161, 137, 4, 4, 'S'); pdf.text('P', 162.5, 139.5);
        pdf.rect(165, 129, 4, 4, 'S'); pdf.text('D', 166.5, 131.5);
        pdf.rect(165, 133, 4, 4, 'S'); pdf.text('D', 166.5, 135.5);
        pdf.rect(165, 137, 4, 4, 'S'); pdf.text('D', 166.5, 139.5);
        pdf.rect(169, 129, 4, 4, 'S'); pdf.text('R', 170.5, 131.5);
        pdf.rect(169, 133, 4, 4, 'S'); pdf.text('R', 170.5, 135.5);
        pdf.rect(169, 137, 4, 4, 'S'); pdf.text('R', 170.5, 139.5);
        pdf.rect(173, 129, 4, 4, 'S'); pdf.text('', 174.5, 131.5);
        pdf.rect(173, 133, 4, 4, 'S'); pdf.text('', 174.5, 135.5);
        pdf.rect(173, 137, 4, 4, 'S'); pdf.text('', 174.5, 139.5);
        pdf.rect(177, 129, 4, 4, 'S'); pdf.text('', 178.5, 131.5);
        pdf.rect(177, 133, 4, 4, 'S'); pdf.text('', 178.5, 135.5);
        pdf.rect(177, 137, 4, 4, 'S'); pdf.text('', 178.5, 139.5);
        pdf.rect(181, 129, 4, 4, 'S'); pdf.text('', 182.5, 131.5);
        pdf.rect(181, 133, 4, 4, 'S'); pdf.text('', 182.5, 135.5);
        pdf.rect(181, 137, 4, 4, 'S'); pdf.text('', 182.5, 139.5);
        pdf.rect(185, 129, 20, 4, 'S'); pdf.text('', 186.5, 131.5);
        pdf.rect(185, 133, 20, 4, 'S'); pdf.text('', 186.5, 135.5);
        pdf.rect(185, 137, 20, 4, 'S'); pdf.text('', 186.5, 139.5);

        // linea 9
        pdf.rect(5, 141, 5, 20, 'S'); pdf.text('5', 6.5, 143);
        pdf.rect(10, 141, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 144.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 144.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 144.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 147.5);
        pdf.rect(10, 149, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 149, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 153, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 157, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 149, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 155, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 149, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 155, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 149, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 149, 5, 4, 'S'); pdf.text('A', 73, 151.5);
        pdf.rect(71, 153, 5, 4, 'S'); pdf.text('M', 73, 155.5);
        pdf.rect(71, 157, 5, 4, 'S'); pdf.text('D', 73, 159.5);
        pdf.rect(76, 149, 6, 6, 'S'); pdf.text('M', 78, 153.5);
        pdf.rect(76, 155, 6, 6, 'S'); pdf.text('F', 78, 158.5);
        pdf.rect(82, 149, 5, 6, 'S'); pdf.text('PC', 83, 153.5);
        pdf.rect(82, 155, 5, 6, 'S'); pdf.text('Pab', 83, 158.5);
        pdf.rect(87, 149, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 155, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 149, 6, 4, 'S'); pdf.text('PESO', 92.5, 151.5);
        pdf.rect(92, 153, 6, 4, 'S'); pdf.text('TALLA', 92.3, 155.5);
        pdf.rect(92, 157, 6, 4, 'S'); pdf.text('Hb', 94, 159.5);
        pdf.rect(98, 149, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 153, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 157, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 149, 5, 4, 'S'); pdf.text('N', 105.5, 151.5);
        pdf.rect(104, 153, 5, 4, 'S'); pdf.text('C', 105.5, 155.5);
        pdf.rect(104, 157, 5, 4, 'S'); pdf.text('R', 105.5, 159.5);
        pdf.rect(109, 149, 5, 4, 'S'); pdf.text('N', 111, 151.5);
        pdf.rect(109, 153, 5, 4, 'S'); pdf.text('C', 111, 155.5);
        pdf.rect(109, 157, 5, 4, 'S'); pdf.text('R', 111, 159.5);
        pdf.rect(114, 149, 47, 4, 'S'); pdf.text('1', 114.5, 151.5);
        pdf.rect(114, 153, 47, 4, 'S'); pdf.text('2', 114.5, 155.5);
        pdf.rect(114, 157, 47, 4, 'S'); pdf.text('3', 114.5, 159.5);
        pdf.rect(161, 149, 4, 4, 'S'); pdf.text('P', 162.5, 151.5);
        pdf.rect(161, 153, 4, 4, 'S'); pdf.text('P', 162.5, 155.5);
        pdf.rect(161, 157, 4, 4, 'S'); pdf.text('P', 162.5, 159.5);
        pdf.rect(165, 149, 4, 4, 'S'); pdf.text('D', 166.5, 151.5);
        pdf.rect(165, 153, 4, 4, 'S'); pdf.text('D', 166.5, 155.5);
        pdf.rect(165, 157, 4, 4, 'S'); pdf.text('D', 166.5, 159.5);
        pdf.rect(169, 149, 4, 4, 'S'); pdf.text('R', 170.5, 151.5);
        pdf.rect(169, 153, 4, 4, 'S'); pdf.text('R', 170.5, 155.5);
        pdf.rect(169, 157, 4, 4, 'S'); pdf.text('R', 170.5, 159.5);
        pdf.rect(173, 149, 4, 4, 'S'); pdf.text('', 174.5, 151.5);
        pdf.rect(173, 153, 4, 4, 'S'); pdf.text('', 174.5, 155.5);
        pdf.rect(173, 157, 4, 4, 'S'); pdf.text('', 174.5, 159.5);
        pdf.rect(177, 149, 4, 4, 'S'); pdf.text('', 178.5, 151.5);
        pdf.rect(177, 153, 4, 4, 'S'); pdf.text('', 178.5, 155.5);
        pdf.rect(177, 157, 4, 4, 'S'); pdf.text('', 178.5, 159.5);
        pdf.rect(181, 149, 4, 4, 'S'); pdf.text('', 182.5, 151.5);
        pdf.rect(181, 153, 4, 4, 'S'); pdf.text('', 182.5, 155.5);
        pdf.rect(181, 157, 4, 4, 'S'); pdf.text('', 182.5, 159.5);
        pdf.rect(185, 149, 20, 4, 'S'); pdf.text('', 186.5, 151.5);
        pdf.rect(185, 153, 20, 4, 'S'); pdf.text('', 186.5, 155.5);
        pdf.rect(185, 157, 20, 4, 'S'); pdf.text('', 186.5, 159.5);

        // linea 10
        pdf.rect(5, 161, 5, 20, 'S'); pdf.text('6', 6.5, 163);

        pdf.rect(10, 161, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 164.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 164.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 164.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 167.5);
        pdf.rect(10, 169, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 169, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 173, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 177, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 169, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 175, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 169, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 175, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 169, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 169, 5, 4, 'S'); pdf.text('A', 73, 171.5);
        pdf.rect(71, 173, 5, 4, 'S'); pdf.text('M', 73, 175.5);
        pdf.rect(71, 177, 5, 4, 'S'); pdf.text('D', 73, 179.5);
        pdf.rect(76, 169, 6, 6, 'S'); pdf.text('M', 78, 173.5);
        pdf.rect(76, 175, 6, 6, 'S'); pdf.text('F', 78, 178.5);
        pdf.rect(82, 169, 5, 6, 'S'); pdf.text('PC', 83, 173.5);
        pdf.rect(82, 175, 5, 6, 'S'); pdf.text('Pab', 83, 178.5);
        pdf.rect(87, 169, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 175, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 169, 6, 4, 'S'); pdf.text('PESO', 92.5, 171.5);
        pdf.rect(92, 173, 6, 4, 'S'); pdf.text('TALLA', 92.3, 175.5);
        pdf.rect(92, 177, 6, 4, 'S'); pdf.text('Hb', 94, 179.5);
        pdf.rect(98, 169, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 173, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 177, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 169, 5, 4, 'S'); pdf.text('N', 105.5, 171.5);
        pdf.rect(104, 173, 5, 4, 'S'); pdf.text('C', 105.5, 175.5);
        pdf.rect(104, 177, 5, 4, 'S'); pdf.text('R', 105.5, 179.5);
        pdf.rect(109, 169, 5, 4, 'S'); pdf.text('N', 111, 171.5);
        pdf.rect(109, 173, 5, 4, 'S'); pdf.text('C', 111, 175.5);
        pdf.rect(109, 177, 5, 4, 'S'); pdf.text('R', 111, 179.5);
        pdf.rect(114, 169, 47, 4, 'S'); pdf.text('1', 114.5, 171.5);
        pdf.rect(114, 173, 47, 4, 'S'); pdf.text('2', 114.5, 175.5);
        pdf.rect(114, 177, 47, 4, 'S'); pdf.text('3', 114.5, 179.5);
        pdf.rect(161, 169, 4, 4, 'S'); pdf.text('P', 162.5, 171.5);
        pdf.rect(161, 173, 4, 4, 'S'); pdf.text('P', 162.5, 175.5);
        pdf.rect(161, 177, 4, 4, 'S'); pdf.text('P', 162.5, 179.5);
        pdf.rect(165, 169, 4, 4, 'S'); pdf.text('D', 166.5, 171.5);
        pdf.rect(165, 173, 4, 4, 'S'); pdf.text('D', 166.5, 175.5);
        pdf.rect(165, 177, 4, 4, 'S'); pdf.text('D', 166.5, 179.5);
        pdf.rect(169, 169, 4, 4, 'S'); pdf.text('R', 170.5, 171.5);
        pdf.rect(169, 173, 4, 4, 'S'); pdf.text('R', 170.5, 175.5);
        pdf.rect(169, 177, 4, 4, 'S'); pdf.text('R', 170.5, 179.5);
        pdf.rect(173, 169, 4, 4, 'S'); pdf.text('', 174.5, 171.5);
        pdf.rect(173, 173, 4, 4, 'S'); pdf.text('', 174.5, 175.5);
        pdf.rect(173, 177, 4, 4, 'S'); pdf.text('', 174.5, 179.5);
        pdf.rect(177, 169, 4, 4, 'S'); pdf.text('', 178.5, 171.5);
        pdf.rect(177, 173, 4, 4, 'S'); pdf.text('', 178.5, 175.5);
        pdf.rect(177, 177, 4, 4, 'S'); pdf.text('', 178.5, 179.5);
        pdf.rect(181, 169, 4, 4, 'S'); pdf.text('', 182.5, 171.5);
        pdf.rect(181, 173, 4, 4, 'S'); pdf.text('', 182.5, 175.5);
        pdf.rect(181, 177, 4, 4, 'S'); pdf.text('', 182.5, 179.5);
        pdf.rect(185, 169, 20, 4, 'S'); pdf.text('', 186.5, 171.5);
        pdf.rect(185, 173, 20, 4, 'S'); pdf.text('', 186.5, 175.5);
        pdf.rect(185, 177, 20, 4, 'S'); pdf.text('', 186.5, 179.5);

        // linea 11
        pdf.rect(5, 181, 5, 20, 'S'); pdf.text('7', 6.5, 183);

        pdf.rect(10, 181, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 184.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 184.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 184.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 187.5);
        pdf.rect(10, 189, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 189, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 193, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 197, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 189, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 195, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 189, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 195, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 189, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 189, 5, 4, 'S'); pdf.text('A', 73, 191.5);
        pdf.rect(71, 193, 5, 4, 'S'); pdf.text('M', 73, 195.5);
        pdf.rect(71, 197, 5, 4, 'S'); pdf.text('D', 73, 199.5);
        pdf.rect(76, 189, 6, 6, 'S'); pdf.text('M', 78, 193.5);
        pdf.rect(76, 195, 6, 6, 'S'); pdf.text('F', 78, 198.5);
        pdf.rect(82, 189, 5, 6, 'S'); pdf.text('PC', 83, 193.5);
        pdf.rect(82, 195, 5, 6, 'S'); pdf.text('Pab', 83, 198.5);
        pdf.rect(87, 189, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 195, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 189, 6, 4, 'S'); pdf.text('PESO', 92.5, 191.5);
        pdf.rect(92, 193, 6, 4, 'S'); pdf.text('TALLA', 92.3, 195.5);
        pdf.rect(92, 197, 6, 4, 'S'); pdf.text('Hb', 94, 199.5);
        pdf.rect(98, 189, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 193, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 197, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 189, 5, 4, 'S'); pdf.text('N', 105.5, 191.5);
        pdf.rect(104, 193, 5, 4, 'S'); pdf.text('C', 105.5, 195.5);
        pdf.rect(104, 197, 5, 4, 'S'); pdf.text('R', 105.5, 199.5);
        pdf.rect(109, 189, 5, 4, 'S'); pdf.text('N', 111, 191.5);
        pdf.rect(109, 193, 5, 4, 'S'); pdf.text('C', 111, 195.5);
        pdf.rect(109, 197, 5, 4, 'S'); pdf.text('R', 111, 199.5);
        pdf.rect(114, 189, 47, 4, 'S'); pdf.text('1', 114.5, 191.5);
        pdf.rect(114, 193, 47, 4, 'S'); pdf.text('2', 114.5, 195.5);
        pdf.rect(114, 197, 47, 4, 'S'); pdf.text('3', 114.5, 199.5);
        pdf.rect(161, 189, 4, 4, 'S'); pdf.text('P', 162.5, 191.5);
        pdf.rect(161, 193, 4, 4, 'S'); pdf.text('P', 162.5, 195.5);
        pdf.rect(161, 197, 4, 4, 'S'); pdf.text('P', 162.5, 199.5);
        pdf.rect(165, 189, 4, 4, 'S'); pdf.text('D', 166.5, 191.5);
        pdf.rect(165, 193, 4, 4, 'S'); pdf.text('D', 166.5, 195.5);
        pdf.rect(165, 197, 4, 4, 'S'); pdf.text('D', 166.5, 199.5);
        pdf.rect(169, 189, 4, 4, 'S'); pdf.text('R', 170.5, 191.5);
        pdf.rect(169, 193, 4, 4, 'S'); pdf.text('R', 170.5, 195.5);
        pdf.rect(169, 197, 4, 4, 'S'); pdf.text('R', 170.5, 199.5);
        pdf.rect(173, 189, 4, 4, 'S'); pdf.text('', 174.5, 191.5);
        pdf.rect(173, 193, 4, 4, 'S'); pdf.text('', 174.5, 195.5);
        pdf.rect(173, 197, 4, 4, 'S'); pdf.text('', 174.5, 199.5);
        pdf.rect(177, 189, 4, 4, 'S'); pdf.text('', 178.5, 191.5);
        pdf.rect(177, 193, 4, 4, 'S'); pdf.text('', 178.5, 195.5);
        pdf.rect(177, 197, 4, 4, 'S'); pdf.text('', 178.5, 199.5);
        pdf.rect(181, 189, 4, 4, 'S'); pdf.text('', 182.5, 191.5);
        pdf.rect(181, 193, 4, 4, 'S'); pdf.text('', 182.5, 195.5);
        pdf.rect(181, 197, 4, 4, 'S'); pdf.text('', 182.5, 199.5);
        pdf.rect(185, 189, 20, 4, 'S'); pdf.text('', 186.5, 191.5);
        pdf.rect(185, 193, 20, 4, 'S'); pdf.text('', 186.5, 195.5);
        pdf.rect(185, 197, 20, 4, 'S'); pdf.text('', 186.5, 199.5);

        // linea 12
        pdf.rect(5, 201, 5, 20, 'S'); pdf.text('8', 6.5, 203);

        pdf.rect(10, 201, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 204.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 204.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 204.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 207.5);
        pdf.rect(10, 209, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 209, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 213, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 217, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 209, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 215, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 209, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 215, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 209, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 209, 5, 4, 'S'); pdf.text('A', 73, 211.5);
        pdf.rect(71, 213, 5, 4, 'S'); pdf.text('M', 73, 215.5);
        pdf.rect(71, 217, 5, 4, 'S'); pdf.text('D', 73, 219.5);
        pdf.rect(76, 209, 6, 6, 'S'); pdf.text('M', 78, 213.5);
        pdf.rect(76, 215, 6, 6, 'S'); pdf.text('F', 78, 218.5);
        pdf.rect(82, 209, 5, 6, 'S'); pdf.text('PC', 83, 213.5);
        pdf.rect(82, 215, 5, 6, 'S'); pdf.text('Pab', 83, 218.5);
        pdf.rect(87, 209, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 215, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 209, 6, 4, 'S'); pdf.text('PESO', 92.5, 211.5);
        pdf.rect(92, 213, 6, 4, 'S'); pdf.text('TALLA', 92.3, 215.5);
        pdf.rect(92, 217, 6, 4, 'S'); pdf.text('Hb', 94, 219.5);
        pdf.rect(98, 209, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 213, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 217, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 209, 5, 4, 'S'); pdf.text('N', 105.5, 211.5);
        pdf.rect(104, 213, 5, 4, 'S'); pdf.text('C', 105.5, 215.5);
        pdf.rect(104, 217, 5, 4, 'S'); pdf.text('R', 105.5, 219.5);
        pdf.rect(109, 209, 5, 4, 'S'); pdf.text('N', 111, 211.5);
        pdf.rect(109, 213, 5, 4, 'S'); pdf.text('C', 111, 215.5);
        pdf.rect(109, 217, 5, 4, 'S'); pdf.text('R', 111, 219.5);
        pdf.rect(114, 209, 47, 4, 'S'); pdf.text('1', 114.5, 211.5);
        pdf.rect(114, 213, 47, 4, 'S'); pdf.text('2', 114.5, 215.5);
        pdf.rect(114, 217, 47, 4, 'S'); pdf.text('3', 114.5, 219.5);
        pdf.rect(161, 209, 4, 4, 'S'); pdf.text('P', 162.5, 211.5);
        pdf.rect(161, 213, 4, 4, 'S'); pdf.text('P', 162.5, 215.5);
        pdf.rect(161, 217, 4, 4, 'S'); pdf.text('P', 162.5, 219.5);
        pdf.rect(165, 209, 4, 4, 'S'); pdf.text('D', 166.5, 211.5);
        pdf.rect(165, 213, 4, 4, 'S'); pdf.text('D', 166.5, 215.5);
        pdf.rect(165, 217, 4, 4, 'S'); pdf.text('D', 166.5, 219.5);
        pdf.rect(169, 209, 4, 4, 'S'); pdf.text('R', 170.5, 211.5);
        pdf.rect(169, 213, 4, 4, 'S'); pdf.text('R', 170.5, 215.5);
        pdf.rect(169, 217, 4, 4, 'S'); pdf.text('R', 170.5, 219.5);
        pdf.rect(173, 209, 4, 4, 'S'); pdf.text('', 174.5, 211.5);
        pdf.rect(173, 213, 4, 4, 'S'); pdf.text('', 174.5, 215.5);
        pdf.rect(173, 217, 4, 4, 'S'); pdf.text('', 174.5, 219.5);
        pdf.rect(177, 209, 4, 4, 'S'); pdf.text('', 178.5, 211.5);
        pdf.rect(177, 213, 4, 4, 'S'); pdf.text('', 178.5, 215.5);
        pdf.rect(177, 217, 4, 4, 'S'); pdf.text('', 178.5, 219.5);
        pdf.rect(181, 209, 4, 4, 'S'); pdf.text('', 182.5, 211.5);
        pdf.rect(181, 213, 4, 4, 'S'); pdf.text('', 182.5, 215.5);
        pdf.rect(181, 217, 4, 4, 'S'); pdf.text('', 182.5, 219.5);
        pdf.rect(185, 209, 20, 4, 'S'); pdf.text('', 186.5, 211.5);
        pdf.rect(185, 213, 20, 4, 'S'); pdf.text('', 186.5, 215.5);
        pdf.rect(185, 217, 20, 4, 'S'); pdf.text('', 186.5, 219.5);

        // linea 13
        pdf.rect(5, 221, 5, 20, 'S'); pdf.text('9', 6.5, 223);

        pdf.rect(10, 221, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 224.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 224.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 224.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 227.5);
        pdf.rect(10, 229, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 229, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 233, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 237, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 229, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 235, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 229, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 235, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 229, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 229, 5, 4, 'S'); pdf.text('A', 73, 231.5);
        pdf.rect(71, 233, 5, 4, 'S'); pdf.text('M', 73, 235.5);
        pdf.rect(71, 237, 5, 4, 'S'); pdf.text('D', 73, 239.5);
        pdf.rect(76, 229, 6, 6, 'S'); pdf.text('M', 78, 233.5);
        pdf.rect(76, 235, 6, 6, 'S'); pdf.text('F', 78, 238.5);
        pdf.rect(82, 229, 5, 6, 'S'); pdf.text('PC', 83, 233.5);
        pdf.rect(82, 235, 5, 6, 'S'); pdf.text('Pab', 83, 238.5);
        pdf.rect(87, 229, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 235, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 229, 6, 4, 'S'); pdf.text('PESO', 92.5, 231.5);
        pdf.rect(92, 233, 6, 4, 'S'); pdf.text('TALLA', 92.3, 235.5);
        pdf.rect(92, 237, 6, 4, 'S'); pdf.text('Hb', 94, 239.5);
        pdf.rect(98, 229, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 233, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 237, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 229, 5, 4, 'S'); pdf.text('N', 105.5, 231.5);
        pdf.rect(104, 233, 5, 4, 'S'); pdf.text('C', 105.5, 235.5);
        pdf.rect(104, 237, 5, 4, 'S'); pdf.text('R', 105.5, 239.5);
        pdf.rect(109, 229, 5, 4, 'S'); pdf.text('N', 111, 231.5);
        pdf.rect(109, 233, 5, 4, 'S'); pdf.text('C', 111, 235.5);
        pdf.rect(109, 237, 5, 4, 'S'); pdf.text('R', 111, 239.5);
        pdf.rect(114, 229, 47, 4, 'S'); pdf.text('1', 114.5, 231.5);
        pdf.rect(114, 233, 47, 4, 'S'); pdf.text('2', 114.5, 235.5);
        pdf.rect(114, 237, 47, 4, 'S'); pdf.text('3', 114.5, 239.5);
        pdf.rect(161, 229, 4, 4, 'S'); pdf.text('P', 162.5, 231.5);
        pdf.rect(161, 233, 4, 4, 'S'); pdf.text('P', 162.5, 235.5);
        pdf.rect(161, 237, 4, 4, 'S'); pdf.text('P', 162.5, 239.5);
        pdf.rect(165, 229, 4, 4, 'S'); pdf.text('D', 166.5, 231.5);
        pdf.rect(165, 233, 4, 4, 'S'); pdf.text('D', 166.5, 235.5);
        pdf.rect(165, 237, 4, 4, 'S'); pdf.text('D', 166.5, 239.5);
        pdf.rect(169, 229, 4, 4, 'S'); pdf.text('R', 170.5, 231.5);
        pdf.rect(169, 233, 4, 4, 'S'); pdf.text('R', 170.5, 235.5);
        pdf.rect(169, 237, 4, 4, 'S'); pdf.text('R', 170.5, 239.5);
        pdf.rect(173, 229, 4, 4, 'S'); pdf.text('', 174.5, 231.5);
        pdf.rect(173, 233, 4, 4, 'S'); pdf.text('', 174.5, 235.5);
        pdf.rect(173, 237, 4, 4, 'S'); pdf.text('', 174.5, 239.5);
        pdf.rect(177, 229, 4, 4, 'S'); pdf.text('', 178.5, 231.5);
        pdf.rect(177, 233, 4, 4, 'S'); pdf.text('', 178.5, 235.5);
        pdf.rect(177, 237, 4, 4, 'S'); pdf.text('', 178.5, 239.5);
        pdf.rect(181, 229, 4, 4, 'S'); pdf.text('', 182.5, 231.5);
        pdf.rect(181, 233, 4, 4, 'S'); pdf.text('', 182.5, 235.5);
        pdf.rect(181, 237, 4, 4, 'S'); pdf.text('', 182.5, 239.5);
        pdf.rect(185, 229, 20, 4, 'S'); pdf.text('', 186.5, 231.5);
        pdf.rect(185, 233, 20, 4, 'S'); pdf.text('', 186.5, 235.5);
        pdf.rect(185, 237, 20, 4, 'S'); pdf.text('', 186.5, 239.5);

        // linea 14
        pdf.rect(5, 241, 5, 20, 'S'); pdf.text('10', 6.5, 243);

        pdf.rect(10, 241, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 244.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 244.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 244.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 247.5);
        pdf.rect(10, 249, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 249, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 253, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 257, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 249, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 255, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 249, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 255, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 249, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 249, 5, 4, 'S'); pdf.text('A', 73, 251.5);
        pdf.rect(71, 253, 5, 4, 'S'); pdf.text('M', 73, 255.5);
        pdf.rect(71, 257, 5, 4, 'S'); pdf.text('D', 73, 259.5);
        pdf.rect(76, 249, 6, 6, 'S'); pdf.text('M', 78, 253.5);
        pdf.rect(76, 255, 6, 6, 'S'); pdf.text('F', 78, 258.5);
        pdf.rect(82, 249, 5, 6, 'S'); pdf.text('PC', 83, 253.5);
        pdf.rect(82, 255, 5, 6, 'S'); pdf.text('Pab', 83, 258.5);
        pdf.rect(87, 249, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 255, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 249, 6, 4, 'S'); pdf.text('PESO', 92.5, 251.5);
        pdf.rect(92, 253, 6, 4, 'S'); pdf.text('TALLA', 92.3, 255.5);
        pdf.rect(92, 257, 6, 4, 'S'); pdf.text('Hb', 94, 259.5);
        pdf.rect(98, 249, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 253, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 257, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 249, 5, 4, 'S'); pdf.text('N', 105.5, 251.5);
        pdf.rect(104, 253, 5, 4, 'S'); pdf.text('C', 105.5, 255.5);
        pdf.rect(104, 257, 5, 4, 'S'); pdf.text('R', 105.5, 259.5);
        pdf.rect(109, 249, 5, 4, 'S'); pdf.text('N', 111, 251.5);
        pdf.rect(109, 253, 5, 4, 'S'); pdf.text('C', 111, 255.5);
        pdf.rect(109, 257, 5, 4, 'S'); pdf.text('R', 111, 259.5);
        pdf.rect(114, 249, 47, 4, 'S'); pdf.text('1', 114.5, 251.5);
        pdf.rect(114, 253, 47, 4, 'S'); pdf.text('2', 114.5, 255.5);
        pdf.rect(114, 257, 47, 4, 'S'); pdf.text('3', 114.5, 259.5);
        pdf.rect(161, 249, 4, 4, 'S'); pdf.text('P', 162.5, 251.5);
        pdf.rect(161, 253, 4, 4, 'S'); pdf.text('P', 162.5, 255.5);
        pdf.rect(161, 257, 4, 4, 'S'); pdf.text('P', 162.5, 259.5);
        pdf.rect(165, 249, 4, 4, 'S'); pdf.text('D', 166.5, 251.5);
        pdf.rect(165, 253, 4, 4, 'S'); pdf.text('D', 166.5, 255.5);
        pdf.rect(165, 257, 4, 4, 'S'); pdf.text('D', 166.5, 259.5);
        pdf.rect(169, 249, 4, 4, 'S'); pdf.text('R', 170.5, 251.5);
        pdf.rect(169, 253, 4, 4, 'S'); pdf.text('R', 170.5, 255.5);
        pdf.rect(169, 257, 4, 4, 'S'); pdf.text('R', 170.5, 259.5);
        pdf.rect(173, 249, 4, 4, 'S'); pdf.text('', 174.5, 251.5);
        pdf.rect(173, 253, 4, 4, 'S'); pdf.text('', 174.5, 255.5);
        pdf.rect(173, 257, 4, 4, 'S'); pdf.text('', 174.5, 259.5);
        pdf.rect(177, 249, 4, 4, 'S'); pdf.text('', 178.5, 251.5);
        pdf.rect(177, 253, 4, 4, 'S'); pdf.text('', 178.5, 255.5);
        pdf.rect(177, 257, 4, 4, 'S'); pdf.text('', 178.5, 259.5);
        pdf.rect(181, 249, 4, 4, 'S'); pdf.text('', 182.5, 251.5);
        pdf.rect(181, 253, 4, 4, 'S'); pdf.text('', 182.5, 255.5);
        pdf.rect(181, 257, 4, 4, 'S'); pdf.text('', 182.5, 259.5);
        pdf.rect(185, 249, 20, 4, 'S'); pdf.text('', 186.5, 251.5);
        pdf.rect(185, 253, 20, 4, 'S'); pdf.text('', 186.5, 255.5);
        pdf.rect(185, 257, 20, 4, 'S'); pdf.text('', 186.5, 259.5);

        // FIN DE CONTENIDO

        // PIE DE CONTENIDO
        pdf.rect(5, 261, 63, 5, 'S'); pdf.text('ITEM 09: FINANCIADOR DE SALUD', 25, 264);
        pdf.rect(68, 261, 27, 5, 'S'); pdf.text('ITEM 12', 78, 264);
        pdf.rect(95, 261, 20, 5, 'S'); pdf.text('ITEM 16', 100, 264);
        pdf.rect(115, 261, 42, 5, 'S'); pdf.text('ITEM 17 y 18 (CONDICION DE INGRESO)', 117, 264);
        pdf.rect(157, 261, 48, 5, 'S'); pdf.text('FECHA DE ULTIMA REGLA', 167, 264);

        pdf.rect(5, 266, 63, 12, 'S');
        pdf.text('1 USUARIO', 6, 269); pdf.text('2 SEGURO INTEGRAL (SIS)', 6, 272.5); pdf.text('3 ESSALUD', 6, 276);
        pdf.text('4 SOAT', 33, 269); pdf.text('4 SANIDAD FAP', 33, 272.5); pdf.text('5 SANIDAD NAVAL', 33, 276);
        pdf.text('10 OTROS', 52, 269); pdf.text('11 EXONERADO', 52, 272.5);

        pdf.rect(68, 266, 27, 12, 'S'); pdf.text('Registrar el nombre del Centro', 69.5, 269); pdf.text('Poblado', 78, 272);
        pdf.rect(95, 266, 20, 12, 'S'); pdf.text('PESO = kg', 96.5, 269); pdf.text('TALLA = Cm', 96.5, 272); pdf.text('Hb = Valor', 96.5, 275);
        pdf.rect(115, 266, 42, 12, 'S'); pdf.text('N= PACIENTE NUEVO (1ER VEZ EN SU VIDA)', 116, 269); pdf.text('C= PACIENTE CONTINUADOR EN EL AÑO', 116, 272); pdf.text('R= PACIENTE REINGRESANTE EN EL AÑO', 116, 275);
        pdf.rect(157, 266, 48, 12, 'S'); pdf.text('Si no se cuenta con el dato se registrará la fecha de la', 158, 269); pdf.text('primera ecografia', 175, 272);

        pdf.rect(5, 278, 19, 5, 'S'); pdf.text('58 MESTIZO', 6, 281);
        pdf.rect(24, 278, 18, 5, 'S'); pdf.text('26 CULINA', 25, 281);
        pdf.rect(42, 278, 28, 5, 'S'); pdf.text('10 CASHINAHUA', 43, 281);
        pdf.rect(70, 278, 30, 5, 'S'); pdf.text('05 ASHANINKA', 72, 281);
        pdf.rect(100, 278, 30, 5, 'S'); pdf.text('53 YAMINAHUA', 102, 281);
        pdf.rect(130, 278, 28, 5, 'S'); pdf.text('55 YIN - YAMI (PIRO)', 132, 281);
        pdf.rect(158, 278, 17, 5, 'S'); pdf.text('21 KAKATAIBO', 158.5, 281);
        pdf.rect(175, 278, 15, 5, 'S'); pdf.text('40 QUECHUAS', 176, 281);
        pdf.rect(190, 278, 15, 5, 'S'); pdf.text('07 AWAJUN', 191.5, 281);

        pdf.rect(5, 283, 19, 5, 'S'); pdf.text('45 SHIPIBO-CONIBO', 5.5, 286);
        pdf.rect(24, 283, 18, 5, 'S'); pdf.text('18 ISCONAHUA', 25, 286);
        pdf.rect(42, 283, 28, 5, 'S'); pdf.text('43 SHARANAHUA', 43, 286);
        pdf.rect(70, 283, 30, 5, 'S'); pdf.text('32 MACHIGUENGA', 71, 286);
        pdf.rect(100, 283, 30, 5, 'S'); pdf.text('3 AMANAHUACA', 101, 286);
        pdf.rect(130, 283, 28, 5, 'S'); pdf.text('54 YANESHA (AMUESHA)', 131, 286);
        pdf.rect(158, 283, 17, 5, 'S'); pdf.text('30 MASTANAHUA', 158.5, 286);
        pdf.rect(175, 283, 15, 5, 'S'); pdf.text('51 WAMPIS', 176, 286);
        pdf.rect(190, 283, 15, 5, 'S'); pdf.text('02 AIMARA', 191, 286);
        // FIN DE PIE DE CONTENIDO

        // HOJA 2
        pdf.addPage();
        pdf.rect(5, 13, 165, 13, 'S');
        pdf.setFontSize(10);
        pdf.setFont('Verdana','bold');
        pdf.text('Registro Diario de Atención y Otras Actividades de Salud', 40, 19.5);

        pdf.setFontSize(6);
        pdf.setFont('Verdana','normal');
        pdf.rect(170, 13, 5, 5, 'S'); pdf.text('1', 172, 16);
        pdf.rect(175, 13, 30, 5, 'S'); pdf.text('TURNO', 185, 16);
        pdf.rect(170, 18, 12, 8, 'S'); pdf.text('M', 174, 22.5);
        pdf.rect(182, 18, 11, 8, 'S'); pdf.text('T', 186, 22.5);
        pdf.rect(193, 18, 12, 8, 'S'); pdf.text('N', 198, 22.5);

        //INICIO DE CONTENIDO
        // linea 1
        pdf.setFontSize(5);
        pdf.rect(5, 26, 5, 6, 'S'); pdf.text('2', 6, 29.5);
        pdf.rect(10, 26, 7, 6, 'S'); pdf.text('AÑO', 12, 29.5);
        pdf.rect(17, 26, 2, 6, 'S'); pdf.text('3', 17.5, 29.5);
        pdf.rect(19, 26, 19, 6, 'S'); pdf.text('MES', 26, 29.5);
        pdf.rect(38, 26, 2, 6, 'S'); pdf.text('4', 38.5, 29.5);
        pdf.rect(40, 26, 52, 6, 'S'); pdf.text('NOMBRE DE ESTABLECIMIENTO DE SALUD (IPRESS)', 41, 29.5);
        pdf.rect(92, 26, 2, 6, 'S'); pdf.text('5', 92.5, 29.5);
        pdf.rect(94, 26, 64, 6, 'S'); pdf.text('UNIDAD PRODUCTORA DE SERVICIOS (UPS)', 95, 29.5);
        pdf.rect(158, 26, 3, 6, 'S'); pdf.text('6', 159, 29.5);
        pdf.rect(161, 26, 44, 6, 'S'); pdf.text('NOMBRE DEL RESPONSABLE DE ATENCIÓN', 162, 29.5);

        // linea 2
        pdf.rect(5, 32, 12, 8, 'S'); pdf.text('', 6, 34);
        pdf.rect(17, 32, 21, 8, 'S'); pdf.text('', 18, 34);
        pdf.rect(38, 32, 54, 8, 'S'); pdf.text('', 40, 34);
        pdf.rect(92, 32, 66, 8, 'S'); pdf.text('', 68, 34);
        pdf.rect(158, 32, 3, 8, 'S'); pdf.text('', 159, 34);
        pdf.rect(161, 32, 19, 8, 'S'); pdf.text('', 162, 34);
        pdf.rect(180, 32, 25, 8, 'S'); pdf.text('', 183, 34);

        // linea 3
        pdf.rect(5, 40, 12, 5, 'S'); pdf.text('7', 11, 43);
        pdf.rect(17, 40, 21, 5, 'S'); pdf.text('8', 26, 43);
        pdf.rect(38, 40, 7, 5, 'S'); pdf.text('9', 40, 43);
        pdf.rect(45, 40, 21, 5, 'S'); pdf.text('11', 50, 43);
        pdf.rect(66, 40, 10, 5, 'S'); pdf.text('13', 70, 43);
        pdf.rect(76, 40, 6, 5, 'S'); pdf.text('14', 77, 43);
        pdf.rect(82, 40, 10, 5, 'S'); pdf.text('15', 86, 43);
        pdf.rect(92, 40, 12, 5, 'S'); pdf.text('16', 98, 43);
        pdf.rect(104, 40, 5, 5, 'S'); pdf.text('17', 106, 43);
        pdf.rect(109, 40, 5, 5, 'S'); pdf.text('18', 110, 43);
        pdf.rect(114, 40, 47, 5, 'S'); pdf.text('19', 135, 43);
        pdf.rect(161, 40, 12, 5, 'S'); pdf.text('20', 165, 43);
        pdf.rect(173, 40, 12, 5, 'S'); pdf.text('21', 177, 43);
        pdf.rect(185, 40, 20, 5, 'S'); pdf.text('22', 193, 43);

        // linea 4
        pdf.rect(5, 45, 12, 12, 'S'); pdf.text('DIA', 10, 51);
        pdf.rect(17, 45, 21, 4, 'S'); pdf.text('D.N.I.', 25, 48);
        pdf.rect(17, 49, 21, 4, 'S'); pdf.text('HISTORIA CLINICA', 18, 52);
        pdf.rect(17, 53, 21, 4, 'S'); pdf.text('GESTANTE/PUERPERA', 18, 56);
        pdf.rect(38, 45, 7, 4, 'S'); pdf.text('FINANC.', 38.2, 48);
        pdf.rect(38, 49, 7, 4, 'S'); pdf.text('10', 40, 52);
        pdf.rect(38, 53, 7, 4, 'S'); pdf.text('ETNIA', 39, 56);
        pdf.setFontSize(4);
        pdf.rect(45, 45, 21, 4, 'S'); pdf.text('DISTRITO DE PROCEDENCIA', 45.5, 48);
        pdf.setFontSize(5);
        pdf.rect(45, 49, 21, 4, 'S'); pdf.text('12', 53, 52);
        pdf.rect(45, 53, 21, 4, 'S'); pdf.text('CENTRO POBLADO', 46, 56);
        pdf.rect(66, 45, 10, 12, 'S'); pdf.text('EDAD', 68, 48);
        pdf.rect(76, 45, 6, 12, 'S'); pdf.text('SEXO', 76.5, 48);
        pdf.setFontSize(4);
        pdf.rect(82, 45, 10, 12, 'S'); pdf.text('PERIMETRO', 82.5, 48); pdf.text('CEFALICO Y', 82.5, 51); pdf.text('ABDOMINAL', 82.5, 54);
        pdf.rect(92, 45, 12, 12, 'S'); pdf.text('EVALUACION', 93, 48); pdf.setFontSize(3.5); pdf.text('ANTROPOMETRICA', 92.3, 51); pdf.setFontSize(4); pdf.text('HEMOGLOBINA', 93, 54);
        pdf.setFontSize(4);
        pdf.rect(104, 45, 5, 12, 'S'); pdf.text('ESTA-', 104.5, 48); pdf.text('BLEC', 104.7, 51);
        pdf.rect(109, 45, 5, 12, 'S'); pdf.text('SER-', 109.5, 48); pdf.text('VICIO', 109.7, 51);
        pdf.setFontSize(5);
        pdf.rect(114, 45, 47, 12, 'S'); pdf.text('DIAGNOSTICO MOTIVO DE CONSULTA', 122, 48); pdf.text('Y/O ACTIVIDAD DE SALUD', 125, 51);
        pdf.rect(161, 45, 12, 8, 'S'); pdf.text('TIPO DE', 163.5, 48); pdf.setFontSize(4.5); pdf.text('DIAGNOSTICO', 161.5, 51);
        pdf.setFontSize(5);
        pdf.rect(161, 53, 4, 4, 'S');pdf.text('P', 162.5, 55.5);
        pdf.rect(165, 53, 4, 4, 'S');pdf.text('D', 166.5, 55.5);
        pdf.rect(169, 53, 4, 4, 'S');pdf.text('R', 170.5, 55.5);
        pdf.rect(173, 45, 12, 8, 'S'); pdf.text('VALOR', 175.5, 48); pdf.text('LAB', 177, 51);
        pdf.rect(173, 53, 4, 4, 'S');pdf.text('1°', 174.5, 55.5);
        pdf.rect(177, 53, 4, 4, 'S');pdf.text('2°', 178.5, 55.5);
        pdf.rect(181, 53, 4, 4, 'S');pdf.text('3°', 182.5, 55.5);
        pdf.rect(185, 45, 20, 12, 'S'); pdf.text('CÓDIGO', 191, 48); pdf.text('CIE / CPT', 191, 51);

        // linea 5
        pdf.rect(5, 57, 5, 20, 'S');pdf.text('11', 6.5, 59.5);
        pdf.rect(10, 57, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 59.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 59.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 59.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 63.5);
        pdf.rect(10, 65, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 65, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 69, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 73, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 65, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 71, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 65, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 71, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 65, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 65, 5, 4, 'S'); pdf.text('A', 73, 67.5);
        pdf.rect(71, 69, 5, 4, 'S'); pdf.text('M', 73, 71.5);
        pdf.rect(71, 73, 5, 4, 'S'); pdf.text('D', 73, 75.5);
        pdf.rect(76, 65, 6, 6, 'S'); pdf.text('M', 78, 67.5);
        pdf.rect(76, 71, 6, 6, 'S'); pdf.text('F', 78, 73.5);
        pdf.rect(82, 65, 5, 6, 'S'); pdf.text('PC', 83, 67.5);
        pdf.rect(82, 71, 5, 6, 'S'); pdf.text('Pab', 83, 73.5);
        pdf.rect(87, 65, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 71, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 65, 6, 4, 'S'); pdf.text('PESO', 92.5, 67.5);
        pdf.rect(92, 69, 6, 4, 'S'); pdf.text('TALLA', 92.3, 71.5);
        pdf.rect(92, 73, 6, 4, 'S'); pdf.text('Hb', 94, 75.5);
        pdf.rect(98, 65, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 69, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 73, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 65, 5, 4, 'S'); pdf.text('N', 105.5, 67.5);
        pdf.rect(104, 69, 5, 4, 'S'); pdf.text('C', 105.5, 71.5);
        pdf.rect(104, 73, 5, 4, 'S'); pdf.text('R', 105.5, 75.5);
        pdf.rect(109, 65, 5, 4, 'S'); pdf.text('N', 111, 67.5);
        pdf.rect(109, 69, 5, 4, 'S'); pdf.text('C', 111, 71.5);
        pdf.rect(109, 73, 5, 4, 'S'); pdf.text('R', 111, 75.5);
        pdf.rect(114, 65, 47, 4, 'S'); pdf.text('1', 114.5, 67.5);
        pdf.rect(114, 69, 47, 4, 'S'); pdf.text('2', 114.5, 71.5);
        pdf.rect(114, 73, 47, 4, 'S'); pdf.text('3', 114.5, 75.5);
        pdf.rect(161, 65, 4, 4, 'S'); pdf.text('P', 162.5, 67.5);
        pdf.rect(161, 69, 4, 4, 'S'); pdf.text('P', 162.5, 71.5);
        pdf.rect(161, 73, 4, 4, 'S'); pdf.text('P', 162.5, 75.5);
        pdf.rect(165, 65, 4, 4, 'S'); pdf.text('D', 166.5, 67.5);
        pdf.rect(165, 69, 4, 4, 'S'); pdf.text('D', 166.5, 71.5);
        pdf.rect(165, 73, 4, 4, 'S'); pdf.text('D', 166.5, 75.5);
        pdf.rect(169, 65, 4, 4, 'S'); pdf.text('R', 170.5, 67.5);
        pdf.rect(169, 69, 4, 4, 'S'); pdf.text('R', 170.5, 71.5);
        pdf.rect(169, 73, 4, 4, 'S'); pdf.text('R', 170.5, 75.5);
        pdf.rect(173, 65, 4, 4, 'S'); pdf.text('', 174.5, 67.5);
        pdf.rect(173, 69, 4, 4, 'S'); pdf.text('', 174.5, 71.5);
        pdf.rect(173, 73, 4, 4, 'S'); pdf.text('', 174.5, 75.5);
        pdf.rect(177, 65, 4, 4, 'S'); pdf.text('', 178.5, 67.5);
        pdf.rect(177, 69, 4, 4, 'S'); pdf.text('', 178.5, 71.5);
        pdf.rect(177, 73, 4, 4, 'S'); pdf.text('', 178.5, 75.5);
        pdf.rect(181, 65, 4, 4, 'S'); pdf.text('', 182.5, 67.5);
        pdf.rect(181, 69, 4, 4, 'S'); pdf.text('', 182.5, 71.5);
        pdf.rect(181, 73, 4, 4, 'S'); pdf.text('', 182.5, 75.5);
        pdf.rect(185, 65, 20, 4, 'S'); pdf.text('', 186.5, 67.5);
        pdf.rect(185, 69, 20, 4, 'S'); pdf.text('', 186.5, 71.5);
        pdf.rect(185, 73, 20, 4, 'S'); pdf.text('', 186.5, 75.5);

        // linea 6
        pdf.rect(5, 77, 5, 20, 'S');pdf.text('12', 6.5, 79.5);
        pdf.rect(10, 77, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 79.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 79.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 79.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 83.5);
        pdf.rect(10, 85, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 85, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 89, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 93, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 85, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 91, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 85, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 91, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 85, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 85, 5, 4, 'S'); pdf.text('A', 73, 87.5);
        pdf.rect(71, 89, 5, 4, 'S'); pdf.text('M', 73, 91.5);
        pdf.rect(71, 93, 5, 4, 'S'); pdf.text('D', 73, 95.5);
        pdf.rect(76, 85, 6, 6, 'S'); pdf.text('M', 78, 87.5);
        pdf.rect(76, 91, 6, 6, 'S'); pdf.text('F', 78, 93.5);
        pdf.rect(82, 85, 5, 6, 'S'); pdf.text('PC', 83, 87.5);
        pdf.rect(82, 91, 5, 6, 'S'); pdf.text('Pab', 83, 93.5);
        pdf.rect(87, 85, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 91, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 85, 6, 4, 'S'); pdf.text('PESO', 92.5, 87.5);
        pdf.rect(92, 89, 6, 4, 'S'); pdf.text('TALLA', 92.3, 91.5);
        pdf.rect(92, 93, 6, 4, 'S'); pdf.text('Hb', 94, 95.5);
        pdf.rect(98, 85, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 89, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 93, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 85, 5, 4, 'S'); pdf.text('N', 105.5, 87.5);
        pdf.rect(104, 89, 5, 4, 'S'); pdf.text('C', 105.5, 91.5);
        pdf.rect(104, 93, 5, 4, 'S'); pdf.text('R', 105.5, 95.5);
        pdf.rect(109, 85, 5, 4, 'S'); pdf.text('N', 111, 87.5);
        pdf.rect(109, 89, 5, 4, 'S'); pdf.text('C', 111, 91.5);
        pdf.rect(109, 93, 5, 4, 'S'); pdf.text('R', 111, 95.5);
        pdf.rect(114, 85, 47, 4, 'S'); pdf.text('1', 114.5, 87.5);
        pdf.rect(114, 89, 47, 4, 'S'); pdf.text('2', 114.5, 91.5);
        pdf.rect(114, 93, 47, 4, 'S'); pdf.text('3', 114.5, 95.5);
        pdf.rect(161, 85, 4, 4, 'S'); pdf.text('P', 162.5, 87.5);
        pdf.rect(161, 89, 4, 4, 'S'); pdf.text('P', 162.5, 91.5);
        pdf.rect(161, 93, 4, 4, 'S'); pdf.text('P', 162.5, 95.5);
        pdf.rect(165, 85, 4, 4, 'S'); pdf.text('D', 166.5, 87.5);
        pdf.rect(165, 89, 4, 4, 'S'); pdf.text('D', 166.5, 91.5);
        pdf.rect(165, 93, 4, 4, 'S'); pdf.text('D', 166.5, 95.5);
        pdf.rect(169, 85, 4, 4, 'S'); pdf.text('R', 170.5, 87.5);
        pdf.rect(169, 89, 4, 4, 'S'); pdf.text('R', 170.5, 91.5);
        pdf.rect(169, 93, 4, 4, 'S'); pdf.text('R', 170.5, 95.5);
        pdf.rect(173, 85, 4, 4, 'S'); pdf.text('', 174.5, 87.5);
        pdf.rect(173, 89, 4, 4, 'S'); pdf.text('', 174.5, 91.5);
        pdf.rect(173, 93, 4, 4, 'S'); pdf.text('', 174.5, 95.5);
        pdf.rect(177, 85, 4, 4, 'S'); pdf.text('', 178.5, 87.5);
        pdf.rect(177, 89, 4, 4, 'S'); pdf.text('', 178.5, 91.5);
        pdf.rect(177, 93, 4, 4, 'S'); pdf.text('', 178.5, 95.5);
        pdf.rect(181, 85, 4, 4, 'S'); pdf.text('', 182.5, 87.5);
        pdf.rect(181, 89, 4, 4, 'S'); pdf.text('', 182.5, 91.5);
        pdf.rect(181, 93, 4, 4, 'S'); pdf.text('', 182.5, 95.5);
        pdf.rect(185, 85, 20, 4, 'S'); pdf.text('', 186.5, 87.5);
        pdf.rect(185, 89, 20, 4, 'S'); pdf.text('', 186.5, 91.5);
        pdf.rect(185, 93, 20, 4, 'S'); pdf.text('', 186.5, 95.5);

        // linea 7
        pdf.rect(5, 97, 5, 20, 'S');pdf.text('13', 6.5, 99.5);
        pdf.rect(10, 97, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 99.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 99.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 99.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 103.5);
        pdf.rect(10, 105, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 105, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 109, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 113, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 105, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 111, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 105, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 111, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 105, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 105, 5, 4, 'S'); pdf.text('A', 73, 107.5);
        pdf.rect(71, 109, 5, 4, 'S'); pdf.text('M', 73, 111.5);
        pdf.rect(71, 113, 5, 4, 'S'); pdf.text('D', 73, 115.5);
        pdf.rect(76, 105, 6, 6, 'S'); pdf.text('M', 78, 107.5);
        pdf.rect(76, 111, 6, 6, 'S'); pdf.text('F', 78, 113.5);
        pdf.rect(82, 105, 5, 6, 'S'); pdf.text('PC', 83, 107.5);
        pdf.rect(82, 111, 5, 6, 'S'); pdf.text('Pab', 83, 113.5);
        pdf.rect(87, 105, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 111, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 105, 6, 4, 'S'); pdf.text('PESO', 92.5, 107.5);
        pdf.rect(92, 109, 6, 4, 'S'); pdf.text('TALLA', 92.3, 111.5);
        pdf.rect(92, 113, 6, 4, 'S'); pdf.text('Hb', 94, 115.5);
        pdf.rect(98, 105, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 109, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 113, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 105, 5, 4, 'S'); pdf.text('N', 105.5, 107.5);
        pdf.rect(104, 109, 5, 4, 'S'); pdf.text('C', 105.5, 111.5);
        pdf.rect(104, 113, 5, 4, 'S'); pdf.text('R', 105.5, 115.5);
        pdf.rect(109, 105, 5, 4, 'S'); pdf.text('N', 111, 107.5);
        pdf.rect(109, 109, 5, 4, 'S'); pdf.text('C', 111, 111.5);
        pdf.rect(109, 113, 5, 4, 'S'); pdf.text('R', 111, 115.5);
        pdf.rect(114, 105, 47, 4, 'S'); pdf.text('1', 114.5, 107.5);
        pdf.rect(114, 109, 47, 4, 'S'); pdf.text('2', 114.5, 111.5);
        pdf.rect(114, 113, 47, 4, 'S'); pdf.text('3', 114.5, 115.5);
        pdf.rect(161, 105, 4, 4, 'S'); pdf.text('P', 162.5, 107.5);
        pdf.rect(161, 109, 4, 4, 'S'); pdf.text('P', 162.5, 111.5);
        pdf.rect(161, 113, 4, 4, 'S'); pdf.text('P', 162.5, 115.5);
        pdf.rect(165, 105, 4, 4, 'S'); pdf.text('D', 166.5, 107.5);
        pdf.rect(165, 109, 4, 4, 'S'); pdf.text('D', 166.5, 111.5);
        pdf.rect(165, 113, 4, 4, 'S'); pdf.text('D', 166.5, 115.5);
        pdf.rect(169, 105, 4, 4, 'S'); pdf.text('R', 170.5, 107.5);
        pdf.rect(169, 109, 4, 4, 'S'); pdf.text('R', 170.5, 111.5);
        pdf.rect(169, 113, 4, 4, 'S'); pdf.text('R', 170.5, 115.5);
        pdf.rect(173, 105, 4, 4, 'S'); pdf.text('', 174.5, 107.5);
        pdf.rect(173, 109, 4, 4, 'S'); pdf.text('', 174.5, 111.5);
        pdf.rect(173, 113, 4, 4, 'S'); pdf.text('', 174.5, 115.5);
        pdf.rect(177, 105, 4, 4, 'S'); pdf.text('', 178.5, 107.5);
        pdf.rect(177, 109, 4, 4, 'S'); pdf.text('', 178.5, 111.5);
        pdf.rect(177, 113, 4, 4, 'S'); pdf.text('', 178.5, 115.5);
        pdf.rect(181, 105, 4, 4, 'S'); pdf.text('', 182.5, 107.5);
        pdf.rect(181, 109, 4, 4, 'S'); pdf.text('', 182.5, 111.5);
        pdf.rect(181, 113, 4, 4, 'S'); pdf.text('', 182.5, 115.5);
        pdf.rect(185, 105, 20, 4, 'S'); pdf.text('', 186.5, 107.5);
        pdf.rect(185, 109, 20, 4, 'S'); pdf.text('', 186.5, 111.5);
        pdf.rect(185, 113, 20, 4, 'S'); pdf.text('', 186.5, 115.5);

        // linea 8
        pdf.rect(5, 117, 5, 20, 'S');pdf.text('14', 6.5, 119.5);
        pdf.rect(10, 117, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 119.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 119.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 119.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 123.5);
        pdf.rect(10, 125, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 125, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 129, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 133, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 125, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 131, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 125, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 131, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 125, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 125, 5, 4, 'S'); pdf.text('A', 73, 127.5);
        pdf.rect(71, 129, 5, 4, 'S'); pdf.text('M', 73, 131.5);
        pdf.rect(71, 133, 5, 4, 'S'); pdf.text('D', 73, 135.5);
        pdf.rect(76, 125, 6, 6, 'S'); pdf.text('M', 78, 127.5);
        pdf.rect(76, 131, 6, 6, 'S'); pdf.text('F', 78, 133.5);
        pdf.rect(82, 125, 5, 6, 'S'); pdf.text('PC', 83, 127.5);
        pdf.rect(82, 131, 5, 6, 'S'); pdf.text('Pab', 83, 133.5);
        pdf.rect(87, 125, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 131, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 125, 6, 4, 'S'); pdf.text('PESO', 92.5, 127.5);
        pdf.rect(92, 129, 6, 4, 'S'); pdf.text('TALLA', 92.3, 131.5);
        pdf.rect(92, 133, 6, 4, 'S'); pdf.text('Hb', 94, 135.5);
        pdf.rect(98, 125, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 129, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 133, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 125, 5, 4, 'S'); pdf.text('N', 105.5, 127.5);
        pdf.rect(104, 129, 5, 4, 'S'); pdf.text('C', 105.5, 131.5);
        pdf.rect(104, 133, 5, 4, 'S'); pdf.text('R', 105.5, 135.5);
        pdf.rect(109, 125, 5, 4, 'S'); pdf.text('N', 111, 127.5);
        pdf.rect(109, 129, 5, 4, 'S'); pdf.text('C', 111, 131.5);
        pdf.rect(109, 133, 5, 4, 'S'); pdf.text('R', 111, 135.5);
        pdf.rect(114, 125, 47, 4, 'S'); pdf.text('1', 114.5, 127.5);
        pdf.rect(114, 129, 47, 4, 'S'); pdf.text('2', 114.5, 131.5);
        pdf.rect(114, 133, 47, 4, 'S'); pdf.text('3', 114.5, 135.5);
        pdf.rect(161, 125, 4, 4, 'S'); pdf.text('P', 162.5, 127.5);
        pdf.rect(161, 129, 4, 4, 'S'); pdf.text('P', 162.5, 131.5);
        pdf.rect(161, 133, 4, 4, 'S'); pdf.text('P', 162.5, 135.5);
        pdf.rect(165, 125, 4, 4, 'S'); pdf.text('D', 166.5, 127.5);
        pdf.rect(165, 129, 4, 4, 'S'); pdf.text('D', 166.5, 131.5);
        pdf.rect(165, 133, 4, 4, 'S'); pdf.text('D', 166.5, 135.5);
        pdf.rect(169, 125, 4, 4, 'S'); pdf.text('R', 170.5, 127.5);
        pdf.rect(169, 129, 4, 4, 'S'); pdf.text('R', 170.5, 131.5);
        pdf.rect(169, 133, 4, 4, 'S'); pdf.text('R', 170.5, 135.5);
        pdf.rect(173, 125, 4, 4, 'S'); pdf.text('', 174.5, 127.5);
        pdf.rect(173, 129, 4, 4, 'S'); pdf.text('', 174.5, 131.5);
        pdf.rect(173, 133, 4, 4, 'S'); pdf.text('', 174.5, 135.5);
        pdf.rect(177, 125, 4, 4, 'S'); pdf.text('', 178.5, 127.5);
        pdf.rect(177, 129, 4, 4, 'S'); pdf.text('', 178.5, 131.5);
        pdf.rect(177, 133, 4, 4, 'S'); pdf.text('', 178.5, 135.5);
        pdf.rect(181, 125, 4, 4, 'S'); pdf.text('', 182.5, 127.5);
        pdf.rect(181, 129, 4, 4, 'S'); pdf.text('', 182.5, 131.5);
        pdf.rect(181, 133, 4, 4, 'S'); pdf.text('', 182.5, 135.5);
        pdf.rect(185, 125, 20, 4, 'S'); pdf.text('', 186.5, 127.5);
        pdf.rect(185, 129, 20, 4, 'S'); pdf.text('', 186.5, 131.5);
        pdf.rect(185, 133, 20, 4, 'S'); pdf.text('', 186.5, 135.5);

        // linea 9
        pdf.rect(5, 137, 5, 20, 'S');pdf.text('15', 6.5, 139.5);
        pdf.rect(10, 137, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 139.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 139.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 139.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 143.5);
        pdf.rect(10, 145, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 145, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 149, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 153, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 145, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 151, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 145, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 151, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 145, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 145, 5, 4, 'S'); pdf.text('A', 73, 147.5);
        pdf.rect(71, 149, 5, 4, 'S'); pdf.text('M', 73, 151.5);
        pdf.rect(71, 153, 5, 4, 'S'); pdf.text('D', 73, 155.5);
        pdf.rect(76, 145, 6, 6, 'S'); pdf.text('M', 78, 147.5);
        pdf.rect(76, 151, 6, 6, 'S'); pdf.text('F', 78, 153.5);
        pdf.rect(82, 145, 5, 6, 'S'); pdf.text('PC', 83, 147.5);
        pdf.rect(82, 151, 5, 6, 'S'); pdf.text('Pab', 83, 153.5);
        pdf.rect(87, 145, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 151, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 145, 6, 4, 'S'); pdf.text('PESO', 92.5, 147.5);
        pdf.rect(92, 149, 6, 4, 'S'); pdf.text('TALLA', 92.3, 151.5);
        pdf.rect(92, 153, 6, 4, 'S'); pdf.text('Hb', 94, 155.5);
        pdf.rect(98, 145, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 149, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 153, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 145, 5, 4, 'S'); pdf.text('N', 105.5, 147.5);
        pdf.rect(104, 149, 5, 4, 'S'); pdf.text('C', 105.5, 151.5);
        pdf.rect(104, 153, 5, 4, 'S'); pdf.text('R', 105.5, 155.5);
        pdf.rect(109, 145, 5, 4, 'S'); pdf.text('N', 111, 147.5);
        pdf.rect(109, 149, 5, 4, 'S'); pdf.text('C', 111, 151.5);
        pdf.rect(109, 153, 5, 4, 'S'); pdf.text('R', 111, 155.5);
        pdf.rect(114, 145, 47, 4, 'S'); pdf.text('1', 114.5, 147.5);
        pdf.rect(114, 149, 47, 4, 'S'); pdf.text('2', 114.5, 151.5);
        pdf.rect(114, 153, 47, 4, 'S'); pdf.text('3', 114.5, 155.5);
        pdf.rect(161, 145, 4, 4, 'S'); pdf.text('P', 162.5, 147.5);
        pdf.rect(161, 149, 4, 4, 'S'); pdf.text('P', 162.5, 151.5);
        pdf.rect(161, 153, 4, 4, 'S'); pdf.text('P', 162.5, 155.5);
        pdf.rect(165, 145, 4, 4, 'S'); pdf.text('D', 166.5, 147.5);
        pdf.rect(165, 149, 4, 4, 'S'); pdf.text('D', 166.5, 151.5);
        pdf.rect(165, 153, 4, 4, 'S'); pdf.text('D', 166.5, 155.5);
        pdf.rect(169, 145, 4, 4, 'S'); pdf.text('R', 170.5, 147.5);
        pdf.rect(169, 149, 4, 4, 'S'); pdf.text('R', 170.5, 151.5);
        pdf.rect(169, 153, 4, 4, 'S'); pdf.text('R', 170.5, 155.5);
        pdf.rect(173, 145, 4, 4, 'S'); pdf.text('', 174.5, 147.5);
        pdf.rect(173, 149, 4, 4, 'S'); pdf.text('', 174.5, 151.5);
        pdf.rect(173, 153, 4, 4, 'S'); pdf.text('', 174.5, 155.5);
        pdf.rect(177, 145, 4, 4, 'S'); pdf.text('', 178.5, 147.5);
        pdf.rect(177, 149, 4, 4, 'S'); pdf.text('', 178.5, 151.5);
        pdf.rect(177, 153, 4, 4, 'S'); pdf.text('', 178.5, 155.5);
        pdf.rect(181, 145, 4, 4, 'S'); pdf.text('', 182.5, 147.5);
        pdf.rect(181, 149, 4, 4, 'S'); pdf.text('', 182.5, 151.5);
        pdf.rect(181, 153, 4, 4, 'S'); pdf.text('', 182.5, 155.5);
        pdf.rect(185, 145, 20, 4, 'S'); pdf.text('', 186.5, 147.5);
        pdf.rect(185, 149, 20, 4, 'S'); pdf.text('', 186.5, 151.5);
        pdf.rect(185, 153, 20, 4, 'S'); pdf.text('', 186.5, 155.5);

        // linea 10
        pdf.rect(5, 157, 5, 20, 'S');pdf.text('16', 6.5, 159.5);
        pdf.rect(10, 157, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 159.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 159.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 159.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 163.5);
        pdf.rect(10, 165, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 165, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 169, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 173, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 165, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 171, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 165, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 171, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 165, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 165, 5, 4, 'S'); pdf.text('A', 73, 167.5);
        pdf.rect(71, 169, 5, 4, 'S'); pdf.text('M', 73, 171.5);
        pdf.rect(71, 173, 5, 4, 'S'); pdf.text('D', 73, 175.5);
        pdf.rect(76, 165, 6, 6, 'S'); pdf.text('M', 78, 167.5);
        pdf.rect(76, 171, 6, 6, 'S'); pdf.text('F', 78, 173.5);
        pdf.rect(82, 165, 5, 6, 'S'); pdf.text('PC', 83, 167.5);
        pdf.rect(82, 171, 5, 6, 'S'); pdf.text('Pab', 83, 173.5);
        pdf.rect(87, 165, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 171, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 165, 6, 4, 'S'); pdf.text('PESO', 92.5, 167.5);
        pdf.rect(92, 169, 6, 4, 'S'); pdf.text('TALLA', 92.3, 171.5);
        pdf.rect(92, 173, 6, 4, 'S'); pdf.text('Hb', 94, 175.5);
        pdf.rect(98, 165, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 169, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 173, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 165, 5, 4, 'S'); pdf.text('N', 105.5, 167.5);
        pdf.rect(104, 169, 5, 4, 'S'); pdf.text('C', 105.5, 171.5);
        pdf.rect(104, 173, 5, 4, 'S'); pdf.text('R', 105.5, 175.5);
        pdf.rect(109, 165, 5, 4, 'S'); pdf.text('N', 111, 167.5);
        pdf.rect(109, 169, 5, 4, 'S'); pdf.text('C', 111, 171.5);
        pdf.rect(109, 173, 5, 4, 'S'); pdf.text('R', 111, 175.5);
        pdf.rect(114, 165, 47, 4, 'S'); pdf.text('1', 114.5, 167.5);
        pdf.rect(114, 169, 47, 4, 'S'); pdf.text('2', 114.5, 171.5);
        pdf.rect(114, 173, 47, 4, 'S'); pdf.text('3', 114.5, 175.5);
        pdf.rect(161, 165, 4, 4, 'S'); pdf.text('P', 162.5, 167.5);
        pdf.rect(161, 169, 4, 4, 'S'); pdf.text('P', 162.5, 171.5);
        pdf.rect(161, 173, 4, 4, 'S'); pdf.text('P', 162.5, 175.5);
        pdf.rect(165, 165, 4, 4, 'S'); pdf.text('D', 166.5, 167.5);
        pdf.rect(165, 169, 4, 4, 'S'); pdf.text('D', 166.5, 171.5);
        pdf.rect(165, 173, 4, 4, 'S'); pdf.text('D', 166.5, 175.5);
        pdf.rect(169, 165, 4, 4, 'S'); pdf.text('R', 170.5, 167.5);
        pdf.rect(169, 169, 4, 4, 'S'); pdf.text('R', 170.5, 171.5);
        pdf.rect(169, 173, 4, 4, 'S'); pdf.text('R', 170.5, 175.5);
        pdf.rect(173, 165, 4, 4, 'S'); pdf.text('', 174.5, 167.5);
        pdf.rect(173, 169, 4, 4, 'S'); pdf.text('', 174.5, 171.5);
        pdf.rect(173, 173, 4, 4, 'S'); pdf.text('', 174.5, 175.5);
        pdf.rect(177, 165, 4, 4, 'S'); pdf.text('', 178.5, 167.5);
        pdf.rect(177, 169, 4, 4, 'S'); pdf.text('', 178.5, 171.5);
        pdf.rect(177, 173, 4, 4, 'S'); pdf.text('', 178.5, 175.5);
        pdf.rect(181, 165, 4, 4, 'S'); pdf.text('', 182.5, 167.5);
        pdf.rect(181, 169, 4, 4, 'S'); pdf.text('', 182.5, 171.5);
        pdf.rect(181, 173, 4, 4, 'S'); pdf.text('', 182.5, 175.5);
        pdf.rect(185, 165, 20, 4, 'S'); pdf.text('', 186.5, 167.5);
        pdf.rect(185, 169, 20, 4, 'S'); pdf.text('', 186.5, 171.5);
        pdf.rect(185, 173, 20, 4, 'S'); pdf.text('', 186.5, 175.5);

        // linea 11
        pdf.rect(5, 177, 5, 20, 'S');pdf.text('17', 6.5, 179.5);
        pdf.rect(10, 177, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 179.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 179.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 179.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 183.5);
        pdf.rect(10, 185, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 185, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 189, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 193, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 185, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 191, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 185, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 191, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 185, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 185, 5, 4, 'S'); pdf.text('A', 73, 187.5);
        pdf.rect(71, 189, 5, 4, 'S'); pdf.text('M', 73, 191.5);
        pdf.rect(71, 193, 5, 4, 'S'); pdf.text('D', 73, 195.5);
        pdf.rect(76, 185, 6, 6, 'S'); pdf.text('M', 78, 187.5);
        pdf.rect(76, 191, 6, 6, 'S'); pdf.text('F', 78, 193.5);
        pdf.rect(82, 185, 5, 6, 'S'); pdf.text('PC', 83, 187.5);
        pdf.rect(82, 191, 5, 6, 'S'); pdf.text('Pab', 83, 193.5);
        pdf.rect(87, 185, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 191, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 185, 6, 4, 'S'); pdf.text('PESO', 92.5, 187.5);
        pdf.rect(92, 189, 6, 4, 'S'); pdf.text('TALLA', 92.3, 191.5);
        pdf.rect(92, 193, 6, 4, 'S'); pdf.text('Hb', 94, 195.5);
        pdf.rect(98, 185, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 189, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 193, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 185, 5, 4, 'S'); pdf.text('N', 105.5, 187.5);
        pdf.rect(104, 189, 5, 4, 'S'); pdf.text('C', 105.5, 191.5);
        pdf.rect(104, 193, 5, 4, 'S'); pdf.text('R', 105.5, 195.5);
        pdf.rect(109, 185, 5, 4, 'S'); pdf.text('N', 111, 187.5);
        pdf.rect(109, 189, 5, 4, 'S'); pdf.text('C', 111, 191.5);
        pdf.rect(109, 193, 5, 4, 'S'); pdf.text('R', 111, 195.5);
        pdf.rect(114, 185, 47, 4, 'S'); pdf.text('1', 114.5, 187.5);
        pdf.rect(114, 189, 47, 4, 'S'); pdf.text('2', 114.5, 191.5);
        pdf.rect(114, 193, 47, 4, 'S'); pdf.text('3', 114.5, 195.5);
        pdf.rect(161, 185, 4, 4, 'S'); pdf.text('P', 162.5, 187.5);
        pdf.rect(161, 189, 4, 4, 'S'); pdf.text('P', 162.5, 191.5);
        pdf.rect(161, 193, 4, 4, 'S'); pdf.text('P', 162.5, 195.5);
        pdf.rect(165, 185, 4, 4, 'S'); pdf.text('D', 166.5, 187.5);
        pdf.rect(165, 189, 4, 4, 'S'); pdf.text('D', 166.5, 191.5);
        pdf.rect(165, 193, 4, 4, 'S'); pdf.text('D', 166.5, 195.5);
        pdf.rect(169, 185, 4, 4, 'S'); pdf.text('R', 170.5, 187.5);
        pdf.rect(169, 189, 4, 4, 'S'); pdf.text('R', 170.5, 191.5);
        pdf.rect(169, 193, 4, 4, 'S'); pdf.text('R', 170.5, 195.5);
        pdf.rect(173, 185, 4, 4, 'S'); pdf.text('', 174.5, 187.5);
        pdf.rect(173, 189, 4, 4, 'S'); pdf.text('', 174.5, 191.5);
        pdf.rect(173, 193, 4, 4, 'S'); pdf.text('', 174.5, 195.5);
        pdf.rect(177, 185, 4, 4, 'S'); pdf.text('', 178.5, 187.5);
        pdf.rect(177, 189, 4, 4, 'S'); pdf.text('', 178.5, 191.5);
        pdf.rect(177, 193, 4, 4, 'S'); pdf.text('', 178.5, 195.5);
        pdf.rect(181, 185, 4, 4, 'S'); pdf.text('', 182.5, 187.5);
        pdf.rect(181, 189, 4, 4, 'S'); pdf.text('', 182.5, 191.5);
        pdf.rect(181, 193, 4, 4, 'S'); pdf.text('', 182.5, 195.5);
        pdf.rect(185, 185, 20, 4, 'S'); pdf.text('', 186.5, 187.5);
        pdf.rect(185, 189, 20, 4, 'S'); pdf.text('', 186.5, 191.5);
        pdf.rect(185, 193, 20, 4, 'S'); pdf.text('', 186.5, 195.5);

        // linea 12
        pdf.rect(5, 197, 5, 20, 'S');pdf.text('18', 6.5, 199.5);
        pdf.rect(10, 197, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 199.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 199.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 199.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 203.5);
        pdf.rect(10, 205, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 205, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 209, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 213, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 205, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 211, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 205, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 211, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 205, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 205, 5, 4, 'S'); pdf.text('A', 73, 207.5);
        pdf.rect(71, 209, 5, 4, 'S'); pdf.text('M', 73, 211.5);
        pdf.rect(71, 213, 5, 4, 'S'); pdf.text('D', 73, 215.5);
        pdf.rect(76, 205, 6, 6, 'S'); pdf.text('M', 78, 207.5);
        pdf.rect(76, 211, 6, 6, 'S'); pdf.text('F', 78, 213.5);
        pdf.rect(82, 205, 5, 6, 'S'); pdf.text('PC', 83, 207.5);
        pdf.rect(82, 211, 5, 6, 'S'); pdf.text('Pab', 83, 213.5);
        pdf.rect(87, 205, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 211, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 205, 6, 4, 'S'); pdf.text('PESO', 92.5, 207.5);
        pdf.rect(92, 209, 6, 4, 'S'); pdf.text('TALLA', 92.3, 211.5);
        pdf.rect(92, 213, 6, 4, 'S'); pdf.text('Hb', 94, 215.5);
        pdf.rect(98, 205, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 209, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 213, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 205, 5, 4, 'S'); pdf.text('N', 105.5, 207.5);
        pdf.rect(104, 209, 5, 4, 'S'); pdf.text('C', 105.5, 211.5);
        pdf.rect(104, 213, 5, 4, 'S'); pdf.text('R', 105.5, 215.5);
        pdf.rect(109, 205, 5, 4, 'S'); pdf.text('N', 111, 207.5);
        pdf.rect(109, 209, 5, 4, 'S'); pdf.text('C', 111, 211.5);
        pdf.rect(109, 213, 5, 4, 'S'); pdf.text('R', 111, 215.5);
        pdf.rect(114, 205, 47, 4, 'S'); pdf.text('1', 114.5, 207.5);
        pdf.rect(114, 209, 47, 4, 'S'); pdf.text('2', 114.5, 211.5);
        pdf.rect(114, 213, 47, 4, 'S'); pdf.text('3', 114.5, 215.5);
        pdf.rect(161, 205, 4, 4, 'S'); pdf.text('P', 162.5, 207.5);
        pdf.rect(161, 209, 4, 4, 'S'); pdf.text('P', 162.5, 211.5);
        pdf.rect(161, 213, 4, 4, 'S'); pdf.text('P', 162.5, 215.5);
        pdf.rect(165, 205, 4, 4, 'S'); pdf.text('D', 166.5, 207.5);
        pdf.rect(165, 209, 4, 4, 'S'); pdf.text('D', 166.5, 211.5);
        pdf.rect(165, 213, 4, 4, 'S'); pdf.text('D', 166.5, 215.5);
        pdf.rect(169, 205, 4, 4, 'S'); pdf.text('R', 170.5, 207.5);
        pdf.rect(169, 209, 4, 4, 'S'); pdf.text('R', 170.5, 211.5);
        pdf.rect(169, 213, 4, 4, 'S'); pdf.text('R', 170.5, 215.5);
        pdf.rect(173, 205, 4, 4, 'S'); pdf.text('', 174.5, 207.5);
        pdf.rect(173, 209, 4, 4, 'S'); pdf.text('', 174.5, 211.5);
        pdf.rect(173, 213, 4, 4, 'S'); pdf.text('', 174.5, 215.5);
        pdf.rect(177, 205, 4, 4, 'S'); pdf.text('', 178.5, 207.5);
        pdf.rect(177, 209, 4, 4, 'S'); pdf.text('', 178.5, 211.5);
        pdf.rect(177, 213, 4, 4, 'S'); pdf.text('', 178.5, 215.5);
        pdf.rect(181, 205, 4, 4, 'S'); pdf.text('', 182.5, 207.5);
        pdf.rect(181, 209, 4, 4, 'S'); pdf.text('', 182.5, 211.5);
        pdf.rect(181, 213, 4, 4, 'S'); pdf.text('', 182.5, 215.5);
        pdf.rect(185, 205, 20, 4, 'S'); pdf.text('', 186.5, 207.5);
        pdf.rect(185, 209, 20, 4, 'S'); pdf.text('', 186.5, 211.5);
        pdf.rect(185, 213, 20, 4, 'S'); pdf.text('', 186.5, 215.5);

        // linea 13
        pdf.rect(5, 217, 5, 20, 'S');pdf.text('19', 6.5, 219.5);
        pdf.rect(10, 217, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 219.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 219.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 219.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 223.5);
        pdf.rect(10, 225, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 225, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 229, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 233, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 225, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 231, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 225, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 231, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 225, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 225, 5, 4, 'S'); pdf.text('A', 73, 227.5);
        pdf.rect(71, 229, 5, 4, 'S'); pdf.text('M', 73, 231.5);
        pdf.rect(71, 233, 5, 4, 'S'); pdf.text('D', 73, 235.5);
        pdf.rect(76, 225, 6, 6, 'S'); pdf.text('M', 78, 227.5);
        pdf.rect(76, 231, 6, 6, 'S'); pdf.text('F', 78, 233.5);
        pdf.rect(82, 225, 5, 6, 'S'); pdf.text('PC', 83, 227.5);
        pdf.rect(82, 231, 5, 6, 'S'); pdf.text('Pab', 83, 233.5);
        pdf.rect(87, 225, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 231, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 225, 6, 4, 'S'); pdf.text('PESO', 92.5, 227.5);
        pdf.rect(92, 229, 6, 4, 'S'); pdf.text('TALLA', 92.3, 231.5);
        pdf.rect(92, 233, 6, 4, 'S'); pdf.text('Hb', 94, 235.5);
        pdf.rect(98, 225, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 229, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 233, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 225, 5, 4, 'S'); pdf.text('N', 105.5, 227.5);
        pdf.rect(104, 229, 5, 4, 'S'); pdf.text('C', 105.5, 231.5);
        pdf.rect(104, 233, 5, 4, 'S'); pdf.text('R', 105.5, 235.5);
        pdf.rect(109, 225, 5, 4, 'S'); pdf.text('N', 111, 227.5);
        pdf.rect(109, 229, 5, 4, 'S'); pdf.text('C', 111, 231.5);
        pdf.rect(109, 233, 5, 4, 'S'); pdf.text('R', 111, 235.5);
        pdf.rect(114, 225, 47, 4, 'S'); pdf.text('1', 114.5, 227.5);
        pdf.rect(114, 229, 47, 4, 'S'); pdf.text('2', 114.5, 231.5);
        pdf.rect(114, 233, 47, 4, 'S'); pdf.text('3', 114.5, 235.5);
        pdf.rect(161, 225, 4, 4, 'S'); pdf.text('P', 162.5, 227.5);
        pdf.rect(161, 229, 4, 4, 'S'); pdf.text('P', 162.5, 231.5);
        pdf.rect(161, 233, 4, 4, 'S'); pdf.text('P', 162.5, 235.5);
        pdf.rect(165, 225, 4, 4, 'S'); pdf.text('D', 166.5, 227.5);
        pdf.rect(165, 229, 4, 4, 'S'); pdf.text('D', 166.5, 231.5);
        pdf.rect(165, 233, 4, 4, 'S'); pdf.text('D', 166.5, 235.5);
        pdf.rect(169, 225, 4, 4, 'S'); pdf.text('R', 170.5, 227.5);
        pdf.rect(169, 229, 4, 4, 'S'); pdf.text('R', 170.5, 231.5);
        pdf.rect(169, 233, 4, 4, 'S'); pdf.text('R', 170.5, 235.5);
        pdf.rect(173, 225, 4, 4, 'S'); pdf.text('', 174.5, 227.5);
        pdf.rect(173, 229, 4, 4, 'S'); pdf.text('', 174.5, 231.5);
        pdf.rect(173, 233, 4, 4, 'S'); pdf.text('', 174.5, 235.5);
        pdf.rect(177, 225, 4, 4, 'S'); pdf.text('', 178.5, 227.5);
        pdf.rect(177, 229, 4, 4, 'S'); pdf.text('', 178.5, 221.5);
        pdf.rect(177, 233, 4, 4, 'S'); pdf.text('', 178.5, 235.5);
        pdf.rect(181, 225, 4, 4, 'S'); pdf.text('', 182.5, 227.5);
        pdf.rect(181, 229, 4, 4, 'S'); pdf.text('', 182.5, 231.5);
        pdf.rect(181, 233, 4, 4, 'S'); pdf.text('', 182.5, 235.5);
        pdf.rect(185, 225, 20, 4, 'S'); pdf.text('', 186.5, 227.5);
        pdf.rect(185, 229, 20, 4, 'S'); pdf.text('', 186.5, 231.5);
        pdf.rect(185, 233, 20, 4, 'S'); pdf.text('', 186.5, 235.5);

        // linea 14
        pdf.rect(5, 237, 5, 20, 'S');pdf.text('20', 6.5, 239.5);
        pdf.rect(10, 237, 195, 8, 'S');
        pdf.text('FECHA DE NACIMIENTO: ', 12, 239.5); pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 239.5); pdf.text('FECHA DE ULTIMA REGLA: ', 145, 239.5);
        pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 243.5);
        pdf.rect(10, 245, 7, 12, 'S'); // para poner el dia - falta el texto
        pdf.rect(17, 245, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 249, 21, 4, 'S'); //falta el texto
        pdf.rect(17, 253, 21, 4, 'S'); //falta el texto
        pdf.rect(38, 245, 7, 6, 'S'); //falta el texto
        pdf.rect(38, 251, 7, 6, 'S'); //falta el texto
        pdf.rect(45, 245, 21, 6, 'S'); //falta el texto
        pdf.rect(45, 251, 21, 6, 'S'); //falta el texto
        pdf.rect(66, 245, 5, 12, 'S'); //falta el texto
        pdf.rect(71, 245, 5, 4, 'S'); pdf.text('A', 73, 247.5);
        pdf.rect(71, 249, 5, 4, 'S'); pdf.text('M', 73, 251.5);
        pdf.rect(71, 253, 5, 4, 'S'); pdf.text('D', 73, 255.5);
        pdf.rect(76, 245, 6, 6, 'S'); pdf.text('M', 78, 247.5);
        pdf.rect(76, 251, 6, 6, 'S'); pdf.text('F', 78, 253.5);
        pdf.rect(82, 245, 5, 6, 'S'); pdf.text('PC', 83, 247.5);
        pdf.rect(82, 251, 5, 6, 'S'); pdf.text('Pab', 83, 253.5);
        pdf.rect(87, 245, 5, 6, 'S'); //falta el texto
        pdf.rect(87, 251, 5, 6, 'S'); //falta el texto
        pdf.rect(92, 245, 6, 4, 'S'); pdf.text('PESO', 92.5, 247.5);
        pdf.rect(92, 249, 6, 4, 'S'); pdf.text('TALLA', 92.3, 251.5);
        pdf.rect(92, 253, 6, 4, 'S'); pdf.text('Hb', 94, 255.5);
        pdf.rect(98, 245, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 249, 6, 4, 'S'); //falta el texto
        pdf.rect(98, 253, 6, 4, 'S'); //falta el texto
        pdf.rect(104, 245, 5, 4, 'S'); pdf.text('N', 105.5, 247.5);
        pdf.rect(104, 249, 5, 4, 'S'); pdf.text('C', 105.5, 251.5);
        pdf.rect(104, 253, 5, 4, 'S'); pdf.text('R', 105.5, 255.5);
        pdf.rect(109, 245, 5, 4, 'S'); pdf.text('N', 111, 247.5);
        pdf.rect(109, 249, 5, 4, 'S'); pdf.text('C', 111, 251.5);
        pdf.rect(109, 253, 5, 4, 'S'); pdf.text('R', 111, 255.5);
        pdf.rect(114, 245, 47, 4, 'S'); pdf.text('1', 114.5, 247.5);
        pdf.rect(114, 249, 47, 4, 'S'); pdf.text('2', 114.5, 251.5);
        pdf.rect(114, 253, 47, 4, 'S'); pdf.text('3', 114.5, 255.5);
        pdf.rect(161, 245, 4, 4, 'S'); pdf.text('P', 162.5, 247.5);
        pdf.rect(161, 249, 4, 4, 'S'); pdf.text('P', 162.5, 251.5);
        pdf.rect(161, 253, 4, 4, 'S'); pdf.text('P', 162.5, 255.5);
        pdf.rect(165, 245, 4, 4, 'S'); pdf.text('D', 166.5, 247.5);
        pdf.rect(165, 249, 4, 4, 'S'); pdf.text('D', 166.5, 251.5);
        pdf.rect(165, 253, 4, 4, 'S'); pdf.text('D', 166.5, 255.5);
        pdf.rect(169, 245, 4, 4, 'S'); pdf.text('R', 170.5, 247.5);
        pdf.rect(169, 249, 4, 4, 'S'); pdf.text('R', 170.5, 251.5);
        pdf.rect(169, 253, 4, 4, 'S'); pdf.text('R', 170.5, 255.5);
        pdf.rect(173, 245, 4, 4, 'S'); pdf.text('', 174.5, 247.5);
        pdf.rect(173, 249, 4, 4, 'S'); pdf.text('', 174.5, 251.5);
        pdf.rect(173, 253, 4, 4, 'S'); pdf.text('', 174.5, 255.5);
        pdf.rect(177, 245, 4, 4, 'S'); pdf.text('', 178.5, 247.5);
        pdf.rect(177, 249, 4, 4, 'S'); pdf.text('', 178.5, 251.5);
        pdf.rect(177, 253, 4, 4, 'S'); pdf.text('', 178.5, 255.5);
        pdf.rect(181, 245, 4, 4, 'S'); pdf.text('', 182.5, 247.5);
        pdf.rect(181, 249, 4, 4, 'S'); pdf.text('', 182.5, 251.5);
        pdf.rect(181, 253, 4, 4, 'S'); pdf.text('', 182.5, 255.5);
        pdf.rect(185, 245, 20, 4, 'S'); pdf.text('', 186.5, 247.5);
        pdf.rect(185, 249, 20, 4, 'S'); pdf.text('', 186.5, 251.5);
        pdf.rect(185, 253, 20, 4, 'S'); pdf.text('', 186.5, 255.5);

        // FIN DE CONTENIDO

        // PIE DE CONTENIDO
        pdf.rect(5, 257, 63, 6, 'S'); pdf.text('ITEM 09: FINANCIADOR DE SALUD', 25, 261);
        pdf.rect(68, 257, 27, 6, 'S'); pdf.text('ITEM 12', 78, 261);
        pdf.rect(95, 257, 20, 6, 'S'); pdf.text('ITEM 16', 100, 261);
        pdf.rect(115, 257, 42, 6, 'S'); pdf.text('ITEM 17 y 18 (CONDICION DE INGRESO)', 117, 261);
        pdf.rect(157, 257, 48, 6, 'S'); pdf.text('FECHA DE ULTIMA REGLA', 167, 261);

        pdf.rect(5, 263, 63, 13, 'S');
        pdf.text('1 USUARIO', 6, 266); pdf.text('2 SEGURO INTEGRAL (SIS)', 6, 269.5); pdf.text('3 ESSALUD', 6, 273);
        pdf.text('4 SOAT', 33, 266); pdf.text('4 SANIDAD FAP', 33, 269.5); pdf.text('5 SANIDAD NAVAL', 33, 273);
        pdf.text('10 OTROS', 52, 266); pdf.text('11 EXONERADO', 52, 269.5);

        pdf.rect(68, 263, 27, 13, 'S'); pdf.text('Registrar el nombre del Centro', 69.5, 266); pdf.text('Poblado', 78, 269);
        pdf.rect(95, 263, 20, 13, 'S'); pdf.text('PESO = kg', 96.5, 266); pdf.text('TALLA = Cm', 96.5, 269); pdf.text('Hb = Valor', 96.5, 272);
        pdf.rect(115, 263, 42, 13, 'S'); pdf.text('N= PACIENTE NUEVO (1ER VEZ EN SU VIDA)', 116, 266); pdf.text('C= PACIENTE CONTINUADOR EN EL AÑO', 116, 269); pdf.text('R= PACIENTE REINGRESANTE EN EL AÑO', 116, 272);
        pdf.rect(157, 263, 48, 13, 'S'); pdf.text('Si no se cuenta con el dato se registrará la fecha de la', 158, 266); pdf.text('primera ecografia', 175, 269);

        pdf.rect(5, 276, 19, 6, 'S'); pdf.text('58 MESTIZO', 6, 279);
        pdf.rect(24, 276, 18, 6, 'S'); pdf.text('26 CULINA', 25, 279);
        pdf.rect(42, 276, 28, 6, 'S'); pdf.text('10 CASHINAHUA', 43, 279);
        pdf.rect(70, 276, 30, 6, 'S'); pdf.text('05 ASHANINKA', 72, 279);
        pdf.rect(100, 276, 30, 6, 'S'); pdf.text('53 YAMINAHUA', 102, 279);
        pdf.rect(130, 276, 28, 6, 'S'); pdf.text('55 YIN - YAMI (PIRO)', 132, 279);
        pdf.rect(158, 276, 17, 6, 'S'); pdf.text('21 KAKATAIBO', 158.5, 279);
        pdf.rect(175, 276, 15, 6, 'S'); pdf.text('40 QUECHUAS', 176, 279);
        pdf.rect(190, 276, 15, 6, 'S'); pdf.text('07 AWAJUN', 191.5, 279);

        pdf.rect(5, 282, 19, 6, 'S'); pdf.text('45 SHIPIBO-CONIBO', 5.5, 285);
        pdf.rect(24, 282, 18, 6, 'S'); pdf.text('18 ISCONAHUA', 25, 285);
        pdf.rect(42, 282, 28, 6, 'S'); pdf.text('43 SHARANAHUA', 43, 285);
        pdf.rect(70, 282, 30, 6, 'S'); pdf.text('32 MACHIGUENGA', 71, 285);
        pdf.rect(100, 282, 30, 6, 'S'); pdf.text('3 AMANAHUACA', 101, 285);
        pdf.rect(130, 282, 28, 6, 'S'); pdf.text('54 YANESHA (AMUESHA)', 131, 285);
        pdf.rect(158, 282, 17, 6, 'S'); pdf.text('30 MASTANAHUA', 158.5, 285);
        pdf.rect(175, 282, 15, 6, 'S'); pdf.text('51 WAMPIS', 176, 285);
        pdf.rect(190, 282, 15, 6, 'S'); pdf.text('02 AIMARA', 191, 285);
        // FIN DE PIE DE CONTENIDO

        pdf.save('actividadesHis.pdf');
    }

    $scope.inicio();
    $scope.listarEstablecimientosRegistros();

});

