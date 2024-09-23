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
    getAllPerfilAsync = async (idperfil) => {
        const repo = new usuarioRepository();
        const returnArray = await repo.getAllPerfilAsync(idperfil);
        return returnArray;
    }
    cambiarContraseñaAsync = async (idperfil, contraseñaActual, nuevaContraseña) => {
        const repo = new usuarioRepository();
        const returnArray = await repo.cambiarContraseñaAsync(idperfil, contraseñaActual, nuevaContraseña);
        return returnArray;
    }
    cambiarFotoPerfilAsync = async (idperfil, foto) => {
        const repo = new usuarioRepository();
        const returnArray = await repo.cambiarFotoPerfilAsync(idperfil, foto);
        return returnArray;
    }
}