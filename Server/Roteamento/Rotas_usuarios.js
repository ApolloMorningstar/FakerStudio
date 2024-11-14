import Express from 'express';
import { listarUsuarios, encontrarUsuario } from '../Controlador/Controlador_usuarios.js';

const rotasUsuarios = Express.Router();
rotasUsuarios.get('/', listarUsuarios);
rotasUsuarios.get('/:id', encontrarUsuario);

export { rotasUsuarios };