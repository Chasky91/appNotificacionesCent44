import z from 'zod';

const schemaProfesor = z.object({
    nombre: z.string().max(100),
    apellido: z.string().max(100), 
});

export function validarProfesor(profesor) {
    return schemaProfesor.safeParse(profesor);  // Retorna el resultado de la validación
}