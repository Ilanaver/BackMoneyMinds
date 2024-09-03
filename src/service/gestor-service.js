import gestorRepository from '../repository/gestor-repository.js'

export default class gestorService{
    getByIdAsync = async (idusuario, mes, ano) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getByIdAsync(idusuario, mes, ano);
        return returnArray;
    }
    getOppByTipoAsync = async (idusuario, idtipos) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getOppByTipoAsync(idusuario, idtipos);
        return returnArray;
    }
    getSaldoByIdAsync = async (idusuario, mes, ano) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getSaldoByIdAsync(idusuario, mes, ano);
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