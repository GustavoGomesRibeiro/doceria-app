"use client";

import { IoIosArrowForward } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { Text, Button, Card, Container, Cart } from "@/components/index";
import Image from "next/image";
import useCartStore from "../store/cart.store";
import { useEffect, useState } from "react";
import useHandleEvent from "./useHandleEvent";
import Toast from "@/components/toast/page";
import item from "../settings/bolos";

type Props = {
  id: number;
  documentId?: string;
  titulo: string;
  descricao: string;
  kg: boolean;
  img?: string;
  aviso?: string;
  tipo: string;
  preco: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string;
};

const Home = () => {
  const [produtos, setProdutos] = useState<Props[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(
    "bolo caseiro"
  );
  const { reduceQuantity } = useHandleEvent();
  const { updateStateCart, openCart } = useCartStore();

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

  const filtrarProdutos = (tipo: string) => {
    setTipoSelecionado(tipo);
  };

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
        <div className="bg-[#fff] flex justify-center items-center h-48 shadow-md">
          <div className="flex flex-col sm:flex-row">
            <button
              onClick={() => filtrarProdutos("bolo caseiro")}
              className={`shadow-md shadow-black h-11 p-3 text-white m-2 bg-[#500E00] rounded-xl ${
                tipoSelecionado === "bolo caseiro"
                  ? "transform -translate-y-1.5"
                  : "hover:transform hover:-translate-y-1.5"
              } transition-transform duration-250 ease-[cubic-bezier(0.3,0.7,0.4,1.5)]`}
            >
              Bolos de Pote
            </button>
            <button
              onClick={() => filtrarProdutos("bolo branco")}
              className={`shadow-md shadow-black h-11 p-3 text-white m-2 bg-[#500E00] rounded-xl  ${
                tipoSelecionado === "bolo branco"
                  ? "transform -translate-y-1.5"
                  : "hover:transform hover:-translate-y-1.5"
              } transition-transform duration-250 ease-[cubic-bezier(0.3,0.7,0.4,1.5)]`}
            >
              Bolos Brancos
            </button>
            <button
              onClick={() => filtrarProdutos("bolo chocolate")}
              className={`shadow-md shadow-black h-11 p-3 text-white m-2 bg-[#500E00] rounded-xl  ${
                tipoSelecionado === "bolo chocolate"
                  ? "transform -translate-y-1.5"
                  : "hover:transform hover:-translate-y-1.5"
              } transition-transform duration-250 ease-[cubic-bezier(0.3,0.7,0.4,1.5)]`}
            >
              Bolos de Chocolate
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center p-10">
          <Text className="font-bold text-3xl">Nosso cardapio</Text>
        </div>

        <div className="p-5 bg-[#fff] md:m-5 m-6 rounded-xl border-solid border-2 border-black">
          {tipoSelecionado !== "bolo caseiro" ? (
            <>
              <Text className="font-bold text-[#000] my-1">
                Importante, faça sua encomenda com 2 dias de antecedência.
              </Text>
            </>
          ) : (
            <Text className="font-bold text-[#000] my-1">
              Favor verificar disponibilidade dos sabores.
            </Text>
          )}
        </div>

        <div className="flex justify-center items-center">
          <Card
            produtos={
              tipoSelecionado
                ? produtos.filter((produto) => produto.tipo === tipoSelecionado)
                : produtos
            }
            id="cardapio"
          />
        </div>
      </main>
    </Container>
  );
};

export default Home;
