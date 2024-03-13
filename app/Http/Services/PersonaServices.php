<?php

/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 09:16
 */

namespace App\Http\Services;

use App\Http\Repository\PersonaRepository;

class PersonaServices
{

    protected $repository;
    public function __construct()
    {
        $this->repository = new PersonaRepository();
    }

    public function getPersonaByDNI($params){
        $params = (object)$params;
        return $this->repository->getPersonaByDNI($params);
    }

    public function generarCodigoSinDocumento($params){
        $params = (object)$params;
        return $this->repository->generarCodigoSinDocumento($params);
    }

    public function buscarPersonaByTipo($params){
        $params = (object)$params;
        return $this->repository->buscarPersonaByTipo($params);
    }

   public function guardarUpdatePersona($params){
       $params = (object)$params;
       return $this->repository->guardarUpdatePersona($params);
   }



}