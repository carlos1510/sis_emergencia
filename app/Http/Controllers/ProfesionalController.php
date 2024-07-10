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

use App\Http\Services\ProfesionalServices;

class ProfesionalController extends Controller
{
    protected $service;
    public function __construct()
    {
        $this->service = new ProfesionalServices();
    }

    public function getLista(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->getLista($params));
    }

    public function guardarUpdateProfesional(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->guardarUpdateProfesional($params));
    }

    public function guardarUsuario(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->guardarUsuario($params));
    }

    public function buscarProfesionalMedico(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->buscarProfesionalMedico($params));
    }

    public function buscarProfesionalNoMedico(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->buscarProfesionalNoMedico($params));
    }

    public function listarProfesionalByTipo(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarProfesionalByTipo($params));
    }
    public function listaProfecionalesPrueba(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listaProfecionalesPrueba($params));
    }

}