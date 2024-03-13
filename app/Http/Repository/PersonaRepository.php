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
use GuzzleHttp\Client;

date_default_timezone_set('America/Lima');

class PersonaRepository
{

    public function buscarPersonaByTipo($params){
        try{
            $data['code'] = 200;
            $data['confirm'] = true;
            $data['data'] = array();
            if($params->tipo_busqueda == 1){
                //busqueda de profesional
                $sql = "SELECT pr.idpersona, pr.id AS idprofesional, p.tipo_documento, p.nro_documento, p.apellido_paterno, p.apellido_materno, p.nombres, p.sexo, p.idetnia, p.idubigeo, p.direccion, p.telefono, pr.codigo_colegiatura, pr.cod_2000,
                DATE_FORMAT(pr.fecha_ingreso, '%d/%m/%Y') AS fecha_ingreso, DATE_FORMAT(pr.fecha_baja, '%d/%m/%Y') AS fecha_baja, DATE_FORMAT(p.fecha_nacimiento, '%d/%m/%Y') AS fecha_nacimiento, u.id AS idusuario, pr.estado
                FROM persona p LEFT JOIN profesional pr ON pr.idpersona=p.id
                LEFT JOIN usuario u ON pr.idpersona=p.id WHERE p.nro_documento='$params->nro_documento'";
                $data['data'] = DB::select($sql);
            }else{
                //busqueda de pacientes
                $sql = "SELECT p.id AS idpersona, p.tipo_documento, p.nro_documento, p.apellido_paterno, p.apellido_materno, p.nombres, p.sexo, p.idetnia, p.idubigeo, p.direccion, p.telefono,
                 DATE_FORMAT(p.fecha_nacimiento, '%d/%m/%Y') AS fecha_nacimiento
                FROM persona p WHERE p.nro_documento='$params->nro_documento'";
                $result = DB::select($sql);

                if(count($result) > 0){
                    $data['data'] = $result;
                }else{
                    if($params->tipo_documento == 1 ){
                        $token = 'apis-token-866.a7kD7Q9DNmGj1NG1uYFqp1PxnGB8zpjd';

                        $client = new Client(['base_uri' => 'https://api.apis.net.pe', 'verify' => false]);
                        $parameters = [
                            'http_errors' => false,
                            'connect_timeout' => 5,
                            'headers' => [
                                'Authorization' => 'Bearer '.$token,
                                'Referer' => 'https://apis.net.pe/api-consulta-dni',
                                'User-Agent' => 'laravel/guzzle',
                                'Accept' => 'application/json',
                            ],
                            'query' => ['numero' => $params->nro_documento]
                        ];
                        $res = $client->request('GET', '/v1/dni', $parameters);
                        $resultado = json_decode($res->getBody()->getContents(), true);
                        $dato[] = array('nro_documento' => $resultado['numeroDocumento'],'apellido_paterno' => $resultado['apellidoPaterno'],'apellido_materno' => $resultado['apellidoMaterno'],'nombres' => $resultado['nombres'],'nombre' => $resultado['nombre']);
                        $data['data'] = $dato;
                        if($resultado['apellidoPaterno'] == ""){
                            $token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTcwMw.JbaYXbRprI5dwWDOFK8vXV1DtBK3v1jZDJSAJq5p6xs';
                            $dni = $params->nro_documento;
                            $json = file_get_contents('https://quertium.com/api/v1/reniec/dni/'.$dni.'?token='.$token);

                            $person = json_decode($json, true);
                            $nombres = $person['primerNombre']." ".$person['segundoNombre'];
                            $dato[] = array('nro_documento' => $dni, 'apellido_paterno' => $person['apellidoPaterno'], 'apellido_materno' => $person['apellidoMaterno'], 'nombres' => rtrim($nombres), 'nombre' => $person['apellidoPaterno']." ".$person['apellidoMaterno']." ".rtrim($nombres));
                            $data['data'] = $dato;
                        }
                    }
                }
            }

            return $data;
        }catch (\Exception $ex){
            $data['code'] = 409;
            $data['confirm'] = false;
            $data['data'] = array();
            return $data;
        }
    }

    public function generarCodigoSinDocumento(){
        $sql = "SELECT CONCAT('SD-',LPAD((COUNT(nro_documento) + 1), 11, '0')) AS nro_documento FROM persona WHERE tipo_documento=5";
        $result = DB::selectOne($sql);
        //$codigo = "SD-".sprintf("%011d", ($result[0]->numero + 1));
        $codigo = $result->nro_documento;
        return $codigo;
    }

    public function getPersonaByDNI($params){
        $sql = "SELECT DISTINCT per.id as idpersona, pro.id, per.nombres, per.paterno, per.materno, per.email, per.telefono, per.sexo, pro.idprofesion,
                pro.usuario, pro.clave, pro.acceso, pro.dependencia, pro.tipo_dependencia,pro.codigo,per.numerodocumento as dni,
                IF(pro.tipo_dependencia=1,v.cod_2000,IF(pro.tipo_dependencia=2,CONCAT(v.cod_disa,'',v.cod_red,'',v.cod_mic),
                IF(pro.tipo_dependencia=3,CONCAT(v.cod_disa,'',v.cod_red),
                IF(pro.tipo_dependencia=4,v.cod_disa,'')))) AS cod_2000,
                IF(pro.tipo_dependencia=1,v.nom_est,IF(pro.tipo_dependencia=2,CONCAT('MICRO RED',' ',v.nom_mic),
                IF(pro.tipo_dependencia=3,CONCAT('RED',' ',v.nom_red),
                IF(pro.tipo_dependencia=4,'DIRESA','')))) AS eess, prof.nombre as profesion
                FROM salud_maestro.persona per LEFT JOIN salud_materno.profesional pro ON pro.idpersona=per.id
                LEFT JOIN salud_maestro.vista_establecimiento v
                ON IF(pro.tipo_dependencia=1,pro.dependencia=v.cod_2000,IF(pro.tipo_dependencia=2,pro.dependencia=CONCAT(v.cod_disa,'',v.cod_red,'',v.cod_mic),
                IF(pro.tipo_dependencia=3,pro.dependencia=CONCAT(v.cod_disa,'',v.cod_red),
                IF(pro.tipo_dependencia=4,pro.dependencia=v.cod_disa,''))))
                LEFT JOIN salud_maestro.profesion prof ON pro.idprofesion=prof.id
                WHERE per.numerodocumento='$params->dni' ORDER BY acceso DESC LIMIT 1";
        return DB::select($sql);
    }

    public function guardarUpdatePersona($params){
        try{
            $idpersona = null;
            if(isset($params->idpersona)){
                $sql = "UPDATE salud_maestro.persona SET numerodocumento=:dni, paterno=:paterno, materno=:materno, nombres=:nombres,
                        telefono=:telefono, tipodocumento=:tipodoc, tiposeguro=:tiposeg, numeroseguro=:numseg, fechanacimiento=:fecnacim, validado=:validado WHERE id=:id;";
                DB::update($sql, array('dni'=>isset($params->dni)?$params->dni:null, 'paterno'=>isset($params->paterno)?strtoupper($params->paterno):null,
                    'materno'=> isset($params->materno)?strtoupper($params->materno):null, 'nombres'=>isset($params->nombres)?strtoupper($params->nombres):null,
                    'telefono'=>isset($params->telefono)?$params->telefono:null, 'tipodoc'=>isset($params->tipodocumento)?$params->tipodocumento:null,
                    'tiposeg'=>isset($params->tiposeguro)?$params->tiposeguro:null, 'numseg'=>isset($params->numeroseguro)?$params->numeroseguro:null,
                    'fecnacim'=>isset($params->fechanacimiento)?Util::convertirStringFecha($params->fechanacimiento, false):null, 'validado'=>isset($params->validado)?$params->validado:0,'id'=>$params->idpersona));
                $idpersona = $params->idpersona;
            }else{
                $sql = "INSERT INTO salud_maestro.persona (tipodocumento, numerodocumento, tiposeguro, numeroseguro, paterno, materno, nombres, fechanacimiento, sexo, telefono, email, direccion, eess_afiliacion, eess_adscripcion, estado, validado, modo_registro, usuario_registro, fecha_registro, usuario_edicion, fecha_edicion)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
                DB::insert($sql,[]);
                $sql_select = "SELECT MAX(id) as idpersona FROM salud_maestro.persona";
                $id = DB::select($sql_select);
                $idpersona = $id[0]->idpersona;
            }
            $data['idpersona'] = $idpersona;
            $data['confirm'] = true;
            return $data;
        }catch (Exception $ex){
            $data['confirm'] = false;
            return $data;
        }
    }
}