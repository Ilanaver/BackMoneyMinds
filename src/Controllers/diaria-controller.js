import {Router} from "express"
import diariaService from '../service/diaria-service.js'


const router = Router();
const svc =  new diariaService();
router.post('/agregar-leccion', async (req, res) => {
    let { titulo, descripcion, contenido, fecha } = req.body;
    var agregado = {
        "titulo": titulo,
        "descripcion": descripcion,
        "contenido": contenido,
        "fecha": fecha
      };
    if (!titulo || !descripcion || !contenido || !fecha) {
        res.status(400).json({ message: 'Faltan datos.', agregado });
    } else {
        const result = await svc.addleccionAsync(titulo, descripcion, contenido, fecha);
        res.status(201).json({ message: 'Se agrego correctamente.', agregado });
    }
});
/*
{
    "titulo": "",
    "descripcion": "",
    "contenido": "",
    "fecha": ""
}
*/
router.delete('/deleteleccion/:idleccion', async (req, res) => {
    let respuesta;
    const idleccion = req.params.idleccion; 
    const returnArray = await svc.deleteByIdAsync(idleccion);
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
router.get('/:fecha', async (req, res) => {
    let respuesta;
    const fecha = req.params.fecha; 
    const returnArray = await svc.getTodayAsync(fecha);
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
router.patch('/actualizar-leccion/:idleccion', async (req, res) => {
    try {
        const idleccion = req.params.idleccion;  // Obtener el ID de la lección desde los parámetros de la URL
        const { fieldName, fieldValue } = req.body;  // Obtener el campo y valor a actualizar desde el cuerpo de la petición
        
        console.log(`Actualizando lección con ID: ${idleccion}, Campo: ${fieldName}, Valor: ${fieldValue}`);

        // Validar que se proporcionen fieldName y fieldValue en el cuerpo de la solicitud
        if (!fieldName || fieldValue === undefined) {
            return res.status(400).send('Faltan datos: se necesita fieldName y fieldValue.');
        }

        // Llamar al servicio para realizar la actualización
        const result = await svc.updateFieldByIdAsync(idleccion, fieldName, fieldValue);

        if (result != null) {
            console.log('Actualización exitosa');
            return res.status(200).json({ message: 'Actualización exitosa', result });
        } else {
            console.log('No se encontró la lección o no se pudo actualizar');
            return res.status(404).send('No se encontró la lección o no se pudo actualizar');
        }
    } catch (error) {
        console.error('Error al actualizar la lección diaria:', error);
        return res.status(500).send('Error Interno');
    }
});

export default router