import { FC } from "react";

type OpcoesProps = {
  action: (value: string) => void;
  title: string;
};
export const Opcoes: FC<OpcoesProps> = ({ action, title }) => {
  return (
    <button
      onClick={(value) => action(String(value))}
      className={`shadow-md shadow-black h-11 p-3 text-white m-2 bg-[#500E00] rounded-xl hover:transform hover:-translate-y-1.5 transition-transform duration-250 ease-[cubic-bezier(0.3,0.7,0.4,1.5)]`}
    >
      <a href="#cardapio">{title}</a>
    </button>
  );
};
