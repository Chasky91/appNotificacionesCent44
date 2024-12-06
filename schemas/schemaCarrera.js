import z from 'zod'

const schemaCarreras = z.object( 
    {
        nombre: z.string()
    } 
)
//exportamos una funcion que hara de validadora
export function  validarCarreras(carreras) {
    //se retorna el resultado de ejecutar la funcion safeParse con el parametro de carreras
    return schemaCarreras.safeParse(carreras);
}

