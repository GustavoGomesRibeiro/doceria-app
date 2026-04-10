import React from "react";
import { LuInfo } from "react-icons/lu";

interface AlertProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Alert = ({ message, isVisible, onClose }: AlertProps) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => onClose(), 3500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
      <div className="flex items-start gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-xl border border-rose-100">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center mt-0.5">
          <LuInfo size={16} className="text-[#E8547A]" />
        </div>
        <div>
          <p className="font-semibold text-stone-800 text-sm">Importante</p>
          <p className="text-stone-500 text-sm mt-0.5 whitespace-pre-line leading-snug">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-stone-300 hover:text-stone-500 transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
