import express from 'express';
import { bookFlatControllers } from './bookFlat.controller';

const router = express.Router();







router.get(
    "/booking-requests",bookFlatControllers.getAllBookedFlats
);
router.post(
    "/booking-applications",bookFlatControllers.bookAFlat
);

router.put(
    "/booking-requests/:bookingId",bookFlatControllers.updateBookingStatus
);





export const BookFlatRoutes = router;