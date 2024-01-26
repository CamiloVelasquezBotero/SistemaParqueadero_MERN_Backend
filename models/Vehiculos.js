import mongoose from 'mongoose';

const vehiculosSchema = mongoose.Schema({
    placa: {
        type: String,
        required: true
    },
    nombrePropietario: {
        type: String,
        required: true
    },
    tipoDeVehiculo: {
        type: String,
        required: true
    },
    horaEntrada: {
        type: Date,
        required: true,
    }
}, {
    timestamps: false
});

const Vehiculo = mongoose.model('Vehiculo', vehiculosSchema);

export default Vehiculo;