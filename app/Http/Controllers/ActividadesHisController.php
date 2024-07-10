<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;

use App\Http\Services\ActividadesHisServices;

class ActividadesHisController extends Controller
{
    protected $service;
    public function __construct()
    {
        $this->service = new ActividadesHisServices();
    }

    public function listarActividadesHis(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->listarActividadesHis($params));
    }
    
    public function imprimirHis(Request $request){
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        return new JsonResponse($this->service->imprimirHis($params));
    }
    


}