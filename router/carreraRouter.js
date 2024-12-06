import { Router } from "express"
import { getTodos, postUno, putUno, deleteUno, getUno } from "../controllers/carreraController.js"

//endpoitns para el alumno
export const carreraRouter = Router()
//localhost:3000"/alumnos"/
carreraRouter.get("/", getTodos )
// metodo GET para obtener un solo alumno
carreraRouter.get("/:id", getUno )
carreraRouter.post("/", postUno)
carreraRouter.put("/:id", putUno)
carreraRouter.delete("/:id", deleteUno)
