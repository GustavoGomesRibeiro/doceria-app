"use client";

import { FC } from "react";
import {
  Text,
  Button,
  ConditionalRender,
  Placeholder,
} from "@/components/index";

import Image from "next/image";
import { CardProps } from "./card.types";
import useCartStore from "@/app/store/cart.store";
import useToastStore from "@/app/store/toast.store";
import formatterCurrency from "@/app/utils/formatterCurrency";

const Card: FC<CardProps> = ({ produtos, id }) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const { addToast } = useToastStore();

  return (
    <>
      <div className="md:grid md:grid-cols-4 md:gap-4 p-5" id={id}>
        <ConditionalRender condition={Boolean(produtos.length)}>
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="shadow-md shadow-gray-500 mb-5 border-solid border-4 border-black rounded-b-md"
            >
              <div className="bg-gray-500 rounded-tl-lg rounded-tr-lg">
                <Image
                  src={String(produto.img)}
                  placeholder="empty"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </div>
              <div className="flex bg-white p-5 rounded-lg  flex-col justify-between">
                <Text className="font-bold my-2">{produto.titulo}</Text>
                <Text className="text-base mt-5 mb-5">{produto.descricao}</Text>

                <div className="flex justify-between items-center">
                  <Text className="text-[#DB2777] font-bold">
                    {formatterCurrency.format(produto.preco)}
                  </Text>
                  <Button
                    className="bg-[#DB2777] rounded-full p-2 shadow-md shadow-gray-500 hover:transform hover:-translate-y-1.5 transition-transform duration-250 ease-[cubic-bezier(0.3,0.7,0.4,1.5)]"
                    addProduct={() => {
                      addProduct(produto);
                      addToast();
                    }}
                  >
                    <Text className="text-white">Adicionar</Text>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ConditionalRender>
      </div>

      <ConditionalRender condition={produtos.length <= 0}>
        <div className="md:grid md:grid-cols-4 md:gap-4 p-5">
          <div className="p-5">
            <Placeholder />
          </div>
          <div className="p-5">
            <Placeholder />
          </div>
          <div className="p-5">
            <Placeholder />
          </div>
        </div>
      </ConditionalRender>
    </>
  );
};

export default Card;
