import {Router} from 'express';
import { isAdmin, isHead, isGuest } from '../middleware/validateIdentity.js'
import {
    createOps,
    findOpsbyDate,
    deleteOpsbyId,
    updateOpsbyId
} from '../controllers/ops.controllers.js'
import { authenticate } from '../middleware/auth.js'

const router = Router();

router.post('/create', authenticate, isHead, createOps);
router.get('/findOpsbyDate', authenticate, findOpsbyDate);
router.delete('/deleteOpsbyId/:ID_Registro',authenticate, deleteOpsbyId);
router.put('/updateOpsbyId/:ID_Registro',authenticate, updateOpsbyId);

export default router;