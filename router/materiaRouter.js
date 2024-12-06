import { Router } from 'express'
import { 
    mostrarMaterias, 
    obtenerUnaMateria, 
    crearMateria, 
    actualizarMateria, 
    eliminarMateria, 
} from '../controllers/materiaController.js';

const routerMateria = Router();

routerMateria.get('/', mostrarMaterias);              // Obtiene todas las materias
routerMateria.get('/:id', obtenerUnaMateria);        // Obtiene una materia por su ID
routerMateria.post('/', crearMateria);              // Crea una nueva materia
routerMateria.put('/:id', actualizarMateria);      // Actualiza una materia por su ID
routerMateria.delete('/:id', eliminarMateria);      // Elimina una materia por su ID

export default routerMateria;

