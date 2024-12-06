import { Router } from "express"
import { 
    mostrarAdministrativos, 
    buscarUnAdmin, 
    crearAdmin, 
    actualizarAdmin, 
    eliminarUnAdmin,
} from "../controllers/administrativoController.js"


export const routerAdmin = Router();

// Rutas para los administrativos
routerAdmin.get('/', mostrarAdministrativos );
routerAdmin.get('/:id', buscarUnAdmin);
routerAdmin.post('/', crearAdmin);
routerAdmin.put('/:id', actualizarAdmin);
routerAdmin.delete('/:id', eliminarUnAdmin);

export default routerAdmin;


