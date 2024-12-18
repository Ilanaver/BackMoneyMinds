import cuentaRepository from '../repository/cuenta-repository.js'
export default class cuentaService{
    getCuentasAsync = async (idperfil_fk) => {
        const repo = new cuentaRepository();
        const returnArray = await repo.getCuentasAsync(idperfil_fk);
        return returnArray;
    }
    get1CuentaAsync = async (idcuenta) => {
        const repo = new cuentaRepository();
        const returnArray = await repo.get1CuentaAsync(idcuenta);
        return returnArray;
    }
    addCuentaAsync = async (idperfil_fk, nombre, tipo_cuenta, saldo_inicial, moneda, banco, descripcion, activa) => {
        const repo = new cuentaRepository();
        const returnArray = await repo.addCuentaAsync(idperfil_fk, nombre, tipo_cuenta, saldo_inicial, moneda, banco, descripcion, activa);
        return returnArray;
    }
    deleteByIdAsync = async (idcuenta) => {
        const repo = new cuentaRepository();
        const returnArray = await repo.deleteByIdAsync(idcuenta);
        return returnArray;
    }
    deleteAllGestorAsync = async (idcuenta) => {
        const repo = new cuentaRepository();
        const returnArray = await repo.deleteAllGestorAsync(idcuenta);
        return returnArray;
    }
    updateFieldByIdAsync = async (idcuenta, fieldName, fieldValue) => {
        const repo = new cuentaRepository();
        const returnArray = await repo.updateFieldByIdAsync(idcuenta, fieldName, fieldValue);
        return returnArray;
    }
}