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
router.post('/addOperacio', async (req, res) => {
    let IdPerfil = req.body.IdPerfil
    let IdTipos = req.body.IdTipos
    let IdSubTipo = req.body.IdSubTipo
    let Importe = req.body.Importe
    let Fecha = req.body.Fecha
    let Observaciones = req.body.Observaciones
    let nuevoOperacion = new Gestor(IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones)
    if (!IdPerfil || !IdTipos || !IdSubTipo || !Importe || !Fecha || !Observaciones) {
        res.status(404).send("Faltan datos")
        console.log(IdPerfil)
        console.log(IdTipos)
        console.log(IdSubTipo)
        console.log(Importe)
        console.log(Observaciones)
        console.log(Fecha)
    } else {
        console.log('vino pa ca')
        res.status(201).json({ message: 'Se agrego correctamente.', alumno: nuevoOperacion });
    }
})
export default router;