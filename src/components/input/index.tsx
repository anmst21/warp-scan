import React from "react";

interface InputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  placeholder?: string; // Making placeholder an optional prop
}

const Input: React.FC<InputProps> = ({
  inputValue,
  setInputValue,
  placeholder = "Enter Ticker...", // Default placeholder if none is provided
}) => {
  // Handler for the input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <span className="text-sm">Search</span>
      <input
        value={inputValue}
        onChange={handleInputChange} // Handling changes
        className="mt-0.5 w-full bg-transparent rounded-md border-2 h-[38px] pl-2 font-light text-sm border-slate-700 input-no-focus-outline input-no-spin"
        type="text"
        placeholder={placeholder}
        aria-label="Search Input" // Accessibility improvement
      />
    </div>
  );
};

export default Input;
