import {pool} from "../database.js";

/*export const findMatricula = async (req, res) => {

    const {ID_Usuario, ID_Matricula, TipoMov } = req.body;

    try {
        res.status(200).send({message: "Matricula Encontrada"});
    } catch (error) {
        return res.status(500).send({message: error});
    }

};*/

/*export const createOps = async (req, res) => {

    const {ID_Usuario, ID_Matricula, Fecha_Ope, password, tipo_usuario} = req.body;

    try {
        res.status(200).send({message: "Registro Creado"});
    } catch (error) {
        return res.status(500).send({message: error});
    }

};*/

export const createOps = async (req, res) => {

    const {
        ID_Matricula,
        TipoMov,
        Fecha_Ope,
        ID_IATA_Aeropuerto,
        Hora_ITI,
        Hora_Real,
        Hora_Calzos,
        Fin_OPS,
        ID_Aerolinea,
        Vuelo,
        Pista,
        Posicion,
        Puerta,
        Banda,
        Adulto_Nac,
        Infante_Nac,
        Transito_Nac,
        Conexion_Nac,
        Excento_Nac,
        Adulto_Int,
        Infante_Int,
        Transito_Int,
        Conexion_Int,
        Excento_Int,
        Pza_Equipaje,
        Kgs_Equipaje,
        Kgs_Carga,
        Correo,
        Observaciones
    } = req.body;

    const ID_Usuario = req.user_id

    try {

        if (!ID_Usuario || !ID_Matricula || !Fecha_Ope || !ID_IATA_Aeropuerto || !TipoMov || !Hora_ITI || !Hora_Real || !ID_Aerolinea || !Vuelo || !Pista) {
            return res.status(400).json({ message: "Todos los campos obligatorios deben ser enviados." });
        }

        const sql = `
            INSERT INTO Registro 
            (ID_Usuario, ID_Matricula, TipoMov, Fecha_Ope, ID_IATA_Aeropuerto, Hora_ITI, Hora_Real, Hora_Calzos, Fin_OPS, 
            ID_Aerolinea, Vuelo, Pista, Posicion, Puerta, Banda, Adulto_Nac, Infante_Nac, Transito_Nac, Conexion_Nac, Excento_Nac, 
            Adulto_Int, Infante_Int, Transito_Int, Conexion_Int, Excento_Int, Pza_Equipaje, Kgs_Equipaje, Kgs_Carga, Correo, Observaciones) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        
        const [result] = await pool.execute(sql, [
            ID_Usuario, ID_Matricula, TipoMov, Fecha_Ope, ID_IATA_Aeropuerto,  
            Hora_ITI, Hora_Real, Hora_Calzos || null, Fin_OPS || null, ID_Aerolinea, Vuelo, Pista, 
            Posicion || null, Puerta || null, Banda || null, Adulto_Nac || null, Infante_Nac || null, 
            Transito_Nac || null, Conexion_Nac || null, Excento_Nac || null, Adulto_Int || null, 
            Infante_Int || null, Transito_Int || null, Conexion_Int || null, Excento_Int || null, 
            Pza_Equipaje || null, Kgs_Equipaje || null, Kgs_Carga || null, Correo || null, Observaciones || null
        ]);

        if (result.affectedRows === 0) {
            return res.status(500).json({ message: error });
        }

        return res.status(200).json({ message: "Registro creado exitosamente" });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const deleteOpsbyId = async (req, res) => {

    try {

        const {ID_Registro} = req.params

        if (!/^\d+$/.test(ID_Registro)) {
            return res.status(400).json({ message: "ID de registro inválido" });
        }

        const [users] = await pool.query('SELECT * FROM Registro WHERE ID_Registro = ?', [ID_Registro]);

        if (users.length === 0) {
            return res.status(404).json({
                message: "Registro no Encontrado"
            });
        }

        await pool.query('DELETE FROM Registro WHERE ID_Registro = ?', [ID_Registro]);

        return res.status(200).json({ message: "Registro Eliminado" });

    } catch (error) {

        return res.status(500).json({ message: error });

    }

};

export const updateOpsbyId = async (req, res) => {

    const {
        ID_Matricula,
        TipoMov,
        Fecha_Ope,
        ID_IATA_Aeropuerto,
        Hora_ITI,
        Hora_Real,
        Hora_Calzos,
        Fin_OPS,
        ID_Aerolinea,
        Vuelo,
        Pista,
        Posicion,
        Puerta,
        Banda,
        Adulto_Nac,
        Infante_Nac,
        Transito_Nac,
        Conexion_Nac,
        Excento_Nac,
        Adulto_Int,
        Infante_Int,
        Transito_Int,
        Conexion_Int,
        Excento_Int,
        Pza_Equipaje,
        Kgs_Equipaje,
        Kgs_Carga,
        Correo,
        Observaciones
    } = req.body;

    const { ID_Registro } = req.params;
    const ID_Usuario = req.user_id;

    try {

        if (!ID_Registro || !ID_Usuario || !ID_Matricula || !Fecha_Ope || !ID_IATA_Aeropuerto || !TipoMov || !Hora_ITI || !Hora_Real || !ID_Aerolinea || !Vuelo || !Pista) {
            return res.status(400).json({ message: "Todos los campos obligatorios deben ser enviados." });
        }

        const sql = `
            UPDATE Registro SET
                ID_Usuario = ?,
                ID_Matricula = ?,
                TipoMov = ?,
                Fecha_Ope = ?,
                ID_IATA_Aeropuerto = ?,
                Hora_ITI = ?,
                Hora_Real = ?,
                Hora_Calzos = ?,
                Fin_OPS = ?,
                ID_Aerolinea = ?,
                Vuelo = ?,
                Pista = ?,
                Posicion = ?,
                Puerta = ?,
                Banda = ?,
                Adulto_Nac = ?,
                Infante_Nac = ?,
                Transito_Nac = ?,
                Conexion_Nac = ?,
                Excento_Nac = ?,
                Adulto_Int = ?,
                Infante_Int = ?,
                Transito_Int = ?,
                Conexion_Int = ?,
                Excento_Int = ?,
                Pza_Equipaje = ?,
                Kgs_Equipaje = ?,
                Kgs_Carga = ?,
                Correo = ?,
                Observaciones = ?
            WHERE ID_Registro = ?
        `;

        const [result] = await pool.execute(sql, [
            ID_Usuario, ID_Matricula, TipoMov, Fecha_Ope, ID_IATA_Aeropuerto,
            Hora_ITI, Hora_Real, Hora_Calzos || null, Fin_OPS || null,
            ID_Aerolinea, Vuelo, Pista, Posicion || null, Puerta || null,
            Banda || null, Adulto_Nac || null, Infante_Nac || null,
            Transito_Nac || null, Conexion_Nac || null, Excento_Nac || null,
            Adulto_Int || null, Infante_Int || null, Transito_Int || null,
            Conexion_Int || null, Excento_Int || null, Pza_Equipaje || null,
            Kgs_Equipaje || null, Kgs_Carga || null, Correo || null,
            Observaciones || null,
            ID_Registro // ← Aquí se indica qué registro actualizar
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro no encontrado o sin cambios." });
        }

        return res.status(200).json({ message: "Registro actualizado exitosamente." });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};


export const findOpsbyDate = async (req, res) => {

    const { fechaInicio, fechaFin } = req.query;

    try {
        
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ message: "Debe enviar fechaInicio y fechaFin." });
        }

        const sql = `
            SELECT * 
            FROM Registro 
            WHERE Fecha_Ope BETWEEN ? AND ?
            ORDER BY Fecha_Ope ASC
        `;

        const [rows] = await pool.execute(sql, [fechaInicio, fechaFin]);

        return res.status(200).json(rows);

    } catch (error) {
        return res.status(500).json({ message: error });
    }

};