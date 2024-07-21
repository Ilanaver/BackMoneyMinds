import multimediaRepository from '../repository/multimedia-repository.js'
export default class multimediaService{
    getTOP4ByTipoAsync = async (categoria) => {
        const repo = new multimediaRepository();
        const returnArray = await repo.getTOP4ByTipoAsync(categoria);
        return returnArray;
    }
    getAllByTipoAsync = async (categoria) => {
        const repo = new multimediaRepository();
        const returnArray = await repo.getAllByTipoAsync(categoria);
        return returnArray;
    }
    getAllByVideoAsync = async (idvideo) => {
        const repo = new multimediaRepository();
        const returnArray = await repo.getAllByVideoAsync(idvideo);
        return returnArray;
    }
    getSearchByNameAsync = async (titulo) => {
        const repo = new multimediaRepository();
        const returnArray = await repo.getSearchByNameAsync(titulo);
        return returnArray;
    }
    addVideoAsync = async (titulo, videolink, img, descripcion, categoria) => {
        const repo = new multimediaRepository();
        const returnArray = await repo.addVideoAsync(titulo, videolink, img, descripcion, categoria);
        return returnArray;
    }
    deleteByVideoAsync = async (idvideo) => {
        const repo = new multimediaRepository();
        const returnArray = await repo.deleteByVideoAsync(idvideo);
        return returnArray;
    }
}
