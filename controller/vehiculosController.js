import Vehiculos from '../models/Vehiculos.js' // Se import el modelo

const registrarVehiculo = async (req, res) => {
    const { placa } = req.body;
 
    try {
        const existeVehiculo = await Vehiculos.findOne({placa});
        if(existeVehiculo) {
            return res.json({msg: 'Vehiculo ya registrado', error: true});
        }

        const vehiculo = new Vehiculos(req.body);
        const vehiculoGuardado = await vehiculo.save();
        res.json({ msg: 'Vehiculo Registrado!'});
    } catch (error) {
        console.log(error);
    }
}

const obtenerVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculos.find();
        if(vehiculos.length === 0){
            return res.json({msg: 'No hay vehiculos registrados!', error: true});
        }
    
        res.json(vehiculos)
    } catch (error) {
        console.log(error);
    }
}

const obtenerVehiculo = async (req, res) => {
    const { placa } = req.params;

    const vehiculo = await Vehiculos.findOne({placa})

    if(!vehiculo) {
        return res.json({msg: 'Vehiculo no encontrado'});
    }

    res.json(vehiculo);
}

const actualizarVehiculo = async (req, res) => {
    const {placa} = req.params;

    const vehiculo = await Vehiculos.findOne({placa});
    if(!vehiculo) {
        return res.json({msg: 'Vehiculo no encontrado', error: true});
    }

    if(vehiculo.placa !== req.body.placa) {
        const { placa } = req.body;
        const existePlaca =  await Vehiculos.findOne({placa})
        if(existePlaca) {
            return res.json({msg: 'Placa ya en uso', error: true});
        }
    }

    try {
        vehiculo.placa = req.body.placa
        vehiculo.nombrePropietario = req.body.nombrePropietario
        vehiculo.tipoDeVehiculo = req.body.tipoDeVehiculo

        const vehiculoActualizado = await vehiculo.save();
        res.json({
            msg: 'Acutalizado correctamente'
        });
    } catch (error) {
        console.log(error);
    }
}

const eliminarVehiculo = async (req, res) => {
    const { placa } = req.params;
    const vehiculo = await Vehiculos.findOne({placa});
    
    if(!vehiculo) {
        return res.json({msg: 'Vehiculo no encontrado', error: true})
    }

    try {
        await vehiculo.deleteOne();
        res.json({msg: 'Vehiculo Eliminado'})
    } catch (error) {
        console.log(error);   
    }
}

export {
    registrarVehiculo,
    obtenerVehiculos,
    obtenerVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
}

