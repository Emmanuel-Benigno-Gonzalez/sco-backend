import {pool} from "../database.js";

export const findUserAll = async (req, res) => {

    try {

        const query = 'SELECT * FROM Usuario';
        const [users] = await pool.query(query);
        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({ message: error });
    }

};


export const findUserbyId = async (req, res) => {

    try {

        const {ID_Usuario} = req.params

        if (!/^\d+$/.test(ID_Usuario)) {
            return res.status(400).json({ message: "ID de usuario inválido" });
        }

        const query = 'SELECT ID_Usuario, Nombre, ApPaterno, ApMaterno, Tipo_Usuario FROM Usuario WHERE ID_Usuario = ?';
        const [users] = await pool.query(query, [ID_Usuario]);

        if (users.length === 0){
            return res.status(404).json({
                message: "Usuario no Encontrado"
            });
        }

        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({ message: error });
    }

};

export const updateUser = async (req, res) => {

    try {

        const {ID_Usuario} = req.params
        const { Nombre, ApPaterno, ApMaterno, Tipo_Usuario } = req.body;

        if (!/^\d+$/.test(ID_Usuario)) {
            return res.status(400).json({ message: "ID de usuario inválido" });
        }

        const query = 'UPDATE Usuario SET Nombre = ?, ApPaterno = ?, ApMaterno = ?, Tipo_Usuario = ? WHERE ID_Usuario = ?';
        const [result] = await pool.query(query, [Nombre, ApPaterno, ApMaterno, Tipo_Usuario, ID_Usuario]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json({ message: "Usuario Actualizado Correctamente" });

    } catch (error) {

        return res.status(500).json({ message: error });
        
    }

};

export const deleteUserbyId = async (req, res) => {

    try {

        const {ID_Usuario} = req.params

        if (!/^\d+$/.test(ID_Usuario)) {
            return res.status(400).json({ message: "ID de usuario inválido" });
        }

        const [users] = await pool.query('SELECT * FROM Usuario WHERE ID_Usuario = ?', [ID_Usuario]);

        if (users.length === 0) {
            return res.status(404).json({
                message: "Usuario no Encontrado"
            });
        }

        await pool.query('DELETE FROM Usuario WHERE ID_Usuario = ?', [ID_Usuario]);

        return res.status(200).json({ message: "Usuario Eliminado Correctamente" });

    } catch (error) {
        
        return res.status(500).json({ message: error });

    }

};