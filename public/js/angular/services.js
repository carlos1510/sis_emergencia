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
    }
});

app.factory('accesorioService', function($http){
    return {
        pruebaConexionHisMinsa: function ($params) {
            //return $http.get("https://websalud.minsa.gob.pe/appInmunizacion/moduloActividad.hisminsa?u=72627303");
            /*return $http({
                url: "https://websalud.minsa.gob.pe/appInmunizacion/moduloActividad.hisminsa",
                method: "GET",
                params: {u: "72627303"},
                contentType: "text/xml;charset=UTF-8",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                accessControlAllowOrigin: ""
            });*/
            //return $http.get("https://api.dniruc.com/api/search/dni/46902128/AJi4QfFULABGamPKe10x_qkZ0GEKjcbIGoG59lkkXUgu6DQcrzSSqwRqhsqj81IAn-J6ghh8idA");
            return $http.get("https://www.facturacionelectronica.us/facturacion/controller/ws_consulta_rucdni_v2.php?documento=DNI&usuario=10447915125&password=985511933&nro_documento=40688830");
            //return $http.get("https://dniruc.apisperu.com/api/v1/dni/75741260?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNjdmMyMDIwMDVAZ21haWwuY29tIn0._c8_lM_LIID-KQlHWSKBAVMypp_MxiNlTt2eWlmhO3o")
        },
        pruebaConsultaReniecHisMinsa: function ($params) {
            return $http.get("https://websalud.minsa.gob.pe/appInmunizacion/view/registros/vacunados/Pacientes?accion=WS_CONSULTARENIEC&dni=46902128&tipodoc=1");
        },
        consultarDNIRUCReniec: function ($params) {
            return $http.get("https://dniruc.apisperu.com/api/v1/dni/" + $params.dni + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNjdmMyMDIwMDVAZ21haWwuY29tIn0._c8_lM_LIID-KQlHWSKBAVMypp_MxiNlTt2eWlmhO3o")
        },
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

app.factory('reportesService', function($http){
    return {
        iniciar: function ($params) {
            return $http.post("iniciarSesion", $params)
        },
        getListarIndicador1: function ($params) {
            return $http.post("reporte/getListarIndicador1", $params)
        },
        getListarIndicador2: function ($params) {
            return $http.post("reporte/getListarIndicador2", $params)
        },
        getListarIndicador3: function ($params) {
            return $http.post("reporte/getListarIndicador3", $params)
        },
        getListarIndicador4: function ($params) {
            return $http.post("reporte/getListarIndicador4", $params)
        },
        getListarIndicador5: function ($params) {
            return $http.post("reporte/getListarIndicador5", $params)
        },
        tramaB1: function ($params) {
            return $http.post("reporte/tramaB1", $params)
        },
        tramaB2: function ($params) {
            return $http.post("reporte/tramaB2", $params)
        },
        tramaC1: function ($params) {
            return $http.post("reporte/tramaC1", $params)
        },
        tramaC2: function ($params) {
            return $http.post("reporte/tramaC2", $params)
        },
        tramaD1: function ($params) {
            return $http.post("reporte/tramaD1", $params)
        },
        tramaD2: function ($params) {
            return $http.post("reporte/tramaD2", $params)
        },
        tramaG: function ($params) {
            return $http.post("reporte/tramaG", $params)
        },
        tramaA: function ($params) {
            return $http.post("reporte/tramaA", $params)
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
        reporteTurnoHora: function ($params) {
            return $http.post("reporte/reporteTurnoHora", $params)
        },reporteAtencionesProfesionales: function ($params) {
            return $http.post("reporte/reporteAtencionesProfesionales", $params)
        },
        reporteMC05: function ($params) {
            return $http.post("reporte/reporteMC05", $params)
        },
    }
});



