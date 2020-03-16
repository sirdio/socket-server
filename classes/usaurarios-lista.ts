import { Usuario } from "./usuario";



export class UsuariosLista {

    private lista: Usuario[] = [];


    constructor(  ) {       
    }

    /// agrega un usuario
    public agregarUsuario( usuario: Usuario ){
        this.lista.push( usuario );
        console.log( this.lista );
        return usuario;
    }

    public actualizarNombre( id: string, nombre: string  ){
        
        ///en el caso de ser una base de datos se realiza la consulta
        ///en reemplazo del ciclo for of
        for (const usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log( '===Actualizando Usuario===' );
        console.log( this.lista );
    }

    //obtener lista de usuarios conectados
    public getLista(){
        return this.lista.filter( ( usuario ) => { 
            return usuario.nombre !== 'sin-nombre';
         } );
    }

    //obtener un usuario
    public getUsuario( id: string ){
        return this.lista.find(( usuario ) => { 
            return usuario.id === id;
         });
    }

    //obtener usuarios en una sala en particular
    public getUsuariosEnSala( sala: string ){
        return this.lista.filter(( usuario ) => { 
            return usuario.sala === sala;
         });
    } 

    //borrar usuarios
    public borrarUsuarios( id: string ){
        const tempUsuario = this.getUsuario( id );
        this.lista = this.lista.filter(( usuario ) => { 
            return usuario.id !== id;
         });
        return tempUsuario;
    }
}