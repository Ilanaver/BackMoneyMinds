import DBConfig from '../configs/db-configs.js'
import pkg from 'pg'
import gestorRepository from './gestor-repository.js';


const { Client, Pool } = pkg;
const gestor = new gestorRepository();

export default class estadisticasRepository {
    //Compara los porcentajes de en que se gasto por categoria
     getGastosPorCategoriaAsync = async (idusuario, tipo, mes, ano) => {
        let returnArray = [];
        const client = new Client(DBConfig);
    
        try {
            // Obtén el saldo total para calcular los porcentajes en JavaScript
            const saldoTotalArray = await gestor.getSaldoByTipoForStats(idusuario, tipo, mes, ano);
            const saldoTotal = parseFloat(saldoTotalArray[0]?.["Saldo Mensual"]) || 0;
            console.log("Saldo total:", saldoTotal);
    
            if (saldoTotal === 0) {
                console.log("El gasto total es 0, no se pueden calcular porcentajes.");
                return [];
            }
    
            await client.connect();
            console.log('Connected to the database');
    
            // Consulta para obtener los totales por categoría
            const categoriaSql = `
                SELECT s.descripcion AS categoria, 
                    SUM(g.importe) AS total_categoria
                FROM gestor g
                INNER JOIN subtipomovimiento s ON g.idsubtipo_fk = s.idsubtipo
                WHERE g.idperfil_fk = $1 
                    AND s.idtipos_fk = $2  -- Solo gastos
                    AND EXTRACT(MONTH FROM g.fecha) = $3 
                    AND EXTRACT(YEAR FROM g.fecha) = $4
                GROUP BY s.descripcion
                ORDER BY total_categoria DESC;
            `;
    
            const categoriaValues = [idusuario, tipo, mes, ano];
            const categoriaResult = await client.query(categoriaSql, categoriaValues);
    
            // Calcula el porcentaje en JavaScript
            returnArray = categoriaResult.rows.map(row => {
                const totalCategoria = parseFloat(row.total_categoria);
                const porcentajeCategoria = Math.round((Math.abs(totalCategoria) / Math.abs(saldoTotal)) * 100);
                return {
                    categoria: row.categoria,
                    total_categoria: totalCategoria,
                    porcentaje_categoria: porcentajeCategoria
                };
            });
    
        } catch (error) {
            console.error("Error al obtener los gastos por categoría:", error);
        } finally {
            await client.end().catch((e) => console.error("Error al cerrar la conexión:", e));
        }
        return returnArray;
    };
    
        
    
    getSaldoPorMesAsync = async (idusuario, tipo, ano) => {
        const saldosPorMes = [];
        try {
            for (let mes = 1; mes <= 12; mes++) {  // Iteramos de enero (1) a diciembre (12)
                const saldoMensualArray = await gestor.getSaldoByTipoIdAsync(idusuario, tipo, mes, ano);
                const saldoMensual = parseFloat(saldoMensualArray[0]?.["Saldo actual"]) || 0;
                saldosPorMes.push({ mes, saldo: saldoMensual });
            }
        } catch (error) {
            console.log(error);
        }
        return saldosPorMes;
    };
    
    getPromedioDiarioAsync = async (idusuario, tipo, mes, ano) => {
        let gastoDiarioPromedio = 0;
        try {
            // Paso 1: Obtener el saldo total de gastos del mes usando getSaldoByTipoIdAsync (idtipos = 1 para gastos)
            const saldoGastosArray = await gestor.getSaldoByTipoIdAsync(idusuario, tipo, mes, ano);
            const saldoGastos = parseFloat(saldoGastosArray[0]?.["Saldo actual"]) || 0;
            console.log("Saldo total de gastos del mes:", saldoGastos);
    
            // Paso 2: Obtener el número de días en el mes
            const diasEnMes = new Date(ano, mes, 0).getDate(); // Calcula el último día del mes para obtener la cantidad de días
    
            if (diasEnMes === 0) {
                console.log("No se puede calcular el gasto diario promedio, ya que el mes tiene 0 días.");
                return 0;
            }
    
            // Paso 3: Calcular el gasto diario promedio
            gastoDiarioPromedio = saldoGastos / diasEnMes;
            console.log("Gasto diario promedio:", gastoDiarioPromedio.toFixed(2));
        } catch (error) {
            console.log("Error al calcular el gasto diario promedio:", error);
        }
        return gastoDiarioPromedio.toFixed(2); // Opcionalmente redondeamos a dos decimales
    };
    getRealDiarioAsync = async (idusuario, tipo, mes, ano) => {
        const client = new Client(DBConfig);
        const gastosDiarios = [];
        try {
            await client.connect();
            console.log('Connected to the database');
        
            // Consulta SQL para obtener el gasto total por día del mes especificado
            const sql = `
                SELECT DATE_TRUNC('day', g.fecha) AS fecha, 
                       SUM(g.importe) AS total_dia
                FROM gestor g
                WHERE g.idperfil_fk = $1 
                  AND g.idtipos_fk = $2  -- Solo gastos o ingresos según el tipo
                  AND EXTRACT(MONTH FROM g.fecha) = $3 
                  AND EXTRACT(YEAR FROM g.fecha) = $4
                GROUP BY DATE_TRUNC('day', g.fecha)
                ORDER BY fecha;
            `;
            const values = [idusuario, tipo, mes, ano];
            const result = await client.query(sql, values);
        
            // Convertir los resultados en un diccionario de gastos por fecha
            const gastosPorFecha = {};
            result.rows.forEach(row => {
                const dia = new Date(row.fecha).getDate();
                gastosPorFecha[dia] = parseFloat(row.total_dia);
            });
        
            // Obtener el número de días en el mes
            const diasEnMes = new Date(ano, mes, 0).getDate(); 
    
            // Asignar el tipo en formato de texto ("gasto" o "ingreso")
            tipo = tipo === 1 ? "gasto" : "ingreso";
    
            // Array de días de la semana en español
            const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    
            // Iterar por cada día del mes para llenar el arreglo `gastosDiarios`
            for (let dia = 1; dia <= diasEnMes; dia++) {
                // Crear una fecha con el año, mes y día actual en el ciclo
                const fechaActual = new Date(ano, mes - 1, dia);
                const nombreDia = diasSemana[fechaActual.getDay()]; // Obtener el nombre del día de la semana
    
                gastosDiarios.push({
                    dia,
                    nombreDia, // Nombre del día (lunes, martes, etc.)
                    tipo, // Tipo ("gasto" o "ingreso")
                    monto: gastosPorFecha[dia] || 0 // Gasto o ingreso del día, o 0 si no hay registro
                });
            }
    
            await client.end();
        } catch (error) {
            console.log("Error al calcular los gastos diarios:", error);
        }
    
        return gastosDiarios;
    };
    
    getTop3PorCategoriaAsync = async (idusuario, tipo, mes, ano) => {
        const client = new Client(DBConfig);
        let topCategorias = [];
        try {
            await client.connect();
            console.log('Connected to the database');
        
            // Consulta SQL para obtener el top 3 de categorías de gasto
            const sql = `
                SELECT s.descripcion AS categoria, 
                       SUM(g.importe) AS total_categoria
                FROM gestor g
                INNER JOIN subtipomovimiento s ON g.idsubtipo_fk = s.idsubtipo
                WHERE g.idperfil_fk = $1 
                  AND s.idtipos_fk = $2  -- Solo gastos
                  AND EXTRACT(MONTH FROM g.fecha) = $3 
                  AND EXTRACT(YEAR FROM g.fecha) = $4
                GROUP BY s.descripcion
                ORDER BY total_categoria DESC
                LIMIT 3;  -- Limitamos a las 3 categorías con mayor gasto
            `;
            const values = [idusuario, tipo, mes, ano];
            const result = await client.query(sql, values);
        
            topCategorias = result.rows.map(row => ({
                categoria: row.categoria,
                total: parseFloat(row.total_categoria)
            }));
    
            await client.end();
        } catch (error) {
            console.log("Error al calcular el top 3 de categorías de gasto:", error);
        }
        
        return topCategorias;
    };
    
    getDiaMayorIngresoOGastoAsync = async (idusuario, tipo, mes, ano) => {
        const client = new Client(DBConfig);
        let diaMayorIngresoOGasto = {};
        try {
            await client.connect();
            console.log('Connected to the database');
        
            // Consulta SQL para obtener el total de ingreso o gasto por día del mes especificado
            const sql = `
                SELECT DATE_TRUNC('day', g.fecha) AS fecha, 
                       SUM(g.importe) AS total_dia
                FROM gestor g
                WHERE g.idperfil_fk = $1 
                  AND g.idtipos_fk = $2  -- Solo ingresos o gastos según el tipo
                  AND EXTRACT(MONTH FROM g.fecha) = $3 
                  AND EXTRACT(YEAR FROM g.fecha) = $4
                GROUP BY DATE_TRUNC('day', g.fecha)
                ORDER BY total_dia DESC
                LIMIT 1;  -- Limitar a solo el día con el mayor total
            `;
            const values = [idusuario, tipo, mes, ano];
            const result = await client.query(sql, values);
        
            if (result.rows.length > 0) {
                const row = result.rows[0];
                const dia = new Date(row.fecha).getDate();  // Extraemos el día del resultado
                const totalDia = parseFloat(row.total_dia);  // El total del ingreso o gasto en ese día
    
                // Array de días de la semana en español
                const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
                const nombreDia = diasSemana[new Date(row.fecha).getDay()];  // Obtenemos el nombre del día
    
                diaMayorIngresoOGasto = {
                    dia,
                    nombreDia,
                    totalDia
                };
            } else {
                diaMayorIngresoOGasto = { dia: null, nombreDia: null, totalDia: 0 };
            }
    
            await client.end();
        } catch (error) {
            console.log("Error al obtener el día con mayor ingreso o gasto:", error);
        }
    
        return diaMayorIngresoOGasto;
    };
    
}