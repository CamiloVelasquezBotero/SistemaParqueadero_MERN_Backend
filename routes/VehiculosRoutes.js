import express from 'express';
const router = express.Router(); // Se instancia el router

// Controladores
import { 
    registrarVehiculo,
    obtenerVehiculos,
    obtenerVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
} from '../controller/vehiculosController.js'

router.route('/')
    .post(registrarVehiculo)
    .get(obtenerVehiculos);

router.route('/:placa')
    .get(obtenerVehiculo)
    .put(actualizarVehiculo)
    .delete(eliminarVehiculo);

export default router;