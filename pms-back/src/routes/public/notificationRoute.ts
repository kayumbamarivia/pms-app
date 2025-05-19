import { Router } from 'express';
import { NotificationController } from '../../controllers/NotificationController.ts';

const router = Router();
const notificationController = new NotificationController();

router.get('/notifications', notificationController.getAllNotifications.bind(notificationController));
router.get('/notifications/:id', notificationController.getNotificationById.bind(notificationController));
router.post('/notifications', notificationController.createNotification.bind(notificationController));
router.put('/notifications/:id', notificationController.updateNotification.bind(notificationController));
router.delete('/notifications/:id', notificationController.deleteNotification.bind(notificationController));

export const notificationRoutes = router;
