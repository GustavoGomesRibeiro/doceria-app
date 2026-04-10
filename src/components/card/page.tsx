"use client";

import { FC } from "react";
import { ConditionalRender, Placeholder } from "@/components/index";
import { LuPlus } from "react-icons/lu";
import Image from "next/image";
import { CardProps } from "./card.types";
import useCartStore from "@/app/store/cart.store";
import useToastStore from "@/app/store/toast.store";
import formatterCurrency from "@/app/utils/formatterCurrency";

const Card: FC<CardProps> = ({ produtos, id, isMobile }) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const { addToast } = useToastStore();

  return (
    <>
      <ConditionalRender condition={Boolean(produtos.length)}>
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 py-4"
          id={id}
        >
          {produtos.map((produto, i) => (
            <div
              key={produto.id}
              className="card-lift group rounded-2xl overflow-hidden fade-up"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                animationDelay: `${i * 0.06}s`,
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square" style={{ background: "#F0EAE2" }}>
                <Image
                  src={String(produto.img)}
                  placeholder="empty"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  alt={produto.titulo}
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />
                {produto.aviso && (
                  <div
                    className="absolute top-2.5 left-2.5 pill text-[10px]"
                    style={{ background: "var(--rose)", color: "#fff" }}
                  >
                    Aviso
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col gap-2">
                <h3
                  className="text-sm font-medium leading-snug line-clamp-2"
                  style={{ color: "var(--ink)", fontFamily: "var(--font-fraunces), serif" }}
                >
                  {produto.titulo}
                </h3>

                {produto.aviso && (
                  <p className="text-xs font-medium leading-snug" style={{ color: "var(--rose)" }}>
                    {produto.aviso}*
                  </p>
                )}

                {!isMobile && produto.descricao && (
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--ink-muted)" }}>
                    {produto.descricao}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-2">
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--rose)" }}
                  >
                    {produto.kg
                      ? `${formatterCurrency.format(produto.preco)}/Kg`
                      : formatterCurrency.format(produto.preco)}
                  </span>

                  <button
                    onClick={() => { addProduct(produto); addToast(); }}
                    className="btn-press flex items-center justify-center w-9 h-9 rounded-full"
                    style={{ background: "var(--rose)", color: "#fff" }}
                    aria-label={`Adicionar ${produto.titulo}`}
                  >
                    <LuPlus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ConditionalRender>

      <ConditionalRender condition={produtos.length <= 0}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-2"><Placeholder /></div>
          ))}
        </div>
      </ConditionalRender>
    </>
  );
};

export default Card;
