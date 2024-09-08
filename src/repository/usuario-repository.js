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

}