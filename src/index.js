import express from "express"
import {SERVER_PORT} from "./config.js"
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js'
import cors from 'cors';
import { corsConfig } from './config/cors.js';

// Crear la App
const app = express();
const port = parseInt(SERVER_PORT);

app.use(cors(corsConfig));
//Routing
app.use(express.json());
app.use('/api/auth', authRoutes );
app.use('/api', usersRoutes );

app.listen(port);

console.log(`El Servidor esta funcionando por el puerto ${port}`)