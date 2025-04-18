import express from 'express';
import { findUserAll, findUserbyId, updateUser, deleteUserbyId } from '../controllers/users.controller.js'

const router = express.Router();

router.get('/findUserAll', findUserAll);
router.get('/findUserbyId/:ID_Usuario', findUserbyId);
router.put('/updateUser/:ID_Usuario', updateUser);
router.delete('/deleteUserbyId/:ID_Usuario', deleteUserbyId);
//router.delete();

/**router.get('/', function(req, res) {
    res.json({msg: 'Hola Mundo desde express'})
})**/

export default router;