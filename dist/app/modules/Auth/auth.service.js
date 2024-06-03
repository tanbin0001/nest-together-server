"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthServices = void 0;
const jwtHelpers_1 = require("../../../helpars/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt = __importStar(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const passwordMatcher_1 = require("./passwordMatcher");
const passwordHasher_1 = require("../../../helpars/passwordHasher");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        }
    });
    const isCorrectPassword = yield bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Password incorrect!");
    }
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    const result = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token: accessToken
    };
    return {
        result
    };
});
const changePassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const user = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // checking old password
    if (isUserExist.password &&
        !(yield (0, passwordMatcher_1.comparePasswords)(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    const hashPassword = yield (0, passwordHasher_1.hashedPassword)(newPassword);
    yield prisma_1.default.user.update({
        where: {
            id: isUserExist.id
        },
        data: {
            password: hashPassword,
        }
    });
});
exports.AuthServices = {
    loginUser,
    changePassword
};
