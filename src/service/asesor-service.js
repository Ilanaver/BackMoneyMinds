import AsesorRepository from '../repository/asesor-repository.js';

export default class AsesorService {
    async guardarMensajeAsync(idperfil_fk, mensaje) {
        const repo = new AsesorRepository();
        const fecha = new Date(); // Fecha actual
        const nuevoMensaje = await repo.guardarMensajeAsync(idperfil_fk, mensaje, fecha);
        return nuevoMensaje;
    }

    async obtenerMensajesAsync() {
        const repo = new AsesorRepository();
        const mensajes = await repo.obtenerMensajesAsync();
        return mensajes;
    }
}
