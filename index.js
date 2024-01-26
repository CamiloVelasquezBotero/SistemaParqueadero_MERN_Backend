import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import VehiculosRoutes from './routes/VehiculosRoutes.js';

const app = express(); // Insancio express

dotenv.config(); // Habilito las configuraciones para variables de entorno

conectarDB();

app.use(express.json()); // Habilito recibir datos en .json

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}
app.use(cors(corsOptions));

app.use('/api/parqueadero', VehiculosRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando ene el puerto: ${PORT}`);
})
