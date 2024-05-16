interface ChangeOrderBtnProps {
  callback: () => void;
}

const ChangeOrderBtn: React.FC<ChangeOrderBtnProps> = ({ callback }) => {
  return (
    <button
      onClick={callback}
      className="
          border-4
          border-slate-900
          flex 
          items-center 
          justify-center 
          bg-blue-950 
          hover:bg-slate-800 
          active:bg-slate-700 
          text-white 
          font-bold 
          rounded-lg 
          w-10 h-10 
          absolute 
          transform 
          -translate-x-1/2 
          -translate-y-1/2 
          top-1/2 
          left-1/2"
      aria-label="Swap tokens"
    >
      ⇄
    </button>
  );
};

export default ChangeOrderBtn;
