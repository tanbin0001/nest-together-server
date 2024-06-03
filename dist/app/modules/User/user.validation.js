"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const registerUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required!"
    }),
    email: zod_1.z.string({
        required_error: "Email is required!"
    }),
    bio: zod_1.z.string({
        required_error: "Contact Number is required!"
    }),
    profession: zod_1.z.string({
        required_error: "profession is required!"
    }),
    address: zod_1.z.string({
        required_error: "address is required!"
    }),
});
exports.userValidations = {
    registerUserValidationSchema,
};
