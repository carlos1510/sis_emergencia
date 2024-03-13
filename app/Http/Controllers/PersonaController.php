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

use App\Http\Services\PersonaServices;

class PersonaController extends Controller
{
    protected $service;
    public function __construct()
    {
        $this->service = new PersonaServices();
    }

    public function buscarPersonaByTipo(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->buscarPersonaByTipo($params));
    }

    public function generarCodigoSinDocumento(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->generarCodigoSinDocumento($params));
    }

    public function getPersonaByDNI(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getPersonaByDNI($params));
    }



    public function guardarUpdatePersona(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->guardarUpdatePersona($params));
    }
}