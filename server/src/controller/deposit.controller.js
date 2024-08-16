import { ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { formatEther, parseEther } from 'ethers/lib/utils.js';

//Solana
import * as web3 from '@solana/web3.js';
import * as splToken from '@solana/spl-token';
import bs58 from 'bs58';

//BTC
import btc from '@tatumio/btc';

import https from 'https';

import { BadRequest } from '../middlewares/throwErrors.js';
import { Transaction } from '../models/transaction.js';
import { Vault } from '../models/Vault.js';
import { User } from '../models/user.js';
import { decryptData } from './vaultGenrator.controller.js';

import { ethUsdtToken, solToken } from '../contracts/address.js';
import { tokenAbi } from '../contracts/abi.js';
import { log } from 'console';

// console.log(TatumLtcSDK.TatumLtcSDK);
const {
  ETH_COMPANY_PUBLIC_KEY,
  ETH_COMPANY_PRIVATE_KEY,
  NETWORK_URL,
  BTC_COMPANY_PUBLIC_KEY,
  BTC_COMPANY_PRIVATE_KEY,
  Tatumio_Api_Key_For_Bitcoin_Testnet,
  Tatumio_Api_Key_For_Bitcoin_Mainnet,
  MAINNET,
  SOLANA_COMPANY_PUBLIC_KEY,
  SOLANA_COMPANY_PRIVATE_KEY,
} = process.env;

const provider = new ethers.providers.JsonRpcProvider(NETWORK_URL);

const btcSdk = btc.TatumBtcSDK({
  apiKey:
    MAINNET === 'false'
      ? Tatumio_Api_Key_For_Bitcoin_Testnet
      : Tatumio_Api_Key_For_Bitcoin_Mainnet,
});

//Solana Connection

const endpoint = web3.clusterApiUrl('devnet');
const connection = new web3.Connection(endpoint);

// =========================solana ====================

const findAssociatedTokenAccountPublicKey = (walletAddress, token) => {
  const association = web3.PublicKey.findProgramAddressSync(
    [
      walletAddress.toBuffer(),
      splToken.TOKEN_PROGRAM_ID.toBuffer(),
      token.toBuffer(),
    ],
    splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
  )[0];
  return association;
};
// send sol transaction

const sendSolTransaction = async (
  connection,
  senderAccount,
  bal,
  toPublicInstance,
  feeFetch,
) => {
  // fee setup
  let blockhash1 = (await connection.getLatestBlockhash('finalized')).blockhash;
  const t = new web3.Transaction();
  t.recentBlockhash = blockhash1;
  t.feePayer = senderAccount.publicKey;
  const feetransactionT = await t.getEstimatedFee(connection);
  let toSendVal = bal - feetransactionT;
  console.log(toSendVal, 'fewww');
  let transaction = t.add(
    web3.SystemProgram.transfer({
      fromPubkey: senderAccount.publicKey,
      toPubkey: toPublicInstance,
      lamports: feeFetch ? bal : toSendVal,
    }),
  );

  //Transaction

  transaction.sign(senderAccount);

  // Send the transaction to the Solana network
  const signature = await connection.sendTransaction(transaction, [
    senderAccount,
  ]);

  console.log(`Transaction ${signature} sent`);

  // Wait for confirmation of the transaction
  await connection.confirmTransaction(signature);

  console.log(`Transaction ${signature} confirmed`);

  return { toSendVal, signature };
};

// send Solana tokens transaction

const sendSolTokensTransaction = async (
  connection,
  senderAccount,
  userTokenAccount,
  tokenPublicKey,
  ownerTokenAccount,
  amount,
  decimals,
) => {
  const transaction = await splToken.transferChecked(
    connection,
    senderAccount,
    userTokenAccount,
    tokenPublicKey,
    ownerTokenAccount,
    senderAccount,
    Number(ethers.utils.parseUnits(amount, decimals)),
    decimals,
  );
  // Wait for confirmation of the transaction
  await connection.confirmTransaction(transaction);

  console.log(` Token == Transaction ${transaction} confirmed`);
  return { transaction };
};

const ethTransfer = async (
  publicKeyFrom,
  publicKeyTo,
  amount,
  estimateGas,
  gasPrice,
  signer,
  userID,
) => {
  try {
    const nonce = await provider.getTransactionCount(publicKeyFrom, 'latest');
    const tx = {
      from: publicKeyFrom,
      to: publicKeyTo,
      value: parseEther(amount),
      nonce: nonce,
      gasLimit: estimateGas,
      gasPrice: gasPrice,
    };

    const sendTrans = await signer.sendTransaction(tx);
    sendTrans.wait();

    // To Transaction Schema
    const createTransaction = await Transaction.create({
      transactionType: 'deposit',
      from: publicKeyFrom,
      to: publicKeyTo,
      chain: 'ETH',
      txHash: sendTrans.hash,
      amount: amount.toString(),
      user: userID,
    });

    return createTransaction;
  } catch (e) {
    console.error(e);
  }
};

//DEPOSITE ETH
export const depositEth = async (req, res) => {
  if (!req?.user?.ethVault) {
    throw new BadRequest('User not found');
  }

  const vault = await Vault.findOne({
    publicKey: req?.user?.ethVault?.publicKey,
  });

  const user = await User.findOne({
    _id: req?.user?._id,
  });

  if (!vault) {
    throw new BadRequest('Vault not found');
  }

  const { privateKey, publicKey } = vault;
  const decrytedPrivateKey = decryptData(privateKey);

  // Get Signer From Private Key And Fetch Balance
  const signer = new ethers.Wallet(decrytedPrivateKey, provider);

  const bal = await signer.getBalance();

  // Gas Unit Approx 21000 everytime To be multilpy with gasPrice
  // to get Actual gas Estimation
  const estimateGas = await provider.estimateGas({
    to: ETH_COMPANY_PUBLIC_KEY,
    value: bal,
  });
  const gasPrice = await provider.getFeeData();

  const estGas = +gasPrice.gasPrice.toString() * +estimateGas.toString();

  //Subtracting Total Gas From Value More subtracting 1/4 gas for more perfection
  const toSendVal = Number(bal) - +estGas - +estGas / 4;

  const usdtContract = new Contract(ethUsdtToken, tokenAbi, signer);

  const usdtBalance = await usdtContract.balanceOf(publicKey);

  if (formatEther(usdtBalance) < 10) {
    console.log('Dont have enough usdt blance');
  }

  if (usdtBalance > 10) {
    if (Number(formatEther(bal.toString())) < 0.01) {
      const signer1 = new ethers.Wallet(ETH_COMPANY_PRIVATE_KEY, provider);

      await ethTransfer(
        ETH_COMPANY_PUBLIC_KEY,
        publicKey,
        '0.02',
        estimateGas,
        gasPrice.gasPrice,
        signer1,
        req?.user?._id,
      );
    }

    const tx = await usdtContract.transfer(ETH_COMPANY_PUBLIC_KEY, usdtBalance);

    await tx.wait();
    await user.updateOne({
      $inc: { usdtBalance: Number(formatEther(usdtBalance.toString)) },
    });
  }

  if (Number(formatEther(toSendVal.toString()) > 0.005)) {
    try {
      const createTransaction = await ethTransfer(
        publicKey,
        ETH_COMPANY_PUBLIC_KEY,
        formatEther(toSendVal.toString()),
        estimateGas,
        gasPrice.gasPrice,
        signer,
        req?.user?._id,
      );

      //update users Eth balance code
      await vault.updateOne({
        $inc: { balance: Number(formatEther(toSendVal.toString())) },
      });

      res
        .status(200)
        .json({ message: 'Transacion Success', data: createTransaction });
    } catch (error) {
      console.error(error);
    }
    //====================record transction
  } else {
    throw new BadRequest('Balance too low');
  }
};

//Withdraw USDT
export const withDrawEthUsdt = async (req, res) => {
  const { amount, toSend } = req.body;
  if (!req?.user?.ethVault) {
    throw new BadRequest('User not found');
  }
  const user = await User.findOne({
    _id: req?.user?._id,
  });
  const vault = await Vault.findOne({
    publicKey: req?.user?.ethVault?.publicKey,
  });

  // Get Signer From Private Key And Fetch Balance
  const signer = new ethers.Wallet(ETH_COMPANY_PRIVATE_KEY, provider);

  const tokenContract = new Contract(ethUsdtToken, tokenAbi, signer);
  try {
    if (req?.user?.usdtBalance < Number(amount)) {
      throw new BadRequest('Insufficient funds');
    }
    const decimal = await tokenContract.decimals();

    const tx = await tokenContract.transfer(
      toSend,
      parseEther(amount, decimal),
    );

    await tx.wait();
    await user.updateOne({
      $inc: { usdtBalance: -Number(amount) },
    });

    const createTransaction = await Transaction.create({
      transactionType: 'withdraw',
      from: ETH_COMPANY_PUBLIC_KEY,
      to: toSend,
      chain: 'ETH',
      txHash: tx.hash,
      amount: amount.toString(),
      user: req?.user?._id,
    });

    res
      .status(200)
      .json({ message: 'Transacion Success', data: createTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Transacion Error', data: error });
  }
  //====================record transction
};

//WithDrawEth
export const withDrawEth = async (req, res) => {
  const { amount, toSend } = req.body;
  if (!req?.user?.ethVault) {
    throw new BadRequest('User not found');
  }
  // req?.user?.ethVault?.publicKey,

  // Get Signer From Private Key And Fetch Balance
  const signer = new ethers.Wallet(ETH_COMPANY_PRIVATE_KEY, provider);
  // const bal = await provider.getBalance(signer);
  const bal = parseEther(amount);

  // Gas Unit Approx 21000 everytime To be multilpy with gasPrice
  // to get Actual gas Estimation
  const estimateGas = await provider.estimateGas({
    to: ETH_COMPANY_PUBLIC_KEY,
    value: bal,
  });
  const gasPrice = await provider.getFeeData();
  const estGas = +gasPrice.gasPrice.toString() * +estimateGas.toString();

  //Subtracting Total Gas From Value More subtracting 1/4 gas for more perfection
  const toSendVal = Number(bal) - +estGas - +estGas / 4;

  if (Number(formatEther(toSendVal.toString()) > 0.005)) {
    try {
      const nonce = await provider.getTransactionCount(
        ETH_COMPANY_PUBLIC_KEY,
        'latest',
      );

      const tx = {
        from: ETH_COMPANY_PUBLIC_KEY.toString(),
        to: toSend,
        value: parseEther(formatEther(toSendVal.toString())),
        nonce: nonce,
        gasLimit: estimateGas,
        gasPrice: gasPrice.gasPrice,
      };

      const sendTrans = await signer.sendTransaction(tx);
      sendTrans.wait();

      // To Transaction Schema
      const createTransaction = await Transaction.create({
        transactionType: 'withdraw',
        from: ETH_COMPANY_PUBLIC_KEY,
        to: toSend,
        chain: 'ETH',
        txHash: sendTrans.hash,
        amount: amount.toString(),
        user: req?.user?._id,
      });

      //update users Eth balance code
      await Vault.findByIdAndUpdate(req?.user?.ethVault?._id, {
        $inc: { balance: -Number(amount) },
        withDrawReady: 'false',
      });

      res
        .status(200)
        .json({ message: 'Transacion Success', data: createTransaction });
    } catch (error) {
      console.error(error);
    }
    //====================record transction
  } else {
    throw new BadRequest('Balance too low');
  }
};

// Get Transaction Fee For BTC
const getTransactionFee = async (satoshisPerByte) => {
  return new Promise((resolve, reject) => {
    https
      .get(`https://bitcoinfees.earn.com/api/v1/fees/recommended`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          // const fees = JSON.parse(data);
          const satoshisPerByte = data.fastestFee;
          const transactionFee = satoshisPerByte * 192;
          resolve(transactionFee);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

// Deposit BTC

export const depositBtc = async (req, res) => {
  if (!req?.user?.btcVault) {
    throw new BadRequest('BTC Vault not found');
  }

  const vault = await Vault.findOne({
    publicKey: req?.user?.btcVault?.publicKey,
  });

  if (!vault) {
    throw new BadRequest('Vault not found');
  }

  const { privateKey, publicKey } = vault;
  const decrytedPrivateKey = decryptData(privateKey);

  //With The Help Of Library
  const balance = await btcSdk.blockchain.getBlockchainAccountBalance(
    publicKey,
  );

  let btcWalletBalance = Number(balance?.incoming) - Number(balance?.outgoing);

  const options = { testnet: MAINNET === 'false' ? true : false };
  const estimateFee = await getTransactionFee();
  const fee = (estimateFee / 100000000).toFixed(8);

  if (Number(btcWalletBalance) - (Number(btcWalletBalance) - fee) > fee) {
    const txData = await btcSdk.transaction.sendTransaction(
      {
        fromAddress: [
          {
            address: publicKey,
            privateKey: decrytedPrivateKey,
          },
        ],
        to: [
          {
            address: BTC_COMPANY_PUBLIC_KEY,
            value: (btcWalletBalance - fee).toFixed(8),
          },
        ],
        fee: fee,
        changeAddress: publicKey,
      },
      options,
    );

    // To Transaction Schema
    const createTransaction = await Transaction.create({
      transactionType: 'deposit',
      from: publicKey,
      to: BTC_COMPANY_PUBLIC_KEY,
      chain: 'BTC',
      txHash: txData.txId,
      amount: (btcWalletBalance - fee).toString(),
      user: req?.user?._id,
    });

    //update users Eth balance code
    await Vault.findByIdAndUpdate(req?.user?.btcVault?._id, {
      $inc: { balance: Number(btcWalletBalance - fee) },
    });

    res
      .status(200)
      .json({ message: 'Transacion Success', data: createTransaction });
  } else {
    throw new BadRequest('Balance too low');
  }
};

// WithDraw BTC

export const withdrawBtc = async (req, res) => {
  const { amount, toSend } = req.body;

  //

  //
  if (!req?.user?.btcVault) {
    throw new BadRequest('BTC Vault not found');
  }

  const vault = await Vault.findOne({
    publicKey: req?.user?.btcVault?.publicKey,
  });

  if (!vault) {
    throw new BadRequest('Vault not found');
  }

  const { publicKey } = vault;

  const options = { testnet: MAINNET === 'false' ? true : false };
  const estimateFee = await getTransactionFee();
  const fee = (estimateFee / 100000000).toFixed(8);

  if (Number(amount) - (Number(amount) - fee) > fee) {
    const txData = await btcSdk.transaction.sendTransaction(
      {
        fromAddress: [
          {
            address: BTC_COMPANY_PUBLIC_KEY,
            privateKey: BTC_COMPANY_PRIVATE_KEY,
          },
        ],
        to: [
          {
            address: toSend,
            value: amount,
          },
        ],
        fee: fee,
        changeAddress: publicKey,
      },
      options,
    );

    // To Transaction Schema
    const createTransaction = await Transaction.create({
      transactionType: 'withDraw',
      from: BTC_COMPANY_PUBLIC_KEY,
      to: toSend,
      chain: 'BTC',
      txHash: txData.txId,
      amount: amount.toString(),
      user: req?.user?._id,
    });

    //update users Eth balance code
    await Vault.findByIdAndUpdate(req?.user?.btcVault?._id, {
      $inc: { balance: -Number(amount) },
      withDrawReady: 'false',
    });

    res
      .status(200)
      .json({ message: 'Transacion Success', data: createTransaction });
  } else {
    throw new BadRequest('Balance too low');
  }
};

//DEPOSITE SOL

export const depositSol = async (req, res) => {
  if (!req?.user?.ethVault) {
    throw new BadRequest('User not found');
  }
  const user = await User.findOne({
    _id: req?.user?._id,
  });
  const vault = await Vault.findOne({
    publicKey: req?.user?.solVault?.publicKey,
  });

  if (!vault) {
    throw new BadRequest('Vault not found');
  }

  const { privateKey, publicKey } = vault;
  const decrytedPrivateKey = decryptData(privateKey);

  const privateKeyew = bs58.decode(decrytedPrivateKey);

  // console.log(decrytedPrivateKey, privateKeyew, 'PRIVATE KEY');
  // Create an account object from the private key
  const senderAccount = web3.Keypair.fromSecretKey(privateKeyew);

  //Making Public Key Instance
  const fromPublicInstance = new web3.PublicKey(publicKey);
  const toPublicInstance = new web3.PublicKey(SOLANA_COMPANY_PUBLIC_KEY);

  //==========Get Balanec=============
  const bal = await connection.getBalance(senderAccount.publicKey);
  console.log(bal, '<<<<<<<<<<<<<<<========= Sol BalANCE ===>>>>>');

  const tokenPublicKey = new web3.PublicKey(solToken);

  // ================Token balnce================

  const ownerTokenAccount = findAssociatedTokenAccountPublicKey(
    toPublicInstance,
    tokenPublicKey,
  );
  const userTokenAccount = findAssociatedTokenAccountPublicKey(
    fromPublicInstance,
    tokenPublicKey,
  );

  console.log(ownerTokenAccount.toString(), userTokenAccount.toString());

  const userAccountInfo = (
    await connection.getParsedAccountInfo(userTokenAccount)
  )?.value?.data?.parsed?.info?.tokenAmount;

  console.log(
    userAccountInfo.uiAmount,
    'token Balance',
    ownerTokenAccount.toString(),
  );

  // ================= USDT / SOL condition ===================

  if (userAccountInfo.uiAmount !== undefined && userAccountInfo.uiAmount > 10) {
    // ===================================transfer Tokens ==============================

    //===================if platform wallet  donst have fee=================

    if (bal / web3.LAMPORTS_PER_SOL < 0.002) {
      const senderAccountCompany = web3.Keypair.fromSecretKey(
        bs58.decode(SOLANA_COMPANY_PRIVATE_KEY),
      );

      const feeFetch = true;

      const { signature } = await sendSolTransaction(
        connection,
        senderAccountCompany,
        0.002 * web3.LAMPORTS_PER_SOL,
        // company public key
        fromPublicInstance,
        feeFetch,
      );

      console.log(signature, 'GAS fee from company wallet transaction');
      // ===================== Wait for transaction to finalize =====================
      let receipt = null;

      while (receipt !== 'finalized') {
        let result = await connection.getSignatureStatus(signature, {
          searchTransactionHistory: true,
        });
        receipt = result?.value?.confirmationStatus;
      }
      if (receipt === 'finalized') {
        // =================transaction setup===========================

        const { transaction } = await sendSolTokensTransaction(
          connection,
          senderAccount,
          userTokenAccount,
          tokenPublicKey,
          ownerTokenAccount,
          userAccountInfo.uiAmount.toString(),
          userAccountInfo.decimals,
        );

        //User Updared balance
        const userAccountInfo2 = (
          await connection.getParsedAccountInfo(userTokenAccount)
        )?.value?.data?.parsed?.info?.tokenAmount;

        console.log(`Balance after transaction : ${userAccountInfo2.uiAmount}`);

        //update users USDT balance code
        await user.updateOne({
          $inc: { usdtBalance: userAccountInfo.uiAmount },
        });
      }
    } else {
      const { transaction } = await sendSolTokensTransaction(
        connection,
        senderAccount,
        userTokenAccount,
        tokenPublicKey,
        ownerTokenAccount,
        userAccountInfo.uiAmount.toString(),
        userAccountInfo.decimals,
      );

      //User Updared balance
      const userAccountInfo2 = (
        await connection.getParsedAccountInfo(userTokenAccount)
      )?.value?.data?.parsed?.info?.tokenAmount;

      console.log(`Balance after transaction : ${userAccountInfo2.uiAmount}`);

      //update users USDT balance code
      await user.updateOne({
        $inc: { usdtBalance: userAccountInfo.uiAmount },
      });
    }
  } else {
    // =================================== transfer sol =============================
    const { toSendVal, signature } = await sendSolTransaction(
      connection,
      senderAccount,
      bal,
      toPublicInstance,
      false,
    );
    const newSenderBalance = await connection.getBalance(fromPublicInstance);

    console.log(`Balance after transaction : ${newSenderBalance}`);

    // To Transaction Schema
    const createTransaction = await Transaction.create({
      transactionType: 'deposit',
      from: publicKey,
      to: SOLANA_COMPANY_PUBLIC_KEY,
      chain: 'SOL',
      txHash: signature,
      amount: (toSendVal / web3.LAMPORTS_PER_SOL).toString(),
      user: req?.user?._id,
    });

    //update users Eth balance code
    await vault.updateOne({
      $inc: { balance: Number((toSendVal / web3.LAMPORTS_PER_SOL).toString()) },
    });
  }

  res.status(200).send('Deposite Complete');
};

// withdraw SOL

export const withdrawSol = async (req, res) => {
  const { amount, toSend } = req.body;
  if (!req?.user?.solVault) {
    throw new BadRequest('User not found');
  }

  const vault = await Vault.findOne({
    publicKey: req?.user?.solVault?.publicKey,
  });

  if (!vault) {
    throw new BadRequest('Vault not found');
  }

  console.log(SOLANA_COMPANY_PRIVATE_KEY, 'PRIVATE KEY=======>>>');

  // Create an account object from the private key
  const privatekeyNew = bs58.decode(SOLANA_COMPANY_PRIVATE_KEY);
  const senderAccount = web3.Keypair.fromSecretKey(privatekeyNew);

  //Making Public Key Instance
  const fromPublicInstance = new web3.PublicKey(SOLANA_COMPANY_PUBLIC_KEY);
  const toPublicInstance = new web3.PublicKey(toSend);

  //Get Balanec
  const bal = await connection.getBalance(senderAccount.publicKey);
  console.log(bal, 'BalANCE ===>>>>>');

  // =====================transation==================

  const { signature } = await sendSolTransaction(
    connection,
    senderAccount,
    bal,
    toPublicInstance,
    false,
  );

  // Get the sender's new account balance
  const newSenderBalance = await connection.getBalance(fromPublicInstance);

  console.log(`Balance after transaction : ${newSenderBalance}`);
  // To Transaction Schema
  const createTransaction = await Transaction.create({
    transactionType: 'withdraw',
    from: SOLANA_COMPANY_PUBLIC_KEY,
    to: toSend,
    chain: 'SOL',
    txHash: signature,
    amount: amount.toString(),
    user: req?.user?._id,
  });

  //update users SOL balance code
  await Vault.findByIdAndUpdate(req?.user?.solVault?._id, {
    $inc: { balance: -Number(amount) },
    withDrawReady: 'false',
  });

  res
    .status(200)
    .json({ message: 'Transacion Success', data: createTransaction });
};

// withdraw SOl USDT

export const withdrawSolUsdt = async (req, res) => {
  const { amount, toSend } = req.body;
  if (!req?.user?.solVault) {
    throw new BadRequest('User not found');
  }
  const user = await User.findOne({
    _id: req?.user?._id,
  });

  const vault = await Vault.findOne({
    publicKey: req?.user?.solVault?.publicKey,
  });

  if (!vault) {
    throw new BadRequest('Vault not found');
  }

  // Create an account object from the private key
  const privatekeyNew = bs58.decode(SOLANA_COMPANY_PRIVATE_KEY);
  const senderAccount = web3.Keypair.fromSecretKey(privatekeyNew);

  //Making Public Key Instance
  const fromPublicInstance = new web3.PublicKey(SOLANA_COMPANY_PUBLIC_KEY);
  const toPublicInstance = new web3.PublicKey(toSend);

  const tokenPublicKey = new web3.PublicKey(solToken);

  // get token associated accounts

  const ownerTokenAccount = findAssociatedTokenAccountPublicKey(
    toPublicInstance,
    tokenPublicKey,
  );
  const userTokenAccount = findAssociatedTokenAccountPublicKey(
    fromPublicInstance,
    tokenPublicKey,
  );

  //User Token balance
  const userAccountInfo = (
    await connection.getParsedAccountInfo(userTokenAccount)
  )?.value?.data?.parsed?.info?.tokenAmount;

  console.log('error in transaction', userAccountInfo);
  // ========================send tokens ==============
  const { transaction } = await sendSolTokensTransaction(
    connection,
    senderAccount,
    userTokenAccount,
    tokenPublicKey,
    ownerTokenAccount,
    amount,
    userAccountInfo.decimals,
  );

  //User Updared balance
  const userAccountInfo2 = (
    await connection.getParsedAccountInfo(userTokenAccount)
  )?.value?.data?.parsed?.info?.tokenAmount;

  console.log(`Balance after transaction : ${userAccountInfo2.uiAmount}`);

  //update users USDT balance code
  await user.updateOne({
    $inc: { usdtBalance: -Number(amount) },
  });

  res.status(200).json({ message: 'Transacion Success' });
};
