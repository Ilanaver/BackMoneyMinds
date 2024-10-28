import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'
import gestorRepository from './gestor-repository.js';


const { Client, Pool } = pkg;
const gestor = new gestorRepository();

export default class estadisticasRepository {
    //Compara los porcentajes de en que se gasto por categoria
    getGastosPorCategoriaAsync = async (idusuario, mes, ano) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            const saldoTotalArray = await this.getSaldoByTipoIdAsync(idusuario, 1, mes, ano);
            const saldoTotal = parseFloat(saldoTotalArray[0]?.["Saldo actual"]) || 0;
            console.log("Saldo total:", saldoTotal); // Muestra el saldo real, con signo
    
            if (saldoTotal === 0) {
                console.log("El gasto total es 0, no se pueden calcular porcentajes.");
                return [];
            }
    
            await client.connect();
            console.log('Connected to the database');
    
            const categoriaSql = `
                SELECT s.descripcion AS categoria, 
                    SUM(g.importe) AS total_categoria,
                    ROUND(CAST((ABS(SUM(g.importe)) / ABS($4)) * 100 AS numeric), 0) AS porcentaje_categoria
                FROM gestor g
                INNER JOIN subtipomovimiento s ON g.idsubtipo_fk = s.idsubtipo
                WHERE g.idperfil_fk = $1 
                AND s.idtipos_fk = 1  -- Solo gastos
                AND EXTRACT(MONTH FROM g.fecha) = $2 
                AND EXTRACT(YEAR FROM g.fecha) = $3
                GROUP BY s.descripcion
                ORDER BY total_categoria DESC;
            `;

            const categoriaValues = [idusuario, mes, ano, saldoTotal];
            const categoriaResult = await client.query(categoriaSql, categoriaValues);
    
            returnArray = categoriaResult.rows;
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    };
        
    //Compara los porcentajes de en que se ingreso mas por categoria
    getIngresosPorCategoriaAsync = async (idusuario, mes, ano) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            // Obtenemos el saldo total de ingresos para el cálculo de porcentaje
            const saldoTotalArray = await gestor.getSaldoByTipoIdAsync(idusuario, 2, mes, ano); // Filtramos por ingresos (idtipos_fk = 2)
            const saldoTotal = parseFloat(saldoTotalArray[0]?.["Saldo actual"]) || 0;
            console.log("Saldo total de ingresos:", saldoTotal); 
    
            if (saldoTotal === 0) {
                console.log("El ingreso total es 0, no se pueden calcular porcentajes.");
                return [];
            }
    
            await client.connect();
            console.log('Connected to the database');
    
            // Consulta SQL para obtener ingresos por categoría y su porcentaje
            const categoriaSql = `
                SELECT s.descripcion AS categoria, 
                       SUM(g.importe) AS total_categoria,
                       ROUND(CAST((ABS(SUM(g.importe)) / ABS($4)) * 100 AS numeric), 0) AS porcentaje_categoria
                FROM gestor g
                INNER JOIN subtipomovimiento s ON g.idsubtipo_fk = s.idsubtipo
                WHERE g.idperfil_fk = $1 
                AND s.idtipos_fk = 2  -- Solo ingresos
                AND EXTRACT(MONTH FROM g.fecha) = $2 
                AND EXTRACT(YEAR FROM g.fecha) = $3
                GROUP BY s.descripcion
                ORDER BY total_categoria DESC;
            `;
            const categoriaValues = [idusuario, mes, ano, saldoTotal];
            const categoriaResult = await client.query(categoriaSql, categoriaValues);
    
            returnArray = categoriaResult.rows;
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    };
    getSaldoPorMesAsync = async (idusuario, tipo, ano) => {
        const saldosPorMes = [];
        try {
            for (let mes = 1; mes <= 12; mes++) {  // Iteramos de enero (1) a diciembre (12)
                const saldoMensualArray = await this.getSaldoByTipoIdAsync(idusuario, tipo, mes, ano);
                const saldoMensual = parseFloat(saldoMensualArray[0]?.["Saldo actual"]) || 0;
                saldosPorMes.push({ mes, saldo: saldoMensual });
            }
        } catch (error) {
            console.log(error);
        }
        return saldosPorMes;
    };
    
    getSaldoByIdAsync = async (idusuario, mes, ano) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database 2');
            const sql = `SELECT SUM(g.importe) as "Saldo actual"
            FROM gestor g
            WHERE g.idperfil_fk = $1 AND EXTRACT(MONTH FROM g.fecha) = $2 AND EXTRACT(YEAR FROM g.fecha) = $3;`;
            const values = [idusuario, mes, ano] 
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    } 
    getSaldoByTipoIdAsync = async (idusuario, idtipos, mes, ano) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database 2');
            const sql = `SELECT SUM(g.importe) as "Saldo actual"
            FROM gestor g
            WHERE g.idperfil_fk = $1 AND g.idtipos_fk = $2 AND EXTRACT(MONTH FROM g.fecha) = $3 AND EXTRACT(YEAR FROM g.fecha) = $4;`;
            const values = [idusuario, idtipos, mes, ano] 
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