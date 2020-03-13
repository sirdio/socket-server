import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from "../classes/usaurarios-lista";
import { Usuario } from "../classes/usuario";


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = ( cliente: Socket ) => { 
    const usuarioNuevo = new Usuario( cliente.id );
    usuariosConectados.agregarUsuario( usuarioNuevo );
 }



export const desconectar = ( cliente: Socket ) => { 
    
    cliente.on( 'disconnect', () => { 
       usuariosConectados.borrarUsuarios( cliente.id );
     } );
 }

 export const mensaje = ( cliente: Socket, io: socketIO.Server) => { 

    cliente.on( 'mensaje', ( payload: { de:string, cuerpo: string } ) => { 
        console.log( 'mensaje recibido', payload );
        io.emit( 'mensaje-nuevo', payload );

     } );
  }

  //configurarUsuario
  export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => { 
      cliente.on( 'configurar-usuario', ( payload: { nombre:string }, callback: Function ) => { 
        
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        callback({
            ok:true,
            mensaje: `Usiario ${ payload.nombre }, Configurado con exito.`
        })
       } );
   }