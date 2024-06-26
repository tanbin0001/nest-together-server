import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
 
    const result = await AuthServices.loginUser(req.body);

 
 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: {
result:    result.result
 
        }
    })
});

 

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization;
 
    const { ...passwordData } = req.body;

    await AuthServices.changePassword((token as string), passwordData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password changed successfully !',
        data:null
    })
});

 

export const AuthController = {
    loginUser,
    changePassword
    
};