const mysql = require('mysql2/promise');
const config = require('../config');

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
};

let conexion;

// Función para conectar a MySQL con `mysql2/promise`
async function conMysql() {
  try {
    conexion = await mysql.createConnection(dbconfig);
    console.log('✅ BD conectada (Tabla Clientes)');

    // Manejo de errores de conexión
    conexion.on('error', async (err) => {
      console.error('[BD ERROR]', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('⚠️ Conexión perdida. Reconectando...');
        await conMysql();
      } else {
        throw err;
      }
    });
  } catch (error) {
    console.error('[BD ERROR]', error);
    setTimeout(conMysql, 2000); // Reintento de conexión
  }
}

// Llamar a la conexión al inicio
conMysql();

// Función para obtener todos los registros de una tabla
async function todos(tabla) {
  const [result] = await conexion.query(`SELECT * FROM ${tabla}`);
  return result;
}

// Función para obtener un registro por ID
async function uno(tabla, id) {
  const [result] = await conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);
  return result[0]; // Retorna el primer registro encontrado
}

// Función para insertar un registro
async function insertar(tabla, data) {
  const [result] = await conexion.query(`INSERT INTO ${tabla} SET ?`, [data]);
  return result;
}

// Función para actualizar un registro
async function actualizar(tabla, data) {
  const { id, ...datosActualizados } = data;
  const [result] = await conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [datosActualizados, id]);
  if (result.affectedRows === 0) {
    throw new Error(`No se encontró registro con el id ${id} para actualizar`);
  }
  return result;
}

// Función para agregar (insertar o actualizar)
async function agregar(tabla, data) {
  // Si data.id es 0, se inserta; de lo contrario, se actualiza
  return data && data.id == 0 ? insertar(tabla, data) : actualizar(tabla, data);
}

// Función para eliminar un registro
async function eliminar(tabla, id) {
  const [result] = await conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
  if (result.affectedRows === 0) {
    throw new Error(`No se encontró registro con el id ${id} para eliminar`);
  }
  return result;
}

module.exports = { uno, todos, insertar, actualizar, agregar, eliminar };
