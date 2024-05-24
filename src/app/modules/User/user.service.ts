 
import * as bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma';
 
const registerUser = async (payload:any) => {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);
        const result = await prisma.$transaction(async (prisma) => {
 
            const user = await prisma.user.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    password: hashedPassword
                }
            });

 
            const userProfile = await prisma.userProfile.create({
                data: {
                    userId: user.id,
                    bio: payload.bio,
                    profession: payload.profession,
                    contact:payload.contact,
                    address: payload.address,
                }
            });

            return { user, userProfile };
        });
const {id,name,email,createdAt,updatedAt} = result.user
        const forResponse = {
            id,name,email,createdAt,updatedAt
        }
        return forResponse;
  
};


export const userServices = {
    registerUser
}