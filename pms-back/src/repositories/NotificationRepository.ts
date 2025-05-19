import { AppDataSource } from '../data_source.ts';
import { Notification } from '../models/Notification.ts';

export const NotificationRepository = AppDataSource.getRepository(Notification);
