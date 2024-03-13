<?php
/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 09:20
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

use App\Http\Services\AccesorioServices;
use DateTime;
use App\Http\Util\Util;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Writers\CellWriter;
use PHPExcel_Shared_Date;
use PHPExcel_Style_NumberFormat;
use PHPExcel_Cell_DataType;
use PHPExcel_Style_Alignment;
use  PHPExcel_Style_Fill;
use PHPExcel_Style_Border;
date_default_timezone_set('America/Lima');
set_time_limit(50000);

class AccesorioController extends Controller
{
    protected $service;

    public function __construct()
    {
        $this->service = new AccesorioServices();
    }

    public function getDatosUsuario(Request $request){
        $data = array(
            'idusuario' => Session::get('idusuario'),
            'nombres' => Session::get('nombres'),
            'idnivel' => Session::get('idnivel'),
            'idprofesional' => Session::get('idprofesional'),
            'nom_nivel' => Session::get('nom_nivel'),
            'paterno' => Session::get('paterno'),
            'materno' => Session::get('materno'),
            'cod_2000' => Session::get('cod_2000'),
            'nom_eess' => Session::get('nom_eess'),
            'nom_microred' => Session::get('nom_microred'),
            'nom_red' => Session::get('nom_red'),
            'nom_disa' => Session::get('nom_disa'),
            'codigo_disa' => Session::get('codigo_disa'),
            'codigo_red' => Session::get('codigo_red'),
            'codigo_microred' => Session::get('codigo_microred')
        );
        return new JsonResponse($data);
    }

    public function listarProfesion(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarProfesion($params));
    }

    public function listarEtnias(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarEtnias($params));
    }

    public function listarUbigeo(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarUbigeo($params));
    }

    public function listarEstablecimientos(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarEstablecimientos($params));
    }

    public function listarRedes(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarRedes($params));
    }

    public function listarMicroRedes(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarMicroRedes($params));
    }

    public function listaUpsByEmergenciaHospitalizacion(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listaUpsByEmergenciaHospitalizacion($params));
    }

    public function filtrarCIEX(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->filtrarCIEX($params));
    }

    public function getListaMedicamentos(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getListaMedicamentos());
    }

    public function buscarEESSByCodigo(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->buscarEESSByCodigo($params));
    }

    public function getIPRESSAtencion(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getIPRESSAtencion($params));
    }

    public function getReporteInicio(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getReporteInicio($params));
    }

    public function listarEstablecimientosAtencion(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarEstablecimientosAtencion($params));
    }

    public function calcularEdad(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        $dia = date("d",strtotime($params->fecha_actual));
        $mes = date("m",strtotime($params->fecha_actual));
        $ano = date("Y",strtotime($params->fecha_actual));
        $dianaz = date("d",strtotime($params->nacimiento));
        $mesnaz = date("m",strtotime($params->nacimiento));
        $anonaz = date("Y",strtotime($params->nacimiento));
        if (($mesnaz == $mes) && ($dianaz > $dia)) {
            $ano=($ano-1); }
        if ($mesnaz > $mes) {
            $ano=($ano-1);}

        $fecha_actual = $params->fecha_actual;

        $array_nacimiento = explode ( "-", $params->nacimiento );
        $array_actual = explode ( "-", $fecha_actual );

        $anos =  $array_actual[0] - $array_nacimiento[0]; // calculamos años
        $meses = $array_actual[1] - $array_nacimiento[1]; // calculamos meses
        $dias =  $array_actual[2] - $array_nacimiento[2]; // calculamos días

        //ajuste de posible negativo en $días
        if ($dias < 0)
        {
            --$meses;

            //ahora hay que sumar a $dias los dias que tiene el mes anterior de la fecha actual
            switch ($array_actual[1]) {
                case 1:     $dias_mes_anterior=31; break;
                case 2:     $dias_mes_anterior=31; break;
                case 3:
                    if ($this->bisiesto($array_actual[0]))
                    {
                        $dias_mes_anterior=29; break;
                    } else {
                        $dias_mes_anterior=28; break;
                    }
                case 4:     $dias_mes_anterior=31; break;
                case 5:     $dias_mes_anterior=30; break;
                case 6:     $dias_mes_anterior=31; break;
                case 7:     $dias_mes_anterior=30; break;
                case 8:     $dias_mes_anterior=31; break;
                case 9:     $dias_mes_anterior=31; break;
                case 10:     $dias_mes_anterior=30; break;
                case 11:     $dias_mes_anterior=31; break;
                case 12:     $dias_mes_anterior=30; break;
            }

            $dias=$dias + $dias_mes_anterior;
        }

        //ajuste de posible negativo en $meses
        if ($meses < 0)
        {
            --$anos;
            $meses=$meses + 12;
        }

        if($anos > 0){
            $edad["tipo_edad"] = "AÑOS";
            $edad["edad"] = $anos;
        }else{
            if($meses > 0){
                $edad["tipo_edad"] = "MES";
                $edad["edad"] = $meses;
            }else{
                if($dias > -1){
                    $edad["tipo_edad"] = "DIA";
                    $edad["edad"] = $dias;
                }
            }
        }
        $edad = array('aproximada' => ($ano - $anonaz), 'exacta' => ("A: " . $anos . ", M: " . $meses . ", D: " . $dias), 'tipo_edad_anio' => 'A', 'edad_anio' => $anos, 'tipo_edad_mes' => 'M', 'edad_mes' =>$meses, 'tipo_edad_dia' => 'D', 'edad_dia' => $dias);
        /*$edad["aproximada"]=($ano-$anonaz);
        $edad["exacta"]=("A: ".$anos.", M: ".$meses.", D: ".$dias);*/
        return $edad;
    }

    public function bisiesto($anio_actual){
        $bisiesto=false;
        //probamos si el mes de febrero del año actual tiene 29 días
        if (checkdate(2,29,$anio_actual))
        {
            $bisiesto=true;
        }
        return new JsonResponse($bisiesto);
    }

    public function importarArchivos(Request $request){
        $archivo = $request->file('file');
        $nombre_original = $archivo->getClientOriginalName();
        $extension = $archivo->getClientOriginalExtension();

        $r1 = Storage::disk('archivo')->put($nombre_original,  \File::get($archivo) );
        //$storagePath  = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix()
        $r = Storage::disk('archivo')->getAdapter()->getPathPrefix().'/'.$nombre_original;
        $filename = $r;
        $file = fopen($filename, "r");
        $band = false;
        $all_data = array();
        if($r1){
            $i=0;
            setlocale(LC_ALL, 'ca_ES.UTF8');
            while ( ($data = fgetcsv($file, 50000000, $request->get('tiposeparador'))) !== FALSE ) {
                if($i != 0){
                    if($request->get('tipodata') == 1){
                        ///Data His Minsa
                        if($i == 1){
                            DB::table('his_'.$request->get('anio'))->where([
                                ['anio', '=', $request->get('anio')],
                                ['mes', '=', $request->get('mes')],
                            ])->delete();
                        }
                        $item = array('id_cita'=>isset($data[0])?$data[0]:null,
                            'anio'=>isset($data[1])?$data[1]:null,
                            'mes'=>isset($data[2])?$data[2]:null,
                            'dia'=>isset($data[3])?$data[3]:null,
                            'fecha_atencion'=>isset($data[4])?$data[4]:null,
                            'lote'=>isset($data[5])?$data[5]:null,
                            'num_pag'=>isset($data[6])?$data[6]:null,
                            'num_reg'=>isset($data[7])?$data[7]:null,
                            'id_ups'=>isset($data[8])?$data[8]:null,
                            'id_establecimiento'=>isset($data[9])?$data[9]:null,
                            'id_paciente'=>isset($data[10])?trim($data[10]):null,
                            'id_personal'=>isset($data[11])?trim($data[11]):null,
                            'id_registrador'=>isset($data[12])?$data[12]:null,
                            'id_financiador'=>isset($data[13])?$data[13]:null,
                            'id_condicion_establecimiento'=>isset($data[14])?$data[14]:null,
                            'id_condicion_servicio'=>isset($data[15])?$data[15]:null,
                            //'ubigeo_inei'=>isset($data[16])?$data[16]:null,
                            'edad_reg'=>isset($data[16])?$data[16]:null,
                            'tipo_edad'=>isset($data[17])?$data[17]:null,
                            'anio_actual_paciente'=>isset($data[18])?$data[18]:null,
                            'mes_actual_paciente'=>isset($data[19])?$data[19]:null,
                            'dia_actual_paciente'=>isset($data[20])?$data[20]:null,
                            'id_turno'=>isset($data[21])?$data[21]:null,
                            'codigo_item'=>isset($data[22])?$data[22]:null,
                            'tipo_diagnostico'=>isset($data[23])?$data[23]:null,
                            'valor_lab'=>isset($data[24])?$data[24]:null,
                            'id_correlativo'=>isset($data[25])?$data[25]:null,
                            'id_correlativo_lab'=>isset($data[26])?$data[26]:null,
                            'peso'=>isset($data[27])?$data[27]:null,
                            'talla'=>isset($data[28])?$data[28]:null,
                            'hemoglobina'=>isset($data[29])?$data[29]:null,
                            'pac'=>isset($data[30])?$data[30]:null,
                            'pc'=>isset($data[31])?$data[31]:null,
                            'id_otra_condicion'=>isset($data[32])?$data[32]:null,
                            'id_centro_poblado'=>isset($data[33])?$data[33]:null,
                            'fecha_ultima_regla'=>isset($data[34])?$data[34]:null,
                            'fecha_solicitud_hb'=>isset($data[35])?$data[35]:null,
                            'fecha_resultado_hb'=>isset($data[36])?$data[36]:null,
                            'fecha_registro'=>isset($data[37])?$data[37]:null,
                            'fecha_modificacion'=>isset($data[38])?$data[38]:null,
                            'id_pais'=>isset($data[39])?$data[39]:null);
                        //dd($item);

                        $band = $this->service->guardarHis($item);
                    }else{
                        if($request->get('tipodata') == 2){
                            //dd($data);
                            if($i == 1){
                                DB::table('maestro_paciente')->truncate();
                            }
                            $item = array('id_paciente'=>isset($data[0])?trim($data[0]):null, 'id_tipo_documento'=>isset($data[1])?$data[1]:null, 'numero_documento'=>isset($data[2])?$data[2]:null, 'apellido_paterno_paciente'=>isset($data[3])?$data[3]:null, 'apellido_materno_paciente'=>isset($data[4])?$data[4]:null,
                                'nombres_paciente'=>isset($data[5])?$data[5]:null, 'fecha_nacimiento'=>isset($data[6])?$data[6]:null, 'genero'=>isset($data[7])?$data[7]:null, 'id_etnia'=>isset($data[8])?$data[8]:null, 'historia_clinica'=>isset($data[9])?$data[9]:null,
                                'ficha_familiar'=>isset($data[10])?$data[10]:null, 'ubigeo_nacimiento'=>isset($data[11])?$data[11]:null, 'ubigeo_reniec'=>isset($data[12])?$data[12]:null, 'domicilio_reniec'=>isset($data[13])?$data[13]:null, 'ubigeo_declarado'=>isset($data[14])?$data[14]:null,
                                'domicilio_declarado'=>isset($data[15])?$data[15]:null, 'referencia_domicilio'=>isset($data[16])?$data[16]:null, 'id_pais'=>isset($data[17])?$data[17]:null, 'id_establecimiento'=>isset($data[18])?$data[18]:null, 'fecha_alta'=>isset($data[19])?$data[19]:null, 'fecha_modificacion'=>isset($data[20])?$data[20]:null);
                            $band = $this->service->guardarMaestroPaciente($item);
                        }else{
                            if($request->get('tipodata') == 3){
                                //dd($data);
                                if($i == 1){
                                    DB::table('maestro_personal_his')->truncate();
                                }
                                $item = array('id_personal'=>isset($data[0])?trim($data[0]):null, 'id_tipo_documento'=>isset($data[1])?$data[1]:null,'numero_documento'=>isset($data[2])?$data[2]:null,'apellido_paterno_personal'=>isset($data[3])?$data[3]:null, 'apellido_materno_personal' => isset($data[4])?$data[4]:null, 'nombres_personal' => isset($data[5])?$data[5]:null,
                                    'fecha_nacimiento'=>isset($data[6])?$data[6]:null,'id_condicion'=> isset($data[7])?$data[7]:null, 'id_profesion'=> isset($data[8])?$data[8]:null, 'id_colegio' => isset($data[9])?$data[9]:null, 'numero_colegiatura' => isset($data[10])?$data[10]:null, 'id_establecimiento' => isset($data[11])?$data[11]:null, 'fecha_alta' => isset($data[12])?$data[12]:null, 'fecha_baja' => isset($data[13])?$data[13]:null);
                                $band = $this->service->guardarMaestroPersonalHis($item);
                            }else {
                                if($request->get('tipodata') == 4){
                                    if($i == 1){
                                        DB::table('cnv')->whereYear('fecha_registro', '=', $request->get('anio'))
                                            ->whereMonth('fecha_registro', '=', $request->get('mes'))->delete();
                                    }
                                    $item = array('numcnv'=>isset($data[0])?$data[0]:null, 'estado'=>isset($data[1])?$data[1]:null, 'cod_renaes'=>isset($data[2])?(trim($data[2])!=""?$data[2]:null):null,
                                        'renaes'=>isset($data[3])?$data[3]:null, 'paterno_madre'=>isset($data[4])?$data[4]:null, 'materno_madre'=>isset($data[5])?$data[5]:null, 'nombres_madre'=>isset($data[6])?$data[6]:null, 'edad_madre'=>isset($data[7])?$data[7]:null,
                                        'fec_nac'=>isset($data[8])?$data[8]:null, 'edad_gestacional'=>isset($data[9])?$data[9]:null, 'tipo_doc'=>isset($data[10])?$data[10]:null, 'documento'=>isset($data[11])?(trim($data[11])!=""?$data[11]:null):null,
                                        'cod_2000'=>isset($data[12])?(trim($data[12])!=""?$data[12]:null):null, 'establecimiento'=>isset($data[13])?(trim($data[13])!=""?$data[13]:null):null,
                                        'fecha_nacido'=>isset($data[14])?$data[14]:null, 'hora_nacido'=>isset($data[15])?$data[15]:null, 'sexo'=>isset($data[16])?$data[16]:null, 'peso'=>isset($data[17])?$data[17]:null,
                                        'talla'=>isset($data[18])?$data[18]:null, 'apgar'=>isset($data[19])?$data[19]:null, 'perimetro_cefalico'=>isset($data[20])?$data[20]:null,
                                        'perimetro_toracico'=>isset($data[21])?$data[21]:null, 'malf_congenita'=>isset($data[22])?$data[22]:null, 'tiempo_lig_cord'=>isset($data[23])?$data[23]:null,
                                        'lactancia_precoz'=>isset($data[24])?$data[24]:null, 'paterno_prof'=>isset($data[25])?$data[25]:null, 'materno_prof'=>isset($data[26])?$data[26]:null,
                                        'nombres_prof'=>isset($data[27])?$data[27]:null, 'profesion'=>isset($data[28])?$data[28]:null, 'numprof'=>isset($data[29])?$data[29]:null,
                                        'fecha_registro'=>isset($data[30])?$data[30]:null, 'paterno_usuario'=>isset($data[31])?$data[31]:null, 'materno_usuario'=>isset($data[32])?$data[32]:null,
                                        'nombres_usuario'=>isset($data[33])?$data[33]:null, 'tipo_parto'=>isset($data[34])?$data[34]:null);
                                    $band = $this->service->guardarCNV($item);
                                }
                            }
                        }
                    }

                }
                $i++;
            }
            fclose($file);
            if($band){
                return back()->withErrors(['informacion' => 'Se ha completado la importación de datos']);
            }else{
                return back()->withErrors(['error' => 'No se puede completar la importación']);
            }

        }
        else
        {
            return back()->withErrors(['error' => 'No se puede completar la importación']);
        }
    }

}