 
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt'
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
 
 

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            
        }
    });
 

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new ApiError(httpStatus.NOT_FOUND,"Password incorrect!")
    }
    const accessToken = jwtHelpers.generateToken({
        id:userData.id,
        name:userData.name,
        email: userData.email,
        role:'user'
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

 

    const result = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token:accessToken
    }
    return {
        result
      
    };
};

 

export const AuthServices = {
    loginUser,
    
}