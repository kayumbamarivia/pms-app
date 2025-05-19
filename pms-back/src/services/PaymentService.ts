import { PaymentRepository } from "../repositories/PaymentRepository.ts";
import { BookingRepository } from "../repositories/BookingRepository.ts";
import { Payment, PaymentStatus } from "../models/Payment.ts";
import { AppError } from "../middlewares/errorHandler.ts";
import { v4 as uuidv4 } from "uuid";

export class PaymentService {
  static async createPayment(bookingId: number, paymentMethod: string): Promise<Payment> {
    const booking = await BookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    const durationInHours = (booking.endTime.getTime() - booking.startTime.getTime()) / (1000 * 60 * 60);
    const amount = booking.totalCost || 0;

    const payment = PaymentRepository.create({
      booking,
      amount,
      status: PaymentStatus.PENDING,
      receiptNumber: `REC-${uuidv4().substring(0, 8)}`,
      paymentMethod,
    });

    return PaymentRepository.save(payment);
  }

  static async completePayment(paymentId: number, transactionId: string): Promise<Payment> {
    const payment = await PaymentRepository.findOne({ where: { id: paymentId } });
    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    payment.status = PaymentStatus.COMPLETED;
    payment.transactionId = transactionId;
    return PaymentRepository.save(payment);
  }

  static async getPaymentReceipt(paymentId: number): Promise<Payment> {
    const payment = await PaymentRepository.findOne({ where: { id: paymentId } });
    if (!payment) {
      throw new AppError("Payment not found", 404);
    }
    return payment;
  }
} 