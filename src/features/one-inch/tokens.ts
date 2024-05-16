"use server";

import { oneInchApi } from "@/axios/oneInchApi";

const chainId = 1;
const limit = 10;
const onlyPositiveRating = true;

const addresses = [
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", //tether
  "0xdAC17F958D2ee523a2206206994597C13D831ec7", //tether
  "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", //bnb
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", //usdc
  "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", //stETH
  "0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1", //tonCoin
];

const fetchTokens = async (query?: string) => {
  try {
    let tokens;
    if (!query || query?.length === 0) {
      const { data } = await oneInchApi.get(
        "/token/v1.2/1/custom" + `?addresses=${addresses}`
      );
      tokens = Object.values(data);
    } else {
      const { data } = await oneInchApi.get(
        "/token/v1.2/1/search" +
          `?chain_id=${chainId}&query=${query}&only_positive_rating=${onlyPositiveRating}&limit=${limit}`
      );
      tokens = data;
    }
    return tokens;
  } catch (err) {
    // console.error(err);
  }
};
//0xdAC17F958D2ee523a2206206994597C13D831ec7 0xb8c77482e45f1f44de1745f52c74426c631bdd52
const fetchTokensPrice = async (tokens: string[]) => {
  try {
    const { data } = await oneInchApi.post("/price/v1.1/1", {
      tokens,
      currency: "USD",
    });

    return data;
  } catch (err) {
    //  console.error(err);
  }
};
const fetchGasPrice = async () => {
  try {
    const { data } = await oneInchApi.get("/gas-price/v1.5/1");
    console.log("gasPrice", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

type SwapCalldataProps = {
  src: string;
  dst: string;
  amount: string;
  from: string;
  gasPrice: string;
};

const generateSwapCalldata = async ({
  src,
  dst,
  amount,
  gasPrice,
  from,
}: SwapCalldataProps) => {
  const fee = "1";
  const include = "true";
  const gasLimit = "100000";

  const params = {
    src,
    dst,
    amount,
    fee,
    gasPrice,
    gasLimit,
    includeTokensInfo: include,
    includeGas: include,
  };
  const queryParams = new URLSearchParams(params);
  try {
    const { data } = await oneInchApi.get(
      "/swap/v6.0/1/quote" + `?${queryParams}`
    );

    return data;
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
};

//0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

//https://api.1inch.dev/gas-price/v1.4/1 to get gas price

//
// https://api.1inch.dev/swap/v6.0/{chain}/swap

export { fetchTokens, fetchTokensPrice, generateSwapCalldata, fetchGasPrice };
