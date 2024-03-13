/**
 * Created by user on 22/04/2021.
 */
app.controller('profesionalesController', function ($scope, $timeout, DTOptionsBuilder, accesorioService, personaService, profesionalService){

    $scope.dtInstance = {};
    $scope.elementos = {lista:[]};
    $scope.usuario = {};

    $scope.lista = [];
    $scope.personas = [];
    $scope.lista_profesiones = [];
    $scope.lista_etnias = [];
    $scope.lista_establecimientos = [];
    $scope.lista_ubigeos = [];
    $scope.lista_redes = [];
    $scope.lista_microredes = [];
    $scope.lista_eess = [];

    $scope.filtros = {redes:[],microredes:[]};

    $scope.estado_registro = 0;
    $scope.estado_busqueda = 0;
    $scope.busqueda = {};
    $scope.buscar = {};
    $scope.buscar.ocultar_btn_registrar = 0;

    $scope.registro = {};
    $scope.registro_usuario = {};
    $scope.registro_usuario.acceso = 0;

    accesorioService.getDatosUsuario({}).success(function (data) {
        $scope.usuario = data;
        if ($scope.usuario.idnivel == 1 || $scope.usuario.idnivel == 2){
            $scope.listarRedesbyDisa();
        }else {
            if ($scope.usuario.idnivel == 3){
                accesorioService.listarMicroRedes({codigo_disa: '34', codigo_red: $scope.usuario.codigo_red}).success(function (data) {
                    $scope.lista_microredes = data;
                });
            }else {
                if ($scope.usuario.idnivel == 4){
                    accesorioService.listarEstablecimientos({codigo_disa:'34', codigo_red: $scope.usuario.codigo_red, codigo_microred: $scope.usuario.codigo_microred}).success(function (data) {
                        $scope.filtros.eess = data;
                    })
                }else {
                    $scope.listar();
                }
            }
        }
    });

    accesorioService.listarProfesion({}).success(function (data) {
        $scope.lista_profesiones = data;
    });

    accesorioService.listarEtnias({}).success(function (data) {
        $scope.lista_etnias = data;
    });

    accesorioService.listarUbigeo({codigo_departamento: '25'}).success(function (data) {
        $scope.lista_ubigeos = data;
    });

    accesorioService.listarEstablecimientos({codigo_disa: '34'}).success(function (data) {
        $scope.lista_establecimientos = data;
    });

    accesorioService.listarRedes({codigo_disa: '34'}).success(function (data) {
        $scope.lista_redes = data;
    });

    $scope.listarMicroRedByRed = function () {
        if ($("#cmbRed_usuario").val() != ""){
            accesorioService.listarMicroRedes({codigo_disa: '34', codigo_red:$("#cmbRed_usuario").val()}).success(function (data) {
                $scope.lista_microredes = data;
            });
        }
    }

    $scope.listarRedesbyDisa = function () {
        accesorioService.listarRedes({codigo_disa: '34'}).success(function (data) {
            $scope.filtros.redes = data;
        });
    }

    $scope.buscarFiltroMicroRed = function () {
        if ($("#cmbFiltroRed").val() != ""){
            accesorioService.listarMicroRedes({codigo_disa: '34', codigo_red:$("#cmbFiltroRed").val()}).success(function (data) {
                $scope.filtros.microredes = data;
            });
        }
    }

    $scope.buscarFiltroEstablecimiento = function () {
        if ($("#cmbFiltroMicrored").val() != ""){
            accesorioService.listarEstablecimientos({codigo_disa:'34', codigo_red:$("#cmbFiltroRed").val(), codigo_microred: $("#cmbFiltroMicrored").val()}).success(function (data) {
                $scope.filtros.eess = data;
            })
        }
    }

    $scope.listarEstablecimientosByNivel = function () {
        if ($("#cmbNivel_usuario").val() != ""){
            if ($scope.registro_usuario.idnivel != 6){
                if ($scope.registro_usuario.idnivel != 7){
                    if ($("#cmbMicroRed_usuario").val() != ""){
                        accesorioService.listarEstablecimientos({codigo_disa: '34', codigo_red: $("#cmbRed_usuario").val(), codigo_microred: $("#cmbMicroRed_usuario").val()}).success(function (data) {
                            $scope.lista_eess = data;
                        });
                    }
                }else {
                    if ($scope.registro_usuario.idnivel == 7){
                        accesorioService.listarEstablecimientos({codigo_disa: '34'}).success(function (data) {
                            $scope.lista_eess = data;
                        });
                    }
                }
            }else {
                if ($scope.registro_usuario.idnivel == 6){
                    accesorioService.listarEstablecimientos({codigo_disa: '34'}).success(function (data) {
                        $scope.lista_eess = data;
                    });
                }
            }
        }
    }

    $scope.limpiarEESS = function () {
        $timeout(function () {
            $("#cmbRed_usuario").val("").change();
        }, 0);

        $timeout(function () {
            $("#cmbMicroRed_usuario").val("").change();
        }, 0);

        $timeout(function () {
            $("#cmbEstablecimiento_usuario").val("").change();
        }, 0);
        $scope.lista_microredes = [];
        $scope.lista_eess = [];
    }

    $scope.nuevoAcceso = function () {
        $timeout(function () {
            $("#cmbNivel_usuario").val("").change();
        }, 0);
        $timeout(function () {
            $("#cmbRed_usuario").val("").change();
        }, 0);

        $timeout(function () {
            $("#cmbMicroRed_usuario").val("").change();
        }, 0);

        $timeout(function () {
            $("#cmbEstablecimiento_usuario").val("").change();
        }, 0);

        $scope.lista_microredes = [];
        $scope.lista_eess = [];
        $scope.registro_usuario.nick = $scope.registro_usuario.nro_documento;
        $scope.registro_usuario.password = $scope.registro_usuario.nro_documento;
    }

    $scope.listar = function () {
        if ($scope.filtroForm.$valid){
            $("#lista_bloqueoDiv").block({message: '<center><i class="flaticon-settings"> Espere....</i></center>'});
            profesionalService.getLista($scope.busqueda).success(function (data) {
                $scope.lista = data;
                $("#lista_bloqueoDiv").unblock();
            });
        }else {
            $.notify({
                icon: 'flaticon-alarm-1',
                title: 'Error',
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

    $scope.buscarDni = function (keyEvent) {
        if (keyEvent.which === 13){
            $scope.lista = [];
            $("#lista_bloqueoDiv").block({message: '<center><i class="flaticon-settings"> Espere....</i></center>'});
            profesionalService.getLista({nro_documento:$scope.busqueda.nro_documento}).success(function (data) {
                $scope.lista = data;
                $("#lista_bloqueoDiv").unblock();
            });
        }
    }

    $scope.nuevaBusqueda = function () {
        $scope.buscar = {};
        $timeout(function () {
            $("#cmbTipoDocumentoBuscar").val("").change();
        })
        $scope.estado_registro = 1;
        $scope.registro = {};
    }

    $scope.buscarPersona = function () {
        if ($("#cmbTipoDocumentoBuscar").val() != ""){
            $scope.buscar.tipo_busqueda = 1;
            personaService.buscarPersonaByTipo($scope.buscar).success(function (data) {
                if (data.confirm == true){
                    if (data.data.length > 0){
                        //con datos
                        $scope.estado_busqueda = 1; //encontrado en la base de datos del sistema
                        $scope.personas = data.data;
                    }else {
                        //sin datos
                        if ($("#cmbTipoDocumentoBuscar").val() == 1){
                            //buscamos en la reniec
                            accesorioService.consultarDNIRUCReniec({dni:$scope.buscar.nro_documento}).success(function (data) {
                                if (data.success == undefined || data.success == null){
                                    $scope.estado_busqueda = 2;
                                    $scope.personas.push({tipo_documento: 1, nro_documento: data.dni, nombres: data.nombres, apellido_paterno: data.apellidoPaterno, apellido_materno: data.apellidoMaterno})
                                    //console.debug(data.apellidoMaterno);
                                }else {
                                    if (data.success == false){
                                        swal({
                                            title: 'Desea Registrar al Profesional?',
                                            text: "No se Encontraron Registros con el numero de documento "+$scope.buscar.nro_documento,
                                            type: '',
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
                                                $scope.nuevoRegistro(1, null);
                                            } else {
                                                //
                                            }
                                        });
                                    }else {
                                        swal({
                                            title: 'Desea Registrar al Profesional?',
                                            text: "No se Encontraron Registros con el numero de documento "+$scope.buscar.nro_documento,
                                            type: '',
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
                                                $scope.nuevoRegistro(1, null);
                                            } else {
                                                //
                                            }
                                        });
                                    }
                                }
                            });
                        }else {
                            //mensaje para el registro manualmente todos los datos
                            swal({
                                title: 'Desea Registrar al Profesional?',
                                text: "No se Encontraron Registros con el numero de documento "+$scope.buscar.nro_documento,
                                type: '',
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
                                    $scope.nuevoRegistro(1, null);
                                } else {
                                    //
                                }
                            });
                        }
                    }
                }else {
                    //mensaje de error
                    swal("Error!", "Falló Interno por problemas de conectividad!", {
                        icon : "error",
                        buttons: {
                            confirm: {
                                text : 'Entendido',
                                className : 'btn btn-danger'
                            }
                        },
                    });
                }
            })
        }


    }

    $scope.nuevoRegistro = function (opcion, item) {
        $scope.estado_registro = 2;
        $scope.registro = {};
        if (opcion == 1){
            $timeout(function () {
                $("#cmbTipoDocumento").val($scope.buscar.tipo_documento).change();
                if ($("#cmbTipoDocumento").val() == 5){
                    //Persona sin documento
                    personaService.generarCodigoSinDocumento({}).success(function (data) {
                        $scope.registro.nro_documento = data;
                    });
                }else {
                    if ($("#cmbTipoDocumento").val() != ""){
                        $scope.registro.nro_documento = $scope.buscar.nro_documento;
                    }
                }
            }, 0);
            $timeout(function () {
                $("#cmbCondicionContrato").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbTipoProfesion").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbSexo").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbIdEtnia").val("").change();
            }, 0);
            $timeout(function () {
                $("#cmbIdUbigeo").val("").change();
            }, 0);
        }else {
            $scope.registro = item;
            if (opcion == 2){
                //Persona registrado
                if ($scope.estado_busqueda == 1){
                    //encontrados en el sistema
                    $timeout(function () {
                        $("#cmbTipoDocumento").val(item.tipo_documento).change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbCondicionContrato").val(item.idcondicion_contrato!=null?item.idcondicion_contrato:"").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbTipoProfesion").val(item.idprofesion!=null?item.idprofesion:"").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbSexo").val(item.sexo!=null?item.sexo:"").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdEtnia").val(item.idetnia!=null?item.idetnia:"").change();
                    }, 0);
                    $timeout(function () {
                        $("#cmbIdUbigeo").val(item.idubigeo!=null?item.idubigeo:"").change();
                    }, 0);
                }else {
                    if ($scope.estado_busqueda == 2){
                        //obtenido de la reniec
                        $timeout(function () {
                            $("#cmbTipoDocumento").val(item.tipo_documento).change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbCondicionContrato").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbTipoProfesion").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbSexo").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbIdEtnia").val("").change();
                        }, 0);
                        $timeout(function () {
                            $("#cmbIdUbigeo").val("").change();
                        }, 0);
                    }
                }
            }
        }
    }

    $scope.salirRegistro = function () {
        $scope.estado_registro = 0;
        $scope.registro = {};
    }

    $scope.nuevoRegistroUsuario = function (item) {
        $scope.estado_registro = 3;
        $scope.registro_usuario = {};
        $scope.registro_usuario = item;
        $scope.registro_usuario.acceso = item.acceso!=undefined?item.acceso:0;
        $scope.registro_usuario.nom_profesional = item.nombres_personal + ' ' + item.apellido_paterno_personal + ' ' + item.apellido_materno_personal;
        $scope.registro_usuario.nro_documento = item.numero_documento;

        $timeout(function () {
            $("#cmbTipoDocumento_usuario").val(item.id_tipo_documento).change();
        }, 0);

        $timeout(function () {
            $("#cmbNivel_usuario").val("").change();
        }, 0);
        $timeout(function () {
            $("#cmbRed_usuario").val("").change();
        }, 0);

        $timeout(function () {
            $("#cmbMicroRed_usuario").val("").change();
        }, 0);

        $timeout(function () {
            $("#cmbEstablecimiento_usuario").val("").change();
        }, 0);

        $scope.lista_microredes = [];
        $scope.lista_eess = [];
        $scope.registro_usuario.nick = $scope.registro_usuario.nro_documento;
        $scope.registro_usuario.password = $scope.registro_usuario.nro_documento;
    }

    $scope.salirRegistroUsuario = function () {
        $scope.estado_registro = 0;
        $scope.registro_usuario = {};
    }

    $scope.tipo_busqueda_persona = function () {
        if ($("#cmbTipoDocumentoBuscar").val() != ""){
            if ($scope.buscar.tipo_documento == 5){
                //visualiza el boton registrar
                $scope.buscar.ocultar_btn_registrar = 1;
            }else {
                //oculta el boton registrar
                $scope.buscar.ocultar_btn_registrar = 0;
            }
        }
    }

    $scope.guardarProfesional = function () {
        if ($scope.registroForm.$valid){
            profesionalService.guardarUpdateProfesional($scope.registro).success(function (data) {
                if (data.confirm == true){
                    $timeout(function () {
                        $scope.salirRegistro();
                    },0);
                    $scope.listar();
                    //mensaje confirmado
                    swal("Exito!", "Se registro Satisfactoriamente!", {
                        icon : "success",
                        buttons: {
                            confirm: {
                                className : 'btn btn-success'
                            }
                        },
                    });
                }else {
                    //error de registro
                    swal("Error!", "Ocurrio un Error interno!", {
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

    $scope.guardarUsuario = function () {
        if ($scope.registroUsuarioForm.$valid){
            if ($("#cmbNivel_usuario").val() != 1){
                $scope.registro_usuario.codigo_disa = '34';
            }

            profesionalService.guardarUsuario($scope.registro_usuario).success(function (data) {
                if (data.confirm == true){
                    $scope.listar();
                    $timeout(function () {
                        //$scope.estado_registro = 0;
                        $scope.salirRegistroUsuario();
                    },0);
                    //mensaje confirmado
                    swal("Exito!", "Se registro Satisfactoriamente!", {
                        icon : "success",
                        buttons: {
                            confirm: {
                                className : 'btn btn-success'
                            }
                        },
                    });
                }else {
                    //error de registro
                    swal("Error!", "Ocurrio un Error interno!", {
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

//    $scope.listar();
    //$scope.listarRedesbyDisa();

});

