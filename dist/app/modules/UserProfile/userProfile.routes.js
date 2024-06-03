"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userProfile_controller_1 = require("./userProfile.controller");
const router = express_1.default.Router();
router.get('/', userProfile_controller_1.userProfileControllers.getMyProfile);
router.put('/', userProfile_controller_1.userProfileControllers.updateProfile);
exports.userProfileRoutes = router;
