import { Router } from "express";
import AsesorService from "../service/asesor-service.js";

const router = Router();
const asesorService = new AsesorService();

router.post('/enviar-mensaje', async (req, res) => {
    const { idperfil_fk, mensaje } = req.body;

    if (!idperfil_fk || !mensaje) {
        return res.status(400).json({ message: 'Faltan datos: idperfil_fk y mensaje son obligatorios.' });
    }

    try {
        const nuevoMensaje = await asesorService.guardarMensajeAsync(idperfil_fk, mensaje);
        return res.status(201).json(nuevoMensaje);
    } catch (error) {
        return res.status(500).json({ message: 'Error al guardar el mensaje.' });
    }
});

router.get('/mensajes', async (req, res) => {
    try {
        const mensajes = await asesorService.obtenerMensajesAsync();
        return res.status(200).json(mensajes);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los mensajes.' });
    }
});

export default router;
