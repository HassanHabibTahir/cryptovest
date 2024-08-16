import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    baseToken: String,
    quoteToken: String,
    isBuyOrder: {
      type: Boolean,
      required: true,
    },
    isLimitOrder: {
      type: Boolean,
      required: true,
    },
    baseAmount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    filled: {
      type: Number,
      default: 0,
    },
    network: String,
    remaining: { type: Number, default: 0 },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model('Order', orderSchema);
