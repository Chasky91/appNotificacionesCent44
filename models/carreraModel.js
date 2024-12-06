import { config } from "../config.db.js"
import mysql from "mysql2/promise"

// Create the connection to database
const conexion = await mysql.createConnection(config)

async function buscarTodos() {
    const resultado = await conexion.query(
        "SELECT  * FROM carrera;",
      )
      return resultado[0]
}
//console.log(await buscarTodos());

  const buscarUno = async(id) =>{
    const resultados = await conexion.query(
      'SELECT * FROM carrera WHERE id = ?;',[id]
    ) 
  return  resultados[0]
}
//console.log(await buscarUno(5));

// funcion crear
const  crear = async (carrera) => {
  // acá inserto
  const resultado = await conexion.query(
    'INSERT INTO carrera (nombre) VALUES (?)',
    [ carrera.nombre]
  )
  console.log(resultado[0].insertId)

  // aca selecciono
  const nuevo = await conexion.query(
    `SELECT * FROM carrera WHERE id = ?`, [resultado[0].insertId]
  )
   
  return  nuevo[0]
}
//console.log(await crear({"nombre": "TEcnicatura en agrimensura"}))


const actualizar  = async (carrera, id) => {

  // recupro las poriedades del objeto json --> alumno
  const nombre = carrera.nombre
  // sentencia sql
  const sql = 'UPDATE carrera SET nombre = ? WHERE id = ?';
  // Aca  estan las varibles a utilizar en la actualizacion
  const values = [nombre, id]
  //ejecuto la sentencia
  await conexion.execute(sql, values)
  const select = 'SELECT * FROM carrera WHERE id = ?' // sentencia sql pararecuperar registro actualizado
  const result = await conexion.execute(select, [id]) // ejecuto la sentencia
  return result[0]
}
/*let registroEJ = { 
  "nombre": "Tecnicatura en agricultura espacial", 
}
console.log(await actualizar(registroEJ , 6 ))*/

const eliminarUno  = async (id) => {

  const sql = 'DELETE FROM carrera WHERE id= ?;'
  const values = [id]

   const [result] = await conexion.execute(sql,values)
    console.log(result)
    if (result.affectedRows > 0) {
        return id
    } else {
        return -1
    }
}

//console.log(await eliminarUno(6))
const  carreraModel = {
    buscarTodos,
    buscarUno,
    crear,
    actualizar,
    eliminarUno
}
export default carreraModel