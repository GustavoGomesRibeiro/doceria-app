import { FC } from "react";

type OpcoesProps = {
  action: (value: string) => void;
  title: string;
  value: string;
  active?: boolean;
};

export const Opcoes: FC<OpcoesProps> = ({ action, title, value, active }) => {
  return (
    <a href="#cardapio">
      <button
        onClick={() => action(value)}
        className="whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 btn-press"
        style={
          active
            ? { background: "var(--rose)", color: "#fff", border: "1.5px solid var(--rose)" }
            : {
                background: "transparent",
                color: "var(--ink-muted)",
                border: "1.5px solid var(--border)",
              }
        }
        onMouseOver={(e) => {
          if (!active) {
            e.currentTarget.style.borderColor = "var(--rose)";
            e.currentTarget.style.color = "var(--rose)";
          }
        }}
        onMouseOut={(e) => {
          if (!active) {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--ink-muted)";
          }
        }}
      >
        {title}
      </button>
    </a>
  );
};
