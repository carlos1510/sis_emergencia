<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 06/05/2021
 * Time: 10:14
 */

namespace App\Http\Repository;

use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Session;

use App\Http\Util\Util;
use App\Models\Emergencia;

date_default_timezone_set('America/Lima');

class EmergenciaRepository
{
    public function guardarUpdateEmergencia($params){
        try{
            $data['confirm'] = true;
            $data['code'] = 200;
            $data['message'] = 'Operación Realizado Exitosamente';
            if(isset($params->idemergencia)){
                //editamos
                //actualizamos los datos
                $sql_persona = "UPDATE persona SET tipo_documento=:tipo_documento, nro_documento=:nro_documento, apellido_paterno=:apellido_paterno, apellido_materno=:apellido_materno, nombres=:nombres, sexo=:sexo, idubigeo=:idubigeo, direccion=:direccion, fecha_nacimiento=:fecha_nacimiento, telefono=:telefono, idetnia=:idetnia WHERE id=:id;";
                DB::update($sql_persona, array(
                    'tipo_documento' => isset($params->tipo_documento)?$params->tipo_documento:null,
                    'nro_documento' => isset($params->nro_documento)?($params->nro_documento!=""?strtoupper($params->nro_documento):null):null,
                    'apellido_paterno' => isset($params->apellido_paterno)?($params->apellido_paterno!=""?strtoupper($params->apellido_paterno):null):null,
                    'apellido_materno' => isset($params->apellido_materno)?($params->apellido_materno!=""?strtoupper($params->apellido_materno):null):null,
                    'nombres' => isset($params->nombres)?($params->nombres!=""?strtoupper($params->nombres):null):null,
                    'sexo' => isset($params->sexo)?($params->sexo!=""?strtoupper($params->sexo):null):null,
                    'idubigeo' => isset($params->idubigeo)?($params->idubigeo!=""?$params->idubigeo:null):null,
                    'direccion' => isset($params->direccion)?($params->direccion!=""?strtoupper($params->direccion):null):null,
                    'fecha_nacimiento' => isset($params->fecha_nacimiento)?($params->fecha_nacimiento!=""?Util::convertirStringFecha($params->fecha_nacimiento, false):null):null,
                    'telefono' => isset($params->telefono)?($params->telefono!=""?$params->telefono:null):null,
                    'idetnia' => isset($params->idetnia)?($params->idetnia!=""?$params->idetnia:null):null,
                    'id' => $params->idpersona
                ));
                $sql_emergencia = "UPDATE emergencia SET cod_2000=:cod_2000, fecha_atencion=:fecha_atencion, hora_atencion=:hora_atencion, hc=:hc, idfinanciador=:idfinanciador, edad=:edad, tipo_edad=:tipo_edad, idpersona=:idpersona, tipo_doc_acomp=:tipo_doc_acomp, nro_doc_acomp=:nro_doc_acomp, nombre_acomp=:nombre_acomp, telefono_acomp=:telefono_acomp, idmotivo_atencion=:idmotivo_atencion, motivo_atencion_descripcion=:motivo_atencion_descripcion,
                      idubigeo_lugar_ocurrencia=:idubigeo_lugar_ocurrencia, idups=:idups, idcondicion_salida=:idcondicion_salida, fecha_salida=:fecha_salida, hora_salida=:hora_salida, iddestino=:iddestino, cod_2000_referencia=:cod_2000_referencia, idups_hospitalizacion=:idups_hospitalizacion, tipo_profesional_atencion=:tipo_profesional_atencion, idprofesional=:idprofesional, nro_doc_profecional=:nro_doc_profecional,
                      nombre_profesional=:nombre_profesional, dx1_si_no=:dx1_si_no, codigo_dx1=:codigo_dx1, descripcion_dx1=:descripcion_dx1, tipo_diagnostico_dx1=:tipo_diagnostico_dx1, dx2_si_no=:dx2_si_no, codigo_dx2=:codigo_dx2, descripcion_dx2=:descripcion_dx2, tipo_diagnostico_dx2=:tipo_diagnostico_dx2, dx3_si_no=:dx3_si_no, codigo_dx3=:codigo_dx3,
                      descripcion_dx3=:descripcion_dx3, tipo_diagnostico_dx3=:tipo_diagnostico_dx3, dx4_si_no=:dx4_si_no, codigo_dx4=:codigo_dx4, descripcion_dx4=:descripcion_dx4, tipo_diagnostico_dx4=:tipo_diagnostico_dx4, proc1_si_no=:proc1_si_no, codigo_proc_1=:codigo_proc_1, descripcion_proc_1=:descripcion_proc_1, proc2_si_no=:proc2_si_no, codigo_proc_2=:codigo_proc_2,
                      descripcion_proc_2=:descripcion_proc_2, proc3_si_no=:proc3_si_no, codigo_proc_3=:codigo_proc_3, descripcion_proc_3=:descripcion_proc_3, proc4_si_no=:proc4_si_no, codigo_proc_4=:codigo_proc_4, descripcion_proc_4=:descripcion_proc_4, tipo_actividad=:tipo_actividad, idusuario_modificacion=:idusuario_modificacion, fecha_modificacion=:fecha_modificacion,
                      presion_sistolica=:presion_sistolica, presion_diastolica=:presion_diastolica, presion_arterial_media=:presion_arterial_media, saturacion_oxigeno=:saturacion_oxigeno, frecuencia_cardiaca=:frecuencia_cardiaca, frecuencia_respiratoria=:frecuencia_respiratoria, temperatura=:temperatura, area_atencion=:area_atencion, tratamiento_adicional=:tratamiento_adicional, nro_dia_tratamiento=:nro_dia_tratamiento,
                      tipo_profesional_procedimiento=:tipo_profesional_procedimiento, idprofesional_no_medico=:idprofesional_no_medico, nro_doc_profecional_no_medico=:nro_doc_profecional_no_medico, nombre_profesional_no_medico=:nombre_profesional_no_medico WHERE id=:id;";
                DB::update($sql_emergencia, array(
                    'cod_2000' => isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                    'fecha_atencion' => isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                    'hora_atencion' => isset($params->hora_atencion)?($params->hora_atencion!=""?$params->hora_atencion:null):null,
                    'hc' => isset($params->hc)?($params->hc!=""?$params->hc:null):null,
                    'idfinanciador' => isset($params->idfinanciador)?($params->idfinanciador!=""?$params->idfinanciador:null):null,
                    'edad' => isset($params->edad)?($params->edad!=""?$params->edad:null):null,
                    'tipo_edad' => isset($params->tipo_edad)?($params->tipo_edad!=""?strtoupper($params->tipo_edad):null):null,
                    'idpersona' => $params->idpersona,
                    'tipo_doc_acomp' => isset($params->tipo_doc_acomp)?($params->tipo_doc_acomp!=""?$params->tipo_doc_acomp:null):null,
                    'nro_doc_acomp' => isset($params->nro_doc_acomp)?($params->nro_doc_acomp!=""?strtoupper($params->nro_doc_acomp):null):null,
                    'nombre_acomp' => isset($params->nombre_acomp)?($params->nombre_acomp!=""?strtoupper($params->nombre_acomp):null):null,
                    'telefono_acomp' => isset($params->telefono_acomp)?($params->telefono_acomp!=""?$params->telefono_acomp:null):null,
                    'idmotivo_atencion' => isset($params->idmotivo_atencion)?($params->idmotivo_atencion!=""?$params->idmotivo_atencion:null):null,
                    'motivo_atencion_descripcion' => isset($params->motivo_atencion_descripcion)?($params->motivo_atencion_descripcion!=""?$params->motivo_atencion_descripcion:null):null,
                    'idubigeo_lugar_ocurrencia' => isset($params->idubigeo_lugar_ocurrencia)?($params->idubigeo_lugar_ocurrencia!=""?$params->idubigeo_lugar_ocurrencia:null):null,
                    'idups' => isset($params->idups)?($params->idups!=""?$params->idups:null):null,
                    'idcondicion_salida' => isset($params->idcondicion_salida)?($params->idcondicion_salida!=""?$params->idcondicion_salida:null):null,
                    'fecha_salida' => isset($params->fecha_salida)?($params->fecha_salida!=""?Util::convertirStringFecha($params->fecha_salida, false):null):null,
                    'hora_salida' => isset($params->hora_salida)?($params->hora_salida!=""?$params->hora_salida:null):null,
                    'iddestino' => isset($params->iddestino)?($params->iddestino!=""?$params->iddestino:null):null,
                    'cod_2000_referencia' => isset($params->cod_2000_referencia)?($params->cod_2000_referencia!=""?$params->cod_2000_referencia:null):null,
                    'idups_hospitalizacion' => isset($params->idups_hospitalizacion)?($params->idups_hospitalizacion!=""?$params->idups_hospitalizacion:null):null,
                    'tipo_profesional_atencion' => isset($params->tipo_profesional_atencion)?($params->tipo_profesional_atencion!=""?$params->tipo_profesional_atencion:null):null,
                    'idprofesional' => isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null,
                    'nro_doc_profecional' => isset($params->nro_doc_profecional)?($params->nro_doc_profecional!=""?$params->nro_doc_profecional:null):null,
                    'nombre_profesional' => isset($params->nombre_profesional)?($params->nombre_profesional!=""?strtoupper($params->nombre_profesional):null):null,
                    'dx1_si_no' => isset($params->dx1_si_no)?($params->dx1_si_no!=""?$params->dx1_si_no:null):null,
                    'codigo_dx1' => isset($params->codigo_dx1)?($params->codigo_dx1!=""?$params->codigo_dx1:null):null,
                    'descripcion_dx1' => isset($params->descripcion_dx1)?($params->descripcion_dx1!=""?strtoupper($params->descripcion_dx1):null):null,
                    'tipo_diagnostico_dx1' => isset($params->tipo_diagnostico_dx1)?($params->tipo_diagnostico_dx1!=""?strtoupper($params->tipo_diagnostico_dx1):null):null,
                    'dx2_si_no' => isset($params->dx2_si_no)?($params->dx2_si_no!=""?$params->dx2_si_no:null):null,
                    'codigo_dx2' => isset($params->codigo_dx2)?($params->codigo_dx2!=""?strtoupper($params->codigo_dx2):null):null,
                    'descripcion_dx2' => isset($params->descripcion_dx2)?($params->descripcion_dx2!=""?strtoupper($params->descripcion_dx2):null):null,
                    'tipo_diagnostico_dx2' => isset($params->tipo_diagnostico_dx2)?($params->tipo_diagnostico_dx2!=""?strtoupper($params->tipo_diagnostico_dx2):null):null,
                    'dx3_si_no' => isset($params->dx3_si_no)?($params->dx3_si_no!=""?$params->dx3_si_no:null):null,
                    'codigo_dx3' => isset($params->codigo_dx3)?($params->codigo_dx3!=""?strtoupper($params->codigo_dx3):null):null,
                    'descripcion_dx3' => isset($params->descripcion_dx3)?($params->descripcion_dx3!=""?strtoupper($params->descripcion_dx3):null):null,
                    'tipo_diagnostico_dx3' => isset($params->tipo_diagnostico_dx3)?($params->tipo_diagnostico_dx3!=""?strtoupper($params->tipo_diagnostico_dx3):null):null,
                    'dx4_si_no' => isset($params->dx4_si_no)?($params->dx4_si_no!=""?$params->dx4_si_no:null):null,
                    'codigo_dx4' => isset($params->codigo_dx4)?($params->codigo_dx4!=""?strtoupper($params->codigo_dx4):null):null,
                    'descripcion_dx4' => isset($params->descripcion_dx4)?($params->descripcion_dx4!=""?strtoupper($params->descripcion_dx4):null):null,
                    'tipo_diagnostico_dx4' => isset($params->tipo_diagnostico_dx4)?($params->tipo_diagnostico_dx4!=""?strtoupper($params->tipo_diagnostico_dx4):null):null,
                    'proc1_si_no' => isset($params->proc1_si_no)?($params->proc1_si_no!=""?$params->proc1_si_no:null):null,
                    'codigo_proc_1' => isset($params->codigo_proc_1)?($params->codigo_proc_1!=""?strtoupper($params->codigo_proc_1):null):null,
                    'descripcion_proc_1' => isset($params->descripcion_proc_1)?($params->descripcion_proc_1!=""?strtoupper($params->descripcion_proc_1):null):null,
                    'proc2_si_no' => isset($params->proc2_si_no)?($params->proc2_si_no!=""?$params->proc2_si_no:null):null,
                    'codigo_proc_2' => isset($params->codigo_proc_2)?($params->codigo_proc_2!=""?strtoupper($params->codigo_proc_2):null):null,
                    'descripcion_proc_2' => isset($params->descripcion_proc_2)?($params->descripcion_proc_2!=""?strtoupper($params->descripcion_proc_2):null):null,
                    'proc3_si_no' => isset($params->proc3_si_no)?($params->proc3_si_no!=""?$params->proc3_si_no:null):null,
                    'codigo_proc_3' => isset($params->codigo_proc_3)?($params->codigo_proc_3!=""?strtoupper($params->codigo_proc_3):null):null,
                    'descripcion_proc_3' => isset($params->descripcion_proc_3)?($params->descripcion_proc_3!=""?strtoupper($params->descripcion_proc_3):null):null,
                    'proc4_si_no' => isset($params->proc4_si_no)?($params->proc4_si_no!=""?$params->proc4_si_no:null):null,
                    'codigo_proc_4' => isset($params->codigo_proc_4)?($params->codigo_proc_4!=""?strtoupper($params->codigo_proc_4):null):null,
                    'descripcion_proc_4' => isset($params->descripcion_proc_4)?($params->descripcion_proc_4!=""?strtoupper($params->descripcion_proc_4):null):null,
                    'tipo_actividad' => isset($params->tipo_actividad)?($params->tipo_actividad!=""?strtoupper($params->tipo_actividad):null):null,
                    'idusuario_modificacion' => Session::get('idusuario'),
                    'fecha_modificacion' => date('Y-m-d H:i:s'),
                    'presion_sistolica' => isset($params->presion_sistolica)?($params->presion_sistolica!=""?$params->presion_sistolica:null):null,
                    'presion_diastolica' => isset($params->presion_diastolica)?($params->presion_diastolica!=""?$params->presion_diastolica:null):null,
                    'presion_arterial_media' => isset($params->presion_arterial_media)?($params->presion_arterial_media!=""?$params->presion_arterial_media:null):null,
                    'saturacion_oxigeno' => isset($params->saturacion_oxigeno)?($params->saturacion_oxigeno!=""?$params->saturacion_oxigeno:null):null,
                    'frecuencia_cardiaca' => isset($params->frecuencia_cardiaca)?($params->frecuencia_cardiaca!=""?$params->frecuencia_cardiaca:null):null,
                    'frecuencia_respiratoria' => isset($params->frecuencia_respiratoria)?($params->frecuencia_respiratoria!=""?$params->frecuencia_respiratoria:null):null,
                    'temperatura' => isset($params->temperatura)?($params->temperatura!=""?$params->temperatura:null):null,
                    'area_atencion' => isset($params->area_atencion)?($params->area_atencion!=""?$params->area_atencion:null):null,
                    'tratamiento_adicional' => isset($params->tratamiento_adicional)?($params->tratamiento_adicional!=""?$params->tratamiento_adicional:null):null,
                    'nro_dia_tratamiento' => isset($params->nro_dia_tratamiento)?($params->nro_dia_tratamiento!=""?$params->nro_dia_tratamiento:null):null,
                    'tipo_profesional_procedimiento' => isset($params->tipo_profesional_procedimiento)?($params->tipo_profesional_procedimiento!=""?$params->tipo_profesional_procedimiento:null):null,
                    'idprofesional_no_medico' => isset($params->idprofesional_no_medico)?($params->idprofesional_no_medico!=""?$params->idprofesional_no_medico:null):null,
                    'nro_doc_profecional_no_medico' => isset($params->nro_doc_profecional_no_medico)?($params->nro_doc_profecional_no_medico!=""?$params->nro_doc_profecional_no_medico:null):null,
                    'nombre_profesional_no_medico' => isset($params->nombre_profesional_no_medico)?($params->nombre_profesional_no_medico!=""?$params->nombre_profesional_no_medico:null):null,
                    'id' => $params->idemergencia
                ));
                if(isset($params->detalle_medicamento)){
                    foreach($params->detalle_medicamento as $item){
                        if(isset($item->id)){
                            $sql_medicamento = "UPDATE detalle_medicamento SET idmedicamento=:idmedicamento, descripcion_medicamento=:descripcion_medicamento, cantidad=:cantidad WHERE id=:id;";
                            DB::update($sql_medicamento, array('idmedicamento'=>$item->idmedicamento, 'descripcion_medicamento' => $item->descripcion, 'cantidad' => $item->cantidad, 'id' => $item->id));
                        }else{
                            //registramos nuevos medicamentos
                            $sql_medicamento = "INSERT INTO detalle_medicamento (idemergencia, idmedicamento, descripcion_medicamento, cantidad, idemergencia_tratamiento, estado) VALUES (?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_medicamento, [$params->idemergencia, $item->idmedicamento, $item->descripcion, isset($item->cantidad)?$item->cantidad:null, null, 1]);
                        }
                    }
                }
                if(isset($params->detalle_his)){
                    foreach($params->detalle_his as $item){
                        if($item->id){
                            $sql_his_upd = "UPDATE actividades_his SET idregistrador=:idregistrador, idprofesional=:idprofesional, cod_2000=:cod_2000, codigo_ups=:codigo_ups, ups=:ups, condicion_establecimiento=:condicion_establecimiento, condicion_servicio=:condicion_servicio, fecha=:fecha, codigo_cie=:codigo_cie, descripcion_cie=:descripcion_cie, tipodianostico=:tipodianostico, lab1=:lab1, lab2=:lab2, lab3=:lab3, item=:item WHERE id=:id;";
                            DB::update($sql_his_upd, array(
                                'idregistrador' => isset($params->idregistrador)?$params->idregistrador:Session::get('idusuario'),
                                'idprofesional' => isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null,
                                'cod_2000' => isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                                'codigo_ups' => isset($params->idups)?($params->idups!=""?$params->idups:null):null,
                                'ups' => isset($params->descripcion_ups)?($params->descripcion_ups!=""?$params->descripcion_ups:null):null,
                                'condicion_establecimiento' => isset($params->condicion_establecimiento)?($params->condicion_establecimiento!=""?$params->condicion_establecimiento:null):null,
                                'condicion_servicio' => isset($params->condicion_servicio)?($params->condicion_servicio!=""?$params->condicion_servicio:null):null,
                                'fecha' => isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                                'codigo_cie' => isset($item->codigo_cie)?$item->codigo_cie:null,
                                'descripcion_cie' => isset($item->descripcion_cie)?$item->descripcion_cie:null,
                                'tipodianostico' => isset($item->tipodianostico)?$item->tipodianostico:'D',
                                'lab1' => isset($item->lab1)?$item->lab1:null,
                                'lab2' => isset($item->lab2)?$item->lab2:null,
                                'lab3' => isset($item->lab3)?$item->lab3:null,
                                'item' => isset($item->item)?$item->item:null,
                                'id' => $item->id
                            ));
                        }else{
                            $sql_his = "INSERT INTO actividades_his (idemergencia, idemergencia_tratamiento, idhospitalizacion, idregistrador, idprofesional, cod_2000, codigo_ups, ups, condicion_establecimiento, condicion_servicio, fecha, codigo_cie, descripcion_cie, tipodianostico, lab1, lab2, lab3, item, impresion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_his, [
                                $params->idemergencia, null, null, Session::get('idusuario'), isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null,
                                isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                                isset($params->idups)?($params->idups!=""?$params->idups:null):null,
                                isset($params->descripcion_ups)?($params->descripcion_ups!=""?$params->descripcion_ups:null):null,
                                isset($params->condicion_establecimiento)?($params->condicion_establecimiento!=""?$params->condicion_establecimiento:null):null,
                                isset($params->condicion_servicio)?($params->condicion_servicio!=""?$params->condicion_servicio:null):null,
                                isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                                isset($item->codigo_cie)?$item->codigo_cie:null,
                                isset($item->descripcion_cie)?$item->descripcion_cie:null,
                                isset($item->tipodianostico)?$item->tipodianostico:'D',
                                isset($item->lab1)?$item->lab1:null,
                                isset($item->lab2)?$item->lab2:null,
                                isset($item->lab3)?$item->lab3:null,
                                isset($item->item)?$item->item:null,
                                isset($item->impresion)?$item->impresion:0,
                                1
                            ]);
                        }
                    }
                }
            }else{
                if(isset($params->idpersona)){
                    //actualizamos los datos
                    $sql_persona = "UPDATE persona SET tipo_documento=:tipo_documento, nro_documento=:nro_documento, apellido_paterno=:apellido_paterno, apellido_materno=:apellido_materno, nombres=:nombres, sexo=:sexo, idubigeo=:idubigeo, direccion=:direccion, fecha_nacimiento=:fecha_nacimiento, telefono=:telefono, idetnia=:idetnia WHERE id=:id;";
                    DB::update($sql_persona, array(
                        'tipo_documento' => isset($params->tipo_documento)?$params->tipo_documento:null,
                        'nro_documento' => isset($params->nro_documento)?($params->nro_documento!=""?strtoupper($params->nro_documento):null):null,
                        'apellido_paterno' => isset($params->apellido_paterno)?($params->apellido_paterno!=""?strtoupper($params->apellido_paterno):null):null,
                        'apellido_materno' => isset($params->apellido_materno)?($params->apellido_materno!=""?strtoupper($params->apellido_materno):null):null,
                        'nombres' => isset($params->nombres)?($params->nombres!=""?strtoupper($params->nombres):null):null,
                        'sexo' => isset($params->sexo)?($params->sexo!=""?strtoupper($params->sexo):null):null,
                        'idubigeo' => isset($params->idubigeo)?($params->idubigeo!=""?$params->idubigeo:null):null,
                        'direccion' => isset($params->direccion)?($params->direccion!=""?strtoupper($params->direccion):null):null,
                        'fecha_nacimiento' => isset($params->fecha_nacimiento)?($params->fecha_nacimiento!=""?Util::convertirStringFecha($params->fecha_nacimiento, false):null):null,
                        'telefono' => isset($params->telefono)?($params->telefono!=""?$params->telefono:null):null,
                        'idetnia' => isset($params->idetnia)?($params->idetnia!=""?$params->idetnia:null):null,
                        'id' => $params->idpersona
                    ));

                    //registramos la emergencia
                    //registramos la emergencia
                    $emergencia = new Emergencia();
                    $emergencia->cod_2000 = $params->cod_2000;
                    $emergencia->fecha_atencion = Util::convertirStringFecha($params->fecha_atencion, false);
                    $emergencia->hora_atencion = $params->hora_atencion;
                    $emergencia->hc = isset($params->hc)?($params->hc!=""?$params->hc:null):null;
                    $emergencia->idfinanciador = isset($params->idfinanciador)?($params->idfinanciador!=""?$params->idfinanciador:null):null;
                    $emergencia->edad = isset($params->edad)?($params->edad!=""?$params->edad:null):null;
                    $emergencia->tipo_edad = isset($params->tipo_edad)?($params->tipo_edad!=""?strtoupper($params->tipo_edad):null):null;
                    $emergencia->idpersona = $params->idpersona;
                    $emergencia->tipo_doc_acomp = isset($params->tipo_doc_acomp)?($params->tipo_doc_acomp!=""?$params->tipo_doc_acomp:null):null;
                    $emergencia->nro_doc_acomp = isset($params->nro_doc_acomp)?($params->nro_doc_acomp!=""?$params->nro_doc_acomp:null):null;
                    $emergencia->nombre_acomp = isset($params->nombre_acomp)?($params->nombre_acomp!=""?strtoupper($params->nombre_acomp):null):null;
                    $emergencia->telefono_acomp = isset($params->telefono_acomp)?($params->telefono_acomp!=""?$params->telefono_acomp:null):null;
                    $emergencia->idmotivo_atencion = isset($params->idmotivo_atencion)?($params->idmotivo_atencion!=""?$params->idmotivo_atencion:null):null;
                    $emergencia->idubigeo_lugar_ocurrencia = isset($params->idubigeo_lugar_ocurrencia)?($params->idubigeo_lugar_ocurrencia!=""?$params->idubigeo_lugar_ocurrencia:null):null;
                    $emergencia->idups = isset($params->idups)?($params->idups!=""?$params->idups:null):null;
                    $emergencia->idcondicion_salida = isset($params->idcondicion_salida)?($params->idcondicion_salida!=""?$params->idcondicion_salida:null):null;
                    $emergencia->fecha_salida = isset($params->fecha_salida)?($params->fecha_salida!=""?Util::convertirStringFecha($params->fecha_salida, false):null):null;
                    $emergencia->hora_salida = isset($params->hora_salida)?($params->hora_salida!=""?$params->hora_salida:null):null;
                    $emergencia->iddestino = isset($params->iddestino)?($params->iddestino!=""?$params->iddestino:null):null;
                    $emergencia->cod_2000_referencia = isset($params->cod_2000_referencia)?($params->cod_2000_referencia!=""?$params->cod_2000_referencia:null):null;
                    $emergencia->idups_hospitalizacion = isset($params->idups_hospitalizacion)?($params->idups_hospitalizacion!=""?$params->idups_hospitalizacion:null):null;

                    $emergencia->idprofesional = isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null;
                    $emergencia->nro_doc_profecional = isset($params->nro_doc_profecional)?($params->nro_doc_profecional!=""?$params->nro_doc_profecional:null):null;
                    $emergencia->nombre_profesional = isset($params->nombre_profesional)?($params->nombre_profesional!=""?strtoupper($params->nombre_profesional):null):null;
                    $emergencia->dx1_si_no = isset($params->dx1_si_no)?($params->dx1_si_no!=""?$params->dx1_si_no:null):null;
                    $emergencia->codigo_dx1 = isset($params->codigo_dx1)?($params->codigo_dx1!=""?strtoupper($params->codigo_dx1):null):null;
                    $emergencia->descripcion_dx1 = isset($params->descripcion_dx1)?($params->descripcion_dx1!=""?strtoupper($params->descripcion_dx1):null):null;
                    $emergencia->tipo_diagnostico_dx1 = isset($params->tipo_diagnostico_dx1)?($params->tipo_diagnostico_dx1!=""?strtoupper($params->tipo_diagnostico_dx1):null):null;
                    $emergencia->dx2_si_no = isset($params->dx2_si_no)?($params->dx2_si_no!=""?$params->dx2_si_no:null):null;
                    $emergencia->codigo_dx2 = isset($params->codigo_dx2)?($params->codigo_dx2!=""?strtoupper($params->codigo_dx2):null):null;
                    $emergencia->descripcion_dx2 = isset($params->descripcion_dx2)?($params->descripcion_dx2!=""?strtoupper($params->descripcion_dx2):null):null;
                    $emergencia->tipo_diagnostico_dx2 = isset($params->tipo_diagnostico_dx2)?($params->tipo_diagnostico_dx2!=""?strtoupper($params->tipo_diagnostico_dx2):null):null;
                    $emergencia->dx3_si_no = isset($params->dx3_si_no)?($params->dx3_si_no!=""?$params->dx3_si_no:null):null;
                    $emergencia->codigo_dx3 = isset($params->codigo_dx3)?($params->codigo_dx3!=""?strtoupper($params->codigo_dx3):null):null;
                    $emergencia->descripcion_dx3 = isset($params->descripcion_dx3)?($params->descripcion_dx3!=""?strtoupper($params->descripcion_dx3):null):null;
                    $emergencia->tipo_diagnostico_dx3 = isset($params->tipo_diagnostico_dx3)?($params->tipo_diagnostico_dx3!=""?strtoupper($params->tipo_diagnostico_dx3):null):null;
                    $emergencia->dx4_si_no = isset($params->dx4_si_no)?($params->dx4_si_no!=""?$params->dx4_si_no:null):null;
                    $emergencia->codigo_dx4 = isset($params->codigo_dx4)?($params->codigo_dx4!=""?strtoupper($params->codigo_dx4):null):null;
                    $emergencia->descripcion_dx4 = isset($params->descripcion_dx4)?($params->descripcion_dx4!=""?strtoupper($params->descripcion_dx4):null):null;
                    $emergencia->tipo_diagnostico_dx4 = isset($params->tipo_diagnostico_dx4)?($params->tipo_diagnostico_dx4!=""?strtoupper($params->tipo_diagnostico_dx4):null):null;
                    $emergencia->proc1_si_no = isset($params->proc1_si_no)?($params->proc1_si_no!=""?$params->proc1_si_no:null):null;
                    $emergencia->codigo_proc_1 = isset($params->codigo_proc_1)?($params->codigo_proc_1!=""?strtoupper($params->codigo_proc_1):null):null;
                    $emergencia->descripcion_proc_1 = isset($params->descripcion_proc_1)?($params->descripcion_proc_1!=""?strtoupper($params->descripcion_proc_1):null):null;
                    $emergencia->proc2_si_no = isset($params->proc2_si_no)?($params->proc2_si_no!=""?$params->proc2_si_no:null):null;
                    $emergencia->codigo_proc_2 = isset($params->codigo_proc_2)?($params->codigo_proc_2!=""?strtoupper($params->codigo_proc_2):null):null;
                    $emergencia->descripcion_proc_2 = isset($params->descripcion_proc_2)?($params->descripcion_proc_2!=""?strtoupper($params->descripcion_proc_2):null):null;
                    $emergencia->proc3_si_no = isset($params->proc3_si_no)?($params->proc3_si_no!=""?$params->proc3_si_no:null):null;
                    $emergencia->codigo_proc_3 = isset($params->codigo_proc_3)?($params->codigo_proc_3!=""?strtoupper($params->codigo_proc_3):null):null;
                    $emergencia->descripcion_proc_3 = isset($params->descripcion_proc_3)?($params->descripcion_proc_3!=""?strtoupper($params->descripcion_proc_3):null):null;
                    $emergencia->proc4_si_no = isset($params->proc4_si_no)?($params->proc4_si_no!=""?$params->proc4_si_no:null):null;

                    $emergencia->codigo_proc_4 = isset($params->codigo_proc_4)?($params->codigo_proc_4!=""?strtoupper($params->codigo_proc_4):null):null;
                    $emergencia->descripcion_proc_4 = isset($params->descripcion_proc_4)?($params->descripcion_proc_4!=""?strtoupper($params->descripcion_proc_4):null):null;
                    $emergencia->tipo_actividad = isset($params->tipo_actividad)?($params->tipo_actividad!=""?strtoupper($params->tipo_actividad):null):null;
                    $emergencia->idusuario_registro = Session::get('idusuario');
                    $emergencia->fecha_registro = date('Y-m-d H:i:s');
                    
                    $emergencia->presion_sistolica = isset($params->presion_sistolica)?($params->presion_sistolica!=""?$params->presion_sistolica:null):null;
                    $emergencia->presion_diastolica = isset($params->presion_diastolica)?($params->presion_diastolica!=""?$params->presion_diastolica:null):null;
                    $emergencia->presion_arterial_media = isset($params->presion_arterial_media)?($params->presion_arterial_media!=""?$params->presion_arterial_media:null):null;
                    $emergencia->saturacion_oxigeno = isset($params->saturacion_oxigeno)?($params->saturacion_oxigeno!=""?$params->saturacion_oxigeno:null):null;
                    $emergencia->frecuencia_cardiaca = isset($params->frecuencia_cardiaca)?($params->frecuencia_cardiaca!=""?$params->frecuencia_cardiaca:null):null;
                    $emergencia->frecuencia_respiratoria = isset($params->frecuencia_respiratoria)?($params->frecuencia_respiratoria!=""?$params->frecuencia_respiratoria:null):null;
                    $emergencia->temperatura = isset($params->temperatura)?($params->temperatura!=""?$params->temperatura:null):null;
                    $emergencia->area_atencion = isset($params->area_atencion)?($params->area_atencion!=""?$params->area_atencion:null):null;
                    $emergencia->tratamiento_adicional = isset($params->tratamiento_adicional)?($params->tratamiento_adicional!=""?$params->tratamiento_adicional:null):null;
                    $emergencia->nro_dia_tratamiento = isset($params->nro_dia_tratamiento)?($params->nro_dia_tratamiento!=""?$params->nro_dia_tratamiento:null):null;
                    $emergencia->estado = 1;
                    $emergencia->idprofesional_no_medico = isset($params->idprofesional_no_medico)?($params->idprofesional_no_medico!=""?$params->idprofesional_no_medico:null):null;
                    $emergencia->nro_doc_profecional_no_medico = isset($params->nro_doc_profecional_no_medico)?($params->nro_doc_profecional_no_medico!=""?$params->nro_doc_profecional_no_medico:null):null;
                    $emergencia->nombre_profesional_no_medico = isset($params->nombre_profesional_no_medico)?($params->nombre_profesional_no_medico!=""?$params->nombre_profesional_no_medico:null):null;
                    $emergencia->peso = isset($params->peso)?($params->peso!=""?$params->peso:null):null;
                    $emergencia->talla = isset($params->talla)?($params->talla!=""?$params->talla:null):null;
                    $emergencia->idups_proc = isset($params->idups_proc)?($params->idups_proc!=""?$params->idups_proc:null):null;
                    $emergencia->save();

                    if(isset($params->detalle_medicamento)){
                        foreach($params->detalle_medicamento as $item){
                            $sql_medicamento = "INSERT INTO detalle_medicamento (idemergencia, idmedicamento, descripcion_medicamento, cantidad, idemergencia_tratamiento, estado) VALUES (?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_medicamento, [$$emergencia->id, $item->id, $item->descripcion, isset($item->cantidad)?$item->cantidad:null, null, 1]);
                        }
                    }

                    // Personal medico
                    if(isset($params->detalle_his)){
                        foreach($params->detalle_his as $item){
                            $sql_his = "INSERT INTO actividades_his (idemergencia, idemergencia_tratamiento, idhospitalizacion, idregistrador, idprofesional, cod_2000, codigo_ups, ups, condicion_establecimiento, condicion_servicio, fecha, codigo_cie, descripcion_cie, tipodianostico, lab1, lab2, lab3, item, impresion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_his, [
                                $emergencia->id, null, null, Session::get('idusuario'), isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null,
                                isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                                isset($params->idups)?($params->idups!=""?$params->idups:null):null,
                                isset($params->descripcion_ups)?($params->descripcion_ups!=""?$params->descripcion_ups:null):null,
                                isset($params->condicion_establecimiento)?($params->condicion_establecimiento!=""?$params->condicion_establecimiento:null):null,
                                isset($params->condicion_servicio)?($params->condicion_servicio!=""?$params->condicion_servicio:null):null,
                                isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                                isset($item->codigo_cie)?$item->codigo_cie:null,
                                isset($item->descripcion_cie)?$item->descripcion_cie:null,
                                isset($item->tipo_diagnostico)?$item->tipo_diagnostico:'D',
                                isset($item->lab1)?$item->lab1:null,
                                isset($item->lab2)?$item->lab2:null,
                                isset($item->lab3)?$item->lab3:null,
                                isset($item->item)?$item->item:null,
                                isset($item->impresion)?$item->impresion:0,
                                1
                            ]);
                        }
                    }

                    // Personal no medico
                    if(isset($params->detalle_his_nm)){
                        foreach($params->detalle_his_nm as $item){
                            $sql_his = "INSERT INTO actividades_his (idemergencia, idemergencia_tratamiento, idhospitalizacion, idregistrador, idprofesional, cod_2000, codigo_ups, ups, condicion_establecimiento, condicion_servicio, fecha, codigo_cie, descripcion_cie, tipodianostico, lab1, lab2, lab3, item, impresion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_his, [
                                $emergencia->id, null, null, Session::get('idusuario'), isset($params->idprofesional_no_medico)?($params->idprofesional_no_medico!=""?$params->idprofesional_no_medico:null):null,
                                isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                                isset($params->idups_procedimiento)?($params->idups_procedimiento!=""?$params->idups_procedimiento:null):null,
                                isset($params->descripcion_ups_proc)?($params->descripcion_ups_proc!=""?$params->descripcion_ups_proc:null):null,
                                isset($params->condicion_establecimiento)?($params->condicion_establecimiento!=""?$params->condicion_establecimiento:null):null,
                                isset($params->condicion_servicio)?($params->condicion_servicio!=""?$params->condicion_servicio:null):null,
                                isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                                isset($item->codigo_cie)?$item->codigo_cie:null,
                                isset($item->descripcion_cie)?$item->descripcion_cie:null,
                                isset($item->tipo_diagnostico)?$item->tipo_diagnostico:'D',
                                isset($item->lab1)?$item->lab1:null,
                                isset($item->lab2)?$item->lab2:null,
                                isset($item->lab3)?$item->lab3:null,
                                isset($item->item)?$item->item:null,
                                isset($item->impresion)?$item->impresion:0,
                                1
                            ]);
                        }
                    }
                }else{
                    //registramos los nuevos datos
                    //registramos los datos de la persona
                    $sql_persona = "INSERT INTO persona (tipo_documento, nro_documento, apellido_paterno, apellido_materno, nombres, sexo, idubigeo, direccion, fecha_nacimiento, telefono, estado, fecha_registro, idetnia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                    DB::insert($sql_persona, [
                        isset($params->tipo_documento)?$params->tipo_documento:null, isset($params->nro_documento)?$params->nro_documento:null,
                        isset($params->apellido_paterno)?strtoupper($params->apellido_paterno):null,
                        isset($params->apellido_materno)?strtoupper($params->apellido_materno):null,
                        isset($params->nombres)?strtoupper($params->nombres):null,
                        isset($params->sexo)?($params->sexo!=""?strtoupper($params->sexo):null):null,
                        isset($params->idubigeo)?($params->idubigeo!=""?$params->idubigeo:null):null,
                        isset($params->direccion)?($params->direccion!=""?strtoupper($params->direccion):null):null,
                        isset($params->fecha_nacimiento)?($params->fecha_nacimiento!=""?Util::convertirStringFecha($params->fecha_nacimiento, false):null):null,
                        isset($params->telefono)?($params->telefono!=""?$params->telefono:null):null,
                        1,
                        date('Y-m-d H:i:s'),
                        isset($params->idetnia)?($params->idetnia!=""?$params->idetnia:null):null
                    ]);
                    //obtenemos el ultimo id de la persona registrado
                    $idpersona = DB::selectOne("SELECT MAX(id) as idpersona FROM persona");

                    //registramos la emergencia
                    $emergencia = new Emergencia();
                    $emergencia->cod_2000 = $params->cod_2000;
                    $emergencia->fecha_atencion = Util::convertirStringFecha($params->fecha_atencion, false);
                    $emergencia->hora_atencion = $params->hora_atencion;
                    $emergencia->hc = isset($params->hc)?($params->hc!=""?$params->hc:null):null;
                    $emergencia->idfinanciador = isset($params->idfinanciador)?($params->idfinanciador!=""?$params->idfinanciador:null):null;
                    $emergencia->edad = isset($params->edad)?($params->edad!=""?$params->edad:null):null;
                    $emergencia->tipo_edad = isset($params->tipo_edad)?($params->tipo_edad!=""?strtoupper($params->tipo_edad):null):null;
                    $emergencia->idpersona = $idpersona->idpersona;
                    $emergencia->tipo_doc_acomp = isset($params->tipo_doc_acomp)?($params->tipo_doc_acomp!=""?$params->tipo_doc_acomp:null):null;
                    $emergencia->nro_doc_acomp = isset($params->nro_doc_acomp)?($params->nro_doc_acomp!=""?$params->nro_doc_acomp:null):null;
                    $emergencia->nombre_acomp = isset($params->nombre_acomp)?($params->nombre_acomp!=""?strtoupper($params->nombre_acomp):null):null;
                    $emergencia->telefono_acomp = isset($params->telefono_acomp)?($params->telefono_acomp!=""?$params->telefono_acomp:null):null;
                    $emergencia->idmotivo_atencion = isset($params->idmotivo_atencion)?($params->idmotivo_atencion!=""?$params->idmotivo_atencion:null):null;
                    $emergencia->idubigeo_lugar_ocurrencia = isset($params->idubigeo_lugar_ocurrencia)?($params->idubigeo_lugar_ocurrencia!=""?$params->idubigeo_lugar_ocurrencia:null):null;
                    $emergencia->idups = isset($params->idups)?($params->idups!=""?$params->idups:null):null;
                    $emergencia->idcondicion_salida = isset($params->idcondicion_salida)?($params->idcondicion_salida!=""?$params->idcondicion_salida:null):null;
                    $emergencia->fecha_salida = isset($params->fecha_salida)?($params->fecha_salida!=""?Util::convertirStringFecha($params->fecha_salida, false):null):null;
                    $emergencia->hora_salida = isset($params->hora_salida)?($params->hora_salida!=""?$params->hora_salida:null):null;
                    $emergencia->iddestino = isset($params->iddestino)?($params->iddestino!=""?$params->iddestino:null):null;
                    $emergencia->cod_2000_referencia = isset($params->cod_2000_referencia)?($params->cod_2000_referencia!=""?$params->cod_2000_referencia:null):null;
                    $emergencia->idups_hospitalizacion = isset($params->idups_hospitalizacion)?($params->idups_hospitalizacion!=""?$params->idups_hospitalizacion:null):null;
                    $emergencia->idprofesional = isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null;
                    $emergencia->nro_doc_profecional = isset($params->nro_doc_profecional)?($params->nro_doc_profecional!=""?$params->nro_doc_profecional:null):null;
                    $emergencia->nombre_profesional = isset($params->nombre_profesional)?($params->nombre_profesional!=""?strtoupper($params->nombre_profesional):null):null;
                    $emergencia->dx1_si_no = isset($params->dx1_si_no)?($params->dx1_si_no!=""?$params->dx1_si_no:null):null;
                    $emergencia->codigo_dx1 = isset($params->codigo_dx1)?($params->codigo_dx1!=""?strtoupper($params->codigo_dx1):null):null;
                    $emergencia->descripcion_dx1 = isset($params->descripcion_dx1)?($params->descripcion_dx1!=""?strtoupper($params->descripcion_dx1):null):null;
                    $emergencia->tipo_diagnostico_dx1 = isset($params->tipo_diagnostico_dx1)?($params->tipo_diagnostico_dx1!=""?strtoupper($params->tipo_diagnostico_dx1):null):null;
                    $emergencia->dx2_si_no = isset($params->dx2_si_no)?($params->dx2_si_no!=""?$params->dx2_si_no:null):null;
                    $emergencia->codigo_dx2 = isset($params->codigo_dx2)?($params->codigo_dx2!=""?strtoupper($params->codigo_dx2):null):null;
                    $emergencia->descripcion_dx2 = isset($params->descripcion_dx2)?($params->descripcion_dx2!=""?strtoupper($params->descripcion_dx2):null):null;
                    $emergencia->tipo_diagnostico_dx2 = isset($params->tipo_diagnostico_dx2)?($params->tipo_diagnostico_dx2!=""?strtoupper($params->tipo_diagnostico_dx2):null):null;
                    $emergencia->dx3_si_no = isset($params->dx3_si_no)?($params->dx3_si_no!=""?$params->dx3_si_no:null):null;
                    $emergencia->codigo_dx3 = isset($params->codigo_dx3)?($params->codigo_dx3!=""?strtoupper($params->codigo_dx3):null):null;
                    $emergencia->descripcion_dx3 = isset($params->descripcion_dx3)?($params->descripcion_dx3!=""?strtoupper($params->descripcion_dx3):null):null;
                    $emergencia->tipo_diagnostico_dx3 = isset($params->tipo_diagnostico_dx3)?($params->tipo_diagnostico_dx3!=""?strtoupper($params->tipo_diagnostico_dx3):null):null;
                    $emergencia->dx4_si_no = isset($params->dx4_si_no)?($params->dx4_si_no!=""?$params->dx4_si_no:null):null;
                    $emergencia->codigo_dx4 = isset($params->codigo_dx4)?($params->codigo_dx4!=""?strtoupper($params->codigo_dx4):null):null;
                    $emergencia->descripcion_dx4 = isset($params->descripcion_dx4)?($params->descripcion_dx4!=""?strtoupper($params->descripcion_dx4):null):null;
                    $emergencia->tipo_diagnostico_dx4 = isset($params->tipo_diagnostico_dx4)?($params->tipo_diagnostico_dx4!=""?strtoupper($params->tipo_diagnostico_dx4):null):null;
                    $emergencia->proc1_si_no = isset($params->proc1_si_no)?($params->proc1_si_no!=""?$params->proc1_si_no:null):null;
                    $emergencia->codigo_proc_1 = isset($params->codigo_proc_1)?($params->codigo_proc_1!=""?strtoupper($params->codigo_proc_1):null):null;
                    $emergencia->descripcion_proc_1 = isset($params->descripcion_proc_1)?($params->descripcion_proc_1!=""?strtoupper($params->descripcion_proc_1):null):null;
                    $emergencia->proc2_si_no = isset($params->proc2_si_no)?($params->proc2_si_no!=""?$params->proc2_si_no:null):null;
                    $emergencia->codigo_proc_2 = isset($params->codigo_proc_2)?($params->codigo_proc_2!=""?strtoupper($params->codigo_proc_2):null):null;
                    $emergencia->descripcion_proc_2 = isset($params->descripcion_proc_2)?($params->descripcion_proc_2!=""?strtoupper($params->descripcion_proc_2):null):null;
                    $emergencia->proc3_si_no = isset($params->proc3_si_no)?($params->proc3_si_no!=""?$params->proc3_si_no:null):null;
                    $emergencia->codigo_proc_3 = isset($params->codigo_proc_3)?($params->codigo_proc_3!=""?strtoupper($params->codigo_proc_3):null):null;
                    $emergencia->descripcion_proc_3 = isset($params->descripcion_proc_3)?($params->descripcion_proc_3!=""?strtoupper($params->descripcion_proc_3):null):null;
                    $emergencia->proc4_si_no = isset($params->proc4_si_no)?($params->proc4_si_no!=""?$params->proc4_si_no:null):null;

                    $emergencia->codigo_proc_4 = isset($params->codigo_proc_4)?($params->codigo_proc_4!=""?strtoupper($params->codigo_proc_4):null):null;
                    $emergencia->descripcion_proc_4 = isset($params->descripcion_proc_4)?($params->descripcion_proc_4!=""?strtoupper($params->descripcion_proc_4):null):null;
                    $emergencia->tipo_actividad = isset($params->tipo_actividad)?($params->tipo_actividad!=""?strtoupper($params->tipo_actividad):null):null;
                    $emergencia->idusuario_registro = Session::get('idusuario');
                    $emergencia->fecha_registro = date('Y-m-d H:i:s');
                    
                    $emergencia->presion_sistolica = isset($params->presion_sistolica)?($params->presion_sistolica!=""?$params->presion_sistolica:null):null;
                    $emergencia->presion_diastolica = isset($params->presion_diastolica)?($params->presion_diastolica!=""?$params->presion_diastolica:null):null;
                    $emergencia->presion_arterial_media = isset($params->presion_arterial_media)?($params->presion_arterial_media!=""?$params->presion_arterial_media:null):null;
                    $emergencia->saturacion_oxigeno = isset($params->saturacion_oxigeno)?($params->saturacion_oxigeno!=""?$params->saturacion_oxigeno:null):null;
                    $emergencia->frecuencia_cardiaca = isset($params->frecuencia_cardiaca)?($params->frecuencia_cardiaca!=""?$params->frecuencia_cardiaca:null):null;
                    $emergencia->frecuencia_respiratoria = isset($params->frecuencia_respiratoria)?($params->frecuencia_respiratoria!=""?$params->frecuencia_respiratoria:null):null;
                    $emergencia->temperatura = isset($params->temperatura)?($params->temperatura!=""?$params->temperatura:null):null;
                    $emergencia->area_atencion = isset($params->area_atencion)?($params->area_atencion!=""?$params->area_atencion:null):null;
                    $emergencia->tratamiento_adicional = isset($params->tratamiento_adicional)?($params->tratamiento_adicional!=""?$params->tratamiento_adicional:null):null;
                    $emergencia->nro_dia_tratamiento = isset($params->nro_dia_tratamiento)?($params->nro_dia_tratamiento!=""?$params->nro_dia_tratamiento:null):null;
                    $emergencia->estado = 1;
                    $emergencia->idprofesional_no_medico = isset($params->idprofesional_no_medico)?($params->idprofesional_no_medico!=""?$params->idprofesional_no_medico:null):null;
                    $emergencia->nro_doc_profecional_no_medico = isset($params->nro_doc_profecional_no_medico)?($params->nro_doc_profecional_no_medico!=""?$params->nro_doc_profecional_no_medico:null):null;
                    $emergencia->nombre_profesional_no_medico = isset($params->nombre_profesional_no_medico)?($params->nombre_profesional_no_medico!=""?$params->nombre_profesional_no_medico:null):null;
                    $emergencia->peso = isset($params->peso)?($params->peso!=""?$params->peso:null):null;
                    $emergencia->talla = isset($params->talla)?($params->talla!=""?$params->talla:null):null;
                    $emergencia->idups_proc = isset($params->idups_proc)?($params->idups_proc!=""?$params->idups_proc:null):null;
                    $emergencia->save();
                    

                    if(isset($params->detalle_medicamento)){
                        foreach($params->detalle_medicamento as $item){
                            $sql_medicamento = "INSERT INTO detalle_medicamento (idemergencia, idmedicamento, descripcion_medicamento, cantidad, idemergencia_tratamiento, estado) VALUES (?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_medicamento, [$emergencia->id, $item->id, $item->descripcion, isset($item->cantidad)?$item->cantidad:null, null, 1]);
                        }
                    }

                    if(isset($params->detalle_his)){
                        foreach($params->detalle_his as $item){
                            $sql_his = "INSERT INTO actividades_his (idemergencia, idemergencia_tratamiento, idhospitalizacion, idregistrador, idprofesional, cod_2000, codigo_ups, ups, condicion_establecimiento, condicion_servicio, fecha, codigo_cie, descripcion_cie, tipodianostico, lab1, lab2, lab3, item, impresion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_his, [
                                $emergencia->id, null, null, Session::get('idusuario'), isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null,
                                isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                                isset($params->idups)?($params->idups!=""?$params->idups:null):null,
                                isset($params->descripcion_ups)?($params->descripcion_ups!=""?$params->descripcion_ups:null):null,
                                isset($params->condicion_establecimiento)?($params->condicion_establecimiento!=""?$params->condicion_establecimiento:null):null,
                                isset($params->condicion_servicio)?($params->condicion_servicio!=""?$params->condicion_servicio:null):null,
                                isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                                isset($item->codigo_cie)?$item->codigo_cie:null,
                                isset($item->descripcion_cie)?$item->descripcion_cie:null,
                                isset($item->tipo_diagnostico)?$item->tipo_diagnostico:'D',
                                isset($item->lab1)?$item->lab1:null,
                                isset($item->lab2)?$item->lab2:null,
                                isset($item->lab3)?$item->lab3:null,
                                isset($item->item)?$item->item:null,
                                isset($item->impresion)?$item->impresion:0,
                                1
                            ]);
                        }
                    }

                    // Personal no medico
                    if(isset($params->detalle_his_nm)){
                        foreach($params->detalle_his_nm as $item){
                            $sql_his = "INSERT INTO actividades_his (idemergencia, idemergencia_tratamiento, idhospitalizacion, idregistrador, idprofesional, cod_2000, codigo_ups, ups, condicion_establecimiento, condicion_servicio, fecha, codigo_cie, descripcion_cie, tipodianostico, lab1, lab2, lab3, item, impresion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_his, [
                                $emergencia->id, null, null, Session::get('idusuario'), isset($params->idprofesional_no_medico)?($params->idprofesional_no_medico!=""?$params->idprofesional_no_medico:null):null,
                                isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                                isset($params->idups_procedimiento)?($params->idups_procedimiento!=""?$params->idups_procedimiento:null):null,
                                isset($params->descripcion_ups_proc)?($params->descripcion_ups_proc!=""?$params->descripcion_ups_proc:null):null,
                                isset($params->condicion_establecimiento)?($params->condicion_establecimiento!=""?$params->condicion_establecimiento:null):null,
                                isset($params->condicion_servicio)?($params->condicion_servicio!=""?$params->condicion_servicio:null):null,
                                isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                                isset($item->codigo_cie)?$item->codigo_cie:null,
                                isset($item->descripcion_cie)?$item->descripcion_cie:null,
                                isset($item->tipo_diagnostico)?$item->tipo_diagnostico:'D',
                                isset($item->lab1)?$item->lab1:null,
                                isset($item->lab2)?$item->lab2:null,
                                isset($item->lab3)?$item->lab3:null,
                                isset($item->item)?$item->item:null,
                                isset($item->impresion)?$item->impresion:0,
                                1
                            ]);
                        }
                    }
                }
            }
            return $data;
        }catch (\Exception $ex){
            $data['confirm'] = false;
            $data['code'] = 401;
            $data['message'] = 'Error: '.$ex->getMessage();
            return $data;
        }
    }

    public function guardarTratamientoEmergencia($params){
        try{
            if(isset($params->idemergencia_tratamiento)){
                //editamos
                $sql = "UPDATE emergencia_tratamiento SET cod_2000=:cod_2000, fecha_atencion=:fecha_atencion, hora_atencion=:hora_atencion, idprofesional=:idprofesional, nro_doc_profecional=:nro_doc_profecional, nombre_profesional=:nombre_profesional,
                    idups=:idups, presion_sistolica=:presion_sistolica, presion_diastolica=:presion_diastolica, presion_arterial_media=:presion_arterial_media, saturacion_oxigeno=:saturacion_oxigeno, frecuencia_cardiaca=:frecuencia_cardiaca, frecuencia_respiratoria=:frecuencia_respiratoria,
                    temperatura=:temperatura, area_atencion=:area_atencion, dx1_si_no=:dx1_si_no, codigo_dx1=:codigo_dx1, descripcion_dx1=:descripcion_dx1, tipo_diagnostico_dx1=:tipo_diagnostico_dx1, dx2_si_no=:dx2_si_no, codigo_dx2=:codigo_dx2, descripcion_dx2=:descripcion_dx2,
                    tipo_diagnostico_dx2=:tipo_diagnostico_dx2, dx3_si_no=:dx3_si_no, codigo_dx3=:codigo_dx3, descripcion_dx3=:descripcion_dx3, tipo_diagnostico_dx3=:tipo_diagnostico_dx3, dx4_si_no=:dx4_si_no, codigo_dx4=:codigo_dx4, descripcion_dx4=:descripcion_dx4,
                    tipo_diagnostico_dx4=:tipo_diagnostico_dx4, proc1_si_no=:proc1_si_no, codigo_proc_1=:codigo_proc_1, descripcion_proc_1=:descripcion_proc_1, lab1_1=:lab1_1, lab1_2=:lab1_2, lab1_3=:lab1_3, proc2_si_no=:proc2_si_no, codigo_proc_2=:codigo_proc_2,
                    descripcion_proc_2=:descripcion_proc_2, lab2_1=:lab2_1, lab2_2=:lab2_2, lab2_3=:lab2_3, proc3_si_no=:proc3_si_no, codigo_proc_3=:codigo_proc_3, descripcion_proc_3=:descripcion_proc_3, lab3_1=:lab3_1, lab3_2=:lab3_2, lab3_3=:lab3_3, proc4_si_no=:proc4_si_no,
                    codigo_proc_4=:codigo_proc_4, descripcion_proc_4=:descripcion_proc_4, lab4_1=:lab4_1, lab4_2=:lab4_2, lab4_3=:lab4_3, idusuario_modificacion=:idusuario_modificacion, fecha_modificacion=:fecha_modificacion, tipo_profesional_procedimiento=:tipo_profesional_procedimiento, idprofesional_no_medico=:idprofesional_no_medico,
                    nro_doc_profecional_no_medico=:nro_doc_profecional_no_medico, nombre_profesional_no_medico=:nombre_profesional_no_medico WHERE id=:id;";
                DB::update($sql, array(
                    'cod_2000' => isset($params->cod_2000)?$params->cod_2000:null,
                    'fecha_atencion' => isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                    'hora_atencion' => isset($params->hora_atencion)?($params->hora_atencion!=""?$params->hora_atencion:null):null,
                    'idprofesional' => isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null,
                    'nro_doc_profecional' => isset($params->nro_doc_profecional)?($params->nro_doc_profecional!=""?$params->nro_doc_profecional:null):null,
                    'nombre_profesional' => isset($params->nombre_profesional)?($params->nombre_profesional!=""?$params->nombre_profesional:null):null,
                    'idups' => isset($params->idups)?($params->idups!=""?$params->idups:null):null,
                    'presion_sistolica' => isset($params->presion_sistolica)?($params->presion_sistolica!=""?$params->presion_sistolica:null):null,
                    'presion_diastolica' => isset($params->presion_diastolica)?($params->presion_diastolica!=""?$params->presion_diastolica:null):null,
                    'presion_arterial_media' => isset($params->presion_arterial_media)?($params->presion_arterial_media!=""?$params->presion_arterial_media:null):null,
                    'saturacion_oxigeno' => isset($params->saturacion_oxigeno)?($params->saturacion_oxigeno!=""?$params->saturacion_oxigeno:null):null,
                    'frecuencia_cardiaca' => isset($params->frecuencia_cardiaca)?($params->frecuencia_cardiaca!=""?$params->frecuencia_cardiaca:null):null,
                    'frecuencia_respiratoria' => isset($params->frecuencia_respiratoria)?($params->frecuencia_respiratoria!=""?$params->frecuencia_respiratoria:null):null,
                    'temperatura' => isset($params->temperatura)?($params->temperatura!=""?$params->temperatura:null):null,
                    'area_atencion' => isset($params->area_atencion)?($params->area_atencion!=""?$params->area_atencion:null):null,
                    'dx1_si_no' => isset($params->dx1_si_no)?($params->dx1_si_no!=""?$params->dx1_si_no:null):null,
                    'codigo_dx1' => isset($params->codigo_dx1)?($params->codigo_dx1!=""?$params->codigo_dx1:null):null,
                    'descripcion_dx1' => isset($params->descripcion_dx1)?($params->descripcion_dx1!=""?$params->descripcion_dx1:null):null,
                    'tipo_diagnostico_dx1' => isset($params->tipo_diagnostico_dx1)?($params->tipo_diagnostico_dx1!=""?$params->tipo_diagnostico_dx1:null):null,
                    'dx2_si_no' => isset($params->dx2_si_no)?($params->dx2_si_no!=""?$params->dx2_si_no:null):null,
                    'codigo_dx2' => isset($params->codigo_dx2)?($params->codigo_dx2!=""?$params->codigo_dx2:null):null,
                    'descripcion_dx2' => isset($params->descripcion_dx2)?($params->descripcion_dx2!=""?$params->descripcion_dx2:null):null,
                    'tipo_diagnostico_dx2' => isset($params->tipo_diagnostico_dx2)?($params->tipo_diagnostico_dx2!=""?$params->tipo_diagnostico_dx2:null):null,
                    'dx3_si_no' => isset($params->dx3_si_no)?($params->dx3_si_no!=""?$params->dx3_si_no:null):null,
                    'codigo_dx3' => isset($params->codigo_dx3)?($params->codigo_dx3!=""?$params->codigo_dx3:null):null,
                    'descripcion_dx3' => isset($params->descripcion_dx3)?($params->descripcion_dx3!=""?$params->descripcion_dx3:null):null,
                    'tipo_diagnostico_dx3' => isset($params->tipo_diagnostico_dx3)?($params->tipo_diagnostico_dx3!=""?$params->tipo_diagnostico_dx3:null):null,
                    'dx4_si_no' => isset($params->dx4_si_no)?($params->dx4_si_no!=""?$params->dx4_si_no:null):null,
                    'codigo_dx4' => isset($params->codigo_dx4)?($params->codigo_dx4!=""?$params->codigo_dx4:null):null,
                    'descripcion_dx4' => isset($params->descripcion_dx4)?($params->descripcion_dx4!=""?$params->descripcion_dx4:null):null,
                    'tipo_diagnostico_dx4' => isset($params->tipo_diagnostico_dx4)?($params->tipo_diagnostico_dx4!=""?$params->tipo_diagnostico_dx4:null):null,
                    'proc1_si_no' => isset($params->proc1_si_no)?($params->proc1_si_no!=""?$params->proc1_si_no:null):null,
                    'codigo_proc_1' => isset($params->codigo_proc_1)?($params->codigo_proc_1!=""?$params->codigo_proc_1:null):null,
                    'descripcion_proc_1' => isset($params->descripcion_proc_1)?($params->descripcion_proc_1!=""?$params->descripcion_proc_1:null):null,
                    'lab1_1' => isset($params->lab1_1)?($params->lab1_1!=""?$params->lab1_1:null):null,
                    'lab1_2' => isset($params->lab1_2)?($params->lab1_2!=""?$params->lab1_2:null):null,
                    'lab1_3' => isset($params->lab1_3)?($params->lab1_3!=""?$params->lab1_3:null):null,
                    'proc2_si_no' => isset($params->proc2_si_no)?($params->proc2_si_no!=""?$params->proc2_si_no:null):null,
                    'codigo_proc_2' => isset($params->codigo_proc_2)?($params->codigo_proc_2!=""?$params->codigo_proc_2:null):null,
                    'descripcion_proc_2' => isset($params->descripcion_proc_2)?($params->descripcion_proc_2!=""?$params->descripcion_proc_2:null):null,
                    'lab2_1' => isset($params->lab2_1)?($params->lab2_1!=""?$params->lab2_1:null):null,isset($params->lab2_2)?($params->lab2_2!=""?$params->lab2_2:null):null,
                    'lab2_3' => isset($params->lab2_3)?($params->lab2_3!=""?$params->lab2_3:null):null,
                    'proc3_si_no' => isset($params->proc3_si_no)?($params->proc3_si_no!=""?$params->proc3_si_no:null):null,
                    'codigo_proc_3' => isset($params->codigo_proc_3)?($params->codigo_proc_3!=""?$params->codigo_proc_3:null):null,
                    'descripcion_proc_3' => isset($params->descripcion_proc_3)?($params->descripcion_proc_3!=""?$params->descripcion_proc_3:null):null,
                    'lab3_1' => isset($params->lab3_1)?($params->lab3_1!=""?$params->lab3_1:null):null,
                    'lab3_2' => isset($params->lab3_2)?($params->lab3_2!=""?$params->lab3_2:null):null,
                    'lab3_3' => isset($params->lab3_3)?($params->lab3_3!=""?$params->lab3_3:null):null,
                    'proc4_si_no' => isset($params->proc4_si_no)?($params->proc4_si_no!=""?$params->proc4_si_no:null):null,
                    'codigo_proc_4' => isset($params->codigo_proc_4)?($params->codigo_proc_4!=""?$params->codigo_proc_4:null):null,
                    'descripcion_proc_4' => isset($params->descripcion_proc_4)?($params->descripcion_proc_4!=""?$params->descripcion_proc_4:null):null,
                    'lab4_1' => isset($params->lab4_1)?($params->lab4_1!=""?$params->lab4_1:null):null,
                    'lab4_2' => isset($params->lab4_2)?($params->lab4_2!=""?$params->lab4_2:null):null,
                    'lab4_3' => isset($params->lab4_3)?($params->lab4_3!=""?$params->lab4_3:null):null,
                    Session::get('idusuario'),
                    date('Y-m-d H:i:s'),
                    'tipo_profesional_procedimiento' => isset($params->tipo_profesional_procedimiento)?($params->tipo_profesional_procedimiento!=""?$params->tipo_profesional_procedimiento:null):null,
                    'idprofesional_no_medico' => isset($params->idprofesional_no_medico)?($params->idprofesional_no_medico!=""?$params->idprofesional_no_medico:null):null,
                    'nro_doc_profecional_no_medico' => isset($params->nro_doc_profecional_no_medico)?($params->nro_doc_profecional_no_medico!=""?$params->nro_doc_profecional_no_medico:null):null,
                    'nombre_profesional_no_medico' => isset($params->nombre_profesional_no_medico)?($params->nombre_profesional_no_medico!=""?$params->nombre_profesional_no_medico:null):null,
                    'id' => $params->idemergencia_tratamiento
                ));
                if(isset($params->detalle_medicamento)){
                    foreach($params->detalle_medicamento as $item){
                        if(isset($item->id)){
                            $sql_medicamento = "UPDATE detalle_medicamento SET idmedicamento=:idmedicamento, descripcion_medicamento=:descripcion_medicamento, cantidad=:cantidad WHERE id=:id;";
                            DB::update($sql_medicamento, array('idmedicamento' => $item->idmedicamento, 'descripcion_medicamento' => $item->descripcion, 'cantidad' => $item->cantidad, 'id' => $item->id));
                        }else{
                            //registramos nuevos medicamentos
                            $sql_medicamento = "INSERT INTO detalle_medicamento (idemergencia, idmedicamento, descripcion_medicamento, cantidad, idemergencia_tratamiento, estado) VALUES (?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_medicamento, [null, $item->idmedicamento, $item->descripcion, isset($item->cantidad)?$item->cantidad:null, $params->idemergencia_tratamiento, 1]);
                        }
                    }
                }
                if(isset($params->nro_dia_tratamiento)){
                    if($params->nro_dia_tratamiento == $params->nro_tratamiento){
                        $sql_upd = "UPDATE emergencia SET estado=:estado WHERE id=:id;";
                        DB::update($sql_upd, array('estado' => 2, 'id' => $params->idemergencia));
                    }
                }

                if(isset($params->detalle_his)){
                    foreach($params->detalle_his as $item){
                        if(isset($item->id)){
                            //
                        }else{
                            $sql_his = "INSERT INTO actividades_his (idemergencia, idemergencia_tratamiento, idhospitalizacion, idregistrador, idprofesional, cod_2000,
                                codigo_ups, ups, condicion_establecimiento, condicion_servicio, fecha, codigo_cie, descripcion_cie, tipodianostico, lab1, lab2, lab3, item, impresion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                            DB::insert($sql_his, [
                                null, $params->idemergencia_tratamiento, null, Session::get('idusuario'), isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null,
                                isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                                isset($params->idups)?($params->idups!=""?$params->idups:null):null,
                                isset($params->descripcion_ups)?($params->descripcion_ups!=""?$params->descripcion_ups:null):null,
                                isset($params->condicion_establecimiento)?($params->condicion_establecimiento!=""?$params->condicion_establecimiento:null):null,
                                isset($params->condicion_servicio)?($params->condicion_servicio!=""?$params->condicion_servicio:null):null,
                                isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                                isset($item->codigo_cie)?$item->codigo_cie:null,
                                isset($item->descripcion_cie)?$item->descripcion_cie:null,
                                isset($item->tipodianostico)?$item->tipodianostico:'D',
                                isset($item->lab1)?$item->lab1:null,
                                isset($item->lab2)?$item->lab2:null,
                                isset($item->lab3)?$item->lab3:null,
                                isset($item->item)?$item->item:null,
                                isset($item->impresion)?$item->impresion:0,
                                1
                            ]);
                        }
                    }
                }
            }else{
                //guardamos
                $sql = "INSERT INTO emergencia_tratamiento (idemergencia, nro_tratamiento, cod_2000, fecha_atencion, hora_atencion, hc, idprofesional, nro_doc_profecional, nombre_profesional, idups, presion_sistolica, presion_diastolica, presion_arterial_media,
                    saturacion_oxigeno, frecuencia_cardiaca, frecuencia_respiratoria, temperatura, area_atencion, dx1_si_no, codigo_dx1, descripcion_dx1, tipo_diagnostico_dx1, dx2_si_no, codigo_dx2, descripcion_dx2, tipo_diagnostico_dx2, dx3_si_no, codigo_dx3, descripcion_dx3, tipo_diagnostico_dx3,
                    dx4_si_no, codigo_dx4, descripcion_dx4, tipo_diagnostico_dx4, proc1_si_no, codigo_proc_1, descripcion_proc_1, lab_p1_1, lab_p1_2, lab_p1_3, proc2_si_no, codigo_proc_2, descripcion_proc_2, lab_p2_1, lab_p2_2, lab_p2_3, proc3_si_no, codigo_proc_3, descripcion_proc_3, lab_p3_1, lab_p3_2, lab_p3_3,
                    proc4_si_no, codigo_proc_4, descripcion_proc_4, lab_p4_1, lab_p4_2, lab_p4_3, idusuario_registro, fecha_registro, idusuario_modificacion, fecha_modificacion, estado, tipo_profesional_procedimiento, idprofesional_no_medico, nro_doc_profecional_no_medico, nombre_profesional_no_medico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                DB::insert($sql, [
                    isset($params->idemergencia)?$params->idemergencia:null,
                    isset($params->nro_tratamiento)?$params->nro_tratamiento:null,
                    isset($params->cod_2000)?$params->cod_2000:null,
                    isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                    isset($params->hora_atencion)?($params->hora_atencion!=""?$params->hora_atencion:null):null,
                    isset($params->hc)?($params->hc!=""?$params->hc:null):null,
                    isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null,
                    isset($params->nro_doc_profecional)?($params->nro_doc_profecional!=""?$params->nro_doc_profecional:null):null,
                    isset($params->nombre_profesional)?($params->nombre_profesional!=""?$params->nombre_profesional:null):null,
                    isset($params->idups)?($params->idups!=""?$params->idups:null):null,
                    isset($params->presion_sistolica)?($params->presion_sistolica!=""?$params->presion_sistolica:null):null,
                    isset($params->presion_diastolica)?($params->presion_diastolica!=""?$params->presion_diastolica:null):null,
                    isset($params->presion_arterial_media)?($params->presion_arterial_media!=""?$params->presion_arterial_media:null):null,
                    isset($params->saturacion_oxigeno)?($params->saturacion_oxigeno!=""?$params->saturacion_oxigeno:null):null,
                    isset($params->frecuencia_cardiaca)?($params->frecuencia_cardiaca!=""?$params->frecuencia_cardiaca:null):null,
                    isset($params->frecuencia_respiratoria)?($params->frecuencia_respiratoria!=""?$params->frecuencia_respiratoria:null):null,
                    isset($params->temperatura)?($params->temperatura!=""?$params->temperatura:null):null,
                    isset($params->area_atencion)?($params->area_atencion!=""?$params->area_atencion:null):null,
                    isset($params->dx1_si_no)?($params->dx1_si_no!=""?$params->dx1_si_no:null):null,
                    isset($params->codigo_dx1)?($params->codigo_dx1!=""?$params->codigo_dx1:null):null,
                    isset($params->descripcion_dx1)?($params->descripcion_dx1!=""?$params->descripcion_dx1:null):null,
                    isset($params->tipo_diagnostico_dx1)?($params->tipo_diagnostico_dx1!=""?$params->tipo_diagnostico_dx1:null):null,
                    isset($params->dx2_si_no)?($params->dx2_si_no!=""?$params->dx2_si_no:null):null,
                    isset($params->codigo_dx2)?($params->codigo_dx2!=""?$params->codigo_dx2:null):null,
                    isset($params->descripcion_dx2)?($params->descripcion_dx2!=""?$params->descripcion_dx2:null):null,
                    isset($params->tipo_diagnostico_dx2)?($params->tipo_diagnostico_dx2!=""?$params->tipo_diagnostico_dx2:null):null,
                    isset($params->dx3_si_no)?($params->dx3_si_no!=""?$params->dx3_si_no:null):null,
                    isset($params->codigo_dx3)?($params->codigo_dx3!=""?$params->codigo_dx3:null):null,
                    isset($params->descripcion_dx3)?($params->descripcion_dx3!=""?$params->descripcion_dx3:null):null,
                    isset($params->tipo_diagnostico_dx3)?($params->tipo_diagnostico_dx3!=""?$params->tipo_diagnostico_dx3:null):null,
                    isset($params->dx4_si_no)?($params->dx4_si_no!=""?$params->dx4_si_no:null):null,
                    isset($params->codigo_dx4)?($params->codigo_dx4!=""?$params->codigo_dx4:null):null,
                    isset($params->descripcion_dx4)?($params->descripcion_dx4!=""?$params->descripcion_dx4:null):null,
                    isset($params->tipo_diagnostico_dx4)?($params->tipo_diagnostico_dx4!=""?$params->tipo_diagnostico_dx4:null):null,
                    isset($params->proc1_si_no)?($params->proc1_si_no!=""?$params->proc1_si_no:null):null,
                    isset($params->codigo_proc_1)?($params->codigo_proc_1!=""?$params->codigo_proc_1:null):null,
                    isset($params->descripcion_proc_1)?($params->descripcion_proc_1!=""?$params->descripcion_proc_1:null):null,
                    isset($params->lab_p1_1)?($params->lab_p1_1!=""?$params->lab_p1_1:null):null,
                    isset($params->lab_p1_2)?($params->lab_p1_2!=""?$params->lab_p1_2:null):null,
                    isset($params->lab_p1_3)?($params->lab_p1_3!=""?$params->lab_p1_3:null):null,
                    isset($params->proc2_si_no)?($params->proc2_si_no!=""?$params->proc2_si_no:null):null,
                    isset($params->codigo_proc_2)?($params->codigo_proc_2!=""?$params->codigo_proc_2:null):null,
                    isset($params->descripcion_proc_2)?($params->descripcion_proc_2!=""?$params->descripcion_proc_2:null):null,
                    isset($params->lab_p2_1)?($params->lab_p2_1!=""?$params->lab_p2_1:null):null,
                    isset($params->lab_p2_2)?($params->lab_p2_2!=""?$params->lab_p2_2:null):null,
                    isset($params->lab_p2_3)?($params->lab_p2_3!=""?$params->lab_p2_3:null):null,
                    isset($params->proc3_si_no)?($params->proc3_si_no!=""?$params->proc3_si_no:null):null,
                    isset($params->codigo_proc_3)?($params->codigo_proc_3!=""?$params->codigo_proc_3:null):null,
                    isset($params->descripcion_proc_3)?($params->descripcion_proc_3!=""?$params->descripcion_proc_3:null):null,
                    isset($params->lab_p3_1)?($params->lab_p3_1!=""?$params->lab_p3_1:null):null,
                    isset($params->lab_p3_2)?($params->lab_p3_2!=""?$params->lab_p3_2:null):null,
                    isset($params->lab_p3_3)?($params->lab_p3_3!=""?$params->lab_p3_3:null):null,
                    isset($params->proc4_si_no)?($params->proc4_si_no!=""?$params->proc4_si_no:null):null,
                    isset($params->codigo_proc_4)?($params->codigo_proc_4!=""?$params->codigo_proc_4:null):null,
                    isset($params->descripcion_proc_4)?($params->descripcion_proc_4!=""?$params->descripcion_proc_4:null):null,
                    isset($params->lab_p4_1)?($params->lab_p4_1!=""?$params->lab_p4_1:null):null,
                    isset($params->lab_p4_2)?($params->lab_p4_2!=""?$params->lab_p4_2:null):null,
                    isset($params->lab_p4_3)?($params->lab_p4_3!=""?$params->lab_p4_3:null):null,
                    Session::get('idusuario'),
                    date('Y-m-d H:i:s'),
                    null,
                    null,
                    1,
                    isset($params->tipo_profesional_procedimiento)?($params->tipo_profesional_procedimiento!=""?$params->tipo_profesional_procedimiento:null):null,
                    isset($params->idprofesional_no_medico)?($params->idprofesional_no_medico!=""?$params->idprofesional_no_medico:null):null,
                    isset($params->nro_doc_profecional_no_medico)?($params->nro_doc_profecional_no_medico!=""?$params->nro_doc_profecional_no_medico:null):null,
                    isset($params->nombre_profesional_no_medico)?($params->nombre_profesional_no_medico!=""?$params->nombre_profesional_no_medico:null):null
                ]);

                $sql_id_emerg = "select MAX(id) as idemergencia_tratamiento from emergencia_tratamiento";
                $id_emerger = DB::selectOne($sql_id_emerg);

                if(isset($params->detalle_medicamento)){
                    foreach($params->detalle_medicamento as $item){
                        $sql_medicamento = "INSERT INTO detalle_medicamento (idemergencia, idmedicamento, descripcion_medicamento, cantidad, idemergencia_tratamiento, estado) VALUES (?, ?, ?, ?, ?, ?);";
                        DB::insert($sql_medicamento, [null, $item->idmedicamento, $item->descripcion, isset($item->cantidad)?$item->cantidad:null, $id_emerger->idemergencia_tratamiento, 1]);
                    }
                }
                if(isset($params->nro_dia_tratamiento)){
                    if($params->nro_dia_tratamiento == $params->nro_tratamiento){
                        $sql_upd = "UPDATE emergencia SET estado=:estado WHERE id=:id;";
                        DB::update($sql_upd, array('estado' => 2, 'id' => $params->idemergencia));
                    }
                }

                if(isset($params->detalle_his)){
                    foreach($params->detalle_his as $item){
                        $sql_his = "INSERT INTO actividades_his (idemergencia, idemergencia_tratamiento, idhospitalizacion, idregistrador, idprofesional, cod_2000,
                            codigo_ups, ups, condicion_establecimiento, condicion_servicio, fecha, codigo_cie, descripcion_cie, tipodianostico, lab1, lab2, lab3, item, impresion, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                        DB::insert($sql_his, [
                            null,
                            $id_emerger->idemergencia_tratamiento,
                            null,
                            Session::get('idusuario'),
                            isset($params->idprofesional)?($params->idprofesional!=""?$params->idprofesional:null):null,
                            isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                            isset($params->idups)?($params->idups!=""?$params->idups:null):null,
                            isset($params->descripcion_ups)?($params->descripcion_ups!=""?$params->descripcion_ups:null):null,
                            isset($params->condicion_establecimiento)?($params->condicion_establecimiento!=""?$params->condicion_establecimiento:null):null,
                            isset($params->condicion_servicio)?($params->condicion_servicio!=""?$params->condicion_servicio:null):null,
                            isset($params->fecha_atencion)?($params->fecha_atencion!=""?Util::convertirStringFecha($params->fecha_atencion, false):null):null,
                            isset($item->codigo_cie)?$item->codigo_cie:null,
                            isset($item->descripcion_cie)?$item->descripcion_cie:null,
                            isset($item->tipodianostico)?$item->tipodianostico:'D',
                            isset($item->lab1)?$item->lab1:null,
                            isset($item->lab2)?$item->lab2:null,
                            isset($item->lab3)?$item->lab3:null,
                            isset($item->item)?$item->item:0,
                            isset($item->impresion)?$item->impresion:0,
                            1
                        ]);
                    }
                }
            }
            $data['confirm'] = true;
            $data['message'] = "Se registro correctamente";
            return $data;
        }catch (\Exception $ex){
            $data['confirm'] = false;
            $data['message'] = $ex->getMessage();
            //$data['message'] = "No se pudo completar con la operación";
            return $data;
        }
    }

    public function getNumeroTratamiento($params){
        $sql = "SELECT (IFNULL(MAX(nro_tratamiento),1) + 1) AS numero FROM emergencia_tratamiento WHERE estado=1 AND idemergencia=$params->idemergencia";
        return DB::selectOne($sql);
    }

    public function getNumeroTratamientoProcedimiento($params){
        $sql = "SELECT (IFNULL(MAX(nro_tratamiento), 1) + 1) AS numero FROM emergencia_tratamiento WHERE estado=1 AND idemergencia=$params->idemergencia ".
            ($params->procedimiento == 1?" AND codigo_proc_1='$params->codigo_ciex' ":"").
            ($params->procedimiento == 2?" AND codigo_proc_2='$params->codigo_ciex' ":"").
            ($params->procedimiento == 3?" AND codigo_proc_3='$params->codigo_ciex' ":"").
            ($params->procedimiento == 4?" AND codigo_proc_4='$params->codigo_ciex' ":"");
        //$resultado = DB::selectOne($sql);
        //if($resultado)
        return DB::selectOne($sql);
    }

    public function getNumeroTratamientoProcedimientoNuevo($params){
        $sql = "SELECT (IFNULL(MAX(nro_tratamiento), 0) + 1) AS numero FROM emergencia_tratamiento WHERE estado=1 AND idemergencia=$params->idemergencia ".
            ($params->procedimiento == 1?" AND codigo_proc_1='$params->codigo_ciex' ":"").
            ($params->procedimiento == 2?" AND codigo_proc_2='$params->codigo_ciex' ":"").
            ($params->procedimiento == 3?" AND codigo_proc_3='$params->codigo_ciex' ":"").
            ($params->procedimiento == 4?" AND codigo_proc_4='$params->codigo_ciex' ":"");
        return DB::selectOne($sql);
    }

    public function listarEmergencia($params){
        $sql = "SELECT e.id AS idemergencia, e.cod_2000, DATE_FORMAT(e.fecha_atencion,'%d/%m/%Y') AS fecha_atencion, e.hora_atencion, e.hc, e.idfinanciador, e.edad, e.tipo_edad, e.idpersona, e.tipo_doc_acomp, e.nro_doc_acomp,
            e.nombre_acomp, e.telefono_acomp, e.idmotivo_atencion, e.idubigeo_lugar_ocurrencia, e.idups, e.idcondicion_salida, DATE_FORMAT(e.fecha_salida,'%d/%m/%Y') AS fecha_salida, e.hora_salida, e.iddestino, e.cod_2000_referencia,
            e.idups_hospitalizacion, e.idprofesional, e.nro_doc_profecional, e.nombre_profesional, e.dx1_si_no, e.codigo_dx1, e.descripcion_dx1, e.tipo_diagnostico_dx1, e.dx2_si_no, e.codigo_dx2, e.descripcion_dx2, e.tipo_diagnostico_dx2,
            e.dx3_si_no, e.codigo_dx3, e.descripcion_dx3, e.tipo_diagnostico_dx3, e.dx4_si_no, e.codigo_dx4, e.descripcion_dx4, e.tipo_diagnostico_dx4, e.proc1_si_no, e.codigo_proc_1, e.descripcion_proc_1, e.proc2_si_no, e.codigo_proc_2, e.descripcion_proc_2,
            e.proc3_si_no, e.codigo_proc_3, e.descripcion_proc_3, e.proc4_si_no, e.codigo_proc_4, e.descripcion_proc_4, e.tipo_actividad, e.idusuario_registro,
            per.apellido_paterno, per.apellido_materno, per.nombres, per.tipo_documento, per.nro_documento, per.telefono, DATE_FORMAT(per.fecha_nacimiento,'%d/%m/%Y') AS fecha_nacimiento, per.sexo, per.direccion, per.idetnia, per.idubigeo, e.presion_sistolica, e.presion_diastolica, e.presion_arterial_media,
            e.saturacion_oxigeno, e.frecuencia_cardiaca, e.frecuencia_respiratoria, e.temperatura, e.area_atencion, e.estado, e.tratamiento_adicional, e.nro_dia_tratamiento,
            ma.descripcion_motivo, IF(e.tipo_actividad='U', 'URGENCIA', IF(e.tipo_actividad='E', 'EMERGENCIA', IF(e.tipo_actividad='C', 'CONSULTA', NULL))) AS nom_tipo_actividad, cs.descripcion_condicion,
            mhe.nombre_establecimiento AS nom_est, mhu.descripcion_ups, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.nombres_personal,
            (SELECT IFNULL(MAX(et1.nro_tratamiento), 1) AS nro_tratamiento FROM salud_emergencia.emergencia_tratamiento et1 WHERE et1.estado=1 AND et1.idemergencia=e.id LIMIT 1 ) AS nro_tratamiento,
	        IFNULL(nro_dia_tratamiento, 1) AS nro_trat_dia
            FROM emergencia e INNER JOIN persona per ON e.idpersona=per.id
            INNER JOIN maestro_his_establecimiento mhe ON e.cod_2000=mhe.codigo_unico
            INNER JOIN motivo_atencion ma ON e.idmotivo_atencion=ma.id
            LEFT JOIN maestro_his_ups mhu ON e.idups=mhu.id_ups
            LEFT JOIN usuario u ON e.idusuario_registro=u.id
            LEFT JOIN maestro_personal mp ON u.idprofesional=mp.id_personal
			LEFT JOIN condicion_salida cs ON e.idcondicion_salida=cs.id WHERE e.estado IN (1,2) ".
            (isset($params->fecha_inicio)?($params->fecha_inicio!=""?(isset($params->fecha_final)?($params->fecha_final!=""?" and e.fecha_atencion BETWEEN '".Util::convertirStringFecha($params->fecha_inicio, false)."' AND '".Util::convertirStringFecha($params->fecha_final, false)."'":""):""):""):"").
            (isset($params->idusuarioregistro)?($params->idusuarioregistro!=""?" and e.idusuario_registro=$params->idusuarioregistro":""):"");
        if(Session::get('idnivel') == 5 || Session::get('idnivel') == 6 || Session::get('idnivel') == 7){
            //establecimiento
            $sql.= " AND e.cod_2000='".Session::get('cod_2000')."' ";
        }else{
            if(Session::get('idnivel') == 4){
                //micro red
                $sql.= " AND mhe.codigo_disa='". Session::get('codigo_disa') ."' AND mhe.codigo_red='". Session::get('codigo_red') ."' AND mhe.codigo_microred='" . Session::get('codigo_microred') . "'";
            }else{
                if(Session::get('idnivel') == 3){
                    //red
                    $sql.= " AND mhe.codigo_disa='". Session::get('codigo_disa') ."' AND mhe.codigo_red='". Session::get('codigo_red') ."' ";
                }else{
                    if(Session::get('idnivel') == 2){
                        //disa
                        $sql.=" AND mhe.codigo_disa='". Session::get('codigo_disa') ."' ";
                    }
                }
            }
        }
        //dd($sql);
        //$sql.=""
        return DB::select($sql);
    }

    public function buscarEmergenciaByDNI($params){
        $sql = "SELECT e.id AS idemergencia, e.cod_2000, DATE_FORMAT(e.fecha_atencion,'%d/%m/%Y') AS fecha_atencion, e.hora_atencion, e.hc, e.idfinanciador, e.edad, e.tipo_edad, e.idpersona, e.tipo_doc_acomp, e.nro_doc_acomp,
            e.nombre_acomp, e.telefono_acomp, e.idmotivo_atencion, e.idubigeo_lugar_ocurrencia, e.idups, e.idcondicion_salida, DATE_FORMAT(e.fecha_salida,'%d/%m/%Y') AS fecha_salida, e.hora_salida, e.iddestino, e.cod_2000_referencia,
            e.idups_hospitalizacion, e.idprofesional, e.nro_doc_profecional, e.nombre_profesional, e.dx1_si_no, e.codigo_dx1, e.descripcion_dx1, e.tipo_diagnostico_dx1, e.dx2_si_no, e.codigo_dx2, e.descripcion_dx2, e.tipo_diagnostico_dx2,
            e.dx3_si_no, e.codigo_dx3, e.descripcion_dx3, e.tipo_diagnostico_dx3, e.dx4_si_no, e.codigo_dx4, e.descripcion_dx4, e.tipo_diagnostico_dx4, e.proc1_si_no, e.codigo_proc_1, e.descripcion_proc_1, e.proc2_si_no, e.codigo_proc_2, e.descripcion_proc_2,
            e.proc3_si_no, e.codigo_proc_3, e.descripcion_proc_3, e.proc4_si_no, e.codigo_proc_4, e.descripcion_proc_4, e.tipo_actividad, e.idusuario_registro,
            per.apellido_paterno, per.apellido_materno, per.nombres, per.tipo_documento, per.nro_documento, per.sexo, per.direccion, per.idetnia, per.idubigeo, e.presion_sistolica, e.presion_diastolica, e.presion_arterial_media,
            e.saturacion_oxigeno, e.frecuencia_cardiaca, e.frecuencia_respiratoria, e.temperatura, e.area_atencion, e.estado, e.tratamiento_adicional, e.nro_dia_tratamiento,
            per.telefono, ma.descripcion_motivo, IF(e.tipo_actividad='U', 'URGENCIA', IF(e.tipo_actividad='E', 'EMERGENCIA', IF(e.tipo_actividad='C', 'CONSULTA', NULL))) AS nom_tipo_actividad, cs.descripcion_condicion,
            mhe.nombre_establecimiento AS nom_est, mhu.descripcion_ups, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.nombres_personal
            FROM emergencia e INNER JOIN persona per ON e.idpersona=per.id
            INNER JOIN maestro_his_establecimiento mhe ON e.cod_2000=mhe.codigo_unico
            INNER JOIN motivo_atencion ma ON e.idmotivo_atencion=ma.id
            INNER JOIN maestro_his_ups mhu ON e.idups=mhu.id_ups
            LEFT JOIN usuario u ON e.idusuario_registro=u.id
            LEFT JOIN maestro_personal mp ON u.idprofesional=mp.id_personal
			LEFT JOIN condicion_salida cs ON e.idcondicion_salida=cs.id WHERE e.estado=1 AND per.nro_documento='$params->nro_documento' ";
        if(Session::get('idnivel') == 5 || Session::get('idnivel') == 6 || Session::get('idnivel') == 7){
            //establecimiento
            $sql.= " AND e.cod_2000='".Session::get('cod_2000')."' ";
        }
        $sql.= " ORDER BY e.fecha_atencion DESC";
        return DB::select($sql);
    }

    public function eliminarEmergencia($params){
        try{
            $sql = "update emergencia set estado=0 WHERE id=".$params->idemergencia;
            DB::update($sql);
            $data['confirm'] = true;
            $data['message'] = 'Se Elimino Correctamente!';
            $data['code'] = 200;
            return $data;
        }catch (\Exception $ex){
            $data['confirm'] = false;
            $data['message'] = 'Error: ' + $ex->getMessage();
            $data['code'] = 401;
            return $data;
        }
    }

    public function getMedicamentobyId($params){
        $sql = "SELECT id, idemergencia, idmedicamento, descripcion_medicamento AS descripcion, cantidad FROM detalle_medicamento WHERE estado=1 AND idemergencia=$params->idemergencia";
        return DB::select($sql);
    }

    public function getProfesionalRegistro($params){
        $data = array();
        if(Session::get('idnivel') == 5 || Session::get('idnivel') == 6 || Session::get('idnivel') == 7){
            $sql = "SELECT u.id, mp.id_personal, u.cod_2000, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.nombres_personal
            FROM usuario u INNER JOIN maestro_personal mp ON u.idprofesional=mp.id_personal
            WHERE u.cod_2000='".Session::get('cod_2000')."'";
            $data = DB::select($sql);
        }
        return $data;
    }

    public function getActividadHisEmergencia($params){
        $sql = "SELECT condicion_establecimiento, condicion_servicio FROM actividades_his WHERE idemergencia=$params->idemergencia AND estado=1
            GROUP BY condicion_establecimiento, condicion_servicio LIMIT 1";
        return DB::select($sql);
    }

    public function getDetalleHisEmergencia($params){
        $sql = "SELECT id, codigo_cie, descripcion_cie, tipodianostico, lab1, lab2, lab3, item FROM actividades_his WHERE idemergencia=$params->idemergencia AND estado=1";
        return DB::select($sql);
    }
}
