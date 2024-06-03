"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (error) => {
    const errorMessageMatch = error.message.match(/"message": "([^"]+)"/);
    const errorMessage = errorMessageMatch ? errorMessageMatch[1] : "Validation Error";
    const issues = error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
    }));
    const errorDetails = {
        issues: issues.map((issue) => ({
            field: issue.field,
            message: issue.message,
        })),
    };
    const mainMessage = issues.map((issue) => issue.message).join('. ');
    return {
        success: false,
        message: mainMessage,
        errorDetails,
    };
};
exports.handleZodError = handleZodError;
