import mysql from 'mysql2/promise';

const config = {
    host: 'mysqlCENT',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'cent_44',
};

const conexion = await mysql.createConnection(config);

const mostrarProfesores = async () => {
    const resultado = await conexion.query( "SELECT * FROM profesor;" )

    return resultado[0]
};

const buscarUnProfesor = async (id) => {
    const resultado = await conexion.query(
        'SELECT * FROM profesor WHERE id = ?', [id] )
    return resultado[0]
};

const crearProfesor = async (profesor) => {
    const resultado = await conexion.query(
        "INSERT INTO profesor (nombre, apellido) VALUES (?, ?);",
        [profesor.nombre, profesor.apellido]
    )
    const profesorNuevo = await conexion.query(
        "SELECT * FROM profesor WHERE id = ?",[profesor.id]
    )
    return profesorNuevo[0]
};


const actualizarProfesor = async (id, nombre, apellido) => {
    const sql = "UPDATE profesor SET nombre = ?, apellido = ? WHERE id = ?";
    const values = [nombre, apellido, id]; // Incluye el id en los valores para el WHERE
    
    await conexion.execute(sql, values);
    
    const select = "SELECT * FROM profesor WHERE id = ?";
    const [resultado] = await conexion.execute(select, [id]);
    
    return resultado;
};


const eliminarProfesor = async (id) => {
    const sql = 'DELETE FROM profesor WHERE id = ?;';
    const values = [id];
    const [resultado] = await conexion.execute(sql, values);
    return resultado;
};

const profesorModel = { mostrarProfesores,buscarUnProfesor,crearProfesor,actualizarProfesor,eliminarProfesor,};

export default profesorModel;