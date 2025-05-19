import { Router } from 'express';
import { VehicleController } from '../../controllers/VehicleController.ts';

const router = Router();
const vehicleController = new VehicleController();

router.get('/vehicles', vehicleController.getAllVehicles.bind(vehicleController));
router.get('/vehicles/:id', vehicleController.getVehicleById.bind(vehicleController));
router.post('/vehicles', vehicleController.createVehicle.bind(vehicleController));
router.put('/vehicles/:id', vehicleController.updateVehicle.bind(vehicleController));
router.delete('/vehicles/:id', vehicleController.deleteVehicle.bind(vehicleController));

export const vehicleRoutes = router;
