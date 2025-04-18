/**Verificar la identidad del usuario**/
/**import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config.js";

export const verifyToken = async (req, res, next) => {
    let {token} = req.headers;
    if (!token) return res.status(403).json({message: "No se proporciona ningún token"});

    try {
        console.log("Token del usuario: " + token)
        const decode = jwt.verify(token, JWT_SECRET);
        req.user_id = decode.user_id;
        req.user_type = decode.user_type;
        console.log("Decodificación de user_id: " + req.user_id);
        next();
    } catch (error) {
        return res.status(401).json({message: "No Autorizado!"});
    }
};**/

export const isAdmin = async (req, res, next) => {
    try {
        if (req.user_type !== 1)
            return res.status(403).json({ message: "Requiere rol Administrador!" });
        next();
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const isHead = async (req, res, next) => {
    try {
        if (req.user_type !== 2)
            return res.status(403).json({ message: "Requiere Rol de Jefe de Turno!" });
        next();
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const isGuest = async (req, res, next) => {
    try {
        if (req.user_type !== 3)
            return res.status(403).json({ message: "Requiere rol de Invitado!" });
        next();
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};