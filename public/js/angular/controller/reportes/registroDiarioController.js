/**
 * Created by User on 18/11/2021.
 */




app.controller('registroDiarioController', function ($scope,$http,$timeout,accesorioService,profesionalService,actividadesHisService, DTOptionsBuilder){
    
    $scope.totales = {};
    $scope.cantidad = {};
    $scope.filtro = {};
    

    $scope.lista=[];
    $scope.lista_establecimientoshis = [];
    $scope.lista_profesionales=[];

    $scope.lista_pacientes = [];
    $scope.datos=[];
    $scope.contenido=[]

    $scope.habilitarBoton=0;

    $scope.listarEstablecimientosHis = function () {
        accesorioService.listarEstablecimientosAtencion({}).success(function (data) {
            $scope.lista_establecimientoshis = data;
        });
    }
    
    $scope.listaprofesionales = function (){
        
        if($("#cmbCod_2000Buscar").val() !== ""){
            profesionalService. listarProfesionalByTipo({cod_2000: $scope.filtro.cod_2000, tipo_profesional:$scope.filtro.tipo_profesional }).success(function(data){
                $scope.lista_profesionales = data;
                $timeout(function(){
                    $("#cmbProfesionalBuscar").val("").change();
                }, 0);
            });
        }
    }

    $scope.inicio = function () {
        let fecha = new Date();
        $scope.pdf = new jsPDF("p","mm","a4");
        $scope.filtro.fecha_inicio = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();

        
        
        //$scope.filtro.fecha_final = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();
        
        $scope.filtro.tipo_servicio = 'EMERGENCIA';
        
        $scope.filtro.tipo_profesional = 'MEDICO';
        $scope.filtro.estado_impresion = 0;
        $timeout(function () {
            $("#cmbProfesionalBuscar").val("").change();
        }, 0);
        
        
    }

    //capturando fechas
    
    $scope.getDateInicio =function(){
        let hoy=new Date();
        $scope.hoy = ('0'+hoy.getDate()).toString().substr(-2)+'/'+('0'+(hoy.getMonth()+1)).toString().substr(-2)+'/'+hoy.getFullYear();

        const fecha_actual = ( $scope.hoy).split("/");
        
        
        $scope.filtro.fecha_final=null
        const fecha_inicio = ($scope.filtro.fecha_inicio).split("/");
        //condicion para q la fecha de inicio no sea mayor a la fecha actual
        if(fecha_inicio[0]>fecha_actual[0] || fecha_inicio[1]>fecha_actual[1] || fecha_inicio[2]>fecha_actual[2] ){
            $scope.filtro.fecha_inicio=null;

            swal("Error!", "Ocurrio un Error interno!", {
                icon : "error",
                buttons: {
                    confirm: {
                        className : 'btn btn-danger'
                    }
                },
            });
        }
        
        let fecha = new Date(fecha_inicio[2],(fecha_inicio[1]-1),fecha_inicio[0]);
        var ultimoDia = new Date(fecha.getFullYear(), (fecha.getMonth() + 1), 0);  
        $scope.filtro.fecha_final = ('0'+ultimoDia.getDate()).toString().substr(-2)+'/'+('0'+(ultimoDia.getMonth()+1)).toString().substr(-2)+'/'+ultimoDia.getFullYear();
        
        
        
    }

    $scope.fecha_final = function(){
        let hoy=new Date();
        $scope.hoy = ('0'+hoy.getDate()).toString().substr(-2)+'/'+('0'+(hoy.getMonth()+1)).toString().substr(-2)+'/'+hoy.getFullYear();

        const fecha_actual = ( $scope.hoy).split("/");

        const fecha_inicio = ($scope.filtro.fecha_inicio).split("/");

        const fecha_final =($scope.filtro.fecha_final).split("/");
        
        //condicion para q la fecha final no bede ser menor a la fecha inicial
    
        if(fecha_final[0]<fecha_inicio[0] ||fecha_final[1]<fecha_inicio[1] || fecha_final[2]<fecha_inicio[2]){
            $scope.filtro.fecha_final=null
            swal("Error!", "Ocurrio un Error interno!", {
                icon : "error",
                buttons: {
                    confirm: {
                        className : 'btn btn-danger'
                    }
                },
            });
        }
        //condicion para q la fecha final no pase del mes
        if(fecha_final[1]>fecha_inicio[1] || fecha_final[2]>fecha_inicio[2]){
            $scope.filtro.fecha_final=null
            swal("Error!", "Ocurrio un Error interno!", {
                icon : "error",
                buttons: {
                    confirm: {
                        className : 'btn btn-danger'
                    }
                },
            });
        }
        //la fecha final no puede ser mayor a la fecha actual
        if(fecha_final[0]>fecha_actual[0] ||fecha_final[1]>fecha_actual[1] || fecha_final[2]>fecha_actual[2]){
            $scope.filtro.fecha_final=null
            swal("Error!", "Ocurrio un Error interno!", {
                icon : "error",
                buttons: {
                    confirm: {
                        className : 'btn btn-danger'
                    }
                },
            });
        }
        
    }

    $scope.buscar = function(){

        let valid = validar_campo(['#cmbCod_2000Buscar' ,'#cmbProfesionalBuscar','#fecha_iniciotxt','#fecha_finaltxt']);
        
        if(valid ){


            $("#lista_bloqueoDiv").block({message: '<center><i class="flaticon-settings"> Espere....</i></center>'});
            actividadesHisService.listarActividadesHis($scope.filtro).success(function (data) {
                $scope.lista = data;
                //console.log($scope.lista)
                //$scope.implementacionHis();
                
                $("#lista_bloqueoDiv").unblock();
            });
            
           
        }else{
            $.notify({
                title: 'ERROR',
                message: 'Campos Obligatorios (*)',
            },{
                type: 'danger',
                placement: {
                    from: "bottom",
                    align: "right"
                },
                time: 1000,
            });
  
            
        }  
    }

    $scope.implementacionHis = function(){
        actividadesHisService.imprimirHis({lista:$scope.lista, filtro: $scope.filtro}).success(function(data){
            $scope.prepararImpresion(data);
        })
    }
    
    $scope.prepararImpresion = function(data){
        var pdf = new jsPDF("p","mm","a4");

        const paciente_temp = {nombres_paciente: "", nro_documento: "", fecha_nacimiento: "", hc: "", fecha_atencion: "", distrito_procedencia: "", idetnia: "", idfinanciador: "", edad: "", tipo_edad: "", peso: "", sexo: "", talla: "", nro_atencion: ""};
        const atenciones_temp = {codigo_cie: "", condicion_establecimiento: "", condicion_servicio: "", descripcion_cie: "", item: "", lab1: "", lab2: "", lab3: "", tipodianostico: ""};

        let validarPag=[];
        let paginas = data.items/10;
        let decimal = paginas%1;
        let pag = Math.round(paginas);
        let indice = 0;
        let cont = 1;
        let alto_rect = 0;
        let alto_text= 0;

        let data_actividades = [];

        if(decimal < 0.5){
            pag++;
        }

        let p = 1;
        for(let i = 0; i < pag; i++){
            validarPag[i] = p;
            p++;
        }

        for(let i = 0; i < pag; i++){
            
            if(validarPag[i]%2!=0){
                alto_rect = 61;
                alto_text= 63.5;
                $scope.cabecera1(pdf);
                $scope.primerasLineas1(pdf, data);
                for(let j = 0; j < 10; j++) {
                    let indice_act = 0;
                    let data_paciente = data.paciente.length>indice?data.paciente[indice]:paciente_temp;
                    if(data.paciente.length > indice){
                        data_actividades = data.paciente[indice].atenciones.length>indice_act?data.paciente[indice].atenciones[indice_act]:atenciones_temp;
                    }else{
                        data_actividades = atenciones_temp;
                    }
                    
                    if(j >= 1){
                        alto_rect = alto_rect + 4;
                        alto_text = (alto_text + 3);
                    }

                    // linea 5
                    pdf.rect(5, alto_rect, 5, 20, 'S'); 
                    pdf.text(cont + "", 6.5, alto_text);
                    //alto_text = alto_text + 12;
                    pdf.rect(10, alto_rect, 195, 8, 'S'); //pdf.text('partes'+"",13,alto_text);
                    pdf.text('FECHA DE NACIMIENTO: ', 12, alto_text); 
                    pdf.setFontSize(6);
                    pdf.text(`${data_paciente.fecha_nacimiento!==null?data_paciente.fecha_nacimiento:''}`,40,alto_text);
                    pdf.setFontSize(5);
                    pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, alto_text); pdf.text('',110,alto_text);
                    pdf.text('FECHA DE ULTIMA REGLA: ', 145, alto_text); pdf.text('',175,alto_text);
                    alto_text = alto_text + 4; //67.5
                    pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, alto_text); 
                    pdf.setFontSize(6);
                    pdf.text(`${data_paciente.nombres_paciente}`,45, alto_text);

                    alto_text = alto_text + 4; // 71.5
                    alto_rect = alto_rect + 8; // 69
                    pdf.rect(10, alto_rect, 7, 12, 'S'); pdf.text(`${data_paciente.dia!==undefined?data_paciente.dia:''}`,12.5, (alto_text + 3)); 
                    pdf.rect(17, alto_rect, 21, 4, 'S'); pdf.text( `${data_paciente.nro_documento}`,22.5, alto_text); 
                    pdf.setFontSize(5);
                    
                    if(data_paciente.tipo_edad=='A'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(71, alto_rect, 5, 4, 'F');
                    }
                    pdf.rect(71, alto_rect, 5, 4, 'S'); pdf.text('A', 73, alto_text);

                    if(data_paciente.sexo == 'M' ){
                        pdf.setFillColor(255, 0, 0); 
                        pdf.rect(76, alto_rect, 6, 6, 'F');
                    }
                    pdf.rect(76, alto_rect, 6, 6, 'S'); pdf.text('M', 78, (alto_text + 1));
                    pdf.rect(82, alto_rect, 5, 6, 'S'); pdf.text('PC', 83, (alto_text + 1)); //pdf.text('', 88, (alto_text + 1));
                    pdf.rect(87, alto_rect, 5, 6, 'S'); //falta el texto

                    pdf.rect(92, alto_rect, 6, 4, 'S'); pdf.text('PESO', 92.5, alto_text); pdf.text(`${data_paciente.peso!==null?data_paciente.peso:''}`, 98.5, alto_text);
                    pdf.rect(98, alto_rect, 6, 4, 'S'); //falta el texto

                    if(data_paciente.condicion_establecimiento == 'N'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(104, alto_rect, 5, 4, 'F'); 
                    }
                    pdf.rect(104, alto_rect, 5, 4, 'S'); pdf.text('N', 105.5, alto_text);

                    if(data_paciente.condicion_servicio == 'N'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(109, alto_rect, 5, 4, 'F'); 
                    }
                    pdf.rect(109, alto_rect, 5, 4, 'S'); pdf.text('N', 111, alto_text);

                    // INICIO - Actividad Diagnostico 1
                    let desc_diango_1 = data_actividades.descripcion_cie.substr(0, 42);

                    pdf.rect(114, alto_rect, 47, 4, 'S'); pdf.text('1. ', 114.5, alto_text);pdf.text(`${desc_diango_1}`, 116.5, alto_text);

                    if(data_actividades.tipodianostico=='P'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(161, alto_rect, 4, 4, 'F');
                    }else{
                        if(data_actividades.tipodianostico=='D'){
                            pdf.setFillColor(255, 0, 0);
                            pdf.rect(165, alto_rect, 4, 4, 'F');
                        }else{
                            if(data_actividades.tipodianostico=='R'){
                                pdf.setFillColor(255, 0, 0);
                                pdf.rect(169, alto_rect, 4, 4, 'F');
                            }
                        }
                    }
                    pdf.rect(161, alto_rect, 4, 4, 'S'); pdf.text('P', 162.5, alto_text);
                    pdf.rect(165, alto_rect, 4, 4, 'S'); pdf.text('D', 166.5, alto_text);
                    pdf.rect(169, alto_rect, 4, 4, 'S'); pdf.text('R', 170.5, alto_text);

                    pdf.rect(173, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab1!==null?data_actividades.lab1:''}`, 174.5, alto_text); // valor lab1
                    pdf.rect(177, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab2!==null?data_actividades.lab2:''}`, 178.5, alto_text); // valor lab2
                    pdf.rect(181, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab3!==null?data_actividades.lab3:''}`, 182.5, alto_text); // valor lab3

                    pdf.setFontSize(6);
                    pdf.rect(185, alto_rect, 20, 4, 'S'); pdf.text(`${data_actividades.codigo_cie}`, 186.5, alto_text); // codigoCie1
                    indice_act++;

                    // Fin de Actividad Diagnostico 1

                    alto_text = alto_text + 1; // 72.5
                    pdf.rect(38, alto_rect, 7, 6, 'S'); pdf.text(`${data_paciente.idfinanciador!==null?data_paciente.idfinanciador:''}`,41, alto_text);
                    pdf.setFontSize(5);
                    pdf.rect(45, alto_rect, 21, 6, 'S'); pdf.text(`${data_paciente.distrito_procedencia!==null?data_paciente.distrito_procedencia:''}`,53,alto_text);

                    alto_text = alto_text + 3.5; // 75
                    pdf.text('', 12.5, alto_text);

                    // --------------- ALTO DE LA RECTA 73
                    alto_text = alto_text + 0.5; // 75.5
                    //pdf.rect(17, 73, 21, 4, 'S'); 
                    pdf.setFontSize(6);
                    pdf.text(`${data_paciente.hc!==null?data_paciente.hc:''}`,22.5,(alto_text - 1)); 
                    pdf.setFontSize(5);
                    pdf.rect(92, (alto_rect + 4), 6, 4, 'S'); 
                    pdf.text('TALLA', 92.3, (alto_text - 1)); pdf.text(`${data_paciente.talla!==null?data_paciente.talla:''}`, 98.5, (alto_text - 1));
                    pdf.rect(98, (alto_rect + 4), 6, 4, 'S'); //falta el texto

                    if(data_paciente.condicion_establecimiento=='C'){
                        pdf.setFillColor(255, 0, 0); 
                        pdf.rect(104, (alto_rect + 4), 5, 4, 'F');
                    }
                    pdf.rect(104, (alto_rect + 4), 5, 4, 'S'); pdf.text('C', 105.5, (alto_text - 1));

                    if(data_paciente.condicion_servicio == 'C'){
                        pdf.setFillColor(255, 0, 0); 
                        pdf.rect(109, (alto_rect + 4), 5, 4, 'F');
                    }
                    pdf.rect(109, (alto_rect + 4), 5, 4, 'S'); pdf.text('C', 111, (alto_text - 1));

                    // INICIO - Actividad diagnostico 2
                    if(data.paciente.length > indice){
                        data_actividades = data.paciente[indice].atenciones.length>indice_act?data.paciente[indice].atenciones[indice_act]:atenciones_temp;
                    }else{
                        data_actividades = atenciones_temp;
                    }
                    let desc_diango_2 = data_actividades.descripcion_cie.substr(0, 42);

                    pdf.rect(114, (alto_rect + 4), 47, 4, 'S'); pdf.text('2. ', 114.5, (alto_text - 1));pdf.text(`${desc_diango_2}`, 116.5, (alto_text - 1));

                    if(data_actividades.tipodianostico === 'P'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(161, (alto_rect + 4), 4, 4, 'F');
                    }else if(data_actividades.tipodianostico === 'D'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(165, (alto_rect + 4), 4, 4, 'F');
                    }else if(data_actividades.tipodianostico === 'R'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(169, (alto_rect + 4), 4, 4, 'F');
                    }

                    pdf.rect(161, (alto_rect + 4), 4, 4, 'S'); pdf.text('P', 162.5, (alto_text - 1));
                    pdf.rect(165, (alto_rect + 4), 4, 4, 'S'); pdf.text('D', 166.5, (alto_text - 1));
                    pdf.rect(169, (alto_rect + 4), 4, 4, 'S'); pdf.text('R', 170.5, (alto_text - 1));

                    pdf.rect(173, (alto_rect + 4), 4, 4, 'S'); pdf.text(`${data_actividades.lab1!==null?data_actividades.lab1:''}`, 174.5, (alto_text - 1)); // valor lab1
                    pdf.rect(177, (alto_rect + 4), 4, 4, 'S'); pdf.text(`${data_actividades.lab2!==null?data_actividades.lab2:''}`, 178.5, (alto_text - 1)); // valor lab2
                    pdf.rect(181, (alto_rect + 4), 4, 4, 'S'); pdf.text(`${data_actividades.lab3!==null?data_actividades.lab3:''}`, 182.5, (alto_text - 1)); // valor lab3

                    pdf.setFontSize(6);
                    pdf.rect(185, (alto_rect + 4), 20, 4, 'S'); pdf.text(`${data_actividades.codigo_cie}`, 186.5, (alto_text - 1)); // codigoCie2
                    indice_act++;
                    //FIN - Actividad diagnostico 2

                    alto_text = alto_text + 0.5; // 76
                    pdf.rect(66, alto_rect, 5, 12, 'S'); pdf.text(`${data_paciente.edad!==null?data_paciente.edad:''}`,67.5, alto_text);
                    //pdf.rect(66, alto_rect, 5, 12, 'S'); pdf.text('edad'+'',67.5, alto_text);

                    alto_text = alto_text + 2.5; // 78.5
                    alto_rect = alto_rect + 6; // 75
                    pdf.rect(38, alto_rect, 7, 6, 'S'); pdf.text(`${data_paciente.idetnia!==null?data_paciente.idetnia:''}`,41, alto_text);
                    pdf.setFontSize(5);
                    pdf.rect(45, alto_rect, 21, 6, 'S'); pdf.text('',53, alto_text);
                    pdf.rect(71, (alto_rect - 2), 5, 4, 'S');
                    if(data_paciente.tipo_edad=='M'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(71, (alto_rect - 2), 5, 4, 'F');
                    }
                    pdf.text('M', 73, (alto_text - 4));

                    if(data_paciente.sexo=='F'){
                        pdf.setFillColor(255, 0, 0); 
                        pdf.rect(76, alto_rect, 6, 6, 'F');
                    }

                    pdf.rect(76, alto_rect, 6, 6, 'S'); pdf.text('F', 78, (alto_text - 1)); //pdf.text('F', 78, (alto_text - 1));
                    pdf.rect(82, alto_rect, 5, 6, 'S'); pdf.text('Pab', 83, (alto_text - 1)); //pdf.text('', 88, (alto_text - 1));
                    pdf.rect(87, alto_rect, 5, 6, 'S'); //falta el texto
                    
                    alto_text = alto_text + 0.5; // 79 
                    pdf.text('',11.5, alto_text); // para poner el dia - falta el texto

                    alto_text = alto_text + 0.5; // 79.5     
                    alto_rect = alto_rect + 2; // 77               
                    pdf.rect(17, alto_rect, 21, 4, 'S'); pdf.text('',22.5, alto_text); 
                    
                    if(data_paciente.tipo_edad=='D'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(71, alto_rect, 5, 4, 'F');
                    }
                    pdf.rect(71, alto_rect, 5, 4, 'S'); pdf.text('D', 73, (alto_text - 1));
                    pdf.rect(92, alto_rect, 6, 4, 'S'); pdf.text('Hb', 94, (alto_text - 1)); pdf.text('', 98.5, (alto_text - 1));
                    pdf.rect(98, alto_rect, 6, 4, 'S'); //falta el texto

                    if(data_paciente.condicion_establecimiento=='R'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(104, alto_rect, 5, 4, 'F'); 
                    }
                    pdf.rect(104, alto_rect, 5, 4, 'S'); pdf.text('R', 105.5, (alto_text - 1));
                    
                    if(data_paciente.condicion_servicio=='R'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(109, alto_rect, 5, 4, 'F');
                    }
                    pdf.rect(109, alto_rect, 5, 4, 'S'); pdf.text('R', 111, (alto_text - 1));

                    //INICIO - Actividad Diagnostico 3
                    if(data.paciente.length > indice){
                        data_actividades = data.paciente[indice].atenciones.length>indice_act?data.paciente[indice].atenciones[indice_act]:atenciones_temp;
                    }else{
                        data_actividades = atenciones_temp;
                    }
                    let desc_diango_3 = data_actividades.descripcion_cie.substr(0, 42);
                    
                    pdf.rect(114, alto_rect, 47, 4, 'S'); pdf.text('3', 114.5, (alto_text - 1)); pdf.text(`${desc_diango_3}`, 116.5,(alto_text - 1));
                    
                    if(data_actividades.tipodianostico === 'P'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(161, alto_rect, 4, 4, 'F');
                    }else if(data_actividades.tipodianostico === 'D'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(165, alto_rect, 4, 4, 'F')
                    }else if(data_actividades.tipodianostico === 'R'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(169, alto_rect, 4, 4, 'F');
                    }

                    pdf.rect(161, alto_rect, 4, 4, 'S'); pdf.text('P', 162.5, (alto_text - 1));
                    pdf.rect(165, alto_rect, 4, 4, 'S'); pdf.text('D', 166.5, (alto_text - 1));
                    pdf.rect(169, alto_rect, 4, 4, 'S'); pdf.text('R', 170.5, (alto_text - 1));

                    pdf.rect(173, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab1!==null?data_actividades.lab1:''}`, 174.5, (alto_text - 1)); // valor lab1
                    pdf.rect(177, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab2!==null?data_actividades.lab2:''}`, 178.5, (alto_text - 1)); // valor lab2
                    pdf.rect(181, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab3!==null?data_actividades.lab3:''}`, 182.5, (alto_text - 1)); // valor lab3

                    pdf.setFontSize(6);
                    pdf.rect(185, alto_rect, 20, 4, 'S'); pdf.text(`${data_actividades.codigo_cie}`, 186.5, (alto_text - 1)); // codigoCie3  
                    indice_act++;
                    pdf.setFontSize(5);
                    // FIN - Actividad Diagnostico 3
                    
                    cont++;
                    indice++;
                }
            }else{
                alto_rect = 59;
                alto_text= 61.5;
                $scope.cabecera2(pdf);
                $scope.primerasLineas2(pdf, data);
                for(let j = 0; j < 10; j++){
                    let indice_act = 0;
                    let data_paciente = data.paciente.length>indice?data.paciente[indice]:paciente_temp;
                    if(data.paciente.length > indice){
                        data_actividades = data.paciente[indice].atenciones.length>indice_act?data.paciente[indice].atenciones[indice_act]:atenciones_temp;
                    }else{
                        data_actividades = atenciones_temp;
                    }
                    
                    if(j >= 1){
                        alto_rect = alto_rect + 4;
                        alto_text = (alto_text + 3);
                    }

                    // linea 5
                    pdf.rect(5, alto_rect, 5, 20, 'S'); 
                    pdf.text(cont + "", 6.5, alto_text);
                    //alto_text = alto_text + 12;
                    pdf.rect(10, alto_rect, 195, 8, 'S'); //pdf.text('partes'+"",13,alto_text);
                    pdf.text('FECHA DE NACIMIENTO: ', 12, alto_text); 
                    pdf.setFontSize(6);
                    pdf.text(`${data_paciente.fecha_nacimiento!==null?data_paciente.fecha_nacimiento:''}`,40,alto_text);
                    pdf.setFontSize(5);
                    pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, alto_text); pdf.text('',110,alto_text);
                    pdf.text('FECHA DE ULTIMA REGLA: ', 145, alto_text); pdf.text('',175,alto_text);
                    alto_text = alto_text + 4; //67.5
                    pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, alto_text); 
                    pdf.setFontSize(6);
                    pdf.text(`${data_paciente.nombres_paciente}`,45, alto_text);

                    alto_text = alto_text + 4; // 71.5
                    alto_rect = alto_rect + 8; // 69
                    pdf.rect(10, alto_rect, 7, 12, 'S'); pdf.text(`${data_paciente.dia!==undefined?data_paciente.dia:''}`,12.5, (alto_text + 3)); 
                    pdf.rect(17, alto_rect, 21, 4, 'S'); pdf.text( `${data_paciente.nro_documento}`,22.5, alto_text); 
                    pdf.setFontSize(5);
                    
                    if(data_paciente.tipo_edad=='A'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(71, alto_rect, 5, 4, 'F');
                    }
                    pdf.rect(71, alto_rect, 5, 4, 'S'); pdf.text('A', 73, alto_text);

                    if(data_paciente.sexo == 'M' ){
                        pdf.setFillColor(255, 0, 0); 
                        pdf.rect(76, alto_rect, 6, 6, 'F');
                    }
                    pdf.rect(76, alto_rect, 6, 6, 'S'); pdf.text('M', 78, (alto_text + 1));
                    pdf.rect(82, alto_rect, 5, 6, 'S'); pdf.text('PC', 83, (alto_text + 1)); //pdf.text('', 88, (alto_text + 1));
                    pdf.rect(87, alto_rect, 5, 6, 'S'); //falta el texto

                    pdf.rect(92, alto_rect, 6, 4, 'S'); pdf.text('PESO', 92.5, alto_text); pdf.text(`${data_paciente.peso!==null?data_paciente.peso:''}`, 98.5, alto_text);
                    pdf.rect(98, alto_rect, 6, 4, 'S'); //falta el texto

                    if(data_paciente.condicion_establecimiento == 'N'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(104, alto_rect, 5, 4, 'F'); 
                    }
                    pdf.rect(104, alto_rect, 5, 4, 'S'); pdf.text('N', 105.5, alto_text);

                    if(data_paciente.condicion_servicio == 'N'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(109, alto_rect, 5, 4, 'F'); 
                    }
                    pdf.rect(109, alto_rect, 5, 4, 'S'); pdf.text('N', 111, alto_text);

                    // INICIO - Actividad Diagnostico 1
                    let desc_diango_1 = data_actividades.descripcion_cie.substr(0, 42);

                    pdf.rect(114, alto_rect, 47, 4, 'S'); pdf.text('1. ', 114.5, alto_text);pdf.text(`${desc_diango_1}`, 116.5, alto_text);

                    if(data_actividades.tipodianostico=='P'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(161, alto_rect, 4, 4, 'F');
                    }else{
                        if(data_actividades.tipodianostico=='D'){
                            pdf.setFillColor(255, 0, 0);
                            pdf.rect(165, alto_rect, 4, 4, 'F');
                        }else{
                            if(data_actividades.tipodianostico=='R'){
                                pdf.setFillColor(255, 0, 0);
                                pdf.rect(169, alto_rect, 4, 4, 'F');
                            }
                        }
                    }
                    pdf.rect(161, alto_rect, 4, 4, 'S'); pdf.text('P', 162.5, alto_text);
                    pdf.rect(165, alto_rect, 4, 4, 'S'); pdf.text('D', 166.5, alto_text);
                    pdf.rect(169, alto_rect, 4, 4, 'S'); pdf.text('R', 170.5, alto_text);

                    pdf.rect(173, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab1!==null?data_actividades.lab1:''}`, 174.5, alto_text); // valor lab1
                    pdf.rect(177, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab2!==null?data_actividades.lab2:''}`, 178.5, alto_text); // valor lab2
                    pdf.rect(181, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab3!==null?data_actividades.lab3:''}`, 182.5, alto_text); // valor lab3

                    pdf.setFontSize(6);
                    pdf.rect(185, alto_rect, 20, 4, 'S'); pdf.text(`${data_actividades.codigo_cie}`, 186.5, alto_text); // codigoCie1
                    indice_act++;

                    // Fin de Actividad Diagnostico 1

                    alto_text = alto_text + 1; // 72.5
                    pdf.rect(38, alto_rect, 7, 6, 'S'); pdf.text(`${data_paciente.idfinanciador!==null?data_paciente.idfinanciador:''}`,41, alto_text);
                    pdf.setFontSize(5);
                    pdf.rect(45, alto_rect, 21, 6, 'S'); pdf.text(`${data_paciente.distrito_procedencia!==null?data_paciente.distrito_procedencia:''}`,53,alto_text);

                    alto_text = alto_text + 3.5; // 75
                    pdf.text('', 12.5, alto_text);

                    // --------------- ALTO DE LA RECTA 73
                    alto_text = alto_text + 0.5; // 75.5
                    //pdf.rect(17, 73, 21, 4, 'S'); 
                    pdf.setFontSize(6);
                    pdf.text(`${data_paciente.hc!==null?data_paciente.hc:''}`,22.5,(alto_text - 1)); 
                    pdf.setFontSize(5);
                    pdf.rect(92, (alto_rect + 4), 6, 4, 'S'); 
                    pdf.text('TALLA', 92.3, (alto_text - 1)); pdf.text(`${data_paciente.talla!==null?data_paciente.talla:''}`, 98.5, (alto_text - 1));
                    pdf.rect(98, (alto_rect + 4), 6, 4, 'S'); //falta el texto

                    if(data_paciente.condicion_establecimiento=='C'){
                        pdf.setFillColor(255, 0, 0); 
                        pdf.rect(104, (alto_rect + 4), 5, 4, 'F');
                    }
                    pdf.rect(104, (alto_rect + 4), 5, 4, 'S'); pdf.text('C', 105.5, (alto_text - 1));

                    if(data_paciente.condicion_servicio == 'C'){
                        pdf.setFillColor(255, 0, 0); 
                        pdf.rect(109, (alto_rect + 4), 5, 4, 'F');
                    }
                    pdf.rect(109, (alto_rect + 4), 5, 4, 'S'); pdf.text('C', 111, (alto_text - 1));

                    // INICIO - Actividad diagnostico 2
                    if(data.paciente.length > indice){
                        data_actividades = data.paciente[indice].atenciones.length>indice_act?data.paciente[indice].atenciones[indice_act]:atenciones_temp;
                    }else{
                        data_actividades = atenciones_temp;
                    }
                    let desc_diango_2 = data_actividades.descripcion_cie.substr(0, 42);

                    pdf.rect(114, (alto_rect + 4), 47, 4, 'S'); pdf.text('2. ', 114.5, (alto_text - 1));pdf.text(`${desc_diango_2}`, 116.5, (alto_text - 1));

                    if(data_actividades.tipodianostico === 'P'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(161, (alto_rect + 4), 4, 4, 'F');
                    }else if(data_actividades.tipodianostico === 'D'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(165, (alto_rect + 4), 4, 4, 'F');
                    }else if(data_actividades.tipodianostico === 'R'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(169, (alto_rect + 4), 4, 4, 'F');
                    }

                    pdf.rect(161, (alto_rect + 4), 4, 4, 'S'); pdf.text('P', 162.5, (alto_text - 1));
                    pdf.rect(165, (alto_rect + 4), 4, 4, 'S'); pdf.text('D', 166.5, (alto_text - 1));
                    pdf.rect(169, (alto_rect + 4), 4, 4, 'S'); pdf.text('R', 170.5, (alto_text - 1));

                    pdf.rect(173, (alto_rect + 4), 4, 4, 'S'); pdf.text(`${data_actividades.lab1!==null?data_actividades.lab1:''}`, 174.5, (alto_text - 1)); // valor lab1
                    pdf.rect(177, (alto_rect + 4), 4, 4, 'S'); pdf.text(`${data_actividades.lab2!==null?data_actividades.lab2:''}`, 178.5, (alto_text - 1)); // valor lab2
                    pdf.rect(181, (alto_rect + 4), 4, 4, 'S'); pdf.text(`${data_actividades.lab3!==null?data_actividades.lab3:''}`, 182.5, (alto_text - 1)); // valor lab3

                    pdf.setFontSize(6);
                    pdf.rect(185, (alto_rect + 4), 20, 4, 'S'); pdf.text(`${data_actividades.codigo_cie}`, 186.5, (alto_text - 1)); // codigoCie2
                    indice_act++;
                    //FIN - Actividad diagnostico 2

                    alto_text = alto_text + 0.5; // 76
                    pdf.rect(66, alto_rect, 5, 12, 'S'); pdf.text(`${data_paciente.edad!==null?data_paciente.edad:''}`,67.5, alto_text);
                    //pdf.rect(66, alto_rect, 5, 12, 'S'); pdf.text('edad'+'',67.5, alto_text);

                    alto_text = alto_text + 2.5; // 78.5
                    alto_rect = alto_rect + 6; // 75
                    pdf.rect(38, alto_rect, 7, 6, 'S'); pdf.text(`${data_paciente.idetnia!==null?data_paciente.idetnia:''}`,41, alto_text);
                    pdf.setFontSize(5);
                    pdf.rect(45, alto_rect, 21, 6, 'S'); pdf.text('',53, alto_text);
                    pdf.rect(71, (alto_rect - 2), 5, 4, 'S');
                    if(data_paciente.tipo_edad=='M'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(71, (alto_rect - 2), 5, 4, 'F');
                    }
                    pdf.text('M', 73, (alto_text - 4));

                    if(data_paciente.sexo=='F'){
                        pdf.setFillColor(255, 0, 0); 
                        pdf.rect(76, alto_rect, 6, 6, 'F');
                    }

                    pdf.rect(76, alto_rect, 6, 6, 'S'); pdf.text('F', 78, (alto_text - 1)); //pdf.text('F', 78, (alto_text - 1));
                    pdf.rect(82, alto_rect, 5, 6, 'S'); pdf.text('Pab', 83, (alto_text - 1)); //pdf.text('', 88, (alto_text - 1));
                    pdf.rect(87, alto_rect, 5, 6, 'S'); //falta el texto
                    
                    alto_text = alto_text + 0.5; // 79 
                    pdf.text('',11.5, alto_text); // para poner el dia - falta el texto

                    alto_text = alto_text + 0.5; // 79.5     
                    alto_rect = alto_rect + 2; // 77               
                    pdf.rect(17, alto_rect, 21, 4, 'S'); pdf.text('',22.5, alto_text); 
                    
                    if(data_paciente.tipo_edad=='D'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(71, alto_rect, 5, 4, 'F');
                    }
                    pdf.rect(71, alto_rect, 5, 4, 'S'); pdf.text('D', 73, (alto_text - 1));
                    pdf.rect(92, alto_rect, 6, 4, 'S'); pdf.text('Hb', 94, (alto_text - 1)); pdf.text('', 98.5, (alto_text - 1));
                    pdf.rect(98, alto_rect, 6, 4, 'S'); //falta el texto

                    if(data_paciente.condicion_establecimiento=='R'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(104, alto_rect, 5, 4, 'F'); 
                    }
                    pdf.rect(104, alto_rect, 5, 4, 'S'); pdf.text('R', 105.5, (alto_text - 1));
                    
                    if(data_paciente.condicion_servicio=='R'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(109, alto_rect, 5, 4, 'F');
                    }
                    pdf.rect(109, alto_rect, 5, 4, 'S'); pdf.text('R', 111, (alto_text - 1));

                    //INICIO - Actividad Diagnostico 3
                    if(data.paciente.length > indice){
                        data_actividades = data.paciente[indice].atenciones.length>indice_act?data.paciente[indice].atenciones[indice_act]:atenciones_temp;
                    }else{
                        data_actividades = atenciones_temp;
                    }
                    let desc_diango_3 = data_actividades.descripcion_cie.substr(0, 42);
                    
                    pdf.rect(114, alto_rect, 47, 4, 'S'); pdf.text('3', 114.5, (alto_text - 1)); pdf.text(`${desc_diango_3}`, 116.5,(alto_text - 1));
                    
                    if(data_actividades.tipodianostico === 'P'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(161, alto_rect, 4, 4, 'F');
                    }else if(data_actividades.tipodianostico === 'D'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(165, alto_rect, 4, 4, 'F')
                    }else if(data_actividades.tipodianostico === 'R'){
                        pdf.setFillColor(255, 0, 0);
                        pdf.rect(169, alto_rect, 4, 4, 'F');
                    }

                    pdf.rect(161, alto_rect, 4, 4, 'S'); pdf.text('P', 162.5, (alto_text - 1));
                    pdf.rect(165, alto_rect, 4, 4, 'S'); pdf.text('D', 166.5, (alto_text - 1));
                    pdf.rect(169, alto_rect, 4, 4, 'S'); pdf.text('R', 170.5, (alto_text - 1));

                    pdf.rect(173, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab1!==null?data_actividades.lab1:''}`, 174.5, (alto_text - 1)); // valor lab1
                    pdf.rect(177, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab2!==null?data_actividades.lab2:''}`, 178.5, (alto_text - 1)); // valor lab2
                    pdf.rect(181, alto_rect, 4, 4, 'S'); pdf.text(`${data_actividades.lab3!==null?data_actividades.lab3:''}`, 182.5, (alto_text - 1)); // valor lab3

                    pdf.setFontSize(6);
                    pdf.rect(185, alto_rect, 20, 4, 'S'); pdf.text(`${data_actividades.codigo_cie}`, 186.5, (alto_text - 1)); // codigoCie3  
                    indice_act++;
                    pdf.setFontSize(5);
                    // FIN - Actividad Diagnostico 3
                    
                    cont++;
                    indice++;
                }
            }

            $scope.piePag(pdf);
            if(i < pag-1){
                pdf.addPage();
            }
        }

        pdf.save('proforma.pdf');
    }

    $scope.cabecera1 = function(pdf){
        //CABECERA
        pdf.setFontSize(5);
        pdf.text('LOTE', 5, 10);  pdf.rect(20, 7, 15, 5, 'S');
        pdf.text('PAGINA', 5, 16);  pdf.rect(20, 13, 15, 5, 'S');
        pdf.text('FECHA PROCES.', 5, 22);  pdf.rect(23, 19, 20, 5, 'S');
        pdf.text('DNI DIGITADOR', 5, 28);  pdf.rect(23, 25, 20, 5, 'S');

        pdf.setFontSize(12);
        pdf.setFont('Verdana','bold');
        pdf.text('MINISTERIO DE SALUD', 75, 13);
        pdf.setFontSize(9);
        pdf.setFont('Verdana','normal');
        pdf.text('OFICINA GENERAL DE TECNOLOGIAS DE LA INFORMACION', 50, 19);
        pdf.text('OFICINA DE GESTION DE LA INFORMACION', 60, 25);
        pdf.text('REGISTRO DIARIO DE ATENCION Y OTRAS ACTIVIDADES DE SALUD', 48, 31);

        pdf.setFontSize(5);
        pdf.rect(162, 7, 43, 16, 'S');  pdf.text('FIRMA Y SELLO RESPONSABLE HIS', 167, 10);
        pdf.setFontSize(7);
        pdf.rect(170, 23, 5, 5, 'S');  pdf.text('1', 172, 26);
        pdf.rect(175, 23, 30, 5, 'S');  pdf.text('TURNO', 185, 26);
        pdf.rect(170, 28, 12, 5, 'S');  pdf.text('M', 174, 32);
        pdf.rect(182, 28, 11, 5, 'S');  pdf.text('T', 186, 32);
        pdf.rect(193, 28, 12, 5, 'S');  pdf.text('N', 198, 32);
        // FIN DE CABECERA
    }

    $scope.cabecera2 = function(pdf){
        pdf.setFontSize(5);
        pdf.rect(5, 13, 165, 13, 'S');
        pdf.setFontSize(10);
        pdf.setFont('Verdana','bold');
        pdf.text('Registro Diario de Atención y Otras Actividades de Salud', 40, 19.5);

        pdf.setFontSize(6);
        pdf.setFont('Verdana','normal');
        pdf.rect(170, 13, 5, 5, 'S');  pdf.text('1', 172, 16);
        pdf.rect(175, 13, 30, 5, 'S');  pdf.text('TURNO', 185, 16);
        pdf.rect(170, 18, 12, 8, 'S');  pdf.text('M', 174, 22.5);
        pdf.rect(182, 18, 11, 8, 'S');  pdf.text('T', 186, 22.5);
        pdf.rect(193, 18, 12, 8, 'S');  pdf.text('N', 198, 22.5);
    }

    $scope.piePag = function(pdf){
        pdf.setFontSize(5);
        // PIE DE CONTENIDO
        pdf.rect(5, 261, 63, 5, 'S');  pdf.text('ITEM 09: FINANCIADOR DE SALUD', 25, 264);
        pdf.rect(68, 261, 27, 5, 'S');  pdf.text('ITEM 12', 78, 264);
        pdf.rect(95, 261, 20, 5, 'S');  pdf.text('ITEM 16', 100, 264);
        pdf.rect(115, 261, 42, 5, 'S');  pdf.text('ITEM 17 y 18 (CONDICION DE INGRESO)', 117, 264);
        pdf.rect(157, 261, 48, 5, 'S');  pdf.text('FECHA DE ULTIMA REGLA', 167, 264);

        pdf.rect(5, 266, 63, 12, 'S');
        pdf.text('1 USUARIO', 6, 269);  pdf.text('2 SEGURO INTEGRAL (SIS)', 6, 272.5);  pdf.text('3 ESSALUD', 6, 276);
        pdf.text('4 SOAT', 33, 269);  pdf.text('4 SANIDAD FAP', 33, 272.5);  pdf.text('5 SANIDAD NAVAL', 33, 276);
        pdf.text('10 OTROS', 52, 269);  pdf.text('11 EXONERADO', 52, 272.5);

        pdf.rect(68, 266, 27, 12, 'S');  pdf.text('Registrar el nombre del Centro', 69.5, 269);  pdf.text('Poblado', 78, 272);
        pdf.rect(95, 266, 20, 12, 'S');  pdf.text('PESO = kg', 96.5, 269);  pdf.text('TALLA = Cm', 96.5, 272);  pdf.text('Hb = Valor', 96.5, 275);
        pdf.rect(115, 266, 42, 12, 'S');  pdf.text('N= PACIENTE NUEVO (1ER VEZ EN SU VIDA)', 116, 269);  pdf.text('C= PACIENTE CONTINUADOR EN EL AÑO', 116, 272);  pdf.text('R= PACIENTE REINGRESANTE EN EL AÑO', 116, 275);
        pdf.rect(157, 266, 48, 12, 'S');  pdf.text('Si no se cuenta con el dato se registrará la fecha de la', 158, 269);  pdf.text('primera ecografia', 175, 272);

        pdf.rect(5, 278, 19, 5, 'S');  pdf.text('58 MESTIZO', 6, 281);
        pdf.rect(24, 278, 18, 5, 'S');  pdf.text('26 CULINA', 25, 281);
        pdf.rect(42, 278, 28, 5, 'S');  pdf.text('10 CASHINAHUA', 43, 281);
        pdf.rect(70, 278, 30, 5, 'S');  pdf.text('05 ASHANINKA', 72, 281);
        pdf.rect(100, 278, 30, 5, 'S');  pdf.text('53 YAMINAHUA', 102, 281);
        pdf.rect(130, 278, 28, 5, 'S');  pdf.text('55 YIN - YAMI (PIRO)', 132, 281);
        pdf.rect(158, 278, 17, 5, 'S');  pdf.text('21 KAKATAIBO', 158.5, 281);
        pdf.rect(175, 278, 15, 5, 'S');  pdf.text('40 QUECHUAS', 176, 281);
        pdf.rect(190, 278, 15, 5, 'S');  pdf.text('07 AWAJUN', 191.5, 281);

        pdf.rect(5, 283, 19, 5, 'S');  pdf.text('45 SHIPIBO-CONIBO', 5.5, 286);
        pdf.rect(24, 283, 18, 5, 'S');  pdf.text('18 ISCONAHUA', 25, 286);
        pdf.rect(42, 283, 28, 5, 'S');  pdf.text('43 SHARANAHUA', 43, 286);
        pdf.rect(70, 283, 30, 5, 'S');  pdf.text('32 MACHIGUENGA', 71, 286);
        pdf.rect(100, 283, 30, 5, 'S');  pdf.text('3 AMANAHUACA', 101, 286);
        pdf.rect(130, 283, 28, 5, 'S');  pdf.text('54 YANESHA (AMUESHA)', 131, 286);
        pdf.rect(158, 283, 17, 5, 'S');  pdf.text('30 MASTANAHUA', 158.5, 286);
        pdf.rect(175, 283, 15, 5, 'S');  pdf.text('51 WAMPIS', 176, 286);
        pdf.rect(190, 283, 15, 5, 'S');  pdf.text('02 AIMARA', 191, 286);
        // FIN DE PIE DE CONTENIDO
    }

    $scope.primerasLineas1 = function(pdf, data){
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
        pdf.setFontSize(6);
        pdf.rect(5, 38, 12, 7, 'S'); pdf.text(`${data.anio}`, 6, 41);
        pdf.rect(17, 38, 21, 7, 'S'); pdf.text(`${data.mes_nombre}`, 18, 41);
        pdf.rect(38, 38, 54, 7, 'S'); pdf.text(`${data.cod_2000} - ${data.nombre_establecimiento}`, 40, 41);
        pdf.rect(92, 38, 66, 7, 'S'); pdf.text(`${data.ups}`, 100, 41);
        pdf.rect(158, 38, 3, 7, 'S'); pdf.text('' , 159, 41);
        pdf.rect(161, 38, 17, 7, 'S'); pdf.text(`${data.numero_documento}`, 162, 41);
        pdf.setFontSize(5);
        let nom_profesional = data.personal.substr(0, 26);
        pdf.rect(178, 38, 27, 7, 'S'); pdf.text(`${nom_profesional}`, 179, 41);

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
    }

    $scope.primerasLineas2 = function(pdf, data){
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
        pdf.setFontSize(6);
        pdf.rect(5, 32, 12, 8, 'S'); pdf.text(`${data.anio}`, 6, 36);
        pdf.rect(17, 32, 21, 8, 'S'); pdf.text(`${data.mes_nombre}`, 18, 36);
        pdf.rect(38, 32, 54, 8, 'S'); pdf.text(`${data.cod_2000} - ${data.nombre_establecimiento}`, 40, 36);
        pdf.rect(92, 32, 66, 8, 'S'); pdf.text(`${data.ups}`, 100, 36);
        pdf.rect(158, 32, 3, 8, 'S'); pdf.text('', 159, 36);
        pdf.rect(161, 32, 19, 8, 'S'); pdf.text(`${data.numero_documento}`, 162, 36);
        let nom_profesional = data.personal.substr(0, 24);
        pdf.setFontSize(5);
        pdf.rect(180, 32, 25, 8, 'S'); pdf.text(`${nom_profesional}`, 180, 36);

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
        pdf.rect(173, 45, 12, 8, 'S');pdf.text('VALOR', 175.5, 48); pdf.text('LAB', 177, 51);
        pdf.rect(173, 53, 4, 4, 'S');pdf.text('1°', 174.5, 55.5);
        pdf.rect(177, 53, 4, 4, 'S');pdf.text('2°', 178.5, 55.5);
        pdf.rect(181, 53, 4, 4, 'S');pdf.text('3°', 182.5, 55.5);
        pdf.rect(185, 45, 20, 12, 'S');pdf.text('CÓDIGO', 191, 48); pdf.text('CIE / CPT', 191, 51);
    }

    $scope.inicio();
    $scope.listarEstablecimientosHis();
    $scope.listaprofesionales();
    
});

