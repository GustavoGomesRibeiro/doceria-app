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
import Alert from "@/components/alert/page";
import { Opcoes } from "@/components/Opcoes/page";

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
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState(false);

  const [produtos, setProdutos] = useState<Props[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
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

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  const handleToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const filtrarProdutos = (tipo: string) => {
    setTipoSelecionado(tipo);

    if (tipo === "bolo branco" || tipo === "bolo chocolate") {
      handleToast("Faça sua encomenda com 2\ndias de antecedência.");
    } else if (tipo === "bolo caseiro") {
      handleToast("Favor verificar disponibilidade dos sabores.");
    }
  };

  const dataOpcoes = [
    {
      id: 1,
      value: "bolo caseiro",
      title: "Bolos de Pote",
    },
    {
      id: 2,
      value: "bolo branco",
      title: "Bolos Brancos",
    },
    {
      id: 3,
      value: "bolo chocolate",
      title: "Bolos de Chocolate",
    },
    {
      id: 4,
      value: "doces",
      title: "Doces",
    },
  ];

  return (
    <Container>
      <Toast />
      <Alert
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
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
        <div className="bg-[#fff] flex justify-center items-center sm:h-48  shadow-md">
          <div className="flex flex-col sm:flex-row">
            {dataOpcoes.map((i) => {
              return (
                <Opcoes
                  key={i.id}
                  title={i.title}
                  action={() => filtrarProdutos(i.value)}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-center items-center p-10">
          <Text className="font-bold text-3xl">Nosso cardapio</Text>
        </div>

        <div className="flex justify-center items-center">
          <Card
            produtos={
              tipoSelecionado
                ? produtos.filter((produto) => produto.tipo === tipoSelecionado)
                : produtos
            }
            isMobile={isMobile}
            id="cardapio"
          />
        </div>
      </main>
    </Container>
  );
};

export default Home;
