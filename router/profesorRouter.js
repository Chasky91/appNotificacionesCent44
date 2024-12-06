import { Router } from 'express'
import { mostrarProfesores, buscarUnProfesor,crearProfesor,actualizarProfesor,eliminarProfesor} from "../controllers/profesorController.js"

export const routerProfesor = Router()

routerProfesor.get("/", mostrarProfesores )
routerProfesor.get("/:id", buscarUnProfesor )
routerProfesor.post("/", crearProfesor)
routerProfesor.put("/:id", actualizarProfesor)
routerProfesor.delete("/:id", eliminarProfesor)

export default routerProfesor;
