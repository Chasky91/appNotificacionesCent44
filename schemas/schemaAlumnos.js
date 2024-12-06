import z from 'zod'

let datosAlumno = {

    nombre: z.string(),
    apellido: z.string(),
    email: z.string().email(),
    id_curso :z.number().positive().min(1)
    
}
/**
 * {

    nombre: z.string(),
    apellido: z.string(),
    email: z.string().email(),
    id_curso :z.number().positive().min(1)
    
}
 */
//creacion de la estructura para validara
// se agrego la validacion para el dni
const schemaAlumnos = z.object( 
    {
        dni:z.number().positive(),
        nombre: z.string(),
        apellido: z.string(),
        email: z.string().email()/*,
        id_curso :z.number().positive().min(1)*/
        
    } 
)
//exportamos una funcion que hara de validadora
export function  validarAlunno(alumno) {
    //se retorna el resultado de ejecutar la funcion safeParse con el parametro de alumno
    return schemaAlumnos.safeParse(alumno);
}

