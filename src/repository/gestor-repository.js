import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'


const { Client, Pool } = pkg;

export default class gestorRepository {
    getByIdAndAccountAsync = async (idusuario, mes, ano, idCuenta) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
    
            const sql = `
                SELECT 
                    g.importe, 
                    t.descripcion AS tipo, 
                    s.descripcion AS subtipo, 
                    TO_CHAR(g.fecha, 'DD/MM') AS fecha,
                    c.nombre AS cuenta 
                FROM gestor g
                INNER JOIN tipos t ON g.idtipos_fk = t.idtipos
                INNER JOIN subtipomovimiento s ON g.idsubtipo_fk = s.idsubtipo
                INNER JOIN cuenta c ON g.idcuenta_fk = c.idcuenta
                WHERE g.idperfil_fk = $1 
                  AND c.idcuenta = $4
                  AND EXTRACT(MONTH FROM g.fecha) = $2 
                  AND EXTRACT(YEAR FROM g.fecha) = $3
                ORDER BY g.fecha`;
    
            const values = [idusuario, mes, ano, idCuenta];
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    };    
    getoppByTipoAsync = async (idusuario, mes, ano, idCuenta, idtipos) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database');
    
            const sql = `
                SELECT 
                    g.idgestor,
                    g.importe, 
                    t.descripcion AS tipo, 
                    s.descripcion AS subtipo, 
                    TO_CHAR(g.fecha, 'DD/MM') AS fecha, 
                    c.nombre AS cuenta
                FROM gestor g
                INNER JOIN tipos t ON g.idtipos_fk = t.idtipos
                INNER JOIN subtipomovimiento s ON g.idsubtipo_fk = s.idsubtipo
                INNER JOIN cuenta c ON g.idcuenta_fk = c.idcuenta
                WHERE g.idperfil_fk = $1 
                  AND g.idtipos_fk = $5
                  AND c.idcuenta = $4
                  AND EXTRACT(MONTH FROM g.fecha) = $2 
                  AND EXTRACT(YEAR FROM g.fecha) = $3
                ORDER BY g.fecha`;
    
            const values = [idusuario, mes, ano, idCuenta, idtipos];
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    };
    
    getSaldoByIdAsync = async (idusuario, idcuenta, mes, ano) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database 2');
            const sql = `
                SELECT SUM(
                    CASE 
                        WHEN g.idtipos_fk = 1 THEN -g.importe  -- Si idtipos es 1, restar
                        ELSE g.importe                      -- En otro caso, sumar
                    END
                ) as "Saldo Mensual"
                FROM gestor g
                WHERE g.idperfil_fk = $1 
                  AND g.idcuenta_fk = $2
                  AND EXTRACT(MONTH FROM g.fecha) = $3 
                  AND EXTRACT(YEAR FROM g.fecha) = $4;
            `;
            const values = [idusuario, idcuenta, mes, ano];
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    };
    
    
    getSaldoByTipoIdAsync = async (idusuario, idtipos, idcuenta, mes, ano) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database 2');
            const sql = `SELECT SUM(g.importe) as "Saldo Mensual"
            FROM gestor g
            WHERE g.idperfil_fk = $1 AND g.idtipos_fk = $2 AND g.idcuenta_fk = $3 
            AND EXTRACT(MONTH FROM g.fecha) = $4 AND EXTRACT(YEAR FROM g.fecha) = $5;`;
            const values = [idusuario, idtipos, idcuenta, mes, ano];
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    
    getSaldoByTipoForStats = async (idusuario, idtipos, mes, ano) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            console.log('Connected to the database 2');
            const sql = `SELECT SUM(g.importe) as "Saldo Mensual"
            FROM gestor g
            WHERE g.idperfil_fk = $1 AND g.idtipos_fk = $2 AND EXTRACT(MONTH FROM g.fecha) = $3 AND EXTRACT(YEAR FROM g.fecha) = $4;`;
            const values = [idusuario, idtipos, mes, ano];
            const result = await client.query(sql, values);
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

    addByIdAsync = async (IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones, IdCuenta) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();

            // Iniciar una transacción
            await client.query('BEGIN');

            // Insertar el nuevo registro en la tabla "gestor"
            const sqlInsert = `INSERT INTO gestor (idperfil_fk, idtipos_fk, idsubtipo_fk, importe, fecha, observaciones, idcuenta_fk)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            const valuesInsert = [IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones, IdCuenta];
            await client.query(sqlInsert, valuesInsert);

            // Actualizar el saldo de la cuenta en la tabla "cuenta"
            const sqlUpdateSaldo = `
                UPDATE cuenta
                SET saldo_actual = saldo_actual + $1
                WHERE idcuenta = $2
            `;
            const saldoAdjustment = IdTipos === 1 ? -Importe : Importe; // Si es gasto (idtipos = 1), restar
            const valuesUpdateSaldo = [saldoAdjustment, IdCuenta];
            await client.query(sqlUpdateSaldo, valuesUpdateSaldo);

            // Confirmar la transacción
            await client.query('COMMIT');

            console.log('Transaction completed successfully');
        } catch (error) {
            console.error('Error during transaction:', error);

            // Revertir la transacción en caso de error
            await client.query('ROLLBACK');
            throw error;
        } finally {
            await client.end();
        }
        return returnArray;
    };

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
deleteByIdAsync = async (IdGestor) => {
    const client = new Client(DBConfig);
    try {
        await client.connect();

        // Iniciar una transacción
        await client.query('BEGIN');

        // Obtener los detalles de la transacción (idcuenta_fk, importe, idtipos_fk) usando el idgestor
        const sqlSelect = `
            SELECT idcuenta_fk AS idcuenta, importe, idtipos_fk AS idtipos 
            FROM gestor 
            WHERE idgestor = $1
        `;
        const valuesSelect = [IdGestor];
        const result = await client.query(sqlSelect, valuesSelect);

        if (result.rows.length === 0) {
            throw new Error('Transacción no encontrada');
        }

        const { idcuenta, importe, idtipos } = result.rows[0];

        // Eliminar el registro en la tabla "gestor"
        const sqlDelete = `DELETE FROM gestor WHERE idgestor = $1`;
        await client.query(sqlDelete, valuesSelect);

        // Ajustar el saldo de la cuenta en la tabla "cuenta"
        const sqlUpdateSaldo = `
            UPDATE cuenta
            SET saldo_actual = saldo_actual - $1
            WHERE idcuenta = $2
        `;
        const saldoAdjustment = idtipos === 1 ? -importe : importe; // Si es gasto (idtipos_fk = 1), revertir el impacto
        const valuesUpdateSaldo = [saldoAdjustment, idcuenta];
        await client.query(sqlUpdateSaldo, valuesUpdateSaldo);

        // Confirmar la transacción
        await client.query('COMMIT');

        console.log('Transaction completed successfully');
    } catch (error) {
        console.error('Error during transaction:', error);

        // Revertir la transacción en caso de error
        await client.query('ROLLBACK');
        throw error;
    } finally {
        await client.end();
    }
};
}