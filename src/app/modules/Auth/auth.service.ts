 
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt'
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { comparePasswords } from "./passwordMatcher";
import { hashedPassword } from "../../../helpars/passwordHasher";
 
 

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
        role:userData.role
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

 
const changePassword = async (
    token: string  ,
    payload: any
): Promise<void> => {
    const { oldPassword, newPassword } = payload;
 
    const user = jwtHelpers.verifyToken(token, config.jwt.jwt_secret!); 
 
    const isUserExist = await prisma.user.findUnique({
        where: {
            id: user?.id,
             
        }
    });

   
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    // checking old password
    if (
        isUserExist.password &&
        !(await  comparePasswords(oldPassword, isUserExist.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
    }

    const hashPassword = await hashedPassword(newPassword);

    await prisma.user.update({
        where: {
            id: isUserExist.id
        },
        data: {
            password: hashPassword,
         
        }
    })
};
export const AuthServices = {
    loginUser,
    changePassword
    
}