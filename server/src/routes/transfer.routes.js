import { Router } from 'express';
import { marketCapData, transferAmount } from '../controller/index.js';

import { catchAsync } from '../middlewares/index.js';
import passport from 'passport';

export const transferRoutes = Router();
transferRoutes.use(passport.authenticate('jwt', { session: false }));
transferRoutes.post('/transferAmount', catchAsync(transferAmount));
transferRoutes.get('/coinMarketCapData', catchAsync(marketCapData));
