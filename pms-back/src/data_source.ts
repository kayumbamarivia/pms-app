import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User.ts";
import { HistorySubscriber } from "./utils/HistorySubscriber.ts";
import { History } from "./models/History.ts";
import { Vehicle } from "./models/Vehicle.ts";
import { Slot } from "./models/Slot.ts";
import { Booking } from "./models/Booking.ts";
import { Notification } from "./models/Notification.ts";
import { Payment } from "./models/Payment.ts"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "kayumba@",
  database: "pms",
  synchronize: true, 
  logging: [],
  entities: [User, History, Slot, Vehicle, Booking, Notification, Payment],
  migrations: ["query"],
  subscribers: [HistorySubscriber],
});