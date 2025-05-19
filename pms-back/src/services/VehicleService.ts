import { VehicleRepository } from '../repositories/VehicleRepository.ts';
import { Vehicle } from '../models/Vehicle.ts';

export class VehicleService {
  async findAll(): Promise<Vehicle[]> {
    return VehicleRepository.find();
  }

  async findById(id: number): Promise<Vehicle | null> {
    return VehicleRepository.findOneBy({ id });
  }

  async create(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = VehicleRepository.create(vehicleData);
    return VehicleRepository.save(vehicle);
  }

  async update(id: number, vehicleData: Partial<Vehicle>): Promise<Vehicle | null> {
    await VehicleRepository.update(id, vehicleData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await VehicleRepository.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }
} 