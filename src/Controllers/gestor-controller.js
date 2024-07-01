import {Router} from "express"
import gestorService from '../service/gestor-service.js'
import Gestor from "../entities/gestor.js";


const router = Router();
const svc =  new gestorService();
router.get('/:idusuario', async (req, res) => {
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
export default router;