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

use App\Http\Services\EmergenciaServices;

class EmergenciaController extends Controller
{
    protected $service;
    public function __construct()
    {
        $this->service = new EmergenciaServices();
    }

    public function guardarUpdateEmergencia(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->guardarUpdateEmergencia($params));
    }

    public function listarEmergencia(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarEmergencia($params));
    }

    public function eliminarEmergencia(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->eliminarEmergencia($params));
    }

    public function getMedicamentobyId(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getMedicamentobyId($params));
    }

    public function getProfesionalRegistro(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getProfesionalRegistro($params));
    }

    public function guardarTratamientoEmergencia(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->guardarTratamientoEmergencia($params));
    }

    public function buscarEmergenciaByDNI(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->buscarEmergenciaByDNI($params));
    }

    public function getNumeroTratamiento(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getNumeroTratamiento($params));
    }

    public function getNumeroTratamientoProcedimiento(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getNumeroTratamientoProcedimiento($params));
    }

    public function getNumeroTratamientoProcedimientoNuevo(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getNumeroTratamientoProcedimientoNuevo($params));
    }

    public function getActividadHisEmergencia(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getActividadHisEmergencia($params));
    }

    public function getDetalleHisEmergencia(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getDetalleHisEmergencia($params));
    }
}