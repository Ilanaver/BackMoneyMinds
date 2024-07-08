import {Router} from "express"
import gestorService from '../service/gestor-service.js'
import Gestor from "../entities/gestor.js";


const router = Router();
const svc =  new gestorService();
router.get('/operaciones/:idusuario', async (req, res) => {
    let respuesta;
    const idusuario = req.params.idusuario; 
    const returnArray = await svc.getByIdAsync(idusuario);
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
router.get('/operaciones/:idusuario/:idtipos', async (req, res) => {
    let respuesta;
    const idusuario = req.params.idusuario; 
    const idtipos = req.params.idtipos;
    const returnArray = await svc.getOppByTipoAsync(idusuario, idtipos); // Llama a la función correcta
    console.log('entra');
    if (returnArray != null) {
        console.log('normal');
        respuesta = res.status(200).json(returnArray);
    } else {
        console.log('else');
        respuesta = res.status(500).send('Error Interno');
    }
    return respuesta;
});
router.get('/:idusuario', async (req, res) => {
    let respuesta;
    const idusuario = req.params.idusuario; 
    const returnArray = await svc.getSaldoByIdAsync(idusuario);
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
router.post('/addOperacion', async (req, res) => {
    let { idperfil_fk, idtipos_fk, idsubtipo_fk, importe, fecha, observaciones } = req.body;
    if (!idperfil_fk || !idtipos_fk || !idsubtipo_fk || !importe || !fecha || !observaciones) {
        res.status(400).send("Faltan datos");
        console.log(idperfil_fk, idtipos_fk, idsubtipo_fk, importe, fecha, observaciones);
    } else {
        const result = await svc.addByIdAsync(idperfil_fk, idtipos_fk, idsubtipo_fk, importe, fecha, observaciones);
        res.status(201).json({ message: 'Se agrego correctamente.', result });
    }
});
/*
{
    "idperfil_fk": 2,
    "idtipos_fk": 2,
    "idsubtipo_fk": 2,
    "importe": 10000,
    "fecha": "2024-02-02",
    "observaciones": "cobre el aguinaldo"
}
*/
router.delete('/operaciones/:idusuario', async (req, res) => {
    let respuesta;
    const idusuario = req.params.idusuario; 
    const returnArray = await svc.deleteByIdAsync(idusuario);
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
export default router;