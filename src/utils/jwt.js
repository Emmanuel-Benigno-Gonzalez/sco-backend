import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config.js";

export const generateJWT = (payload) => {
    
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1d'
    })

    return token
}