/**
 * Created by carlo on 1/09/2018.
 */

app.controller('perfilController', function ($scope,$timeout, profesionalService,DTOptionsBuilder){

    $scope.perfil = {};

    $scope.mostrarDatos = function () {
        profesionalService.getPerfilbyID({}).success(function (data) {
            $scope.perfil = data[0];
            $timeout(function () {
                $("#cmbsexo").val($scope.perfil.sexo).change();
            },0);
        });
    }

    $scope.activarDesactivarCampos = function (confirmar) {
        $("#cmbsexo").prop('disabled', confirmar);
        $("#btncancelar").prop('disabled', confirmar);
        $("#btnguardar").prop('disabled', confirmar);
        $("#telefonotxt").prop('readonly', confirmar);
        $("#emailtxt").prop('readonly', confirmar);
        $("#colegiaturatxt").prop('readonly', confirmar);
        $("#clavetxt").prop('readonly', confirmar);
        $("#repiteclavetxt").prop('readonly', confirmar);
        $("#paternotxt").prop('readonly', confirmar);
        $("#maternotxt").prop('readonly', confirmar);
        $("#nombrestxt").prop('readonly', confirmar);

        if(confirmar){
            document.getElementById('error_clave_span').style.display = "none";
            $scope.mostrarDatos();
        }
    }

    $scope.guardar = function () {
        document.getElementById('error_clave_span').style.display = "none";
        var valid = validar_campo(['#clavetxt', '#repiteclavetxt','#paternotxt', '#maternotxt', '#nombrestxt']);
        if(valid){
            if($scope.perfil.clave == $scope.perfil.repiteclave){
                alertify.confirm('Confirmar', '<div class="alert alert-success"><i class="fa fa-exclamation-triangle"></i> ¿Desea Guardar los Cambios?</div>', function(){
                    profesionalService.updatePerfil($scope.perfil).success(function (data) {
                        if(data.confirm==true){
                            $.notify({
                                icon: 'fa fa-check',
                                title: 'Exito!',
                                message: 'Se Actualizo sus datos Correctamente',
                            },{type: 'success'});
                            $scope.activarDesactivarCampos(true);
                        }
                    });
                }, function(){ alertify.error('<div class="alert alert-danger">Operación Cancelada</div>')});
            }else {
                document.getElementById('error_clave_span').style.display = "block";
            }
        }else {
            alertify.error('<div class="alert alert-danger">Error!.. Datos Obligatorios</div>')
        }
    }

    $scope.mostrarDatos();
});
