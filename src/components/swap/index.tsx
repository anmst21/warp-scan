"use client";

import { useGasPrice } from "wagmi";
import { mainnet } from "wagmi/chains";
import { useState, useEffect, useCallback, useMemo } from "react";
import SelectSwapToken from "./select-swap-token";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  fetchTokensPrice,
  generateSwapCalldata,
} from "@/features/one-inch/tokens";
import { formatCoinPrice } from "@/utils/format-value";
import GasPrice from "./gas-price";
import { getBalance } from "@wagmi/core";
import { config } from "@/features/wallet-connect-config";
import { useAccount } from "wagmi";
import { useDebouncedCallback } from "use-debounce";
import SwapInput from "./swap-input";
import SwapItemWrapper from "./swap-item-wrapper";
import ChangeOrderBtn from "./change-order-btn";

import { parseEther } from "viem";

export type CalldataPriceProps = {
  src: string;
  dst: string;
  amount: string;
  from: string;
  gasPrice: string;
};

const Swap: React.FC = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const [fromChoiceToken, setFromChoiceToken] = useState<any>(null);
  const [toChoiceToken, setToChoiceToken] = useState<any>(null);

  const [fromTokenBalance, setFromTokenBalance] = useState<any>(null);
  const [toTokenBalance, setToTokenBalance] = useState<any>(null);

  const [tokenPrice, setTokenPrice] = useState<any>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  console.log("tokenPrice", tokenPrice);
  const [ethPrice, setEthPrice] = useState<any>(null);

  const { data: gasPrice } = useGasPrice({
    chainId: mainnet.id,
  });

  const [swapQuote, setSwapQuote] = useState<any>(null);
  const ammount = searchParams.get("ammount") || "0";
  console.log("swapQuote", swapQuote);
  const getCalldataPrice = useCallback(
    async (
      src: string,
      dst: string,
      amount: string,
      from: string,
      gasPrice: string
    ) => {
      try {
        const quote = await generateSwapCalldata({
          src,
          dst,
          amount,
          from,
          gasPrice,
        });
        console.log("swappriceq", src, dst, amount, from, gasPrice);
        setSwapQuote(quote);
      } catch (err) {
        console.error(err);
      }
    },
    [setSwapQuote]
  );

  // const debouncedQuote = useDebouncedCallback(
  //   (gas) => getCalldataPrice(gas),
  //   2000
  // );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (fromChoiceToken && toChoiceToken && ammount && address && gasPrice) {
        getCalldataPrice(
          fromChoiceToken.address,
          toChoiceToken.address,
          String(parseEther(ammount)),
          String(address),
          String(gasPrice)
        );
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [fromChoiceToken, toChoiceToken, ammount, address, gasPrice]);

  const getEthPrice = async () => {
    try {
      const ethAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
      const price = await fetchTokensPrice([ethAddress]);
      setEthPrice(price[ethAddress]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getEthPrice();
  }, []);

  const getTokenBalance = useCallback(
    async (token: any) => {
      const tokenAddress = token.address;
      if (address) {
        try {
          const balance = await getBalance(config, {
            address: address,
            token: tokenAddress,
          });
          return balance;
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        }
      } else {
        console.log("Address is not defined");
      }
    },
    [address]
  );

  const fetchTokenData = useCallback(async () => {
    if (fromChoiceToken || toChoiceToken) {
      await getTokenPrice(fromChoiceToken, toChoiceToken);
    }
    if (fromChoiceToken) {
      const balance = await getTokenBalance(fromChoiceToken);
      setFromTokenBalance(balance);
    }
    if (toChoiceToken) {
      const balance = await getTokenBalance(toChoiceToken);
      setToTokenBalance(balance);
    }
  }, [fromChoiceToken, toChoiceToken, getTokenBalance]);
  // Call the function to fetch and log the balance

  const getTokenPrice = useCallback(async (from: any, to: any) => {
    if (!from && !to) return;
    let addresses = [];

    from && addresses.push(from.address);
    to && addresses.push(to.address);
    const price = await fetchTokensPrice(addresses);
    console.log(price);
    setTokenPrice(price);
  }, []);

  const debouncedGetTokenPrice = useDebouncedCallback(
    () => getTokenPrice(fromChoiceToken, toChoiceToken),
    3000
  );

  useEffect(() => {
    const timer1 = setTimeout(() => {
      getTokenPrice(fromChoiceToken, toChoiceToken);
    }, 1000);

    const timer2 = setTimeout(() => {
      fetchTokenData();
    }, 2000);

    return () => {
      clearTimeout(timer1), clearTimeout(timer2);
    };
  }, [fromChoiceToken, toChoiceToken]);

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("ammount", term);
    } else {
      params.delete("ammount");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const handleSwapTokens = () => {
    // Swap the tokens by exchanging their states
    setFromChoiceToken(toChoiceToken);
    setToChoiceToken(fromChoiceToken);
  };

  function formatNumber(num: number) {
    if (Math.abs(num) < 0.0001 && num !== 0) {
      return num.toPrecision(1); // Adjust the number of significant figures as needed
    }

    return num.toFixed(4); // Format the number to 4 decimal places
  }
  const priceRatio = useMemo(() => {
    if (fromChoiceToken && toChoiceToken && tokenPrice) {
      return (
        <div className="text-slate-200 font-light text-sm leading-none">
          {`1 ${toChoiceToken.symbol} = ${formatNumber(
            tokenPrice[toChoiceToken.address] /
              tokenPrice[fromChoiceToken.address]
          )} ${fromChoiceToken.symbol}
          ($${
            tokenPrice &&
            parseFloat(tokenPrice[toChoiceToken.address])?.toFixed(2)
          })`}
        </div>
      );
    }
  }, [fromChoiceToken, toChoiceToken, tokenPrice]);

  const fromTokenPrice =
    tokenPrice &&
    !isNaN(tokenPrice[fromChoiceToken.address]) &&
    !isNaN(parseFloat(ammount)) &&
    `$${formatNumber(
      tokenPrice[fromChoiceToken.address] * parseFloat(ammount)
    )}`;

  const toTokenPrice =
    tokenPrice &&
    !isNaN(tokenPrice[fromChoiceToken.address]) &&
    !isNaN(tokenPrice[toChoiceToken?.address]) &&
    `$${formatNumber(
      ((parseFloat(tokenPrice[toChoiceToken?.address]) *
        (parseFloat(ammount) * tokenPrice[fromChoiceToken?.address])) /
        tokenPrice[toChoiceToken?.address]) *
        0.99
    )}`;

  const toSwapInputValue = tokenPrice
    ? formatNumber(
        ((parseFloat(ammount) * tokenPrice[fromChoiceToken?.address]) /
          tokenPrice[toChoiceToken?.address]) *
          0.99
      )
    : 0;

  function applyDecimals(amount: string, decimals: number) {
    const num = parseInt(amount, 10); // Convert string to integer
    const divisor = Math.pow(10, decimals); // Calculate divisor
    return num / divisor; // Apply decimals
  }

  return (
    <div className="flex gap-1 flex-col  max-w-xl w-full rounded-md relative ">
      <span className="text-slate-200 text-6xl mb-4">Swap</span>
      <SwapItemWrapper
        fromTokenBalance={fromTokenBalance}
        ammount={ammount}
        handleInputChange={handleInputChange}
        fromTokenPrice={fromTokenPrice}
        type="Pay"
      >
        <SelectSwapToken
          choiceToken={fromChoiceToken}
          setChoiceToken={(value: any) => setFromChoiceToken(value)}
          type="From"
        />
      </SwapItemWrapper>
      <div className="relative flex items-center justify-center">
        <ChangeOrderBtn callback={() => handleSwapTokens()} />
      </div>
      <div className="flex flex-col gap-2 ">
        <SwapItemWrapper
          type="Recieve"
          fromTokenBalance={toTokenBalance}
          ammount={toSwapInputValue}
          handleInputChange={() => {}}
          fromTokenPrice={
            applyDecimals(swapQuote?.dstAmount, swapQuote?.dstToken.decimals) ||
            ""
          }
        >
          <SelectSwapToken
            choiceToken={toChoiceToken}
            setChoiceToken={(value: any) => setToChoiceToken(value)}
            type="To"
          />
        </SwapItemWrapper>
      </div>
      <button className="mt-1 bg-slate-900 text-slate-700 font-medium text-2xl py-5 rounded-2xl leading-none">
        Swap
      </button>
      <div className="flex w-ful justify-between flex-row items-center leading-none mt-1.5 h-5">
        {priceRatio}
        {swapQuote && ethPrice && swapQuote && (
          <GasPrice
            quoteGasPrice={swapQuote.gas}
            gasPrice={gasPrice}
            ethPrice={ethPrice}
          />
        )}
      </div>
    </div>
  );
};

export default Swap;
