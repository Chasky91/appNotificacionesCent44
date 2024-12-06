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

    const mostrarMatriculas = async () => {
    const sql = 'SELECT * FROM matricula;';
    const [rows] = await conexion.execute(sql); // Devuelve directamente las filas
    return rows;
};


const obtenerUnaMatricula = async (dni_alum, id_materia) => {
    const sql = 'SELECT * FROM matricula WHERE dni_alum = ? AND id_materia = ?;';
    const [resultado] = await conexion.execute(sql, [dni_alum, id_materia]);
    return resultado.length > 0 ? resultado[0] : null; // Devuelve una fila o null si no existe// ternaria
};


const crearMatricula = async (matricula) => {
    const { id_materia, dni_alum, estado = 'activo', ciclo_electivo } = matricula;

    // Inserta los datos en la tabla matricula
    const sqlInsert = `
        INSERT INTO matricula (id_materia, dni_alum, estado, ciclo_electivo) 
        VALUES (?, ?, ?, ?);`;
    const valuesInsert = [id_materia, dni_alum, estado, ciclo_electivo];

    await conexion.execute(sqlInsert, valuesInsert);

    // Consulta para verificar el registro insertado
    const sqlSelect = `
        SELECT * 
        FROM matricula 
        WHERE id_materia = ? AND dni_alum = ?;
    `;
    const [matriculaNueva] = await conexion.execute(sqlSelect, [id_materia, dni_alum]);

    return matriculaNueva.length > 0 ? matriculaNueva[0] : null;
};


const actualizarMatricula = async (id_materia, estado, ciclo_electivo, dni_alum) => {
    const sql = `
        UPDATE matricula 
        SET estado = ?, ciclo_electivo = ?
        WHERE id_materia = ? AND dni_alum = ?`;

    const values = [estado, ciclo_electivo, id_materia, dni_alum];

    await conexion.execute(sql, values);

    const select = `
        SELECT * 
        FROM matricula 
        WHERE id_materia = ? AND dni_alum = ?`;

    const [resultado] = await conexion.execute(select, [id_materia, dni_alum]);

    return resultado.length > 0 ? resultado[0] : null;
};


const eliminarUnaMatricula = async (id_materia, dni_alum) => {
    const sql = 'DELETE FROM matricula WHERE id_materia = ? AND dni_alum = ?;';
    const values = [id_materia, dni_alum];

    const [resultado] = await conexion.execute(sql, values);

    return resultado.affectedRows > 0; // Retorna true si se eliminó al menos un registro.
};


    // Modelo de administrativo
    const matriculaModel = {
    mostrarMatriculas,
    obtenerUnaMatricula,
    crearMatricula,
    actualizarMatricula,
    eliminarUnaMatricula,
};

export default matriculaModel;
