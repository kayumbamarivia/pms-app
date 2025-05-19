import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { SlotStatus } from "../enums/SlotStatus.ts"
import { Booking } from "./Booking.ts"

@Entity({ name: "slots" })
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "parking_name", type: "varchar", length: 255 })
  parkingName: string;

  @Column({ name: "parking_location", type: "varchar", length: 255 })
  parkingLocation: string;

  @Column({ name: "amount", type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ name: "status", type: "enum", enum: SlotStatus, default: SlotStatus.AVAILABLE })
  status: SlotStatus;

  @OneToMany(() => Booking, booking => booking.slot) 
  bookings: Booking[];

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}