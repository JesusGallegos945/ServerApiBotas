const mysql = require('mysql2/promise');
const config = require('../config');

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
};

let conexion;

async function conMysql() {
  try {
    conexion = await mysql.createConnection(dbconfig);
    console.log('✅ BD conectada (Tabla Usuarios)');
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
    setTimeout(conMysql, 2000);
  }
}
conMysql();

async function todos(tabla) {
  const [result] = await conexion.query(`SELECT * FROM ${tabla}`);
  return result;
}

async function uno(tabla, id) {
  const [result] = await conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);
  return result[0];
}

async function unoByEmail(tabla, correo_electronico) {
  const [result] = await conexion.query(`SELECT * FROM ${tabla} WHERE correo_electronico = ?`, [correo_electronico]);
  return result[0];
}

async function insertar(tabla, data) {
  const [result] = await conexion.query(`INSERT INTO ${tabla} SET ?`, [data]);
  return result;
}

async function actualizar(tabla, data) {
  const { id, ...datosActualizados } = data;
  const [result] = await conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [datosActualizados, id]);
  if (result.affectedRows === 0) {
    throw new Error(`No se encontró registro con el id ${id} para actualizar`);
  }
  return result;
}

async function eliminar(tabla, id) {
  const [result] = await conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
  if (result.affectedRows === 0) {
    throw new Error(`No se encontró registro con el id ${id} para eliminar`);
  }
  return result;
}

module.exports = { todos, uno, unoByEmail, insertar, actualizar, eliminar };
