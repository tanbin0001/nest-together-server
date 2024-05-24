import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
 
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { flatRoutes } from '../modules/Flat/flat.routes';
import { BookFlatRoutes } from '../modules/BookFlat/bookFlat.routes';
import { userProfileRoutes } from '../modules/UserProfile/userProfile.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/',
        route: userRoutes
    },
    {
        path: '/',
        route: AuthRoutes
    }, 
    {
        path: '/',
        route: flatRoutes
    } ,
    {
        path: '/',
        route: BookFlatRoutes
    } ,
    {
        path: '/profile',
        route: userProfileRoutes
    } ,
   
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;