import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User.ts";
import { Vehicle } from "./Vehicle.ts";
import { Slot } from "./Slot.ts";
import { BookingStatus } from "../enums/BookingStatus.ts";
import { Payment } from "./Payment.ts";

@Entity({ name: "bookings" })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookings)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Vehicle, vehicle => vehicle.bookings)
  @JoinColumn({ name: "vehicle_id" })
  vehicle: Vehicle;

  @ManyToOne(() => Slot, slot => slot.bookings)
  @JoinColumn({ name: "slot_id" })
  slot: Slot;

  @Column({ name: "start_time", type: "datetime" })
  startTime: Date;

  @Column({ name: "end_time", type: "datetime" })
  endTime: Date;

  @Column({ name: "status", type: "enum", enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Column({ name: "total_cost", type: "decimal", precision: 10, scale: 2, nullable: true })
  totalCost: number;

  @OneToMany(() => Payment, payment => payment.booking)
  payments: Payment[];

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}