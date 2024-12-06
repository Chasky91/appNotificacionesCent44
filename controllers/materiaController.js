import materiaModel from '../models/materiaModel.js'
import { validarMateria } from '../schemas/schemaMaterias.js'

// Mostrar todas las materias
export const mostrarMaterias = async (req, res) => {
    try {
        const resultado = await materiaModel.mostrarMaterias(); // Llamamos al modelo para obtener todas las materias
        return res.json({ materias: resultado }); // Respondemos con todas las materias en formato JSON
    } catch (error) {
        console.error("Error al mostrar las materias:", error);
        return res.status(500).json({ error: "No se pudieron obtener las materias." });
    }
};


// Obtener una materia específica por ID
export const obtenerUnaMateria = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el id de los parámetros de la URL

        const materia = await materiaModel.obtenerUnaMateria(id);

        if (materia) {
            res.json(materia); // Devuelve la materia encontrada
        } else {
            res.status(404).json({ mensaje: "Materia no encontrada." });
        }
    } catch (error) {
        console.error("Error al obtener la materia:", error);
        res.status(500).json({ error: "Error al obtener la materia." });
    }
};

// Crear una nueva materia
export const crearMateria = async (req, res) => {
    try {
        const materia = req.body; // Obtiene el cuerpo de la solicitud

        // Validar los datos de la materia usando el esquema
        const validacion = validarMateria(materia);

        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos de la materia inválidos.",
                detalles: validacion.error.errors, // Devuelve los errores de validación
            });
        }

        // Crear la materia en la base de datos
        const nuevaMateria = await materiaModel.crearMaterias(validacion.data);

        if (nuevaMateria) {
            res.status(201).json({
                mensaje: "Materia creada exitosamente.",
                datos: nuevaMateria, // Devuelve la materia creada
            });
        } else {
            res.status(500).json({ error: "Error al crear la materia." });
        }
    } catch (error) {
        console.error("Error al crear la materia:", error);
        res.status(500).json({ error: "Error al crear la materia." });
    }
};

// Actualizar una materia
export const actualizarMateria = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el id de los parámetros de la URL
        const { nombre, id_profe, id_carre } = req.body; // Obtener los datos de la materia a actualizar

        // Validar los datos de la materia usando el esquema
        const validacion = validarMateria({ nombre, id_profe, id_carre });

        if (!validacion.success) {
            return res.status(400).json({
                error: "Datos de la materia inválidos.",
                detalles: validacion.error.errors, // Devuelve los errores de validación
            });
        }

        // Actualizar la materia en la base de datos
        const materiaActualizada = await materiaModel.actualizarMaterias(id, nombre, id_profe, id_carre);

        if (materiaActualizada) {
            res.status(200).json({
                mensaje: "Materia actualizada exitosamente.",
                datos: materiaActualizada, // Devuelve la materia actualizada
            });
        } else {
            res.status(404).json({ mensaje: "Materia no encontrada." });
        }
    } catch (error) {
        console.error("Error al actualizar la materia:", error);
        res.status(500).json({ error: "Error al actualizar la materia." });
    }
};

// Eliminar una materia
export const eliminarMateria = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el id de los parámetros de la URL

        // Eliminar la materia de la base de datos
        const eliminado = await materiaModel.eliminarMateria(id);

        if (eliminado) {
            res.status(200).json({ mensaje: "Materia eliminada exitosamente." });
        } else {
            res.status(404).json({ mensaje: "Materia no encontrada." });
        }
    } catch (error) {
        console.error("Error al eliminar la materia:", error);
        res.status(500).json({ error: "Error al eliminar la materia." });
    }
};
