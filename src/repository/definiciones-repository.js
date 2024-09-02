import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'


const { Client, Pool } = pkg;
export default class definicionesRepository {
    getTOP6Async = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = `SELECT titulo, contenido FROM definicionterminos
            LIMIT 6`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getSearchByNameAsync = async (titulo) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = `SELECT titulo, contenido FROM definicionterminos
            WHERE titulo ILIKE '%' || $1 || '%'`;
            const values = [titulo] 
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    addDefinicionAsync = async (titulo, contenido) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO definicionterminos (titulo, contenido)
            VALUES ($1, $2)`;
            const values = [titulo, contenido] //preguntar que es
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
    deleteByIdAsync = async (idtermino) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `DELETE FROM definicionterminos where idtermino = $1`;
            const values = [idtermino] //preguntar que es
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
    getDefinicionesAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `Select * from definicionterminos`;
            const result = await client.query(sql);
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