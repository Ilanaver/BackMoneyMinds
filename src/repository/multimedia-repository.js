import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'

const { Client, Pool } = pkg;
export default class definicionesRepository {
    getTOP4ByTipoAsync = async (categoria) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = `SELECT idvideo, titulo, img FROM contenidoaudiovisual
            WHERE categoria = $1 LIMIT 4`;
            const values = [categoria] 
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getCategoriasAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = `SELECT DISTINCT categoria FROM contenidoaudiovisual`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getAllByTipoAsync = async (categoria) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = `SELECT titulo, img FROM contenidoaudiovisual
            WHERE categoria = $1`;
            const values = [categoria] 
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getAllByVideoAsync = async (idvideo) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = `SELECT * FROM contenidoaudiovisual
            WHERE idvideo = $1`;
            const values = [idvideo] 
            const result = await client.query(sql, values);
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
            const sql = `SELECT titulo, img FROM contenidoaudiovisual
            WHERE titulo LIKE '%' || $1 || '%'`;
            const values = [titulo] 
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    addVideoAsync = async (titulo, videolink, img, descripcion, categoria) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO contenidoaudiovisual (titulo, videolink, img, descripcion, categoria)
            VALUES ($1, $2, $3, $4, $5)`;
            const values = [titulo, videolink, img, descripcion, categoria] 
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
    deleteByVideoAsync = async (idvideo) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `DELETE FROM contenidoaudiovisual where idvideo = $1`;
            const values = [idvideo]
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
    getVideosAsync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `Select * from contenidoaudiovisual`;
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