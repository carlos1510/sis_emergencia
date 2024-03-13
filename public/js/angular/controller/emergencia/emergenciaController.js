/**
 * Created by user on 22/04/2021.
 */
app.controller('emergenciaController', function ($scope, $timeout, DTOptionsBuilder, accesorioService, personaService, profesionalService, emergenciaService){
    $scope.dtInstance = {};
    $scope.elementos = {lista:[]};
    $scope.usuario = {};

    $scope.anios = [];
    $scope.meses = [];
    $scope.emergencia = {detalle_medicamento:[], detalle_his: []};
    //objeto de busqueda de la persona
    $scope.busqueda_profesional = {};
    $scope.busqueda_profesional_nomedico = {};
    $scope.busqueda = {};
    $scope.buscar = {};
    $scope.buscar.ocultar_btn_registrar = 0;

    $scope.estado_registro = 0;
    $scope.estado_busqueda = 0;
    $scope.estado_bus_acomp = 0;
    $scope.estado_accion = 1;
    $scope.estado_accion2 = 1;
    $scope.estado_paso = 1;

    $scope.personas = [];
    $scope.lista_etnias = [];
    $scope.lista_ubigeos = [];
    $scope.lista_establecimientos = [];
    $scope.lista_redes = [];
    $scope.lista_profesionales = [];
    $scope.lista_profesionales_nomedicos = [];
    $scope.ups_emergencia = [];
    $scope.ups_hospitalizacion = [];
    $scope.lista = [];
    $scope.lista_medicamentos = [];
    $scope.listausuarios = [];
    $scope.emergencia_tratamiento = {};
    $scope.buscar_medicamento_texto = '';
    $scope.buscar_eess_texto = '';
    $scope.busqueda_texto_emerg = '';
    $scope.busqueda_texto_nomedico = '';
    $scope.filtros = {};

    accesorioService.getDatosUsuario({}).success(function (data) {
        $scope.usuario = data;
        if ($scope.usuario.idnivel == 1 || $scope.usuario.idnivel == 2){
            accesorioService.getIPRESSAtencion({}).success(function (data) {
                $scope.filtros.eess = data;
            })
            //$scope.listarRedesbyDisa();
        }else {
            if ($scope.usuario.idnivel == 3){
                ///accesorioService.listarMicroRedes({codigo_disa: '34', codigo_red: $scope.usuario.codigo_red}).success(function (data) {
                    //$scope.lista_microredes = data;
                //});
            }else {
                if ($scope.usuario.idnivel == 4){
                    //accesorioService.listarEstablecimientos({codigo_disa:'34', codigo_red: $scope.usuario.codigo_red, codigo_microred: $scope.usuario.codigo_microred}).success(function (data) {
                        //$scope.filtros.eess = data;
                    //})
                }else {
                    //$scope.listar();
                }
            }
        }
    });

    emergenciaService.getProfesionalRegistro({}).success(function (data) {
        $scope.listausuarios = data;
    });

    $timeout(function () {
        $("#cmbFiltroEstablecimiento").val("").change();
        $("#cmbTipoDocumentoBuscar").val("").change();
        var date = new Date();
        var primerDia = new Date(date.getFullYear(), date.getMonth() , 1);
        var ultimoDia = new Date(date.getFullYear(), (date.getMonth() + 1), 0);

        $scope.busqueda.fecha_inicio = ('0'+date.getDate()).toString().substr(-2)+'/'+('0'+(date.getMonth()+1)).toString().substr(-2)+'/'+date.getFullYear();
        $scope.busqueda.fecha_final = ('0'+date.getDate()).toString().substr(-2)+'/'+('0'+(date.getMonth()+1)).toString().substr(-2)+'/'+date.getFullYear();
    },0);

    accesorioService.listarRedes({codigo_disa: '34'}).success(function (data) {
        $scope.lista_redes = data;
    });

    accesorioService.getListaMedicamentos({}).success(function (data) {
        $scope.lista_medicamentos = data;
    });

    $scope.listarMicroRedByRed = function () {
        if ($("#cmbRedBuscar").val() != ""){
            accesorioService.listarMicroRedes({codigo_disa: '34', codigo_red:$("#cmbRedBuscar").val()}).success(function (data) {
                $scope.lista_microredes = data;
            });
        }
    }

    $scope.listarEESSbyMicroRed = function () {
        if ($("#cmbMicroRedBuscar").val() != ""){
            $scope.lista_eess = [];
            //lista_eess_buscar
            $("#lista_eess_buscar").block({message: '<center><i class="flaticon-settings"> Espere....</i></center>'});
            accesorioService.listarEstablecimientos({codigo_disa:'34', codigo_red:$("#cmbRedBuscar").val(), codigo_microred: $("#cmbMicroRedBuscar").val()}).success(function (data) {
                $scope.lista_eess = data;
                $("#lista_eess_buscar").unblock();
            });
        }
    }

    $scope.seleccionEESS = function (item) {
        if ($scope.estado_accion == 1){
            $scope.emergencia.nom_est = item.nombre_establecimiento;
            $scope.emergencia.cod_2000 = item.codigo_unico;
        }else {
            if ($scope.estado_accion == 2){
                $scope.emergencia_tratamiento.nom_est = item.nombre_establecimiento;
                $scope.emergencia_tratamiento.cod_2000 = item.codigo_unico;
            }
        }
        $scope.buscar_eess_texto = '';
        $("#seleccionarEstablecimientoModal").modal('hide');
    }

    accesorioService.listarEtnias({}).success(function (data) {
        $scope.lista_etnias = data;
    });

    accesorioService.listarUbigeo({codigo_departamento: '25'}).success(function (data) {
        $scope.lista_ubigeos = data;
    });

    accesorioService.listarEstablecimientos({codigo_disa: '34'}).success(function (data) {
        $scope.lista_establecimientos = data;
    });

    accesorioService.listaUpsByEmergenciaHospitalizacion({servicio_descripcion:'EMERGENCIA'}).success(function (data) {
        $scope.ups_emergencia = data;
    });

    accesorioService.listaUpsByEmergenciaHospitalizacion({servicio_descripcion:'HOSPITALIZACIÓN'}).success(function (data) {
        $scope.ups_hospitalizacion = data;
    });

    $scope.regresar = function () {
        $scope.estado_registro = 0;
    }

    $scope.listar = function () {
        $("#lista_emergencia_bloqueoDiv").block({message: '<center><i class="flaticon-settings"> Espere....</i></center>'});
        emergenciaService.listarEmergencia($scope.busqueda).success(function (data) {
            $scope.lista = data;
            $("#lista_emergencia_bloqueoDiv").unblock();
        })
    }

    $scope.listarProfesionalByEESS = function () {
        $scope.busqueda_profesional.tipo_nivel = 2;
        $scope.busqueda_profesional.tipo_profesional = 1;
        $scope.busqueda_profesional.nom_profesion = $("#cmbTipoProfesionalAtencion").val();
        profesionalService.getLista($scope.busqueda_profesional).success(function (data) {
            $scope.lista_profesionales = data;
        });
    }

    $scope.listarProfesionalNoMedicoByEESS = function () {
        $scope.busqueda_profesional_nomedico.tipo_nivel = 2;
        $scope.busqueda_profesional_nomedico.tipo_profesional = 2;
        profesionalService.getLista($scope.busqueda_profesional_nomedico).success(function (data) {
            $scope.lista_profesionales_nomedicos = data;
        });
    }

    $scope.nuevaBusqueda = function () {
        $scope.estado_registro = 1;
        $scope.estado_accion = 1;
        $scope.estado_accion2 = 1;
        $scope.buscar = {};
        $timeout(function () {
            $("#cmbTipoDocumentoBuscar").val(1).change();
        },0);
        $scope.personas = [];
        $scope.emergencia = {};
        $scope.emergencia.detalle_his = [];
        $scope.emergencia_tratamiento = {};
    }

    $scope.buscarPersona = function () {
        $scope.personas = [];
        if ($("#cmbTipoDocumentoBuscar").val() != ""){
            if ($("#nro_documentotxt").val() != ""){
                $scope.buscar.tipo_busqueda = 2; // pacientes
                $scope.buscar.nro_documento = $("#nro_documentotxt").val();
                $("#lista_bloqueoDiv").block({message: '<center><i class="flaticon-settings"> Espere....</i></center>'});
                personaService.buscarPersonaByTipo($scope.buscar).success(function (data) {
                    $scope.personas = [];
                    if (data.confirm == true){
                        if (data.data.length > 0){
                            //con datos
                            $scope.estado_busqueda = 1; //encontrado en la base de datos del sistema
                            $scope.personas = data.data;
                        }else {
                            //sin datos
                            if ($("#cmbTipoDocumentoBuscar").val() == 1){
                                //buscamos en la reniec
                                $("#lista_bloqueo2Div").block({message: '<center><i class="flaticon-settings"> Espere - buscando en padron RENIEC....</i></center>'});
                                accesorioService.consultarDNIRUCReniec({dni:$scope.buscar.nro_documento}).success(function (data) {
                                    if (data.apellidoPaterno != null){
                                        $scope.estado_busqueda = 2;
                                        $scope.personas = [];
                                        $scope.personas.push({tipo_documento: 1, nro_documento: data.dni, nombres: data.nombres, apellido_paterno: data.apellidoPaterno, apellido_materno: data.apellidoMaterno})
                                        //console.debug(data.apellidoMaterno);
                                    }else {
                                        swal({
                                            title: 'Desea Registrar la Emergencia?',
                                            text: "No se Encontraron Registros con el numero de documento "+$scope.buscar.nro_documento,
                                            type: 'warning',
                                            buttons:{
                                                confirm: {
                                                    text : 'Registrar',
                                                    className : 'btn btn-success'
                                                },cancel: {
                                                    visible: true,
                                                    text : 'Cancelar',
                                                    className: 'btn btn-danger'
                                                }
                                            }
                                        }).then(function(confirmar) {
                                            if (confirmar) {
                                                //registramos los datos
                                                $scope.nuevoRegistro(3, null);
                                            } else {
                                                //
                                            }
                                        });
                                    }
                                    $("#lista_bloqueo2Div").unblock();
                                });
                            }else {
                                //mensaje para el registro manualmente todos los datos
                                swal({
                                    title: 'Desea Registrar la Emergencia?',
                                    text: "No se Encontraron Registros con el numero de documento "+$scope.buscar.nro_documento,
                                    type: 'warning',
                                    buttons:{
                                        confirm: {
                                            text : 'Registrar',
                                            className : 'btn btn-success'
                                        },cancel: {
                                            visible: true,
                                            text : 'Cancelar',
                                            className: 'btn btn-danger'
                                        }
                                    }
                                }).then(function(confirmar) {
                                    if (confirmar) {
                                        //registramos los datos
                                        $scope.nuevoRegistro(3, null);
                                    } else {
                                        //
                                    }
                                });
                            }
                        }
                    }else {
                        //mensaje de error
                        /*swal("Error!", "Falló Interno por problemas de conectividad!", {
                            icon : "error",
                            buttons: {
                                confirm: {
                                    text : 'Entendido',
                                    className : 'btn btn-danger'
                                }
                            },
                        });*/
                        swal({
                            title: 'Desea Registrar la Emergencia?',
                            text: "No se Encontraron Registros con el numero de documento "+$scope.buscar.nro_documento,
                            type: 'warning',
                            buttons:{
                                confirm: {
                                    text : 'Registrar',
                                    className : 'btn btn-success'
                                },cancel: {
                                    visible: true,
                                    text : 'Cancelar',
                                    className: 'btn btn-danger'
                                }
                            }
                        }).then(function(confirmar) {
                            if (confirmar) {
                                //registramos los datos
                                $scope.nuevoRegistro(3, null);
                            } else {
                                //
                            }
                        });
                    }
                    $("#lista_bloqueoDiv").unblock();
                })
            }
        }
    }

    $scope.buscarEESS = function () {
        var valid = false;
        var valor_cod_2000 = "";
        if ($scope.estado_accion == 1){
            if ($scope.emergencia.cod_2000 != undefined) {
                if ($scope.emergencia.cod_2000 != "") {
                    valid = true;
                    valor_cod_2000 = $scope.emergencia.cod_2000;
                }
            }
        }else {
            if ($scope.estado_accion == 2){
                if ($scope.emergencia_tratamiento.cod_2000 != undefined) {
                    if ($scope.emergencia_tratamiento.cod_2000 != "") {
                        valid = true;
                        valor_cod_2000 = $scope.emergencia_tratamiento.cod_2000;
                    }
                }
            }
        }
        if (valid){
            $scope.estado_bus_acomp = 2;
            accesorioService.buscarEESSByCodigo({codigo_disa:'34', cod_2000: valor_cod_2000}).success(function (data) {
                if (data.length > 0){
                    if ($scope.estado_accion == 1){
                        $scope.emergencia.nom_est = data[0].nombre_establecimiento;
                        $scope.emergencia.cod_2000 = data[0].codigo_unico;
                    }else {
                        if ($scope.estado_accion == 2){
                            $scope.emergencia_tratamiento.nom_est = data[0].nombre_establecimiento;
                            $scope.emergencia_tratamiento.cod_2000 = data[0].codigo_unico;
                        }
                    }
                }
                $scope.estado_bus_acomp = 0;
            });
        }
    }

    $scope.limpiarNombreEESS = function () {
        $scope.emergencia.nom_est = null;
    }

    $scope.nuevoRegistro = function (opcion, item) {
        $scope.estado_registro = 2;
        $scope.estado_encontrado_acomp = 2;
        $scope.estado_encontrado = opcion;
        $scope.emergencia = {detalle_medicamento:[], detalle_his:[]};

        $timeout(function () {
            $("#cmbTipoProfesionalAtencion").val("").change();
        }, 0);

        if (opcion == 1){//sin documento
            if ($scope.usuario.idnivel > 4){
                $scope.emergencia.cod_2000 = $scope.usuario.cod_2000;
                $scope.emergencia.nom_est = $scope.usuario.nom_eess;
            }
            $scope.emergencia.tratamiento_adicional = 'NO';
            var fecha = new Date();
            $scope.emergencia.fecha_atencion = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();
            $scope.emergencia.hora_atencion = fecha.getHours() + ":" + fecha.getMinutes();
            $scope.emergencia.detalle_medicamento = [];
            $scope.emergencia.detalle_his = [];
            $('#fecha_salidatxt').datepicker('setStartDate', new Date());
            //Persona no registrado
            $timeout(function () {
                $("#cmbTipo_documento").val($scope.buscar.tipo_documento).change();
            }, 0);
            personaService.generarCodigoSinDocumento({}).success(function (data) {
                $scope.emergencia.nro_documento = data;;
            })

            $timeout(function () {
                $("#cmbTipoProfesionalProcedimiento").val("").change();
            }, 0);

            $timeout(function () {
                $("#cmbIdFinanciador").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbSexo").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbIdEtnia").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbTipo_edad").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbIdUbigeo").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbTipo_doc_acomp").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbIdmotivo_atencion").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbIdubigeo_lugar_ocurrencia").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbTipo_actividad").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbIdCondicion_salida").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbArea_atencion").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbIdDestino").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbCod_2000_referencia").val("").change();
            }, 0);
            $scope.emergencia.tipo_edad = '';
            $scope.emergencia.condicion_establecimiento = 'C';
            $scope.emergencia.condicion_servicio = 'C';
            $scope.nuevaEmergencia();
        }else {
            if (opcion == 2){
                //Persona encontrado
                $scope.emergencia = item;
                $scope.nuevaEmergencia();
                if ($scope.usuario.idnivel > 4){
                    $scope.emergencia.cod_2000 = $scope.usuario.cod_2000;
                    $scope.emergencia.nom_est = $scope.usuario.nom_eess;
                }
                var fecha = new Date();
                $scope.emergencia.tratamiento_adicional = 'NO';
                $scope.emergencia.fecha_atencion = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();
                $scope.emergencia.hora_atencion = ('0' + fecha.getHours()).toString().substr(-2) + ":" + ('0' + fecha.getMinutes()).toString().substr(-2);
                $scope.emergencia.detalle_medicamento = [];
                $scope.emergencia.detalle_his = [];
                $scope.emergencia.condicion_establecimiento = 'C';
                $scope.emergencia.condicion_servicio = 'C';
                $('#fecha_salidatxt').datepicker('setStartDate', new Date());

                if ($scope.estado_busqueda == 1){
                    //encontrados en el sistema

                    $timeout(function () {
                        $("#cmbTipo_documento").val($scope.buscar.tipo_documento).change();
                    }, 0);

                    $timeout(function () {
                        $("#cmbTipoProfesionalProcedimiento").val("").change();
                    }, 0);
                    /*$timeout(function () {
                        $("#cmbCod_2000").val("").change();
                    }, 0);*/
                    $timeout(function () {
                        $("#cmbIdFinanciador").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbSexo").val(item.sexo!=null?item.sexo:"").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdEtnia").val(item.idetnia!=null?item.idetnia:"").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbTipo_edad").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdUbigeo").val(item.idubigeo!=null?item.idubigeo:"").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbTipo_doc_acomp").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdmotivo_atencion").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdubigeo_lugar_ocurrencia").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbTipo_actividad").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdCondicion_salida").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdDestino").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbArea_atencion").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbCod_2000_referencia").val("").change();
                    }, 0);
                    $scope.emergencia.tipo_edad = '';
                    $timeout(function () {
                        $scope.calcularEdadFechaNacimiento();
                    }, 50);
                }else {
                    if ($scope.estado_busqueda == 2){
                        //obtenido de la reniec
                        $timeout(function () {
                            $("#cmbTipo_documento").val(item.tipo_documento).change();
                        }, 0);
                        $scope.emergencia.detalle_medicamento = [];
                        $scope.emergencia.detalle_his = [];
                        $scope.emergencia.tratamiento_adicional = 'NO';
                        $scope.emergencia.condicion_establecimiento = 'C';
                        $scope.emergencia.condicion_servicio = 'C';
                        /*$timeout(function () {
                            $("#cmbCod_2000").val("").change();
                        }, 0);*/
                        $timeout(function () {
                            $("#cmbIdFinanciador").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbTipoProfesionalProcedimiento").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbSexo").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbIdEtnia").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbTipo_edad").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbIdUbigeo").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbTipo_doc_acomp").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbIdmotivo_atencion").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbIdubigeo_lugar_ocurrencia").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbTipo_actividad").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbIdCondicion_salida").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbArea_atencion").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbIdDestino").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbCod_2000_referencia").val("").change();
                        }, 0);
                        $scope.emergencia.tipo_edad = '';
                    }
                }
            }else {
                if (opcion == 3){
                    //no encontrado
                    if ($scope.usuario.idnivel > 4){
                        $scope.emergencia.cod_2000 = $scope.usuario.cod_2000;
                        $scope.emergencia.nom_est = $scope.usuario.nom_eess;
                    }
                    $scope.emergencia.tratamiento_adicional = 'NO';
                    var fecha = new Date();
                    $scope.emergencia.fecha_atencion = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();
                    $scope.emergencia.hora_atencion = fecha.getHours() + ":" + fecha.getMinutes();
                    $scope.emergencia.detalle_medicamento = [];
                    $scope.emergencia.detalle_his = [];
                    $('#fecha_salidatxt').datepicker('setStartDate', new Date());
                    //Persona no registrado
                    $timeout(function () {
                        $("#cmbTipo_documento").val($scope.buscar.tipo_documento).change();
                    }, 0);

                    $scope.emergencia.nro_documento = $scope.buscar.nro_documento;

                    $timeout(function () {
                        $("#cmbIdFinanciador").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbTipoProfesionalProcedimiento").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbSexo").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdEtnia").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbTipo_edad").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdUbigeo").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbTipo_doc_acomp").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdmotivo_atencion").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdubigeo_lugar_ocurrencia").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbTipo_actividad").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdCondicion_salida").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbArea_atencion").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdDestino").val("").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbCod_2000_referencia").val("").change();
                    }, 0);
                    $scope.emergencia.tipo_edad = '';
                    $scope.emergencia.condicion_establecimiento = 'C';
                    $scope.emergencia.condicion_servicio = 'C';
                    $scope.nuevaEmergencia();
                }
            }
        }
        $(".numero2").ForceNumericOnly();
    }

    $scope.nuevaEmergencia = function () {
        $scope.emergencia.dx1_si_no = 'SI';
        $scope.emergencia.dx2_si_no = 'NO';
        $scope.emergencia.dx3_si_no = 'NO';
        $scope.emergencia.dx4_si_no = 'NO';

        $scope.emergencia.tipo_diagnostico_dx1 = 'P';
        $scope.emergencia.tipo_diagnostico_dx2 = 'P';
        $scope.emergencia.tipo_diagnostico_dx3 = 'P';
        $scope.emergencia.tipo_diagnostico_dx4 = 'P';

        $scope.emergencia.proc1_si_no = 'NO';
        $scope.emergencia.proc2_si_no = 'NO';
        $scope.emergencia.proc3_si_no = 'NO';
        $scope.emergencia.proc4_si_no = 'NO';

        $scope.emergencia.profesional_atiende = 'ESTABLECIMIENTO';

        $scope.emergencia.condicion_establecimiento = 'C';
        $scope.emergencia.condicion_servicio = 'C';
    }

    $scope.salirRegistro = function () {
        $scope.estado_registro = 0;
        $scope.emergencia = {};
        $scope.emergencia.detalle_his = [];
    }

    $scope.calcularEdadFechaNacimiento = function () {
        if ($("#fecha_nacimientotxt").val() != ""){
            var fecha_ac = new Date();
            var fecha_actual = fecha_ac.getFullYear()+'-'+ (fecha_ac.getMonth() + 1) + '-' + fecha_ac.getDate();
            var fecha_nac = $("#fecha_nacimientotxt").val().split('/');
            var fecha_nacimiento = fecha_nac[2] + '-' + fecha_nac[1] + '-' + fecha_nac[0];
            accesorioService.calcularEdad({fecha_actual: fecha_actual, nacimiento: fecha_nacimiento}).success(function (data) {
                if (data.edad_anio > 0){
                    $timeout(function () {
                        $("#cmbTipo_edad").val(data.tipo_edad_anio).change();
                    }, 0);
                    $timeout(function () {
                        $scope.emergencia.edad = data.edad_anio;
                    }, 50);
                }else {
                    if (data.edad_mes > 0){
                        $timeout(function () {
                            $("#cmbTipo_edad").val(data.tipo_edad_mes).change();
                        }, 0);
                        $timeout(function () {
                            $scope.emergencia.edad = data.edad_mes;
                        }, 50);
                    }else {
                        if (data.edad_dia > 0){
                            $timeout(function () {
                                $("#cmbTipo_edad").val(data.tipo_edad_dia).change();
                            }, 0);
                            $timeout(function () {
                                $scope.emergencia.edad = data.edad_dia;
                            }, 50);
                        }
                    }
                }
            })
        }
    }

    $scope.iniciarCombo = function () {
        $timeout(function () {
            $("#cmbCod_2000_referencia").val("").change();
            $("#cmbIdUps_hospitalizacion").val("").change();
        }, 0);
    }

    /**
     * AUTOCOMPLETAR DE DIAGNOSTICO
     */

        // Fetch data
    $scope.fetchCIEX = function(item){
        var searchText_len = 0;
        var searchText = '';
        if (item == 1){
            searchText_len = $scope.emergencia.descripcion_dx1.trim().length;
            searchText = $scope.emergencia.descripcion_dx1;
        }else {
            if (item == 2){
                searchText_len = $scope.emergencia.descripcion_dx2.trim().length;
                searchText = $scope.emergencia.descripcion_dx2;
            }else {
                if (item == 3){
                    searchText_len = $scope.emergencia.descripcion_dx3.trim().length;
                    searchText = $scope.emergencia.descripcion_dx3;
                }else {
                    if (item == 4){
                        searchText_len = $scope.emergencia.descripcion_dx4.trim().length;
                        searchText = $scope.emergencia.descripcion_dx4;
                    }
                }
            }
        }

        // Check search text length
        if(searchText_len > 0){
            accesorioService.filtrarCIEX({texto: searchText}).success(function (data) {
                if (item == 1){
                    $scope.searchResult_1 = data;
                }else {
                    if (item == 2){
                        $scope.searchResult_2 = data;
                    }else {
                        if (item == 3){
                            $scope.searchResult_3 = data;
                        }else {
                            if (item == 4){
                                $scope.searchResult_4 = data;
                            }
                        }
                    }
                }

            });
        }else{
            if (item == 1){
                $scope.emergencia.codigo_dx1 = null;
                $scope.searchResult_1 = {};
            }else {
                if (item == 2){
                    $scope.emergencia.codigo_dx2 = null;
                    $scope.searchResult_2 = {};
                }else {
                    if (item == 3){
                        $scope.emergencia.codigo_dx3 = null;
                        $scope.searchResult_3 = {};
                    }else {
                        if (item == 4){
                            $scope.emergencia.codigo_dx4 = null;
                            $scope.searchResult_4 = {};
                        }
                    }
                }
            }
        }

    }

    // Set value to search box
    $scope.setValue = function(index, item, $event){
        //console.debug($scope.contrareferencia.diagnosticos[index]);
        if (item == 1){
            $scope.emergencia.descripcion_dx1 = $scope.searchResult_1[index].descripcion_cie;
            $scope.emergencia.codigo_dx1 = $scope.searchResult_1[index].codigo_cie;
            $scope.searchResult_1 = {};
        }else {
            if (item == 2){
                $scope.emergencia.descripcion_dx2 = $scope.searchResult_2[index].descripcion_cie;
                $scope.emergencia.codigo_dx2 = $scope.searchResult_2[index].codigo_cie;
                $scope.searchResult_2 = {};
            }else {
                if (item == 3){
                    $scope.emergencia.descripcion_dx3 = $scope.searchResult_3[index].descripcion_cie;
                    $scope.emergencia.codigo_dx3 = $scope.searchResult_3[index].codigo_cie;
                    $scope.searchResult_3 = {};
                }else {
                    if (item == 4){
                        $scope.emergencia.descripcion_dx4 = $scope.searchResult_4[index].descripcion_cie;
                        $scope.emergencia.codigo_dx4 = $scope.searchResult_4[index].codigo_cie;
                        $scope.searchResult_4 = {};
                    }
                }
            }
        }

        $event.stopPropagation();
    }

    $scope.searchboxClicked = function($event){
        $event.stopPropagation();
    }

    $scope.containerClicked = function(item){
        if (item == 1){
            $scope.searchResult_1 = {};
        }else {
            if (item == 2){
                $scope.searchResult_2 = {};
            }else {
                if (item == 3){
                    $scope.searchResult_3 = {};
                }else {
                    if (item == 4){
                        $scope.searchResult_4 = {};
                    }
                }
            }
        }
    }

    //FIN DE AUTOCOMPLETAR DIAGNOSTICO

    /**
     * AUTOCOMPLETAR DE PROCEDIMIENTOS
     */

        // Fetch data
    $scope.fetchCIEXProc = function(item){
        var searchText_len = 0;
        var searchText = '';
        if (item == 1){
            searchText_len = $scope.emergencia.descripcion_proc_1.trim().length;
            searchText = $scope.emergencia.descripcion_proc_1;
        }else {
            if (item == 2){
                searchText_len = $scope.emergencia.descripcion_proc_2.trim().length;
                searchText = $scope.emergencia.descripcion_proc_2;
            }else {
                if (item == 3){
                    searchText_len = $scope.emergencia.descripcion_proc_3.trim().length;
                    searchText = $scope.emergencia.descripcion_proc_3;
                }else {
                    if (item == 4){
                        searchText_len = $scope.emergencia.descripcion_proc_4.trim().length;
                        searchText = $scope.emergencia.descripcion_proc_4;
                    }
                }
            }
        }

        // Check search text length
        if(searchText_len > 0){
            accesorioService.filtrarCIEX({texto: searchText}).success(function (data) {
                if (item == 1){
                    $scope.searchResult_Proc_1 = data;
                }else {
                    if (item == 2){
                        $scope.searchResult_Proc_2 = data;
                    }else {
                        if (item == 3){
                            $scope.searchResult_Proc_3 = data;
                        }else {
                            if (item == 4){
                                $scope.searchResult_Proc_4 = data;
                            }
                        }
                    }
                }

            });
        }else{
            if (item == 1){
                $scope.emergencia.codigo_proc_1 = null;
                $scope.searchResult_Proc_1 = {};
            }else {
                if (item == 2){
                    $scope.emergencia.codigo_proc_2 = null;
                    $scope.searchResult_Proc_2 = {};
                }else {
                    if (item == 3){
                        $scope.emergencia.codigo_proc_3 = null;
                        $scope.searchResult_Proc_3 = {};
                    }else {
                        if (item == 4){
                            $scope.emergencia.codigo_proc_4 = null;
                            $scope.searchResult_Proc_4 = {};
                        }
                    }
                }
            }
        }

    }

    // Set value to search box
    $scope.setValueProc = function(index, item, $event){
        //console.debug($scope.contrareferencia.diagnosticos[index]);
        if (item == 1){
            $scope.emergencia.descripcion_proc_1 = $scope.searchResult_Proc_1[index].descripcion_cie;
            $scope.emergencia.codigo_proc_1 = $scope.searchResult_Proc_1[index].codigo_cie;
            $scope.searchResult_Proc_1 = {};
        }else {
            if (item == 2){
                $scope.emergencia.descripcion_proc_2 = $scope.searchResult_Proc_2[index].descripcion_cie;
                $scope.emergencia.codigo_proc_2 = $scope.searchResult_Proc_2[index].codigo_cie;
                $scope.searchResult_Proc_2 = {};
            }else {
                if (item == 3){
                    $scope.emergencia.descripcion_proc_3 = $scope.searchResult_Proc_3[index].descripcion_cie;
                    $scope.emergencia.codigo_proc_3 = $scope.searchResult_Proc_3[index].codigo_cie;
                    $scope.searchResult_Proc_3 = {};
                }else {
                    if (item == 4){
                        $scope.emergencia.descripcion_proc_4 = $scope.searchResult_Proc_4[index].descripcion_cie;
                        $scope.emergencia.codigo_proc_4 = $scope.searchResult_Proc_4[index].codigo_cie;
                        $scope.searchResult_Proc_4 = {};
                    }
                }
            }
        }

        $event.stopPropagation();
    }

    $scope.searchboxClickedProc = function($event){
        $event.stopPropagation();
    }

    $scope.containerClickedProc = function(item){
        if (item == 1){
            $scope.searchResult_Proc_1 = {};
        }else {
            if (item == 2){
                $scope.searchResult_Proc_2 = {};
            }else {
                if (item == 3){
                    $scope.searchResult_Proc_3 = {};
                }else {
                    if (item == 4){
                        $scope.searchResult_Proc_4 = {};
                    }
                }
            }
        }
    }

    //FIN DE AUTOCOMPLETAR PROCEDIMIENTOS

    $scope.tipo_busqueda_persona = function () {
        if ($("#cmbTipoDocumentoBuscar").val() != ""){
            if ($scope.buscar.tipo_documento == 5){
                //visualiza el boton registrar
                $scope.buscar.ocultar_btn_registrar = 1;
            }else {
                //oculta el boton registrar
                if ($scope.buscar.tipo_documento == 1){
                    $timeout(function () {
                        $('#nro_documentotxt').val("");
                        $("#nro_documentotxt").addClass( 'numero_dni' );
                        $("#nro_documentotxt").attr('maxlength', 8);
                        $(".numero_dni").numeric({decimal: false, negative: false});
                        $("#nro_documentotxt").focus();
                    }, 100);
                }else {
                    $timeout(function () {
                        $('#nro_documentotxt').val("");
                        $("#nro_documentotxt").attr('maxlength', 12);
                        $(".numero_dni").removeNumeric();
                        $("#nro_documentotxt").focus();
                    }, 100);
                }
                $scope.buscar.ocultar_btn_registrar = 0;
            }
        }
    }

    jQuery.fn.ForceNumericOnly =
        function() {
            return this.each(function() {
                $(this).keydown(function(e) {
                    var key = e.charCode || e.keyCode || 0;
                    // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
                    return (
                    key == 8 ||
                    key == 9 ||
                    key == 46 ||
                    (key >= 37 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
                });
            });
        };

    jQuery.fn.ForceAlphaNumerico = function () {
        return this.each(function () {
            $(this).keydown(function (e) {
                var regex = new RegExp("^[a-zA-Z0-9 ]+$");
                var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (!regex.test(key)) {
                    e.preventDefault();
                    return false;
                }
            })
        })
    }

    $scope.buscarPersonaProfesional = function () {
        $scope.emergencia.idprofesional = null;
        $scope.emergencia.nombre_profesional = null;
        var valor_dni = "";
        var valid = false;
        if ($scope.estado_accion == 1){
            if ($("#nro_documento_profesional").val() != ""){
                valid = true;
                valor_dni = $("#nro_documento_profesional").val();
            }else {
                valid = false;
            }
        }else {
            if ($scope.estado_accion == 2){
                if ($("#nro_documento_profesional_tratamiento").val() != ""){
                    valid = true;
                    valor_dni = $("#nro_documento_profesional_tratamiento").val();
                }else {
                    valid = false;
                }
            }
        }
        if (valid){
            $scope.estado_bus_acomp = 3;
            profesionalService.buscarProfesionalMedico({dni:valor_dni}).success(function (data) {
                if (data.length > 0){
                    if ($scope.estado_accion == 1){
                        $scope.emergencia.idprofesional = data[0].id_personal;
                        $scope.emergencia.nro_doc_profecional = data[0].numero_documento;
                        $scope.emergencia.nombre_profesional = data[0].apellido_paterno_personal + ' ' + data[0].apellido_materno_personal + ', ' + data[0].nombres_personal;
                    }else {
                        if ($scope.estado_accion == 2){
                            $scope.emergencia_tratamiento.idprofesional = data[0].id_personal;
                            $scope.emergencia_tratamiento.nro_doc_profecional = data[0].numero_documento;
                            $scope.emergencia_tratamiento.nombre_profesional = data[0].apellido_paterno_personal + ' ' + data[0].apellido_materno_personal + ', ' + data[0].nombres_personal;
                        }
                    }
                }else {
                    swal("No Existe!", "Profesional no Registrado!", {
                        icon : "warning",
                        buttons: {
                            confirm: {
                                className : 'btn btn-warning'
                            }
                        },
                    });
                }
                $scope.estado_bus_acomp = 0;
            })
        }
    }

    $scope.seleccionProfecional = function (item) {
        if ($scope.estado_accion == 1){
            $scope.emergencia.idprofesional = item.id_personal;
            $scope.emergencia.nro_doc_profecional = item.numero_documento;
            $scope.emergencia.nombre_profesional = item.apellido_paterno_personal + ' ' + item.apellido_materno_personal + ', ' + item.nombres_personal;
        }else {
            if ($scope.estado_accion == 2){
                $scope.emergencia_tratamiento.idprofesional = item.id_personal;
                $scope.emergencia_tratamiento.nro_doc_profecional = item.numero_documento;
                $scope.emergencia_tratamiento.nombre_profesional = item.apellido_paterno_personal + ' ' + item.apellido_materno_personal + ', ' + item.nombres_personal;
            }
        }
        $scope.busqueda_texto = "";
        $("#seleccionarProfesionalModal").modal('hide');
    }

    $scope.seleccionProfecionalNoMedico = function (item) {
        if ($scope.estado_accion == 1){
            $scope.emergencia.idprofesional_no_medico = item.id_personal;
            $scope.emergencia.nro_doc_profecional_no_medico = item.numero_documento;
            $scope.emergencia.nombre_profesional_no_medico = item.apellido_paterno_personal + ' ' + item.apellido_materno_personal + ', ' + item.nombres_personal;
        }else {
            if ($scope.estado_accion == 2){
                $scope.emergencia_tratamiento.idprofesional_no_medico = item.id_personal;
                $scope.emergencia_tratamiento.nro_doc_profecional_no_medico = item.numero_documento;
                $scope.emergencia_tratamiento.nombre_profesional_no_medico = item.apellido_paterno_personal + ' ' + item.apellido_materno_personal + ', ' + item.nombres_personal;
            }
        }
        $scope.busqueda_texto_nomedico = "";
        $('input[name="busqueda_texto_nomedico"]').focus();
        $("#seleccionarProfesionalNoMedicoModal").modal('hide');
    }

    $scope.buscarPersonaProfesionalNoMedico = function () {
        var valor_dni = "";
        var valid = false;
        if ($scope.estado_accion2 == 1){
            $scope.emergencia.idprofesional_no_medico = null;
            $scope.emergencia.nombre_profesional_no_medico = null;
            if ($("#nro_doc_profecional_no_medico").val() != ""){
                valid = true;
                valor_dni = $("#nro_doc_profecional_no_medico").val();
            }else {
                valid = false;
            }
        }else {
            if ($scope.estado_accion2 == 2){
                $scope.emergencia_tratamiento.idprofesional_no_medico = null;
                $scope.emergencia_tratamiento.nro_doc_profecional_no_medico = null;
                if ($("#nro_documento_profesional_no_medico_tratamiento").val() != ""){
                    valid = true;
                    valor_dni = $("#nro_documento_profesional_no_medico_tratamiento").val();
                }else {
                    valid = false;
                }
            }
        }
        if (valid){
            $scope.estado_bus_acomp = 3;
            profesionalService.buscarProfesionalNoMedico({dni:valor_dni}).success(function (data) {
                if (data.length > 0){
                    if ($scope.estado_accion == 1){
                        $scope.emergencia.idprofesional_no_medico = data[0].id_personal;
                        $scope.emergencia.nro_doc_profecional_no_medico = data[0].numero_documento;
                        $scope.emergencia.nombre_profesional_no_medico = data[0].apellido_paterno_personal + ' ' + data[0].apellido_materno_personal + ', ' + data[0].nombres_personal;
                    }else {
                        if ($scope.estado_accion == 2){
                            $scope.emergencia_tratamiento.idprofesional_no_medico = data[0].id_personal;
                            $scope.emergencia_tratamiento.nro_doc_profecional_no_medico = data[0].numero_documento;
                            $scope.emergencia_tratamiento.nombre_profesional_no_medico = data[0].apellido_paterno_personal + ' ' + data[0].apellido_materno_personal + ', ' + data[0].nombres_personal;
                        }
                    }
                }else {
                    swal("No Existe!", "Profesional no Registrado!", {
                        icon : "warning",
                        buttons: {
                            confirm: {
                                className : 'btn btn-warning'
                            }
                        },
                    });
                }
                $scope.estado_bus_acomp = 0;
            })
        }
    }

    $scope.seleccionUpsEmergencia = function (item) {
        if ($scope.estado_accion == 1){
            $scope.emergencia.idups = item.codups;
            $scope.emergencia.descripcion_ups = item.desupsesp;
        }else {
            if ($scope.estado_accion == 2){
                $scope.emergencia_tratamiento.idups = item.codups;
                $scope.emergencia_tratamiento.descripcion_ups = item.desupsesp;
            }
        }
        $scope.busqueda_texto_emerg = '';
        $("#seleccionarUpsEmergenciaModal").modal('hide');
    }

    $scope.buscarPersonaAcompanante = function () {
        if ($("#cmbTipo_doc_acomp").val() != ""){
            if ($("#nro_doc_acomp_txt").val() != ""){
                $scope.estado_bus_acomp = 1;
                personaService.buscarPersonaByTipo({tipo_busqueda: 2, nro_documento:$("#nro_doc_acomp_txt").val()}).success(function (data){
                    if (data.confirm == true) {
                        if (data.data.length > 0) {
                            //con datos
                            $scope.estado_encontrado_acomp = 2;
                            $scope.emergencia.nro_doc_acomp = data.data[0].nro_documento;
                            $scope.emergencia.nombre_acomp = data.data[0].apellido_paterno + ' ' + data.data[0].apellido_materno + ' ' + data.data[0].nombres;
                            $scope.estado_bus_acomp = 0;
                        } else {
                            //sin datos
                            if ($("#cmbTipo_doc_acomp").val() == 1) {
                                //buscamos en la reniec
                                $scope.estado_bus_acomp = 1;
                                $scope.estado_encontrado_acomp = 2;
                                accesorioService.consultarDNIRUCReniec({dni: $scope.emergencia.nro_doc_acomp}).success(function (data) {
                                    if (data.success == undefined || data.success == null) {
                                        $scope.emergencia.nro_doc_acomp = data.dni;
                                        $scope.emergencia.nombre_acomp = data.apellidoPaterno + ' ' + data.apellidoMaterno + ' ' + data.nombres;
                                    }
                                    $scope.estado_bus_acomp = 0;
                                });
                            }else {
                                $scope.estado_encontrado_acomp = 1;
                                $scope.estado_bus_acomp = 0;
                            }
                        }
                    }else {
                        if ($("#cmbTipo_doc_acomp").val() == 1) {
                            //buscamos en la reniec
                            $scope.estado_bus_acomp = 1;
                            accesorioService.consultarDNIRUCReniec({dni: $("#nro_doc_acomp_txt").val()}).success(function (data) {
                                if (data.success == undefined || data.success == null) {
                                    $scope.estado_encontrado_acomp = 2;
                                    $scope.emergencia.nro_doc_acomp = data.dni;
                                    $scope.emergencia.nombre_acomp = data.apellidoPaterno + ' ' + data.apellidoMaterno + ' ' + data.nombres;
                                }else {
                                    $scope.estado_encontrado_acomp = 1;
                                }
                                $scope.estado_bus_acomp = 0;
                            });
                        }
                    }
                });
            }
        }
    }

    $scope.focoCampoBuscar = function (id) {
        $timeout(function () {
            $("#"+id).focus();
            $('input[name="busqueda_texto_emerg"]').focus();
        }, 100);
    }

    //pasar del Diagnostico al Procedimiento
    $scope.pasarAlProcedimiento = function () {
        $("#pills-diagnostico-tab").removeClass('active');
        $("#pills-diagnostico").removeClass('show active');
        $("#pills-profile-tab").addClass('active');
        $("#pills-procedimientos").addClass('show active');
        $timeout(function () {
            $scope.estado_paso = 2;
        }, 0);
    }

    //regresar del Procedimiento al Diagnostico
    $scope.regresarAlDiagnostico = function () {
        $("#pills-profile-tab").removeClass('active');
        $("#pills-procedimientos").removeClass('show active');
        $("#pills-diagnostico-tab").addClass('active');
        $("#pills-diagnostico").addClass('show active');
        $timeout(function () {
            $scope.estado_paso = 1;
        }, 0);
    }

    //GUARDAR EMERGENCIA
    $scope.guardar = function () {
        var valid = validar_campo(['#cmbTipo_actividad','#cmbIdmotivo_atencion','#cmbTipo_edad','#cmbSexo','#cmbTipo_documento','#descripcion_dx1_txt','#codigo_dx1_txt','#cmbArea_atencion', '#nombre_profesional_emergencia_txt', '#nro_documento_profesional', '#descripcion_upstxt', '#idupstxt', '#nombre_est_emergenciatxt', '#nombre_profesional_no_medico_emergencia_txt']);
        if (valid){
            emergenciaService.guardarUpdateEmergencia($scope.emergencia).success(function (data) {
                if (data.confirm == true){
                    swal("Exito!", "" + data.message, {
                        icon : "success",
                        buttons: {
                            confirm: {
                                className : 'btn btn-success'
                            }
                        },
                    });
                    $scope.salirRegistro();
                    $scope.listar();
                }else {
                    //error de registro
                    swal("Error!", "" + data.message, {
                        icon : "error",
                        buttons: {
                            confirm: {
                                className : 'btn btn-danger'
                            }
                        },
                    });
                }
            })
        }else {
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
    //FIN DE GUARDAR EMERGENCIA

    $scope.eliminarEmergencia = function (item) {
        swal({
            title: 'Desea Eliminar?',
            text: "Se eliminará la emergencia del paciente " + item.nombres,
            icon : "warning",
            type: 'warning',
            buttons:{
                confirm: {
                    text : 'Eliminar',
                    className : 'btn btn-warning'
                },cancel: {
                    visible: true,
                    text : 'Cancelar',
                    className: 'btn btn-danger'
                }
            }
        }).then(function(willDelete) {
            if (willDelete) {
                //registramos los datos
                emergenciaService.eliminarEmergencia({idemergencia: item.idemergencia}).success(function (data) {
                    if (data.confirm == true){
                        $scope.listar();
                        swal("Exito!", "" + data.message, {
                            icon : "success",
                            buttons: {
                                confirm: {
                                    className : 'btn btn-success'
                                }
                            },
                        });
                    }
                })
            } else {
                //
            }
        });

    }

    $scope.validarHora = function (id) {
        var hora = validar_hora(id);
        if (hora == false){
            $scope.emergencia.hora_atencion = null;
            $.notify({
                icon: 'flaticon-alarm-1',
                title: 'Alerta',
                message: 'Hora Inválida',
            },{
                type: 'danger',
                placement: {
                    from: "bottom",
                    align: "right"
                },
                time: 100,
            });
        }
    }

    $scope.validarHoraSalida = function (id) {
        var hora = validar_hora(id);
        if (hora == false){
            $scope.emergencia.hora_salida = '';
            $.notify({
                icon: 'flaticon-alarm-1',
                title: 'Alerta',
                message: 'Hora de Salida Inválida',
            },{
                type: 'danger',
                placement: {
                    from: "bottom",
                    align: "right"
                },
                time: 100,
            });
        }
    }

    $scope.validarEdad = function () {
        if ($scope.emergencia.edad != undefined){
            if ($scope.emergencia.edad != "" ){
                var valid = validar_edad($scope.emergencia.edad, $scope.emergencia.tipo_edad);
                if (valid != true){
                    $scope.emergencia.edad = null;
                    $.notify({
                        icon: 'flaticon-alarm-1',
                        title: 'Alerta',
                        message: 'Edad Inválida, ingresa una edad válida',
                    },{
                        type: 'danger',
                        placement: {
                            from: "bottom",
                            align: "right"
                        },
                        time: 100,
                    });
                }
            }
        }
    }

    $scope.cambiarTipoEdad = function () {
        if($("#cmbTipo_edad").val() == ""){
            $scope.emergencia.tipo_edad = '';
        }
        $scope.emergencia.edad = null;
    }

    $scope.calcularPresionArterialMedia = function () {
        if ($("#presion_sistolica_txt").val().trim() != "" && $("#presion_diastolica_txt").val().trim() != ""){
            var band1 = false;
            var band2 = false;
            if (parseInt($("#presion_sistolica_txt").val().trim()) > 19 && parseInt($("#presion_sistolica_txt").val().trim()) < 301){
                band1 = true;
                document.getElementById('presion_sistolica_error_span').style.display = 'none';
            }else {
                band2 = false;
            }
            if (parseInt($("#presion_diastolica_txt").val().trim()) > 19 && parseInt($("#presion_diastolica_txt").val().trim()) < 301){
                band2 = true;
                document.getElementById('presion_diastolica_txt_error_span').style.display = 'none';
            }else {
                band2 = false;
            }
            if (band1==true && band2 == true){
                $scope.emergencia.presion_arterial_media = round(((parseInt($scope.emergencia.presion_sistolica) + (parseInt($scope.emergencia.presion_diastolica) * 2))/3),1);
            }else {
                $scope.emergencia.presion_arterial_media = null;
            }
        }else {
            $scope.emergencia.presion_arterial_media = null;
        }
    }

    $scope.validarPresionSistolica = function () {
        validar_valores_msj(20, 300, 2, 'presion_sistolica_txt', 'presion_sistolica_error_span', 'Valor Mínimo es de 20', 'Valor Máximo es de 300');
    }

    $scope.validarPresionDiastolica = function () {
        validar_valores_msj(20, 300, 2, 'presion_diastolica_txt', 'presion_diastolica_txt_error_span', 'Valor Mínimo es de 20', 'Valor Máximo es de 300');
    }

    $scope.validarSaturacionOxigeno = function () {
        validar_valores_msj(1, 99, 1, 'saturacion_oxigeno_txt', 'saturacion_oxigeno_error_span', 'Valor Mínimo es de 1', 'Valor Máximo es de 99');
    }

    $scope.validarFrecuenciaCardiaca = function () {
        validar_valores_msj(20, 200, 2, 'frecuencia_cardiaca_txt', 'frecuencia_cardiaca_error_span', 'Valor Mínimo es de 20', 'Valor Máximo es de 200');
    }

    $scope.validarFrecuenciaRespiratoria = function () {
        validar_valores_msj(10, 50, 1, 'frecuencia_respiratoria_txt', 'frecuencia_respiratoria_error_span', 'Valor Mínimo es de 10', 'Valor Máximo es de 50');
    }

    $scope.validarTemperatura = function () {
        validar_valores_msj(30, 50, 1, 'temperatura_txt', 'temperatura_error_span', 'Valor Mínimo es de 30', 'Valor Máximo es de 50');
    }

    $scope.seleccionMedicamento = function (item) {
        if ($scope.estado_accion == 1){
            $scope.emergencia.detalle_medicamento.push({id:null, idmedicamento: item.idmedicamento, descripcion: item.descripcion, cantidad: 1});
            $("#seleccionarMedicamentoModal").modal('hide');
        }else {
            if ($scope.estado_accion == 2){
                $scope.emergencia_tratamiento.detalle_medicamento.push({id:null, idmedicamento: item.idmedicamento, descripcion: item.descripcion, cantidad: 1});
                $("#seleccionarMedicamentoModal").modal('hide');
            }
        }
        $scope.buscar_medicamento_texto = '';
    }

    $scope.quitarMedicamento = function (index) {
        $scope.emergencia.detalle_medicamento.splice(index, 1);
    }

    $scope.prepararEditarEmergencia = function (item) {
        $scope.estado_registro = 2;
        $scope.estado_accion = 1;
        $scope.estado_encontrado_acomp = 2;
        $scope.emergencia = {detalle_medicamento:[]};
        $scope.emergencia = angular.copy(item);
        $scope.emergencia.detalle_medicamento = [];
        emergenciaService.getMedicamentobyId({idemergencia: item.idemergencia}).success(function (data) {
            $scope.emergencia.detalle_medicamento = data;
        });
        emergenciaService.getActividadHisEmergencia({idemergencia: item.idemergencia}).success(function (data) {
            if (data.length > 0){
                $scope.emergencia.condicion_establecimiento = data[0].condicion_establecimiento;
                $scope.emergencia.condicion_servicio = data[0].condicion_servicio;
            }
        });
        emergenciaService.getDetalleHisEmergencia({idemergencia: item.idemergencia}).success(function (data) {
            $scope.emergencia.detalle_his = data;
        });
        $timeout(function () {
            $("#cmbTipo_documento").val(item.tipo_documento).change();
        }, 0);
        /*$timeout(function () {
         $("#cmbCod_2000").val("").change();
         }, 0);*/
        $timeout(function () {
            $("#cmbIdFinanciador").val(item.idfinanciador!=undefined?item.idfinanciador:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbSexo").val(item.sexo!=undefined?item.sexo:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbIdEtnia").val(item.idetnia!=undefined?item.idetnia:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbTipo_edad").val(item.tipo_edad!=undefined?item.tipo_edad:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbIdUbigeo").val(item.idubigeo!=undefined?item.idubigeo:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbTipo_doc_acomp").val(item.tipo_doc_acomp!=undefined?item.tipo_doc_acomp:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbIdmotivo_atencion").val(item.idmotivo_atencion!=undefined?item.idmotivo_atencion:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbIdubigeo_lugar_ocurrencia").val(item.idubigeo_lugar_ocurrencia!=undefined?item.idubigeo_lugar_ocurrencia:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbTipo_actividad").val(item.tipo_actividad!=undefined?item.tipo_actividad:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbIdCondicion_salida").val(item.idcondicion_salida!=undefined?item.idcondicion_salida:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbIdDestino").val(item.iddestino!=undefined?item.iddestino:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbCod_2000_referencia").val(item.cod_2000_referencia!=undefined?item.cod_2000_referencia:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbArea_atencion").val(item.area_atencion!=undefined?item.area_atencion:"").change();
        }, 0);
    }

    $scope.validarNroDocumentoBuscar = function () {
        validar_length(8, 12, 'nro_documento_buscartxt', 'nro_documento_buscar_span', '', '');
    }

    $scope.buscarPacienteByDNI = function () {
        var valid = validar_length(8, 12, 'nro_documento_buscartxt', 'nro_documento_buscar_span', '', '');
        if (valid){
            emergenciaService.buscarEmergenciaByDNI({nro_documento: $scope.busqueda.nro_documento}).success(function (data) {
                $scope.lista = data;
            })
        }
    }

    $scope.prepararTratamiento = function (item) {
        $scope.estado_accion = 2;
        $scope.estado_accion2 = 2;
        $scope.estado_registro = 3;
        $scope.emergencia_tratamiento = item;
        $scope.emergencia_tratamiento.detalle_medicamento = [];
        $scope.emergencia_tratamiento.detalle_his = [];
        $timeout(function () {
            $("#cmbTipo_documentoTratamiento").val(item.tipo_documento).change();
        }, 0);
        $timeout(function () {
            $("#cmbSexoTratamiento").val(item.sexo!=undefined?item.sexo:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbIdEtniaTratamiento").val(item.idetnia!=undefined?item.idetnia:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbTipo_edadTratamiento").val(item.tipo_edad!=undefined?item.tipo_edad:"").change();
        }, 0);
        $timeout(function () {
            $("#cmbIdUbigeoTratamiento").val(item.idubigeo!=undefined?item.idubigeo:"").change();
        }, 0);
        $scope.emergencia_tratamiento.presion_sistolica = null;
        $scope.emergencia_tratamiento.presion_diastolica = null;
        $scope.emergencia_tratamiento.presion_arterial_media = null;
        $scope.emergencia_tratamiento.saturacion_oxigeno = null;
        $scope.emergencia_tratamiento.frecuencia_cardiaca = null;
        $scope.emergencia_tratamiento.frecuencia_respiratoria = null;
        $scope.emergencia_tratamiento.temperatura = null;
        $scope.emergencia_tratamiento.idups = null;
        $scope.emergencia_tratamiento.descripcion_ups = null;
        $scope.emergencia_tratamiento.profesional_atiende = 'ESTABLECIMIENTO';
        //$scope.emergencia_tratamiento.nro_doc_profecional = null;
        //$scope.emergencia_tratamiento.nombre_profesional = null;
        $scope.emergencia_tratamiento.fecha_atencion = null;
        $scope.emergencia_tratamiento.hora_atencion = null;
        $timeout(function () {
            $("#cmbArea_atencionTratamiento").val("").change();
        }, 0);
        if ($scope.usuario.idnivel > 4){
            $scope.emergencia_tratamiento.cod_2000 = $scope.usuario.cod_2000;
            $scope.emergencia_tratamiento.nom_est = $scope.usuario.nom_eess;
        }else {
            $scope.emergencia_tratamiento.cod_2000 = null;
            $scope.emergencia_tratamiento.nom_est = null;
        }
        var fecha = new Date();
        $scope.emergencia_tratamiento.fecha_atencion = ('0'+fecha.getDate()).toString().substr(-2)+'/'+('0'+(fecha.getMonth()+1)).toString().substr(-2)+'/'+fecha.getFullYear();
        $scope.emergencia_tratamiento.hora_atencion = ('0' + fecha.getHours()).toString().substr(-2) + ":" + ('0' + fecha.getMinutes()).toString().substr(-2);

        if ($scope.emergencia_tratamiento.codigo_dx1 != undefined){
            $scope.emergencia_tratamiento.tipo_diagnostico_dx1 = 'R';
            $scope.emergencia_tratamiento.detalle_his.push({id: null, descripcion_cie: $scope.emergencia_tratamiento.descripcion_dx1, tipo_diagnostico: $scope.emergencia_tratamiento.tipo_diagnostico_dx1, lab1: null, lab2: null, lab3: null, codigo_cie: $scope.emergencia_tratamiento.codigo_dx1, item: 1});
        }
        if ($scope.emergencia_tratamiento.dx2_si_no == 'SI'){
            $scope.emergencia_tratamiento.tipo_diagnostico_dx2 = 'R';
            $scope.emergencia_tratamiento.detalle_his.push({id: null, descripcion_cie: $scope.emergencia_tratamiento.descripcion_dx2, tipo_diagnostico: $scope.emergencia_tratamiento.tipo_diagnostico_dx2, lab1: null, lab2: null, lab3: null, codigo_cie: $scope.emergencia_tratamiento.codigo_dx2, item: 2});
        }
        if ($scope.emergencia_tratamiento.dx3_si_no == 'SI'){
            $scope.emergencia_tratamiento.tipo_diagnostico_dx3 = 'R';
            $scope.emergencia_tratamiento.detalle_his.push({id: null, descripcion_cie: $scope.emergencia_tratamiento.descripcion_dx3, tipo_diagnostico: $scope.emergencia_tratamiento.tipo_diagnostico_dx3, lab1: null, lab2: null, lab3: null, codigo_cie: $scope.emergencia_tratamiento.codigo_dx3, item: 3});
        }
        if ($scope.emergencia_tratamiento.dx4_si_no == 'SI'){
            $scope.emergencia_tratamiento.tipo_diagnostico_dx4 = 'R';
            $scope.emergencia_tratamiento.detalle_his.push({id: null, descripcion_cie: $scope.emergencia_tratamiento.descripcion_dx4, tipo_diagnostico: $scope.emergencia_tratamiento.tipo_diagnostico_dx4, lab1: null, lab2: null, lab3: null, codigo_cie: $scope.emergencia_tratamiento.codigo_dx4, item: 4});
        }

        emergenciaService.getNumeroTratamiento({idemergencia: item.idemergencia}).success(function (data) {
            $scope.emergencia_tratamiento.nro_tratamiento = data.numero;
        });

        if ($scope.emergencia_tratamiento.proc1_si_no == 'SI'){
            emergenciaService.getNumeroTratamientoProcedimiento({idemergencia: item.idemergencia, procedimiento: 1, codigo_ciex: $scope.emergencia_tratamiento.codigo_proc_1}).success(function (data) {
                $scope.emergencia_tratamiento.lab_p1_1 = data.numero;
                $scope.emergencia_tratamiento.detalle_his.push({id: null, descripcion_cie: $scope.emergencia_tratamiento.descripcion_proc_1, tipo_diagnostico: 'D', lab1: $scope.emergencia_tratamiento.lab_p1_1, lab2: $scope.emergencia_tratamiento.lab_p1_2, lab3: $scope.emergencia_tratamiento.lab_p1_3, codigo_cie: $scope.emergencia_tratamiento.codigo_proc_1, item: 5});
            })
        }

        if ($scope.emergencia_tratamiento.proc2_si_no == 'SI'){
            emergenciaService.getNumeroTratamientoProcedimiento({idemergencia: item.idemergencia, procedimiento: 2, codigo_ciex: $scope.emergencia_tratamiento.codigo_proc_1}).success(function (data) {
                $scope.emergencia_tratamiento.lab_p2_1 = data.numero;
                $scope.emergencia_tratamiento.detalle_his.push({id: null, descripcion_cie: $scope.emergencia_tratamiento.descripcion_proc_2, tipo_diagnostico: 'D', lab1: $scope.emergencia_tratamiento.lab_p2_1, lab2: $scope.emergencia_tratamiento.lab_p2_2, lab3: $scope.emergencia_tratamiento.lab_p2_3, codigo_cie: $scope.emergencia_tratamiento.codigo_proc_2, item: 6});
            })
        }

        if ($scope.emergencia_tratamiento.proc3_si_no == 'SI'){
            emergenciaService.getNumeroTratamientoProcedimiento({idemergencia: item.idemergencia, procedimiento: 3, codigo_ciex: $scope.emergencia_tratamiento.codigo_proc_1}).success(function (data) {
                $scope.emergencia_tratamiento.lab_p3_1 = data.numero;
                $scope.emergencia_tratamiento.detalle_his.push({id: null, descripcion_cie: $scope.emergencia_tratamiento.descripcion_proc_3, tipo_diagnostico: 'D', lab1: $scope.emergencia_tratamiento.lab_p3_1, lab2: $scope.emergencia_tratamiento.lab_p3_2, lab3: $scope.emergencia_tratamiento.lab_p3_3, codigo_cie: $scope.emergencia_tratamiento.codigo_proc_3, item: 7});
            })
        }

        if ($scope.emergencia_tratamiento.proc4_si_no == 'SI'){
            emergenciaService.getNumeroTratamientoProcedimiento({idemergencia: item.idemergencia, procedimiento: 4, codigo_ciex: $scope.emergencia_tratamiento.codigo_proc_1}).success(function (data) {
                $scope.emergencia_tratamiento.lab_p4_1 = data.numero;
                $scope.emergencia_tratamiento.detalle_his.push({id: null, descripcion_cie: $scope.emergencia_tratamiento.descripcion_proc_4, tipo_diagnostico: 'D', lab1: $scope.emergencia_tratamiento.lab_p4_1, lab2: $scope.emergencia_tratamiento.lab_p4_2, lab3: $scope.emergencia_tratamiento.lab_p4_3, codigo_cie: $scope.emergencia_tratamiento.codigo_proc_4, item: 8});
            })
        }

        $scope.emergencia_tratamiento.condicion_establecimiento = 'C';
        $scope.emergencia_tratamiento.condicion_servicio = 'C';
    }

    $scope.numeroProcedimientoNuevo = function (codigo, procedimiento) {
        emergenciaService.getNumeroTratamientoProcedimientoNuevo({idemergencia: $scope.emergencia_tratamiento.idemergencia, procedimiento: procedimiento, codigo_ciex: codigo}).success(function (data) {
            if (procedimiento == 1){
                $scope.emergencia_tratamiento.lab_p1_1 = data.numero;
            }else {
                if (procedimiento == 2){
                    $scope.emergencia_tratamiento.lab_p2_1 = data.numero;
                }else {
                    if (procedimiento == 3){
                        $scope.emergencia_tratamiento.lab_p3_1 = data.numero;
                    }else {
                        if (procedimiento == 4){
                            $scope.emergencia_tratamiento.lab_p4_1 = data.numero;
                        }
                    }
                }
            }
        });
    }

    $scope.salirRegistroTratamiento = function () {
        //$scope.listar();
        $scope.salirRegistro();
        $scope.estado_accion = 1;
        $scope.estado_accion2 = 1;
        $scope.emergencia_tratamiento = {};
    }

    $scope.guardarTratamiento = function () {
        var valid = validar_campo(['#nom_est_tratamiento_txt','#nombre_profesional_txt','#nro_tratamiento_txt','#fecha_atencion_tratamiento_txt','#hora_atencion_tratamiento_txt','#cmbArea_atencionTratamiento','#descripcion_upsTratamiento_txt', '#nombre_profesional_no_medico_tratamiento_txt']);
        if (valid){
            emergenciaService.guardarTratamientoEmergencia($scope.emergencia_tratamiento).success(function (data) {
                if (data.confirm == true){
                    swal("Exito!", "" + data.message, {
                        icon : "success",
                        buttons: {
                            confirm: {
                                className : 'btn btn-success'
                            }
                        },
                    });
                    $scope.salirRegistroTratamiento();
                    $scope.listar();
                }else {
                    //error de registro
                    swal("Error!", "" + data.message, {
                        icon : "error",
                        buttons: {
                            confirm: {
                                className : 'btn btn-danger'
                            }
                        },
                    });
                }
            })
        }else {
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

    /**
     * AUTOCOMPLETAR DE PROCEDIMIENTOS
     */

        // Fetch data
    $scope.fetchCIEXProcTratamiento = function(item){
        var searchText_len = 0;
        var searchText = '';
        if (item == 1){
            searchText_len = $scope.emergencia_tratamiento.descripcion_proc_1.trim().length;
            searchText = $scope.emergencia_tratamiento.descripcion_proc_1;
        }else {
            if (item == 2){
                searchText_len = $scope.emergencia_tratamiento.descripcion_proc_2.trim().length;
                searchText = $scope.emergencia_tratamiento.descripcion_proc_2;
            }else {
                if (item == 3){
                    searchText_len = $scope.emergencia_tratamiento.descripcion_proc_3.trim().length;
                    searchText = $scope.emergencia_tratamiento.descripcion_proc_3;
                }else {
                    if (item == 4){
                        searchText_len = $scope.emergencia_tratamiento.descripcion_proc_4.trim().length;
                        searchText = $scope.emergencia_tratamiento.descripcion_proc_4;
                    }
                }
            }
        }

        // Check search text length
        if(searchText_len > 0){
            accesorioService.filtrarCIEX({texto: searchText}).success(function (data) {
                if (item == 1){
                    $scope.searchResult_tratamiento_Proc_1 = data;
                }else {
                    if (item == 2){
                        $scope.searchResult_tratamiento_Proc_2 = data;
                    }else {
                        if (item == 3){
                            $scope.searchResult_tratamiento_Proc_3 = data;
                        }else {
                            if (item == 4){
                                $scope.searchResult_tratamiento_Proc_4 = data;
                            }
                        }
                    }
                }

            });
        }else{
            if (item == 1){
                $scope.emergencia_tratamiento.codigo_proc_1 = null;
                $scope.searchResult_tratamiento_Proc_1 = {};
            }else {
                if (item == 2){
                    $scope.emergencia_tratamiento.codigo_proc_2 = null;
                    $scope.searchResult_tratamiento_Proc_2 = {};
                }else {
                    if (item == 3){
                        $scope.emergencia_tratamiento.codigo_proc_3 = null;
                        $scope.searchResult_tratamiento_Proc_3 = {};
                    }else {
                        if (item == 4){
                            $scope.emergencia_tratamiento.codigo_proc_4 = null;
                            $scope.searchResult_tratamiento_Proc_4 = {};
                        }
                    }
                }
            }
        }

    }

    // Set value to search box
    $scope.setValueProcTratamiento = function(index, item, $event){
        //console.debug($scope.contrareferencia.diagnosticos[index]);
        if (item == 1){
            $scope.emergencia_tratamiento.descripcion_proc_1 = $scope.searchResult_tratamiento_Proc_1[index].descripcion_cie;
            $scope.emergencia_tratamiento.codigo_proc_1 = $scope.searchResult_tratamiento_Proc_1[index].codigo_cie;
            $scope.searchResult_tratamiento_Proc_1 = {};
        }else {
            if (item == 2){
                $scope.emergencia_tratamiento.descripcion_proc_2 = $scope.searchResult_tratamiento_Proc_2[index].descripcion_cie;
                $scope.emergencia_tratamiento.codigo_proc_2 = $scope.searchResult_tratamiento_Proc_2[index].codigo_cie;
                $scope.searchResult_tratamiento_Proc_2 = {};
            }else {
                if (item == 3){
                    $scope.emergencia_tratamiento.descripcion_proc_3 = $scope.searchResult_tratamiento_Proc_3[index].descripcion_cie;
                    $scope.emergencia_tratamiento.codigo_proc_3 = $scope.searchResult_tratamiento_Proc_3[index].codigo_cie;
                    $scope.searchResult_tratamiento_Proc_3 = {};
                }else {
                    if (item == 4){
                        $scope.emergencia_tratamiento.descripcion_proc_4 = $scope.searchResult_Proc_4[index].descripcion_cie;
                        $scope.emergencia_tratamiento.codigo_proc_4 = $scope.searchResult_tratamiento_Proc_4[index].codigo_cie;
                        $scope.searchResult_tratamiento_Proc_4 = {};
                    }
                }
            }
        }

        $event.stopPropagation();
    }

    $scope.searchboxClickedProcTratamiento = function($event){
        $event.stopPropagation();
    }

    $scope.containerClickedProcTratamiento = function(item){
        if (item == 1){
            $scope.searchResult_tratamiento_Proc_1 = {};
        }else {
            if (item == 2){
                $scope.searchResult_tratamiento_Proc_2 = {};
            }else {
                if (item == 3){
                    $scope.searchResult_tratamiento_Proc_3 = {};
                }else {
                    if (item == 4){
                        $scope.searchResult_tratamiento_Proc_4 = {};
                    }
                }
            }
        }
    }

    //FIN DE AUTOCOMPLETAR PROCEDIMIENTOS

    //METODOS PARA ACTIVIDADES HIS
    $scope.addDiagnosticoEmergenciaHis = function (index, item) {
        var tipo_diagnostico = "";
        var lab1 = null;
        if (index == 1){
            tipo_diagnostico = $scope.emergencia.tipo_diagnostico_dx1;
        }else {
            if (index == 2){
                tipo_diagnostico = $scope.emergencia.tipo_diagnostico_dx2;
            }else {
                if (index == 3){
                    tipo_diagnostico = $scope.emergencia.tipo_diagnostico_dx3;
                }else {
                    if (index == 4){
                        tipo_diagnostico = $scope.emergencia.tipo_diagnostico_dx4;
                    }else {
                        if (index > 4){
                            tipo_diagnostico = 'D';
                            lab1 = 1;
                        }
                    }
                }
            }
        }
        if ($scope.emergencia.detalle_his.length > 0){
            var encontrado = false;
            for (var i = 0; i < $scope.emergencia.detalle_his.length; i++){
                if ($scope.emergencia.detalle_his[i].codigo_cie == item.codigo_cie){
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado){
                $scope.emergencia.detalle_his.push({id:null, codigo_cie: item.codigo_cie, descripcion_cie: item.descripcion_cie, tipo_diagnostico: tipo_diagnostico, lab1: lab1, lab2: null, lab3: null, item: index});
            }
        }else {
            $scope.emergencia.detalle_his.push({id:null, codigo_cie: item.codigo_cie, descripcion_cie: item.descripcion_cie, tipo_diagnostico: tipo_diagnostico, lab1: lab1, lab2: null, lab3: null, item: index});
        }
    }

    $scope.modificarTipoDiagnosticoEmergenciaHIS = function (index) {
        var tipo_diagnostico = "";
        if (index == 1){
            tipo_diagnostico = $scope.emergencia.tipo_diagnostico_dx1;
        }else {
            if (index == 2){
                tipo_diagnostico = $scope.emergencia.tipo_diagnostico_dx2;
            }else {
                if (index == 3){
                    tipo_diagnostico = $scope.emergencia.tipo_diagnostico_dx3;
                }else {
                    if (index == 4){
                        tipo_diagnostico = $scope.emergencia.tipo_diagnostico_dx4;
                    }else {
                        tipo_diagnostico = 'D';
                    }
                }
            }
        }
        if ($scope.emergencia.detalle_his.length > 0){
            for (var i = 0; i < $scope.emergencia.detalle_his.length; i++){
                if ($scope.emergencia.detalle_his[i].item == index){
                    $scope.emergencia.detalle_his[i].tipo_diagnostico = tipo_diagnostico;
                    break;
                }
            }
        }
    }

    $scope.limpiarActividadEmergenciaHIS = function (index) {
        if ($scope.emergencia.detalle_his.length > 0){
            for (var i = 0; i < $scope.emergencia.detalle_his.length; i++){
                if ($scope.emergencia.detalle_his[i].item == index){
                    console.log(i);
                    $scope.emergencia.detalle_his.splice(i, 1);
                }
            }
        }
    }

    //METODOS PARA ACTIVIDAD HIS TRATAMIENTO
    $scope.addDiagnosticoEmergenciaTratamientoHis = function (index, item) {
        var tipo_diagnostico = "";
        var lab1 = null;
        if (index == 1){
            tipo_diagnostico = $scope.emergencia_tratamiento.tipo_diagnostico_dx1;
        }else {
            if (index == 2){
                tipo_diagnostico = $scope.emergencia_tratamiento.tipo_diagnostico_dx2;
            }else {
                if (index == 3){
                    tipo_diagnostico = $scope.emergencia_tratamiento.tipo_diagnostico_dx3;
                }else {
                    if (index == 4){
                        tipo_diagnostico = $scope.emergencia_tratamiento.tipo_diagnostico_dx4;
                    }else {
                        if (index > 4){
                            tipo_diagnostico = 'D';
                            lab1 = 1;
                        }
                    }
                }
            }
        }
        if ($scope.emergencia_tratamiento.detalle_his.length > 0){
            var encontrado = false;
            for (var i = 0; i < $scope.emergencia_tratamiento.detalle_his.length; i++){
                if ($scope.emergencia_tratamiento.detalle_his[i].codigo_cie == item.codigo_cie){
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado){
                $scope.emergencia_tratamiento.detalle_his.push({id:null, codigo_cie: item.codigo_cie, descripcion_cie: item.descripcion_cie, tipo_diagnostico: tipo_diagnostico, lab1: lab1, lab2: null, lab3: null, item: index});
            }
        }else {
            $scope.emergencia_tratamiento.detalle_his.push({id:null, codigo_cie: item.codigo_cie, descripcion_cie: item.descripcion_cie, tipo_diagnostico: tipo_diagnostico, lab1: lab1, lab2: null, lab3: null, item: index});
        }
    }

    $scope.modificarTipoDiagnosticoEmergenciaTratamientoHIS = function (index) {
        var tipo_diagnostico = "";
        if (index == 1){
            tipo_diagnostico = $scope.emergencia_tratamiento.tipo_diagnostico_dx1;
        }else {
            if (index == 2){
                tipo_diagnostico = $scope.emergencia_tratamiento.tipo_diagnostico_dx2;
            }else {
                if (index == 3){
                    tipo_diagnostico = $scope.emergencia_tratamiento.tipo_diagnostico_dx3;
                }else {
                    if (index == 4){
                        tipo_diagnostico = $scope.emergencia_tratamiento.tipo_diagnostico_dx4;
                    }else {
                        tipo_diagnostico = 'D';
                    }
                }
            }
        }
        if ($scope.emergencia_tratamiento.detalle_his.length > 0){
            for (var i = 0; i < $scope.emergencia_tratamiento.detalle_his.length; i++){
                if ($scope.emergencia_tratamiento.detalle_his[i].item == index){
                    $scope.emergencia_tratamiento.detalle_his[i].tipo_diagnostico = tipo_diagnostico;
                    break;
                }
            }
        }
    }

    $scope.modificarLabProc_his = function (index) {
        var lab1 = "";
        var lab2 = "";
        var lab3 = "";
        if (index == 5){
            lab1 = $scope.emergencia_tratamiento.lab_p1_1;
            lab2 = $scope.emergencia_tratamiento.lab_p1_2;
            lab3 = $scope.emergencia_tratamiento.lab_p1_3;
        }else {
            if (index == 6){
                lab1 = $scope.emergencia_tratamiento.lab_p2_1;
                lab2 = $scope.emergencia_tratamiento.lab_p2_2;
                lab3 = $scope.emergencia_tratamiento.lab_p2_3;
            }else {
                if (index == 7){
                    lab1 = $scope.emergencia_tratamiento.lab_p3_1;
                    lab2 = $scope.emergencia_tratamiento.lab_p3_2;
                    lab3 = $scope.emergencia_tratamiento.lab_p3_3;
                }else {
                    if (index == 8){
                        lab1 = $scope.emergencia_tratamiento.lab_p4_1;
                        lab2 = $scope.emergencia_tratamiento.lab_p4_2;
                        lab3 = $scope.emergencia_tratamiento.lab_p4_3;
                    }
                }
            }
        }

        if ($scope.emergencia_tratamiento.detalle_his.length > 0){
            for (var i = 0; i < $scope.emergencia_tratamiento.detalle_his.length; i++){
                if ($scope.emergencia_tratamiento.detalle_his[i].item == index){
                    $scope.emergencia_tratamiento.detalle_his[i].lab1 = lab1;
                    $scope.emergencia_tratamiento.detalle_his[i].lab2 = lab2;
                    $scope.emergencia_tratamiento.detalle_his[i].lab3 = lab3;
                    break;
                }
            }
        }
    }

    $scope.limpiarActividadEmergenciaTratamientoHIS = function (index) {
        if ($scope.emergencia_tratamiento.detalle_his.length > 0){
            for (var i = 0; i < $scope.emergencia_tratamiento.detalle_his.length; i++){
                if ($scope.emergencia_tratamiento.detalle_his[i].item == index){
                    console.log(i);
                    $scope.emergencia_tratamiento.detalle_his.splice(i, 1);
                }
            }
        }
    }

    $scope.elementos.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withLanguage({
        "sEmptyTable": "No hay Datos Disponibles",
        "sInfo": "Mostrando _START_ hasta _END_ de _TOTAL_ Filas",
        "sInfoEmpty": "Viendo 0 hasta 0 de 0 filas",
        "sInfoFiltered": "(filtrado de _MAX_ Filas)",
        "sInfoPostFix": "",
        "sInfoThousands": ",",
        "sLengthMenu": "Ver _MENU_ Filas",
        "sLoadingRecords": "Cargando...",
        "sProcessing": "Procesando...",
        "sSearch": "Buscar:",
        "sZeroRecords": "No se encontraron registros",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Ultimo",
            "sNext": ">>",
            "sPrevious": "<<"
        },
        "oAria": {
            "sSortAscending": ": activado para ordenar columna ascendente",
            "sSortDescending": ": activado para ordenar columna descendente"
        }
    }).withOption('order', [0, 'asc'])
        .withOption('lengthMenu',[[10,50,100],[10,50,100]])
        .withOption('processing', true);

    $scope.redrawDT = function(){
        $scope.$emit('event:dataTableLoaded');
    }

    $scope.$on("event:dataTableLoaded", function(event, loadedDT) {
        $scope.dtInstance.DataTable.draw();
    });

    //INICIAR FUNCIONES
    $scope.listarProfesionalByEESS();
    $scope.listarProfesionalNoMedicoByEESS();
    $timeout(function () {
        $scope.listar();
    }, 200);
    //$scope.pruebaconexion();

});

