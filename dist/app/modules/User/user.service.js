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
exports.userServices = void 0;
const bcrypt = __importStar(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt.hash(payload.password, 12);
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword
            }
        });
        console.log(user, 'userrrrrrrrrrrrrrrr');
        const userProfile = yield prisma.userProfile.create({
            data: {
                userId: user.id,
                bio: payload.bio,
                profession: payload.profession,
                contact: payload.contact,
                address: payload.address,
            }
        });
        return { user, userProfile };
    }));
    const { id, name, email, createdAt, updatedAt } = result.user;
    const forResponse = {
        id, name, email, createdAt, updatedAt
    };
    return forResponse;
});
const changeUserRoleAndStatus = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role, status } = data;
    const result = yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.findUniqueOrThrow({
            where: { id }
        });
        let updatedUser;
        if (role !== undefined) {
            // Update the user role
            updatedUser = yield prisma.user.update({
                where: { id },
                data: { role }
            });
            // Update the user profile if role is updated
            yield prisma.userProfile.updateMany({
                where: { userId: id },
                data: { role }
            });
        }
        else if (status !== undefined) {
            // Update the user status
            updatedUser = yield prisma.user.update({
                where: { id },
                data: { status }
            });
        }
        return updatedUser;
    }));
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany();
    return result;
});
exports.userServices = {
    registerUser,
    changeUserRoleAndStatus,
    getAllUsers
};
