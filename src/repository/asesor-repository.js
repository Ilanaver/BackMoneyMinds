import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'


const { Client, Pool } = pkg;
export default class AsesorRepository {
    async guardarMensajeAsync(idperfil_fk, mensaje, fecha) {
        const client = new Client(DBConfig);
        const query = `
            INSERT INTO Asesor (idperfil_fk, mensaje, fecha)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        try {
            await client.connect();
            const result = await client.query(query, [idperfil_fk, mensaje, fecha]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al guardar el mensaje:', error);
            throw error;
        }
    }

    async obtenerMensajesAsync() {
        const client = new Client(DBConfig);
        const query = `
            SELECT * FROM Asesor ORDER BY fecha DESC;
        `;
        try {
            await client.connect();
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener los mensajes:', error);
            throw error;
        }
    }
}
