import { useState, useEffect, useCallback, useMemo } from "react";

import { config } from "@/features/wallet-connect-config";
import {
  fetchTokensPrice,
  fetchGasPrice,
  generateSwapCalldata,
} from "@/features/one-inch/tokens";
import { useDebouncedCallback } from "use-debounce";
import Icon from "../icon";

interface GasPriceProps {
  ethPrice: any;
  gasPrice: any;
  quoteGasPrice: any;
}

const GasPrice: React.FC<GasPriceProps> = ({
  ethPrice,
  gasPrice,
  quoteGasPrice,
}) => {
  const [calldata, setCalldata] = useState<any>(null);

  function calculateGasFeeInUsd(
    maxFeePerGas: any,
    gasLimit: any,
    ethPriceInUsd: any
  ) {
    if (maxFeePerGas && gasLimit) {
      const totalGasFeeInWei = BigInt(maxFeePerGas) * BigInt(gasLimit);
      const gasFeeInEth = Number(totalGasFeeInWei) / 1e18;
      const gasFeeInUsd = gasFeeInEth * ethPriceInUsd;
      return gasFeeInUsd;
    } else return 0;
  }

  return (
    <div className="text-slate-100 leading-none">
      <div className="flex flex-row items-center gap-1.5">
        <Icon name={"gasIcon"} />
        <div>
          ${calculateGasFeeInUsd(gasPrice, quoteGasPrice, ethPrice).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default GasPrice;
