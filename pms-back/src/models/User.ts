import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Role } from "../enums/Role.ts";
import { Vehicle } from "./Vehicle.ts"; 
import { Booking } from "./Booking.ts"; 
import { Notification } from "./Notification.ts"; 

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "names", type: "varchar", length: 255 })
  names: string;

  @Column({ unique: true, type: "varchar", length: 255 })
  email: string;

  @Column({ select: false, type: "varchar", length: 255 })
  password: string;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: string;

  @OneToMany(() => Vehicle, vehicle => vehicle.user)
  vehicles: Vehicle[]; 

  @OneToMany(() => Booking, booking => booking.user) 
  bookings: Booking[];

   @OneToMany(() => Notification, not => not.user)
    notifications: Notification[];

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}