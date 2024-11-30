import {pool} from "../database.js";

/**Verificar si se puede registrar el usuario**/
export const verifySignUp = async (req, res, next) => {
    try {
        const {id_usuario} = req.body;
        const query = 'SELECT id_usuario FROM Usuario WHERE id_usuario = ?';
        const [result] = await pool.query(query, [id_usuario]);

        if (result.length > 0)
            return res.status(400).json({message: "El usuario ya existe"});

        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

/**Verificar si el usuario puede iniciar sesión**/
export const verifySignIn = async (req, res, next) => {
    const {id_usuario} = req.body;
    const query = 'SELECT id_usuario FROM Usuario WHERE id_usuario = ?';
    try {
        const [result] = await pool.query(query, [id_usuario]);

        if (result.length === 0)
            return res.status(400).json({message: "El Usuario no existe"});
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};