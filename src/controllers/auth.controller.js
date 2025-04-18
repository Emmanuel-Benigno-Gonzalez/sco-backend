import {pool} from "../database.js";
import { checkPassword, hashPassword } from "../utils/auth.js";
import { generateJWT } from "../utils/jwt.js";

/**Register User**/
export const signUpHandler = async (req, res) => {
    try {
        const {ID_Usuario, Nombre, ApPaterno, ApMaterno, Password, Tipo_Usuario} = req.body;

        const query = `INSERT INTO Usuario (ID_Usuario, Nombre, ApPaterno, ApMaterno, Password, Tipo_Usuario) 
        VALUES (?,?,?,?,?,?)`;

        //Hash Password
        //const secret = speakeasy.generateSecret({length: 20}).base32;
        const hashedPassword = await hashPassword(Password)

        const [result] = await pool.query(query,
            [ID_Usuario, Nombre, ApPaterno, ApMaterno, hashedPassword, Tipo_Usuario]);
        if (result.affectedRows === 0) res.status(500).json({message: "Error en el registro"});

        return res.status(200).json({message: "Registro Exitoso"});
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

/**Login User**/
export const signInHandler = async (req, res) => {
    try {
        const {ID_Usuario, Password} = req.body;
        const query = 'SELECT * FROM Usuario WHERE ID_Usuario = ?';

        const [result] = await pool.query(query, [ID_Usuario]);
        const user = result[0];
        //console.log(user);
        // Revisar Password
        const match = await checkPassword(Password, user.Password)

        if (!match)
            return res.status(401).json({
                token: null,
                message: "Contraseña Invalida"
            });

        
        const token = generateJWT({ id:user.ID_Usuario, user_type: user.Tipo_Usuario })
        //const token = jwt.sign({user_id: user.ID_Usuario, user_type: user.Tipo_Usuario}, JWT_SECRET);

        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};