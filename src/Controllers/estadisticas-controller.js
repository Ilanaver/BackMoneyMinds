import {Router} from "express"
import estadisticasService from '../service/estadisticas-service.js'
import Gestor from "../entities/gestor.js";


const router = Router();
const svc =  new estadisticasService();

//Compara los porcentajes de en que se gasto por categoria
router.get('/catgastos/:idusuario/:tipo/:mes/:ano', async (req, res) => {
    const { idusuario, tipo, mes, ano } = req.params;

    try {
        const returnArray = await svc.getGastosPorCategoriaAsync(idusuario, tipo, mes, ano);

        if (returnArray && returnArray.length > 0) {
            res.status(200).json(returnArray);
        } else {
            res.status(404).send('No se encontraron gastos para esta categoría.');
        }
    } catch (error) {
        console.error("Error en la ruta de gastos por categoría:", error);
        res.status(500).send('Error Interno');
    }
});


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
router.get('/promedioDiario/:idusuario/:tipo/:mes/:ano', async (req, res) => {
    let respuesta;
    console.log("paso")
    const idusuario = req.params.idusuario; 
    const tipo = req.params.tipo; 
    const mes = req.params.mes;
    const ano = req.params.ano;
    const returnArray = await svc.getPromedioDiarioAsync(idusuario, tipo, mes, ano); // Llama a la función correcta
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
router.get('/realDiario/:idusuario/:tipo/:mes/:ano', async (req, res) => {
    let respuesta;
    console.log("paso")
    const idusuario = req.params.idusuario; 
    const tipo = req.params.tipo; 
    const mes = req.params.mes;
    const ano = req.params.ano;
    const returnArray = await svc.getRealDiarioAsync(idusuario, tipo, mes, ano); // Llama a la función correcta
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
router.get('/top3cat/:idusuario/:tipo/:mes/:ano', async (req, res) => {
    let respuesta;
    console.log("paso")
    const idusuario = req.params.idusuario; 
    const tipo = req.params.tipo; 
    const mes = req.params.mes;
    const ano = req.params.ano;
    const returnArray = await svc.getTop3PorCategoriaAsync(idusuario, tipo, mes, ano); // Llama a la función correcta
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
export default router;