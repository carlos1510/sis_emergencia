<?php

/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 09:16
 */

namespace App\Http\Services;

use App\Http\Repository\EmergenciaRepository;

class EmergenciaServices
{

    protected $repository;
    public function __construct()
    {
        $this->repository = new EmergenciaRepository();
    }

    public function guardarUpdateEmergencia($params){
        $params = (object)$params;
        return $this->repository->guardarUpdateEmergencia($params);
    }

    public function listarEmergencia($params){
        $params = (object)$params;
        return $this->repository->listarEmergencia($params);
    }

    public function eliminarEmergencia($params){
        $params = (object)$params;
        return $this->repository->eliminarEmergencia($params);
    }

    public function getMedicamentobyId($params){
        $params = (object)$params;
        return $this->repository->getMedicamentobyId($params);
    }

    public function getProfesionalRegistro($params){
        $params = (object)$params;
        return $this->repository->getProfesionalRegistro($params);
    }

    public function guardarTratamientoEmergencia($params){
        $params = (object)$params;
        return $this->repository->guardarTratamientoEmergencia($params);
    }

    public function buscarEmergenciaByDNI($params){
        $params = (object)$params;
        return $this->repository->buscarEmergenciaByDNI($params);
    }

    public function getNumeroTratamiento($params){
        $params = (object)$params;
        return $this->repository->getNumeroTratamiento($params);
    }

    public function getNumeroTratamientoProcedimiento($params){
        $params = (object)$params;
        return $this->repository->getNumeroTratamientoProcedimiento($params);
    }

    public function getNumeroTratamientoProcedimientoNuevo($params){
        $params = (object)$params;
        return $this->repository->getNumeroTratamientoProcedimientoNuevo($params);
    }

    public function getActividadHisEmergencia($params){
        $params = (object)$params;
        return $this->repository->getActividadHisEmergencia($params);
    }

    public function getDetalleHisEmergencia($params){
        $params = (object)$params;
        return $this->repository->getDetalleHisEmergencia($params);
    }

}