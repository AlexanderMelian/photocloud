import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import userRoutes from "./routes/userRoutes.js"
import photoRoutes from "./routes/photoRoutes.js"


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/static', express.static(join(__dirname, 'public', 'uploads')));

app.use("/api/user", userRoutes)
app.use("/api/photo", photoRoutes)


export default app;