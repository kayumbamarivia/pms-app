import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController.ts";
import { protect, restrictTo } from "../middlewares/auth.ts";
import { Role } from "../enums/Role.ts";

const router = Router();

router.post("/", protect, PaymentController.createPayment);
router.post("/complete", protect, PaymentController.completePayment);
router.get("/receipt/:paymentId", protect, PaymentController.getPaymentReceipt);

export default router; 