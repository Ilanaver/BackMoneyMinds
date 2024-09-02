import {Router} from "express"
import multimediaService from "../service/multimedia-service.js";


const router = Router();
const svc =  new multimediaService();
router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getCategoriasAsync();
    console.log('entra aca')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json(returnArray);
    } else
    {
        console.log('se fue')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
router.get('/todos', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getVideosAsync();
    console.log('entra aca')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json(returnArray);
    } else
    {
        console.log('se fue')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
router.get('/:categoria', async (req, res) => {
    let respuesta;
    const categoria = req.params.categoria; 
    const returnArray = await svc.getTOP4ByTipoAsync(categoria);
    console.log('entra aca')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json(returnArray);
    } else
    {
        console.log('se fue')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
router.get('/ver-mas/:categoria', async (req, res) => {
    let respuesta;
    const categoria = req.params.categoria; 
    const returnArray = await svc.getAllByTipoAsync(categoria);
    console.log('entra aca')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json(returnArray);
    } else
    {
        console.log('se fue')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
router.get('/video/:idvideo', async (req, res) => {
    let respuesta;
    const idvideo = req.params.idvideo; 
    const returnArray = await svc.getAllByVideoAsync(idvideo);
    console.log('entra aca')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json(returnArray);
    } else
    {
        console.log('se fue')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
router.get('/buscar/:titulo', async (req, res) => {
    let respuesta;
    const titulo = req.params.titulo; 
    const returnArray = await svc.getSearchByNameAsync(titulo);
    console.log('entra')
    if(returnArray != null)
    {
        console.log(returnArray)
        respuesta = res.status(200).json(returnArray);
    } else
    {
        console.log('else')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
router.post('/agregar-video', async (req, res) => {
    let { titulo, videolink, img, descripcion, categoria } = req.body;
    var agregado = {
        "titulo": titulo,
        "videolink": videolink,
        "img": img,
        "descripcion": descripcion,
        "categoria": categoria,
      };
    if (!titulo || !videolink || !img || !categoria) {
        /*No ponemos descripcion aca porque descripcion si puede ser null,
        y en el caso de que no haya puesto una descripcion se tiene que poder agregar igual*/
        res.status(400).json({ message: 'Faltan datos. (recuerda que SOLO descripcion puede ser nulo)', agregado });
    } else {
        const result = await svc.addVideoAsync(titulo, videolink, img, descripcion, categoria);
        res.status(201).json({ message: 'Se agrego correctamente.', agregado });
    }
});
/*
{
    "titulo": "",
    "videolink": "",
    "img": "",
    "descripcion": "",
    "categoria": ""
}
*/
router.delete('/borrar-video/:idvideo', async (req, res) => {
    let respuesta;
    const idvideo = req.params.idvideo; 
    const returnArray = await svc.deleteByVideoAsync(idvideo);
    console.log('entra')
    if(returnArray != null)
    {
        console.log('normal')
        respuesta = res.status(200).json('Eliminado correctamente.');
    } else
    {
        console.log('else')
        respuesta = res.status(500).send('Error Interno')
    }
    return respuesta;
}) 
export default router