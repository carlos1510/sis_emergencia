<?php
/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 08:52
 */

namespace App\Http\Repository;

use App\Http\Util\Util;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Session;

date_default_timezone_set('America/Lima');

class ProfesionalRepository
{

    public function getUsuario($usuario, $clave){
        try{
            $sql = "SELECT u.id, u.nick, u.idnivel, n.descripcion AS nom_nivel, u.idprofesional, pr.nombres_personal, pr.apellido_paterno_personal, pr.apellido_materno_personal, CONCAT_WS(' ','DIRESA',(SELECT mh.disa FROM maestro_his_establecimiento mh WHERE mh.codigo_disa=u.codigo_disa GROUP BY disa LIMIT 1)) AS nom_disa,
                (SELECT mh.nom_red FROM maestro_his_establecimiento mh WHERE mh.codigo_disa=u.codigo_disa AND mh.codigo_red=u.codigo_red GROUP BY mh.nom_red LIMIT 1) AS nom_red,
                (SELECT mh.nom_microred FROM maestro_his_establecimiento mh WHERE mh.codigo_disa=u.codigo_disa AND mh.codigo_red=u.codigo_red AND mh.codigo_microred=u.codigo_microred GROUP BY mh.nom_microred LIMIT 1) AS nom_microred,
                (SELECT mh.nombre_establecimiento FROM maestro_his_establecimiento mh WHERE mh.codigo_unico=u.cod_2000 LIMIT 1) AS nom_eess, u.cod_2000, u.codigo_disa, u.codigo_red, u.codigo_microred
                FROM usuario u
                INNER JOIN nivel n ON u.idnivel=n.id
                LEFT JOIN maestro_personal pr ON u.idprofesional=pr.id_personal
                WHERE u.estado=1 AND u.acceso=1 AND u.nick='$usuario' AND u.password='$clave' LIMIT 1";
            $result = DB::select($sql);
            return $result;
        }catch (Exception $ex){
            $result['error'] = 0;
            return $result;

        }
    }

    public function guardarUpdateProfesional($params){
        try{
            if(isset($params->idprofesional)){
                //update
            }else{
                if(isset($params->idpersona)){
                    //actualizamos los datos de la persona y registramos el profesional
                    $sql_persona = "UPDATE persona SET tipo_documento=:tipo_documento, nro_documento=:nro_documento, apellido_paterno=:apellido_paterno, apellido_materno=:apellido_materno, nombres=:nombres, sexo=:sexo, idubigeo=:idubigeo, direccion=:direccion, fecha_nacimiento=:fecha_nacimiento, telefono=:telefono, idetnia=:idetnia WHERE id=:id;";
                    DB::update($sql_persona, array(
                        'tipo_documento' => isset($params->tipo_documento)?$params->tipo_documento:null,
                        'nro_documento' => isset($params->nro_documento)?$params->nro_documento:null,
                        'apellido_paterno' => isset($params->apellido_paterno)?strtoupper($params->apellido_paterno):null,
                        'apellido_materno' => isset($params->apellido_materno)?strtoupper($params->apellido_materno):null,
                        'nombres' => isset($params->nombres)?strtoupper($params->nombres):null,
                        'sexo' => isset($params->sexo)?($params->sexo!=""?strtoupper($params->sexo):null):null,
                        'idubigeo' => isset($params->idubigeo)?($params->idubigeo!=""?$params->idubigeo:null):null,
                        'direccion' => isset($params->direccion)?($params->direccion!=""?strtoupper($params->direccion):null):null,
                        'fecha_nacimiento' => isset($params->fecha_nacimiento)?($params->fecha_nacimiento!=""?Util::convertirStringFecha($params->fecha_nacimiento, false):null):null,
                        'telefono' => isset($params->telefono)?($params->telefono!=""?$params->telefono:null):null,
                        'idetnia' => isset($params->idetnia)?($params->idetnia!=""?$params->idetnia:null):null,
                        'id' => $params->idpersona
                    ));

                    $sql_profesional = "INSERT INTO profesional (idpersona, idprofesion, idcondicion_contrato, cod_2000, codigo_colegiatura, fecha_ingreso, fecha_baja, fecha_registro, estado) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                    DB::insert($sql_profesional, [
                        $params->idpersona,
                        isset($params->idprofesion)?($params->idprofesion!=""?$params->idprofesion:null):null,
                        isset($params->idcondicion_contrato)?($params->idcondicion_contrato!=""?$params->idcondicion_contrato:null):null,
                        isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                        isset($params->codigo_colegiatura)?($params->codigo_colegiatura!=""?$params->codigo_colegiatura:null):null,
                        isset($params->fecha_ingreso)?($params->fecha_ingreso!=""?Util::convertirStringFecha($params->fecha_ingreso, false):null):null,
                        null,
                        date('Y-m-d H:i:s'),
                        1
                    ]);
                }else{
                    //registro nuevo
                    $sql_persona = "INSERT INTO sis_urgencia.persona (tipo_documento, nro_documento, apellido_paterno, apellido_materno, nombres, sexo, idubigeo, direccion, fecha_nacimiento, telefono, estado, fecha_registro, idetnia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
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

                    $idpersona = DB::select("SELECT MAX(id) as idpersona FROM persona");

                    $sql_profesional = "INSERT INTO profesional (idpersona, idprofesion, idcondicion_contrato, cod_2000, codigo_colegiatura, fecha_ingreso, fecha_baja, fecha_registro, estado) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                    DB::insert($sql_profesional, [
                        $idpersona[0]->idpersona,
                        isset($params->idprofesion)?($params->idprofesion!=""?$params->idprofesion:null):null,
                        isset($params->idcondicion_contrato)?($params->idcondicion_contrato!=""?$params->idcondicion_contrato:null):null,
                        isset($params->cod_2000)?($params->cod_2000!=""?$params->cod_2000:null):null,
                        isset($params->codigo_colegiatura)?($params->codigo_colegiatura!=""?$params->codigo_colegiatura:null):null,
                        isset($params->fecha_ingreso)?($params->fecha_ingreso!=""?Util::convertirStringFecha($params->fecha_ingreso, false):null):null,
                        null,
                        date('Y-m-d H:i:s'),
                        1
                    ]);
                }
            }
            $data['confirm'] = true;
            return $data;
        }catch (\Exception $ex){
            $data['confirm'] = false;
            return $data;
        }
    }

    public function getLista($params){
        $data = array();
        if(isset($params->tipo_nivel)){
            if(Session::get('idnivel') > 4){
                $sql = "SELECT mp.id_personal, mp.id_tipo_documento, mp.numero_documento, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.nombres_personal, mp.numero_colegiatura, mp.fecha_alta,
                        mp.fecha_baja, mp.id_colegio, mp.id_establecimiento, mp.id_condicion, mp.id_profesion, mhe.nombre_establecimiento, mhe.codigo_unico, mhe.codigo_disa, mhe.codigo_red, mhe.codigo_microred,
                        mhp.descripcion AS nom_profesion, u.id AS idusuario, u.nick, u.acceso, u.idnivel
                        FROM maestro_personal mp
                        INNER JOIN  maestro_his_establecimiento mhe ON mp.id_establecimiento=mhe.id_establecimiento
                        INNER JOIN maestro_his_condicion_contrato mcc ON mp.id_condicion=mcc.id
                        INNER JOIN maestro_his_profesion mhp ON mp.id_profesion=mhp.id_profesion
                        LEFT JOIN usuario u ON mp.id_personal=u.idprofesional
                        WHERE mhe.codigo_unico='". Session::get('cod_2000') ."'".(
                        isset($params->nom_profesion)?($params->nom_profesion=='MEDICO'?" AND mhp.id_profesion IN ('01','45', '23','10','18')":($params->nom_profesion=='ENFERMERO'?" AND mhp.id_profesion IN ('23','29','45') ":($params->nom_profesion=='OBSTETRA'?"":""))):""
                    );
                $data = DB::select($sql);
            }else{
                if(isset($params->cod_2000)){
                    $sql = "SELECT mp.id_personal, mp.id_tipo_documento, mp.numero_documento, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.nombres_personal, mp.numero_colegiatura, mp.fecha_alta,
                        mp.fecha_baja, mp.id_colegio, mp.id_establecimiento, mp.id_condicion, mp.id_profesion, mhe.nombre_establecimiento, mhe.codigo_unico, mhe.codigo_disa, mhe.codigo_red, mhe.codigo_microred,
                        mhp.descripcion AS nom_profesion, u.id AS idusuario, u.nick, u.acceso, u.idnivel
                        FROM maestro_personal mp
                        INNER JOIN  maestro_his_establecimiento mhe ON mp.id_establecimiento=mhe.id_establecimiento
                        INNER JOIN maestro_his_condicion_contrato mcc ON mp.id_condicion=mcc.id
                        INNER JOIN maestro_his_profesion mhp ON mp.id_profesion=mhp.id_profesion
                        LEFT JOIN usuario u ON mp.id_personal=u.idprofesional
                        WHERE mp.fecha_baja IS NULL AND mhe.codigo_unico='$params->cod_2000'".(
                        isset($params->tipo_profesional)?($params->tipo_profesional!=2?" AND mhp.id_profesion IN ('01','45', '23','10','18','25')":" AND mhp.id_profesion IN ('23','29','45','25') "):""
                        );
                    $data = DB::select($sql);
                }
            }
        }else{
            $sql = "SELECT mp.id_personal, mp.id_tipo_documento, mp.numero_documento, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.nombres_personal, mp.numero_colegiatura, mp.fecha_alta,
                    mp.fecha_baja, mp.id_colegio, mp.id_establecimiento, mp.id_condicion, mp.id_profesion, mhe.nombre_establecimiento, mhe.codigo_unico, mhe.codigo_disa, mhe.codigo_red, mhe.codigo_microred,
                    mhp.descripcion AS nom_profesion, u.id AS idusuario, u.nick, u.acceso, u.idnivel
                    FROM maestro_personal mp
                    INNER JOIN  maestro_his_establecimiento mhe ON mp.id_establecimiento=mhe.id_establecimiento
                    INNER JOIN maestro_his_condicion_contrato mcc ON mp.id_condicion=mcc.id
                    INNER JOIN maestro_his_profesion mhp ON mp.id_profesion=mhp.id_profesion
                    LEFT JOIN usuario u ON mp.id_personal=u.idprofesional
                    WHERE mp.fecha_baja IS NULL ".
                (isset($params->codigo_disa)?($params->codigo_disa!=""?"  AND mhe.codigo_disa='$params->codigo_disa'":" AND mhe.codigo_disa='".Session::get('codigo_disa')."'"):" AND mhe.codigo_disa='".Session::get('codigo_disa')."'").
                (isset($params->codigo_red)?($params->codigo_red!=""?" AND mhe.codigo_red='$params->codigo_red'":""):"").
                (isset($params->codigo_microred)?($params->codigo_microred!=""?" AND mhe.codigo_microred='$params->codigo_microred'":""):"").
                (isset($params->cod_2000)?($params->cod_2000!=""?" AND mhe.codigo_unico='$params->cod_2000' ":""):"").
                (isset($params->nro_documento)?($params->nro_documento!=""?" AND mp.numero_documento='$params->nro_documento'":""):"");

            if(Session::get('idnivel') > 4){
                /*$sql = "SELECT pr.id AS idprofesional, pr.codigo_colegiatura, pr.cod_2000, pr.estado, pr.idcondicion_contrato, pr.idpersona, pr.idprofesion, DATE_FORMAT(pr.fecha_ingreso, '%d/%m/%Y') AS fecha_ingreso,
                    DATE_FORMAT(pr.fecha_baja, '%d/%m/%Y') AS fecha_baja, per.apellido_paterno, per.apellido_materno, per.nombres, per.direccion, per.idetnia, per.idubigeo, per.nro_documento, per.tipo_documento, per.sexo,
                    per.telefono, DATE_FORMAT(per.fecha_nacimiento, '%d/%m/%Y') AS fecha_nacimiento, mp.descripcion AS nom_profesion, mhe.nombre_establecimiento, mhe.nom_microred, mhe.nom_red, u.id AS idusuario, u.nick, u.acceso, u.idnivel
                    FROM profesional pr INNER JOIN persona per ON pr.idpersona=per.id
                    LEFT JOIN maestro_his_profesion mp ON pr.idprofesion=mp.id_profesion
                    LEFT JOIN maestro_his_establecimiento mhe ON pr.cod_2000=mhe.codigo_unico
                    LEFT JOIN usuario u ON u.idprofesional=pr.id WHERE pr.cod_2000='".Session::get('cod_2000')."' ";
                $data = DB::select($sql);*/
                $sql.=" AND mhe.codigo_unico='". Session::get('cod_2000') ."' ";
            }else{
                if(Session::get('idnivel') == 4){
                    //microred
                    $sql.=" AND mhe.codigo_red='". Session::get('codigo_red') ."' AND mhe.codigo_microred='". Session::get('codigo_microred') ."'";
                }else{
                    if(Session::get('idnivel') == 3){
                        //red
                        $sql.=" AND mhe.codigo_red='". Session::get('codigo_red') ."'";
                    }else{
                        /*if(Session::get('idnivel') == 2){
                            //disa
                            $sql.=" AND mhe.codigo_disa='". Session::get('codigo_disa') ."' ";
                        }else{
                            //$sql.=" limit 10";
                        }*/
                    }
                }
            }
            //dd($sql);
            $data = DB::select($sql);
        }

        return $data;
    }

    public function guardarUsuario($params){
        try{
            if(isset($params->idusuario)){
                //editamos
            }else{
                //creamos nuevo usuario
                $sql = "INSERT INTO usuario (idprofesional, nick, password, idnivel, acceso, fecha_registro, idusuario_registro, cod_2000, codigo_disa, codigo_red, codigo_microred, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                DB::insert($sql, [
                    $params->id_personal,
                    isset($params->nick)?$params->nick!=""?$params->nick:null:null,
                    isset($params->password)?$params->password!=""?$params->password:null:null,
                    isset($params->idnivel)?$params->idnivel!=""?$params->idnivel:null:null,
                    isset($params->acceso)?$params->acceso!=""?$params->acceso:null:null,
                    date('Y-m-d H:i:s'),
                    Session::get('idusuario'),
                    isset($params->cod_2000)?$params->cod_2000!=""?$params->cod_2000:null:null,
                    isset($params->codigo_disa)?$params->codigo_disa!=""?$params->codigo_disa:null:null,
                    isset($params->codigo_red)?$params->codigo_red!=""?$params->codigo_red:null:null,
                    isset($params->codigo_microred)?$params->codigo_microred!=""?$params->codigo_microred:null:null,
                    1
                ]);
            }
            $data['confirm'] = true;
            return $data;
        }catch (\Exception $ex){
            $data['confirm'] = false;
            return $data;
        }
    }

    public function buscarProfesionalMedico($params){
        try{
            $sql = "SELECT mp.id_personal, mp.id_tipo_documento, mp.numero_documento, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.nombres_personal, mp.numero_colegiatura, mp.fecha_alta,
                        mp.fecha_baja, mp.id_colegio, mp.id_establecimiento, mp.id_condicion, mp.id_profesion, mhe.nombre_establecimiento, mhe.codigo_unico, mhe.codigo_disa, mhe.codigo_red, mhe.codigo_microred,
                        mhp.descripcion AS nom_profesion, u.id AS idusuario, u.nick, u.acceso, u.idnivel
                        FROM maestro_personal mp
                        INNER JOIN  maestro_his_establecimiento mhe ON mp.id_establecimiento=mhe.id_establecimiento
                        INNER JOIN maestro_his_condicion_contrato mcc ON mp.id_condicion=mcc.id
                        INNER JOIN maestro_his_profesion mhp ON mp.id_profesion=mhp.id_profesion
                        LEFT JOIN usuario u ON mp.id_personal=u.idprofesional
                        WHERE WHERE mhp.id_profesion IN ('01','45', '23','10','18') AND mp.numero_documento='$params->dni' LIMIT 1";
            return DB::select($sql);
        }catch (\Exception $ex){}
    }

    public function buscarProfesionalNoMedico($params){
        try{
            $sql = "SELECT mp.id_personal, mp.id_tipo_documento, mp.numero_documento, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.nombres_personal, mp.numero_colegiatura, mp.fecha_alta,
                        mp.fecha_baja, mp.id_colegio, mp.id_establecimiento, mp.id_condicion, mp.id_profesion, mhe.nombre_establecimiento, mhe.codigo_unico, mhe.codigo_disa, mhe.codigo_red, mhe.codigo_microred,
                        mhp.descripcion AS nom_profesion, u.id AS idusuario, u.nick, u.acceso, u.idnivel
                        FROM maestro_personal mp
                        INNER JOIN  maestro_his_establecimiento mhe ON mp.id_establecimiento=mhe.id_establecimiento
                        INNER JOIN maestro_his_condicion_contrato mcc ON mp.id_condicion=mcc.id
                        INNER JOIN maestro_his_profesion mhp ON mp.id_profesion=mhp.id_profesion
                        LEFT JOIN usuario u ON mp.id_personal=u.idprofesional
                        WHERE mhp.id_profesion IN ('23','29','45') AND mp.numero_documento='$params->dni' LIMIT 1";
            return DB::select($sql);
        }catch (\Exception $ex){}
    }

    public function getPerfilbyID(){
        try{
            $sql = "SELECT DISTINCT pro.id, pro.idpersona, pro.idprofesion,per.paterno, per.materno, per.nombres, per.telefono, per.email, per.sexo,
                per.numerodocumento as dni, pro.codigo, pro.usuario, pro.clave, pro.clave as repiteclave, prof.nombre as profesion,
                IF(pro.tipo_dependencia=1, v_e.nom_est, IF(pro.tipo_dependencia=2,CONCAT('MICRO RED',' ',v_e.nom_mic),
                IF(tipo_dependencia=3, CONCAT('RED',' ',v_e.nom_red), IF(tipo_dependencia=4,'DIRESA','ADMINSTRADOR')))) AS eess
                FROM salud_materno.profesional pro INNER JOIN salud_maestro.profesion prof
                ON pro.idprofesion=prof.id INNER JOIN salud_maestro.persona per
                ON pro.idpersona=per.id INNER JOIN salud_maestro.vista_establecimiento v_e
                ON pro.dependencia=IF(tipo_dependencia=1, v_e.cod_2000, IF(tipo_dependencia=2,CONCAT(v_e.cod_disa,v_e.cod_red,v_e.cod_mic),
                IF(tipo_dependencia=3, CONCAT(v_e.cod_disa,v_e.cod_red), v_e.cod_disa)))
                WHERE pro.estado=1 AND pro.acceso=1 AND pro.id='".Session::get('idusuario')."'";

            return DB::select($sql);
        }catch (Exception $ex){}
    }

    public function updatePerfil($params){
        try{
            DB::beginTransaction();
            $sql_persona = "UPDATE salud_maestro.persona SET paterno=:paterno, materno=:materno, nombres=:nombres, sexo=:sexo, telefono=:telefono, email=:email WHERE id=:id;";
            DB::update($sql_persona, array('paterno'=>strtoupper($params->paterno),'materno'=>strtoupper($params->materno),'nombres'=>strtoupper($params->nombres),'sexo'=>$params->sexo, 'telefono'=>isset($params->telefono)?$params->telefono:null, 'email'=>isset($params->email)?$params->email:null, 'id'=>$params->idpersona));

            $sql_profesional = "UPDATE salud_materno.profesional SET codigo=:codigo,  clave=:clave WHERE id=:id;";
            DB::update($sql_profesional, array('codigo'=>isset($params->codigo)?$params->codigo:null, 'clave'=>$params->clave, 'id'=>$params->id));

            DB::commit();
            $data['confirm'] = true;
            return $data;
        }catch (Exception $ex){
            DB::rollBack();
            $data['confirm'] = false;
            return $data;
        }
    }

    public function listarProfesionalByDependencia($params){
        $sql = "SELECT prof.id, per.nombres,per.paterno,per.materno
                FROM salud_materno.profesional prof INNER JOIN salud_maestro.persona per ON prof.idpersona=per.id
                INNER JOIN salud_maestro.vista_establecimiento v_e ON IF(prof.tipo_dependencia=1,prof.dependencia=v_e.cod_2000,
                IF(tipo_dependencia=2, prof.dependencia = CONCAT(v_e.cod_disa,'',v_e.cod_red
                ,'',v_e.cod_mic),IF(tipo_dependencia=3,prof.dependencia=CONCAT(v_e.cod_disa,'',v_e.cod_red), IF(tipo_dependencia=4, prof.dependencia=v_e.cod_disa,prof.dependencia=v_e.cod_disa))))
                 WHERE prof.estado=1 AND (prof.tipo_dependencia!=5 AND prof.tipo_dependencia!=4) ".
            (isset($params->cod_2000)?($params->cod_2000!=""?" AND v_e.cod_2000='$params->cod_2000'":""):"")."
                GROUP BY prof.id ";
            /*(Session::get('tipo_dependencia')==2?(isset($params->cod_2000)?($params->cod_2000!=""?" AND prof.tipo_dependencia!=3 AND v_e.cod_2000='$params->cod_2000'":" AND CONCAT(v_e.cod_disa,'',v_e.cod_red,'',v_e.cod_mic)=".Session::get('cod_2000')):"AND CONCAT(v_e.cod_disa,'',v_e.cod_red,'',v_e.cod_mic)=".Session::get('cod_2000')):" ").
            (Session::get('tipo_dependencia')==3?(isset($params->cod_2000)?($params->cod_2000!=""?" AND v_e.cod_2000='$params->cod_2000'":" AND CONCAT(v_e.cod_disa,'',v_e.cod_red)=".Session::get('cod_2000')):"AND CONCAT(v_e.cod_disa,'',v_e.cod_red)=".Session::get('cod_2000')):" ").
            (Session::get('tipo_dependencia')==4?(isset($params->cod_2000)?($params->cod_2000!=""?" AND v_e.cod_2000='$params->cod_2000'":" AND CONCAT(v_e.cod_disa,'',v_e.cod_red)=".Session::get('cod_2000')):"AND CONCAT(v_e.cod_disa,'',v_e.cod_red)=".Session::get('cod_2000')):" ").
            (Session::get('tipo_dependencia')==5?(isset($params->cod_2000)?($params->cod_2000!=""?" AND v_e.cod_2000='$params->cod_2000'":" AND v_e.cod_disa=".Session::get('cod_2000')):"AND v_e.cod_disa=".Session::get('cod_2000')):" ");*/
        $data = DB::select($sql);
        return $data;
    }

    public function listarProfesionalByTipo($params){
        if($params->tipo_profesional == 'ENFERMERO_OBSTETRIZ'){
            $sql = "SELECT mp.id_personal, u.cod_2000, mp.id_tipo_documento, mp.numero_documento,  mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.nombres_personal,
                mp.id_profesion, mhp.descripcion AS nom_profesion
                FROM usuario u INNER JOIN maestro_personal mp ON u.idprofesional=mp.id_personal
                INNER JOIN maestro_his_profesion mhp ON mp.id_profesion=mhp.id_profesion WHERE mhp.id_profesion IN (29, 35, 23, 48) ".
                (isset($params->cod_2000)?($params->cod_2000!=""?" AND u.cod_2000='$params->cod_2000' ":" AND u.cod_2000='".Session::get('cod_2000')."'"):" AND u.cod_2000='".Session::get('cod_2000')."'");
        }else{
            if($params->tipo_profesional == 'MEDICO'){
                $sql = "SELECT  e.idprofesional, mp.nombres_personal, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.numero_documento, mp.id_profesion, mhp.descripcion AS nom_profesion
                    FROM emergencia e INNER JOIN maestro_personal mp ON e.idprofesional=mp.id_personal INNER JOIN maestro_his_profesion mhp ON mp.id_profesion=mhp.id_profesion
                    WHERE mhp.id_profesion='01' ".(isset($params->cod_2000)?($params->cod_2000!=""?" AND e.cod_2000='$params->cod_2000' ":" AND e.cod_2000='".Session::get('cod_2000')."'"):" AND e.cod_2000='".Session::get('cod_2000')."'")."
                    GROUP BY mp.id_personal, mp.nombres_personal, mp.apellido_paterno_personal, mp.apellido_materno_personal, mp.numero_documento, mp.id_profesion, mhp.descripcion";
            }
        }
        return DB::select($sql);
    }
    
}
