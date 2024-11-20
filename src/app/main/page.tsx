import { IoIosArrowForward } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { Text, Button, Card, Container, Cart } from "@/components/index";
import Image from "next/image";
import useCartStore from "../store/cart.store";

const Home = () => {
  const { updateStateCart, openCart } = useCartStore();
  const products = [
    {
      id: 1,
      name: "Bolo de Chocolate",
      price: 89.9,
      description: "Bolo artesanal com cobertura de ganache",
    },
    {
      id: 2,
      name: "Pão de Mel",
      price: 12.9,
      description: "Tradicional com cobertura de chocolate",
    },
    {
      id: 3,
      name: "Torta de Morango",
      price: 99.9,
      description: "Torta fresca com morangos naturais",
    },
    {
      id: 4,
      name: "Bolo Red Velvet",
      price: 109.9,
      description: "Cobertura de cream cheese",
    },
  ];

  return (
    <Container>
      <header className="flex justify-between bg-white p-10">
        <Text>Titulo site</Text>
        <div className="flex justify-center items-center">
          <button className="mr-10" onClick={updateStateCart}>
            <LuShoppingCart size={30} color="#000" />
          </button>

          <button>
            <IoMenu size={30} color="#000" />
          </button>
        </div>
      </header>

      {openCart && <Cart />}
      <main className="flex h-screen flex-col justify-between items-center">
        <div className="justify-center items-center md:p-32 p-10">
          <Text className="font-bold text-3xl">
            Doces artesanais feitos com amor
          </Text>
          <Text className="my-5">
            Descubra nosso deliciosos bolos, tortas e doces artesanais feitos
            com ingredientes selecionados.
          </Text>
          <Button className="bg-[#DB2777] rounded-full p-3 flex justify-center items-center">
            <Text className="text-white">Ver cardápio</Text>
            <IoIosArrowForward size={22} color="#fff" />
          </Button>
        </div>

        <div>
          <Image
            src="/logo.jpg"
            placeholder="empty"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </main>

      <main className="bg-[#FDF2F8] h-screen">
        <div className="flex justify-center items-center p-10">
          <Text className="font-bold text-3xl">Nosso cardapio</Text>
        </div>

        <Card produtos={products} />
      </main>

      {/* <footer className="bg-slate-800 p-10">
        <Text>footer</Text>
      </footer> */}
    </Container>
  );
};

export default Home;
