import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from 'url';

import userRoutes from "./routes/userRoutes.js"
import photoRoutes from "./routes/photoRoutes.js"


console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
app.use('/api/static', express.static('/usr/src/app/tmp/uploads'));
app.use("/api/user", userRoutes)
app.use("/api/photo", photoRoutes)


export default app;