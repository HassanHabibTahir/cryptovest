import axios from 'axios';

export const getApiData = async () => {
  const apiKey = process.env.COIN_MARKET_CAP_APIKEY;
  // const symbol = `${baseToken},${qouteToken}`;
  // console.log(symbol);

  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
  const params = {
    // symbol: symbol,
    // start: '0',
    limit: '20',
    convert: 'USD',
  };

  const headers = {
    'X-CMC_PRO_API_KEY': apiKey,
  };
  const {
    data: { data },
  } = await axios.get(url, { params, headers });

  const filetrdData = data?.filter((data) =>
    ['BTC', 'ETH', 'SOL'].includes(data.symbol?.toUpperCase()),
  );
  console.log('====================================');
  console.log(filetrdData);
  console.log('====================================');
  let responceData = [];
  filetrdData?.forEach((data) => {
    let objToPush = {
      symbol: data?.symbol,
      price: data?.quote.USD?.price,
      volume: data?.quote.USD?.volume_24h,
      chnage24h: data?.quote.USD?.volume_change_24h,
      marketCap: data?.quote.USD?.market_cap,
    };
    // console.log(objToPush);
    responceData.push(objToPush);
  });

  return responceData;
  // res.status(200).json(responceData);
};

export const marketCapData = async (req, res) => {
  const data = await getApiData();
  res.status(200).json({ sucess: true, data: data });
};
