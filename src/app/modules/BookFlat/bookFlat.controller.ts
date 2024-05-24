import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { flatServices } from "../Flat/flat.service";
import { bookFlatServices } from "./bookFlat.service";
import ApiError from "../../errors/ApiError";











const bookAFlat = catchAsync(async (req, res) => {

    const token = req.headers.authorization
    if (!token) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized Access')
    }

    const result = await bookFlatServices.bookAFlat(req.body, token)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking requests submitted successfully",
        data: result
    })
});


const getAllBookedFlats = catchAsync(async (req, res) => {

    const result = await bookFlatServices.getAllBookedFlats()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking requests retrieved successfully",
        data: result
    })
});



const updateBookingStatus = catchAsync(async (req, res) => {
    const token = req.headers.authorization
    const { bookingId } = req.params
    const result = await bookFlatServices.updateBookingStatus(bookingId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking request updated successfully",
        data: result
    })
});



export const bookFlatControllers = {
    bookAFlat,
    getAllBookedFlats,
    updateBookingStatus
}