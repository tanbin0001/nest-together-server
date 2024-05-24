import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { userProfileServices } from "./userProfile.service";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../errors/ApiError";
 








const getMyProfile = catchAsync(async (req, res) => {

    const userTOken = req.headers.authorization;

    if (!userTOken) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized Access')
    }
    const result = await userProfileServices.getMyProfile(userTOken)
    
    sendResponse(res, {
        statusCode: httpStatus.OK, 
        success: true,
        message: "User profile retrieved successfully",
        data: result
    });
});




const updateProfile = catchAsync(async (req, res) => {

    const userTOken = req.headers.authorization;

    if (!userTOken) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized Access')
    }
    const result = await userProfileServices.updateMyProfile(userTOken, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile updated successfully",
        data: result
    })
});











export const userProfileControllers = {
    getMyProfile,
    updateProfile
}