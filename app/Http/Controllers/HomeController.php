<?php

namespace App\Http\Controllers;

use App\Http\Repository\AccesorioRepository;
use App\Http\Requests;
use App\Http\Services\AccesorioServices;
use App\Http\Services\GestanteServices;
use App\Http\Services\ReportesServices;
use App\Http\Services\ProfesionalServices;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\View;
use Maatwebsite\Excel\Facades\Excel;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $params = null;
        /*$id = Session::get('idusuario');
        if(isset($id)){
            $notificacion = new ReportesServices();
            $lista_notificacion = $notificacion->allNotificaciones($params);
            View::share('lista_notificacion', $lista_notificacion);
        }*/

        //$this->middleware('auth');
        //$id = Session::has('idusuario');
        if(Session::has('idusuario')){
            Session::put('menu_primario', 'home');
            return view('/welcome');
        }else{
            return redirect('/');
        }
    }

    public function getSesion(){
         $id = Session::get('idusuario');
        return $id;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        //return view('welcome');
        if(Session::has('idusuario')){
            return view('/welcome');
        }else{
            return redirect('/');
        }
        /*$id = Session::get('idusuario');
        if(isset($id)){
            Session::put('menu_primario', 'inicio');
            Session::forget('menu_secundario');
            $gestante = new GestanteServices();
            $cantidad = $gestante->getCantidadObservados($params);
            $notificacion = new ReportesServices();
            $lista_notificacion = $notificacion->allNotificaciones($params);
            return view('welcome', compact('cantidad', 'lista_notificacion'));
        }else{
            return redirect('/');
        }*/
    }

    public function viewImportar(Request $request)
    {
        $id = Session::get('idusuario');
        if(isset($id)){
            return view('configuracion/importar');
        }else{
            return redirect('/');
        }
    }

    public function viewProcesar(Request $request)
    {
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        if(Session::has('idusuario')){
            return view('configuracion/procesamiento');
        }else{
            return redirect('/');
        }
    }

    public function viewProfesional(Request $request)
    {
        /*$request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        if(Session::has('idusuario')){
            return view('configuracion/profesionales');
        }else{
            return redirect('/');
        }*/
        return view('configuracion/profesionales');
    }

    public function viewUsuario(Request $request)
    {
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        if(Session::has('idusuario')){
            return view('configuracion/usuario');
        }else{
            return redirect('/');
        }
    }

    public function viewEmergencia(Request $request)
    {
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        if(Session::has('idusuario')){
            Session::put('menu_primario', 'emergencia');
            //Session::put('menu_secundario', 'registrar_emergencia');
            return view('emergencia/emergencia');
        }else{
            return redirect('/');
        }
    }

    public function viewHospitalizacion(Request $request)
    {
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        if(Session::has('idusuario')){
            Session::put('menu_primario', 'hospitalizacion');
            Session::put('menu_secundario', 'registrar_hospitalizacion');
            return view('hospitalizacion/hospita2lizacion');
        }else{
            return redirect('/');
        }
    }

    public function viewReporteRegistroDiario(Request $request)
    {
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        if(Session::has('idusuario')){
            Session::put('menu_primario', 'reportes');
            Session::put('menu_secundario', 'registro_diario');
            return view('reportes/registro_diario');
        }else{
            return redirect('/');
        }
    }

    public function viewReporteNominalEmergencia(Request $request)
    {
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        if(Session::has('idusuario')){
            Session::put('menu_primario', 'reportes');
            Session::put('menu_secundario', 'nominal_emergencia');
            return view('reportes/reporteNominalEmergencia');
        }else{
            return redirect('/');
        }
    }

    public function viewAtencionHIS(Request $request)
    {
        $request->isXmlHttpRequest();
        $content = $request->getContent();
        $params = json_decode($content);
        if(Session::has('idusuario')){
            Session::put('menu_primario', 'his');
            //Session::put('menu_secundario', 'nominal_emergencia');
            return view('his/atencionesHis');
        }else{
            return redirect('/');
        }
    }
    



}
