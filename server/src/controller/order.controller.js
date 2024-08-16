import { Order, User, Vault } from '../models/index.js';

const updateLimitOrder = async (data, currentOrder) => {
  let affectedUsers = [];
  try {
    const { isBuyOrder, price, user, remaining, network, baseAmount } = data;

    const orders = await Order.find({
      isBuyOrder: isBuyOrder ? false : true,
      price,
      status: 'pending',
      network,
    });
    const currentUser = await User.findById({ _id: user });

    const vaultName = network + 'Vault';

    //===================== pushing current user===========
    affectedUsers.push(user);

    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        const oldOrder = orders[i];
        //===================== pushing any affected user===========
        affectedUsers.push(oldOrder.user.toString());

        // ======================== complete current order(if old order is grater then current order) ============
        if (oldOrder.remaining >= remaining) {
          await currentOrder.updateOne({
            remaining: 0,
            filled: remaining,
            status: 'complete',
          });
          // ********************** //
          //================ update Current order balance=======================
          if (isBuyOrder) {
            await Vault.findByIdAndUpdate(
              { _id: currentUser[vaultName] },
              { $inc: { balance: baseAmount / price } },
            );
          } else {
            await currentUser.updateOne({
              $inc: { usdtBalance: baseAmount * price },
            });
          }
          // ********************** //
          const result = oldOrder.remaining - remaining;

          if (result === 0) {
            await oldOrder.updateOne({
              $inc: { remaining: 0, filled: remaining },
              status: 'complete',
            });
            // ********************** //
            //=========================== update old order balance==============================
            const oldUser = await User.findOne({ _id: oldOrder.user });
            if (!isBuyOrder) {
              await oldUser.updateOne({
                $inc: { usdtBalance: oldOrder.baseAmount * price },
              });
            } else {
              await Vault.findByIdAndUpdate(
                { _id: oldUser[vaultName] },
                { $inc: { balance: oldOrder.baseAmount / price } },
              );
            }

            // ********************** //
          } else {
            await oldOrder.updateOne({
              $inc: { remaining: -remaining, filled: remaining },
            });
          }
          // ********************** //
        } else if (oldOrder.remaining < remaining) {
          //================================= filling old order =======================
          // using base amount for sell order and total amount for buy order
          await oldOrder.updateOne({
            remaining: 0,
            filled: oldOrder.isBuyOrder
              ? oldOrder.baseAmount / oldOrder.price // in eth
              : oldOrder.baseAmount, // in eth
            status: 'complete',
          });
          // ********************** //
          //============================= update old order balance==============

          const oldUser = await User.findOne({ _id: oldOrder.user });

          if (!isBuyOrder) {
            await oldUser.updateOne({
              $inc: { usdtBalance: oldOrder.baseAmount * price },
            });
          } else {
            await Vault.findByIdAndUpdate(
              { _id: oldUser[vaultName] },
              { $inc: { balance: oldOrder.baseAmount / price } },
            );
          }

          // ********************** //
          await currentOrder.updateOne({
            $inc: {
              remaining: -oldOrder.remaining,
              filled: oldOrder.remaining,
            },
          });
        }
      }
    }
    console.log(affectedUsers, 'USERS ARRAY LIMIT ');
    return { affectedUsers };
  } catch (error) {
    console.log(error.message);
  }
};

const updateMarketOrder = async (data, currentOrder) => {
  let affectedUsers = [];
  try {
    const { isBuyOrder, currentPrice, user, baseAmount, network } = data;
    const orders = await Order.find({
      isBuyOrder: isBuyOrder ? false : true,
      status: 'pending',
      price: isBuyOrder ? { $gte: currentPrice } : { $lte: currentPrice },
      network,
    }).sort({ price: -1 });

    // console.log('====================================');
    // console.log(orders, 'price sort scheck');
    // console.log('====================================');
    //===================== pushing current user===========
    affectedUsers.push(user);

    const vaultName = network + 'Vault';

    if (orders.length === 0) {
      await currentOrder.updateOne({
        price: currentPrice,
        remaining: isBuyOrder
          ? currentOrder.baseAmount / currentPrice
          : currentOrder.baseAmount,
      });
    }

    const userAccount = await User.findById({ _id: user });

    if (orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        const oldOrder = orders[i];
        //===================== pushing any affected user===========
        affectedUsers.push(oldOrder.user.toString());

        if (i === 0) {
          //=====================Ammount set in ETH formate====================
          const currentRemaining = isBuyOrder
            ? baseAmount / oldOrder.price
            : baseAmount;

          if (oldOrder.remaining >= currentRemaining) {
            // ============================Filling  current order(old order is greater then or equles to current) ============================
            await currentOrder.updateOne({
              remaining: 0,
              filled: currentRemaining,
              status: 'complete',
              price: oldOrder.price,
            });

            // ********************** //

            // ========================update new order balance========================

            if (isBuyOrder) {
              await Vault.findByIdAndUpdate(
                { _id: userAccount[vaultName] },
                { $inc: { balance: baseAmount / oldOrder.price } },
              );
            } else {
              await userAccount.updateOne({
                $inc: { usdtBalance: baseAmount * oldOrder.price },
              });
            }

            // **************************************************************** //
            const result = oldOrder.remaining - currentRemaining;

            if (result === 0 || result.toFixed(1) === 0.0) {
              await oldOrder.updateOne({
                $inc: {
                  remaining: -currentRemaining,
                  filled: currentRemaining,
                },
                status: 'complete',
              });
              // **************************************************************** //

              const oldOrderUser = await User.findById({
                _id: oldOrder.user,
              });
              // ********************** //
              // update old order balance

              if (oldOrder.isBuyOrder) {
                await Vault.findByIdAndUpdate(
                  { _id: oldOrderUser[vaultName] },
                  {
                    $inc: {
                      balance: oldOrder.baseAmount / oldOrder.price,
                    },
                  },
                );
              } else {
                await oldOrderUser.updateOne({
                  $inc: {
                    usdtBalance: oldOrder.baseAmount * oldOrder.price,
                  },
                });
              }

              // **************************************************************** //
            } else {
              await oldOrder.updateOne({
                $inc: {
                  remaining: -currentRemaining,
                  filled: currentRemaining,
                },
              });
            }

            return { affectedUsers: affectedUsers ?? [user] };
          } else if (oldOrder.remaining < currentRemaining) {
            await oldOrder.updateOne({
              remaining: 0,
              $inc: { filled: oldOrder.remaining },
              status: 'complete',
            });

            // ********************** //
            // update old order balance

            const oldOrderUser = await User.findById({
              _id: oldOrder.user,
            });

            if (oldOrder.isBuyOrder) {
              await Vault.findByIdAndUpdate(
                { _id: oldOrderUser[vaultName] },
                {
                  $inc: {
                    balance: oldOrder.baseAmount / oldOrder.price,
                  },
                },
              );
            } else {
              await User.findByIdAndUpdate(
                { _id: oldOrder.user },
                {
                  $inc: {
                    usdtBalance: oldOrder.baseAmount * oldOrder.price,
                  },
                },
              );
            }

            ////////////////////////////////
            await currentOrder.updateOne({
              price: oldOrder.price,
              remaining: currentRemaining - oldOrder.remaining,
              $inc: { filled: oldOrder.remaining },
            });
          }
          //2nd itratioin and onward
        } else if (i !== 0) {
          const freshorders = await Order.findOne({
            _id: currentOrder._id,
          });

          if (oldOrder.remaining >= freshorders.remaining) {
            await freshorders.updateOne({
              remaining: 0,
              $inc: {
                filled: freshorders.remaining,
              },
              status: 'complete',
            });

            // ********************** //
            // update new order balance
            if (isBuyOrder) {
              await Vault.findByIdAndUpdate(
                { _id: userAccount[vaultName] },
                {
                  $inc: {
                    balance: freshorders.baseAmount / oldOrder.price,
                  },
                },
              );
            } else {
              await userAccount.updateOne({
                $inc: {
                  usdtBalance: freshorders.baseAmount * oldOrder.price,
                },
              });
            }
            // **************************************************************** //

            const result = oldOrder.remaining - freshorders.remaining;

            if (result === 0) {
              await oldOrder.updateOne({
                $inc: {
                  remaining: -freshorders.remaining,
                  filled: freshorders.remaining,
                },
                status: 'complete',
              });

              // ********************** //
              // update old order balance
              const oldOrderUser = await User.findById({
                _id: oldOrder.user,
              });

              if (oldOrder.isBuyOrder) {
                await Vault.findByIdAndUpdate(
                  { _id: oldOrderUser[vaultName] },
                  {
                    $inc: {
                      balance: oldOrder.baseAmount / oldOrder.price,
                    },
                  },
                );
              } else {
                await User.findByIdAndUpdate(
                  { _id: oldOrder.user },
                  {
                    $inc: {
                      usdtBalance: oldOrder.baseAmount * oldOrder.price,
                    },
                  },
                );
              }

              // **************************************************************** //
            } else {
              await oldOrder.updateOne({
                $inc: {
                  remaining: -freshorders.remaining,
                  filled: freshorders.remaining,
                },
              });
            }
          } else if (oldOrder.remaining < freshorders.remaining) {
            console.log('set filled a number');
            await oldOrder.updateOne({
              $inc: {
                filled: oldOrder.remaining,
              },
              remaining: 0,
              status: 'complete',
            });

            // ********************** //
            // update old order balance
            const oldOrderUser = await User.findById({
              _id: oldOrder._doc.user,
            });

            if (oldOrder.isBuyOrder) {
              await Vault.findByIdAndUpdate(
                { _id: oldOrderUser[vaultName] },
                {
                  $inc: {
                    balance: oldOrder.baseAmount / oldOrder.price,
                  },
                },
              );
            } else {
              await User.findByIdAndUpdate(
                { _id: oldOrder.user },
                {
                  $inc: {
                    usdtBalance: oldOrder.baseAmount * oldOrder.price,
                  },
                },
              );
            }
            // ********************** //

            await freshorders.updateOne(
              {
                price: oldOrder.price,
                $inc: {
                  remaining: -oldOrder.remaining,
                  filled: oldOrder.remaining,
                },
              },
              { new: true },
            );

            const newfreshorders = await Order.findOne({
              _id: currentOrder._id,
            });

            let percComp =
              (newfreshorders?.filled / newfreshorders.baseAmount) * 100;

            if (percComp > 99) {
              await currentOrder.updateOne({
                remaining: 0,
                status: 'complete',
              });

              // **************************************************************** //
              // update new order balance
              if (isBuyOrder) {
                await Vault.findByIdAndUpdate(
                  { _id: userAccount[vaultName] },
                  {
                    $inc: {
                      balance: newfreshorders.baseAmount / oldOrder.price,
                    },
                  },
                );
              } else {
                await userAccount.updateOne({
                  $inc: {
                    usdtBalance: newfreshorders.baseAmount * oldOrder.price,
                  },
                });
              }

              // **************************************************************** //
            }
          }
        }
      }
    }
    return { affectedUsers: affectedUsers ?? [user] };
  } catch (error) {
    console.log(error.message);
  }
};

export const placeOrder = async (data) => {
  try {
    const { isLimitOrder, user, baseAmount, isBuyOrder, network } = data;

    console.log(
      'isLimitOrder, user, baseAmount, isBuyOrder, network',
      isLimitOrder,
      user,
      baseAmount,
      isBuyOrder,
      network,
    );
    const currentOrder = await Order.create(data);

    // Order.create(data, function (err, result) {
    //   if (err) console.log(err);
    //   else {
    //     console.log(result._doc);
    //     console.log(result._doc.baseAmount);

    //     // The above statement will output the id of the
    //     // inserted object
    //   }
    // });

    const userAccount = await User.findById({ _id: user });

    const vaultName = network + 'Vault';

    if (isBuyOrder) {
      await userAccount.updateOne({ $inc: { usdtBalance: -baseAmount } });
    } else {
      await Vault.findByIdAndUpdate(
        { _id: userAccount[vaultName] },
        { $inc: { balance: -baseAmount } },
      );
    }
    if (isLimitOrder) {
      const { affectedUsers } = await updateLimitOrder(data, currentOrder);
      return { affectedUsers };
    } else {
      const { affectedUsers } = await updateMarketOrder(data, currentOrder);
      return { affectedUsers };
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchAllOrders = async (data) => {
  console.log(data, 'network sjdjsdjcjsdj');
  const buyOrders = await Order.find({
    isBuyOrder: true,
    status: 'pending',
    network: data,
  }).sort({ price: -1 });
  const sellOrders = await Order.find({
    isBuyOrder: false,
    status: 'pending',
    network: data,
  }).sort({ price: -1 });

  return { buyOrders, sellOrders };
};

export const fetchUserOrders = async (id) => {
  const orders = await Order.find({ user: id });
  return { orders };
};

export const getUserOrdersCompleted = async (req, res) => {
  const { network } = req.body;

  if (network) {
    const userOrders = await Order.find({
      user: req.user._id,
      network: network,
      status: 'complete',
    });
    res.status(200).json({ sucess: true, data: userOrders });
  } else {
    const userOrders = await Order.find({
      user: req.user._id,
      status: 'complete',
    });
    res.status(200).json({ sucess: true, data: userOrders });
  }
};

export const getUserOrdersPending = async (req, res) => {
  const userOrders = await Order.find({
    user: req.user._id,
    status: 'pending',
  });
  res.status(200).json({ sucess: true, data: userOrders });
};
