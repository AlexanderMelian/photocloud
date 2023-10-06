import { Router } from 'express';
import { singleStore } from '../Controllers/photoController.js';
import { multerConfig } from "../config/multer.js"
import multer from 'multer';
import { validateToken } from '../middleware/middleware.js';

const upload = multer(multerConfig)


const router = Router();
router.post("/", validateToken,upload.single('image'), singleStore);

export default router;