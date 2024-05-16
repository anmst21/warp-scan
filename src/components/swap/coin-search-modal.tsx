import Input from "../input";
import Token from "./token-Item";
import { useState, useEffect } from "react";
import { fetchTokens } from "@/features/one-inch/tokens";
import { useDebouncedCallback } from "use-debounce";
import Icon from "../icon";

interface CoinSearchModalProps {
  setChoiceToken: (value: any) => void;
  closeModal: () => void;
}

const CoinSearchModal: React.FC<CoinSearchModalProps> = ({
  setChoiceToken,
  closeModal,
}) => {
  const [tokenData, setTokenData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);

  const fetchTokenData = useDebouncedCallback(async (value?: string) => {
    const data = await fetchTokens(value);
    setTokenData(data);
  }, 300);

  useEffect(() => {
    fetchTokenData(inputValue);
  }, [inputValue]);
  useEffect(() => {
    fetchTokenData();
  }, []);

  return (
    <div className="flex gap-5 flex-col w-64 h-[300px] bg-slate-900 text-gray-50 p-7 py-10 pt-7 rounded-md absolute left-[102%] top-0">
      <div
        onClick={() => closeModal()}
        className="absolute right-5 top-5 text-slate-600 hover:text-slate-500 active:text-slate-400 cursor-pointer"
      >
        <Icon name="x" />
      </div>
      <Input
        inputValue={inputValue}
        setInputValue={(value: string) => setInputValue(value)}
      />
      <div className="overflow-y-scroll flex gap-5 flex-col">
        {tokenData &&
          tokenData.length !== 0 &&
          tokenData.map((token: any) => {
            return (
              <Token
                key={token.address}
                token={token}
                setChoiceToken={(token: any) => setChoiceToken(token)}
              />
            );
          })}
      </div>
    </div>
  );
};
export default CoinSearchModal;
