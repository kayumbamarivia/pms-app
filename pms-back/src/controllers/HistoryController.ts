import { Request, Response } from 'express';
import { HistoryService } from '../services/HistoryService.ts';

export class HistoryController {
  private readonly historyService: HistoryService;

  constructor() {
    this.historyService = new HistoryService();
  }

  async getAllHistories(req: Request, res: Response): Promise<void> {
    try {
      const histories = await this.historyService.findAll();
      res.status(200).json(histories);
    } catch (error) {
      console.error('Error fetching histories:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getHistoryById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const history = await this.historyService.findById(id);
      if (!history) {
        res.status(404).json({ message: 'History not found' });
        return;
      }
      res.status(200).json(history);
    } catch (error) {
      console.error('Error fetching history:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createHistory(req: Request, res: Response): Promise<void> {
    try {
      const historyData = req.body;
      const newHistory = await this.historyService.create(historyData);
      res.status(201).json(newHistory);
    } catch (error) {
      console.error('Error creating history:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateHistory(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const historyData = req.body;
      const updatedHistory = await this.historyService.update(id, historyData);
      if (!updatedHistory) {
        res.status(404).json({ message: 'History not found' });
        return;
      }
      res.status(200).json(updatedHistory);
    } catch (error) {
      console.error('Error updating history:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteHistory(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.historyService.delete(id);
      if (!success) {
        res.status(404).json({ message: 'History not found' });
        return;
      }
      res.status(200).json({ message: 'History deleted successfully' });
    } catch (error) {
      console.error('Error deleting history:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
