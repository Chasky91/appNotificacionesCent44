import { Router } from "express"
import { 
    mostrarMatriculas, 
    obtenerUnaMatricula, 
    crearMatricula, 
    actualizarMatricula, 
    eliminarMatricula, 
} from "../controllers/administrativoController.js"


export const routerMatricula = Router();

// Rutas para las matrículas
routerMatricula.get('/', mostrarMatriculas);
routerMatricula.get('/:dni_alum/:id_materia', obtenerUnaMatricula);
routerMatricula.post('/', crearMatricula);
routerMatricula.put('/:dni_alum/:id_materia', actualizarMatricula);
routerMatricula.delete('/:dni_alum/:id_materia', eliminarMatricula);

export default routerMatricula;
