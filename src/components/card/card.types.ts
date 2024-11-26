type CardResponse = {
  id: number;
  titulo: string;
  preco: number;
  descricao: string;
};

export type CardProps = {
  produtos: CardResponse[];
  id: string;
};
