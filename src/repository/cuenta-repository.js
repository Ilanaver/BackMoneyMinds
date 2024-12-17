import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'


const { Client, Pool } = pkg;
export default class cuentaRepository {
    addCuentaAsync = async (idperfil_fk, nombre, tipo_cuenta, saldo_inicial, moneda, banco, descripcion, activa) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO cuenta (idperfil_fk, nombre, tipo_cuenta, saldo_inicial, moneda, banco, descripcion, activa)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
            const values = [idperfil_fk, nombre, tipo_cuenta, saldo_inicial, moneda, banco, descripcion, activa] //preguntar que es
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
    deleteByIdAsync = async (idcuenta) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `DELETE FROM cuenta where idcuenta = $1`;
            const values = [idcuenta] //preguntar que es
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
    getCuentasAsync = async (idperfil_fk) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `Select * from cuenta where idperfil_fk = $1`;
            const values = [idperfil_fk]
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
    get1CuentaAsync = async (idcuenta) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `Select * from cuenta where idcuenta = $1`;
            const values = [idcuenta] //preguntar que es
            const result = await client.query(sql, values);
            console.log('Data inserted successfully');
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        console.log(returnArray)
        return returnArray;
    }
    updateFieldByIdAsync = async (idcuenta, fieldName, fieldValue) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            // Evitar inyección SQL usando valores parametrizados
            const sql = `UPDATE cuenta SET ${fieldName} = $1 WHERE idcuenta = $2`;
            const values = [fieldValue, idcuenta]; // El valor del campo a actualizar y el ID de la lección
            
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