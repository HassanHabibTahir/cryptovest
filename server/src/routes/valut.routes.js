import { Router } from 'express';
import {
  btcVaultGenrator,
  ethValutGenrator,
  solWalletGenrator,
} from '../controller/index.js';

import { catchAsync } from '../middlewares/index.js';
import passport from 'passport';

export const valutRoutes = Router();
valutRoutes.use(passport.authenticate('jwt', { session: false }));
valutRoutes.post('/ethwalletgenrator', catchAsync(ethValutGenrator));
valutRoutes.post('/btcwalletgenrator', catchAsync(btcVaultGenrator));
valutRoutes.post('/solwalletgenrator', catchAsync(solWalletGenrator));
