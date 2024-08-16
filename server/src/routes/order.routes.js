import { Router } from 'express';
import {
  getUserOrdersCompleted,
  getUserOrdersPending,
} from '../controller/index.js';

import { catchAsync } from '../middlewares/index.js';
import passport from 'passport';

export const orderRoutes = Router();
orderRoutes.use(passport.authenticate('jwt', { session: false }));
orderRoutes.post('/getUserOrdersCompleted', catchAsync(getUserOrdersCompleted));
orderRoutes.get('/getUserOrdersPending', catchAsync(getUserOrdersPending));
