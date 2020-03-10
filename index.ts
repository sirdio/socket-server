import Server           from "./classes/server";
import  router          from './routes/router';
import bodyParser       from 'body-parser';
import cors             from 'cors';
import { SERVER_PORT  } from "./global/enviroment";

//cambio el codigo de la linea 8 por la linea 9
//const server = new Server();
const server = Server.instance;


//// configuramos body-parser
server.app.use( bodyParser.urlencoded( { extended: true } ) );
server.app.use( bodyParser.json() );

/// configuracion de los cors
server.app.use( cors( { origin: true, credentials: true } ) );

/// configuramos las rutas 
server.app.use( '/', router );


















server.start( () => { 
    console.log( `Servidor corriendo en el puerto ${SERVER_PORT}` );
 } );