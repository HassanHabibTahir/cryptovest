import { CustomError } from '../middlewares/throwErrors.js';
import { Vault } from '../models/Vault.js';
import { User } from '../models/user.js';

// ================Transfer amount===========
export const transferAmount = async (req, res) => {
  console.log(req.body);
  const { email, vaultType, amount } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError('Requested receiver not found!', 404);
  }

  if (vaultType === 'usdt') {
    const sender = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $inc: { usdtBalance: -Number(amount) } },
    );

    const reciver = await User.findByIdAndUpdate(
      { _id: user._id },
      { $inc: { usdtBalance: Number(amount) } },
    );
  } else {
    const vaultName = vaultType + 'Vault';
    if (!req.user[vaultName])
      throw new CustomError(
        `User have not created ${vaultType.toUpperCase()} Vault!`,
        404,
      );
    const userVault = await Vault.findById({ _id: req.user[vaultName]._id });

    if (!user[vaultName]) {
      throw new CustomError(
        `Reciver have not created ${vaultType.toUpperCase()} Vault!`,
        404,
      );
    }
    const reciverVault = await Vault.findById({ _id: user[vaultName]._id });

    await userVault.update({ $inc: { balance: -Number(amount) } });
    await reciverVault.update({ $inc: { balance: Number(amount) } });
  }
  res.status(201).json({
    success: true,
    message: 'Transaction completed!',
  });
};
