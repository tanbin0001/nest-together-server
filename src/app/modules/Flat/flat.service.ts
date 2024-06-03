import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma"
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";




const getSingleFlat = async (flatId: string) => {
  const result = prisma.flat.findFirstOrThrow({
    where: {
      id: flatId
    }
  });
  return result;
}



const getAllFlats = async (queryParams: any) => {
  const { searchTerm, page = 1, limit = 10, sortBy, sortOrder, availability } = queryParams;

  const filters: Prisma.FlatWhereInput = {};
  if (searchTerm) {
    filters.OR = [
      { location: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } },
      { utilitiesDescription: { contains: searchTerm, mode: 'insensitive' } }
    ];
  }
  if (availability !== undefined && availability !== '') {
    filters.availability = availability === 'true';
  }
  let orderBy: Prisma.FlatOrderByWithRelationInput | undefined;
  if (sortBy) {
    orderBy = { [sortBy]: sortOrder || 'asc' };
  }

  const validatedPage = Math.max(parseInt(page), 1);
  const validatedLimit = Math.max(parseInt(limit), 1);

  const skip = (validatedPage - 1) * validatedLimit;

  const result = await prisma.flat.findMany({
    where: filters,
    orderBy,
    skip,
    take: validatedLimit,
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const totalCount = result.length;



  const returnData = {
    meta: {
      total: totalCount,
      page: validatedPage,
      limit: validatedLimit
    },
    data: result
  }


  return returnData;
};
















const addFlatsIntoDB = async (payload: any, token: string) => {
  console.log(payload);
  const { id: userId } = jwtHelpers.verifyToken(token, config.jwt.jwt_secret!);


  // Check if user exists
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const flatData = {
    ...payload,
    postedBy: userId,
  };


  const result = await prisma.flat.create({
    data: flatData,
  });

  return {
    result
  };

};

const updateFlatsIntoDb = async (id: string, payload: any) => {

  await prisma.flat.findUniqueOrThrow({
    where: {
      id
    }
  })

  const result = prisma.flat.update({
    where: {
      id
    },
    data: payload
  })

  return result
}


const deleteFlatFromDB = async (id: string) => {
  // Check if flat exists
  const flatExists = await prisma.flat.findUnique({
    where: { id },
  });

  if (!flatExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'flat does not exist');
  }

  console.log(id);


  await prisma.booking.deleteMany({
    where: {
      flatId: id,
    },
  });


  const result = await prisma.flat.delete({
    where: {
      id,
    },
  });

  return result;
};

export const flatServices = {
  getAllFlats,
  getSingleFlat,
  addFlatsIntoDB,
  updateFlatsIntoDb,
  deleteFlatFromDB
}