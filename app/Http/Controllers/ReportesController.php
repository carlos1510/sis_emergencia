<?php
/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 09:20
 */

namespace App\Http\Controllers;

use App\Http\Exports\ReporteNominalEmergenciaExport;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Services\ReportesServices;
use PHPExcel_Cell_DataType;
use PHPExcel_Style_Alignment;
use  PHPExcel_Style_Fill;
use PHPExcel_Style_Border;

class ReportesController extends Controller
{
    protected $service;
    public function __construct()
    {
        $this->service = new ReportesServices();
    }

    public function reporteNominalEmergencia(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->reporteNominalEmergencia($params));
    }

    public function exportarReporteNominalEmergencia(Request $request){
        return Excel::download(new ReporteNominalEmergenciaExport($request->get('fecha_inicio'), $request->get('fecha_final'), $request->get('cod_2000')), 'ReporteNominalEmergencia_'.date('dmYHis').'_'.$request->get('cod_2000').'.xlsx');
    }

}