import express from 'express';
import { userProfileControllers } from './userProfile.controller';
 
const router = express.Router();

router.get(
    '/',
 
    userProfileControllers.getMyProfile
);
router.put(
    '/',
 
    userProfileControllers.updateProfile
);

 
 

export const userProfileRoutes = router;