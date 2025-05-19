import { Request, Response } from 'express';
import { EmailService } from '../services/EmailService.ts';

export class EmailController {
  private readonly emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async sendEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Valid email address is required' });
      return;
    }

    try {
      await this.emailService.sendNotification(email);
      res.status(201).json({ message: `Notification sent to ${email}` });
    } catch (error: any) {
      console.error(`Error in sendTransferNotification: ${error.message}`);
      res.status(500).json({ error: 'Failed to send notification' });
    }
  }
}