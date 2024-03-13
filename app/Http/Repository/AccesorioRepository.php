<?php
/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 08:52
 */

namespace App\Http\Repository;

use Illuminate\Contracts\Config\Repository;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Session;
use Monolog\Handler\IFTTTHandler;
use Symfony\Component\HttpFoundation\Request;
use App\Http\Util\Util;

date_default_timezone_set('America/Lima');

class AccesorioRepository
{

    public function listarProfesion(){
        $sql = "SELECT * FROM maestro_his_profesion";
        return DB::select($sql);
    }

    public function listarEtnias(){
        $sql = "SELECT * FROM maestro_his_etnia";
        return DB::select($sql);
    }

    public function listarUbigeo($params){
        $sql = "SELECT id_ubigueo_reniec, departamento, provincia, distrito FROM maestro_his_ubigeo WHERE codigo_departamento_reniec='$params->codigo_departamento'";
        return DB::select($sql);
    }

    public function listarEstablecimientos($params){
        $sql = "SELECT id_establecimiento, nombre_establecimiento, codigo_unico, codigo_disa, codigo_red, codigo_microred, CONCAT_WS(' - ',codigo_red,nombre_establecimiento) AS nom_eess FROM maestro_his_establecimiento WHERE codigo_disa='$params->codigo_disa' ".
            (isset($params->codigo_red)?($params->codigo_red!=""?" AND codigo_red='$params->codigo_red'":""):"").
            (isset($params->codigo_microred)?($params->codigo_microred!=""?" AND codigo_microred='$params->codigo_microred'":""):"");
        return DB::select($sql);
    }

    public function listarRedes($params){
        $sql = "SELECT codigo_disa, disa, codigo_red, nom_red FROM maestro_his_establecimiento WHERE codigo_disa='$params->codigo_disa'
            GROUP BY codigo_disa, disa, codigo_red, nom_red";
        return DB::select($sql);
    }

    public function listarMicroRedes($params){
        $sql = "SELECT codigo_disa, disa, codigo_red, nom_red, codigo_microred, nom_microred FROM maestro_his_establecimiento WHERE codigo_disa='$params->codigo_disa' AND codigo_red='$params->codigo_red'
          GROUP BY codigo_disa, disa, codigo_red, nom_red, codigo_microred, nom_microred";
        return DB::select($sql);
    }

    public function listaUpsByEmergenciaHospitalizacion($params){
        $sql = "SELECT id_ups AS codups, descripcion_ups AS desupsesp, '".$params->servicio_descripcion."' AS desups FROM maestro_his_ups ".($params->servicio_descripcion=='EMERGENCIA'?" WHERE emergencia=1 and estado_emergencia=1":($params->servicio_descripcion == 'HOSPITALIZACIÓN'?" WHERE hospitalizacion=1":""));
        //$sql = "SELECT codups, desups, desupsesp FROM ups_emergencia_hospitalizacion WHERE desups='$params->servicio_descripcion' AND estado=1";
        return DB::select($sql);
    }

    public function filtrarCIEX($params){
        $sql = "SELECT codigo_cie, descripcion_cie FROM cie_cpms WHERE CONCAT(codigo_cie,descripcion_cie) LIKE '%$params->texto%' LIMIT 20;";
        return DB::select($sql);
    }

    public function buscarEESSByCodigo($params){
        $sql = "SELECT id_establecimiento, nombre_establecimiento, codigo_unico, codigo_disa, disa, codigo_red, nom_red, codigo_microred, nom_microred, CONCAT_WS(' - ',codigo_red,nombre_establecimiento) AS nom_eess FROM maestro_his_establecimiento WHERE codigo_disa='$params->codigo_disa' AND  codigo_unico LIKE '%$params->cod_2000%' limit 1";
        return DB::select($sql);
    }

    public function getListaMedicamentos(){
        $sql = "SELECT descripcion, MIN(id) AS idmedicamento FROM medicamento GROUP BY descripcion";
        return DB::select($sql);
    }

    public function getIPRESSAtencion($params){
        $sql = "SELECT mhe.id_establecimiento, mhe.codigo_unico, mhe.nombre_establecimiento FROM maestro_his_establecimiento mhe INNER JOIN
            (SELECT cod_2000 FROM emergencia GROUP BY cod_2000) AS tb_er
            ON mhe.codigo_unico=tb_er.cod_2000 AND mhe.codigo_disa='34'";
        return DB::select($sql);
    }

    public function getReporteInicio($params){
        $sql = "";
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
        $sql_u_e = "SELECT e.tipo_actividad, COUNT(*) AS total FROM emergencia e INNER JOIN maestro_his_establecimiento mhe ON e.cod_2000=mhe.codigo_unico
                WHERE e.estado=1 AND  FIND_IN_SET(e.tipo_actividad,'U,E') AND
                YEAR(e.fecha_atencion) = YEAR(CURDATE()) AND MONTH(e.fecha_atencion)= MONTH(CURDATE()) ".$sql."
                GROUP BY e.tipo_actividad";
        $result_u_e = DB::select($sql_u_e);

        $sql_trata_total = "SELECT COUNT(*) AS total FROM emergencia_tratamiento e INNER JOIN maestro_his_establecimiento mhe ON e.cod_2000=mhe.codigo_unico
            WHERE e.estado=1  AND YEAR(e.fecha_atencion) = YEAR(CURDATE()) AND MONTH(e.fecha_atencion)= MONTH(CURDATE()) ".$sql;
        $result_total_Trata = DB::selectOne($sql_trata_total);
        //$result_total_Trata->total;

        $sql_u_e_dia = "SELECT tb1.fecha, SUM(CASE WHEN tb1.tipo_actividad='U' THEN tb1.total ELSE 0 END) AS total_urgencia, SUM(CASE WHEN tb1.tipo_actividad='E' THEN tb1.total ELSE 0 END) AS total_emergencia FROM
            (SELECT e.tipo_actividad, DATE_FORMAT(e.fecha_atencion,'%d/%m') AS fecha, COUNT(*) AS total FROM emergencia e INNER JOIN maestro_his_establecimiento mhe ON e.cod_2000=mhe.codigo_unico WHERE e.estado=1 AND  FIND_IN_SET(e.tipo_actividad,'U,E') AND
            YEAR(e.fecha_atencion) = YEAR(CURDATE()) AND MONTH(e.fecha_atencion)= MONTH(CURDATE()) ".$sql."
            GROUP BY e.tipo_actividad, e.fecha_atencion) AS tb1 GROUP BY tb1.fecha";
        $result_u_e_dia_g1 = DB::select($sql_u_e_dia);

        $sql_u_e_anio = "SELECT e.tipo_actividad, COUNT(*) AS total FROM emergencia e INNER JOIN maestro_his_establecimiento mhe ON e.cod_2000=mhe.codigo_unico WHERE e.estado=1 AND  FIND_IN_SET(e.tipo_actividad,'U,E') AND
            YEAR(e.fecha_atencion) = YEAR(CURDATE()) ".$sql."
            GROUP BY e.tipo_actividad";
        $result_u_e_anio_g2 = DB::select($sql_u_e_anio);

        $sql_u_e_anio_gr2 = "SELECT tb1.mes, SUM(CASE WHEN	tb1.tipo_actividad='U' THEN tb1.total ELSE 0 END) AS total_urgencia, SUM(CASE WHEN	tb1.tipo_actividad='E' THEN tb1.total ELSE 0 END) AS total_emergencia FROM
            (SELECT e.tipo_actividad, MONTH(e.fecha_atencion) AS mes, COUNT(*) AS total FROM emergencia e INNER JOIN maestro_his_establecimiento mhe ON e.cod_2000=mhe.codigo_unico WHERE e.estado=1 AND  FIND_IN_SET(e.tipo_actividad,'U,E') AND
            YEAR(e.fecha_atencion) = YEAR(CURDATE()) ".$sql."
            GROUP BY e.tipo_actividad, mes ) AS tb1 GROUP BY tb1.mes";
        $result_u_e_anio_g3 = DB::select($sql_u_e_anio_gr2);

        $data['data_total_u_e'] = $result_u_e;
        $data['data_total_tratamiento'] = $result_total_Trata->total;
        $data['data_total_u_e_dia_g1'] = $result_u_e_dia_g1;
        $data['data_total_u_e_anio_g2'] = $result_u_e_anio_g2;
        $data['data_total_u_e_anio_g3'] = $result_u_e_anio_g3;
        return $data;
    }

    public function listarEstablecimientosAtencion($parmas){
        $sql = "SELECT mh.codigo_unico, mh.nombre_establecimiento
            FROM emergencia e INNER JOIN maestro_his_establecimiento mh ON e.cod_2000=mh.codigo_unico AND mh.codigo_disa='34'
            GROUP BY mh.codigo_unico, mh.nombre_establecimiento";
        return DB::select($sql);
    }

}