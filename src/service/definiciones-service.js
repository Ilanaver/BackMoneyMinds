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
}