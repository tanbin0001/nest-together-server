"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookFlatValidationSchemas = void 0;
const zod_1 = require("zod");
const bookFlatValidationSchema = zod_1.z.object({
    flatId: zod_1.z.string(),
    userId: zod_1.z.string(),
    status: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]),
});
exports.bookFlatValidationSchemas = {
    bookFlatValidationSchema
};
