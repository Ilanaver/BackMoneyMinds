import {Router} from "express"
import estadisticasService from '../service/estadisticas-service.js'
import Gestor from "../entities/gestor.js";


const router = Router();
const svc =  new estadisticasService();
//Compara los porcentajes de en que se gasto por categoria
router.get('/catgastos/:idusuario/:mes/:ano', async (req, res) => {
    let respuesta;
    const idusuario = req.params.idusuario; 
    const mes = req.params.mes; 
    const ano = req.params.ano; 

    const returnArray = await svc.getGastosPorCategoriaAsync(idusuario, mes, ano);
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
router.get('/catingresos/:idusuario/:mes/:ano', async (req, res) => {
    let respuesta;
    const idusuario = req.params.idusuario; 
    const mes = req.params.mes; 
    const ano = req.params.ano; 

    const returnArray = await svc.getIngresosPorCategoriaAsync(idusuario, mes, ano);
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
router.get('/saldoMeses/:idusuario/:tipo/:ano', async (req, res) => {
    let respuesta;
    console.log("paso")
    const idusuario = req.params.idusuario; 
    const tipo = req.params.tipo; 
    const ano = req.params.ano;
    const returnArray = await svc.getSaldoPorMesAsync(idusuario, tipo, ano); // Llama a la función correcta
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
router.get('/:idusuario/:idtipos/:mes/:ano', async (req, res) => {
    let respuesta;
    console.log("paso")
    const idusuario = req.params.idusuario; 
    const idtipos = req.params.idtipos;
    const mes = req.params.mes; 
    const ano = req.params.ano; 
    const returnArray = await svc.getSaldoByTipoIdAsync(idusuario, idtipos, mes, ano); // Llama a la función correcta
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
router.get('/:idusuario/:mes/:ano', async (req, res) => {
    let respuesta;
    const idusuario = req.params.idusuario; 
    const mes = req.params.mes; 
    const ano = req.params.ano; 
    const returnArray = await svc.getSaldoByIdAsync(idusuario, mes, ano);
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