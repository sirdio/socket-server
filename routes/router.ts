import { Router, Request, Response } from 'express';
import Server from '../classes/server';

///exportar router desde expres
const router = Router();





/// peticiones get y post
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