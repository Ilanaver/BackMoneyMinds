import {Router} from "express"
import usuarioService from '../service/usuario-service.js'


const router = Router();
const svc =  new usuarioService();
router.post('/registro', async (req, res) => {
    let { nombre, mail, contraseña } = req.body;
    var agregado = {
        "nombre": nombre,
        "mail": mail,
        "contraseña": contraseña
      };
    if (!nombre || !mail || !contraseña) {
        res.status(400).json({ message: 'Faltan datos.', agregado });
    } else {
        const result = await svc.addUsuarioAsync(nombre, mail, contraseña);
        res.status(201).json({ message: 'Se agrego correctamente.', agregado });
    }
});
/*
{
    "nombre": "",
    "mail": "",
    "contraseña": ""
}
*/

export default router