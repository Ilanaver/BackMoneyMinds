import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'


const { Client, Pool } = pkg;
export default class usuarioRepository {
    addUsuarioAsync = async (nombre, mail, contraseña) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO perfil (nombre, mail, contraseña)
            VALUES ($1, $2, $3)`;
            const values = [nombre, mail, contraseña] //preguntar que es
            const result = await client.query(sql,values);
            console.log('Data inserted successfully');
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        console.log(returnArray)
        return returnArray;
    }
}