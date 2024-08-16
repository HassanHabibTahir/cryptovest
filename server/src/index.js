import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import timeout from 'connect-timeout';
import { Server } from 'socket.io';

import { serverError, passportMiddleware } from './middlewares/index.js';
import {
  authRoutes,
  depositeWithDrawRoutes,
  orderRoutes,
  transferRoutes,
  userRoutes,
  valutRoutes,
} from './routes/index.js';
import { client } from './utils/sendMail.js';
import { connectDB } from './db/conn.js';
import {
  placeOrder,
  fetchUserOrders,
  fetchAllOrders,
} from './controller/order.controller.js';
import { User } from './models/user.js';
import twilio from 'twilio';
// import { coinMarketCapRoutes } from './routes/coinMarketCap.routes.js';
import { getApiData } from './controller/coinMarketCap.controller.js';
import { Vault } from './models/Vault.js';
import { twilioClient } from './controller/auth.controller.js';
// import { redisConnection } from './redis/client.js';

const app = express();
const { PORT } = process.env;

// static folder
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(
  '*/images/',
  express.static(path.join(process.cwd(), 'public', 'images')),
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'dist')));

app.use(timeout('60000s'));
app.use(cors());
app.use(passport.initialize());
passportMiddleware(passport);

// DB CONNECT
const main = async () => {
  await connectDB();

  const server = app.listen(PORT);
  const io = new Server(server, {
    cors: {
      origin:
        process.env.IN_PROD === 'true'
          ? 'https://crypto-vest-test.netlify.app'
          : 'http://localhost:5000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('join_user', async (data) => {
      socket.join(data);
      const { orders } = await fetchUserOrders(data);
      io.to(data).emit('get_user_orders', orders);
    });

    socket.on('find_orders', async (data) => {
      const currentPrice = await getApiData();
      console.log(data, 'network  first time data');

      const { buyOrders, sellOrders } = await fetchAllOrders(data);
      socket.emit('get_orders', { buyOrders, sellOrders, currentPrice });
    });

    socket.on('place_order', async (data) => {
      socket.join(data.user);
      const { affectedUsers } = await placeOrder(data);
      const currentPrice = await getApiData();

      const { buyOrders, sellOrders } = await fetchAllOrders(data.network);
      const { orders } = await fetchUserOrders(data.user);

      io.emit('get_orders', { buyOrders, sellOrders, currentPrice });
      // =======================updating all affected users =======================
      affectedUsers.forEach(async (user, i) => {
        const userData = await User.findById(user).populate('ethVault');
        io.to(user).emit('updated_user', userData);
      });
      io.to(data.user).emit('get_user_orders', orders);
    });
  });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

// setTimeout(async () => {
//   await Vault.updateMany(
//     {
//       vaultType: 'ETH',
//     },
//     {
//       balance: 2,
//     },
//   );
//   console.log('HO GAYA');
// }, 5000);

//---------------- API ROUTES --------------------
//---------------- API ROUTES --------------------
//---------------- API ROUTES --------------------

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vault', valutRoutes);
app.use('/api', depositeWithDrawRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/order', orderRoutes);

app.get('/clear-vaults-db', async (req, res) => {
  await Vault.deleteMany({});
  res.send('vault db clear');
});
app.get('/clear-users-db', async (req, res) => {
  await User.deleteMany({});
  res.send('user db clear');
});

// (() => {
//   //  Code to create Msg Service
//   twilioClient.verify.v2.services
//     .create({ friendlyName: 'crypto vest' })
//     .then((service) => console.log(service.sid));
// })();

// app.use('/api/coinmarketcap', coinMarketCapRoutes);

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN,
// );
// app.get('/yes', () => {
//   // Code to create Msg Service
//   twilioClient.verify.v2.services
//     .create({ friendlyName: 'Cryptovest Code' })
//     .then((service) => console.log(service.sid));

//   //send Verification Message
// });

app.get('/', (req, res) => {
  res.json('server started');
});

// redisConnection.on('connect', () => console.log('Connected to redis :D'));
app.use(serverError);
