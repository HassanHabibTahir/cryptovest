import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  transactionType: String,
  from: String,
  to: String,
  chain: String,
  txHash: String,
  amount: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  time: { type: Date, default: Date.now },
});

export const Transaction = model('Transaction', transactionSchema);
