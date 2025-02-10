"use client";

import { IoIosArrowForward } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { Text, Button, Card, Container, Cart } from "@/components/index";
import Image from "next/image";
import useCartStore from "../store/cart.store";
import { useEffect, useState } from "react";
import useHandleEvent from "./useHandleEvent";
import Toast from "@/components/toast/page";

type Props = {
  id: number;
  documentId?: string;
  titulo: string;
  descricao: string;
  preco: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string;
};

const Home = () => {
  const [produtos, setProdutos] = useState<Props[]>([]);
  const { reduceQuantity } = useHandleEvent();
  const { updateStateCart, openCart } = useCartStore();

  const item = [
    {
      id: 1,
      titulo: "Bolo de Abacaxi com Creme Belga",
      descricao:
        "Massa fofinha com pedaços de abacaxi e um creme belga suave e delicioso.",
      preco: 10,
      img: "/bolo-abacaxi.jpg",
    },
    {
      id: 2,
      titulo: "Bolo de Brigadeiro",
      descricao: "Bolo de chocolate macio com recheio cremoso de brigadeiro.",
      preco: 10,
      img: "/bolo-brigadeiro.jpg",
    },
    {
      id: 3,
      titulo: "Bolo de Ninho com Morango",
      descricao:
        "Creme de leite Ninho combinado com morangos frescos em uma textura leve e equilibrada.",
      preco: 10,
      img: "/bolo-ninho.jpg",
    },
    {
      id: 4,
      titulo: "Bolo de Beijinho",
      descricao:
        "Massa macia com recheio cremoso de coco e um toque de leite condensado.",
      preco: 10,
      img: "/bolo-beijinho.jpg",
    },
    {
      id: 5,
      titulo: "Bolo de Prestígio",
      descricao:
        "Bolo de chocolate com recheio de coco, inspirado no clássico Prestígio.",
      preco: 10,
      img: "/bolo-coco.jpg",
    },
  ];

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // const response: any = await listarProdutos();
        setProdutos(item);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <Container>
      <Toast />
      <header className="flex justify-between bg-white p-10 shadow-md mb-5">
        <div>
          <Image
            src="/logo-semfundo.png"
            placeholder="empty"
            width={150}
            height={150}
            alt="Picture of the author"
          />
        </div>
        <div className="flex justify-center items-center">
          <button className="mr-10" onClick={updateStateCart}>
            <LuShoppingCart size={30} color="#000" />
          </button>
          <label className="absolute top-[80px] bg-[#DB2777] rounded-xl w-6 h-6 flex justify-center items-center">
            <Text className="text-white">{reduceQuantity()}</Text>
          </label>
        </div>
      </header>

      {openCart && <Cart />}
      <main className="flex h-screen flex-col justify-center items-center">
        <div className="justify-center items-center md:p-32 p-10">
          <Text className="font-bold text-3xl">
            Doces artesanais feitos com amor
          </Text>
          <Text className="my-5">
            Descubra nosso deliciosos bolos, tortas e doces artesanais feitos
            com ingredientes selecionados.
          </Text>

          <Button className="bg-[#DB2777] rounded-full p-3 flex justify-center items-center shadow-md shadow-black hover:transform hover:-translate-y-1.5 transition-transform duration-250 ease-[cubic-bezier(0.3,0.7,0.4,1.5)]">
            <a href="#cardapio" className="text-white">
              Ver cardápio
            </a>
            <IoIosArrowForward size={22} color="#fff" />
          </Button>
        </div>

        <div>
          <Image
            src="/logo-1.png"
            placeholder="empty"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </main>

      <main className="bg-[#FFF0E7] h-screen">
        <div className="flex justify-center items-center p-10">
          <Text className="font-bold text-3xl">Nosso cardapio</Text>
        </div>

        <Card produtos={produtos} id="cardapio" />
      </main>
    </Container>
  );
};

export default Home;
