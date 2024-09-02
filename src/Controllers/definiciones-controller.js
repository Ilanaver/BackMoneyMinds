import {Router} from "express"
import definicionesService from '../service/definiciones-service.js'


const router = Router();
const svc =  new definicionesService();
router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getTOP6Async();
    console.log('entra aca')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json(returnArray);
    } else
    {
        console.log('se fue')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
router.get('/todas', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getDefinicionesAsync();
    console.log('entra aca')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json(returnArray);
    } else
    {
        console.log('se fue')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
router.get('/:titulo', async (req, res) => {
    let respuesta;
    const titulo = req.params.titulo; 
    const returnArray = await svc.getSearchByNameAsync(titulo);
    console.log('entra')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json(returnArray);
    } else
    {
        console.log('else')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
router.post('/agregar-definicion', async (req, res) => {
    let { titulo, contenido } = req.body;
    var agregado = {
        "titulo": titulo,
        "contenido": contenido,
      };
    if (!titulo || !contenido) {
        res.status(400).json({ message: 'Faltan datos.', agregado });
    } else {
        const result = await svc.addDefinicionAsync(titulo, contenido);
        res.status(201).json({ message: 'Se agrego correctamente.', agregado });
    }
});
/*
{
    "titulo": "",
    "contenido": ""
}
*/
router.delete('/deleteTermino/:idtermino', async (req, res) => {
    let respuesta;
    const idtermino = req.params.idtermino; 
    const returnArray = await svc.deleteByIdAsync(idtermino);
    console.log('entra')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json('Eliminado correctamente.');
    } else
    {
        console.log('else')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
export default router