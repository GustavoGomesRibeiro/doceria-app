"use client";

import { FC } from "react";
import { Text, Button } from "@/components/index";

import Image from "next/image";
import { CardProps } from "./card.types";
import useCartStore from "@/app/store/cart.store";

const Card: FC<CardProps> = ({ produtos }) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const cart = useCartStore((state) => state.cart);

  console.log(cart, "cart");
  return (
    <div className="md:grid md:grid-cols-4 md:gap-4 p-5">
      {produtos.map((produto) => (
        <div key={produto.id} className="shadow-md mb-5">
          <div className="bg-gray-500 rounded-tl-lg rounded-tr-lg">
            <Image
              src="/400.png"
              placeholder="empty"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
          <div className="flex bg-white p-5 rounded-lg h-40 flex-col justify-between">
            <Text className="font-bold my-2">{produto.name}</Text>
            <Text className="text-base">{produto.description}</Text>

            <div className="flex justify-between items-center">
              <Text className="text-[#DB2777] font-bold">
                R$ {produto.price}
              </Text>
              <Button
                className="bg-[#DB2777] rounded-full p-2"
                addProduct={() => addProduct(produto)}
              >
                <Text className="text-white">Adicionar</Text>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
