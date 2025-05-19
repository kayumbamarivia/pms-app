import { AppDataSource } from '../data_source.ts';
import { Vehicle } from '../models/Vehicle.ts';

export const VehicleRepository = AppDataSource.getRepository(Vehicle);
