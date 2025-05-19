import { AppDataSource } from "../data_source.ts";
import { Payment } from "../models/Payment.ts";

export const PaymentRepository = AppDataSource.getRepository(Payment); 