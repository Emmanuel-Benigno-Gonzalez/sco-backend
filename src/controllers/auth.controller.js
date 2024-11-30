import {pool} from "../database.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config.js";

/**Register User**/
export const signUpHandler = async (req, res) => {
    try {
        const {id_usuario, nombre, apPaterno, apMaterno, password, tipo_usuario} = req.body;

        const query = `INSERT INTO Usuario (id_usuario, nombre, apPaterno, apMaterno, password, tipo_usuario) 
        VALUES (?,?,?,?,?,?)`;

        //const secret = speakeasy.generateSecret({length: 20}).base32;
        const hashedPassword = await bcrypt.hash(password, 12);

        const [result] = await pool.query(query,
            [id_usuario, nombre, apPaterno, apMaterno, hashedPassword, tipo_usuario]);
        if (result.affectedRows === 0) res.status(500).json({message: "Error en el registro"});

        return res.status(200).json({message: "Registro Exitoso"});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

/**Login User**/
export const signInHandler = async (req, res) => {
    try {
        const {id_usuario, password} = req.body;
        const query = 'SELECT * FROM Usuario WHERE id_usuario = ?';

        const [result] = await pool.query(query, [id_usuario]);
        const user = result[0];
        //console.log(user);
        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(401).json({
                token: null,
                message: "Contraseña Invalida"
            });

        const token = jwt.sign({user_id: user.id_usuario, user_type: user.tipo_usuario}, JWT_SECRET);

        res.json({
            token,
            user
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};