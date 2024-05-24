import { z } from "zod";

const FlatValidationSchema = z.object({

    squareFeet: z.number({
        required_error: "Square feet is required!"
    }),
    totalBedrooms: z.number({
        required_error: "Total bedrooms is required!"
    }),
    totalRooms: z.number({
        required_error: "Total rooms is required!"
    }),
    utilitiesDescription: z.string({
        required_error: "Utilities description is required!"
    }),
    location: z.string({
        required_error: "Location is required!"
    }),
    description: z.string({
        required_error: "Description is required!"
    }),
    rent: z.number({
        required_error: "Rent is required!"
    }),
    availability: z.boolean({
        required_error: "Availability is required!"
    }),
    advanceAmount: z.number({
        required_error: "Advance amount is required!"
    }),
});

export const FlatValidations = {
    FlatValidationSchema
}


