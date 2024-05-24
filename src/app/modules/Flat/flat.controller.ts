import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { flatServices } from "./flat.service";







const getAllProducts = catchAsync(async(req, res) => {
    const query = req.query;
 
    const result =  await  flatServices.getAllFlats(query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Flats retrieved successfully',
        data: result
    })
}

);
const getSingleFlat = catchAsync(async(req, res) => {
    const {flatId} = req.params;
 
    const result =  await  flatServices.getSingleFlat(flatId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Flat retrieved successfully',
        data: result
    })
}

);

const addFlats = catchAsync(async (req, res) => {
     const token:any = req.headers.authorization;
 

    const result = await flatServices.addFlatsIntoDB(req.body, token)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Flat added successfully",
        data: result
    })
});


const updateFlats = catchAsync(async (req, res) => {
    
    const {flatId} =req.params
  
    const result = await flatServices.updateFlatsIntoDb(flatId,req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Flat information updated successfully",
        data: result
    })
});

const deleteFromDB = catchAsync(async (req,  res ) => {
    const { flatId } = req.params;
    const result = await flatServices.deleteFlatFromDB(flatId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Flat deleted successfully',
      data: result,
    });
  });
  


export const flatControllers = {
    addFlats,getSingleFlat,
    updateFlats,
    getAllProducts,
    deleteFromDB
}