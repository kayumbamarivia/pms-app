import { Request, Response } from 'express';
import { NotificationService } from '../services/NotificationService.ts';

export class NotificationController {
  private readonly notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  async getAllNotifications(req: Request, res: Response): Promise<void> {
    try {
      const notifications = await this.notificationService.findAll();
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getNotificationById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const notification = await this.notificationService.findById(id);
      if (!notification) {
        res.status(404).json({ message: 'Notification not found' });
        return;
      }
      res.status(200).json(notification);
    } catch (error) {
      console.error('Error fetching notification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createNotification(req: Request, res: Response): Promise<void> {
    try {
      const notificationData = req.body;
      const newNotification = await this.notificationService.create(notificationData);
      res.status(201).json(newNotification);
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateNotification(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const notificationData = req.body;
      const updatedNotification = await this.notificationService.update(id, notificationData);
      if (!updatedNotification) {
        res.status(404).json({ message: 'Notification not found' });
        return;
      }
      res.status(200).json(updatedNotification);
    } catch (error) {
      console.error('Error updating notification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteNotification(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.notificationService.delete(id);
      if (!success) {
        res.status(404).json({ message: 'Notification not found' });
        return;
      }
      res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error('Error deleting notification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}