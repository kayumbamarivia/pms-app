import { Router } from 'express';
import { HistoryController } from '../../controllers/HistoryController.ts';

const router = Router();
const historyController = new HistoryController();

router.get('/histories', historyController.getAllHistories.bind(historyController));
router.get('/histories/:id', historyController.getHistoryById.bind(historyController));
router.post('/histories', historyController.createHistory.bind(historyController));
router.put('/histories/:id', historyController.updateHistory.bind(historyController));
router.delete('/histories/:id', historyController.deleteHistory.bind(historyController));

export const historyRoutes = router;
