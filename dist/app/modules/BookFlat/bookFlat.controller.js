"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookFlatControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const bookFlat_service_1 = require("./bookFlat.service");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const bookAFlat = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Unauthorized Access');
    }
    const result = yield bookFlat_service_1.bookFlatServices.bookAFlat(req.body, token);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Booking requests submitted successfully",
        data: result
    });
}));
const getAllBookedFlats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookFlat_service_1.bookFlatServices.getAllBookedFlats();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking requests retrieved successfully",
        data: result
    });
}));
const updateBookingStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const { bookingId } = req.params;
    const result = yield bookFlat_service_1.bookFlatServices.updateBookingStatus(bookingId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking request updated successfully",
        data: result
    });
}));
exports.bookFlatControllers = {
    bookAFlat,
    getAllBookedFlats,
    updateBookingStatus
};
