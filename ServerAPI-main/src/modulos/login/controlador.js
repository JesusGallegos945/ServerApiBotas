const db = require('../../BD/mysql');
const Login = db.login;

// Crear un nuevo registro de login
exports.createLogin = async (req, res) => {
    try {
        const { name, age, tel, email, estado, area, pais } = req.body;
        
        const newLogin = await Login.create({
            name,
            age,
            tel,
            email,
            estado,
            area,
            pais
        });

        res.status(201).json({
            success: true,
            data: newLogin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear registro de login',
            error: error.message
        });
    }
};

// Obtener todos los registros de login
exports.getAllLogins = async (req, res) => {
    try {
        const logins = await Login.findAll();
        res.status(200).json({
            success: true,
            data: logins
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener registros de login',
            error: error.message
        });
    }
};

// Obtener un registro por ID
exports.getLoginById = async (req, res) => {
    try {
        const login = await Login.findByPk(req.params.id);
        
        if (!login) {
            return res.status(404).json({
                success: false,
                message: 'Registro de login no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: login
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener registro de login',
            error: error.message
        });
    }
};

// Actualizar un registro
exports.updateLogin = async (req, res) => {
    try {
        const { name, age, tel, email, estado, area, pais } = req.body;
        
        const updated = await Login.update({
            name,
            age,
            tel,
            email,
            estado,
            area,
            pais
        }, {
            where: { id: req.params.id }
        });

        if (updated[0] === 0) {
            return res.status(404).json({
                success: false,
                message: 'Registro de login no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Registro de login actualizado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar registro de login',
            error: error.message
        });
    }
};

// Eliminar un registro
exports.deleteLogin = async (req, res) => {
    try {
        const deleted = await Login.destroy({
            where: { id: req.params.id }
        });

        if (deleted === 0) {
            return res.status(404).json({
                success: false,
                message: 'Registro de login no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Registro de login eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar registro de login',
            error: error.message
        });
    }
};