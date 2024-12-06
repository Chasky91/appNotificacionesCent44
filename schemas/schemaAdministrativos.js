import z from 'zod';

export const schemaAdministrativo = z.object({
    nombre: z.string().max(70),
    apellido: z.string().max(70),
    email: z.string().email(),
    password_hash: z.string(),
    });
    

export function validarAdmin(administrativo) {
    return schemaAdministrativo.safeParse(administrativo);  // Devuelve el resultado de la validación
}
