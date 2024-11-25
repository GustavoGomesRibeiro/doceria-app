import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { ConditionalRender, Text } from "@/components/index";

import { FaTrashCan } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import useCartStore from "@/app/store/cart.store";

const Cart: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    total,
    cart,
    decreaseProductQuantity,
    incrementProductQuantity,
    removeProduct,
    updateStateCart,
  } = useCartStore();

  const reduceQuantity = useCallback(() => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [cart]);

  const itemsToSend = useMemo(() => {
    return cart.map((item) => {
      return `${item.quantity} ${item.name}`;
    });
  }, [cart]);

  const message = `Olá, gostaria de pedir: ${itemsToSend}`;

  const sendWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=55${11984652404}&text=${message}`
    );
  };

  useEffect(() => {
    const handleClickOutSideComponent = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        updateStateCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutSideComponent);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSideComponent);
    };
  }, [updateStateCart]);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="relative z-10 flex flex-col justify-between w-96 h-screen bg-[#F5F5F5] ml-auto border-solid border-2 border-black">
        <header className=" h-16 bg-white shadow-md flex justify-between items-center border-solid border-b-2 border-black p-5">
          <div></div>
          <p className="font-bold">Sacola</p>
          <button onClick={updateStateCart} className="font-bold">
            <IoClose size={24} color="#000" />
          </button>
        </header>

        <div className="w-full h-full p-5">
          <ConditionalRender condition={Boolean(cart.length)}>
            {cart.map((item) => (
              <div key={item.id}>
                <div className="h-28 rounded-xl mb-5 flex">
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
              </div>
            ))}
          </ConditionalRender>

          <ConditionalRender condition={cart.length === 0}>
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/carrinho-vazio.png"
                placeholder="empty"
                width={250}
                height={250}
                alt="Picture of the empty cart"
                className="self-center p-1"
              />
              <Text className="text-center font-bold text-gray-500">
                Você não possui produto na sua sacola.
              </Text>
            </div>
          </ConditionalRender>
        </div>

        {cart.length ? (
          <footer className="flex flex-col justify-center items-center bg-white h-36 border-solid border-t-2 border-black p-5">
            <div>
              <Text className="font-bold">
                Items no carrinho: {reduceQuantity()}
              </Text>
            </div>
            <div>Total a pagar R$ {total}</div>
            <button
              onClick={sendWhatsapp}
              className="bg-black rounded-full p-3 mt-3 w-36 shadow-md shadow-black hover:transform hover:-translate-y-1.5 transition-transform duration-250 ease-[cubic-bezier(0.3,0.7,0.4,1.5)]"
            >
              <Text className="text-white">Pedir</Text>
            </button>
          </footer>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
