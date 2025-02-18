type CardResponse = {
  id: number;
  titulo: string;
  preco: number;
  descricao: string;
  kg: boolean;
  img?: string;
  aviso?: string;
  tipo: string;
};

export type CardProps = {
  produtos: CardResponse[];
  id: string;
};
