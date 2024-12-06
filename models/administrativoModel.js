import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'cent_44',
};

// Crear conexión a la base de datos
const conexion = await mysql.createConnection(config);

const mostrarAdministrativos = async () => {
  const sql = 'SELECT * FROM administrativo;';
  const [rows] = await conexion.execute(sql); // Devuelve directamente las filas
  return rows;
};

const buscarUnAdmin = async (id) => {
  const sql = 'SELECT * FROM administrativo WHERE id = ?;';
  const [resultado] = await conexion.execute(sql, [id]); // Usa 'execute' para parámetros dinámicos
  return resultado;
};

const crearAdmin = async (administrativo) => {
  const sqlInsert = "INSERT INTO administrativo(nombre, apellido, email, password_hash) VALUES (?, ?, ?, ?);";
  const valuesInsert = [administrativo.nombre, administrativo.apellido, administrativo.email, administrativo.password_hash];
  await conexion.execute(sqlInsert, valuesInsert);

   // Consulta para obtener el último 'id' insertado usando LAST_INSERT_ID()
   const sqlSelect = "SELECT * FROM administrativo WHERE id = LAST_INSERT_ID();";
   const [adminNuevo] = await conexion.execute(sqlSelect);

  return adminNuevo;
};

const actualizarAdmin = async (nombre, apellido, email, password_hash, id) => {
  if (!nombre || !apellido || !email || !password_hash || !id) {
    throw new Error("Uno o más parámetros son inválidos o están vacíos.");
  }

  if (isNaN(id) || id <= 0) {
    throw new Error("El ID proporcionado no es válido.");
  }

  // Consulta para verificar si el ID existe
  const checkIdQuery = "SELECT * FROM administrativo WHERE id = ?";
  const [registro] = await conexion.execute(checkIdQuery, [id]);

  if (registro.length === 0) {
    throw new Error("El administrativo con el ID proporcionado no existe.");
  }

  // Consulta SQL para actualizar el admin
  const sql = "UPDATE administrativo SET nombre = ?, apellido = ?, email = ?, password_hash = ? WHERE id = ?";
  const values = [nombre, apellido, email, password_hash, id];

  // Ejecutar la actualización de los datos del admin
  await conexion.execute(sql, values);

  // Consulta para obtener el admin actualizado
  const select = "SELECT * FROM administrativo WHERE id = ?";
  const [resultado] = await conexion.execute(select, [id]);

  // Retorna el admin actualizado
  return resultado;
};


const eliminarUnAdmin = async (id) => {
  const sql = 'DELETE FROM administrativo WHERE id = ?;';
  const values = [id];
  const [resultado] = await conexion.execute(sql, values); // Si ocurre un error aquí, lanzará una excepción.
  return resultado;
};

// Modelo de administrativo
const administrativoModel = {
  mostrarAdministrativos,
  buscarUnAdmin,
  crearAdmin,
  actualizarAdmin,
  eliminarUnAdmin,
};

export default administrativoModel;
