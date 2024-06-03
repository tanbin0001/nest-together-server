"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const HandleZodError_1 = require("../errors/HandleZodError");
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    let message = err.message || 'Something went wrong';
    let errorDetails = err.message;
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, HandleZodError_1.handleZodError)(err);
        message = simplifiedError.message;
        errorDetails = simplifiedError.errorDetails;
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: message,
        errorDetails: errorDetails
    });
};
exports.default = globalErrorHandler;
