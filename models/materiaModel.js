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

    const mostrarMaterias = async () => {
    const sql = 'SELECT * FROM materia;';
    const [rows] = await conexion.execute(sql); // Devuelve directamente las filas
    return rows;
};


const obtenerUnaMateria = async (id) => {
    const sql = 'SELECT * FROM materia WHERE id = ?;';
    const [resultado] = await conexion.execute(sql, [id]);
    return resultado.length > 0 ? resultado[0] : null; // Devuelve una fila o null si no existe
};


const crearMaterias = async (materia) => {
    const { nombre, id_profe, id_carre } = materia;

    // Inserta los datos en la tabla materia
    const sqlInsert = `
        INSERT INTO materia (nombre, id_profe, id_carre) 
        VALUES (?, ?, ?);`;
    const valuesInsert = [nombre, id_profe, id_carre];

    await conexion.execute(sqlInsert, valuesInsert);

    // Recupera el registro recién insertado usando LAST_INSERT_ID()
    const sqlSelect = `
        SELECT * 
        FROM materia 
        WHERE id = LAST_INSERT_ID();`;
    const [materiaNueva] = await conexion.execute(sqlSelect);

    return materiaNueva.length > 0 ? materiaNueva[0] : null;
};



const actualizarMaterias = async (id, nombre, id_profe, id_carre) => {
    const sql = `
        UPDATE materia 
        SET nombre = ?, id_profe = ?, id_carre = ?
        WHERE id = ?`;

    const values = [nombre, id_profe, id_carre, id];

    await conexion.execute(sql, values);

    const select = `
        SELECT * 
        FROM materia 
        WHERE id = ?`;

    const [resultado] = await conexion.execute(select, [id]);

    return resultado.length > 0 ? resultado[0] : null;
};


const eliminarMateria = async (id) => {
    const sql = 'DELETE FROM materia WHERE id = ?;';
    const values = [id];

    const [resultado] = await conexion.execute(sql, values);

    return resultado.affectedRows > 0; // Retorna true si se eliminó al menos un registro.
};


    // Modelo de administrativo
    const materiaModel = {
    mostrarMaterias,
    obtenerUnaMateria,
    crearMaterias,
    actualizarMaterias,
    eliminarMateria,
};

export default materiaModel;
