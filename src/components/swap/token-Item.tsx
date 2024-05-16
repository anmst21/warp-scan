"use client";
import Image from "next/image";
import { useRef } from "react";
import Icon from "../icon";

interface TokenProps {
  token: any | null;
  setChoiceToken?: (token: any) => void;
}

const Token: React.FC<TokenProps> = ({ token, setChoiceToken }) => {
  const imageRef = useRef<any>(null);

  const skeleton = (
    <>
      <div className="bg-slate-500 w-[25px] h-[25px] bg-slate-800 rounded-full" />

      <div className="h-[16px] w-10 bg-slate-800 rounded-md ml-1.5 mr-1" />
      <div className="w-[24] h-[24]" />
    </>
  );

  return (
    <div
      className="flex items-center cursor-pointer w-full bg-slate-900 p-1 pr-2 rounded-full justify-between h-[33px] min-w-24"
      onClick={() => setChoiceToken && setChoiceToken(token)}
    >
      {token && (
        <>
          <div className="flex items-center">
            <Image
              ref={imageRef}
              onError={() =>
                (imageRef.current.src =
                  "https://cryptoiconsstorage.blob.core.windows.net/crypto-icons/gear.svg")
              }
              src={token.logoURI}
              alt="Token Logo"
              className="text-red-200"
              width={25}
              height={25}
            />
            <span className="font-medium text-base leading-none ml-1.5 mr-1">
              {token.symbol}
            </span>
          </div>
          <div className="text-slate-300">
            <Icon name="chevDown" />
          </div>
        </>
      )}
    </div>
  );
};

export default Token;
