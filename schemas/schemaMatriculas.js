import z from 'zod';

const schemaMatricula = z.object({
    id_materia: z.number().int().positive(),  // El ID de la materia debe ser un número entero positivo
    dni_alum: z.number().int().positive(),  // El DNI del alumno debe ser un número entero positivo
    estado: z.enum(['activo', 'inactivo']),  // El estado debe ser 'activo' o 'inactivo'
    ciclo_electivo: z.number().int().positive(),  // El ciclo electivo debe ser un número entero positivo
});

export function validarMatricula(matricula) {
    return schemaMatricula.safeParse(matricula);  // Devuelve el resultado de la validación
}
