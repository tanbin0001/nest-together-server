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
exports.flatServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const jwtHelpers_1 = require("../../../helpars/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getSingleFlat = (flatId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.flat.findFirstOrThrow({
        where: {
            id: flatId
        }
    });
    return result;
});
const getAllFlats = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page = 1, limit = 10, sortBy, sortOrder, availability } = queryParams;
    const filters = {};
    if (searchTerm) {
        filters.OR = [
            { location: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { utilitiesDescription: { contains: searchTerm, mode: 'insensitive' } }
        ];
    }
    if (availability !== undefined && availability !== '') {
        filters.availability = availability === 'true';
    }
    let orderBy;
    if (sortBy) {
        orderBy = { [sortBy]: sortOrder || 'asc' };
    }
    const validatedPage = Math.max(parseInt(page), 1);
    const validatedLimit = Math.max(parseInt(limit), 1);
    const skip = (validatedPage - 1) * validatedLimit;
    const result = yield prisma_1.default.flat.findMany({
        where: filters,
        orderBy,
        skip,
        take: validatedLimit,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    console.log(result, '---------------');
    const totalCount = result.length;
    const returnData = {
        meta: {
            total: totalCount,
            page: validatedPage,
            limit: validatedLimit
        },
        data: result
    };
    return returnData;
});
const addFlatsIntoDB = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const { id: userId } = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
    // Check if user exists
    const userExists = yield prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!userExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const flatData = Object.assign(Object.assign({}, payload), { postedBy: userId });
    const result = yield prisma_1.default.flat.create({
        data: flatData,
    });
    return {
        result
    };
});
const updateFlatsIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.flat.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = prisma_1.default.flat.update({
        where: {
            id
        },
        data: payload
    });
    return result;
});
const deleteFlatFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if flat exists
    const flatExists = yield prisma_1.default.flat.findUnique({
        where: { id },
    });
    if (!flatExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'flat does not exist');
    }
    console.log(id);
    yield prisma_1.default.booking.deleteMany({
        where: {
            flatId: id,
        },
    });
    const result = yield prisma_1.default.flat.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.flatServices = {
    getAllFlats,
    getSingleFlat,
    addFlatsIntoDB,
    updateFlatsIntoDb,
    deleteFlatFromDB
};
