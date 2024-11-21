import { FC, useCallback } from "react";
import { Text } from "@/components/index";

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
    <div className="flex flex-col justify-between w-96 h-screen absolute bg-[#F5F5F5] right-0 top-[200px] border-solid border-2 border-black">
      <header className="h-16 bg-white shadow-md flex justify-center items-center border-solid border-b-2 border-black">
        <p className="font-bold">Sacola</p>
      </header>

      <div className="w-full p-5 ">
        {cart.map((item) => (
          <>
            <div key={item.id} className=" h-28 rounded-xl mb-5 flex">
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
                    <Text className="font-bold">{item.name}</Text>
                    <Text className="font-bold">R$ {item.price}</Text>
                  </div>
                  <div className="mr-2">
                    <button onClick={() => removeProduct(item.id)}>
                      <FaTrashCan size={18} color="#000" />
                    </button>
                  </div>
                </div>
                <div className="p-1 mr-2 rounded-lg border-solid border-2 border-black bg-white flex justify-between">
                  <button
                    className="ml-1 mr-1"
                    onClick={() => decreaseProductQuantity(item.id)}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="ml-1 mr-1"
                    onClick={() => incrementProductQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </main>
            </div>

            <div className="border-solid border-[1px] border-gray-400" />
          </>
        ))}
      </div>

      {cart.length ? (
        <footer className="flex flex-col justify-center items-center bg-white h-20 border-solid border-t-2 border-black">
          <div>
            <Text className="font-bold">
              Items no carrinho {reduceQuantity()}
            </Text>
          </div>
          <div>Total a pagar R$ {total}</div>
        </footer>
      ) : null}
    </div>
  );
};

export default Cart;
