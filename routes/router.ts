import { Router, Request, Response } from 'express';

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
    res.json({
        ok:true,
        mensaje: 'POST Listo!!!',
        cuerpo,
        de
    })

 });

 router.post('/mensajes/:id', (req: Request, res: Response) => { 
    const id = req.params.id; 
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
   res.json({
       ok:true,
       mensaje: 'POST Listo!!!',
       cuerpo,
       de,
       id
   })

});


export default router;