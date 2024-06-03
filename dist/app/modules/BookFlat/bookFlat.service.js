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
exports.bookFlatServices = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpars/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const bookAFlat = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, token, '1111111111111111111111111111111111111111111111111');
    const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedToken.email
        }
    });
    console.log(userData, '222222222222222222222222222222222222222222222222222222');
    if (!userData) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
    }
    //getting flat data 
    const flatData = yield prisma_1.default.flat.findUniqueOrThrow({
        where: {
            id: payload.flatId
        }
    });
    flatData;
    console.log(flatData, '333333333333333333333333333333333');
    const dataToBookAFlat = {
        userId: userData.id,
        flatId: flatData.id
    };
    console.log(dataToBookAFlat, '44444444444444444444444444444444444444444');
    const result = yield prisma_1.default.booking.create({
        data: dataToBookAFlat
    });
    console.log(result, '555555555555555555555555555555555555555555555555');
    return result;
});
const getAllBookedFlats = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        include: {
            flat: true,
            user: true
        }
    });
    return result;
});
const updateBookingStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUniqueOrThrow({
        where: {
            id
        }
    });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Booking not found");
    }
    const result = prisma_1.default.booking.update({
        where: {
            id
        },
        data: status
    });
    return result;
});
exports.bookFlatServices = {
    bookAFlat,
    getAllBookedFlats,
    updateBookingStatus
};
