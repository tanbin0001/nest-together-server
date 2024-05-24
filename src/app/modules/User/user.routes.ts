import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';


const router = express.Router();

// router.get(
//     '/',
//     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
//     userController.getAllFromDB
// );

router.post(
    "/register", userController.registerUser


);
router.get(
    "/all-users", userController.getAllUsers


);


router.patch(
    "/update-user-role", userController.changeUserRoleAndStatus


);



export const userRoutes = router;