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
    getSubtiposByTipoAsync = async (idtipos) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getSubtiposByTipoAsync(idtipos);
        return returnArray;
    }
    getSaldoByTipoIdAsync = async (idusuario, idtipos, mes, ano) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getSaldoByTipoIdAsync(idusuario, idtipos, mes, ano);
        return returnArray;
    }
    addByIdAsync = async (IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones) => {
        const repo = new gestorRepository();
        console.log("XXXXXX: " + IdPerfil)
        const returnArray = await repo.addByIdAsync(IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones);
        return returnArray;
    }
    deleteByIdAsync = async (idusuario) => {
        const repo = new gestorRepository();
        const returnArray = await repo.deleteByIdAsync(idusuario);
        return returnArray;
    }
}