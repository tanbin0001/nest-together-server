"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const flat_routes_1 = require("../modules/Flat/flat.routes");
const bookFlat_routes_1 = require("../modules/BookFlat/bookFlat.routes");
const userProfile_routes_1 = require("../modules/UserProfile/userProfile.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/',
        route: user_routes_1.userRoutes
    },
    {
        path: '/',
        route: auth_routes_1.AuthRoutes
    },
    {
        path: '/',
        route: flat_routes_1.flatRoutes
    },
    {
        path: '/',
        route: bookFlat_routes_1.BookFlatRoutes
    },
    {
        path: '/profile',
        route: userProfile_routes_1.userProfileRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
