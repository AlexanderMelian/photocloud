import { Router } from 'express';
import { createUser, login } from '../Controllers/userController.js';

const router = Router();
router.post("/",createUser);
router.post("/login", login);

export default router;