import httpStatus from "http-status";
import config from "../../../config"
import { jwtHelpers } from "../../../helpars/jwtHelpers"
import prisma from "../../../shared/prisma"
import ApiError from "../../errors/ApiError";




 

const getMyProfile = async (userToken: string) => {
    if(!userToken){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorize access')
    }
    const decodedToken = jwtHelpers.verifyToken(userToken, config.jwt.jwt_secret!);
 
    
    // Getting user data
    const userProfile = await prisma.user.findUnique({
        where: {
            id: decodedToken.id  
        },
        include: {
            userProfile: true  
        }
    });
    if(!userProfile) {
        throw new ApiError(httpStatus.NOT_FOUND,"User not found")
    }
 

    return userProfile?.userProfile; 
}



const updateMyProfile =  async (userToken: string,payload:any) => {
    const decodedToken = jwtHelpers.verifyToken(userToken, config.jwt.jwt_secret!);
    
    const isUserMatched = await prisma.user.findUniqueOrThrow({
        where:{
            id: decodedToken.id
        }
    })
if(!isUserMatched){
    throw new ApiError(httpStatus.UNAUTHORIZED,'Unauthorized Access')
}
  // Getting user data
    const userProfile = await prisma.userProfile.update({
        where: {
            userId: decodedToken.id  
        },
        data:payload
    });

    return userProfile 
}

 



export const userProfileServices = {
    getMyProfile,
    updateMyProfile
}