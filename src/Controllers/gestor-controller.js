import {Router} from "express"
import gestorService from '../service/gestor-service.js'
import Gestor from "../entities/gestor.js";


const router = Router();
const svc =  new gestorService();
router.get('/operaciones/:idusuario/:mes/:ano/:idcauenta', async (req, res) => {
    let respuesta;
    const idusuario = req.params.idusuario; 
    const mes = req.params.mes; 
    const ano = req.params.ano;
    const idcuenta = req.params.idcuenta;

    const returnArray = await svc.getByIdAndAccountAsync(idusuario, mes, ano, idcuenta);
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
router.get('/operacionesTipo/:idusuario/:mes/:ano/:idcuenta/:idtipos', async (req, res) => {
    let respuesta;
    console.log("paso")
    const idusuario = req.params.idusuario; 
    const mes = req.params.mes
    const ano = req.params.ano
    const idcuenta = req.params.idcuenta
    const idtipos = req.params.idtipos;

    const returnArray = await svc.getoppByTipoAsync(idusuario, mes, ano, idcuenta, idtipos); // Llama a la función correcta
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
router.get('/:idusuario/:idcuenta/:mes/:ano', async (req, res) => {
    let respuesta;
    const idusuario = req.params.idusuario; 
    const idcuenta = req.params.idcuenta; 
    const mes = req.params.mes; 
    const ano = req.params.ano; 
    const returnArray = await svc.getSaldoByIdAsync(idusuario, idcuenta, mes, ano);
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
router.get('/:idusuario/:idtipos/:idcuenta/:mes/:ano', async (req, res) => {
    let respuesta;
    console.log("paso")
    const idusuario = req.params.idusuario; 
    const idtipos = req.params.idtipos;
    const idcuenta = req.params.idcuenta;
    const mes = req.params.mes; 
    const ano = req.params.ano; 
    const returnArray = await svc.getSaldoByTipoIdAsync(idusuario, idtipos, idcuenta, mes, ano); // Llama a la función correcta
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
router.get('/subtipos/:idtipos', async (req, res) => {
    let respuesta;
    const idtipos = req.params.idtipos;
    const returnArray = await svc.getSubtiposByTipoAsync(idtipos);
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
    const { idperfil_fk, idtipos_fk, idsubtipo_fk, importe, fecha, observaciones, idcuenta_fk } = req.body;
    if (!idperfil_fk || !idtipos_fk || !idsubtipo_fk || !importe || !fecha || !idcuenta_fk) {
        res.status(400).send("Faltan datos");
    } else {
        try {
            const result = await svc.addByIdAsync(idperfil_fk, idtipos_fk, idsubtipo_fk, importe, fecha, observaciones, idcuenta_fk);
            res.status(201).json({ message: 'Se agregó correctamente.', result });
        } catch (error) {
            console.error('Error adding operation:', error);
            res.status(500).send('Error Interno');
        }
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
router.delete('/operaciones/:idgestor', async (req, res) => {
    const { idgestor } = req.params;
    try {
        await svc.deleteByIdAsync(idgestor);
        res.status(200).json({ message: 'Eliminado correctamente.' });
    } catch (error) {
        console.error('Error deleting operation:', error);
        res.status(500).send('Error Interno');
    }
});
export default router;