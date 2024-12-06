import { Router } from "express"
import { 
    mostrarMensajes, 
    obtenerMensaje, 
    crearMensaje  
} from "../controllers/administrativoController.js"


export const routerMensajes = Router();

// Rutas para los mensajes
routerMensajes.get('/', mostrarMensajes);
routerMensajes.get('/:id_admin/:dni_alum/:id_mat', obtenerMensaje);
routerMensajes.post('/', crearMensaje);

export default routerMensajes;
