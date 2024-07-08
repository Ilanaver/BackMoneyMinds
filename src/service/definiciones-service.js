import definicionesRepository from '../repository/definiciones-repository.js'
export default class definicionesService{
    getTOP6Async = async () => {
        const repo = new definicionesRepository();
        const returnArray = await repo.getTOP6Async();
        return returnArray;
    }
    getSearchByNameAsync = async (titulo) => {
        const repo = new definicionesRepository();
        const returnArray = await repo.getSearchByNameAsync(titulo);
        return returnArray;
    }
    addDefinicionAsync = async (titulo, contenido) => {
        const repo = new definicionesRepository();
        const returnArray = await repo.addDefinicionAsync(titulo, contenido);
        return returnArray;
    }
    deleteByIdAsync = async (idtermino) => {
        const repo = new definicionesRepository();
        const returnArray = await repo.deleteByIdAsync(idtermino);
        return returnArray;
    }
}