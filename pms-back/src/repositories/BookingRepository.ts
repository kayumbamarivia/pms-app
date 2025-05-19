import { AppDataSource } from '../data_source.ts';
import { Booking } from '../models/Booking.ts';

export const BookingRepository = AppDataSource.getRepository(Booking);
