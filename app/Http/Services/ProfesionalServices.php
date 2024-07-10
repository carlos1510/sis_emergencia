<?php

/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 09:16
 */

namespace App\Http\Services;

use App\Http\Repository\ProfesionalRepository;

class ProfesionalServices
{

    protected $repository;
    public function __construct()
    {
        $this->repository = new ProfesionalRepository();
    }

    public function getUsuario($usuario, $clave){
        //$params = (object)$params;
        return $this->repository->getUsuario($usuario, $clave);
    }

    public function getLista($params){
        $params = (object)$params;
        return $this->repository->getLista($params);
    }

    public function guardarUpdateProfesional($params){
        $params = (object)$params;
        return $this->repository->guardarUpdateProfesional($params);
    }

    public function guardarUsuario($params){
        $params = (object)$params;
        return $this->repository->guardarUsuario($params);
    }

    public function buscarProfesionalMedico($params){
        $params = (object)$params;
        return $this->repository->buscarProfesionalMedico($params);
    }

    public function buscarProfesionalNoMedico($params){
        $params = (object)$params;
        return $this->repository->buscarProfesionalNoMedico($params);
    }

    public function listarProfesionalByTipo($params){
        $params = (object)$params;
        return $this->repository->listarProfesionalByTipo($params);
    }
    public function listaProfecionalesPrueba($params){
        $params = (object)$params;
        return $this->repository->listaProfecionalesPrueba($params);
    }


}