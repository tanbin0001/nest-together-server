import express from 'express';
import { flatControllers } from './flat.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { FlatValidations } from './flat.validation';
 
 
const router = express.Router();

router.get(
    '/flats',
 
    flatControllers.getAllProducts
);
router.get(
    '/flats/:flatId',
 
    flatControllers.getSingleFlat
);

router.post(
    "/flats", validateRequest(FlatValidations.FlatValidationSchema),flatControllers.addFlats
 
  
);
router.put(
    "/flats/:flatId",flatControllers.updateFlats
 
  
);

router.delete(
    '/flats/:flatId',
  
    flatControllers.deleteFromDB
  );
  

export const flatRoutes = router;