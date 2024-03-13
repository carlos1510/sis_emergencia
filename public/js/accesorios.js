/**
 * Created by carlo on 13/09/2018.
 */

function validar_campo(lista){
    var valido=true;
    for(var i=0;i<lista.length;i++){
        $elemento= $(lista[i]);
        $parent=$elemento.parent();
        if( $elemento.val()=='' || $elemento.val()==' ' ||$elemento.val()==null){
            $parent.addClass("has-error");
            $elemento.focus();
            valido=false;
        }else{
            $parent.removeClass("has-error");
        }
    }
    return valido;
}

function validar_hora(id){
    var valido=true;
    var cadena_hora = $("#"+id).val().split(':');
    var hora_izq = parseInt(cadena_hora[0]);
    var hora_der = parseInt(cadena_hora[1]);
    if (hora_izq > -1 && hora_izq < 24){
        if (hora_der > -1 && hora_der < 60){
            valido = true;
            $("#"+id).removeClass("has-error");
        }else {
            valido = false;
            $("#"+id).addClass("has-error");
            $("#"+id).focus();
        }
    }else {
        valido = false;
        $("#"+id).addClass("has-error");
        $("#"+id).focus();
    }
    return valido;
}

function validar_edad(valor, tipo){
    var valido = false;
    if (tipo == 'D'){
        if (parseInt(valor)>0 && parseInt(valor) < 32){
            valido = true;
        }
    }else {
        if (tipo == 'M'){
            if (parseInt(valor)>0 && parseInt(valor) < 12){
                valido = true;
            }
        }else {
            if (tipo == 'A'){
                if (parseInt(valor)>0 && parseInt(valor) < 126){
                    valido = true;
                }
            }
        }
    }
    return valido;
}

function validar_valores_msj(v_min, v_max, carac_min, id_val, id_msj, msj_min, msj_max) {
    var valid = false;
    if ($("#"+id_val).val().trim() != ""){
        if ($("#"+id_val).val().trim().length >= carac_min){
            if (parseInt($("#"+id_val).val().trim()) >= v_min){
                //band1 = true;
                if (parseInt($("#"+id_val).val().trim()) <= v_max){
                    document.getElementById(id_msj).style.display = 'none';
                    valid = true;
                }else {
                    document.getElementById(id_msj).innerHTML = msj_max;
                    document.getElementById(id_msj).style.display = 'block';
                    $("#"+id_val).val($("#"+id_val).val().substr(0, carac_min));
                    if ($("#"+id_val).val().trim().length >= v_min){
                        if (parseInt($("#"+id_val).val().trim()) <= v_max){
                            document.getElementById(id_msj).style.display = 'none';
                            valid = true;
                        }
                        //document.getElementById(id_msj).style.display = 'none';
                    }else {
                        document.getElementById(id_msj).innerHTML = msj_min;
                        document.getElementById(id_msj).style.display = 'block';
                    }
                }
            }else {
                //band1 = false;
                document.getElementById(id_msj).innerHTML = msj_min;
                document.getElementById(id_msj).style.display = 'block';
                //$("#presion_sistolica_error_span").style.display = 'block';
            }
        }else {
            document.getElementById(id_msj).innerHTML = msj_min;
            document.getElementById(id_msj).style.display = 'block';
        }
    }else {
        document.getElementById(id_msj).style.display = 'none';
    }
    return valid;
}

function validar_length(tam_min, tam_max, id_input, id_msj, msj_min, msj_max){
    var valid = false;
    if ($("#"+id_input).val().trim() != ""){
        if ($("#"+id_input).val().trim().length >= tam_min && $("#"+id_input).val().trim().length <= tam_max){
            valid = true;
            document.getElementById(id_msj).style.display = 'none';
        }else {
            valid = false;
            document.getElementById(id_msj).innerHTML = "El campo debe contener min: "+tam_min+" y max: "+tam_max+" carácteres permitidos";
            document.getElementById(id_msj).style.display = 'block';

        }
    }
    return valid;
}

function ocultar(lista){
    for (var i=0;i<lista.length;i++){
        $elemento =lista[i];
        document.getElementById(''+$elemento).style.display = "none";
    }
}

function mostrar(lista){
    for (var i=0;i<lista.length;i++){
        $elemento =lista[i];
        document.getElementById(''+$elemento).style.display = "block";
    }
}

function round(number, precision) {
    var pair = (number + 'e').split('e')
    var value = Math.round(pair[0] + 'e' + (+pair[1] + precision))
    pair = (value + 'e').split('e')
    return +(pair[0] + 'e' + (+pair[1] - precision))
}

function bloquear_desbloquear_campo(lista, accion){
    for(var i=0;i<lista.length;i++){
        if( accion == 'B'){
            $(lista[i]).prop('readonly', true);
        }else{
            $(lista[i]).prop('readonly', false);
        }
    }
}
