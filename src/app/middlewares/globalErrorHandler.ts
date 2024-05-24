 
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { handleZodError } from "../errors/HandleZodError";
import { ZodError } from "zod";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let message = err.message || 'Something went wrong';
    let errorDetails = err.message;

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
    
        message = simplifiedError.message;
        errorDetails = simplifiedError.errorDetails;
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: message,
        errorDetails: errorDetails
    });
};

export default globalErrorHandler;
