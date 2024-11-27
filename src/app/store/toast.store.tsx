import { create } from "zustand";

type ToastState = {
  toasts: string[];
  addToast: () => void;
  removeToast: (id: string) => void;
};

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: () => {
    const newToastId = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, newToastId],
    }));
  },
  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toastId) => toastId !== id),
    }));
  },
}));

export default useToastStore;
