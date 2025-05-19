import { Router } from 'express';
import { SlotController } from '../../controllers/SlotController.ts';

const router = Router();
const slotController = new SlotController();

router.get('/slots', slotController.getAllSlots.bind(slotController));
router.get('/slots/:id', slotController.getSlotById.bind(slotController));
router.post('/slots', slotController.createSlot.bind(slotController));
router.put('/slots/:id', slotController.updateSlot.bind(slotController));
router.delete('/slots/:id', slotController.deleteSlot.bind(slotController));

export const slotRoutes = router;
