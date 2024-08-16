import { Entity, Schema } from 'redis-om';

class Order extends Entity {}

const personSchema = new Schema(Order, {
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
});
