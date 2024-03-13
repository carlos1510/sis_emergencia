<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['middleware' => ['web']], function () {
    //vistas
    Route::get('/', 'App\Http\Controllers\Auth\LoginController@index');
    Route::post('login', 'App\Http\Controllers\Auth\LoginController@login')->name('login');
    Route::get('logout', 'App\Http\Controllers\Auth\LoginController@logout')->name('logout');
    Route::get('/home', 'App\Http\Controllers\HomeController@index');
    Route::get('/importar', 'App\Http\Controllers\HomeController@viewImportar');
    Route::get('/procesar', 'App\Http\Controllers\HomeController@viewProcesar');
    Route::get('/profesional', 'App\Http\Controllers\HomeController@viewProfesional');
    Route::get('/usuario', 'App\Http\Controllers\HomeController@viewUsuario');
    Route::get('/emergencia', 'App\Http\Controllers\HomeController@viewEmergencia');
    Route::get('/hospitalizacion', 'App\Http\Controllers\HomeController@viewHospitalizacion');
    Route::get('/registro_diario', 'App\Http\Controllers\HomeController@viewReporteRegistroDiario');
    Route::get('/nominal_emergencia', 'App\Http\Controllers\HomeController@viewReporteNominalEmergencia');
    Route::get('/atencion_his', 'App\Http\Controllers\HomeController@viewAtencionHIS');


    //rutas de informacion
    Route::post('importarArchivos', 'App\Http\Controllers\AccesorioController@importarArchivos');
    Route::post('accesorio/procesarAtencionesGestante', 'App\Http\Controllers\AccesorioController@asignarAtencionesGestantes');
    Route::post('accesorio/limpiarAtencionesGestante', 'App\Http\Controllers\AccesorioController@limpiarAtencionesGestante');
    Route::post('accesorio/procesarDataPlanificacionFamiliar', 'App\Http\Controllers\AccesorioController@procesarDataPlanificacionFamiliar');
    Route::post('accesorio/procesarDataSaludMental', 'App\Http\Controllers\AccesorioController@procesarDataSaludMental');
    Route::post('accesorio/buscarEESSByCodigo', 'App\Http\Controllers\AccesorioController@buscarEESSByCodigo');
    Route::post('accesorio/calcularEdad', 'App\Http\Controllers\AccesorioController@calcularEdad');
    Route::post('accesorio/listarEstablecimientosAtencion', 'App\Http\Controllers\AccesorioController@listarEstablecimientosAtencion');


    //persona
    Route::post('persona/buscarPersonaByTipo', 'App\Http\Controllers\PersonaController@buscarPersonaByTipo');
    Route::post('persona/generarCodigoSinDocumento', 'App\Http\Controllers\PersonaController@generarCodigoSinDocumento');

    //profesional
    Route::post('profesional/guardarUpdateProfesional', 'App\Http\Controllers\ProfesionalController@guardarUpdateProfesional');
    Route::post('profesional/getLista', 'App\Http\Controllers\ProfesionalController@getLista');
    Route::post('profesional/guardarUsuario', 'App\Http\Controllers\ProfesionalController@guardarUsuario');
    Route::post('profesional/buscarProfesionalMedico', 'App\Http\Controllers\ProfesionalController@buscarProfesionalMedico');
    Route::post('profesional/buscarProfesionalNoMedico', 'App\Http\Controllers\ProfesionalController@buscarProfesionalNoMedico');

    //emergencia
    Route::post('emergencia/guardarUpdateEmergencia', 'App\Http\Controllers\EmergenciaController@guardarUpdateEmergencia');
    Route::post('emergencia/listarEmergencia', 'App\Http\Controllers\EmergenciaController@listarEmergencia');
    Route::post('emergencia/eliminarEmergencia', 'App\Http\Controllers\EmergenciaController@eliminarEmergencia');
    Route::post('emergencia/getMedicamentobyId', 'App\Http\Controllers\EmergenciaController@getMedicamentobyId');
    Route::post('emergencia/getProfesionalRegistro', 'App\Http\Controllers\EmergenciaController@getProfesionalRegistro');
    Route::post('emergencia/guardarTratamientoEmergencia', 'App\Http\Controllers\EmergenciaController@guardarTratamientoEmergencia');
    Route::post('emergencia/buscarEmergenciaByDNI', 'App\Http\Controllers\EmergenciaController@buscarEmergenciaByDNI');
    Route::post('emergencia/getNumeroTratamiento', 'App\Http\Controllers\EmergenciaController@getNumeroTratamiento');
    Route::post('emergencia/getNumeroTratamientoProcedimiento', 'App\Http\Controllers\EmergenciaController@getNumeroTratamientoProcedimiento');
    Route::post('emergencia/getNumeroTratamientoProcedimientoNuevo', 'App\Http\Controllers\EmergenciaController@getNumeroTratamientoProcedimientoNuevo');
    Route::post('emergencia/getActividadHisEmergencia', 'App\Http\Controllers\EmergenciaController@getActividadHisEmergencia');
    Route::post('emergencia/getDetalleHisEmergencia', 'App\Http\Controllers\EmergenciaController@getDetalleHisEmergencia');

    Route::post('accesorio/listarProfesion', 'App\Http\Controllers\AccesorioController@listarProfesion');
    Route::post('accesorio/listarEtnias', 'App\Http\Controllers\AccesorioController@listarEtnias');
    Route::post('accesorio/listarUbigeo', 'App\Http\Controllers\AccesorioController@listarUbigeo');
    Route::post('accesorio/listarEstablecimientos', 'App\Http\Controllers\AccesorioController@listarEstablecimientos');
    Route::post('accesorio/listarRedes', 'App\Http\Controllers\AccesorioController@listarRedes');
    Route::post('accesorio/listarMicroRedes', 'App\Http\Controllers\AccesorioController@listarMicroRedes');
    Route::post('accesorio/listaUpsByEmergenciaHospitalizacion', 'App\Http\Controllers\AccesorioController@listaUpsByEmergenciaHospitalizacion');
    Route::post('accesorio/filtrarCIEX', 'App\Http\Controllers\AccesorioController@filtrarCIEX');
    Route::post('accesorio/getDatosUsuario', 'App\Http\Controllers\AccesorioController@getDatosUsuario');
    Route::post('accesorio/getListaMedicamentos', 'App\Http\Controllers\AccesorioController@getListaMedicamentos');
    Route::post('accesorio/getIPRESSAtencion', 'App\Http\Controllers\AccesorioController@getIPRESSAtencion');
    Route::post('accesorio/getReporteInicio', 'App\Http\Controllers\AccesorioController@getReporteInicio');

    Route::post('reporte/reporteNominalEmergencia', 'App\Http\Controllers\ReportesController@reporteNominalEmergencia');

    Route::get('/exportarReporteNominalEmergencia', 'App\Http\Controllers\ReportesController@exportarReporteNominalEmergencia');


    //Route::get('/home', 'HomeController@index');
    /**
     * Limpieza de laravel para la visualizacion en otros navegadores
     */
    //Clear Cache facade value:
    Route::get('/clear-cache', function() {
        $exitCode = Artisan::call('cache:clear');
        return '<h1>Cache facade value cleared</h1>';
    });

    //Reoptimized class loader:
    Route::get('/optimize', function() {
        $exitCode = Artisan::call('optimize');
        return '<h1>Reoptimized class loader</h1>';
    });

    //Route cache:
    Route::get('/route-cache', function() {
        $exitCode = Artisan::call('route:cache');
        return '<h1>Routes cached</h1>';
    });

    //Clear Route cache:
    Route::get('/route-clear', function() {
        $exitCode = Artisan::call('route:clear');
        return '<h1>Route cache cleared</h1>';
    });

    //Clear View cache:
    Route::get('/view-clear', function() {
        $exitCode = Artisan::call('view:clear');
        return '<h1>View cache cleared</h1>';
    });

    //Clear Config cache:
    Route::get('/config-cache', function() {
        $exitCode = Artisan::call('config:cache');
        return '<h1>Clear Config cleared</h1>';
    });
});
