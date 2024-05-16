import React from "react";
import SwapInput from "./swap-input";

interface SwapItemWrapperProps {
  children: React.ReactNode;
  fromTokenBalance: any;
  fromTokenPrice: string | number;
  ammount: string | number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const SwapItemWrapper: React.FC<SwapItemWrapperProps> = ({
  children,
  fromTokenBalance,
  fromTokenPrice,
  ammount,
  handleInputChange,
  type,
}) => {
  return (
    <div className="flex justify-center bg-blue-950 h-32 p-4 rounded-2xl w-full">
      <div className="w-full flex flex-col justify-between">
        <span className="font-light text-base text-slate-100">You {type}</span>
        <div className="flex  justify-between">
          <div>
            <SwapInput value={ammount} onChange={handleInputChange} />
          </div>
          <div>{children}</div>
        </div>
        <div className="flex w-full justify-between text-slate-400 h-[24px]">
          <span>{fromTokenPrice}</span>
          <span className="text-slate-500">
            {fromTokenBalance && `Balance: ${String(fromTokenBalance?.value)}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SwapItemWrapper;
