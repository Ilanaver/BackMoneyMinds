export default class Gestor {
    constructor(IdPerfil_FK,IdTipos_FK,IdSubTipo_FK,Importe,Fecha,Observaciones){
        this.IdPerfil_FK = IdPerfil_FK;
        this.IdTipos_FK = IdTipos_FK;
        this.IdSubTipo_FK = IdSubTipo_FK;
        this.Importe = Importe;
        this.Fecha = Fecha;
        this.Observaciones = Observaciones;

    }
    toString() {
        return `Nombre: ${this.IdTipos_FK}, Id: ${this.IdPerfil_FK}, Apellido: ${this.IdSubTipo_FK}, Telefono: ${this.Importe}, Mail: ${this.Fecha},Contraseña ${this.Observaciones}`
    }
}