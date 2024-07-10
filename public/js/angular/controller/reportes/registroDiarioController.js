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
            // $.notify({
            //     title: 'ERROR',
            //     message: 'Campos Obligatorios (*)',
            // },{
            //     type: 'danger',
            //     placement: {
            //         from: "bottom",
            //         align: "right"
            //     },
            //     time: 1000,
            // });
  
        
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
                $scope.implementacionHis();
                
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

        

        actividadesHisService.imprimirHis({lista:$scope.lista,
            tipo_profesional:$scope.filtro.tipo_profesional,
            tipo_profesional:$scope.filtro.tipo_profesional,
            idprofesional:$scope.filtro.idprofesional,
            idemergencia:$scope.filtro.idemergencia,
            cod_2000:$scope.filtro.cod_2000,
            fecha_inicio:$scope.filtro.fecha_inicio,
            fecha_final:$scope.filtro.fecha_final
        }).success(function(data){
            $scope.lista_pacientes=data;
            console.log($scope.lista_pacientes)
            console.log($scope.lista_pacientes.paciente[0].atenciones[0].condicion_establecimiento)    
            console.log($scope.lista_pacientes.paciente.length)
            console.log($scope.lista_pacientes.paciente[0].atenciones[0].codigo_cie)
        })

        

        // var date = new Date();
        
        
        //pdf.save('Reporte_Diario.pdf');
    }
    

    
   
    


    $scope.prepararImpresion = function(){
        var date = new Date();
        
        $scope.pdf.setFontSize(5);
        let datos= $scope.lista_pacientes.paciente.length;
        

        
        let validarPag=[];
        let paginas=datos/10;
        let decimal= paginas%1;
        let pag=Math.round(paginas);
        console.log(paginas,decimal,pag);
        //console.log('el numero de paginas es :',pag);
        if(decimal<0.5){
            pag++;
            console.log('el numero de paginas es :',pag);
        }
        console.log('el numero de paginas es :',pag);
        let p=1;
        for(let i=0;i<pag;i++){
            validarPag[i]=p;
            p++;
        }
        const dataPacientes=[$scope.paciente1,
            $scope.paciente2];
            // $scope.paciente3,
            // $scope.paciente4,
            // $scope.paciente5,
            // $scope.paciente6,
            // $scope.paciente7,
            // $scope.paciente8,
            // $scope.paciente9,
            // $scope.paciente10];
        
        
        let todos_pacientes=[]
        let anio, mes_nombre, nombre_establecimiento;

        let distrito_procedencia,idetnia,idfinanciador, nro_documento, fecha_nacimiento, nombres_paciente, hc, 
        fecha_Atencion, edad, sexo,peso,talla,tipo_edad
        let valor_lab=[]
        let valor_lab1=[]
        let valor_lab2=[]
        let valor_lab3=[]
        let condicion_establecimiento, condicion_servicio, Codigo_cie=[], descripcion_cie=[], tipodianostico=[],item,lab1,lab2,lab3;
        let codigoCie1,codigoCie2,codigoCie3
        let Tipodianostico1,Tipodianostico2,Tipodianostico3
        let descripcion1,descripcion2,descripcion3
        let limite=1;
        let cont=1;
        let x=0;
        for(i=0;i<pag;i++){
        
            if(validarPag[i]%2!=0){
                
                $scope.cabecera1(); 
                $scope.primerasLineas1();
                for(j=0;j<10;j++){
                    if(cont<=datos){
                        console.log("dato"+cont)
                       
                        
                        fecha_Atencion=$scope.lista_pacientes.paciente[x].fecha_Atención
                       
                        distrito_procedencia=$scope.lista_pacientes.paciente[x].distrito_procedencia
                        edad=$scope.lista_pacientes.paciente[x].edad
                        idetnia=$scope.lista_pacientes.paciente[x].idetnia
                        idfinanciador=$scope.lista_pacientes.paciente[x].idfinanciador
                        nro_documento=$scope.lista_pacientes.paciente[x].nro_documento
                        fecha_nacimiento=$scope.lista_pacientes.paciente[x].fecha_nacimiento
                        nombres_paciente=$scope.lista_pacientes.paciente[x].nombres_paciente
                        hc=$scope.lista_pacientes.paciente[x].hc
                        sexo=$scope.lista_pacientes.paciente[x].sexo
                        peso=$scope.lista_pacientes.paciente[x].peso
                        talla=$scope.lista_pacientes.paciente[x].talla
                        tipo_edad=$scope.lista_pacientes.paciente[x].tipo_edad
                        let at=0;
                        for (let h = 0 ;h < $scope.lista_pacientes.paciente[x].atenciones.length ; h++){
                            condicion_establecimiento=$scope.lista_pacientes.paciente[x].atenciones[0].condicion_establecimiento
                            condicion_servicio=$scope.lista_pacientes.paciente[x].atenciones[0].condicion_servicio

                            Codigo_cie[h] = $scope.lista_pacientes.paciente[x].atenciones[at].codigo_cie

                            descripcion_cie[h]=$scope.lista_pacientes.paciente[x].atenciones[at].descripcion_cie
                            tipodianostico[h]=$scope.lista_pacientes.paciente[x].atenciones[at].tipodianostico

                            lab1=$scope.lista_pacientes.paciente[x].atenciones[at].lab1
                            lab2=$scope.lista_pacientes.paciente[x].atenciones[at].lab2
                            lab3=$scope.lista_pacientes.paciente[x].atenciones[at].lab2
                            item=$scope.lista_pacientes.paciente[x].atenciones[at].item
                            
                            valor_lab[at]={lab1,lab2,lab3}
                            at++;
                        }
                       
                        
                        
                        descripcion1=descripcion_cie[0]
                        descripcion2=descripcion_cie[1]
                        descripcion3=descripcion_cie[2]

                        Tipodianostico1=tipodianostico[0],
                        Tipodianostico2=tipodianostico[1],
                        Tipodianostico3=tipodianostico[2]

                        valor_lab1=valor_lab[0]
                        valor_lab2=valor_lab[1]
                        valor_lab3=valor_lab[2]

                        codigoCie1=Codigo_cie[0]
                        codigoCie2=Codigo_cie[1]
                        codigoCie3=Codigo_cie[2]
                        
                        dataPacientes[j](cont,fecha_Atencion,
                            distrito_procedencia,
                            idetnia,
                            idfinanciador,
                            nro_documento,
                            fecha_nacimiento,
                            nombres_paciente,
                            hc,
                            
                            edad,
                            sexo,
                            peso,
                            talla,
                            tipo_edad,
                            condicion_establecimiento,condicion_servicio,item,
                            descripcion1,descripcion2,descripcion3,
                            Tipodianostico1,Tipodianostico2,Tipodianostico3,
                            valor_lab1,valor_lab2,valor_lab3,
                            codigoCie1,codigoCie2,codigoCie3
                        );


                    
                    
                    
                    
                    limite++;
                    cont++;
                    
                    }else{
                        let a=0
                        fecha_Atencion="",
                        distrito_procedencia="",
                        idetnia="",
                        idfinanciador="",
                        nro_documento="",
                        fecha_nacimiento="",
                        nombres_paciente="",
                        hc="",
                        fecha_Atencion="",
                        edad="",
                        sexo="",
                        peso="",
                        talla="",
                        tipo_edad="",
                        condicion_establecimiento="",condicion_servicio="",item="",
                        descripcion1="",descripcion2="",descripcion3="",
                        Tipodianostico1="",Tipodianostico2="",Tipodianostico3="",
                        valor_lab1="",valor_lab2="",valor_lab3="",
                        codigoCie1="",codigoCie2="",codigoCie3=""
                        
                        dataPacientes[a](limite,fecha_Atencion,
                            distrito_procedencia,
                            idetnia,
                            idfinanciador,
                            nro_documento,
                            fecha_nacimiento,
                            nombres_paciente,
                            hc,
                            fecha_Atencion,
                            edad,
                            sexo,
                            peso,
                            talla,
                            tipo_edad,
                            condicion_establecimiento,condicion_servicio,item,
                            descripcion1,descripcion2,descripcion3,
                            Tipodianostico1,Tipodianostico2,Tipodianostico3,
                            valor_lab1,valor_lab2,valor_lab3,
                            codigoCie1,codigoCie2,codigoCie3);
                            a++;
                    }
                    
                    x++;
                    
                }
            
            }      
            if(validarPag[i]%2==0){
                $scope.cabecera2();
                $scope.primerasLineas2();
                for(j=0;j<10;j++){
                    if(cont<=datos){
                        console.log("dato"+cont)
                        fecha_Atencion=$scope.lista_pacientes.paciente[x].fecha_Atención
                        distrito_procedencia=$scope.lista_pacientes.paciente[x].distrito_procedencia
                        edad=$scope.lista_pacientes.paciente[x].edad
                        idetnia=$scope.lista_pacientes.paciente[x].idetnia
                        idfinanciador=$scope.lista_pacientes.paciente[x].idfinanciador
                        nro_documento=$scope.lista_pacientes.paciente[x].nro_documento
                        fecha_nacimiento=$scope.lista_pacientes.paciente[x].fecha_nacimiento
                        nombres_paciente=$scope.lista_pacientes.paciente[x].nombres_paciente
                        hc=$scope.lista_pacientes.paciente[x].hc
                        sexo=$scope.lista_pacientes.paciente[x].sexo
                        peso=$scope.lista_pacientes.paciente[x].peso
                        talla=$scope.lista_pacientes.paciente[x].talla
                        tipo_edad=$scope.lista_pacientes.paciente[x].tipo_edad
                        let at=0;
                        for (let h = 0 ;h < $scope.lista_pacientes.paciente[x].atenciones.length ; h++){
                            condicion_establecimiento=$scope.lista_pacientes.paciente[x].atenciones[0].condicion_establecimiento
                            condicion_servicio=$scope.lista_pacientes.paciente[x].atenciones[0].condicion_servicio

                            Codigo_cie[h] = $scope.lista_pacientes.paciente[x].atenciones[at].codigo_cie

                            descripcion_cie[h]=$scope.lista_pacientes.paciente[x].atenciones[at].descripcion_cie
                            tipodianostico[h]=$scope.lista_pacientes.paciente[x].atenciones[at].tipodianostico

                            lab1=$scope.lista_pacientes.paciente[x].atenciones[at].lab1
                            lab2=$scope.lista_pacientes.paciente[x].atenciones[at].lab2
                            lab3=$scope.lista_pacientes.paciente[x].atenciones[at].lab2
                            item=$scope.lista_pacientes.paciente[x].atenciones[at].item
                            
                            valor_lab[at]={lab1,lab2,lab3}
                            at++;
                        }
                       
                        
                        
                        descripcion1=descripcion_cie[0]
                        descripcion2=descripcion_cie[1]
                        descripcion3=descripcion_cie[2]

                        Tipodianostico1=tipodianostico[0],
                        Tipodianostico2=tipodianostico[1],
                        Tipodianostico3=tipodianostico[2]

                        valor_lab1=valor_lab[0]
                        valor_lab2=valor_lab[1]
                        valor_lab3=valor_lab[2]

                        codigoCie1=Codigo_cie[0]
                        codigoCie2=Codigo_cie[1]
                        codigoCie3=Codigo_cie[2]
                        
                        dataPacientes[j](cont,fecha_Atencion,
                            distrito_procedencia,
                            idetnia,
                            idfinanciador,
                            nro_documento,
                            fecha_nacimiento,
                            nombres_paciente,
                            hc,
                            
                            edad,
                            sexo,
                            peso,
                            talla,
                            tipo_edad,
                            condicion_establecimiento,condicion_servicio,item,
                            descripcion1,descripcion2,descripcion3,
                            Tipodianostico1,Tipodianostico2,Tipodianostico3,
                            valor_lab1,valor_lab2,valor_lab3,
                            codigoCie1,codigoCie2,codigoCie3
                        );

                        
                    }
    
    
                        
                    limite++;
                    cont++;
                    if(limite==21){
                    limite=1;    
                        
                        
                    }
                    else{
                        let a=0

                        fecha_Atencion="";
                        distrito_procedencia="";
                        idetnia="";
                        idfinanciador="";
                        nro_documento="";
                        fecha_nacimiento="";
                        nombres_paciente="";
                        hc="";
                        
                        edad="";
                        sexo="";
                        peso="";
                        talla="";
                        tipo_edad="";
                        condicion_establecimiento="";condicion_servicio="";item="";
                        descripcion1="";descripcion2="";descripcion3="";
                        Tipodianostico1="";Tipodianostico2="";Tipodianostico3="";
                        valor_lab1="";valor_lab2="";valor_lab3="";
                        codigoCie1="";codigoCie2="";codigoCie3="";
                        
                       
                        dataPacientes[a](limite,fecha_Atencion,
                            distrito_procedencia,
                            idetnia,
                            idfinanciador,
                            nro_documento,
                            fecha_nacimiento,
                            nombres_paciente,
                            hc,
                            
                            edad,
                            sexo,
                            peso,
                            talla,
                            tipo_edad,
                            condicion_establecimiento,condicion_servicio,item,
                            descripcion1,descripcion2,descripcion3,
                            Tipodianostico1,Tipodianostico2,Tipodianostico3,
                            valor_lab1,valor_lab2,valor_lab3,
                            codigoCie1,codigoCie2,codigoCie3);

                            a++;
                    }
                    
                    x++;
                    
                }
                
            }
            
            $scope.piePag();
            if(i<pag-1){
                $scope.pdf.addPage();
            }
            
        }
        
        $scope.pdf.save('imprimir.pdf');
        

    }

    $scope.cabecera1=function(){
        //CABECERA
        $scope.pdf.setFontSize(5);
        $scope.pdf.text('LOTE', 5, 10);  $scope.pdf.rect(20, 7, 15, 5, 'S');
        $scope.pdf.text('PAGINA', 5, 16);  $scope.pdf.rect(20, 13, 15, 5, 'S');
        $scope.pdf.text('FECHA PROCES.', 5, 22);  $scope.pdf.rect(23, 19, 20, 5, 'S');
        $scope.pdf.text('DNI DIGITADOR', 5, 28);  $scope.pdf.rect(23, 25, 20, 5, 'S');

        $scope.pdf.setFontSize(12);
        $scope.pdf.setFont('Verdana','bold');
        $scope.pdf.text('MINISTERIO DE SALUD', 75, 13);
        $scope.pdf.setFontSize(9);
        $scope.pdf.setFont('Verdana','normal');
        $scope.pdf.text('OFICINA GENERAL DE TECNOLOGIAS DE LA INFORMACION', 50, 19);
        $scope.pdf.text('OFICINA DE GESTION DE LA INFORMACION', 60, 25);
        $scope.pdf.text('REGISTRO DIARIO DE ATENCION Y OTRAS ACTIVIDADES DE SALUD', 48, 31);

        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(162, 7, 43, 16, 'S');  $scope.pdf.text('FIRMA Y SELLO RESPONSABLE HIS', 167, 10);
        $scope.pdf.setFontSize(7);
        $scope.pdf.rect(170, 23, 5, 5, 'S');  $scope.pdf.text('1', 172, 26);
        $scope.pdf.rect(175, 23, 30, 5, 'S');  $scope.pdf.text('TURNO', 185, 26);
        $scope.pdf.rect(170, 28, 12, 5, 'S');  $scope.pdf.text('M', 174, 32);
        $scope.pdf.rect(182, 28, 11, 5, 'S');  $scope.pdf.text('T', 186, 32);
        $scope.pdf.rect(193, 28, 12, 5, 'S');  $scope.pdf.text('N', 198, 32);
        // FIN DE CABECERA
    }
    $scope.cabecera2=function(){
        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(5, 13, 165, 13, 'S');
        $scope.pdf.setFontSize(10);
        $scope.pdf.setFont('Verdana','bold');
        $scope.pdf.text('Registro Diario de Atención y Otras Actividades de Salud', 40, 19.5);

        $scope.pdf.setFontSize(6);
        $scope.pdf.setFont('Verdana','normal');
        $scope.pdf.rect(170, 13, 5, 5, 'S');  $scope.pdf.text('1', 172, 16);
        $scope.pdf.rect(175, 13, 30, 5, 'S');  $scope.pdf.text('TURNO', 185, 16);
        $scope.pdf.rect(170, 18, 12, 8, 'S');  $scope.pdf.text('M', 174, 22.5);
        $scope.pdf.rect(182, 18, 11, 8, 'S');  $scope.pdf.text('T', 186, 22.5);
        $scope.pdf.rect(193, 18, 12, 8, 'S');  $scope.pdf.text('N', 198, 22.5);
    }
    $scope.piePag=function(){
        $scope.pdf.setFontSize(5);
        // PIE DE CONTENIDO
        $scope.pdf.rect(5, 261, 63, 5, 'S');  $scope.pdf.text('ITEM 09: FINANCIADOR DE SALUD', 25, 264);
        $scope.pdf.rect(68, 261, 27, 5, 'S');  $scope.pdf.text('ITEM 12', 78, 264);
        $scope.pdf.rect(95, 261, 20, 5, 'S');  $scope.pdf.text('ITEM 16', 100, 264);
        $scope.pdf.rect(115, 261, 42, 5, 'S');  $scope.pdf.text('ITEM 17 y 18 (CONDICION DE INGRESO)', 117, 264);
        $scope.pdf.rect(157, 261, 48, 5, 'S');  $scope.pdf.text('FECHA DE ULTIMA REGLA', 167, 264);

        $scope.pdf.rect(5, 266, 63, 12, 'S');
        $scope.pdf.text('1 USUARIO', 6, 269);  $scope.pdf.text('2 SEGURO INTEGRAL (SIS)', 6, 272.5);  $scope.pdf.text('3 ESSALUD', 6, 276);
        $scope.pdf.text('4 SOAT', 33, 269);  $scope.pdf.text('4 SANIDAD FAP', 33, 272.5);  $scope.pdf.text('5 SANIDAD NAVAL', 33, 276);
        $scope.pdf.text('10 OTROS', 52, 269);  $scope.pdf.text('11 EXONERADO', 52, 272.5);

        $scope.pdf.rect(68, 266, 27, 12, 'S');  $scope.pdf.text('Registrar el nombre del Centro', 69.5, 269);  $scope.pdf.text('Poblado', 78, 272);
        $scope.pdf.rect(95, 266, 20, 12, 'S');  $scope.pdf.text('PESO = kg', 96.5, 269);  $scope.pdf.text('TALLA = Cm', 96.5, 272);  $scope.pdf.text('Hb = Valor', 96.5, 275);
        $scope.pdf.rect(115, 266, 42, 12, 'S');  $scope.pdf.text('N= PACIENTE NUEVO (1ER VEZ EN SU VIDA)', 116, 269);  $scope.pdf.text('C= PACIENTE CONTINUADOR EN EL AÑO', 116, 272);  $scope.pdf.text('R= PACIENTE REINGRESANTE EN EL AÑO', 116, 275);
        $scope.pdf.rect(157, 266, 48, 12, 'S');  $scope.pdf.text('Si no se cuenta con el dato se registrará la fecha de la', 158, 269);  $scope.pdf.text('primera ecografia', 175, 272);

        $scope.pdf.rect(5, 278, 19, 5, 'S');  $scope.pdf.text('58 MESTIZO', 6, 281);
        $scope.pdf.rect(24, 278, 18, 5, 'S');  $scope.pdf.text('26 CULINA', 25, 281);
        $scope.pdf.rect(42, 278, 28, 5, 'S');  $scope.pdf.text('10 CASHINAHUA', 43, 281);
        $scope.pdf.rect(70, 278, 30, 5, 'S');  $scope.pdf.text('05 ASHANINKA', 72, 281);
        $scope.pdf.rect(100, 278, 30, 5, 'S');  $scope.pdf.text('53 YAMINAHUA', 102, 281);
        $scope.pdf.rect(130, 278, 28, 5, 'S');  $scope.pdf.text('55 YIN - YAMI (PIRO)', 132, 281);
        $scope.pdf.rect(158, 278, 17, 5, 'S');  $scope.pdf.text('21 KAKATAIBO', 158.5, 281);
        $scope.pdf.rect(175, 278, 15, 5, 'S');  $scope.pdf.text('40 QUECHUAS', 176, 281);
        $scope.pdf.rect(190, 278, 15, 5, 'S');  $scope.pdf.text('07 AWAJUN', 191.5, 281);

        $scope.pdf.rect(5, 283, 19, 5, 'S');  $scope.pdf.text('45 SHIPIBO-CONIBO', 5.5, 286);
        $scope.pdf.rect(24, 283, 18, 5, 'S');  $scope.pdf.text('18 ISCONAHUA', 25, 286);
        $scope.pdf.rect(42, 283, 28, 5, 'S');  $scope.pdf.text('43 SHARANAHUA', 43, 286);
        $scope.pdf.rect(70, 283, 30, 5, 'S');  $scope.pdf.text('32 MACHIGUENGA', 71, 286);
        $scope.pdf.rect(100, 283, 30, 5, 'S');  $scope.pdf.text('3 AMANAHUACA', 101, 286);
        $scope.pdf.rect(130, 283, 28, 5, 'S');  $scope.pdf.text('54 YANESHA (AMUESHA)', 131, 286);
        $scope.pdf.rect(158, 283, 17, 5, 'S');  $scope.pdf.text('30 MASTANAHUA', 158.5, 286);
        $scope.pdf.rect(175, 283, 15, 5, 'S');  $scope.pdf.text('51 WAMPIS', 176, 286);
        $scope.pdf.rect(190, 283, 15, 5, 'S');  $scope.pdf.text('02 AIMARA', 191, 286);
        // FIN DE PIE DE CONTENIDO
    }
    $scope.primerasLineas1=function(){
        //INICIO DE CONTENIDO
        // linea 1
        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(5, 33, 5, 5, 'S'); $scope.pdf.text('2', 6, 36);
        $scope.pdf.rect(10, 33, 7, 5, 'S'); $scope.pdf.text('AÑO', 12, 36);
        $scope.pdf.rect(17, 33, 2, 5, 'S'); $scope.pdf.text('3', 17.5, 36);
        $scope.pdf.rect(19, 33, 19, 5, 'S'); $scope.pdf.text('MES', 26, 36);
        $scope.pdf.rect(38, 33, 2, 5, 'S'); $scope.pdf.text('4', 38.5, 36);
        $scope.pdf.rect(40, 33, 52, 5, 'S'); $scope.pdf.text('NOMBRE DE ESTABLECIMIENTO DE SALUD (IPRESS)', 41, 36);
        $scope.pdf.rect(92, 33, 2, 5, 'S'); $scope.pdf.text('5', 92.5, 36);
        $scope.pdf.rect(94, 33, 64, 5, 'S'); $scope.pdf.text('UNIDAD PRODUCTORA DE SERVICIOS (UPS)', 95, 36);
        $scope.pdf.rect(158, 33, 3, 5, 'S'); $scope.pdf.text('6', 159, 36);
        $scope.pdf.rect(161, 33, 44, 5, 'S'); $scope.pdf.text('NOMBRE DEL RESPONSABLE DE ATENCIÓN', 162, 36);

        // linea 2
        $scope.pdf.rect(5, 38, 12, 7, 'S'); $scope.pdf.text('', 6, 39);
        $scope.pdf.rect(17, 38, 21, 7, 'S'); $scope.pdf.text('', 18, 39);
        $scope.pdf.rect(38, 38, 54, 7, 'S'); $scope.pdf.text('', 40, 39);
        $scope.pdf.rect(92, 38, 66, 7, 'S'); $scope.pdf.text('', 68, 39);
        $scope.pdf.rect(158, 38, 3, 7, 'S'); $scope.pdf.text('', 159, 39);
        $scope.pdf.rect(161, 38, 19, 7, 'S'); $scope.pdf.text('', 162, 39);
        $scope.pdf.rect(180, 38, 25, 7, 'S'); $scope.pdf.text('', 183, 39);

        // linea 3
        $scope.pdf.rect(5, 45, 12, 4, 'S'); $scope.pdf.text('7', 11, 48);
        $scope.pdf.rect(17, 45, 21, 4, 'S'); $scope.pdf.text('8', 26, 48);
        $scope.pdf.rect(38, 45, 7, 4, 'S'); $scope.pdf.text('9', 40, 48);
        $scope.pdf.rect(45, 45, 21, 4, 'S'); $scope.pdf.text('11', 50, 48);
        $scope.pdf.rect(66, 45, 10, 4, 'S'); $scope.pdf.text('13', 70, 48);
        $scope.pdf.rect(76, 45, 6, 4, 'S'); $scope.pdf.text('14', 77, 48);
        $scope.pdf.rect(82, 45, 10, 4, 'S'); $scope.pdf.text('15', 86, 48);
        $scope.pdf.rect(92, 45, 12, 4, 'S'); $scope.pdf.text('16', 98, 48);
        $scope.pdf.rect(104, 45, 5, 4, 'S'); $scope.pdf.text('17', 106, 48);
        $scope.pdf.rect(109, 45, 5, 4, 'S'); $scope.pdf.text('18', 110, 48);
        $scope.pdf.rect(114, 45, 47, 4, 'S'); $scope.pdf.text('19', 135, 48);
        $scope.pdf.rect(161, 45, 12, 4, 'S'); $scope.pdf.text('20', 165, 48);
        $scope.pdf.rect(173, 45, 12, 4, 'S'); $scope.pdf.text('21', 177, 48);
        $scope.pdf.rect(185, 45, 20, 4, 'S'); $scope.pdf.text('22', 193, 48);

        // linea 4
        $scope.pdf.rect(5, 49, 12, 12, 'S'); $scope.pdf.text('DIA', 10, 55);
        $scope.pdf.rect(17, 49, 21, 4, 'S'); $scope.pdf.text('D.N.I.', 25, 52);
        $scope.pdf.rect(17, 53, 21, 4, 'S'); $scope.pdf.text('HISTORIA CLINICA', 18, 56);
        $scope.pdf.rect(17, 57, 21, 4, 'S'); $scope.pdf.text('GESTANTE/PUERPERA', 18, 60);
        $scope.pdf.rect(38, 49, 7, 4, 'S'); $scope.pdf.text('FINANC.', 38.2, 52);
        $scope.pdf.rect(38, 53, 7, 4, 'S'); $scope.pdf.text('10', 40, 56);
        $scope.pdf.rect(38, 57, 7, 4, 'S'); $scope.pdf.text('ETNIA', 39, 60);
        $scope.pdf.setFontSize(4);
        $scope.pdf.rect(45, 49, 21, 4, 'S'); $scope.pdf.text('DISTRITO DE PROCEDENCIA', 45.5, 52);
        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(45, 53, 21, 4, 'S'); $scope.pdf.text('12', 53, 56);
        $scope.pdf.rect(45, 57, 21, 4, 'S'); $scope.pdf.text('CENTRO POBLADO', 46, 60);
        $scope.pdf.rect(66, 49, 10, 12, 'S'); $scope.pdf.text('EDAD', 68, 55);
        $scope.pdf.rect(76, 49, 6, 12, 'S'); $scope.pdf.text('SEXO', 76.5, 55);
        $scope.pdf.setFontSize(4);
        $scope.pdf.rect(82, 49, 10, 12, 'S'); $scope.pdf.text('PERIMETRO', 82.5, 52); $scope.pdf.text('CEFALICO Y', 82.5, 56); $scope.pdf.text('ABDOMINAL', 82.5, 60);
        $scope.pdf.rect(92, 49, 12, 12, 'S'); $scope.pdf.text('EVALUACION', 93, 52); $scope.pdf.setFontSize(3.5); $scope.pdf.text('ANTROPOMETRICA', 92.3, 56); $scope.pdf.setFontSize(4); $scope.pdf.text('HEMOGLOBINA', 93, 60);
        $scope.pdf.setFontSize(4);
        $scope.pdf.rect(104, 49, 5, 12, 'S'); $scope.pdf.text('ESTA-', 104.5, 52); $scope.pdf.text('BLEC', 104.7, 56);
        $scope.pdf.rect(109, 49, 5, 12, 'S'); $scope.pdf.text('SER-', 109.5, 52); $scope.pdf.text('VICIO', 109.7, 56);
        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(114, 49, 47, 12, 'S'); $scope.pdf.text('DIAGNOSTICO MOTIVO DE CONSULTA', 122, 52); $scope.pdf.text('Y/O ACTIVIDAD DE SALUD', 125, 56);
        $scope.pdf.rect(161, 49, 12, 8, 'S'); $scope.pdf.text('TIPO DE', 163.5, 52); $scope.pdf.setFontSize(4.5); $scope.pdf.text('DIAGNOSTICO', 162, 55);
        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(161, 57, 4, 4, 'S');$scope.pdf.text('P', 162.5, 60);
        $scope.pdf.rect(165, 57, 4, 4, 'S');$scope.pdf.text('D', 166.5, 60);
        $scope.pdf.rect(169, 57, 4, 4, 'S');$scope.pdf.text('R', 170.5, 60);
        $scope.pdf.rect(173, 49, 12, 8, 'S'); $scope.pdf.text('VALOR', 175.5, 52); $scope.pdf.text('LAB', 175, 55);
        $scope.pdf.rect(173, 57, 4, 4, 'S');$scope.pdf.text('1°', 174.5, 60);
        $scope.pdf.rect(177, 57, 4, 4, 'S');$scope.pdf.text('2°', 178.5, 60);
        $scope.pdf.rect(181, 57, 4, 4, 'S');$scope.pdf.text('3°', 182.5, 60);
        $scope.pdf.rect(185, 49, 20, 12, 'S'); $scope.pdf.text('CÓDIGO', 191, 52); $scope.pdf.text('CIE / CPT', 191, 55);
    }
  
    $scope.paciente1=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
        fecha_nacimiento,nombres_paciente,hc,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
        descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
        codigoCie1,codigoCie2,codigoCie3){
            const partes = fecha_Atencion.split('/');
        // linea 5
        $scope.pdf.rect(5, 61, 5, 20, 'S');$scope.pdf.text(cont+"", 6.5, 63.5);
        $scope.pdf.rect(10, 61, 195, 8, 'S');$scope.pdf.text(partes[0]+"",13,75.5);
        $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 63.5); $scope.pdf.text(fecha_nacimiento+'',40,63.5);
        $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 63.5);$scope.pdf.text('',110,63.5);
        $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 63.5);$scope.pdf.text('',175,63.5);
        $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 67.5);$scope.pdf.text(nombres_paciente+'',45,67.5);
        $scope.pdf.rect(10, 69, 7, 12, 'S');$scope.pdf.text('',12.5,71.5);$scope.pdf.text('',12.5,75);$scope.pdf.text('',11.5,79);                // para poner el dia - falta el texto
        $scope.pdf.rect(17, 69, 21, 4, 'S');$scope.pdf.text( nro_documento+'',22.5,71.5); 
        $scope.pdf.rect(17, 73, 21, 4, 'S');$scope.pdf.text(hc+'',22.5,75.5); 
        $scope.pdf.rect(17, 77, 21, 4, 'S');$scope.pdf.text('',22.5,79.5); 
        $scope.pdf.rect(38, 69, 7, 6, 'S'); $scope.pdf.text(idfinanciador+'',41,72.5);
        $scope.pdf.rect(38, 75, 7, 6, 'S'); $scope.pdf.text(idetnia+'',41,78.5);
        $scope.pdf.rect(45, 69, 21, 6, 'S');$scope.pdf.text(distrito_procedencia+'',53,72.5);
        $scope.pdf.rect(45, 75, 21, 6, 'S');$scope.pdf.text('',53,78.5);
        $scope.pdf.rect(66, 69, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,76);
        if(tipo_edad=='A'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(71, 69, 5, 4, 'F');
        }else if(tipo_edad=='M'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(71, 73, 5, 4, 'F');
        }else if(tipo_edad=='D'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(71, 77, 5, 4, 'F');
        }
        $scope.pdf.rect(71, 69, 5, 4, 'S'); $scope.pdf.text('A', 73, 71.5);
        $scope.pdf.rect(71, 73, 5, 4, 'S'); $scope.pdf.text('M', 73, 75.5);
        $scope.pdf.rect(71, 77, 5, 4, 'S'); $scope.pdf.text('D', 73, 79.5);
        if(sexo=='M' ){
           $scope.pdf.setFillColor(255, 0, 0); 
           $scope.pdf.rect(76, 69, 6, 6, 'F');
        }else if(sexo=='F'){
            $scope.pdf.setFillColor(255, 0, 0); 
            $scope.pdf.rect(76, 75, 6, 6, 'F');
        }
        $scope.pdf.rect(76, 69, 6, 6, 'S'); $scope.pdf.text('M', 78, 72.5);
        $scope.pdf.rect(76, 75, 6, 6, 'S'); $scope.pdf.text('F', 78, 78.5);$scope.pdf.text('F', 78, 78.5);
        $scope.pdf.rect(82, 69, 5, 6, 'S'); $scope.pdf.text('PC', 83, 72.5);$scope.pdf.text('', 88, 72.5);
        $scope.pdf.rect(82, 75, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 78.5);$scope.pdf.text('', 88, 78.5);
        $scope.pdf.rect(87, 69, 5, 6, 'S'); //falta el texto
        $scope.pdf.rect(87, 75, 5, 6, 'S'); //falta el texto
        $scope.pdf.rect(92, 69, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 71.5);$scope.pdf.text(peso+'', 98.5, 71.5);
        $scope.pdf.rect(92, 73, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 75.5);$scope.pdf.text(talla+'', 98.5, 75.5);
        $scope.pdf.rect(92, 77, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 79.5);$scope.pdf.text('', 98.5, 79.5);
        $scope.pdf.rect(98, 69, 6, 4, 'S'); //falta el texto
        $scope.pdf.rect(98, 73, 6, 4, 'S'); //falta el texto
        $scope.pdf.rect(98, 77, 6, 4, 'S'); //falta el texto
        if(condicion_establecimiento=='N'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(104, 69, 5, 4, 'F'); 
        }else if(condicion_establecimiento=='C'){
            $scope.pdf.setFillColor(255, 0, 0); 
            $scope.pdf.rect(104, 73, 5, 4, 'F');
        }else if(condicion_establecimiento=='R'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(104, 77, 5, 4, 'F'); 
        }
        if(condicion_servicio=='N'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(109, 69, 5, 4, 'F'); 
        }else if(condicion_servicio=='C'){
            $scope.pdf.setFillColor(255, 0, 0); 
            $scope.pdf.rect(109, 73, 5, 4, 'F');
        }else if(condicion_servicio=='R'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(109, 77, 5, 4, 'F');
        }
        $scope.pdf.rect(104, 69, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 71.5);
        $scope.pdf.rect(104, 73, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 75.5);
        $scope.pdf.rect(104, 77, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 79.5);
        
        $scope.pdf.rect(109, 69, 5, 4, 'S'); $scope.pdf.text('N', 111, 71.5);
        $scope.pdf.rect(109, 73, 5, 4, 'S'); $scope.pdf.text('C', 111, 75.5);
        $scope.pdf.rect(109, 77, 5, 4, 'S'); $scope.pdf.text('R', 111, 79.5);

        $scope.pdf.rect(114, 69, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 71.5);$scope.pdf.text(descripcion1+'', 116.5, 71.5);
        $scope.pdf.rect(114, 73, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 75.5);$scope.pdf.text(descripcion2+'', 116.5, 75.5);
        $scope.pdf.rect(114, 77, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 79.5);$scope.pdf.text(descripcion3+'', 116.5, 79.5);

        if(Tipodianostico1=='P'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(161, 69, 4, 4, 'F');
        }else if(Tipodianostico1=='D'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(165, 69, 4, 4, 'F');
        }else if(Tipodianostico1=='R'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(169, 69, 4, 4, 'F');
        }

        if(Tipodianostico2=='P'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(161, 73, 4, 4, 'F');
        }else if(Tipodianostico2=='D'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(165, 73, 4, 4, 'F');
        }else if(Tipodianostico2=='R'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(169, 73, 4, 4, 'F');
        }
        if(Tipodianostico3=='P'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(161, 77, 4, 4, 'F');
        }else if(Tipodianostico3=='D'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(165, 77, 4, 4, 'F')
        }else if(Tipodianostico3=='R'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(169, 77, 4, 4, 'F');
        }

        if(valor_lab1){
            if(valor_lab1.lab1=='1'){
                $scope.pdf.setFillColor(255, 0, 0);
                $scope.pdf.rect(173, 69, 4, 4, 'F');
            }else if(valor_lab1.lab2=='1'){
                $scope.pdf.setFillColor(255, 0, 0);
                $scope.pdf.rect(177, 69, 4, 4, 'F');
            }else if(valor_lab1.lab3=='1'){
                $scope.pdf.setFillColor(255, 0, 0);
                $scope.pdf.rect(181, 69, 4, 4, 'F');
            }
        }
        

        if(valor_lab2.lab1=='1'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(173, 73, 4, 4, 'F');
        }else if(valor_lab2.lab2=='1'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(177, 73, 4, 4, 'F');
        }else if(valor_lab2.lab3=='1'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(181, 73, 4, 4, 'F');
        }
        if(valor_lab3){
            if(valor_lab3.lab1=='1'){
                $scope.pdf.setFillColor(255, 0, 0);
                $scope.pdf.rect(173, 77, 4, 4, 'F');
            }else if(valor_lab3.lab2=='1'){
                $scope.pdf.setFillColor(255, 0, 0);
                $scope.pdf.rect(177, 77, 4, 4, 'F');
            }else if(valor_lab3.lab3=='1'){
                $scope.pdf.setFillColor(255, 0, 0);
                $scope.pdf.rect(181, 77, 4, 4, 'F');
            }
        }
        

        $scope.pdf.rect(161, 69, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 71.5);
        $scope.pdf.rect(161, 73, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 75.5);
        $scope.pdf.rect(161, 77, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 79.5);

        $scope.pdf.rect(165, 69, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 71.5);
        $scope.pdf.rect(165, 73, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 75.5);
        $scope.pdf.rect(165, 77, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 79.5);

        $scope.pdf.rect(169, 69, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 71.5);
        $scope.pdf.rect(169, 73, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 75.5);
        $scope.pdf.rect(169, 77, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 79.5);

        $scope.pdf.rect(173, 69, 4, 4, 'S'); $scope.pdf.text('', 174.5, 71.5);
        $scope.pdf.rect(173, 73, 4, 4, 'S'); $scope.pdf.text('', 174.5, 75.5);
        $scope.pdf.rect(173, 77, 4, 4, 'S'); $scope.pdf.text('', 174.5, 79.5);

        $scope.pdf.rect(177, 69, 4, 4, 'S'); $scope.pdf.text('', 178.5, 71.5);
        $scope.pdf.rect(177, 73, 4, 4, 'S'); $scope.pdf.text('', 178.5, 75.5);
        $scope.pdf.rect(177, 77, 4, 4, 'S'); $scope.pdf.text('', 178.5, 79.5);

        $scope.pdf.rect(181, 69, 4, 4, 'S'); $scope.pdf.text('', 182.5, 71.5);
        $scope.pdf.rect(181, 73, 4, 4, 'S'); $scope.pdf.text('', 182.5, 75.5);
        $scope.pdf.rect(181, 77, 4, 4, 'S'); $scope.pdf.text('', 182.5, 79.5);

        $scope.pdf.rect(185, 69, 20, 4, 'S'); $scope.pdf.text(codigoCie1+'', 186.5, 71.5);
        $scope.pdf.rect(185, 73, 20, 4, 'S'); $scope.pdf.text(codigoCie2+'', 186.5, 75.5);
        $scope.pdf.rect(185, 77, 20, 4, 'S'); $scope.pdf.text(codigoCie3+'', 186.5, 79.5);
    }
    $scope.paciente2=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
        fecha_nacimiento,nombres_paciente,hc,fecha_Atencion,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
        descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
        codigoCie1,codigoCie2,codigoCie3){
        // linea 6
        $scope.pdf.rect(5, 81, 5, 20, 'S'); $scope.pdf.text(cont+'', 6.5, 83);
        $scope.pdf.rect(10, 81, 195, 8, 'S');
        $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 84.5);$scope.pdf.text(fecha_nacimiento+'',40,83.5); 
        $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 84.5);$scope.pdf.text('',110,83.5);
        $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 84.5);$scope.pdf.text('',175,83.5);
        $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 87.5);$scope.pdf.text(nombres_paciente+'',45,87.5);
        $scope.pdf.rect(10, 89, 7, 12, 'S');$scope.pdf.text('',12.5,91.5);$scope.pdf.text('',12.5,95);$scope.pdf.text('',11.5,99); // para poner el dia - falta el texto
        $scope.pdf.rect(17, 89, 21, 4, 'S');$scope.pdf.text('',22.5,91.5); 
        $scope.pdf.rect(17, 93, 21, 4, 'S');$scope.pdf.text(hc+'',22.5,95.5);
        $scope.pdf.rect(17, 97, 21, 4, 'S');$scope.pdf.text('',22.5,99.5); 
        $scope.pdf.rect(38, 89, 7, 6, 'S'); $scope.pdf.text('',41,92.5);
        $scope.pdf.rect(38, 95, 7, 6, 'S'); $scope.pdf.text('',41,98.5);
        $scope.pdf.rect(45, 89, 21, 6, 'S');$scope.pdf.text('',53,92.5);
        $scope.pdf.rect(45, 95, 21, 6, 'S');$scope.pdf.text('',53,98.5);
        $scope.pdf.rect(66, 89, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,96);
        if(tipo_edad=='A'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(71, 89, 5, 4, 'F');
        }else if(tipo_edad=='M'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(71, 93, 5, 4, 'F');
        }else if(tipo_edad=='D'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(71, 97, 5, 4, 'F');
        }
        $scope.pdf.rect(71, 89, 5, 4, 'S'); $scope.pdf.text('A', 73, 91.5);
        $scope.pdf.rect(71, 93, 5, 4, 'S'); $scope.pdf.text('M', 73, 95.5);
        $scope.pdf.rect(71, 97, 5, 4, 'S'); $scope.pdf.text('D', 73, 99.5);
        if(sexo=='M' ){
            $scope.pdf.setFillColor(255, 0, 0); 
            $scope.pdf.rect(76, 89, 6, 6, 'F');
         }else if(sexo=='F'){
             $scope.pdf.setFillColor(255, 0, 0); 
             $scope.pdf.rect(76, 95, 6, 6, 'F');
         }
        $scope.pdf.rect(76, 89, 6, 6, 'S'); $scope.pdf.text('M', 78, 92.5);
        $scope.pdf.rect(76, 95, 6, 6, 'S'); $scope.pdf.text('F', 78, 98.5);
        $scope.pdf.rect(82, 89, 5, 6, 'S'); $scope.pdf.text('PC', 83, 92.5);$scope.pdf.text('', 88, 92.5);
        $scope.pdf.rect(82, 95, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 98.5);$scope.pdf.text('', 88, 98.5);
        $scope.pdf.rect(87, 89, 5, 6, 'S'); //falta el texto
        $scope.pdf.rect(87, 95, 5, 6, 'S'); //falta el texto
        $scope.pdf.rect(92, 89, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 91.5);$scope.pdf.text(peso+'', 98.5, 91.5);
        $scope.pdf.rect(92, 93, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 95.5);$scope.pdf.text(talla+'', 98.5, 95.5);
        $scope.pdf.rect(92, 97, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 99.5);$scope.pdf.text('', 98.5, 99.5);
        $scope.pdf.rect(98, 89, 6, 4, 'S'); //falta el texto
        $scope.pdf.rect(98, 93, 6, 4, 'S'); //falta el texto
        $scope.pdf.rect(98, 97, 6, 4, 'S'); //falta el texto
        if(condicion_establecimiento=='N'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(104, 89, 5, 4, 'F');
        }else if(condicion_establecimiento=='C'){
            $scope.pdf.setFillColor(255, 0, 0); 
            $scope.pdf.rect(104, 93, 5, 4, 'F');
        }else if(condicion_establecimiento=='R'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(104, 97, 5, 4, 'F');
        }

        if(condicion_servicio=='N'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(109, 89, 5, 4, 'F');
        }else if(condicion_servicio=='C'){
            $scope.pdf.setFillColor(255, 0, 0); 
            $scope.pdf.rect(109, 93, 5, 4, 'F');
        }else if(condicion_servicio=='R'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(109, 97, 5, 4, 'F');
        }
        $scope.pdf.rect(104, 89, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 91.5);
        $scope.pdf.rect(104, 93, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 95.5);
        $scope.pdf.rect(104, 97, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 99.5);
        $scope.pdf.rect(109, 89, 5, 4, 'S'); $scope.pdf.text('N', 111, 91.5);
        $scope.pdf.rect(109, 93, 5, 4, 'S'); $scope.pdf.text('C', 111, 95.5);
        $scope.pdf.rect(109, 97, 5, 4, 'S'); $scope.pdf.text('R', 111, 99.5);

        $scope.pdf.rect(114, 89, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 91.5);$scope.pdf.text('', 116.5, 91.5);
        $scope.pdf.rect(114, 93, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 95.5);$scope.pdf.text('', 116.5, 95.5);
        $scope.pdf.rect(114, 97, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 99.5);$scope.pdf.text('', 116.5, 99.5);
        if(Tipodianostico1=='P'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(161, 89, 4, 4, 'F');
        }else if(Tipodianostico1=='D'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(165, 89, 4, 4, 'F');
        }else if(Tipodianostico1=='R'){
            $scope.pdf.setFillColor(255, 0, 0);
            $scope.pdf.rect(169, 89, 4, 4, 'F');
        }
        
        // if(valor_lab1=='1'){
        //     $scope.pdf.setFillColor(255, 0, 0);
        //     $scope.pdf.rect(173, 89, 4, 4, 'F');
        // }else if(valor_lab2=='2'){
        //     $scope.pdf.setFillColor(255, 0, 0);
        //     $scope.pdf.rect(177, 89, 4, 4, 'F');
        // }else if(valor_lab3=='3'){
        //     $scope.pdf.setFillColor(255, 0, 0);
        //     $scope.pdf.rect(181, 89, 4, 4, 'F');
        
        $scope.pdf.rect(161, 89, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 91.5);
        $scope.pdf.rect(161, 93, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 95.5);
        $scope.pdf.rect(161, 97, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 99.5);
        $scope.pdf.rect(165, 89, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 91.5);
        $scope.pdf.rect(165, 93, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 95.5);
        $scope.pdf.rect(165, 97, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 99.5);
        $scope.pdf.rect(169, 89, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 91.5);
        $scope.pdf.rect(169, 93, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 95.5);
        $scope.pdf.rect(169, 97, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 99.5);

        $scope.pdf.rect(173, 89, 4, 4, 'S'); $scope.pdf.text('', 174.5, 91.5);
        $scope.pdf.rect(173, 93, 4, 4, 'S'); $scope.pdf.text('', 174.5, 95.5);
        $scope.pdf.rect(173, 97, 4, 4, 'S'); $scope.pdf.text('', 174.5, 99.5);

        $scope.pdf.rect(177, 89, 4, 4, 'S'); $scope.pdf.text('', 178.5, 91.5);
        $scope.pdf.rect(177, 93, 4, 4, 'S'); $scope.pdf.text('', 178.5, 95.5);
        $scope.pdf.rect(177, 97, 4, 4, 'S'); $scope.pdf.text('', 178.5, 99.5);

        $scope.pdf.rect(181, 89, 4, 4, 'S'); $scope.pdf.text('', 182.5, 91.5);
        $scope.pdf.rect(181, 93, 4, 4, 'S'); $scope.pdf.text('', 182.5, 95.5);
        $scope.pdf.rect(181, 97, 4, 4, 'S'); $scope.pdf.text('', 182.5, 99.5);

        $scope.pdf.rect(185, 89, 20, 4, 'S'); $scope.pdf.text(codigoCie1+'', 186.5, 91.5);
        $scope.pdf.rect(185, 93, 20, 4, 'S'); $scope.pdf.text(codigoCie2+'', 186.5, 95.5);
        $scope.pdf.rect(185, 97, 20, 4, 'S'); $scope.pdf.text(codigoCie3+'', 186.5, 99.5);
    }
    // $scope.paciente3=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
    //     fecha_nacimiento,nombres_paciente,hc,fecha_Atencion,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
    //     descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
    //     codigoCie1,codigoCie2,codigoCie3){
    //     // linea 7
    //     $scope.pdf.rect(5, 101, 5, 20, 'S'); $scope.pdf.text(cont+'', 6.5, 103);
    //     $scope.pdf.rect(10, 101, 195, 8, 'S');
    //     $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 104.5);$scope.pdf.text(fecha_Nac+'',40,103.5);  
    //     $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 104.5); $scope.pdf.text(fecha_hb+'',110,103.5);
    //     $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 104.5);$scope.pdf.text(fecha_regla+'',175,103.5);
    //     $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 107.5);$scope.pdf.text(nombre+'',45,107.5);
    //     $scope.pdf.rect(10, 109, 7, 12, 'S');$scope.pdf.text(dia+'',12.5,111.5);$scope.pdf.text(''+mes,12.5,115);$scope.pdf.text(año+'',11.5,119); // para poner el dia - falta el texto
    //     $scope.pdf.rect(17, 109, 21, 4, 'S');$scope.pdf.text(dni+'',22.5,111.5); 
    //     $scope.pdf.rect(17, 113, 21, 4, 'S');$scope.pdf.text(historia_clinica+'',22.5,115.5);
    //     $scope.pdf.rect(17, 117, 21, 4, 'S');$scope.pdf.text(gestante_puerpera+'',22.5,119.5); 
    //     $scope.pdf.rect(38, 109, 7, 6, 'S'); $scope.pdf.text(financ+'',41,112.5);
    //     $scope.pdf.rect(38, 115, 7, 6, 'S'); $scope.pdf.text(etnia+'',41,118.5);
    //     $scope.pdf.rect(45, 109, 21, 6, 'S');$scope.pdf.text(distrito_procedencia+'',53,112.5);
    //     $scope.pdf.rect(45, 115, 21, 6, 'S');$scope.pdf.text(centro_poblado+'',53,118.5);
    //     $scope.pdf.rect(66, 109, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,116);
    //     if(edad_tiempo=='A'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 109, 5, 4, 'F');
    //     }else if(edad_tiempo=='M'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 113, 5, 4, 'F');
    //     }else if(edad_tiempo=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 117, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(71, 109, 5, 4, 'S'); $scope.pdf.text('A', 73, 111.5);
    //     $scope.pdf.rect(71, 113, 5, 4, 'S'); $scope.pdf.text('M', 73, 115.5);
    //     $scope.pdf.rect(71, 117, 5, 4, 'S'); $scope.pdf.text('D', 73, 119.5);
    //     if(sexo=='M' ){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 109, 6, 6, 'F');
    //      }else if(sexo=='F'){
    //          $scope.pdf.setFillColor(255, 0, 0); 
    //          $scope.pdf.rect(76, 115, 6, 6, 'F');
    //      }
    //     $scope.pdf.rect(76, 109, 6, 6, 'S'); $scope.pdf.text('M', 78, 112.5);
    //     $scope.pdf.rect(76, 115, 6, 6, 'S'); $scope.pdf.text('F', 78, 118.5);
    //     $scope.pdf.rect(82, 109, 5, 6, 'S'); $scope.pdf.text('PC', 83, 112.5);$scope.pdf.text(pc+'', 88, 112.5);
    //     $scope.pdf.rect(82, 115, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 118.5);$scope.pdf.text(pab+'', 88, 118.5);
    //     $scope.pdf.rect(87, 109, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(87, 115, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(92, 109, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 111.5);$scope.pdf.text(peso+'', 98.5, 111.5);
    //     $scope.pdf.rect(92, 113, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 115.5);$scope.pdf.text(talla+'', 98.5, 115.5);
    //     $scope.pdf.rect(92, 117, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 119.5);$scope.pdf.text(Hemoglobina+'', 98.5, 119.5);
    //     $scope.pdf.rect(98, 109, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 113, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 117, 6, 4, 'S'); //falta el texto
    //     if(estable=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 109, 5, 4, 'F');
    //     }else if(estable=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(104, 113, 5, 4, 'F');
    //     }else if(estable=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 117, 5, 4, 'F');
    //     }

    //     if(servicio=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 109, 5, 4, 'F');
    //     }else if(servicio=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(109, 113, 5, 4, 'F');
    //     }else if(servicio=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 117, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(104, 109, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 111.5);
    //     $scope.pdf.rect(104, 113, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 115.5);
    //     $scope.pdf.rect(104, 117, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 119.5);
    //     $scope.pdf.rect(109, 109, 5, 4, 'S'); $scope.pdf.text('N', 111, 111.5);
    //     $scope.pdf.rect(109, 113, 5, 4, 'S'); $scope.pdf.text('C', 111, 115.5);
    //     $scope.pdf.rect(109, 117, 5, 4, 'S'); $scope.pdf.text('R', 111, 119.5);

    //     $scope.pdf.rect(114, 109, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 111.5);$scope.pdf.text(diagnostico1+'', 116.5, 111.5);
    //     $scope.pdf.rect(114, 113, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 115.5);$scope.pdf.text(diagnostico2+'', 116.5, 115.5);
    //     $scope.pdf.rect(114, 117, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 119.5);$scope.pdf.text(diagnostico3+'', 116.5, 119.5);
    //     if(tipo_diagnostico=='P'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(161, 109, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(165, 109, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(169, 109, 4, 4, 'F');
    //     }
        
    //     if(valor_lab=='1'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(173, 109, 4, 4, 'F');
    //     }else if(valor_lab=='2'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(177, 109, 4, 4, 'F');
    //     }else if(valor_lab=='3'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(181, 109, 4, 4, 'F');
            
    //     }
    //     $scope.pdf.rect(161, 109, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 111.5);
    //     $scope.pdf.rect(161, 113, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 115.5);
    //     $scope.pdf.rect(161, 117, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 119.5);
    //     $scope.pdf.rect(165, 109, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 111.5);
    //     $scope.pdf.rect(165, 113, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 115.5);
    //     $scope.pdf.rect(165, 117, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 119.5);
    //     $scope.pdf.rect(169, 109, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 111.5);
    //     $scope.pdf.rect(169, 113, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 115.5);
    //     $scope.pdf.rect(169, 117, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 119.5);

    //     $scope.pdf.rect(173, 109, 4, 4, 'S'); $scope.pdf.text('1', 174.5, 111.5);
    //     $scope.pdf.rect(173, 113, 4, 4, 'S'); $scope.pdf.text('1', 174.5, 115.5);
    //     $scope.pdf.rect(173, 117, 4, 4, 'S'); $scope.pdf.text('1', 174.5, 119.5);

    //     $scope.pdf.rect(177, 109, 4, 4, 'S'); $scope.pdf.text('', 178.5, 111.5);
    //     $scope.pdf.rect(177, 113, 4, 4, 'S'); $scope.pdf.text('', 178.5, 115.5);
    //     $scope.pdf.rect(177, 117, 4, 4, 'S'); $scope.pdf.text('', 178.5, 119.5);

    //     $scope.pdf.rect(181, 109, 4, 4, 'S'); $scope.pdf.text('', 182.5, 111.5);
    //     $scope.pdf.rect(181, 113, 4, 4, 'S'); $scope.pdf.text('', 182.5, 115.5);
    //     $scope.pdf.rect(181, 117, 4, 4, 'S'); $scope.pdf.text('', 182.5, 119.5);

    //     $scope.pdf.rect(185, 109, 20, 4, 'S'); $scope.pdf.text(codigo_cie+'', 186.5, 111.5);
    //     $scope.pdf.rect(185, 113, 20, 4, 'S'); $scope.pdf.text('', 186.5, 115.5);
    //     $scope.pdf.rect(185, 117, 20, 4, 'S'); $scope.pdf.text('', 186.5, 119.5);

    // }
    // $scope.paciente4=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
    //     fecha_nacimiento,nombres_paciente,hc,fecha_Atencion,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
    //     descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
    //     codigoCie1,codigoCie2,codigoCie3){
    //     // linea 8
    //     $scope.pdf.rect(5, 121, 5, 20, 'S'); $scope.pdf.text(cont+'', 6.5, 123);

    //     $scope.pdf.rect(10, 121, 195, 8, 'S');
    //     $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 124.5);$scope.pdf.text(fecha_Nac+'',40,123.5); 
    //     $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 124.5); $scope.pdf.text(fecha_hb+'',110,123.5);
    //     $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 124.5);$scope.pdf.text(fecha_regla+'',175,123.5);
    //     $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 127.5);$scope.pdf.text(nombre+'',45,127.5);
    //     $scope.pdf.rect(10, 129, 7, 12, 'S');$scope.pdf.text(dia+'',12.5,131.5);$scope.pdf.text(''+mes,12.5,135);$scope.pdf.text(año+'',11.5,139); // para poner el dia - falta el texto
    //     $scope.pdf.rect(17, 129, 21, 4, 'S');$scope.pdf.text(dni+'',22.5,131.5); 
    //     $scope.pdf.rect(17, 133, 21, 4, 'S');$scope.pdf.text(historia_clinica+'',22.5,135.5);
    //     $scope.pdf.rect(17, 137, 21, 4, 'S');$scope.pdf.text(gestante_puerpera+'',22.5,139.5); 
    //     $scope.pdf.rect(38, 129, 7, 6, 'S'); $scope.pdf.text(financ+'',41,132.5);
    //     $scope.pdf.rect(38, 135, 7, 6, 'S'); $scope.pdf.text(etnia+'',41,138.5);
    //     $scope.pdf.rect(45, 129, 21, 6, 'S');$scope.pdf.text(distrito_procedencia+'',53,132.5);
    //     $scope.pdf.rect(45, 135, 21, 6, 'S');$scope.pdf.text(centro_poblado+'',53,138.5);
    //     $scope.pdf.rect(66, 129, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,136);
    //     if(edad_tiempo=='A'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 129, 5, 4, 'F');
    //     }else if(edad_tiempo=='M'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 133, 5, 4, 'F');
    //     }else if(edad_tiempo=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 137, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(71, 129, 5, 4, 'S'); $scope.pdf.text('A', 73, 131.5);
    //     $scope.pdf.rect(71, 133, 5, 4, 'S'); $scope.pdf.text('M', 73, 135.5);
    //     $scope.pdf.rect(71, 137, 5, 4, 'S'); $scope.pdf.text('D', 73, 139.5);
    //     if(sexo=='M' ){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 129, 6, 6, 'F');
    //      }else if(sexo=='F'){
    //          $scope.pdf.setFillColor(255, 0, 0); 
    //          $scope.pdf.rect(76, 135, 6, 6, 'F');
    //      }
    //     $scope.pdf.rect(76, 129, 6, 6, 'S'); $scope.pdf.text('M', 78, 133.5);
    //     $scope.pdf.rect(76, 135, 6, 6, 'S'); $scope.pdf.text('F', 78, 138.5);
    //     $scope.pdf.rect(82, 129, 5, 6, 'S'); $scope.pdf.text('PC', 83, 133.5);$scope.pdf.text(pc+'', 88, 132.5);
    //     $scope.pdf.rect(82, 135, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 138.5);$scope.pdf.text(pab+'', 88, 138.5);
    //     $scope.pdf.rect(87, 129, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(87, 135, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(92, 129, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 131.5);$scope.pdf.text(peso+'', 98.5, 131.5);
    //     $scope.pdf.rect(92, 133, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 135.5);$scope.pdf.text(talla+'', 98.5, 135.5);
    //     $scope.pdf.rect(92, 137, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 139.5);$scope.pdf.text(Hemoglobina+'', 98.5, 139.5);
    //     $scope.pdf.rect(98, 129, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 133, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 137, 6, 4, 'S'); //falta el texto
    //     if(estable=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 129, 5, 4, 'F');
    //     }else if(estable=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(104, 133, 5, 4, 'F');
    //     }else if(estable=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 137, 5, 4, 'F');
    //     }

    //     if(servicio=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 129, 5, 4, 'F');
    //     }else if(servicio=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(109, 133, 5, 4, 'F');
    //     }else if(servicio=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 137, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(104, 129, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 131.5);
    //     $scope.pdf.rect(104, 133, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 135.5);
    //     $scope.pdf.rect(104, 137, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 139.5);
    //     $scope.pdf.rect(109, 129, 5, 4, 'S'); $scope.pdf.text('N', 111, 131.5);
    //     $scope.pdf.rect(109, 133, 5, 4, 'S'); $scope.pdf.text('C', 111, 135.5);
    //     $scope.pdf.rect(109, 137, 5, 4, 'S'); $scope.pdf.text('R', 111, 139.5);

    //     $scope.pdf.rect(114, 129, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 131.5);$scope.pdf.text(diagnostico1+'', 116.5, 131.5)
    //     $scope.pdf.rect(114, 133, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 135.5);$scope.pdf.text(diagnostico2+'', 116.5, 135.5);
    //     $scope.pdf.rect(114, 137, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 139.5);$scope.pdf.text(diagnostico3+'', 116.5, 139.5);

    //     if(tipo_diagnostico=='P'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(161, 129, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(165, 129, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(169, 129, 4, 4, 'F');
    //     }
        
    //     if(valor_lab=='1'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(173, 129, 4, 4, 'F');
    //     }else if(valor_lab=='2'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(177, 129, 4, 4, 'F');
    //     }else if(valor_lab=='3'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(181, 129, 4, 4, 'F');
    //     }
    //     $scope.pdf.rect(161, 129, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 131.5);
    //     $scope.pdf.rect(161, 133, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 135.5);
    //     $scope.pdf.rect(161, 137, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 139.5);
    //     $scope.pdf.rect(165, 129, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 131.5);
    //     $scope.pdf.rect(165, 133, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 135.5);
    //     $scope.pdf.rect(165, 137, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 139.5);
    //     $scope.pdf.rect(169, 129, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 131.5);
    //     $scope.pdf.rect(169, 133, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 135.5);
    //     $scope.pdf.rect(169, 137, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 139.5);

    //     $scope.pdf.rect(173, 129, 4, 4, 'S'); $scope.pdf.text('1', 174.5, 131.5);
    //     $scope.pdf.rect(173, 133, 4, 4, 'S'); $scope.pdf.text('1', 174.5, 135.5);
    //     $scope.pdf.rect(173, 137, 4, 4, 'S'); $scope.pdf.text('1', 174.5, 139.5);

    //     $scope.pdf.rect(177, 129, 4, 4, 'S'); $scope.pdf.text('', 178.5, 131.5);
    //     $scope.pdf.rect(177, 133, 4, 4, 'S'); $scope.pdf.text('', 178.5, 135.5);
    //     $scope.pdf.rect(177, 137, 4, 4, 'S'); $scope.pdf.text('', 178.5, 139.5);

    //     $scope.pdf.rect(181, 129, 4, 4, 'S'); $scope.pdf.text('', 182.5, 131.5);
    //     $scope.pdf.rect(181, 133, 4, 4, 'S'); $scope.pdf.text('', 182.5, 135.5);
    //     $scope.pdf.rect(181, 137, 4, 4, 'S'); $scope.pdf.text('', 182.5, 139.5);

    //     $scope.pdf.rect(185, 129, 20, 4, 'S'); $scope.pdf.text(codigo_cie+'', 186.5, 131.5);
    //     $scope.pdf.rect(185, 133, 20, 4, 'S'); $scope.pdf.text('', 186.5, 135.5);
    //     $scope.pdf.rect(185, 137, 20, 4, 'S'); $scope.pdf.text('', 186.5, 139.5);
    // }
    // $scope.paciente5=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
    //     fecha_nacimiento,nombres_paciente,hc,fecha_Atencion,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
    //     descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
    //     codigoCie1,codigoCie2,codigoCie3){
    //     // linea 9
    //     $scope.pdf.rect(5, 141, 5, 20, 'S'); $scope.pdf.text(cont+'', 6.5, 143);
    //     $scope.pdf.rect(10, 141, 195, 8, 'S');
    //     $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 144.5);$scope.pdf.text(fecha_Nac+'',40,143.5);  
    //     $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 144.5);$scope.pdf.text(fecha_hb+'',110,143.5); 
    //     $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 144.5);$scope.pdf.text(fecha_regla+'',175,143.5);
    //     $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 147.5);$scope.pdf.text(nombre+'',45,147.5);
    //     $scope.pdf.rect(10, 149, 7, 12, 'S');$scope.pdf.text(dia+'',12.5,151.5);$scope.pdf.text(''+mes,12.5,155);$scope.pdf.text(año+'',11.5,159); // para poner el dia - falta el texto
    //     $scope.pdf.rect(17, 149, 21, 4, 'S');$scope.pdf.text(dni+'',22.5,151.5); 
    //     $scope.pdf.rect(17, 153, 21, 4, 'S');$scope.pdf.text(historia_clinica+'',22.5,155.5);
    //     $scope.pdf.rect(17, 157, 21, 4, 'S');$scope.pdf.text(gestante_puerpera+'',22.5,159.5); 
    //     $scope.pdf.rect(38, 149, 7, 6, 'S'); $scope.pdf.text(financ+'',41,152.5);
    //     $scope.pdf.rect(38, 155, 7, 6, 'S'); $scope.pdf.text(etnia+'',41,158.5);
    //     $scope.pdf.rect(45, 149, 21, 6, 'S');$scope.pdf.text(distrito_procedencia+'',53,152.5);
    //     $scope.pdf.rect(45, 155, 21, 6, 'S');$scope.pdf.text(centro_poblado+'',53,158.5);
    //     $scope.pdf.rect(66, 149, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,156);
    //     if(edad_tiempo=='A'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 149, 5, 4, 'F');
    //     }else if(edad_tiempo=='M'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 153, 5, 4, 'F');
    //     }else if(edad_tiempo=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 157, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(71, 149, 5, 4, 'S'); $scope.pdf.text('A', 73, 151.5);
    //     $scope.pdf.rect(71, 153, 5, 4, 'S'); $scope.pdf.text('M', 73, 155.5);
    //     $scope.pdf.rect(71, 157, 5, 4, 'S'); $scope.pdf.text('D', 73, 159.5);
    //     if(sexo=='M' ){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 149, 6, 6, 'F');
    //      }else if(sexo=='F'){
    //          $scope.pdf.setFillColor(255, 0, 0); 
    //          $scope.pdf.rect(76, 155, 6, 6, 'F');
    //      }
    //     $scope.pdf.rect(76, 149, 6, 6, 'S'); $scope.pdf.text('M', 78, 153.5);
    //     $scope.pdf.rect(76, 155, 6, 6, 'S'); $scope.pdf.text('F', 78, 158.5);
    //     $scope.pdf.rect(82, 149, 5, 6, 'S'); $scope.pdf.text('PC', 83, 153.5);$scope.pdf.text(pc+'', 88, 152.5);
    //     $scope.pdf.rect(82, 155, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 158.5);$scope.pdf.text(pab+'', 88, 158.5);
    //     $scope.pdf.rect(87, 149, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(87, 155, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(92, 149, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 151.5);$scope.pdf.text(peso+'', 98.5, 151.5);
    //     $scope.pdf.rect(92, 153, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 155.5);$scope.pdf.text(talla+'', 98.5, 155.5);
    //     $scope.pdf.rect(92, 157, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 159.5);$scope.pdf.text(Hemoglobina+'', 98.5, 159.5);
    //     $scope.pdf.rect(98, 149, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 153, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 157, 6, 4, 'S'); //falta el texto
    //     if(estable=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 149, 5, 4, 'F');
    //     }else if(estable=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(104, 153, 5, 4, 'F');
    //     }else if(estable=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 157, 5, 4, 'F');
    //     }

    //     if(servicio=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 149, 5, 4, 'F');
    //     }else if(servicio=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(109, 153, 5, 4, 'F');
    //     }else if(servicio=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 157, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(104, 149, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 151.5);
    //     $scope.pdf.rect(104, 153, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 155.5);
    //     $scope.pdf.rect(104, 157, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 159.5);
    //     $scope.pdf.rect(109, 149, 5, 4, 'S'); $scope.pdf.text('N', 111, 151.5);
    //     $scope.pdf.rect(109, 153, 5, 4, 'S'); $scope.pdf.text('C', 111, 155.5);
    //     $scope.pdf.rect(109, 157, 5, 4, 'S'); $scope.pdf.text('R', 111, 159.5);

    //     $scope.pdf.rect(114, 149, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 151.5);$scope.pdf.text(diagnostico1+'', 116.5, 151.5);
    //     $scope.pdf.rect(114, 153, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 155.5);$scope.pdf.text(diagnostico2+'', 116.5, 155.5);
    //     $scope.pdf.rect(114, 157, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 159.5);$scope.pdf.text(diagnostico3+'', 116.5, 159.5);

    //     if(tipo_diagnostico=='P'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(161, 149, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(165, 149, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(169, 149, 4, 4, 'F');
    //     }
        
    //     if(valor_lab=='1'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(173, 149, 4, 4, 'F');
    //     }else if(valor_lab=='2'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(177, 149, 4, 4, 'F');
    //     }else if(valor_lab=='3'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(181, 149, 4, 4, 'F');
    //     }
    //     $scope.pdf.rect(161, 149, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 151.5);
    //     $scope.pdf.rect(161, 153, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 155.5);
    //     $scope.pdf.rect(161, 157, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 159.5);
    //     $scope.pdf.rect(165, 149, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 151.5);
    //     $scope.pdf.rect(165, 153, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 155.5);
    //     $scope.pdf.rect(165, 157, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 159.5);
    //     $scope.pdf.rect(169, 149, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 151.5);
    //     $scope.pdf.rect(169, 153, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 155.5);
    //     $scope.pdf.rect(169, 157, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 159.5);

    //     $scope.pdf.rect(173, 149, 4, 4, 'S'); $scope.pdf.text('', 174.5, 151.5);
    //     $scope.pdf.rect(173, 153, 4, 4, 'S'); $scope.pdf.text('', 174.5, 155.5);
    //     $scope.pdf.rect(173, 157, 4, 4, 'S'); $scope.pdf.text('', 174.5, 159.5);

    //     $scope.pdf.rect(177, 149, 4, 4, 'S'); $scope.pdf.text('', 178.5, 151.5);
    //     $scope.pdf.rect(177, 153, 4, 4, 'S'); $scope.pdf.text('', 178.5, 155.5);
    //     $scope.pdf.rect(177, 157, 4, 4, 'S'); $scope.pdf.text('', 178.5, 159.5);

    //     $scope.pdf.rect(181, 149, 4, 4, 'S'); $scope.pdf.text('', 182.5, 151.5);
    //     $scope.pdf.rect(181, 153, 4, 4, 'S'); $scope.pdf.text('', 182.5, 155.5);
    //     $scope.pdf.rect(181, 157, 4, 4, 'S'); $scope.pdf.text('', 182.5, 159.5);

    //     $scope.pdf.rect(185, 149, 20, 4, 'S'); $scope.pdf.text(codigo_cie+'', 186.5, 151.5);
    //     $scope.pdf.rect(185, 153, 20, 4, 'S'); $scope.pdf.text('', 186.5, 155.5);
    //     $scope.pdf.rect(185, 157, 20, 4, 'S'); $scope.pdf.text('', 186.5, 159.5);
    // }
    // $scope.paciente6=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
    //     fecha_nacimiento,nombres_paciente,hc,fecha_Atencion,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
    //     descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
    //     codigoCie1,codigoCie2,codigoCie3){
    //     // linea 10
    //     $scope.pdf.rect(5, 161, 5, 20, 'S'); $scope.pdf.text(cont+'', 6.5, 163);

    //     $scope.pdf.rect(10, 161, 195, 8, 'S');
    //     $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 164.5);$scope.pdf.text(fecha_Nac+'',40,163.5);  
    //     $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 164.5);$scope.pdf.text(fecha_hb+'',110,163.5);  
    //     $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 164.5);$scope.pdf.text(fecha_regla+'',175,163.5);
    //     $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 167.5);$scope.pdf.text(nombre+'',45,167.5);
    //     $scope.pdf.rect(10, 169, 7, 12, 'S');$scope.pdf.text(dia+'',12.5,171.5);$scope.pdf.text(''+mes,12.5,175);$scope.pdf.text(año+'',11.5,179); // para poner el dia - falta el texto
    //     $scope.pdf.rect(17, 169, 21, 4, 'S');$scope.pdf.text(dni+'',22.5,171.5); 
    //     $scope.pdf.rect(17, 173, 21, 4, 'S');$scope.pdf.text(historia_clinica+'',22.5,175.5);
    //     $scope.pdf.rect(17, 177, 21, 4, 'S');$scope.pdf.text(gestante_puerpera+'',22.5,179.5); 
    //     $scope.pdf.rect(38, 169, 7, 6, 'S'); $scope.pdf.text(financ+'',41,172.5);
    //     $scope.pdf.rect(38, 175, 7, 6, 'S'); $scope.pdf.text(etnia+'',41,178.5);
    //     $scope.pdf.rect(45, 169, 21, 6, 'S');$scope.pdf.text(distrito_procedencia+'',53,172.5);
    //     $scope.pdf.rect(45, 175, 21, 6, 'S');$scope.pdf.text(centro_poblado+'',53,178.5);
    //     $scope.pdf.rect(66, 169, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,176);
    //     if(edad_tiempo=='A'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 169, 5, 4, 'F');
    //     }else if(edad_tiempo=='M'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 173, 5, 4, 'F');
    //     }else if(edad_tiempo=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 177, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(71, 169, 5, 4, 'S'); $scope.pdf.text('A', 73, 171.5);
    //     $scope.pdf.rect(71, 173, 5, 4, 'S'); $scope.pdf.text('M', 73, 175.5);
    //     $scope.pdf.rect(71, 177, 5, 4, 'S'); $scope.pdf.text('D', 73, 179.5);
    //     if(sexo=='M' ){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 169, 6, 6, 'F');
    //      }else if(sexo=='F'){
    //          $scope.pdf.setFillColor(255, 0, 0); 
    //          $scope.pdf.rect(76, 175, 6, 6, 'F');
    //      }
    //     $scope.pdf.rect(76, 169, 6, 6, 'S'); $scope.pdf.text('M', 78, 173.5);
    //     $scope.pdf.rect(76, 175, 6, 6, 'S'); $scope.pdf.text('F', 78, 178.5);
    //     $scope.pdf.rect(82, 169, 5, 6, 'S'); $scope.pdf.text('PC', 83, 173.5);$scope.pdf.text(pc+'', 88, 172.5);
    //     $scope.pdf.rect(82, 175, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 178.5);$scope.pdf.text(pab+'', 88, 178.5);
    //     $scope.pdf.rect(87, 169, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(87, 175, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(92, 169, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 171.5);$scope.pdf.text(peso+'', 98.5, 171.5);
    //     $scope.pdf.rect(92, 173, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 175.5);$scope.pdf.text(talla+'', 98.5, 175.5);
    //     $scope.pdf.rect(92, 177, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 179.5);$scope.pdf.text(Hemoglobina+'', 98.5, 179.5);
    //     $scope.pdf.rect(98, 169, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 173, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 177, 6, 4, 'S'); //falta el texto
    //     if(estable=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 169, 5, 4, 'F');
    //     }else if(estable=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(104, 173, 5, 4, 'F');
    //     }else if(estable=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 177, 5, 4, 'F');
    //     }

    //     if(servicio=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 169, 5, 4, 'F');
    //     }else if(servicio=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(109, 173, 5, 4, 'F');
    //     }else if(servicio=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 177, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(104, 169, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 171.5);
    //     $scope.pdf.rect(104, 173, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 175.5);
    //     $scope.pdf.rect(104, 177, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 179.5);
    //     $scope.pdf.rect(109, 169, 5, 4, 'S'); $scope.pdf.text('N', 111, 171.5);
    //     $scope.pdf.rect(109, 173, 5, 4, 'S'); $scope.pdf.text('C', 111, 175.5);
    //     $scope.pdf.rect(109, 177, 5, 4, 'S'); $scope.pdf.text('R', 111, 179.5);

    //     $scope.pdf.rect(114, 169, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 171.5);$scope.pdf.text(diagnostico1+'', 116.5, 171.5);
    //     $scope.pdf.rect(114, 173, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 175.5);$scope.pdf.text(diagnostico2+'', 116.5, 175.5);
    //     $scope.pdf.rect(114, 177, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 179.5);$scope.pdf.text(diagnostico3+'', 116.5, 179.5);
    //     if(tipo_diagnostico=='P'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(161, 169, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(165, 169, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(169, 169, 4, 4, 'F');
    //     }
        
    //     if(valor_lab=='1'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(173, 169, 4, 4, 'F');
    //     }else if(valor_lab=='2'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(177, 169, 4, 4, 'F');
    //     }else if(valor_lab=='3'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(181, 169, 4, 4, 'F');
    //     }
    //     $scope.pdf.rect(161, 169, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 171.5);
    //     $scope.pdf.rect(161, 173, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 175.5);
    //     $scope.pdf.rect(161, 177, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 179.5);
    //     $scope.pdf.rect(165, 169, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 171.5);
    //     $scope.pdf.rect(165, 173, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 175.5);
    //     $scope.pdf.rect(165, 177, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 179.5);
    //     $scope.pdf.rect(169, 169, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 171.5);
    //     $scope.pdf.rect(169, 173, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 175.5);
    //     $scope.pdf.rect(169, 177, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 179.5);

    //     $scope.pdf.rect(173, 169, 4, 4, 'S'); $scope.pdf.text('', 174.5, 171.5);
    //     $scope.pdf.rect(173, 173, 4, 4, 'S'); $scope.pdf.text('', 174.5, 175.5);
    //     $scope.pdf.rect(173, 177, 4, 4, 'S'); $scope.pdf.text('', 174.5, 179.5);

    //     $scope.pdf.rect(177, 169, 4, 4, 'S'); $scope.pdf.text('', 178.5, 171.5);
    //     $scope.pdf.rect(177, 173, 4, 4, 'S'); $scope.pdf.text('', 178.5, 175.5);
    //     $scope.pdf.rect(177, 177, 4, 4, 'S'); $scope.pdf.text('', 178.5, 179.5);

    //     $scope.pdf.rect(181, 169, 4, 4, 'S'); $scope.pdf.text('', 182.5, 171.5);
    //     $scope.pdf.rect(181, 173, 4, 4, 'S'); $scope.pdf.text('', 182.5, 175.5);
    //     $scope.pdf.rect(181, 177, 4, 4, 'S'); $scope.pdf.text('', 182.5, 179.5);

    //     $scope.pdf.rect(185, 169, 20, 4, 'S'); $scope.pdf.text(codigo_cie+'', 186.5, 171.5);
    //     $scope.pdf.rect(185, 173, 20, 4, 'S'); $scope.pdf.text('', 186.5, 175.5);
    //     $scope.pdf.rect(185, 177, 20, 4, 'S'); $scope.pdf.text('', 186.5, 179.5);
    // }
    // $scope.paciente7=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
    //     fecha_nacimiento,nombres_paciente,hc,fecha_Atencion,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
    //     descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
    //     codigoCie1,codigoCie2,codigoCie3){
    //     // linea 11
    //     $scope.pdf.rect(5, 181, 5, 20, 'S'); $scope.pdf.text(cont+'', 6.5, 183);

    //     $scope.pdf.rect(10, 181, 195, 8, 'S');
    //     $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 184.5);$scope.pdf.text(fecha_Nac+'',40,183.5);  
    //     $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 184.5);$scope.pdf.text(fecha_hb+'',110,183.5);   
    //     $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 184.5);$scope.pdf.text(fecha_regla+'',175,183.5);
    //     $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 187.5);$scope.pdf.text(nombre+'',45,187.5);
    //     $scope.pdf.rect(10, 189, 7, 12, 'S');$scope.pdf.text(dia+'',12.5,191.5);$scope.pdf.text(''+mes,12.5,195);$scope.pdf.text(año+'',11.5,199); // para poner el dia - falta el texto
    //     $scope.pdf.rect(17, 189, 21, 4, 'S');$scope.pdf.text(dni+'',22.5,191.5); 
    //     $scope.pdf.rect(17, 193, 21, 4, 'S');$scope.pdf.text(historia_clinica+'',22.5,195.5);
    //     $scope.pdf.rect(17, 197, 21, 4, 'S');$scope.pdf.text(gestante_puerpera+'',22.5,199.5); 
    //     $scope.pdf.rect(38, 189, 7, 6, 'S'); $scope.pdf.text(financ+'',41,192.5);
    //     $scope.pdf.rect(38, 195, 7, 6, 'S'); $scope.pdf.text(etnia+'',41,198.5);
    //     $scope.pdf.rect(45, 189, 21, 6, 'S');$scope.pdf.text(distrito_procedencia+'',53,192.5);
    //     $scope.pdf.rect(45, 195, 21, 6, 'S');$scope.pdf.text(centro_poblado+'',53,198.5);
    //     $scope.pdf.rect(66, 189, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,196);
    //     if(edad_tiempo=='A'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 189, 5, 4, 'F');
    //     }else if(edad_tiempo=='M'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 193, 5, 4, 'F');
    //     }else if(edad_tiempo=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 197, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(71, 189, 5, 4, 'S'); $scope.pdf.text('A', 73, 191.5);
    //     $scope.pdf.rect(71, 193, 5, 4, 'S'); $scope.pdf.text('M', 73, 195.5);
    //     $scope.pdf.rect(71, 197, 5, 4, 'S'); $scope.pdf.text('D', 73, 199.5);
    //     if(sexo=='M' ){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 189, 6, 6, 'F');
    //      }else if(sexo=='F'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 195, 6, 6, 'F');
    //      }
    //     $scope.pdf.rect(76, 189, 6, 6, 'S'); $scope.pdf.text('M', 78, 193.5);
    //     $scope.pdf.rect(76, 195, 6, 6, 'S'); $scope.pdf.text('F', 78, 198.5);
    //     $scope.pdf.rect(82, 189, 5, 6, 'S'); $scope.pdf.text('PC', 83, 193.5);$scope.pdf.text(pc+'', 88, 192.5);
    //     $scope.pdf.rect(82, 195, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 198.5);$scope.pdf.text(pab+'', 88, 198.5);
    //     $scope.pdf.rect(87, 189, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(87, 195, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(92, 189, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 191.5);$scope.pdf.text(peso+'', 98.5, 191.5);
    //     $scope.pdf.rect(92, 193, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 195.5);$scope.pdf.text(talla+'', 98.5, 195.5);
    //     $scope.pdf.rect(92, 197, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 199.5);$scope.pdf.text(Hemoglobina+'', 98.5, 199.5);
    //     $scope.pdf.rect(98, 189, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 193, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 197, 6, 4, 'S'); //falta el texto
    //     if(estable=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 189, 5, 4, 'F');
    //     }else if(estable=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(104, 193, 5, 4, 'F');
    //     }else if(estable=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 197, 5, 4, 'F');
    //     }

    //     if(servicio=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 189, 5, 4, 'F');
    //     }else if(servicio=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(109, 193, 5, 4, 'F');
    //     }else if(servicio=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 197, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(104, 189, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 191.5);
    //     $scope.pdf.rect(104, 193, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 195.5);
    //     $scope.pdf.rect(104, 197, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 199.5);
    //     $scope.pdf.rect(109, 189, 5, 4, 'S'); $scope.pdf.text('N', 111, 191.5);
    //     $scope.pdf.rect(109, 193, 5, 4, 'S'); $scope.pdf.text('C', 111, 195.5);
    //     $scope.pdf.rect(109, 197, 5, 4, 'S'); $scope.pdf.text('R', 111, 199.5);

    //     $scope.pdf.rect(114, 189, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 191.5);$scope.pdf.text(diagnostico1+'', 116.5, 191.5);
    //     $scope.pdf.rect(114, 193, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 195.5);$scope.pdf.text(diagnostico2+'', 116.5, 195.5);
    //     $scope.pdf.rect(114, 197, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 199.5);$scope.pdf.text(diagnostico3+'', 116.5, 199.5);
    //     if(tipo_diagnostico=='P'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(161, 189, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(165, 189, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(169, 189, 4, 4, 'F');
    //     }
        
    //     if(valor_lab=='1'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(173, 189, 4, 4, 'F');
    //     }else if(valor_lab=='2'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(177, 189, 4, 4, 'F');
    //     }else if(valor_lab=='3'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(181, 189, 4, 4, 'F');
    //     }
    //     $scope.pdf.rect(161, 189, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 191.5);
    //     $scope.pdf.rect(161, 193, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 195.5);
    //     $scope.pdf.rect(161, 197, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 199.5);
    //     $scope.pdf.rect(165, 189, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 191.5);
    //     $scope.pdf.rect(165, 193, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 195.5);
    //     $scope.pdf.rect(165, 197, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 199.5);
    //     $scope.pdf.rect(169, 189, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 191.5);
    //     $scope.pdf.rect(169, 193, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 195.5);
    //     $scope.pdf.rect(169, 197, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 199.5);

    //     $scope.pdf.rect(173, 189, 4, 4, 'S'); $scope.pdf.text('', 174.5, 191.5);
    //     $scope.pdf.rect(173, 193, 4, 4, 'S'); $scope.pdf.text('', 174.5, 195.5);
    //     $scope.pdf.rect(173, 197, 4, 4, 'S'); $scope.pdf.text('', 174.5, 199.5);

    //     $scope.pdf.rect(177, 189, 4, 4, 'S'); $scope.pdf.text('', 178.5, 191.5);
    //     $scope.pdf.rect(177, 193, 4, 4, 'S'); $scope.pdf.text('', 178.5, 195.5);
    //     $scope.pdf.rect(177, 197, 4, 4, 'S'); $scope.pdf.text('', 178.5, 199.5);
        
    //     $scope.pdf.rect(181, 189, 4, 4, 'S'); $scope.pdf.text('', 182.5, 191.5);
    //     $scope.pdf.rect(181, 193, 4, 4, 'S'); $scope.pdf.text('', 182.5, 195.5);
    //     $scope.pdf.rect(181, 197, 4, 4, 'S'); $scope.pdf.text('', 182.5, 199.5);

    //     $scope.pdf.rect(185, 189, 20, 4, 'S'); $scope.pdf.text(codigo_cie+'', 186.5, 191.5);
    //     $scope.pdf.rect(185, 193, 20, 4, 'S'); $scope.pdf.text('', 186.5, 195.5);
    //     $scope.pdf.rect(185, 197, 20, 4, 'S'); $scope.pdf.text('', 186.5, 199.5);
    // }
    // $scope.paciente8=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
    //     fecha_nacimiento,nombres_paciente,hc,fecha_Atencion,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
    //     descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
    //     codigoCie1,codigoCie2,codigoCie3){
    //     // linea 12
    //     $scope.pdf.rect(5, 201, 5, 20, 'S'); $scope.pdf.text(cont+'', 6.5, 203);
    //     $scope.pdf.rect(10, 201, 195, 8, 'S');
    //     $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 204.5);$scope.pdf.text(fecha_Nac+'',40,203.5);   
    //     $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 204.5);$scope.pdf.text(fecha_hb+'',110,203.5);    
    //     $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 204.5);$scope.pdf.text(fecha_regla+'',175,203.5);
    //     $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 207.5);$scope.pdf.text(nombre+'',45,207.5);
    //     $scope.pdf.rect(10, 209, 7, 12, 'S');$scope.pdf.text(dia+'',12.5,211.5);$scope.pdf.text(''+mes,12.5,215);$scope.pdf.text(año+'',11.5,219); // para poner el dia - falta el texto
    //     $scope.pdf.rect(17, 209, 21, 4, 'S');$scope.pdf.text(dni+'',22.5,211.5); 
    //     $scope.pdf.rect(17, 213, 21, 4, 'S');$scope.pdf.text(historia_clinica+'',22.5,215.5);
    //     $scope.pdf.rect(17, 217, 21, 4, 'S');$scope.pdf.text(gestante_puerpera+'',22.5,219.5); 
    //     $scope.pdf.rect(38, 209, 7, 6, 'S'); $scope.pdf.text(financ+'',41,212.5);
    //     $scope.pdf.rect(38, 215, 7, 6, 'S'); $scope.pdf.text(etnia+'',41,218.5);
    //     $scope.pdf.rect(45, 209, 21, 6, 'S');$scope.pdf.text(distrito_procedencia+'',53,212.5);
    //     $scope.pdf.rect(45, 215, 21, 6, 'S');$scope.pdf.text(centro_poblado+'',53,218.5);
    //     $scope.pdf.rect(66, 209, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,216);
    //     if(edad_tiempo=='A'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 209, 5, 4, 'F');
    //     }else if(edad_tiempo=='M'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 213, 5, 4, 'F');
    //     }else if(edad_tiempo=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 217, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(71, 209, 5, 4, 'S'); $scope.pdf.text('A', 73, 211.5);
    //     $scope.pdf.rect(71, 213, 5, 4, 'S'); $scope.pdf.text('M', 73, 215.5);
    //     $scope.pdf.rect(71, 217, 5, 4, 'S'); $scope.pdf.text('D', 73, 219.5);
    //     if(sexo=='M' ){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 209, 6, 6, 'F');
    //      }else if(sexo=='F'){
    //          $scope.pdf.setFillColor(255, 0, 0); 
    //          $scope.pdf.rect(76, 215, 6, 6, 'F');
    //      }
    //     $scope.pdf.rect(76, 209, 6, 6, 'S'); $scope.pdf.text('M', 78, 213.5);
    //     $scope.pdf.rect(76, 215, 6, 6, 'S'); $scope.pdf.text('F', 78, 218.5);
    //     $scope.pdf.rect(82, 209, 5, 6, 'S'); $scope.pdf.text('PC', 83, 213.5);$scope.pdf.text(pc+'', 88, 212.5);
    //     $scope.pdf.rect(82, 215, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 218.5);$scope.pdf.text(pab+'', 88, 218.5);
    //     $scope.pdf.rect(87, 209, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(87, 215, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(92, 209, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 211.5);$scope.pdf.text(peso+'', 98.5, 211.5);
    //     $scope.pdf.rect(92, 213, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 215.5);$scope.pdf.text(talla+'', 98.5, 215.5);
    //     $scope.pdf.rect(92, 217, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 219.5);$scope.pdf.text(Hemoglobina+'', 98.5, 219.5);
    //     $scope.pdf.rect(98, 209, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 213, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 217, 6, 4, 'S'); //falta el texto
    //     if(estable=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 209, 5, 4, 'F');
    //     }else if(estable=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(104, 213, 5, 4, 'F');
    //     }else if(estable=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 217, 5, 4, 'F');
    //     }

    //     if(servicio=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 209, 5, 4, 'F');
    //     }else if(servicio=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(109, 213, 5, 4, 'F');
    //     }else if(servicio=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 217, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(104, 209, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 211.5);
    //     $scope.pdf.rect(104, 213, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 215.5);
    //     $scope.pdf.rect(104, 217, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 219.5);
    //     $scope.pdf.rect(109, 209, 5, 4, 'S'); $scope.pdf.text('N', 111, 211.5);
    //     $scope.pdf.rect(109, 213, 5, 4, 'S'); $scope.pdf.text('C', 111, 215.5);
    //     $scope.pdf.rect(109, 217, 5, 4, 'S'); $scope.pdf.text('R', 111, 219.5);

    //     $scope.pdf.rect(114, 209, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 211.5);$scope.pdf.text(diagnostico1+'', 116.5, 211.5);
    //     $scope.pdf.rect(114, 213, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 215.5);$scope.pdf.text(diagnostico2+'', 116.5, 215.5);
    //     $scope.pdf.rect(114, 217, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 219.5);$scope.pdf.text(diagnostico3+'', 116.5, 219.5);
    //     if(tipo_diagnostico=='P'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(161, 209, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(165, 209, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(169, 209, 4, 4, 'F');
    //     }
        
    //     if(valor_lab=='1'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(173, 209, 4, 4, 'F');
    //     }else if(valor_lab=='2'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(177, 209, 4, 4, 'F');
    //     }else if(valor_lab=='3'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(181, 209, 4, 4, 'F');
    //     }
    //     $scope.pdf.rect(161, 209, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 211.5);
    //     $scope.pdf.rect(161, 213, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 215.5);
    //     $scope.pdf.rect(161, 217, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 219.5);
    //     $scope.pdf.rect(165, 209, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 211.5);
    //     $scope.pdf.rect(165, 213, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 215.5);
    //     $scope.pdf.rect(165, 217, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 219.5);
    //     $scope.pdf.rect(169, 209, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 211.5);
    //     $scope.pdf.rect(169, 213, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 215.5);
    //     $scope.pdf.rect(169, 217, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 219.5);

    //     $scope.pdf.rect(173, 209, 4, 4, 'S'); $scope.pdf.text('', 174.5, 211.5);
    //     $scope.pdf.rect(173, 213, 4, 4, 'S'); $scope.pdf.text('', 174.5, 215.5);
    //     $scope.pdf.rect(173, 217, 4, 4, 'S'); $scope.pdf.text('', 174.5, 219.5);

    //     $scope.pdf.rect(177, 209, 4, 4, 'S'); $scope.pdf.text('', 178.5, 211.5);
    //     $scope.pdf.rect(177, 213, 4, 4, 'S'); $scope.pdf.text('', 178.5, 215.5);
    //     $scope.pdf.rect(177, 217, 4, 4, 'S'); $scope.pdf.text('', 178.5, 219.5);

    //     $scope.pdf.rect(181, 209, 4, 4, 'S'); $scope.pdf.text('', 182.5, 211.5);
    //     $scope.pdf.rect(181, 213, 4, 4, 'S'); $scope.pdf.text('', 182.5, 215.5);
    //     $scope.pdf.rect(181, 217, 4, 4, 'S'); $scope.pdf.text('', 182.5, 219.5);

    //     $scope.pdf.rect(185, 209, 20, 4, 'S'); $scope.pdf.text(codigo_cie+'', 186.5, 211.5);
    //     $scope.pdf.rect(185, 213, 20, 4, 'S'); $scope.pdf.text('', 186.5, 215.5);
    //     $scope.pdf.rect(185, 217, 20, 4, 'S'); $scope.pdf.text('', 186.5, 219.5);
    // }
    // $scope.paciente9=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
    //     fecha_nacimiento,nombres_paciente,hc,fecha_Atencion,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
    //     descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
    //     codigoCie1,codigoCie2,codigoCie3){
    //     // linea 13
    //     $scope.pdf.rect(5, 221, 5, 20, 'S'); $scope.pdf.text(cont+'', 6.5, 223);

    //     $scope.pdf.rect(10, 221, 195, 8, 'S');
    //     $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 224.5);$scope.pdf.text(fecha_Nac+'',40,223.5);  
    //     $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 224.5); $scope.pdf.text(fecha_hb+'',110,223.5);   
    //     $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 224.5);$scope.pdf.text(fecha_regla+'',175,223.5);
    //     $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 227.5);$scope.pdf.text(nombre+'',45,227.5);
    //     $scope.pdf.rect(10, 229, 7, 12, 'S');$scope.pdf.text(dia+'',12.5,231.5);$scope.pdf.text(''+mes,12.5,235);$scope.pdf.text(año+'',11.5,239); // para poner el dia - falta el texto
    //     $scope.pdf.rect(17, 229, 21, 4, 'S');$scope.pdf.text(dni+'',22.5,231.5); 
    //     $scope.pdf.rect(17, 233, 21, 4, 'S');$scope.pdf.text(historia_clinica+'',22.5,235.5);
    //     $scope.pdf.rect(17, 237, 21, 4, 'S');$scope.pdf.text(gestante_puerpera+'',22.5,239.5); 
    //     $scope.pdf.rect(38, 229, 7, 6, 'S'); $scope.pdf.text(financ+'',41,232.5);
    //     $scope.pdf.rect(38, 235, 7, 6, 'S'); $scope.pdf.text(etnia+'',41,238.5);
    //     $scope.pdf.rect(45, 229, 21, 6, 'S');$scope.pdf.text(distrito_procedencia+'',53,232.5);
    //     $scope.pdf.rect(45, 235, 21, 6, 'S');$scope.pdf.text(centro_poblado+'',53,238.5);
    //     $scope.pdf.rect(66, 229, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,236);
    //     if(edad_tiempo=='A'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 229, 5, 4, 'F');
    //     }else if(edad_tiempo=='M'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 233, 5, 4, 'F');
    //     }else if(edad_tiempo=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 237, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(71, 229, 5, 4, 'S'); $scope.pdf.text('A', 73, 231.5);
    //     $scope.pdf.rect(71, 233, 5, 4, 'S'); $scope.pdf.text('M', 73, 235.5);
    //     $scope.pdf.rect(71, 237, 5, 4, 'S'); $scope.pdf.text('D', 73, 239.5);
    //     if(sexo=='M' ){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 229, 6, 6, 'F');
    //      }else if(sexo=='F'){
    //          $scope.pdf.setFillColor(255, 0, 0); 
    //          $scope.pdf.rect(76, 235, 6, 6, 'F');
    //      }
    //     $scope.pdf.rect(76, 229, 6, 6, 'S'); $scope.pdf.text('M', 78, 233.5);
    //     $scope.pdf.rect(76, 235, 6, 6, 'S'); $scope.pdf.text('F', 78, 238.5);
    //     $scope.pdf.rect(82, 229, 5, 6, 'S'); $scope.pdf.text('PC', 83, 233.5);$scope.pdf.text(pc+'', 88, 232.5);
    //     $scope.pdf.rect(82, 235, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 238.5);$scope.pdf.text(pab+'', 88, 238.5);
    //     $scope.pdf.rect(87, 229, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(87, 235, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(92, 229, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 231.5);$scope.pdf.text(peso+'', 98.5, 231.5);
    //     $scope.pdf.rect(92, 233, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 235.5);$scope.pdf.text(talla+'', 98.5, 235.5);
    //     $scope.pdf.rect(92, 237, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 239.5);$scope.pdf.text(Hemoglobina+'', 98.5, 239.5);
    //     $scope.pdf.rect(98, 229, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 233, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 237, 6, 4, 'S'); //falta el texto
    //     if(estable=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 229, 5, 4, 'F');
    //     }else if(estable=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(104, 233, 5, 4, 'F');
    //     }else if(estable=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 237, 5, 4, 'F');
    //     }

    //     if(servicio=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 229, 5, 4, 'F');
    //     }else if(servicio=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(109, 233, 5, 4, 'F');
    //     }else if(servicio=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 237, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(104, 229, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 231.5);
    //     $scope.pdf.rect(104, 233, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 235.5);
    //     $scope.pdf.rect(104, 237, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 239.5);
    //     $scope.pdf.rect(109, 229, 5, 4, 'S'); $scope.pdf.text('N', 111, 231.5);
    //     $scope.pdf.rect(109, 233, 5, 4, 'S'); $scope.pdf.text('C', 111, 235.5);
    //     $scope.pdf.rect(109, 237, 5, 4, 'S'); $scope.pdf.text('R', 111, 239.5);

    //     $scope.pdf.rect(114, 229, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 231.5);$scope.pdf.text(diagnostico1+'', 116.5, 231.5);
    //     $scope.pdf.rect(114, 233, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 235.5);$scope.pdf.text(diagnostico2+'', 116.5, 235.5);
    //     $scope.pdf.rect(114, 237, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 239.5);$scope.pdf.text(diagnostico3+'', 116.5, 239.5);
    //     if(tipo_diagnostico=='P'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(161, 229, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(165, 229, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(169, 229, 4, 4, 'F');
    //     }
        
    //     if(valor_lab=='1'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(173, 229, 4, 4, 'F');
    //     }else if(valor_lab=='2'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(177, 229, 4, 4, 'F');
    //     }else if(valor_lab=='3'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(181, 229, 4, 4, 'F');
    //     }
    //     $scope.pdf.rect(161, 229, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 231.5);
    //     $scope.pdf.rect(161, 233, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 235.5);
    //     $scope.pdf.rect(161, 237, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 239.5);
    //     $scope.pdf.rect(165, 229, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 231.5);
    //     $scope.pdf.rect(165, 233, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 235.5);
    //     $scope.pdf.rect(165, 237, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 239.5);
    //     $scope.pdf.rect(169, 229, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 231.5);
    //     $scope.pdf.rect(169, 233, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 235.5);
    //     $scope.pdf.rect(169, 237, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 239.5);

    //     $scope.pdf.rect(173, 229, 4, 4, 'S'); $scope.pdf.text('', 174.5, 231.5);
    //     $scope.pdf.rect(173, 233, 4, 4, 'S'); $scope.pdf.text('', 174.5, 235.5);
    //     $scope.pdf.rect(173, 237, 4, 4, 'S'); $scope.pdf.text('', 174.5, 239.5);

    //     $scope.pdf.rect(177, 229, 4, 4, 'S'); $scope.pdf.text('', 178.5, 231.5);
    //     $scope.pdf.rect(177, 233, 4, 4, 'S'); $scope.pdf.text('', 178.5, 235.5);
    //     $scope.pdf.rect(177, 237, 4, 4, 'S'); $scope.pdf.text('', 178.5, 239.5);

    //     $scope.pdf.rect(181, 229, 4, 4, 'S'); $scope.pdf.text('', 182.5, 231.5);
    //     $scope.pdf.rect(181, 233, 4, 4, 'S'); $scope.pdf.text('', 182.5, 235.5);
    //     $scope.pdf.rect(181, 237, 4, 4, 'S'); $scope.pdf.text('', 182.5, 239.5);

    //     $scope.pdf.rect(185, 229, 20, 4, 'S'); $scope.pdf.text(codigo_cie+'', 186.5, 231.5);
    //     $scope.pdf.rect(185, 233, 20, 4, 'S'); $scope.pdf.text('', 186.5, 235.5);
    //     $scope.pdf.rect(185, 237, 20, 4, 'S'); $scope.pdf.text('', 186.5, 239.5);
    // }
    // $scope.paciente10=function(cont,fecha_Atencion,distrito_procedencia,idetnia,idfinanciador,nro_documento,
    //     fecha_nacimiento,nombres_paciente,hc,fecha_Atencion,edad,sexo,peso,talla,tipo_edad,condicion_establecimiento,condicion_servicio,item,
    //     descripcion1,descripcion2,descripcion3,Tipodianostico1,Tipodianostico2,Tipodianostico3,valor_lab1,valor_lab2,valor_lab3,
    //     codigoCie1,codigoCie2,codigoCie3){
    //     // linea 14
    //     $scope.pdf.rect(5, 241, 5, 20, 'S'); $scope.pdf.text(cont+'', 6.5, 243);
    //     $scope.pdf.rect(10, 241, 195, 8, 'S');
    //     $scope.pdf.text('FECHA DE NACIMIENTO: ', 12, 244.5);$scope.pdf.text(fecha_Nac+'',40,243.5);   
    //     $scope.pdf.text('FECHA ULTIMO RESULTADO DE Hb: ', 70, 244.5); $scope.pdf.text(fecha_hb+'',110,243.5);   
    //     $scope.pdf.text('FECHA DE ULTIMA REGLA: ', 145, 244.5);$scope.pdf.text(fecha_regla+'',175,243.5);
    //     $scope.pdf.text('NOMBRES Y APELLIDOS PACIENTE: ', 12, 247.5);$scope.pdf.text(nombre+'',45,247.5);
    //     $scope.pdf.rect(10, 249, 7, 12, 'S');$scope.pdf.text(dia+'',12.5,251.5);$scope.pdf.text(''+mes,12.5,255);$scope.pdf.text(año+'',11.5,259); // para poner el dia - falta el texto
    //     $scope.pdf.rect(17, 249, 21, 4, 'S');$scope.pdf.text(dni+'',22.5,251.5); 
    //     $scope.pdf.rect(17, 253, 21, 4, 'S');$scope.pdf.text(historia_clinica+'',22.5,255.5);
    //     $scope.pdf.rect(17, 257, 21, 4, 'S');$scope.pdf.text(gestante_puerpera+'',22.5,259.5); 
    //     $scope.pdf.rect(38, 249, 7, 6, 'S'); $scope.pdf.text(financ+'',41,252.5);
    //     $scope.pdf.rect(38, 255, 7, 6, 'S'); $scope.pdf.text(etnia+'',41,258.5);
    //     $scope.pdf.rect(45, 249, 21, 6, 'S');$scope.pdf.text(distrito_procedencia+'',53,252.5);
    //     $scope.pdf.rect(45, 255, 21, 6, 'S');$scope.pdf.text(centro_poblado+'',53,258.5);
    //     $scope.pdf.rect(66, 249, 5, 12, 'S');$scope.pdf.text(edad+'',67.5,256);
    //     if(edad_tiempo=='A'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 249, 5, 4, 'F');
    //     }else if(edad_tiempo=='M'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 253, 5, 4, 'F');
    //     }else if(edad_tiempo=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(71, 257, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(71, 249, 5, 4, 'S'); $scope.pdf.text('A', 73, 251.5);
    //     $scope.pdf.rect(71, 253, 5, 4, 'S'); $scope.pdf.text('M', 73, 255.5);
    //     $scope.pdf.rect(71, 257, 5, 4, 'S'); $scope.pdf.text('D', 73, 259.5);
    //     if(sexo=='M' ){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 249, 6, 6, 'F');
    //      }else if(sexo=='F'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(76, 255, 6, 6, 'F');
    //      }
    //     $scope.pdf.rect(76, 249, 6, 6, 'S'); $scope.pdf.text('M', 78, 253.5);
    //     $scope.pdf.rect(76, 255, 6, 6, 'S'); $scope.pdf.text('F', 78, 258.5);
    //     $scope.pdf.rect(82, 249, 5, 6, 'S'); $scope.pdf.text('PC', 83, 253.5);$scope.pdf.text(pc+'', 88, 252.5);
    //     $scope.pdf.rect(82, 255, 5, 6, 'S'); $scope.pdf.text('Pab', 83, 258.5);$scope.pdf.text(pab+'', 88, 258.5);
    //     $scope.pdf.rect(87, 249, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(87, 255, 5, 6, 'S'); //falta el texto
    //     $scope.pdf.rect(92, 249, 6, 4, 'S'); $scope.pdf.text('PESO', 92.5, 251.5);$scope.pdf.text(peso+'', 98.5, 251.5);
    //     $scope.pdf.rect(92, 253, 6, 4, 'S'); $scope.pdf.text('TALLA', 92.3, 255.5);$scope.pdf.text(talla+'', 98.5, 255.5);
    //     $scope.pdf.rect(92, 257, 6, 4, 'S'); $scope.pdf.text('Hb', 94, 259.5);$scope.pdf.text(Hemoglobina+'', 98.5, 259.5);
    //     $scope.pdf.rect(98, 249, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 253, 6, 4, 'S'); //falta el texto
    //     $scope.pdf.rect(98, 257, 6, 4, 'S'); //falta el texto
    //     if(estable=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 249, 5, 4, 'F');
    //     }else if(estable=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(104, 253, 5, 4, 'F');
    //     }else if(estable=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(104, 257, 5, 4, 'F');
    //     }

    //     if(servicio=='N'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 249, 5, 4, 'F');
    //     }else if(servicio=='C'){
    //         $scope.pdf.setFillColor(255, 0, 0); 
    //         $scope.pdf.rect(109, 253, 5, 4, 'F');
    //     }else if(servicio=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(109, 257, 5, 4, 'F');
    //     }
    //     $scope.pdf.rect(104, 249, 5, 4, 'S'); $scope.pdf.text('N', 105.5, 251.5);
    //     $scope.pdf.rect(104, 253, 5, 4, 'S'); $scope.pdf.text('C', 105.5, 255.5);
    //     $scope.pdf.rect(104, 257, 5, 4, 'S'); $scope.pdf.text('R', 105.5, 259.5);
    //     $scope.pdf.rect(109, 249, 5, 4, 'S'); $scope.pdf.text('N', 111, 251.5);
    //     $scope.pdf.rect(109, 253, 5, 4, 'S'); $scope.pdf.text('C', 111, 255.5);
    //     $scope.pdf.rect(109, 257, 5, 4, 'S'); $scope.pdf.text('R', 111, 259.5);

    //     $scope.pdf.rect(114, 249, 47, 4, 'S'); $scope.pdf.text('1', 114.5, 251.5);$scope.pdf.text(diagnostico1+'', 116.5, 251.5);
    //     $scope.pdf.rect(114, 253, 47, 4, 'S'); $scope.pdf.text('2', 114.5, 255.5);$scope.pdf.text(diagnostico2+'', 116.5, 255.5);
    //     $scope.pdf.rect(114, 257, 47, 4, 'S'); $scope.pdf.text('3', 114.5, 259.5);$scope.pdf.text(diagnostico3+'', 116.5, 259.5);
    //     if(tipo_diagnostico=='P'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(161, 249, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='D'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(165, 249, 4, 4, 'F');
    //     }else if(tipo_diagnostico=='R'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(169, 249, 4, 4, 'F');
    //     }
        
    //     if(valor_lab=='1'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(173, 249, 4, 4, 'F');
    //     }else if(valor_lab=='2'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(177, 249, 4, 4, 'F');
    //     }else if(valor_lab=='3'){
    //         $scope.pdf.setFillColor(255, 0, 0);
    //         $scope.pdf.rect(181, 249, 4, 4, 'F');
    //     }
    //     $scope.pdf.rect(161, 249, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 251.5);
    //     $scope.pdf.rect(161, 253, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 255.5);
    //     $scope.pdf.rect(161, 257, 4, 4, 'S'); $scope.pdf.text('P', 162.5, 259.5);
    //     $scope.pdf.rect(165, 249, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 251.5);
    //     $scope.pdf.rect(165, 253, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 255.5);
    //     $scope.pdf.rect(165, 257, 4, 4, 'S'); $scope.pdf.text('D', 166.5, 259.5);
    //     $scope.pdf.rect(169, 249, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 251.5);
    //     $scope.pdf.rect(169, 253, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 255.5);
    //     $scope.pdf.rect(169, 257, 4, 4, 'S'); $scope.pdf.text('R', 170.5, 259.5);

    //     $scope.pdf.rect(173, 249, 4, 4, 'S'); $scope.pdf.text('', 174.5, 251.5);
    //     $scope.pdf.rect(173, 253, 4, 4, 'S'); $scope.pdf.text('', 174.5, 255.5);
    //     $scope.pdf.rect(173, 257, 4, 4, 'S'); $scope.pdf.text('', 174.5, 259.5);

    //     $scope.pdf.rect(177, 249, 4, 4, 'S'); $scope.pdf.text('', 178.5, 251.5);
    //     $scope.pdf.rect(177, 253, 4, 4, 'S'); $scope.pdf.text('', 178.5, 255.5);
    //     $scope.pdf.rect(177, 257, 4, 4, 'S'); $scope.pdf.text('', 178.5, 259.5);

    //     $scope.pdf.rect(181, 249, 4, 4, 'S'); $scope.pdf.text('', 182.5, 251.5);
    //     $scope.pdf.rect(181, 253, 4, 4, 'S'); $scope.pdf.text('', 182.5, 255.5);
    //     $scope.pdf.rect(181, 257, 4, 4, 'S'); $scope.pdf.text('', 182.5, 259.5);

    //     $scope.pdf.rect(185, 249, 20, 4, 'S'); $scope.pdf.text(codigo_cie+'', 186.5, 251.5);
    //     $scope.pdf.rect(185, 253, 20, 4, 'S'); $scope.pdf.text('', 186.5, 255.5);
    //     $scope.pdf.rect(185, 257, 20, 4, 'S'); $scope.pdf.text('', 186.5, 259.5);
    // }
   
    //HOJA 2 ----------------------------------------------------------------------------------------------------------------
    $scope.primerasLineas2=function(){
        //INICIO DE CONTENIDO
        // linea 1
        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(5, 26, 5, 6, 'S'); $scope.pdf.text('2', 6, 29.5);
        $scope.pdf.rect(10, 26, 7, 6, 'S'); $scope.pdf.text('AÑO', 12, 29.5);
        $scope.pdf.rect(17, 26, 2, 6, 'S'); $scope.pdf.text('3', 17.5, 29.5);
        $scope.pdf.rect(19, 26, 19, 6, 'S'); $scope.pdf.text('MES', 26, 29.5);
        $scope.pdf.rect(38, 26, 2, 6, 'S'); $scope.pdf.text('4', 38.5, 29.5);
        $scope.pdf.rect(40, 26, 52, 6, 'S'); $scope.pdf.text('NOMBRE DE ESTABLECIMIENTO DE SALUD (IPRESS)', 41, 29.5);
        $scope.pdf.rect(92, 26, 2, 6, 'S'); $scope.pdf.text('5', 92.5, 29.5);
        $scope.pdf.rect(94, 26, 64, 6, 'S'); $scope.pdf.text('UNIDAD PRODUCTORA DE SERVICIOS (UPS)', 95, 29.5);
        $scope.pdf.rect(158, 26, 3, 6, 'S'); $scope.pdf.text('6', 159, 29.5);
        $scope.pdf.rect(161, 26, 44, 6, 'S'); $scope.pdf.text('NOMBRE DEL RESPONSABLE DE ATENCIÓN', 162, 29.5);

        // linea 2
        $scope.pdf.rect(5, 32, 12, 8, 'S'); $scope.pdf.text('', 6, 34);
        $scope.pdf.rect(17, 32, 21, 8, 'S'); $scope.pdf.text('', 18, 34);
        $scope.pdf.rect(38, 32, 54, 8, 'S'); $scope.pdf.text('', 40, 34);
        $scope.pdf.rect(92, 32, 66, 8, 'S'); $scope.pdf.text('', 68, 34);
        $scope.pdf.rect(158, 32, 3, 8, 'S'); $scope.pdf.text('', 159, 34);
        $scope.pdf.rect(161, 32, 19, 8, 'S'); $scope.pdf.text('', 162, 34);
        $scope.pdf.rect(180, 32, 25, 8, 'S'); $scope.pdf.text('', 183, 34);

        // linea 3
        $scope.pdf.rect(5, 40, 12, 5, 'S'); $scope.pdf.text('7', 11, 43);
        $scope.pdf.rect(17, 40, 21, 5, 'S'); $scope.pdf.text('8', 26, 43);
        $scope.pdf.rect(38, 40, 7, 5, 'S'); $scope.pdf.text('9', 40, 43);
        $scope.pdf.rect(45, 40, 21, 5, 'S'); $scope.pdf.text('11', 50, 43);
        $scope.pdf.rect(66, 40, 10, 5, 'S'); $scope.pdf.text('13', 70, 43);
        $scope.pdf.rect(76, 40, 6, 5, 'S'); $scope.pdf.text('14', 77, 43);
        $scope.pdf.rect(82, 40, 10, 5, 'S'); $scope.pdf.text('15', 86, 43);
        $scope.pdf.rect(92, 40, 12, 5, 'S'); $scope.pdf.text('16', 98, 43);
        $scope.pdf.rect(104, 40, 5, 5, 'S'); $scope.pdf.text('17', 106, 43);
        $scope.pdf.rect(109, 40, 5, 5, 'S'); $scope.pdf.text('18', 110, 43);
        $scope.pdf.rect(114, 40, 47, 5, 'S'); $scope.pdf.text('19', 135, 43);
        $scope.pdf.rect(161, 40, 12, 5, 'S'); $scope.pdf.text('20', 165, 43);
        $scope.pdf.rect(173, 40, 12, 5, 'S'); $scope.pdf.text('21', 177, 43);
        $scope.pdf.rect(185, 40, 20, 5, 'S'); $scope.pdf.text('22', 193, 43);

        // linea 4
        $scope.pdf.rect(5, 45, 12, 12, 'S'); $scope.pdf.text('DIA', 10, 51);
        $scope.pdf.rect(17, 45, 21, 4, 'S'); $scope.pdf.text('D.N.I.', 25, 48);
        $scope.pdf.rect(17, 49, 21, 4, 'S'); $scope.pdf.text('HISTORIA CLINICA', 18, 52);
        $scope.pdf.rect(17, 53, 21, 4, 'S'); $scope.pdf.text('GESTANTE/PUERPERA', 18, 56);
        $scope.pdf.rect(38, 45, 7, 4, 'S'); $scope.pdf.text('FINANC.', 38.2, 48);
        $scope.pdf.rect(38, 49, 7, 4, 'S'); $scope.pdf.text('10', 40, 52);
        $scope.pdf.rect(38, 53, 7, 4, 'S'); $scope.pdf.text('ETNIA', 39, 56);
        $scope.pdf.setFontSize(4);
        $scope.pdf.rect(45, 45, 21, 4, 'S'); $scope.pdf.text('DISTRITO DE PROCEDENCIA', 45.5, 48);
        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(45, 49, 21, 4, 'S'); $scope.pdf.text('12', 53, 52);
        $scope.pdf.rect(45, 53, 21, 4, 'S'); $scope.pdf.text('CENTRO POBLADO', 46, 56);
        $scope.pdf.rect(66, 45, 10, 12, 'S'); $scope.pdf.text('EDAD', 68, 48);
        $scope.pdf.rect(76, 45, 6, 12, 'S'); $scope.pdf.text('SEXO', 76.5, 48);
        $scope.pdf.setFontSize(4);
        $scope.pdf.rect(82, 45, 10, 12, 'S'); $scope.pdf.text('PERIMETRO', 82.5, 48); $scope.pdf.text('CEFALICO Y', 82.5, 51); $scope.pdf.text('ABDOMINAL', 82.5, 54);
        $scope.pdf.rect(92, 45, 12, 12, 'S'); $scope.pdf.text('EVALUACION', 93, 48); $scope.pdf.setFontSize(3.5); $scope.pdf.text('ANTROPOMETRICA', 92.3, 51); $scope.pdf.setFontSize(4); $scope.pdf.text('HEMOGLOBINA', 93, 54);
        $scope.pdf.setFontSize(4);
        $scope.pdf.rect(104, 45, 5, 12, 'S'); $scope.pdf.text('ESTA-', 104.5, 48); $scope.pdf.text('BLEC', 104.7, 51);
        $scope.pdf.rect(109, 45, 5, 12, 'S'); $scope.pdf.text('SER-', 109.5, 48); $scope.pdf.text('VICIO', 109.7, 51);
        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(114, 45, 47, 12, 'S'); $scope.pdf.text('DIAGNOSTICO MOTIVO DE CONSULTA', 122, 48); $scope.pdf.text('Y/O ACTIVIDAD DE SALUD', 125, 51);
        $scope.pdf.rect(161, 45, 12, 8, 'S'); $scope.pdf.text('TIPO DE', 163.5, 48); $scope.pdf.setFontSize(4.5); $scope.pdf.text('DIAGNOSTICO', 161.5, 51);
        $scope.pdf.setFontSize(5);
        $scope.pdf.rect(161, 53, 4, 4, 'S');$scope.pdf.text('P', 162.5, 55.5);
        $scope.pdf.rect(165, 53, 4, 4, 'S');$scope.pdf.text('D', 166.5, 55.5);
        $scope.pdf.rect(169, 53, 4, 4, 'S');$scope.pdf.text('R', 170.5, 55.5);
        $scope.pdf.rect(173, 45, 12, 8, 'S');$scope.pdf.text('VALOR', 175.5, 48); $scope.pdf.text('LAB', 177, 51);
        $scope.pdf.rect(173, 53, 4, 4, 'S');$scope.pdf.text('1°', 174.5, 55.5);
        $scope.pdf.rect(177, 53, 4, 4, 'S');$scope.pdf.text('2°', 178.5, 55.5);
        $scope.pdf.rect(181, 53, 4, 4, 'S');$scope.pdf.text('3°', 182.5, 55.5);
        $scope.pdf.rect(185, 45, 20, 12, 'S');$scope.pdf.text('CÓDIGO', 191, 48); $scope.pdf.text('CIE / CPT', 191, 51);
    }
   





    $scope.inicio();
    $scope.listarEstablecimientosHis();
    $scope.listaprofesionales();
    
});

