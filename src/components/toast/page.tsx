import useToastStore from "@/app/store/toast.store";
import React, { useState } from "react";
import { LuShoppingBag, LuX } from "react-icons/lu";

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToastStore();
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toastId) => (
        <ToastNotification
          key={toastId}
          onClose={() => removeToast(toastId)}
        />
      ))}
    </div>
  );
};

const ToastNotification: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 bg-white border border-rose-100 rounded-2xl px-4 py-3 shadow-lg transition-all duration-400 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2"
      }`}
      role="alert"
    >
      <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
        <LuShoppingBag size={15} className="text-[#E8547A]" />
      </div>
      <span className="text-sm font-semibold text-stone-700">
        Adicionado à sacola!
      </span>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className="ml-1 text-stone-300 hover:text-stone-500 transition-colors"
      >
        <LuX size={14} />
      </button>
    </div>
  );
};

export default Toast;
