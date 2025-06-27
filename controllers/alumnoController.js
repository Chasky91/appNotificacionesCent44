//controlador
import alumnos from "../models/alumnoModel.js"
import { validarAlunno } from "../schemas/schemaAlumnos.js"
import alumnoModel from "../models/alumnoModel.js"


export const  obtenerAlumnos = async (req, res) =>{
    console.log("desde el controlador")
    let resul = await alumnoModel.buscarTodos()
    console.log(resul)
    res.json({"mensaje":resul})
}

export const obtenerUnAlumno = async (req, res) => {
    // id rfescatado desde la solicitud del cliente
    let id = parseInt(req.params.id_alumno)
    //const resultado = alumnos.find( alumno => alumno.id_alumno === id )
    const resultado = await alumnoModel.buscarUno(id)
    if(resultado.length >=1)  return res.json({"menssage" : resultado})
    console.log(resultado)

    res.status(404).json({"message": "El alumno que solicitas no existe"})
}

export const crearAlumno = async (req, res) => {
        
    try {
        let body = req.body
        const  resultadoValidacion = validarAlunno(body)
        if(resultadoValidacion.error) {
            console.log(typeof result, "que dato es")    
            return res.status(400).json({mensaje:JSON.parse(resultadoValidacion.error.message)})
        }     
        //valiudar los datos que posee el body
        //console.log(body);
        //alumnos.push(body)
        console.log(resultadoValidacion.data)
        // recupero el sultado de  insertar y selccionar el nuevo registro
        const nuevo = await alumnoModel.crear(resultadoValidacion.data)
        
        res.json({"message":nuevo[0]})
    }
    catch (error) {
        console.error("Error al crear un Alumno:", error);
        res.status(500).json({ mensaje: "Error al crear el Alumno." });  // Error en el servidor
    }
}


export const  actualizarAlumno = async (req, res) =>{
    console.log("Se accedio a actiualizar alumno")
    let id = parseInt(req.params.id)
    let  body = req.body

    const alumno = await alumnoModel.buscarUno(id) // Buscamos el alumno
    //if(indice === -1)  return res.status(404).json({"mensaje":"el alumno no existe"}) //id incorrecto el alumno no existe
    if(alumno.length === 0)  return res.status(404).json({"mensaje":"el alumno no existe"}) //id incorrecto el alumno no existe
    
    //alumnos.splice(indice,1, actualizado )  
    
    const actualizado = await alumnoModel.actualizar(body, id)
    console.log( actualizado)
    res.json({"mensaje":actualizado})
}

export const  eliminarAlumno = async(req, res) =>{
    let id = parseInt(req.params.id)

    const resul = await alumnos.eliminarUno(id)
    console.log(resul)
    if(resul === -1) return res.status(404).json({"mensaje":"el alumno no existe"}) 

    return res.json({"mensaje":"alumno borrado"})            //alumnos.splice(i,1,alumnoModificado)
}






