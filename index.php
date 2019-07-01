<?php

//header('content-type: application/json; charset=utf-8');
date_default_timezone_set("America/Bogota");

/* Permitir peticiones desconocidas para desarrollo */
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

require 'vendor/autoload.php';

//Create and configure Slim app
$config = ['settings' => [
    'addContentLengthHeader' => false,
]];

$app = new \Slim\App($config);

function getDB(){

    /*Datos de conexión */
    $dbhost = "localhost";
    $dbname = "id8762051_pr_ova";
    $dbuser = "id8762051_pr_ova";
    $dbpass = "pr_ova";

    /*Conexion PDO */
    $mysql_con_string = "mysql:host=$dbhost;dbname=$dbname";
    $db_connection = new PDO($mysql_con_string, $dbuser, $dbpass);
    $db_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /*Se retorna la instancia dela conexión */
    return $db_connection;

}

/**************************             *************************** */
/**************************  ALL USERS  *************************** */
/**************************             *************************** */

//SE RECUPERAN LOS TIPOS DE USUARIO
$app->get('/typeUser', function ($request, $response, $args) {

    try {
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se prepara la sentencia Sql */
        $queryTypeUser  = $db->prepare("SELECT * FROM TIPO_USUARIO");
        /*Se ejecuta la sentencia */
        $queryTypeUser  -> execute();
        /*Se recupera el arreglo asociativo de la respuesta del Query */
        $tipoUsuario = $queryTypeUser->fetchAll(PDO::FETCH_ASSOC);
        /*Si la variable devuelve registros se retornan los datos de lo contrario de muestra un mensaje de error 2-> no hay registros */
        if($tipoUsuario){
            /*Se retornan los datos devueltos por la consulta */
            $response = $response->withJson($tipoUsuario);
            /* Se cierra la conexion */
            $db = null;
        }else{
            /*Se retorna  2-> cuando no hay datos para mostrar*/
            $response->write('{ "error" : "2", "message": "No hay datos para mostrar"}');
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA REGISTRAR UN USUARIO
$app->post('/register', function ( $request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se prepara la sentencia Sql */
        $queryRegister  = $db -> prepare("INSERT INTO USUARIO (NOMBRES, APELLIDOS, EMAIL, PASS, AVATAR, ID_TIPO_USUARIO) VALUES (?, ?, ?, ?, ?, ?)");
        /*Se ejecuta la sentencia */
        $queryRegister -> execute(array($data['NOMBRES'], $data['APELLIDOS'], $data['EMAIL'], $data['PASS'], str_replace(' ', '+', $data['AVATAR']) , $data['ID_TIPO_USUARIO']));

        if( $queryRegister-> errorCode() == '00000' ){
            /*Se retorna el exito de la consulta 0-> si no ocurre ningun error */
            $response->write('{ "error" : "0", "message": "Operación realizada exitosamente."}');
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }

    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA LOGUEAR USUARIOS
$app->post('/login', function ( $request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se prepara la sentencia Sql */
        $queryLogin  = $db -> prepare("SELECT U.*, TP.DESCRIPCION AS TIPO FROM USUARIO U INNER JOIN TIPO_USUARIO TP ON U.ID_TIPO_USUARIO = TP.ID WHERE U.EMAIL = ? AND U.PASS = ? AND TP.ID = ? ;");
        /*Se ejecuta la sentencia */
        $queryLogin -> execute( array($data['EMAIL'], $data['PASS'], $data['TYPEUSER']) );
        /*Se recupera el arreglo asociativo de la respuesta del Query */
        $usuario = $queryLogin->fetchAll(PDO::FETCH_ASSOC);
        /*Si la variable devuelve registros se retornan los datos de lo contrario de muestra un mensaje de error 2-> no hay registros */
        if($usuario){
            /*Se retornan los datos devueltos por la consulta */
            $response = $response->withJson($usuario);
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }else{
            /*Se retorna  2-> cuando no hay datos para mostrar*/
            $response->write('{ "error" : "2", "message": "No hay datos para mostrar"}');
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }

    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA MODIFICAR LA INFORMACION DE UN USUARIO
$app->post('/updateInfoUser', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se prepara la sentencia Sql */
        $queryUpdateUser  = $db -> prepare("UPDATE USUARIO SET NOMBRES = ?, APELLIDOS = ?, AVATAR = ? WHERE ID = ?");
        /*Se ejecuta la sentencia */
        $queryUpdateUser ->execute( array( $data['NOMBRES'], $data['APELLIDOS'], str_replace(' ', '+', $data['AVATAR']), $data['ID'] ) );
        /* Se valida que la modificacion fue exitosa */
        if( $queryUpdateUser->errorCode() == '00000' ){
            /*Se retorna el exito de la consulta 0-> si no ocurre ningun error */
            $response->write('{ "error" : "0", "message": "Operación realizada exitosamente."}');
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }

    /*Se retorna la respuesta */
    return $response;

});

/**************************           *************************** */
/**************************  TEACHER  *************************** */
/**************************           *************************** */

//METODO PARA CREAR PROBLEMAS, TABLA PROBLEMA
$app->post('/registerProblems', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se construye la consuslta para el ultimo ID INSERTADO */
        $queryID = $db -> prepare(" SELECT MAX(ID) AS LAST_ID FROM PROBLEMA ");
        /*Se ejecuta la consulta*/
        $queryID->execute();
        /*Se obtiene elultimo ID */
        $inicialPin = $queryID->fetchColumn();
        /*Número aleatorio */
        $aleatorio  = rand(1000,9999);
        /*PIN*/
        $pin = ($inicialPin.$aleatorio.$inicialPin)-24;
        //FECHA DEL SISTEMA
        $fecha = date('Y-m-d');
        // /*Se prepara la sentencia Sql */
        $queryProblema  = $db -> prepare("INSERT INTO PROBLEMA (PIN, TITULO, DESCRIPCION, IMAGEN, PREGUNTA, FECHA, OBSERVACIONES, ID_USUARIO) VALUES ($pin, ?, ?, ?, ?, ?, 'No existe un feedback del problema.', ?)");
        /*Se ejecuta la sentencia */
        $queryProblema -> execute(array( $data['TITULO'], $data['DESCRIPCION'], str_replace(' ', '+', $data['IMAGEN']), $data['PREGUNTA'], $fecha , $data['ID_USUARIO']));
        /* Se valida que la insercion fuera exitosa */
        if( $queryProblema->errorCode() == '00000' ){
            /*Se recupera el id de la ultima insercion */
            $idProblema = $db -> lastInsertId();
            /*Se retorna el exito de la consulta 0-> si no ocurre ningun error */
            $response->write('{"id":"'.$idProblema.'", "pin" : "'.$pin.'"}');
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }
        
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA CREAR RESPUESTAS PROBLEMAS
$app->post('/registerAnswers', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        // /*Se prepara la sentencia Sql */
        $queryAnswer  = $db -> prepare(" INSERT INTO RESPUESTA ( DESCRIPCION, CORRECTA, ID_PROBLEMA) VALUES (?, ?, ?)");
        /*Se ejecuta la sentencia */
        $queryAnswer -> execute( array( $data['DESCRIPCION'], $data['CORRECTA'], $data['ID_PROBLEMA'] ) );
        /* Se valida que la insercion fuera exitosa */
        if( $queryAnswer->errorCode() == '00000' ){
            /*Se retorna el exito de la consulta 0-> si no ocurre ningun error */
            $response->write('{ "error" : "0", "message": "Operación realizada exitosamente."}');
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA CREAR SUGERENCIAS PROBLEMAS
$app->post('/registerSuggestion', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        // /*Se prepara la sentencia Sql */
        $querySuggestion  = $db -> prepare(" INSERT INTO SUGERENCIA ( DESCRIPCION, ID_PROBLEMA) VALUES (?, ?)");
        /*Se ejecuta la sentencia */
        $querySuggestion -> execute( array( $data['DESCRIPCION'], $data['ID_PROBLEMA'] ) );
        /* Se valida que la insercion fuera exitosa */
        if( $querySuggestion->errorCode() == '00000' ){
            /*Se retorna el exito de la consulta 0-> si no ocurre ningun error */
            $response->write('{ "error" : "0", "message": "Operación realizada exitosamente."}');
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA LISTAR LOS PROBLEMAS PROPUESTOS POR UN PROFESOR
$app->post('/teacherProblems', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se prepara la sentencia Sql */
        $query  = $db -> prepare("SELECT * FROM PROBLEMA WHERE ID_USUARIO = ?");
        /*Se ejecuta la sentencia */
        $query ->execute( array( $data['ID_USUARIO'] ) );
        /*Se recupera el arreglo asociativo de la respuesta del Query */
        $problema = $query->fetchAll(PDO::FETCH_ASSOC);
        /*Si la variable devuelve registros se retornan los datos de lo contrario de muestra un mensaje de error 2-> no hay registros */
        if($problema){
            $response = $response->withJson($problema);
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }else{
            /*Se retorna  2-> cuando no hay datos para mostrar*/
            $response->write('{ "error" : "2", "message": "No hay datos para mostrar"}');
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA MODIFICAR EL FEEDBACK DE UN PROBLEMA
$app->post('/updateFeedBackProblem', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se prepara la sentencia Sql */
        $queryUpdateUser  = $db -> prepare("UPDATE PROBLEMA SET OBSERVACIONES = ? WHERE ID = ?");
        /*Se ejecuta la sentencia */
        $queryUpdateUser ->execute( array( $data['OBSERVACIONES'], $data['ID'] ) );
        /* Se valida que la modificacion fue exitosa */
        if( $queryUpdateUser->errorCode() == '00000' ){
            /*Se retorna el exito de la consulta 0-> si no ocurre ningun error */
            $response->write('{ "error" : "0", "message": "Operación realizada exitosamente."}');
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }

    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA LISTAR LOS ESTUDIANTES QUE RESPONDIERON UN PROBLEMA DETERMINADO
$app->post('/infoProblem', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se prepara la sentencia Sql que obtiene cuantos estudiantes han respuesto el problema*/
        $queryGetCountRta  = $db -> prepare("SELECT COUNT(*) AS CANTIDAD_RESPUESTAS FROM RTA_PROBLEMA WHERE ID_PROBLEMA = ?");
        /*Se prepara la sentencia Sql * que obtiene cuantos estudiantes contestaron correctamente*/
        $queryGetCountCorrectRta  = $db -> prepare(" SELECT COUNT(*) CANTIDAD_RESPUESTAS_CORRECTAS FROM RTA_PROBLEMA RPR INNER JOIN PROBLEMA P  ON  RPR.ID_PROBLEMA = P.ID INNER JOIN RESPUESTA R ON  P.ID = R.ID_PROBLEMA WHERE R.ID_PROBLEMA = ? AND RPR.RESPUESTA = R.DESCRIPCION  AND R.CORRECTA = 1");

        /*Se ejecuta la sentencia que trae cantidades */
        $queryGetCountRta -> execute( array( $data['ID_PROBLEMA'] ) );
        $queryGetCountCorrectRta -> execute( array( $data['ID_PROBLEMA'] ) );

        /* Se obtienen los valores de las cuentas*/
        $GetCountRta        = $queryGetCountRta->fetchColumn();
        $GetCountCorrectRta = $queryGetCountCorrectRta->fetchColumn();

        /*Se configura la respuesta*/
        $response->write('{ "error" : "0", "message": "Operación realizada exitosamente.", "cantidadRtaProblema": '.$GetCountRta.', "cantidadRtaProblemaCorrecta": '.$GetCountCorrectRta.'}');

        /*Se cierra la conexion a la base de datos */
        $db = null;

    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }

    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA LISTAR LOS ESTUDIANTES QUE RESPONDIERON UN PROBLEMA DETERMINADO
$app->post('/getStudentTeacherProblem', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        // /*Se prepara la sentencia Sql */
        $queryListProblem  = $db -> prepare("SELECT  EST.ID, EST.NOMBRES, EST.APELLIDOS, EST.AVATAR  FROM USUARIO EST INNER JOIN RTA_PROBLEMA RP   ON EST.ID = RP.ID_USUARIO INNER JOIN PROBLEMA P  ON P.ID = RP.ID_PROBLEMA  WHERE RP.ID_PROBLEMA = ?");
        /*Se ejecuta la sentencia */
        $queryListProblem -> execute( array( $data['ID_PROBLEMA'] ) );
        /*Se recupera el arreglo asociativo de la respuesta del Query */
        $problema = $queryListProblem->fetchAll( PDO::FETCH_ASSOC );
        /*Si la variable devuelve registros se retornan los datos de lo contrario de muestra un mensaje de error 2-> no hay registros */
        if($problema){
            $response = $response->withJson($problema);
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }else{
            /*Se retorna  2-> cuando no hay datos para mostrar*/
            $response->write('{ "error" : "2", "message": "No hay datos para mostrar"}');
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

//METODO CARGAR LA INFORMACIÓN DE UN ESTUDIANTE DETERMINADO RELACIONADO CON UN PROBLEMA
$app->post('/getOnlyStudentProblem', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se prepara la sentencia Sql */
        $query  = $db -> prepare("SELECT DISTINCT EST.NOMBRES, EST.APELLIDOS, RP.CANTIDAD_SUGERENCIAS, R.CORRECTA, RP.ANEXO_POLYA  FROM USUARIO EST INNER JOIN RTA_PROBLEMA RP   ON EST.ID = RP.ID_USUARIO INNER JOIN PROBLEMA P  ON P.ID = RP.ID_PROBLEMA INNER JOIN RESPUESTA R ON P.ID = R.ID_PROBLEMA WHERE P.ID = ? AND EST.ID = ? AND RP.RESPUESTA = R.DESCRIPCION");
        /*Se ejecuta la sentencia */
        $query ->execute( array( $data['ID_PROBLEMA'], $data['ID_USUARIO'] ) );
        /*Se recupera el arreglo asociativo de la respuesta del Query */
        $problema = $query->fetchAll(PDO::FETCH_ASSOC);
        /*Si la variable devuelve registros se retornan los datos de lo contrario de muestra un mensaje de error 2-> no hay registros */
        if($problema){
            $response = $response->withJson($problema);
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }else{
            /*Se retorna  2-> cuando no hay datos para mostrar*/
            $response->write('{ "error" : "2", "message": "No hay datos para mostrar"}');
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

/**************************           *************************** */
/**************************  STUDENT  *************************** */
/**************************           *************************** */

//METODO PARA TRAER EL PROBLEMA PARA EL ESTUDIANTE
$app->post('/getStudentProblem', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        // /*Se prepara la sentencia Sql */
        $queryStudentProblem  = $db -> prepare(" SELECT * FROM PROBLEMA WHERE PIN = ? ");
        /*Se ejecuta la sentencia */
        $queryStudentProblem -> execute( array( $data['PIN'] ) );
        /*Se recupera el arreglo asociativo de la respuesta del Query */
        $problema = $queryStudentProblem->fetchAll( PDO::FETCH_ASSOC );
        /*Si la variable devuelve registros se retornan los datos de lo contrario de muestra un mensaje de error 2-> no hay registros */
        if($problema){
            $response = $response->withJson($problema);
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }else{
            /*Se retorna  2-> cuando no hay datos para mostrar*/
            $response->write('{ "error" : "2", "message": "No hay datos para mostrar"}');
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA VALIDAR QUE EL USUARIO NO PUEDA CONTESTAR DOS VECES EL MISMO PROBLEMA
$app->post('/validateProblem', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        // /*Se prepara la sentencia Sql */
        $queryStudentProblem  = $db -> prepare(" SELECT COUNT(*) AS EXISTE FROM RTA_PROBLEMA WHERE ID_USUARIO = ? AND ID_PROBLEMA = ?");
        /*Se ejecuta la sentencia */
        $queryStudentProblem -> execute( array( $data['ID_USUARIO'], $data['ID_PROBLEMA'] ) );
        /*Se recupera el arreglo asociativo de la respuesta del Query */
        $problema = $queryStudentProblem->fetchAll( PDO::FETCH_ASSOC );
        /*Si la variable devuelve registros se retornan los datos de lo contrario de muestra un mensaje de error 2-> no hay registros */
        if($problema){
            $response = $response->withJson($problema);
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }else{
            /*Se retorna  2-> cuando no hay datos para mostrar*/
            $response->write('{ "error" : "2", "message": "No hay datos para mostrar"}');
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA TRAER LAS RESPUESTAS PARA EL PROBLEMA DEL ESTUDIANTE
$app->post('/getStudentAnswers', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        // /*Se prepara la sentencia Sql */
        $queryStudentAnswers  = $db -> prepare(" SELECT * FROM RESPUESTA WHERE ID_PROBLEMA = ? ");
        /*Se ejecuta la sentencia */
        $queryStudentAnswers -> execute( array( $data['ID_PROBLEMA'] ) );
        /*Se recupera el arreglo asociativo de la respuesta del Query */
        $problema = $queryStudentAnswers->fetchAll( PDO::FETCH_ASSOC );
        /*Si la variable devuelve registros se retornan los datos de lo contrario de muestra un mensaje de error 2-> no hay registros */
        if($problema){
            $response = $response->withJson($problema);
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }else{
            /*Se retorna  2-> cuando no hay datos para mostrar*/
            $response->write('{ "error" : "2", "message": "No hay datos para mostrar"}');
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA TRAER LAS SUGERENCIAS PARA EL PROBLEMA DEL ESTUDIANTE
$app->post('/getStudentSuggestions', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        // /*Se prepara la sentencia Sql */
        $queryStudentSuggestions  = $db -> prepare(" SELECT * FROM SUGERENCIA WHERE ID_PROBLEMA = ? ");
        /*Se ejecuta la sentencia */
        $queryStudentSuggestions -> execute( array( $data['ID_PROBLEMA'] ) );
        /*Se recupera el arreglo asociativo de la respuesta del Query */
        $problema = $queryStudentSuggestions->fetchAll( PDO::FETCH_ASSOC );
        /*Si la variable devuelve registros se retornan los datos de lo contrario de muestra un mensaje de error 2-> no hay registros */
        if($problema){
            $response = $response->withJson($problema);
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }else{
            /*Se retorna  2-> cuando no hay datos para mostrar*/
            $response->write('{ "error" : "2", "message": "No hay datos para mostrar"}');
        }
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

//METODO PARA REGISTRAR LA RESPUESTA DE UN PROBLEMA, POR PARTE DEL ESTUDIANTE
$app->post('/registerStudentAnswer', function ($request, $response) {

    try {
        /*Se recuperan los datos enviados por post */
        $data = $request->getParams();
        /*Se instancia la conexion con la base de datos*/
        $db = getDB();
        /*Se prepara la sentencia SQL */
        $queryAnswerStudent  = $db -> prepare("INSERT INTO RTA_PROBLEMA (ID_USUARIO, ID_PROBLEMA, RESPUESTA, CANTIDAD_SUGERENCIAS, ANEXO_POLYA) VALUES (?, ?, ?, ?, ?)");
        /*Se ejecuta la sentencia */
        $queryAnswerStudent -> execute(array( $data['ID_USUARIO'], $data['ID_PROBLEMA'], $data['RESPUESTA'], $data['CANTIDAD_SUGERENCIAS'], str_replace(' ', '+', $data['ANEXO_POLYA'])  ) );
        /* Se valida que la insercion fuera exitosa */
        if( $queryAnswerStudent->errorCode() == '00000' ){
            /*Se retorna el exito de la consulta 0-> si no ocurre ningun error */
            $response->write('{ "error" : "0", "message": "Operación realizada exitosamente."}');
            /*Se cierra la conexion a la base de datos */
            $db = null;
        }
        
    } catch (PDOException $e) {
        /* Se captura el error de PDO, 1-> Ocurre un error SQL*/
        $response->write('{ "error" : "1", "message": "'.$e->getMessage().'"}');
    }
    
    /*Se retorna la respuesta */
    return $response;

});

// Run app
$app->run();

?>