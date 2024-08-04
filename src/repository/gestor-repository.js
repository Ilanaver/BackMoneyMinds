import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'


const { Client, Pool } = pkg;

export default class gestorRepository {
    getByIdAsync = async (idusuario) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = `SELECT g.importe, t.descripcion AS tipo, s.descripcion AS subtipo
            FROM gestor g
            INNER JOIN tipos t ON g.idtipos_fk = t.idtipos
            INNER JOIN subtipomovimiento s ON g.idsubtipo_fk = s.idsubtipo
            WHERE g.idperfil_fk = $1`;
            const values = [idusuario] 
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getOppByTipoAsync = async (idusuario, idtipos) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = `SELECT g.importe, t.descripcion AS tipo, s.descripcion AS subtipo
            FROM gestor g
            INNER JOIN tipos t ON g.idtipos_fk = t.idtipos
            INNER JOIN subtipomovimiento s ON g.idsubtipo_fk = s.idsubtipo
            WHERE g.idperfil_fk = $1 AND g.idtipos_fk = $2`;
            const values = [idusuario, idtipos] 
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getSaldoByIdAsync = async (idusuario) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database 2');
            const sql = `SELECT SUM(g.importe) as "Saldo actual"
            FROM gestor g
            WHERE g.idperfil_fk = $1`;
            const values = [idusuario] 
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    } 
    getSaldoByTipoIdAsync = async (idusuario, idtipos) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database 2');
            const sql = `SELECT SUM(g.importe) as "Saldo actual"
            FROM gestor g
            WHERE g.idperfil_fk = $1 AND g.idtipos_fk = $2`;
            const values = [idusuario, idtipos] 
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    } 
    getSubtiposByTipoAsync = async (idtipos) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database 2');
            const sql = `SELECT s.idsubtipo, s.descripcion as "Subtipo"
            FROM subtipomovimiento  s
            WHERE s.idtipos_fk = $1`;
            const values = [idtipos] 
            console.log(idtipos)
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
            const sql = `INSERT INTO Gestor (idperfil_fk, idtipos_fk, idsubtipo_fk, importe, fecha, observaciones)
            VALUES ($1, $2, $3, $4, $5, $6)`;
            const values = [IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones] //preguntar que es
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
/*
{
    "idperfil_fk": 2,
    "idtipos_fk": 2,
    "idsubtipo_fk": 2,
    "importe": 10000,
    "fecha": "2024-02-02",
    "observaciones": "cobre el aguinaldo"
}
*/
deleteByIdAsync = async (idusuario) => {
    let returnArray = null;
    const client = new Client(DBConfig);
    try {
        await client.connect();
        const sql = `DELETE FROM gestor where idgestor = $1`;
        const values = [idusuario] //preguntar que es
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