var token = $("meta[name='csrf-token']").attr("content");
var header = $("meta[name='csrf-param']").attr("content");
var csrf_header=[];
csrf_header[header]=token;

app.factory('homeService', function($http){
    return {
        iniciar: function ($params) {
            return $http.post("iniciarSesion", $params)
        },
        probar: function ($params) {
            return $http.post("probar", $params)
        },
        calcularSemanas: function ($params) {
            return $http.post("calcularSemanas", $params)
        },
    }
});


app.factory('personaService', function($http){
    return {
        buscarPersonaByTipo: function ($params) {
            return $http.post("persona/buscarPersonaByTipo", $params)
        },
        generarCodigoSinDocumento: function ($params) {
            return $http.post("persona/generarCodigoSinDocumento", $params)
        },
        guardarUpdatePersona: function ($params) {
            return $http.post("persona/guardarUpdatePersona", $params)
        },
    }
});

app.factory('emergenciaService', function($http){
    return {
        guardarUpdateEmergencia: function ($params) {
            return $http.post("emergencia/guardarUpdateEmergencia", $params)
        },
        listarEmergencia: function ($params) {
            return $http.post("emergencia/listarEmergencia", $params)
        },
        eliminarEmergencia: function ($params) {
            return $http.post("emergencia/eliminarEmergencia", $params)
        },
        getMedicamentobyId: function ($params) {
            return $http.post("emergencia/getMedicamentobyId", $params)
        },
        getProfesionalRegistro: function ($params) {
            return $http.post("emergencia/getProfesionalRegistro", $params)
        },
        guardarTratamientoEmergencia: function ($params) {
            return $http.post("emergencia/guardarTratamientoEmergencia", $params)
        },
        buscarEmergenciaByDNI: function ($params) {
            return $http.post("emergencia/buscarEmergenciaByDNI", $params)
        },
        getNumeroTratamiento: function ($params) {
            return $http.post("emergencia/getNumeroTratamiento", $params)
        },
        getNumeroTratamientoProcedimiento: function ($params) {
            return $http.post("emergencia/getNumeroTratamientoProcedimiento", $params)
        },
        getNumeroTratamientoProcedimientoNuevo: function ($params) {
            return $http.post("emergencia/getNumeroTratamientoProcedimientoNuevo", $params)
        },
        getActividadHisEmergencia: function ($params) {
            return $http.post("emergencia/getActividadHisEmergencia", $params)
        },
        getDetalleHisEmergencia: function ($params) {
            return $http.post("emergencia/getDetalleHisEmergencia", $params)
        },
    }
});


app.factory('profesionalService', function($http){
    return {
        guardarUpdateProfesional: function ($params) {
            return $http.post("profesional/guardarUpdateProfesional", $params)
        },
        getLista: function ($params) {
            return $http.post("profesional/getLista", $params)
        },
        guardarUsuario: function ($params) {
            return $http.post("profesional/guardarUsuario", $params)
        },
        buscarProfesionalMedico: function ($params) {
            return $http.post("profesional/buscarProfesionalMedico", $params)
        },
        buscarProfesionalNoMedico: function ($params) {
            return $http.post("profesional/buscarProfesionalNoMedico", $params)
        },
        listarProfesionalByTipo: function ($params){
            return $http.post("profesional/listarProfesionalByTipo", $params)
        },
        listaProfecionalesPrueba: function ($params){
            return $http.post("profesional/listaProfecionalesPrueba", $params)
        }
    }
});

app.factory('accesorioService', function($http){
    return {
        listarProfesion: function ($params) {
            return $http.post("accesorio/listarProfesion", $params)
        },
        listarEtnias: function ($params) {
            return $http.post("accesorio/listarEtnias", $params)
        },
        listarUbigeo: function ($params) {
            return $http.post("accesorio/listarUbigeo", $params)
        },
        listarEstablecimientos: function ($params) {
            return $http.post("accesorio/listarEstablecimientos", $params)
        },
        listarRedes: function ($params) {
            return $http.post("accesorio/listarRedes", $params)
        },
        listarMicroRedes: function ($params) {
            return $http.post("accesorio/listarMicroRedes", $params)
        },
        listaUpsByEmergenciaHospitalizacion: function ($params) {
            return $http.post("accesorio/listaUpsByEmergenciaHospitalizacion", $params)
        },
        filtrarCIEX: function ($params) {
            return $http.post("accesorio/filtrarCIEX", $params)
        },
        getDatosUsuario: function ($params) {
            return $http.post("accesorio/getDatosUsuario", $params)
        },
        buscarEESSByCodigo: function ($params) {
            return $http.post("accesorio/buscarEESSByCodigo", $params)
        },
        getListaMedicamentos: function ($params) {
            return $http.post("accesorio/getListaMedicamentos", $params)
        },
        calcularEdad: function ($params) {
            return $http.post("accesorio/calcularEdad", $params)
        },
        getIPRESSAtencion: function ($params) {
            return $http.post("accesorio/getIPRESSAtencion", $params)
        },
        getReporteInicio: function ($params) {
            return $http.post("accesorio/getReporteInicio", $params)
        },
        listarEstablecimientosAtencion: function ($params) {
            return $http.post("accesorio/listarEstablecimientosAtencion", $params)
        },
    }
});

app.factory('actividadesHisService',function($http){
    return{
        listarActividadesHis: function ($params) {
            return $http.post('actividadeshis/listarActividadesHis', $params)
        },
        imprimirHis: function($params){
            return $http.post('actividadeshis/imprimirHis',$params)
        }
    }
});

app.factory('reportesService', function($http){
    return {
        iniciar: function ($params) {
            return $http.post("iniciarSesion", $params)
        },
        
        reporteVisitaProfam: function ($params) {
            return $http.post("reporte/reporteVisitaProfam", $params)
        },
        reporteEpidemologico: function ($params) {
            return $http.post("reporte/reporteEpidemologico", $params)
        },
        indicadorS3Apendis: function ($params) {
            return $http.post("reporte/indicadorS3Apendis", $params)
        },
        indicadorS3ApendisNominal: function ($params) {
            return $http.post("reporte/indicadorS3ApendisNominal", $params)
        },
        reporteTeleSalud: function ($params) {
            return $http.post("reporte/reporteTeleSalud", $params)
        },
        indicadorVacunaCompleta: function ($params) {
            return $http.post("reporte/indicadorVacunaCompleta", $params)
        },
    }
});



