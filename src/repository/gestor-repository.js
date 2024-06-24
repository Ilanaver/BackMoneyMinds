import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'


const { Client, Pool } = pkg;

export default class gestorRepository {
    getByIdAsync = async (idusuario) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT importe FROM gestor WHERE idgestor = $1`;
            const values = [idusuario] //preguntar que es
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    } 
    addByIdAsync = async (IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO Gestor (IdPerfil_FK, IdTipos_FK, IdSubTipo_FK, Importe, Fecha, Observaciones)
            VALUES ($1, $2, $3, $4, $5, $6)`;
            const values = [IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones] //preguntar que es
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
}