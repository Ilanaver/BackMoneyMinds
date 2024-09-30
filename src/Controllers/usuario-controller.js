import { Router } from "express";
import usuarioService from '../service/usuario-service.js';

const router = Router();
const svc = new usuarioService();

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
        res.status(201).json({ message: 'Se agregó correctamente.', agregado });
    }
});

router.post('/login', async (req, res) => {
    const { mail, contraseña } = req.body;

    if (!mail || !contraseña) {
        return res.status(400).json({ message: 'Faltan datos.' });
    }

    const result = await svc.loginUsuarioAsync(mail, contraseña);

    if (result.error) {
        return res.status(401).json({ message: result.message });
    }

    return res.status(200).json({ message: 'Login exitoso', userId: result.userId });
});

router.get('/perfil/:idperfil', async (req, res) => {
    let respuesta;
    const idperfil = req.params.idperfil;

    const returnArray = await svc.getAllPerfilAsync(idperfil);
    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    } else {
        respuesta = res.status(500).send('Error Interno');
    }
    return respuesta;
});

router.patch('/cambiar-contrasena', async (req, res) => {
    const { idperfil, contraseñaActual, nuevaContraseña } = req.body;

    if (!idperfil || !contraseñaActual || !nuevaContraseña) {
        return res.status(400).json({ message: 'Faltan datos.' });
    }

    const result = await svc.cambiarContraseñaAsync(idperfil, contraseñaActual, nuevaContraseña);

    if (result.error) {
        return res.status(400).json({ message: result.message });
    }

    return res.status(200).json({ message: 'Contraseña cambiada exitosamente.' });
});

router.patch('/cambiar-foto-perfil', async (req, res) => {
    const { idperfil, foto } = req.body;  // Ahora recibimos la URL de la foto desde req.body

    if (!idperfil || !foto) {
        return res.status(400).json({ message: 'Faltan datos.' });
    }

    // Llamamos al servicio para cambiar la URL de la foto
    const result = await svc.cambiarFotoPerfilAsync(idperfil, foto);

    if (result.error) {
        return res.status(400).json({ message: result.message });
    }

    return res.status(200).json({ message: 'Foto cambiada exitosamente.' });
});

export default router;
