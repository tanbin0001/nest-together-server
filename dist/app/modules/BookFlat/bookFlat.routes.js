"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookFlatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bookFlat_controller_1 = require("./bookFlat.controller");
const router = express_1.default.Router();
router.get("/booking-requests", bookFlat_controller_1.bookFlatControllers.getAllBookedFlats);
router.post("/booking-applications", bookFlat_controller_1.bookFlatControllers.bookAFlat);
router.put("/booking-requests/:bookingId", bookFlat_controller_1.bookFlatControllers.updateBookingStatus);
exports.BookFlatRoutes = router;
