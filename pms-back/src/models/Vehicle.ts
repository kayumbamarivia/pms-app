import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn , OneToMany } from "typeorm";
import { User } from "./User.ts"; 
import { Booking } from "./Booking.ts"; 

@Entity({ name: "vehicles" })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", length: 255 })
  name: string;

  @ManyToOne(() => User, user => user.vehicles)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Booking, booking => booking.vehicle)
  bookings: Booking[];

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;
}