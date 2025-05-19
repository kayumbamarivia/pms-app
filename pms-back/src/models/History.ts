import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Action } from "../enums/Action.ts";

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  entityType: string;

  @Column({ type: "varchar", length: 100 })
  entityId: string;

  @Column({ type: "enum", enum: Action})
  action: string;

  @Column({ type: "varchar", length: 255 })
  actorEmail: string; 

  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;
}