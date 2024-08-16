import { ethers } from 'ethers';
import crypto from 'crypto';
import CoinKey from 'coinkey';
import { User } from '../models/user.js';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { Vault } from '../models/Vault.js';
import { BadRequest } from '../middlewares/throwErrors.js';
import bip39 from 'bip39';
import bitcoin from 'bitcoinjs-lib';

const { ecnryption_method, secret_iv, Mnemonic_For_Btc_Vault } = process.env;

let secretKey = '';
const getUserPassword = async (req) => {
  const user = await User.findById({ _id: req?.user?._id });
  const { password } = user;
  if (password) {
    secretKey = password;
  }
  return password;
};

// getUserPassword();
const key = crypto
  .createHash('sha512')
  .update(secretKey)
  .digest('hex')
  .substring(0, 32);
const encryptionIV = crypto
  .createHash('sha512')
  .update(secret_iv)
  .digest('hex')
  .substring(0, 16);

// Encrypt data
export function encryptData(data) {
  const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV);
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
  ).toString('base64'); // Encrypts data and converts to hex and base64
}

// Decrypt data
export function decryptData(encryptedData) {
  const buff = Buffer.from(encryptedData, 'base64');
  const decipher = crypto.createDecipheriv(
    ecnryption_method,
    key,
    encryptionIV,
  );
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  ); // Decrypts data and converts to utf8
}

export const ethValutGenrator = async (req, res) => {
  const { vaultName } = req.body;
  const wallet = ethers.Wallet.createRandom();
  await getUserPassword(req);
  const { address, privateKey } = wallet;
  const data = privateKey.toString('hex');
  const encrypted = encryptData(data);

  if (!req?.user) {
    throw new BadRequest('User not found');
  }
  if (req?.user?.ethVault) {
    throw new BadRequest('Vault Already Exists 🙏');
  }
  const createVault = await Vault.create({
    vaultType: 'ETH',
    vaultName: vaultName,
    publicKey: address,
    privateKey: encrypted,
  });

  await User.findByIdAndUpdate(
    req.user._id,
    { ethVault: createVault?._id },
    { new: true },
  );

  res.status(200).json({ address, message: 'Vault Created' });
};

//btc wallet random create

export const btcVaultGenrator = async (req, res) => {
  const { vaultName } = req.body;
  if (!req?.user) {
    throw new BadRequest('User not found');
  }
  await getUserPassword(req);
  if (req?.user?.btcVault) {
    throw new BadRequest('Vault Already Exists');
  }
  //
  const vaults = await Vault.find({
    vaultType: 'BTC',
  });
  const path = `m/84'/1'/0/0/${vaults.length}`;
  const seed = bip39.mnemonicToSeedSync(Mnemonic_For_Btc_Vault);
  const network =
    process.env.MAINNET === 'false'
      ? bitcoin.networks.testnet
      : bitcoin.networks.bitcoin;
  //testnet
  const masterKey = bitcoin.bip32.fromSeed(seed, network);
  const { privateKey } = masterKey.derivePath(path);
  const wif = bitcoin.ECPair.fromPrivateKey(privateKey, { network }).toWIF();
  const { address } = bitcoin.payments.p2wpkh({
    pubkey: bitcoin.ECPair.fromPrivateKey(privateKey, { network }).publicKey,
    network,
  });

  console.log('Bech32 Address: ', address);
  console.log('Private Key (WIF): ', wif);

  const encrypted = encryptData(wif);

  const createVault = await Vault.create({
    vaultType: 'BTC',
    vaultName: vaultName,
    publicKey: address,
    privateKey: encrypted,
  });

  await User.findByIdAndUpdate(req.user._id, { btcVault: createVault?._id });

  res.status(200).json({ address, message: 'Vault Created' });
};

export const solWalletGenrator = async (req, res) => {
  const { vaultName } = req.body;
  const keypair = Keypair.generate();
  await getUserPassword(req);
  console.log(secretKey, 'password');
  const { publicKey } = keypair;
  const solPrivatekey = keypair.secretKey;
  let solarkey = new Uint8Array(solPrivatekey);
  const encrypted = encryptData(bs58.encode(solarkey));
  const solPublicKey = publicKey.toString();
  console.log(req?.user, 'req.user');
  // const user = await User.findById(req.user.id);
  if (!req?.user) {
    throw new BadRequest('User not found');
  }
  if (req?.user?.SolVault) {
    throw new BadRequest('Vault Already Exists 🙏');
  }
  const createVault = await Vault.create({
    vaultType: 'SOL',
    vaultName: vaultName,
    publicKey: publicKey,
    privateKey: encrypted,
  });

  await User.findByIdAndUpdate(req.user._id, { solVault: createVault?._id });

  res.status(200).json({ solPublicKey });
};
