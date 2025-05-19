import { NotificationRepository } from '../repositories/NotificationRepository.ts';
import { Notification } from '../models/Notification.ts';

export class NotificationService {
  async findAll(): Promise<Notification[]> {
    return NotificationRepository.find();
  }

  async findById(id: number): Promise<Notification | null> {
    return NotificationRepository.findOneBy({ id });
  }

  async create(notificationData: Partial<Notification>): Promise<Notification> {
    const notification = NotificationRepository.create(notificationData);
    return NotificationRepository.save(notification);
  }

  async update(id: number, notificationData: Partial<Notification>): Promise<Notification | null> {
    await NotificationRepository.update(id, notificationData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await NotificationRepository.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }
} 