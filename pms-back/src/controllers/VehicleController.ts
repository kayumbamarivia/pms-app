import { Request, Response } from 'express';
import { VehicleService } from '../services/VehicleService.ts';

export class VehicleController {
  private readonly vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService();
  }

  async getAllVehicles(req: Request, res: Response): Promise<void> {
    try {
      const vehicles = await this.vehicleService.findAll();
      res.status(200).json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getVehicleById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const vehicle = await this.vehicleService.findById(id);
      if (!vehicle) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }
      res.status(200).json(vehicle);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createVehicle(req: Request, res: Response): Promise<void> {
    try {
      const vehicleData = req.body;
      const newVehicle = await this.vehicleService.create(vehicleData);
      res.status(201).json(newVehicle);
    } catch (error) {
      console.error('Error creating vehicle:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateVehicle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const vehicleData = req.body;
      const updatedVehicle = await this.vehicleService.update(id, vehicleData);
      if (!updatedVehicle) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }
      res.status(200).json(updatedVehicle);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteVehicle(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.vehicleService.delete(id);
      if (!success) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
