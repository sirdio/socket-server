
import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets'

//estaimportacion no se utliza porque lo centralizamos en el archivo socket
//import { Socket } from 'socket.io';



export default class Server{
    
    private static _instance: Server;
    public app: express.Application;
    
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;
    
    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        ////
        //como no se puede configurar express con socket.io es necesario
        //importar http para relacionar express con socket
        ////
        ///inicializamos el httpServer
        this.httpServer = new http.Server( this.app );
        // configuramos la variable io - es la parte mas importante para 
        // implementar los socket
        this.io = socketIO( this.httpServer );
        this.escucharSockets();
    }

    ///patron singleton
    public static get instance(  ) {
        return this._instance || ( this._instance = new this() );
    }

    //método o funcion privada para escuchar los socckets
    //es aqui donde se conecta un cliente
    private escucharSockets(){
        console.log( 'Escuchando conexiones - Sockets' );
        this.io.on('connection', (cliente) => { 
            
            //conectar cliente "usuario"
            socket.conectarCliente( cliente, this.io );
            //configurar Usuario
            socket.configurarUsuario( cliente, this.io );
            //obtiene los usuarios conectados
            socket.obtenerUsuarios( cliente, this.io );

            
            //mensajes
            socket.mensaje( cliente, this.io );
            //desconectar
            socket.desconectar( cliente, this.io );
            
         });
    }


    // // esto inicializa el server express
    // start( callback: any ) {
    //     this.app.listen( this.port, callback );
    // }

    // esto inicializa el server httpServer para utilizar socket
    start( callback: any ) {
        this.httpServer.listen( this.port, callback );
    }
    
}