import { BookingRepository } from '../repositories/BookingRepository.ts';
import { Booking } from '../models/Booking.ts';

export class BookingService {
  async findAll(): Promise<Booking[]> {
    return BookingRepository.find();
  }

  async findById(id: number): Promise<Booking | null> {
    return BookingRepository.findOneBy({ id });
  }

  async create(bookingData: Partial<Booking>): Promise<Booking> {
    const booking = BookingRepository.create(bookingData);
    return BookingRepository.save(booking);
  }

  async update(id: number, bookingData: Partial<Booking>): Promise<Booking | null> {
    await BookingRepository.update(id, bookingData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await BookingRepository.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }
} 