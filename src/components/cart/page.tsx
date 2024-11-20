import { FC, useCallback } from "react";
import { FaTrashCan } from "react-icons/fa6";
import Image from "next/image";
import useCartStore from "@/app/store/cart.store";

const Cart: FC = () => {
  const {
    total,
    cart,
    decreaseProductQuantity,
    incrementProductQuantity,
    removeProduct,
  } = useCartStore();

  const reduceQuantity = useCallback(() => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [cart]);

  return (
    <div className="w-96 h-screen absolute bg-[#F5F5F5] right-0">
      <header>
        <p>Sacola</p>
      </header>

      <div className="w-full p-5">
        {cart.map((item) => (
          <div key={item.id} className="bg-gray-600 h-28 rounded-xl mb-5 flex">
            <div className="h-24 m-4 flex items-center justify-center">
              <Image
                src="/400.png"
                placeholder="empty"
                width={100}
                height={100}
                alt="Picture of the author"
                className="h-24 self-center p-1"
              />
            </div>

            <main className="w-56">
              <div className="flex justify-between p-2">
                <div>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
                <div className="mr-2">
                  <button onClick={() => removeProduct(item.id)}>
                    <FaTrashCan size={20} color="#fff" />
                  </button>
                </div>
              </div>
              <footer className="p-1">
                <button onClick={() => decreaseProductQuantity(item.id)}>
                  -
                </button>
                {item.quantity}
                <button onClick={() => incrementProductQuantity(item.id)}>
                  +
                </button>
              </footer>
            </main>
          </div>
        ))}
      </div>

      {cart.length ? (
        <footer className="">
          <div>Quantidade de items {reduceQuantity()}</div>
          <div>Total a pagar R$ {total}</div>
        </footer>
      ) : null}
    </div>
  );
};

export default Cart;
