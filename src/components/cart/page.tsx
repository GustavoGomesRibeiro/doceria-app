"use client";

import { FC, useEffect, useMemo, useRef } from "react";
import { ConditionalRender } from "@/components/index";
import { LuTrash2, LuX, LuMinus, LuPlus, LuShoppingBag } from "react-icons/lu";
import { RiWhatsappFill } from "react-icons/ri";
import Image from "next/image";
import useCartStore from "@/app/store/cart.store";
import useHandleEvent from "@/app/main/useHandleEvent";
import formatterCurrency from "@/app/utils/formatterCurrency";

const Cart: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { reduceQuantity } = useHandleEvent();
  const {
    total, cart,
    decreaseProductQuantity, incrementProductQuantity,
    removeProduct, updateStateCart,
  } = useCartStore();

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia!";
    if (h < 18) return "Boa tarde!";
    return "Boa noite!";
  };

  const itemsToSend = useMemo(
    () => cart.map((item) => `${item.quantity} ${item.titulo}`).join(", "),
    [cart]
  );

  const message = `${getGreeting()} Gostaria de encomendar um pedido: ${itemsToSend}. Por favor, me informe o valor e o prazo de entrega. Agradeço desde já!`;

  const sendWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?phone=5511984652404&text=${encodeURIComponent(message)}`);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) updateStateCart();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [updateStateCart]);

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(30,20,10,0.5)", backdropFilter: "blur(4px)" }} />

      {/* Panel */}
      <div
        ref={ref}
        className="relative z-10 flex flex-col w-full max-w-sm h-screen ml-auto"
        style={{ background: "var(--cream)" }}
      >
        {/* Header */}
        <header
          className="flex justify-between items-center px-6 py-5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2">
            <LuShoppingBag size={18} style={{ color: "var(--rose)" }} />
            <span
              className="font-medium text-base"
              style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--ink)" }}
            >
              Sacola
            </span>
            {reduceQuantity() > 0 && (
              <span
                className="pill text-[10px]"
                style={{ background: "var(--rose-soft)", color: "var(--rose)" }}
              >
                {reduceQuantity()} {reduceQuantity() === 1 ? "item" : "itens"}
              </span>
            )}
          </div>
          <button
            onClick={updateStateCart}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "rgba(30,20,10,0.08)" }}
          >
            <LuX size={15} style={{ color: "var(--ink-muted)" }} />
          </button>
        </header>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          <ConditionalRender condition={Boolean(cart.length)}>
            <div className="px-4 py-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-2xl p-3"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ background: "#F0EAE2" }}
                  >
                    <Image
                      src={String(item.img)}
                      placeholder="empty"
                      fill sizes="64px"
                      alt={item.titulo}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium leading-snug truncate"
                      style={{ color: "var(--ink)", fontFamily: "var(--font-fraunces), serif" }}
                    >
                      {item.titulo}
                    </p>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--rose)" }}>
                      {formatterCurrency.format(item.preco)}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div
                        className="flex items-center gap-2 rounded-full px-2 py-1"
                        style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                      >
                        <button
                          onClick={() => decreaseProductQuantity(item.id)}
                          className="w-5 h-5 flex items-center justify-center rounded-full transition-colors"
                          style={{ color: "var(--ink-muted)" }}
                        >
                          <LuMinus size={11} />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center" style={{ color: "var(--ink)" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementProductQuantity(item.id)}
                          className="w-5 h-5 flex items-center justify-center rounded-full transition-colors"
                          style={{ color: "var(--ink-muted)" }}
                        >
                          <LuPlus size={11} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeProduct(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full transition-colors"
                        style={{ background: "var(--rose-soft)", color: "var(--rose)" }}
                      >
                        <LuTrash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ConditionalRender>

          <ConditionalRender condition={cart.length === 0}>
            <div className="flex flex-col items-center justify-center h-full py-20 px-8 text-center">
              <Image
                src="/carrinho-vazio.png"
                placeholder="empty"
                width={160} height={160}
                alt="Sacola vazia"
                className="opacity-50"
              />
              <p className="font-medium mt-5 text-sm" style={{ color: "var(--ink-muted)" }}>
                Sua sacola está vazia
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(122,99,82,0.5)" }}>
                Adicione produtos para fazer seu pedido
              </p>
            </div>
          </ConditionalRender>
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            className="px-6 py-5 space-y-4"
            style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "var(--ink-muted)" }}>Total estimado</span>
              <span
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--ink)" }}
              >
                R$ {total}
              </span>
            </div>
            <button
              onClick={sendWhatsapp}
              className="btn-press w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-medium"
              style={{ background: "#25D366", color: "#fff", boxShadow: "0 8px 28px rgba(37,211,102,0.28)" }}
            >
              <RiWhatsappFill size={20} />
              Pedir pelo WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
