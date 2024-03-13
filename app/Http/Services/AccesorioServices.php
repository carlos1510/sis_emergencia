<?php

/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 09:16
 */

namespace App\Http\Services;

use App\Http\Repository\AccesorioRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

class AccesorioServices
{

    protected $repository;
    public function __construct()
    {
        $this->repository = new AccesorioRepository();
    }

    public function listarProfesion($params){
        $params = (object)$params;
        return $this->repository->listarProfesion($params);
    }

    public function listarEtnias($params){
        $params = (object)$params;
        return $this->repository->listarEtnias($params);
    }

    public function listarUbigeo($params){
        $params = (object)$params;
        return $this->repository->listarUbigeo($params);
    }

    public function listarEstablecimientos($params){
        $params = (object)$params;
        return $this->repository->listarEstablecimientos($params);
    }

    public function listarRedes($params){
        $params = (object)$params;
        return $this->repository->listarRedes($params);
    }

    public function listarMicroRedes($params){
        $params = (object)$params;
        return $this->repository->listarMicroRedes($params);
    }

    public function listaUpsByEmergenciaHospitalizacion($params){
        $params = (object)$params;
        return $this->repository->listaUpsByEmergenciaHospitalizacion($params);
    }

    public function filtrarCIEX($params){
        $params = (object) $params;
        return $this->repository->filtrarCIEX($params);
    }

    public function buscarEESSByCodigo($params){
        $params = (object) $params;
        return $this->repository->buscarEESSByCodigo($params);
    }

    public function getIPRESSAtencion($params){
        $params = (object) $params;
        return $this->repository->getIPRESSAtencion($params);
    }

    public function getReporteInicio($params){
        $params = (object) $params;
        return $this->repository->getReporteInicio($params);
    }

    public function listarEstablecimientosAtencion($params){
        $params = (object) $params;
        return $this->repository->listarEstablecimientosAtencion($params);
    }

    public function getListaMedicamentos(){
        return $this->repository->getListaMedicamentos();
    }

}