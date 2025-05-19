import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../services/PaymentService.ts";

export class PaymentController {
  static async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookingId, paymentMethod } = req.body;
      const payment = await PaymentService.createPayment(bookingId, paymentMethod);
      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  }

  static async completePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { paymentId, transactionId } = req.body;
      const payment = await PaymentService.completePayment(paymentId, transactionId);
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }

  static async getPaymentReceipt(req: Request, res: Response, next: NextFunction) {
    try {
      const { paymentId } = req.params;
      const payment = await PaymentService.getPaymentReceipt(Number(paymentId));
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
} 