"use client";
import { useState, useEffect, useRef } from "react";
import Token from "./token-Item";
import CoinSearchModal from "./coin-search-modal";

interface SelectSwapTokenProps {
  choiceToken: any;
  setChoiceToken: (value: any) => void;
  type: string;
}

const SelectSwapToken: React.FC<SelectSwapTokenProps> = ({
  choiceToken,
  setChoiceToken,
  type,
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const modalRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // If the modal is open and the click is outside the modal content, close the modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpenModal(!isOpenModal); // Call the onClose handler passed as a prop
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenModal, setIsOpenModal]);
  return (
    <div className="flex flex-col text-gray-50 flex-1">
      <div onClick={() => setIsOpenModal(!isOpenModal)}>
        <Token token={choiceToken} />
      </div>
      {isOpenModal && (
        <div ref={modalRef}>
          <CoinSearchModal
            setChoiceToken={(value) => {
              setChoiceToken(value);
              setIsOpenModal(false);
            }}
            closeModal={() => setIsOpenModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SelectSwapToken;
