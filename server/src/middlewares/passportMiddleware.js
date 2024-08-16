import { Types } from 'mongoose';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/index.js';

const { APP_SECRET } = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: APP_SECRET,
};

export const passportMiddleware = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      // eslint-disable-next-line no-underscore-dangle
      const id = Types.ObjectId(jwtPayload._id);
      User.aggregate([
        {
          $match: { _id: id },
        },
        {
          $lookup: {
            from: 'vaults',
            localField: 'btcVault',
            foreignField: '_id',
            as: 'btcVault',
          },
        },
        {
          $lookup: {
            from: 'vaults',
            localField: 'ethVault',
            foreignField: '_id',
            as: 'ethVault',
          },
        },
        {
          $lookup: {
            from: 'vaults',
            localField: 'solVault',
            foreignField: '_id',
            as: 'solVault',
          },
        },
        {
          $unwind: { path: '$solVault', preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: '$ethVault', preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: '$btcVault', preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            'btcVault.privateKey': 0,
            'ethVault.privateKey': 0,
            'solVault.privateKey': 0,
            verificationToken: 0,
            password: 0,
            updatedAt: 0,
          },
        },
      ]).exec((err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          // console.log(user);
          return done(null, user[0]);
        } else {
          return done(null, false);
        }
      });
    }),
  );
};
