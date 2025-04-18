import {pool} from "../database.js";

/**Verificar si se puede registrar el usuario**/
export const verifySignUp = async (req, res, next) => {
    try {
        const {ID_Usuario} = req.body;
        const query = 'SELECT ID_Usuario FROM Usuario WHERE ID_Usuario = ?';
        const [result] = await pool.query(query, [ID_Usuario]);

        if (result.length > 0)
            return res.status(400).json({ message: "El usuario ya existe" });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**Verificar si el usuario puede iniciar sesión**/
export const verifySignIn = async (req, res, next) => {
    const {ID_Usuario} = req.body;
    const query = 'SELECT ID_Usuario FROM Usuario WHERE ID_Usuario = ?';
    try {
        const [result] = await pool.query(query, [ID_Usuario]);

        if (result.length === 0)
            return res.status(400).json({message: "El Usuario no existe"});
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};