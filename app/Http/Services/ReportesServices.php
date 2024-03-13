<?php

/**
 * Created by PhpStorm.
 * User: carlo
 * Date: 5/09/2018
 * Time: 09:16
 */

namespace App\Http\Services;

use App\Http\Repository\AccesorioRepository;
use App\Http\Repository\ReportesRepository;

class ReportesServices
{

    protected $repository;
    public function __construct()
    {
        $this->repository = new ReportesRepository();
        $this->repositoryAccesorio = new AccesorioRepository();
    }

    public function reporteNominalEmergencia($params){
        $params = (object)$params;
        return $this->repository->reporteNominalEmergencia($params);
    }


}