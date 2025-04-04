# Backend del Proyecto de Cobranza

Este backend maneja la gestión de clientes y usuarios en un sistema de cobranza. Se utiliza **XAMPP** para gestionar la base de datos con **MySQL**, por lo que el propietario del proyecto debe inicializar la base de datos antes de ejecutar la aplicación. A continuación, se detallan los pasos para configurar el entorno y la estructura del backend.

---

## 📌 1. Configuración de la Base de Datos y Creación

La base de datos utilizada se llama **`cobranza`**. Para crearla, sigue estos pasos:

1. **Iniciar XAMPP**  
   - Asegúrate de que Apache y MySQL estén en ejecución en el panel de control de XAMPP.

2. **Abrir phpMyAdmin**  
   - Ingresa a [http://localhost/phpmyadmin](http://localhost/phpmyadmin) en tu navegador.

3. **Crear la base de datos**  
   - Ejecuta la siguiente consulta SQL en phpMyAdmin:

   ```sql
   CREATE DATABASE cobranza;
   ```

4. **Seleccionar la base de datos**  
   ```sql
   USE cobranza;
   ```

---

## 📌 2. Creación de Tablas

A continuación, se presentan las tablas necesarias con sus respectivos campos.

### 📌 Tabla `usuarios`
```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'usuario') DEFAULT 'usuario'
);
```

### 📌 Tabla `clientes`
```sql
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100) UNIQUE,
    direccion TEXT
);
```

---

## 📌 3. Endpoints del Backend

El backend expone los siguientes endpoints para interactuar con las tablas:

| Método  | Endpoint          | Descripción                        |
|---------|------------------|------------------------------------|
| `POST`  | `/usuarios`       | Crear un nuevo usuario           |
| `GET`   | `/usuarios`       | Obtener todos los usuarios       |
| `GET`   | `/usuarios/:id`   | Obtener un usuario por ID        |
| `PUT`   | `/usuarios/:id`   | Actualizar usuario               |
| `DELETE`| `/usuarios/:id`   | Eliminar usuario                 |
| `POST`  | `/clientes`       | Crear un nuevo cliente           |
| `GET`   | `/clientes`       | Obtener todos los clientes       |
| `GET`   | `/clientes/:id`   | Obtener un cliente por ID        |
| `PUT`   | `/clientes/:id`   | Actualizar cliente               |
| `DELETE`| `/clientes/:id`   | Eliminar cliente                 |

---

## 📌 4. Controladores

### 📌 Controlador de Usuarios (`controllers/usuarioController.js`)
```javascript
const db = require('../config/database');

exports.getUsuarios = (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getUsuarioById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(results[0]);
    });
};

exports.createUsuario = (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    db.query('INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)', 
    [nombre, correo, contraseña, rol], 
    (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    });
};

exports.updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, correo, rol } = req.body;
    db.query('UPDATE usuarios SET nombre = ?, correo = ?, rol = ? WHERE id = ?', 
    [nombre, correo, rol, id], 
    (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario actualizado exitosamente' });
    });
};

exports.deleteUsuario = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
};
```

### 📌 Controlador de Clientes (`controllers/clienteController.js`)
```javascript
const db = require('../config/database');

exports.getClientes = (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getClienteById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.json(results[0]);
    });
};

exports.createCliente = (req, res) => {
    const { nombre, telefono, correo, direccion } = req.body;
    db.query('INSERT INTO clientes (nombre, telefono, correo, direccion) VALUES (?, ?, ?, ?)', 
    [nombre, telefono, correo, direccion], 
    (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Cliente creado exitosamente' });
    });
};

exports.updateCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, correo, direccion } = req.body;
    db.query('UPDATE clientes SET nombre = ?, telefono = ?, correo = ?, direccion = ? WHERE id = ?', 
    [nombre, telefono, correo, direccion, id], 
    (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente actualizado exitosamente' });
    });
};

exports.deleteCliente = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente eliminado exitosamente' });
    });
};
```

---

## 📌 5. Rutas de Usuarios y Clientes

### 📌 Rutas de Usuarios (`routes/usuarios.js`)
```javascript
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
```

### 📌 Rutas de Clientes (`routes/clientes.js`)
```javascript
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.getClientes);
router.get('/:id', clienteController.getClienteById);
router.post('/', clienteController.createCliente);
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
```

---

## 📌 6. Librerías Utilizadas

```json
"dependencies": {
  "express": "^4.17.3",
  "mysql2": "^2.3.3",
  "dotenv": "^16.0.0",
  "cors": "^2.8.5"
}
```

---

### Hecho por **César David Sánchez Trejo**