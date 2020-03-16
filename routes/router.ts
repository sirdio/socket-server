import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import mysqlConexion from '../DB/database'
import { usuariosConectados } from '../sockets/sockets';



///exportar router desde expres
const router = Router();
const mysqldb = mysqlConexion;


////// peticiones get y post DB
router.get('/usuariosDB', (req: Request, res: Response) => { 
    
    mysqlConexion.query( 'Select * from usuarios', ( err, row, field ) => { 
        if (!err) {
            res.status(200).json({
                ok: true,
                usuario: row
            })
        } else {
            res.status(400).json({
                ok: false,
                mensaje: `Se produjo un ${ err }`
            })
        }
     } );
 });

///Servicios para obtener lista de ID de usuarios conectados
router.get('/usuarios', (req: Request, res: Response) => { 
    const server = Server.instance;
    server.io.clients( ( err: any, clientes: string[] ) => { 
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: `Se produjo un ${ err }`
            });
        } else {
            res.status(200).json({
                ok: true,
                clientesconectado: clientes
                
            });
        }        
     } );
 });

 /// permite obtener los usuarios conectados con sus nombre y salas
 router.get('/usuarios/detalle', (req: Request, res: Response) => { 
     
            res.status(200).json({
                ok: true,
                usuariosConectado: usuariosConectados.getLista()                
            });
 });

/// peticiones get & post
router.get('/mensajes', (req: Request, res: Response) => { 
    res.json({
        ok:true,
        mensaje: 'Todo esta bien!!!'
    })

 });

 router.post('/mensajes', (req: Request, res: Response) => { 
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    
    const payload ={
        de: de,
        cuerpo: cuerpo
    }
    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok:true,
        mensaje: 'Mensaje recibido.',
        de: payload.de,
        cuerpo: payload.cuerpo
        
    })

 });

 router.post('/mensajes/:id', (req: Request, res: Response) => { 
    const id = req.params.id; 
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    /// defino un payload
    const payload ={
        de: de,
        cuerpo: cuerpo
    }
    //declaro una instancoa al servidor 
    const server = Server.instance;
    /// realizo una instancia al servidor de sockets para enviar el mensaje privado
    server.io.in(id).emit( 'mensaje-privado', payload );

    server
   res.json({
       ok:true,
       mensaje: 'POST Listo!!!',
       cuerpo,
       de,
       id
   })

});


export default router;