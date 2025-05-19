import { Request, Response } from 'express';
import { SlotService } from '../services/SlotService.ts';

export class SlotController {
  private readonly slotService: SlotService;

  constructor() {
    this.slotService = new SlotService();
  }

  async getAllSlots(req: Request, res: Response): Promise<void> {
    try {
      const slots = await this.slotService.findAll();
      res.status(200).json(slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getSlotById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const slot = await this.slotService.findById(id);
      if (!slot) {
        res.status(404).json({ message: 'Slot not found' });
        return;
      }
      res.status(200).json(slot);
    } catch (error) {
      console.error('Error fetching slot:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createSlot(req: Request, res: Response): Promise<void> {
    try {
      const slotData = req.body;
      const newSlot = await this.slotService.create(slotData);
      res.status(201).json(newSlot);
    } catch (error) {
      console.error('Error creating slot:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateSlot(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const slotData = req.body;
      const updatedSlot = await this.slotService.update(id, slotData);
      if (!updatedSlot) {
        res.status(404).json({ message: 'Slot not found' });
        return;
      }
      res.status(200).json(updatedSlot);
    } catch (error) {
      console.error('Error updating slot:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteSlot(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.slotService.delete(id);
      if (!success) {
        res.status(404).json({ message: 'Slot not found' });
        return;
      }
      res.status(200).json({ message: 'Slot deleted successfully' });
    } catch (error) {
      console.error('Error deleting slot:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 