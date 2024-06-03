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
exports.userProfileServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpars/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const getMyProfile = (userToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userToken) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorize access');
    }
    const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(userToken, config_1.default.jwt.jwt_secret);
    // Getting user data
    const userProfile = yield prisma_1.default.user.findUnique({
        where: {
            id: decodedToken.id
        },
        include: {
            userProfile: true,
        }
    });
    if (!userProfile) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return userProfile;
});
const updateMyProfile = (userToken, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = jwtHelpers_1.jwtHelpers.verifyToken(userToken, config_1.default.jwt.jwt_secret);
    console.log(decodedToken);
    const isUserMatched = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: decodedToken.id
        }
    });
    if (!isUserMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
    }
    // Getting user data
    const userProfile = yield prisma_1.default.user.update({
        where: {
            id: decodedToken.id
        },
        data: payload
    });
    console.log(userProfile);
    return userProfile;
});
exports.userProfileServices = {
    getMyProfile,
    updateMyProfile
};
