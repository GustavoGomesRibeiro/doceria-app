type CardResponse = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export type CardProps = {
  produtos: CardResponse[];
};
