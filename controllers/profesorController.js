import profesorModel from '../models/profesorModel.js'; 
import { validarProfesor } from '../schemas/schemaProfesor.js';

// Mostrar todos los profesores
export const mostrarProfesores = async (req, res) => {
    try {
        const profesores = await profesorModel.mostrarProfesores();
        res.json(profesores);
    } catch (error) {
        console.error("Error al mostrar los profesores:", error);
        res.status(500).json({ error: "Error al obtener los profesores." });
    }
};

// Buscar un profesor por ID
export const buscarUnProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const profesor = await profesorModel.buscarUnProfesor(id);

        if (profesor.length > 0) {
            res.json(profesor[0]);
        } else {
            res.status(404).json({ mensaje: "Profesor no encontrado." });
        }
    } catch (error) {
        console.error("Error al buscar el profesor:", error);
        res.status(500).json({ error: "Error al obtener el profesor." });
    }
};

// Crear un nuevo profesor
export const crearProfesor = async (req, res) => {
    try {
        const profesor = req.body;

        const validacion = validarProfesor(profesor);

        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos del profesor inválidos.",
                detalles: validacion.error.errors,
            });
        }

        const nuevoProfesor = await profesorModel.crearProfesor(validacion.data);

        res.status(201).json({
            mensaje: "Profesor creado exitosamente.",
            datos: nuevoProfesor[0],
        });
    } catch (error) {
        console.error("Error al crear el profesor:", error);
        res.status(500).json({ error: "Error al crear el profesor." });
    }
};

// Actualizar un profesor existente
export const actualizarProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido } = req.body;

        const validacion = validarProfesor({ nombre, apellido });

        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos del profesor inválidos.",
                detalles: validacion.error.errors,
            });
        }

        const profesorActualizado = await profesorModel.actualizarProfesor(
            id,
            validacion.data.nombre,
            validacion.data.apellido
        );

        if (profesorActualizado.length > 0) {
            res.json({
                mensaje: "Profesor actualizado exitosamente.",
                datos: profesorActualizado[0],
            });
        } else {
            res.status(404).json({ mensaje: "Profesor no encontrado." });
        }
    } catch (error) {
        console.error("Error al actualizar profesor:", error);
        res.status(500).json({ error: "Error al actualizar profesor." });
    }
};

// Eliminar un profesor por ID
export const eliminarProfesor = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await profesorModel.eliminarProfesor(id);

        if (resultado.affectedRows > 0) {
            res.json({ mensaje: "Profesor eliminado exitosamente." });
        } else {
            res.status(404).json({ mensaje: "Profesor no encontrado." });
        }
    } catch (error) {
        console.error("Error al eliminar profesor:", error);
        res.status(500).json({ error: "Error al eliminar profesor." });
    }
};
