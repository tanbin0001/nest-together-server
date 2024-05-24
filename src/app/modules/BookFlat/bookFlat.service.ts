
import { resourceUsage } from "process";
import config from "../../../config";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma"
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";













const bookAFlat = async (payload: any, token: string) => {
    console.log(payload,token,'1111111111111111111111111111111111111111111111111');
    const decodedToken = jwtHelpers.verifyToken(token, config.jwt.jwt_secret!)
    
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email:decodedToken.email
        }
    })
    console.log(userData,'222222222222222222222222222222222222222222222222222222');
    
    if(!userData){
        throw new ApiError(httpStatus.UNAUTHORIZED,"Unauthorized Access")
    }
    //getting flat data 
    const flatData = await prisma.flat.findUniqueOrThrow({
        where: {
            id: payload.flatId
        }
    })
flatData
    console.log(flatData,'333333333333333333333333333333333');
    
    const dataToBookAFlat = {
        userId : userData.id,
        flatId:flatData.id
    }
    console.log(dataToBookAFlat,'44444444444444444444444444444444444444444');
        const result = await prisma.booking.create({
    data:dataToBookAFlat 
        })

   console.log(result,'555555555555555555555555555555555555555555555555');
        return result
}

const getAllBookedFlats = async () => {
    const result = await prisma.booking.findMany({
        include: {
            flat: true,   
            user: true    
        }
    });

    return result;
};


const updateBookingStatus =  async (id: string, status: any) =>{
 
 

 const booking =   await prisma.booking.findUniqueOrThrow({
        where: {
            id
        }
    })
    if (!booking) {
        throw new ApiError(httpStatus.NOT_FOUND,"Booking not found");
    }

  
    const result = prisma.booking.update({
        where:{
            id
        },
        data:status
    })

    return result
}

export const bookFlatServices = {
    bookAFlat,
    getAllBookedFlats,
    updateBookingStatus
}