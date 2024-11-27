import useToastStore from "@/app/store/toast.store";
import React, { useState } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToastStore();
  return (
    <div>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toastId) => (
          <ToastNotification
            key={toastId}
            onClose={() => removeToast(toastId)}
          />
        ))}
      </div>
    </div>
  );
};

const ToastNotification: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        flex items-center w-full max-w-xs p-4 space-x-4 
        text-gray-500 bg-white divide-x divide-gray-200 
        rounded-lg shadow dark:text-gray-400 
        dark:divide-gray-700 dark:bg-gray-800
        transition-all duration-500 ease-in-out
        ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }
      `}
      role="alert"
    >
      <MdShoppingCartCheckout size={24} color="#fff" />
      <div className="ps-4 text-sm font-normal text-white">
        Item adicionado no carrinho!
      </div>

      <button
        onClick={() => {
          setIsVisible(false);
          onClose();
        }}
        className="ml-auto text-gray-400 hover:text-gray-900"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
