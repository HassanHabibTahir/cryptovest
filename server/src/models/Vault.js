import { Schema, model } from 'mongoose';

const vaultSchema = new Schema({
  vaultType: String,
  vaultName: String,
  publicKey: String,
  privateKey: String,
  balance: { type: Number, default: 10 },
  withDrawReady: String, // true , false , partial
});

export const Vault = model('Vault', vaultSchema);
