import { useCallback } from "react";
import useCartStore from "../store/cart.store";

const useHandleEvent = () => {
  const { cart } = useCartStore();

  const reduceQuantity = useCallback(() => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [cart]);

  return {
    reduceQuantity,
  };
};

export default useHandleEvent;
