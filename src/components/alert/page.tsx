import React from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Alert = ({ message, isVisible, onClose }: ToastProps) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2  flex w-3/4 h-24 overflow-hidden bg-white shadow-lg max-w-96 rounded-xl">
      <svg width="16" height="96" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 8 0 
               Q 4 4.8, 8 9.6 
               T 8 19.2 
               Q 4 24, 8 28.8 
               T 8 38.4 
               Q 4 43.2, 8 48 
               T 8 57.6 
               Q 4 62.4, 8 67.2 
               T 8 76.8 
               Q 4 81.6, 8 86.4 
               T 8 96 
               L 0 96 
               L 0 0 
               Z"
          fill="#500E00"
          stroke="#500E00"
          stroke-width="2"
          stroke-linecap="round"
        ></path>
      </svg>
      <div className="mx-2.5 overflow-hidden w-full">
        <p className="mt-1.5 text-xl font-bold text-[#500E00] leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
          Importante!
        </p>
        <p className="overflow-hidden leading-5 break-all text-zinc-400 max-h-10 whitespace-pre-line">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Alert;
