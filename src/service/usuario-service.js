import usuarioRepository from '../repository/usuario-repository.js'
export default class usuarioService{
    addUsuarioAsync = async (usuario, mail, contraseña) => {
        const repo = new usuarioRepository();
        const returnArray = await repo.addUsuarioAsync(usuario, mail, contraseña);
        return returnArray;
    }
    loginUsuarioAsync = async (mail, contraseña) => {
        const repo = new usuarioRepository();
        const returnArray = await repo.loginUsuarioAsync(mail, contraseña);
        return returnArray;
    }
}