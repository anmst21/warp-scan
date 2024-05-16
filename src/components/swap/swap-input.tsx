import React from "react";

interface SwapInputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SwapInput: React.FC<SwapInputProps> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="text-slate-200 font-medium  bg-transparent input-no-focus-outline input-no-spin text-4xl"
      type="number"
      placeholder="0"
    />
  );
};

export default SwapInput;
