import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Booking } from "./Booking.ts";

export enum PaymentStatus {
  PENDING,
  COMPLETED,
  FAILED,
  REFUNDED
}

@Entity({ name: "payments" })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Booking, booking => booking.payments)
  @JoinColumn({ name: "booking_id" })
  booking: Booking;

  @Column({ name: "amount", type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ name: "status", type: "enum", enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({ name: "receipt_number", type: "varchar", length: 255, unique: true })
  receiptNumber: string;

  @Column({ name: "payment_method", type: "varchar", length: 100 })
  paymentMethod: string;

  @Column({ name: "transaction_id", type: "varchar", length: 255, nullable: true })
  transactionId: string;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
} 