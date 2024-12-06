import z from 'zod';

const schemaMateria = z.object({
    nombre: z.string().max(60),  // El nombre de la materia es una cadena de hasta 60 caracteres
    id_profe: z.number().int().positive(),  // El ID del profesor debe ser un número entero positivo
    id_carre: z.number().int().positive(),  // El ID de la carrera debe ser un número entero positivo
});

export function validarMateria(materia) {
    return schemaMateria.safeParse(materia);  // Retorna el resultado de la validación
}
