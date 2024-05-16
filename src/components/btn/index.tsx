import React from "react";
import Icon from "../icon";

interface ButtonProps {
  name: string;
  content?: string;
  callback: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, content, callback }) => {
  switch (name) {
    case "warpcast":
      return (
        <button className="bg-violet-100 hover:bg-violet-200 active:bg-violet-300 font-medium flex gap-2 justify-center items-center px-3 py-2 bg-slate-100 rounded-md text-[#472A91]">
          {content}
          <Icon name="warpcast" />
        </button>
      );
  }
};

export default Button;
