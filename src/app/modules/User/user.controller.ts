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

 

 
export const userController = {
    registerUser,
     
}