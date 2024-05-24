
import * as bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma';

const registerUser = async (payload: any) => {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);
    const result = await prisma.$transaction(async (prisma) => {

        const user = await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword
            }
        });


        console.log(user, 'userrrrrrrrrrrrrrrr');
        const userProfile = await prisma.userProfile.create({
            data: {
                userId: user.id,
                bio: payload.bio,
                profession: payload.profession,
                contact: payload.contact,
                address: payload.address,
            }
        });

        return { user, userProfile };
    });
    const { id, name, email, createdAt, updatedAt } = result.user
    const forResponse = {
        id, name, email, createdAt, updatedAt
    }
    return forResponse;

};


 
const changeUserRoleAndStatus = async (data: any) => {
    const { id, role, status } = data;

 
    const result = await prisma.$transaction(async (prisma) => {
      
        await prisma.user.findUniqueOrThrow({
            where: { id }
        });

        let updatedUser;
        if (role !== undefined) {
            // Update the user role
            updatedUser = await prisma.user.update({
                where: { id },
                data: { role }
            });

            // Update the user profile if role is updated
            await prisma.userProfile.updateMany({
                where: { userId: id },
                data: { role }
            });
        } else if (status !== undefined) {
            // Update the user status
            updatedUser = await prisma.user.update({
                where: { id },
                data: { status }   
            });
        }

        return updatedUser;
    });

 
    return result;
};


const getAllUsers = async () => {
    const result = await prisma.user.findMany()
    return result;
}

export const userServices = {
    registerUser,
    changeUserRoleAndStatus,
    getAllUsers
}