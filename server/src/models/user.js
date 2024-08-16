import { Schema, model, Mongoose } from 'mongoose';
import bcrypt from 'bcryptjs';

const { BCRYPT_WORK_FACTOR } = process.env;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: [true, 'User email is required!'],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!!`,
      },
    },
    secondaryEmail: {
      type: String,
    },
    password: {
      type: String,
      minLength: [3, 'Mimume 3 characters are required!'],
    },
    dob: {
      type: Date,
      max: '2010-01-01',
    },
    resedentialAddress: {
      type: String,
    },
    cryptoAddressess: [
      {
        address: String,
        name: {
          type: String,
          default: 'Tether',
          icon: '/images/tether.png',
        },
      },
    ],
    timeZone: String,
    currency: String,
    profilePicBuffer: {
      type: Buffer,
    },
    profilePicMimeType: {
      type: String,
      enum: ['image/jpeg', 'image/jpg', 'image/png'],
    },
    verificationToken: { token: String, expiry: Date },
    isVerified: { type: Boolean, default: false },
    twoStepVerification: { type: Boolean, default: false },
    walletAddress: String,
    number: String,
    isLoggedIn: { type: Boolean, default: false },
    ethVault: { type: Schema.Types.ObjectId, ref: 'Vault' },
    solVault: { type: Schema.Types.ObjectId, ref: 'Vault' },
    btcVault: { type: Schema.Types.ObjectId, ref: 'Vault' },
    usdtBalance: Number,
    withDrawReady: String, // true , false , partial
    otpverification: { otp: { type: Number }, expiry: { type: Date } },
  },
  {
    timestamps: true,
  },
);

// virtual property to get base64String
userSchema.virtual('profilePic').get(function () {
  if (this.profilePicBuffer && this.profilePicMimeType) {
    return `data:${
      this.profilePicMimeType
    };charset=utf-8;base64,${this.profilePicBuffer.toString('base64')}`;
  }
});
userSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, Number(BCRYPT_WORK_FACTOR));
  }
});

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, { __v, ...rest }, _) => {
    delete rest['password'];
    delete rest['profilePicBuffer'];
    delete rest['profilePicMimeType'];
    return rest;
  },
});

userSchema.set('toObject', {
  virtuals: true,
  transform: (_doc, { __v, _password, ...rest }, _options) => rest,
});

export const User = model('User', userSchema);
