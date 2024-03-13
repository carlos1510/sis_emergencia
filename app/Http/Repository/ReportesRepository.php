<?php
/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 08:52
 */

namespace App\Http\Repository;

use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Session;
use App\Http\Util\Util;
use phpDocumentor\Reflection\DocBlock\Tags\Return_;

date_default_timezone_set('America/Lima');

class ReportesRepository
{
    public function reporteNominalEmergencia($params){
        $sql = "SELECT
            DATE_FORMAT(e.fecha_atencion, '%d/%m/%Y') AS fecha_atencion,
            e.hora_atencion,
            e.hc,
            mhf.descripcion_financiador,
            e.edad,
            e.tipo_edad,
            mhtd.abrev_tipo_doc,
            per.nro_documento,
            per.apellido_paterno,
            per.apellido_materno,
            per.nombres,
            per.direccion,
            per.sexo,
            per.telefono,
            DATE_FORMAT(per.fecha_nacimiento, '%d/%m/%Y') AS fecha_nacimiento,
            e.tipo_doc_acomp,
            e.nro_doc_acomp,
            e.nombre_acomp,
            e.telefono_acomp,
            ma.descripcion_motivo,
            mhub.distrito AS lugar_ocurrencia,
            mhu.descripcion_ups,
            IF(e.idcondicion_salida=1, 'ALTA MÉDICA', IF(e.idcondicion_salida=2, 'ALTA VOLUNTARIA', IF(e.idcondicion_salida=3, 'TRANSFERIADO / REFERIDO', IF(e.idcondicion_salida=4, 'FUGADO', IF(e.idcondicion_salida=5, 'FALLECIDO', NULL))))) AS nom_condicion_salida,
            DATE_FORMAT(e.fecha_salida, '%d/%m/%Y') AS fecha_salida,
            e.hora_salida,
            e.nro_doc_profecional,
            e.nombre_profesional,
            e.codigo_dx1,
            e.descripcion_dx1,
            e.tipo_diagnostico_dx1,
            e.codigo_dx2,
            e.descripcion_dx2,
            e.tipo_diagnostico_dx2,
            e.codigo_dx3,
            e.descripcion_dx3,
            e.tipo_diagnostico_dx3,
            e.codigo_dx4,
            e.descripcion_dx4,
            e.tipo_diagnostico_dx4,
            e.codigo_proc_1,
            e.descripcion_proc_1,
            e.codigo_proc_2,
            e.descripcion_proc_2,
            e.codigo_proc_3,
            e.descripcion_proc_3,
            e.codigo_proc_4,
            e.descripcion_proc_4,
            IF(e.tipo_actividad='U','URGENCIA', IF(e.tipo_actividad='E', 'EMERGENCIA', IF(e.tipo_actividad='C', 'CONSULTA', NULL))) AS nom_tipo_actividad,
            e.presion_sistolica,
            e.presion_diastolica,
            e.presion_arterial_media,
            e.saturacion_oxigeno,
            e.frecuencia_cardiaca,
            e.frecuencia_respiratoria,
            e.temperatura,
            e.area_atencion,
            e.nro_doc_profecional_no_medico,
            e.nombre_profesional_no_medico,
            e.cod_2000,
            m.nombre_establecimiento,
            m.nom_microred,
            m.nom_red

            FROM emergencia e INNER JOIN persona per ON e.idpersona=per.id
            INNER JOIN maestro_his_establecimiento m ON e.cod_2000=m.codigo_unico AND m.codigo_disa='34'
            LEFT JOIN maestro_his_financiador mhf ON e.idfinanciador=mhf.id
            LEFT JOIN motivo_atencion ma ON e.idmotivo_atencion=ma.id
            LEFT JOIN maestro_his_ups mhu ON e.idups=mhu.id_ups
            LEFT JOIN maestro_his_ubigeo mhub ON e.idubigeo_lugar_ocurrencia=mhub.id_ubigueo_reniec
            LEFT JOIN maestro_his_tipo_doc mhtd ON mhtd.id=per.tipo_documento
            WHERE e.estado=1 ".
            (isset($params->fecha_inicio)?($params->fecha_inicio!=""?(isset($params->fecha_final)?($params->fecha_final!=""?" AND e.fecha_atencion BETWEEN '".Util::convertirStringFecha($params->fecha_inicio, false)."' AND '".Util::convertirStringFecha($params->fecha_final, false)."'":""):""):""):"").
            (isset($params->cod_2000)?($params->cod_2000!=""?" AND e.cod_2000='$params->cod_2000' ":""):"");
        return DB::select($sql);
    }
}