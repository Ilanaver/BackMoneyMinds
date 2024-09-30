import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'
import bcrypt from 'bcryptjs'; // Importar bcryptjs para cifrar la contraseña


const { Client, Pool } = pkg;
export default class usuarioRepository {

    addUsuarioAsync = async (usuario, mail, contraseña) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        
        try {
            await client.connect();

            // 1. Verificar si el correo ya existe
            const checkUserSql = 'SELECT * FROM perfil WHERE mail = $1';
            const checkUserValues = [mail];
            const checkResult = await client.query(checkUserSql, checkUserValues);

            if (checkResult.rows.length > 0) {
                // El correo ya está registrado
                return { error: true, message: 'El correo ya está registrado' };
            }

            // 2. Si el correo no existe, proceder con el registro
            const salt = bcrypt.genSaltSync(8); // Generar un salt para cifrar la contraseña
            const hashedPassword = bcrypt.hashSync(contraseña, salt); // Cifrar la contraseña

            const sql = `INSERT INTO perfil (usuario, mail, contraseña)
                        VALUES ($1, $2, $3) RETURNING *`; // Devolver el usuario insertado
            const values = [usuario, mail, hashedPassword];
            const result = await client.query(sql, values);

            console.log('Data inserted successfully');
            returnArray = result.rows[0]; // Devolver el usuario insertado

            await client.end();
        } catch (error) {
            console.log(error);
        }
        
        return returnArray;
    };
    loginUsuarioAsync = async (mail, contraseña) => {
        let userId = null;
        const client = new Client(DBConfig);
        
        try {
            await client.connect();
    
            // Buscar el usuario por el correo
            const sql = 'SELECT idperfil, contraseña FROM perfil WHERE mail = $1';
            const values = [mail];
            const result = await client.query(sql, values);
    
            if (result.rows.length === 0) {
                // No se encontró un usuario con ese correo
                return { error: true, message: 'Correo o contraseña incorrectos' };
            }
    
            const usuario = result.rows[0];
    
            // Comparar la contraseña ingresada con la contraseña cifrada
            const esValida = bcrypt.compareSync(contraseña, usuario.contraseña);
    
            if (!esValida) {
                // La contraseña no coincide
                return { error: true, message: 'Correo o contraseña incorrectos' };
            }
    
            // Si todo está bien, devolver el ID del usuario
            userId = usuario.idperfil;
        } catch (error) {
            console.log(error);
            return { error: true, message: 'Ocurrió un error durante el login' };
        } finally {
            await client.end();
        }
    
        return { error: false, userId };
    };
    getAllPerfilAsync = async (idperfil) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database 2');
            const sql = `SELECT *
            FROM perfil  
            WHERE idperfil = $1`;
            const values = [idperfil] 
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    cambiarContraseñaAsync = async (idperfil, contraseñaActual, nuevaContraseña) => {
        const client = new Client(DBConfig);
        
        try {
            await client.connect();
            
            // 1. Verificar si el usuario existe y obtener su contraseña actual
            const sql = 'SELECT contraseña FROM perfil WHERE idperfil = $1';
            const values = [idperfil];
            const result = await client.query(sql, values);

            if (result.rows.length === 0) {
                // No se encontró el usuario
                return { error: true, message: 'Usuario no encontrado.' };
            }

            const usuario = result.rows[0];

            // 2. Comparar la contraseña actual ingresada con la contraseña cifrada almacenada
            const esValida = bcrypt.compareSync(contraseñaActual, usuario.contraseña);
            if (!esValida) {
                // La contraseña actual no es correcta
                return { error: true, message: 'La contraseña actual es incorrecta.' };
            }

            // 3. Generar el hash de la nueva contraseña
            const salt = bcrypt.genSaltSync(8);
            const hashedNuevaContraseña = bcrypt.hashSync(nuevaContraseña, salt);

            // 4. Actualizar la contraseña en la base de datos
            const updateSql = 'UPDATE perfil SET contraseña = $1 WHERE idperfil = $2 RETURNING *';
            const updateValues = [hashedNuevaContraseña, idperfil];
            const updateResult = await client.query(updateSql, updateValues);

            await client.end();

            // Devolver el usuario actualizado
            return { error: false, message: 'Contraseña actualizada correctamente.', data: updateResult.rows[0] };
        } catch (error) {
            console.log(error);
            return { error: true, message: 'Ocurrió un error al cambiar la contraseña.' };
        }
    };
    cambiarFotoPerfilAsync = async (idperfil, foto) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `UPDATE perfil SET foto = $2 WHERE idperfil = $1 RETURNING *`;
            const values = [idperfil, foto];  // Actualizamos el campo "foto" con la URL
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows[0];  // Devolver el perfil actualizado
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    };
    
}