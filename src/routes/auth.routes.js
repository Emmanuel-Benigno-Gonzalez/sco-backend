import {Router} from 'express'
import { signInHandler, signUpHandler } from '../controllers/auth.controller.js'
import { verifySignIn, verifySignUp } from '../middleware/validateAuth.js'

const router = Router();

router.post('/sign-up', verifySignUp, signUpHandler);
router.post('/sign-in', verifySignIn, signInHandler);


export default router;