import { Router } from 'express';
import { BookingController } from '../../controllers/BookingController.ts';

const router = Router();
const bookingController = new BookingController();

router.get('/bookings', bookingController.getAllBookings.bind(bookingController));
router.get('/bookings/:id', bookingController.getBookingById.bind(bookingController));
router.post('/bookings', bookingController.createBooking.bind(bookingController));
router.put('/bookings/:id', bookingController.updateBooking.bind(bookingController));
router.delete('/bookings/:id', bookingController.deleteBooking.bind(bookingController));

export const bookingRoutes = router;
