"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatValidations = void 0;
const zod_1 = require("zod");
const FlatValidationSchema = zod_1.z.object({
    squareFeet: zod_1.z.number({
        required_error: "Square feet is required!"
    }),
    totalBedrooms: zod_1.z.number({
        required_error: "Total bedrooms is required!"
    }),
    totalRooms: zod_1.z.number({
        required_error: "Total rooms is required!"
    }),
    utilitiesDescription: zod_1.z.string({
        required_error: "Utilities description is required!"
    }),
    location: zod_1.z.string({
        required_error: "Location is required!"
    }),
    description: zod_1.z.string({
        required_error: "Description is required!"
    }),
    rent: zod_1.z.number({
        required_error: "Rent is required!"
    }),
    availability: zod_1.z.boolean({
        required_error: "Availability is required!"
    }),
    advanceAmount: zod_1.z.number({
        required_error: "Advance amount is required!"
    }),
});
exports.FlatValidations = {
    FlatValidationSchema
};
