<?php

namespace App\Http\Services;

use App\Http\Repository\ActividadesHisRepository;

class ActividadesHisServices
{
    protected $repository;
    public function __construct()
    {
        $this->repository = new ActividadesHisRepository();
    }

    public function listarActividadesHis($params){
        $params = (object)$params;
        return $this->repository->listarActividadesHis($params);
    }
    public function imprimirHis($params){
        $params = (object)$params;
        return $this->repository->imprimirHis($params);
    }
    
}
