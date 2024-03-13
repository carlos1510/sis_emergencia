<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Auth;
use Illuminate\Http\Request;

use App\Http\Services\ProfesionalServices;

class LoginController extends Controller
{

    public function index(){
        if(Session::has('idusuario')){
            return redirect('/home');
        }else{
            return view('auth.login');
        }
    }


    public function login(Request $request){
        $this->validate(request(),[
            'usuario' => 'required|string',
            'clave' => 'required|string'
        ]);

        $services = new ProfesionalServices();
        $user = $services->getUsuario($request->get('usuario'), $request->get('clave'));

        if(count($user)>0){
            if(isset($user['error'])){
                return back()->withErrors(['usuario' => trans('auth.failed')])
                    ->withInput(request()->only('usuario'));
            }else{
                //var_dump($user[0]->id);
                Session::put('idusuario', $user[0]->id);
                Session::put('nombres', $user[0]->nombres_personal);
                Session::put('nick', $user[0]->nick);
                Session::put('idnivel', isset($user[0]->idnivel)?$user[0]->idnivel:null);
                Session::put('idprofesional', isset($user[0]->idprofesional)?$user[0]->idprofesional:null);
                Session::put('nom_nivel', $user[0]->nom_nivel);
//                Session::put('nom_profesion', $user[0]->nom_profesion);
                Session::put('paterno', isset($user[0]->apellido_paterno_personal)?$user[0]->apellido_paterno_personal:'');
                Session::put('materno', isset($user[0]->apellido_materno_personal)?$user[0]->apellido_materno_personal:'');
                //Session::put('telefono', isset($user[0]->telefono)? $user[0]->telefono:'');
                Session::put('cod_2000', isset($user[0]->cod_2000)?$user[0]->cod_2000:'');
                Session::put('nom_eess', isset($user[0]->nom_eess)?$user[0]->nom_eess:'');
                Session::put('nom_microred', isset($user[0]->nom_microred)?$user[0]->nom_microred:'');
                Session::put('nom_red', isset($user[0]->nom_red)?$user[0]->nom_red:'');
                Session::put('nom_disa', isset($user[0]->nom_disa)?$user[0]->nom_disa:'');
                Session::put('codigo_disa', isset($user[0]->codigo_disa)?$user[0]->codigo_disa:'');
                Session::put('codigo_red', isset($user[0]->codigo_red)?$user[0]->codigo_red:'');
                Session::put('codigo_microred', isset($user[0]->codigo_microred)?$user[0]->codigo_microred:'');
                //return $user[0]->id;
                return redirect('/home');
            }
        }else {
            return back()->withErrors(['usuario' => trans('auth.failed')])
                ->withInput(request()->only('usuario'));
        }
    }

    public function logout(){
        Session::flush();

        return redirect('/');
    }
}
