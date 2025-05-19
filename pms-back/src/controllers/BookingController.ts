import { Request, Response } from 'express';
import { BookingService } from '../services/BookingService.ts';

export class BookingController {
  private readonly bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      const bookings = await this.bookingService.findAll();
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getBookingById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const booking = await this.bookingService.findById(id);
      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }
      res.status(200).json(booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const bookingData = req.body;
      const newBooking = await this.bookingService.create(bookingData);
      res.status(201).json(newBooking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateBooking(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const bookingData = req.body;
      const updatedBooking = await this.bookingService.update(id, bookingData);
      if (!updatedBooking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }
      res.status(200).json(updatedBooking);
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteBooking(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.bookingService.delete(id);
      if (!success) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
