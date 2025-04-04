const db = require('../../BD/mysql');
const TABLA = 'clientes';

// Obtiene todos los clientes
async function todos() {
  const result = await db.todos(TABLA);
  console.log('Obteniendo todos los clientes:', result);
  return result;
}

// Obtiene un cliente específico por su id
async function uno(id) {
  const result = await db.uno(TABLA, id);
  console.log(`Obteniendo cliente con id ${id}:`, result);
  return result;
}

// Agrega un cliente nuevo (inserción)
// Se asume que para insertar se envía id = 0 o se omite el id
async function agregar(data) {
  const result = await db.insertar(TABLA, { ...data, id: 0 });
  console.log('Cliente insertado:', { ...data, id: result.insertId });
  return result;
}

// Actualiza un cliente existente
async function actualizar(data) {
  if (!data.id || data.id == 0) {
    throw new Error('El id es requerido para actualizar');
  }
  const result = await db.actualizar(TABLA, data);
  console.log(`Cliente actualizado con id ${data.id}:`, data);
  return result;
}

// Elimina un cliente por su id
async function eliminar(id) {
  const result = await db.eliminar(TABLA, id);
  console.log(`Cliente eliminado con id ${id}`);
  return result;
}

module.exports = {
  todos,
  uno,
  agregar,
  actualizar,
  eliminar
};
