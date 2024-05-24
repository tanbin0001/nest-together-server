import { z } from "zod";

const bookFlatValidationSchema = z.object({
 
  flatId: z.string(),
  userId: z.string(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]), 
});

export   const bookFlatValidationSchemas = {
    bookFlatValidationSchema
};
