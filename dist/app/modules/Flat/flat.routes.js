"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const flat_controller_1 = require("./flat.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const flat_validation_1 = require("./flat.validation");
const router = express_1.default.Router();
router.get('/flats', flat_controller_1.flatControllers.getAllProducts);
router.get('/flats/:flatId', flat_controller_1.flatControllers.getSingleFlat);
router.post("/flats", (0, validateRequest_1.validateRequest)(flat_validation_1.FlatValidations.FlatValidationSchema), flat_controller_1.flatControllers.addFlats);
router.put("/flats/:flatId", flat_controller_1.flatControllers.updateFlats);
router.delete('/flats/:flatId', flat_controller_1.flatControllers.deleteFromDB);
exports.flatRoutes = router;
