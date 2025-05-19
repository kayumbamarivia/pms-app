import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../models/User.ts";

export enum NotificationType {
  BOOKING_CONFIRMED,
  BOOKING_CANCELLED,
  SLOT_AVAILABLE,
  PAYMENT_DUE,
  REMINDER,
}

export enum NotificationChannel {
  EMAIL,
  PUSH,
  SMS,
  IN_APP,
}

export enum NotificationStatus {
  PENDING,
  SENT,
  DELIVERED,
  READ,
  FAILED,
}

@Entity({ name: "notifications" })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.notifications)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "type", type: "enum", enum: NotificationType })
  type: NotificationType;

  @Column({ name: "channel", type: "enum", enum: NotificationChannel })
  channel: NotificationChannel;

  @Column({ name: "status", type: "enum", enum: NotificationStatus, default: NotificationStatus.PENDING })
  status: NotificationStatus;

  @Column({ name: "subject", type: "varchar", length: 255 })
  subject: string;

  @Column({ name: "message", type: "text" })
  message: string;

  @Column({ name: "reference_id", type: "int", nullable: true })
  referenceId: number;

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}