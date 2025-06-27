import mysql from 'mysql2/promise';

const config = {
    host: 'mysqlCENT',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'cent_44',
};


    // Crear conexión a la base de datos
    const conexion = await mysql.createConnection(config);

    const mostrarMensajes = async () => {
    const sql = 'SELECT * FROM mensaje;';
    const [rows] = await conexion.execute(sql); // Devuelve directamente las filas
    return rows;
};


const obtenerUnMensaje = async (id_admin, dni_alum, id_mat) => {
    const sql = 'SELECT * FROM mensaje WHERE id_admin = ? AND dni_alum = ? AND id_mat = ?;';
    const [resultado] = await conexion.execute(sql, [id_admin, dni_alum, id_mat]);
    return resultado.length > 0 ? resultado[0] : null; // Devuelve una fila o null si no existe// ternaria
};


const crearMensaje = async (mensaje) => {
    const { id_admin, dni_alum, id_mat, msj, fecha_msj } = mensaje;

    // Inserta los datos en la tabla mensaje
    const sqlInsert = `
        INSERT INTO mensaje (id_admin, dni_alum, id_mat, msj, fecha_msj) 
        VALUES (?, ?, ?, ?, ?);`;
    const valuesInsert = [id_admin, dni_alum, id_mat, msj, fecha_msj || null]; // Envía 'null' si no se especifica fecha

    await conexion.execute(sqlInsert, valuesInsert);

    // Consulta para verificar el registro insertado
    const sqlSelect = `
        SELECT * 
        FROM mensaje 
        WHERE id_admin = ? AND dni_alum = ? AND id_mat = ?;
    `;
    const [mensajeNuevo] = await conexion.execute(sqlSelect, [id_admin, dni_alum, id_mat]);

    // Retorna el mensaje insertado o null si no existe
    return mensajeNuevo.length > 0 ? mensajeNuevo[0] : null;
};


    // Modelo de administrativo
    const mensajeModel = {
    mostrarMensajes,
    obtenerUnMensaje,
    crearMensaje,
};

export default mensajeModel;
