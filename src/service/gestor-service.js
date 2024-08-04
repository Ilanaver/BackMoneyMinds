import gestorRepository from '../repository/gestor-repository.js'

export default class gestorService{
    getByIdAsync = async (idusuario) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getByIdAsync(idusuario);
        return returnArray;
    }
    getOppByTipoAsync = async (idusuario, idtipos) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getOppByTipoAsync(idusuario, idtipos);
        return returnArray;
    }
    getSaldoByIdAsync = async (idusuario) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getSaldoByIdAsync(idusuario);
        return returnArray;
    }
    getSubtiposByTipoAsync = async (idtipos) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getSubtiposByTipoAsync(idtipos);
        return returnArray;
    }
    getSaldoByTipoIdAsync = async (idusuario, idtipos) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getSaldoByTipoIdAsync(idusuario, idtipos);
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