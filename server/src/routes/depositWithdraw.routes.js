import { catchAsync } from '../middlewares/index.js';
import passport from 'passport';
import { Router } from 'express';
import {
  depositBtc,
  depositEth,
  withdrawBtc,
  withDrawEth,
  withDrawEthUsdt,
  depositSol,
  withdrawSol,
  withdrawSolUsdt,
} from '../controller/deposit.controller.js';

export const depositeWithDrawRoutes = Router();
depositeWithDrawRoutes.use(passport.authenticate('jwt', { session: false }));

//Deposit/Withdraw Eth
depositeWithDrawRoutes.get('/deposit/eth', catchAsync(depositEth));
depositeWithDrawRoutes.post('/withdraw/eth', catchAsync(withDrawEth));
depositeWithDrawRoutes.post('/withdraw/eth-usdt', catchAsync(withDrawEthUsdt));

// Deposit/Withdraw BTC
depositeWithDrawRoutes.get('/deposit/btc', catchAsync(depositBtc));
depositeWithDrawRoutes.post('/withdraw/btc', catchAsync(withdrawBtc));

// Deposit/Withdraw SOL
depositeWithDrawRoutes.get('/deposit/sol', catchAsync(depositSol));
depositeWithDrawRoutes.post('/withdraw/sol', catchAsync(withdrawSol));
depositeWithDrawRoutes.post('/withdraw/sol-usdt', catchAsync(withdrawSolUsdt));
