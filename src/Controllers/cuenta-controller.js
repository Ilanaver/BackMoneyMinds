import {Router} from "express"
import cuentaService from '../service/cuenta-service.js'


const router = Router();
const svc =  new cuentaService();
router.get('/todas/:idperfil_fk', async (req, res) => {
    let respuesta;
    const idperfil_fk = req.params.idperfil_fk; 
    const returnArray = await svc.getCuentasAsync(idperfil_fk);
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
router.get('/:idcuenta', async (req, res) => {
    let respuesta;
    const idcuenta = req.params.idcuenta; 
    const returnArray = await svc.get1CuentaAsync(idcuenta);
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
router.post('/agregar-cuenta', async (req, res) => {
    let { idperfil_fk, nombre, tipo_cuenta, saldo_inicial, moneda, banco, descripcion, activa } = req.body;
    var agregado = {
        "idperfil_fk": idperfil_fk,
        "nombre": nombre,
        "tipo_cuenta": tipo_cuenta,
        "saldo_inicial": saldo_inicial,
        "moneda": moneda,
        "banco": banco,
        "descripcion": descripcion,
        "activa": activa
    };
    
    if (!idperfil_fk || !nombre || !tipo_cuenta || !moneda || activa == null) {
        res.status(400).json({ message: 'Faltan datos.', agregado });
    } else {
        const result = await svc.addCuentaAsync(idperfil_fk, nombre, tipo_cuenta, saldo_inicial, moneda, banco, descripcion, activa);
        res.status(201).json({ message: 'Se agrego correctamente.', agregado });
    }
});
/*
{
    "idcuenta": "",
    "contenido": ""
}
*/
router.delete('/deleteCuenta/:idcuenta', async (req, res) => {
    let respuesta;
    const idcuenta = req.params.idcuenta; 
    const returnArray = await svc.deleteByIdAsync(idcuenta);
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
router.delete('/deleteGestor/:idcuenta', async (req, res) => {
    let respuesta;
    const idcuenta = req.params.idcuenta; 
    const returnArray = await svc.deleteAllGestorAsync(idcuenta);
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
router.patch('/actualizar-cuenta/:idcuenta', async (req, res) => {
    try {
        const idcuenta = req.params.idcuenta;  // Obtener el ID de la lección desde los parámetros de la URL
        const { fieldName, fieldValue } = req.body;  // Obtener el campo y valor a actualizar desde el cuerpo de la petición
        
        console.log(`Actualizando lección con ID: ${idcuenta}, Campo: ${fieldName}, Valor: ${fieldValue}`);

        // Validar que se proporcionen fieldName y fieldValue en el cuerpo de la solicitud
        if (!fieldName || fieldValue === undefined) {
            return res.status(400).send('Faltan datos: se necesita fieldName y fieldValue.');
        }

        // Llamar al servicio para realizar la actualización
        const result = await svc.updateFieldByIdAsync(idcuenta, fieldName, fieldValue);

        if (result != null) {
            console.log('Actualización exitosa');
            return res.status(200).json({ message: 'Actualización exitosa', result });
        } else {
            console.log('No se encontró la cuenta o no se pudo actualizar');
            return res.status(404).send('No se encontró la lección o no se pudo actualizar');
        }
    } catch (error) {
        console.error('Error al actualizar la cuenta:', error);
        return res.status(500).send('Error Interno');
    }
});
export default router