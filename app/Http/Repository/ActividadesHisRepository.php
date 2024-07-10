<?php
namespace App\Http\Repository;

use Illuminate\Contracts\Config\Repository;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;
use Illuminate\Support\Facades\Session;
use Monolog\Handler\IFTTTHandler;
use Symfony\Component\HttpFoundation\Request;
use App\Http\Util\Util;

date_default_timezone_set('America/Lima');

class ActividadesHisRepository
{
    public function listarActividadesHis($params){
        $sql = "SELECT DISTINCT a.idemergencia, c.nro_documento, CONCAT_WS(' ',c.nombres,c.apellido_paterno, c.apellido_materno) AS nombres_paciente, DATE_FORMAT(a.fecha,'%d/%m/%Y') 
        AS fecha_atencion, b.hc, a.impresion, a.cod_2000, a.idprofesional ,
        c.sexo,c.fecha_nacimiento,c.idetnia,
        b.distrito_procedencia ,b.talla,b.peso,b.edad,b.tipo_edad,b.idfinanciador
        FROM actividades_his a JOIN emergencia b ON a.idemergencia=b.id 
        JOIN persona c ON b.idpersona=c.id 
        WHERE b.estado=1 AND a.fecha BETWEEN '". Util::convertirStringFecha($params->fecha_inicio, false) ."' AND '". Util::convertirStringFecha($params->fecha_final, false) ."' 
        AND a.cod_2000='$params->cod_2000' AND a.idprofesional='$params->idprofesional' ";     
        return DB::select($sql);
    }

    public function imprimirHis($params){
        $paciente_temp=array();
        
        foreach($params->lista as $item){
            
            $sql_atencion = "SELECT a.condicion_establecimiento,a.condicion_servicio,a.codigo_cie,a.descripcion_cie,a.tipodianostico,a.lab1,a.lab2,a.lab3,a.item FROM actividades_his a
            WHERE idemergencia=$item->idemergencia AND a.estado=1
            ORDER BY a.item ASC ";

            $resultado =DB::select($sql_atencion);
            $paciente_temp[]=array(
            'nro_documento'=>$item->nro_documento,
            'fecha_nacimiento'=>$item->fecha_nacimiento,
            'nombres_paciente'=>$item->nombres_paciente,
            'hc'=>$item->hc,
            'fecha_Atención'=>$item->fecha_atencion,
            'distrito_procedencia'=>$item->distrito_procedencia,
            'idetnia'=>$item->idetnia,
            'idfinanciador'=>$item->idfinanciador,
            'edad'=>$item->edad,
            'tipo_edad'=>$item->tipo_edad,
            'peso'=>$item->peso,
            'sexo'=>$item->sexo,
            'talla'=>$item->talla,

            'atenciones'=>$resultado);
        }

        $sql_cabecera="SELECT a.ups,p.numero_documento,CONCAT(p.apellido_paterno_personal,' ',p.apellido_materno_personal,' ',p.nombres_personal) AS personal,
        a.cod_2000, c.nombre_establecimiento, YEAR(a.fecha) AS anio, IF(MONTH(A.fecha)=1,'ENERO', IF(MONTH(A.fecha)=2,'FEBRERO',IF(MONTH(A.fecha)=3,'MARZO', IF(MONTH(A.fecha)=4,'ABRIL',
        IF(MONTH(A.fecha)=5,'MAYO',IF(MONTH(A.fecha)=6,'JUNIO',IF(MONTH(A.fecha)=7,'JULIO',IF(MONTH(A.fecha)=8,'AGOSTO',IF(MONTH(A.fecha)=9,'SEPTIEMBRE',IF(MONTH(A.fecha)=10,'OCTUBRE',
        IF(MONTH(A.fecha)=11,'NOVIEMBRE',IF(MONTH(A.fecha)=12,'DICIEMBRE',NULL))
        ))))))
        )))) AS mes_nombre
        
        FROM actividades_his a
        JOIN maestro_personal p ON a.idprofesional=p.id_personal
        JOIN maestro_his_establecimiento c ON a.cod_2000=c.codigo_unico
        WHERE a.idprofesional='$params->idprofesional' AND a.cod_2000='$params->cod_2000' 
        AND a.fecha BETWEEN '". Util::convertirStringFecha($params->fecha_inicio, false) ."' AND '". Util::convertirStringFecha($params->fecha_final, false) ."'
        LIMIT 1";
        $resultado_cabecera = DB::selectOne($sql_cabecera);

        $data=array(
        'anio'=>$resultado_cabecera->anio,
        'mes_nombre'=>$resultado_cabecera->mes_nombre,
        'nombre_establecimiento'=>$resultado_cabecera->nombre_establecimiento,
        'ups'=>$resultado_cabecera->ups,
        'numero_documento'=>$resultado_cabecera->numero_documento,
        'personal'=>$resultado_cabecera->personal,
        'paciente'=>$paciente_temp);

        return $data;

    }
    
    
}