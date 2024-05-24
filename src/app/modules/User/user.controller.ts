import { Request, RequestHandler, Response } from "express";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userServices } from "./user.service";


const registerUser = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.registerUser(req.body)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully!",
        data: result
    })
});


const changeUserRoleAndStatus = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.changeUserRoleAndStatus(req.body)
 
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Changes done successfully!",
        data: result
    })
});


const getAllUsers = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.getAllUsers()
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "got all users",
        data: result
    })
});




export const userController = {
    registerUser,
    changeUserRoleAndStatus,
    getAllUsers

}