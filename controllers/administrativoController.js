import administrativoModel from "../models/administrativoModel.js";
import matriculaModel from "../models/matriculaModel.js"; 
import mensajeModel from '../models/mensajeModel.js'; 
import { validarAdmin } from "../schemas/schemaAdministrativos.js";
import { validarMatricula } from "../schemas/schemaMatriculas.js";
import { validarMensaje } from '../schemas/schemaMensajes.js';

// Mostrar todos los administrativos
export const mostrarAdministrativos = async (req, res) => {
try {
    const administrativos = await administrativoModel.mostrarAdministrativos();
    res.json({ administrativos });
    } catch (error) {
    console.error("Error al obtener administrativos:", error);
    res.status(500).json({ error: "Error al obtener los administrativos." });
    }
};

// Buscar un administrativo por ID
export const buscarUnAdmin = async (req, res) => {
try {
    const id = parseInt(req.params.id); // Convertir el parámetro a número
    const administrativo = await administrativoModel.buscarUnAdmin(id);

    if (administrativo.length > 0) {
      res.json({ administrativo: administrativo[0] }); // Devuelve el primero encontrado
    } else {
        res.status(404).json({ mensaje: "Administrativo no encontrado." });
    }
    } catch (error) {
    console.error("Error al buscar un administrativo:", error);
    res.status(500).json({ error: "Error al buscar el administrativo." });
    }
};

// Crear un nuevo administrativo
export const crearAdmin = async (req, res) => {
    try {
        const body = req.body; 
        console.log("Datos recibidos:", req.body);// Obtener el cuerpo de la solicitud

        // Validar los datos con el esquema
        const resultadoValidacion = validarAdmin(body);

        if (!resultadoValidacion.success) {
            return res.status(400).json({
                mensaje: "Los datos enviados no son válidos.",
                errores: resultadoValidacion.error?.format() || {},  // Agregado el operador de encadenamiento opcional para evitar el error
            });
        }        
    
        // Si la validación es exitosa, insertar el nuevo administrativo en la base de datos
        const nuevoAdmin = await administrativoModel.crearAdmin(body);  // Función en el modelo que maneja la inserción

        // Devolver la respuesta con el nuevo administrativo creado
        res.status(201).json({
            mensaje: "Administrativo creado exitosamente",
            administrativo: nuevoAdmin[0],  // Devolver el primer elemento de los resultados de la consulta
        });
    } catch (error) {
        console.error("Error al crear un administrativo:", error);
        res.status(500).json({ mensaje: "Error al crear el administrativo." });  // Error en el servidor
    }
};

// Actualizar un administrativo
export const actualizarAdmin = async (req, res) => {
    try {
      const id = parseInt(req.params.id); // Convertir el parámetro a número
      if (isNaN(id)) {
        return res.status(400).json({ mensaje: "ID inválido." });
      }
  
      const body = req.body;
  
      // Validar los datos con el esquema
      const resultadoValidacion = validarAdmin(body);
      if (!resultadoValidacion.success) {
        return res.status(400).json({
          mensaje: "Error en los datos enviados.",
          errores: resultadoValidacion.error.format(),
        });
      }
  
      // Verificar si el administrativo existe
      const administrativo = await administrativoModel.buscarUnAdmin(id);
      if (administrativo.length === 0) {
        return res.status(404).json({ mensaje: "Administrativo no encontrado." });
      }
  
      // Actualizar el administrativo con datos validados
      const administrativoActualizado = await administrativoModel.actualizarAdmin(
        resultadoValidacion.data.nombre,
        resultadoValidacion.data.apellido,
        resultadoValidacion.data.email,
        resultadoValidacion.data.password_hash,
        id
      );
  
      res.json({ mensaje: "Administrativo actualizado.", administrativo: administrativoActualizado[0] });
    } catch (error) {
      console.error("Error al actualizar un administrativo:", error);
      res.status(500).json({ error: "Error al actualizar el administrativo." });
    }
  };
  
// Eliminar un administrativo
export const eliminarUnAdmin = async (req, res) => {
try {
    const id = parseInt(req.params.id); // Convertir el parámetro a número

    // Verificar si el administrativo existe
    const administrativo = await administrativoModel.buscarUnAdmin(id);
    if (administrativo.length === 0) {
        return res.status(404).json({ mensaje: "Administrativo no encontrado." });
    }

    // Eliminar el administrativo
    await administrativoModel.eliminarUnAdmin(id);
    res.json({ mensaje: "Administrativo eliminado correctamente." });
    } catch (error) {
    console.error("Error al eliminar un administrativo:", error);
    res.status(500).json({ error: "Error al eliminar el administrativo." });
    }
};

////// MATRICULAS
// Mostrar todas las matrículas
export const mostrarMatriculas = async (req, res) => {
    try {
        const matriculas = await matriculaModel.mostrarMatriculas();
        res.json({ matriculas });
    } catch (error) {
        console.error("Error al obtener matriculas:", error);
        res.status(500).json({ error: "Error al obtener las matriculas." });
    }
};

// Buscar una matrícula por DNI y ID de materia
export const obtenerUnaMatricula = async (req, res) => {
    try {
        const { dni_alum, id_materia } = req.params;

        const matricula = await matriculaModel.obtenerUnaMatricula(dni_alum, id_materia);

        if (matricula) {
            res.json({ matricula });
        } else {
            res.status(404).json({ mensaje: "Matrícula no encontrada." });
        }
    } catch (error) {
        console.error("Error al obtener matrícula:", error);
        res.status(500).json({ error: "Error al obtener la matrícula." });
    }
};

// Crear una nueva matrícula
export const crearMatricula = async (req, res) => {
    try {
        const body = req.body;

        // Validar los datos con el esquema de matrícula
        const resultadoValidacion = validarMatricula(body);
        if (!resultadoValidacion.success) {
            return res.status(400).json({
                mensaje: "Error en los datos enviados.",
                errores: resultadoValidacion.error.format(),
            });
        }

        // Crear la matrícula con datos validados
        const nuevaMatricula = await matriculaModel.crearMatricula(resultadoValidacion.data);
        res.status(201).json({ matricula: nuevaMatricula });
    } catch (error) {
        console.error("Error al crear la matrícula:", error);
        res.status(500).json({ error: "Error al crear la matrícula." });
    }
};

// Actualizar una matrícula
export const actualizarMatricula = async (req, res) => {
    try {
        const { dni_alum, id_materia } = req.params;
        const { estado, ciclo_electivo } = req.body;

        // Verificar si la matrícula existe
        const matricula = await matriculaModel.obtenerUnaMatricula(dni_alum, id_materia);
        if (!matricula) {
            return res.status(404).json({ mensaje: "Matrícula no encontrada." });
        }

        // Actualizar la matrícula con los nuevos datos
        const matriculaActualizada = await matriculaModel.actualizarMatricula(
            id_materia, estado, ciclo_electivo, dni_alum
        );

        res.json({ mensaje: "Matrícula actualizada.", matricula: matriculaActualizada });
    } catch (error) {
        console.error("Error al actualizar matrícula:", error);
        res.status(500).json({ error: "Error al actualizar la matrícula." });
    }
};

// Eliminar una matrícula
export const eliminarMatricula = async (req, res) => {
    try {
        const { dni_alum, id_materia } = req.params;

        // Verificar si la matrícula existe
        const matricula = await matriculaModel.obtenerUnaMatricula(dni_alum, id_materia);
        if (!matricula) {
            return res.status(404).json({ mensaje: "Matrícula no encontrada." });
        }

        // Eliminar la matrícula
        const eliminado = await matriculaModel.eliminarUnaMatricula(id_materia, dni_alum);
        if (eliminado) {
            res.json({ mensaje: "Matrícula eliminada correctamente." });
        } else {
            res.status(500).json({ error: "Error al eliminar la matrícula." });
        }
    } catch (error) {
        console.error("Error al eliminar matrícula:", error);
        res.status(500).json({ error: "Error al eliminar la matrícula." });
    }
};

///// MENSAJES
// Mostrar todos los mensajes
export const mostrarMensajes = async (req, res) => {
    try {
        const mensajes = await mensajeModel.mostrarMensajes();
        res.json(mensajes); // Devuelve todos los mensajes en formato JSON
    } catch (error) {
        console.error("Error al mostrar mensajes:", error);
        res.status(500).json({ error: "Error al obtener los mensajes." });
    }
};

// Obtener un mensaje específico
export const obtenerMensaje = async (req, res) => {
    try {
        const { id_admin, dni_alum, id_mat } = req.params;

        // Llama al modelo para obtener un mensaje específico
        const mensaje = await mensajeModel.obtenerUnMensaje(id_admin, dni_alum, id_mat);

        if (mensaje) {
            res.json(mensaje); // Devuelve el mensaje encontrado
        } else {
            res.status(404).json({ mensaje: "Mensaje no encontrado." });
        }
    } catch (error) {
        console.error("Error al obtener el mensaje:", error);
        res.status(500).json({ error: "Error al obtener el mensaje." });
    }
};

// Crear un nuevo mensaje
export const crearMensaje = async (req, res) => {
    try {
        const mensaje = req.body;

        // Validar los datos del mensaje usando el esquema
        const validacion = validarMensaje(mensaje);

        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos del mensaje inválidos.",
                detalles: validacion.error.errors, // Devuelve los errores de validación
            });
        }

        // Crear el mensaje en la base de datos
        const nuevoMensaje = await mensajeModel.crearMensaje(validacion.data);

        if (nuevoMensaje) {
            res.status(201).json({
                mensaje: "Mensaje creado exitosamente.",
                datos: nuevoMensaje, // Devuelve el mensaje creado
            });
        } else {
            res.status(500).json({ error: "Error al crear el mensaje." });
        }
    } catch (error) {
        console.error("Error al crear el mensaje:", error);
        res.status(500).json({ error: "Error al crear el mensaje." });
    }
};

