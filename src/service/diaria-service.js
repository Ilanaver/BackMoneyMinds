import diariaRepository from '../repository/diaria-repository.js'
export default class diariaService{
    addleccionAsync = async (titulo, descripcion, contenido, fecha) => {
        const repo = new diariaRepository();
        const returnArray = await repo.addleccionAsync(titulo, descripcion, contenido, fecha);
        return returnArray;
    }
    deleteByIdAsync = async (idleccion) => {
        const repo = new diariaRepository();
        const returnArray = await repo.deleteByIdAsync(idleccion);
        return returnArray;
    }
    getTodayAsync = async (fecha) => {
        const repo = new diariaRepository();
        const returnArray = await repo.getTodayAsync(fecha);
        return returnArray;
    }
    updateFieldByIdAsync = async (idleccion, fieldName, fieldValue) => {
        const repo = new diariaRepository();
        const returnArray = await repo.updateFieldByIdAsync(idleccion, fieldName, fieldValue);
        return returnArray;
    }
}