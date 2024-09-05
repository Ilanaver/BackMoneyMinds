import usuarioRepository from '../repository/usuario-repository.js'
export default class usuarioService{
    addUsuarioAsync = async (nombre, mail, contraseña) => {
        const repo = new usuarioRepository();
        const returnArray = await repo.addUsuarioAsync(nombre, mail, contraseña);
        return returnArray;
    }
}