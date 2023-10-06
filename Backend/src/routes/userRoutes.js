import { Router } from 'express';
import { createUser, login, hello } from '../Controllers/userController.js';
import { validateToken } from '../middleware/middleware.js';


const router = Router();
router.post("/",createUser);
router.post("/login", login);
router.get('/test', validateToken, hello)

export default router;