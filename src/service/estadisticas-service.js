import estadisticasRepository from '../repository/estadisticas-repository.js'

export default class estadisticasService{
    getGastosPorCategoriaAsync = async (idusuario, mes, ano) => {
        const repo = new estadisticasRepository();
        const returnArray = await repo.getGastosPorCategoriaAsync(idusuario, mes, ano);
        return returnArray;
    }
    getIngresosPorCategoriaAsync = async (idusuario, mes, ano) => {
        const repo = new estadisticasRepository();
        const returnArray = await repo.getIngresosPorCategoriaAsync(idusuario, mes, ano);
        return returnArray;
    }
    getSaldoPorMesAsync = async (idusuario, tipo, ano) => {
        const repo = new estadisticasRepository();
        const returnArray = await repo.getSaldoPorMesAsync(idusuario, tipo, ano);
        return returnArray;
    }
    getPromedioDiarioAsync = async (idusuario, tipo, mes, ano) => {
        const repo = new estadisticasRepository();
        const returnArray = await repo.getPromedioDiarioAsync(idusuario, tipo, mes, ano);
        return returnArray;
    }
    getRealDiarioAsync = async (idusuario, tipo, mes, ano) => {
        const repo = new estadisticasRepository();
        const returnArray = await repo.getRealDiarioAsync(idusuario, tipo, mes, ano);
        return returnArray;
    }
    getTop3PorCategoriaAsync = async (idusuario, tipo, mes, ano) => {
        const repo = new estadisticasRepository();
        const returnArray = await repo.getTop3PorCategoriaAsync(idusuario, tipo, mes, ano);
        return returnArray;
    }
}