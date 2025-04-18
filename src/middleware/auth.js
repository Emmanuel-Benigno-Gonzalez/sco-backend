import {JWT_SECRET} from "../config.js";
import jwt from "jsonwebtoken";
import {pool} from "../database.js";

export const authenticate = async (req, res, next) => {

    const bearer = req.headers.authorization

    if (!bearer) {
        return res.status(401).json({ message: "No Autorizado!" })
    }

    const [ , token ] = bearer.split(' ')
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        
        if (typeof decoded === 'object' && decoded.id){
            const query = 'SELECT * FROM Usuario WHERE ID_Usuario = ?';
            const [result] = await pool.query(query, decoded.id);
            req.user_id = result[0].ID_Usuario;
            req.user_type = result[0].Tipo_Usuario;
        }else{
            res.status(500).json({ message: 'Token No Valido' })
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Token No Valido' })
    }

    next()
} 