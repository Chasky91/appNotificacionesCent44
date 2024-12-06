import z from 'zod';

const schemaMensaje = z.object({
    id_admin: z.number().int().positive(),  // El ID del administrador debe ser un número entero positivo
    dni_alum: z.number().int().positive(),  // El DNI del alumno debe ser un número entero positivo
    id_mat: z.number().int().positive(),  // El ID de la materia debe ser un número entero positivo
    fecha_msj: z.string().optional(),  // La fecha es opcional, si no se proporciona se usa el timestamp actual
    msj: z.string().max(200),  // El mensaje debe ser una cadena con un máximo de 200 caracteres
});

export function validarMensaje(mensaje) {
    return schemaMensaje.safeParse(mensaje);  // Devuelve el resultado de la validación
}
