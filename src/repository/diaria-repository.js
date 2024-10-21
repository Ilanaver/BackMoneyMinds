import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'


const { Client, Pool } = pkg;
export default class definicionesRepository {
    getTodayAsync = async (fecha) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = `SELECT titulo, descripcion, contenido, fecha FROM lecciondiaria
            WHERE fecha = $1`;
            const values = [fecha]
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    addleccionAsync = async (titulo, descripcion, contenido, fecha) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO lecciondiaria (titulo, descripcion, contenido, fecha)
            VALUES ($1, $2, $3, $4)`;
            const values = [titulo, descripcion, contenido, fecha] //preguntar que es
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
    deleteByIdAsync = async (idleccion) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `DELETE FROM lecciondiaria where idleccion = $1`;
            const values = [idleccion] //preguntar que es
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
    /*actualizar*/
    // Repositorio: Función para actualizar un campo específico de una lección diaria
    updateFieldByIdAsync = async (idleccion, fieldName, fieldValue) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            
            // Evitar inyección SQL usando valores parametrizados
            const sql = `UPDATE lecciondiaria
                        SET ${fieldName} = $1
                        WHERE idleccion = $2`;
                        
            const values = [fieldValue, idleccion]; // El valor del campo a actualizar y el ID de la lección
            
            const result = await client.query(sql, values);
            console.log(`${fieldName} updated successfully`);
            
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.error('Error during update:', error);
            throw error;  // Propaga el error para que el controlador lo maneje
        }
        return returnArray;
    };
        
}