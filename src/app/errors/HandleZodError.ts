export const handleZodError = (error: any) => {
  const errorMessageMatch = error.message.match(/"message": "([^"]+)"/);
  const errorMessage = errorMessageMatch ? errorMessageMatch[1] : "Validation Error";

  const issues = error.errors.map((e: any) => ({
    field: e.path.join('.'),
    message: e.message,
  }));




  const errorDetails = {
    issues: issues.map((issue: any) => ({
      field: issue.field,
      message: issue.message,
    })),
  };
  const mainMessage = issues.map((issue: any) => issue.message).join('. ');


 
  return {
    success: false,
    message: mainMessage,
    errorDetails,
  };
};
