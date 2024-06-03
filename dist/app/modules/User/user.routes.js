"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// router.get(
//     '/',
//     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//     userController.getAllFromDB
// );
router.post("/register", user_controller_1.userController.registerUser);
router.get("/all-users", user_controller_1.userController.getAllUsers);
router.patch("/update-user-role", user_controller_1.userController.changeUserRoleAndStatus);
exports.userRoutes = router;
