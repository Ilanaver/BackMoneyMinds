import {Router} from "express"
import usuarioService from '../service/usuario-service.js'


const router = Router();
const svc =  new usuarioService();
router.post('/registro', async (req, res) => {
    let { usuario, mail, contraseña } = req.body;
    var agregado = {
        "usuario": usuario,
        "mail": mail,
        "contraseña": contraseña
      };
    if (!usuario || !mail || !contraseña) {
        res.status(400).json({ message: 'Faltan datos.', agregado });
    } else {
        const result = await svc.addUsuarioAsync(usuario, mail, contraseña);
        if (result?.error) {
            // Si el correo ya está registrado, devolvemos un error
            return res.status(400).json({ message: result.message });
        }
        res.status(201).json({ message: 'Se agrego correctamente.', agregado });
    }
});
/*
{
    "usuario": "",
    "mail": "",
    "contraseña": ""
}
*/
router.post('/login', async (req, res) => {
    const { mail, contraseña } = req.body;

    // Verificar que ambos campos estén presentes
    if (!mail || !contraseña) {
        return res.status(400).json({ message: 'Faltan datos.' });
    }

    // Intentar hacer login
    const result = await svc.loginUsuarioAsync(mail, contraseña);

    if (result.error) {
        // Si hubo un error (correo o contraseña incorrectos), responder con un mensaje
        return res.status(401).json({ message: result.message });
    }

    // Si el login fue exitoso, devolver el ID del usuario
    return res.status(200).json({ message: 'Login exitoso', userId: result.userId });
});
router.get('/perfil/:idperfil', async (req, res) => {
    let respuesta;
    const idperfil = req.params.idperfil; 

    const returnArray = await svc.getAllPerfilAsync(idperfil);
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
router.patch('/cambiar-contrasena', async (req, res) => {
    const { idperfil, contraseñaActual, nuevaContraseña } = req.body;

    // Verificar que todos los campos estén presentes
    if (!idperfil || !contraseñaActual || !nuevaContraseña) {
        return res.status(400).json({ message: 'Faltan datos.' });
    }

    // Llamar al servicio para cambiar la contraseña
    const result = await svc.cambiarContraseñaAsync(idperfil, contraseñaActual, nuevaContraseña);

    if (result.error) {
        // Si hubo un error (usuario no encontrado o contraseña actual incorrecta)
        return res.status(400).json({ message: result.message });
    }

    // Si la contraseña fue actualizada correctamente
    return res.status(200).json({ message: 'Contraseña cambiada exitosamente.' });
});

export default router