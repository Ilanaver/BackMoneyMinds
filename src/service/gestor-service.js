import gestorRepository from '../repository/gestor-repository.js'

export default class gestorService{
    getByIdAndAccountAsync = async (idusuario, mes, ano, idCuenta) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getByIdAndAccountAsync(idusuario, mes, ano, idCuenta);
        return returnArray;
    }
    getoppByTipoAsync = async (idusuario, mes, ano, idCuenta, idtipos) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getoppByTipoAsync(idusuario, mes, ano, idCuenta, idtipos);
        return returnArray;
    }
    getSaldoByIdAsync = async (idusuario, mes, ano) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getSaldoByIdAsync(idusuario, mes, ano);
        return returnArray;
    }
    getSaldoByTipoIdAsync = async (idusuario, idtipos, mes, ano) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getSaldoByTipoIdAsync(idusuario, idtipos, mes, ano);
        return returnArray;
    }
    getSubtiposByTipoAsync = async (idtipos) => {
        const repo = new gestorRepository();
        const returnArray = await repo.getSubtiposByTipoAsync(idtipos);
        return returnArray;
    }
    addByIdAsync = async (IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones, IdCuenta) => {
        const repo = new gestorRepository();
        const returnArray = await repo.addByIdAsync(IdPerfil, IdTipos, IdSubTipo, Importe, Fecha, Observaciones, IdCuenta);
        return returnArray;
    };
    deleteByIdAsync = async (IdGestor) => {
        const repo = new gestorRepository();
        const returnArray = await repo.deleteByIdAsync(IdGestor);
        return returnArray;
    }
}