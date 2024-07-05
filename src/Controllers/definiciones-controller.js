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
export default router