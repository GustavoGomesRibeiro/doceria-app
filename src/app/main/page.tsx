"use client";

import { LuShoppingBag, LuArrowDown, LuStar } from "react-icons/lu";
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
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>("bolo caseiro");
  const { reduceQuantity } = useHandleEvent();
  const { updateStateCart, openCart } = useCartStore();

  useEffect(() => { setProdutos(item); }, []);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) return null;

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
    { id: 1, value: "bolo caseiro",    title: "Bolos de Pote" },
    { id: 2, value: "bolo branco",     title: "Bolos Brancos" },
    { id: 3, value: "bolo chocolate",  title: "Bolos de Chocolate" },
    { id: 4, value: "doces",           title: "Doces" },
  ];

  return (
    <Container>
      <Toast />
      <Alert message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 glass border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex justify-between items-center">
          <Image
            src="/logo-semfundo.png"
            placeholder="empty"
            width={90}
            height={90}
            alt="Reis Doces Caseiros"
            className="object-contain"
          />

          <nav className="hidden md:flex items-center gap-7">
            {["Cardápio", "Sobre", "Contato"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--ink-muted)" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--rose)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
              >
                {l}
              </a>
            ))}
          </nav>

          <button
            onClick={updateStateCart}
            className="relative flex items-center gap-2 btn-press rounded-full px-4 py-2 text-sm font-medium"
            style={{
              background: "var(--rose)",
              color: "#fff",
            }}
          >
            <LuShoppingBag size={16} />
            <span className="hidden sm:block">Sacola</span>
            {reduceQuantity() > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                style={{ background: "var(--ink)", color: "#fff" }}
              >
                {reduceQuantity()}
              </span>
            )}
          </button>
        </div>
      </header>

      {openCart && <Cart />}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "var(--ink)", minHeight: "100vh" }}>
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

        {/* Big decorative circle */}
        <div
          className="absolute top-[-10%] right-[-8%] rounded-full pointer-events-none"
          style={{
            width: 600, height: 600,
            background: "radial-gradient(circle at 40% 40%, rgba(200,69,90,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-5%] rounded-full pointer-events-none"
          style={{
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(184,135,58,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-5 py-24 md:py-0 md:min-h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-14 items-center w-full">

            {/* Left copy */}
            <div className="space-y-7 fade-up">
              {/* Label */}
              <div className="pill" style={{ background: "rgba(200,69,90,0.18)", color: "var(--rose-mid)" }}>
                <LuStar size={11} />
                Feito artesanalmente
              </div>

              <h1
                className="leading-[1.06] tracking-tight"
                style={{
                  fontFamily: "var(--font-fraunces), Fraunces, serif",
                  fontSize: "clamp(3rem, 6vw, 5.2rem)",
                  fontWeight: 300,
                  color: "#FAF6F0",
                }}
              >
                Doces que
                <br />
                <em style={{ color: "var(--rose-mid)", fontStyle: "italic" }}>
                  encantam
                </em>
                <br />
                de verdade
              </h1>

              <p className="text-base leading-relaxed max-w-sm" style={{ color: "rgba(250,246,240,0.58)" }}>
                Bolos, trufas e doces caseiros preparados com ingredientes
                selecionados — do nosso forno para a sua mesa.
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="#cardapio"
                  className="btn-press inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                  style={{ background: "var(--rose)", color: "#fff" }}
                >
                  Ver cardápio
                  <LuArrowDown size={15} />
                </a>
                <a
                  href="#sobre"
                  className="text-sm font-medium underline underline-offset-4"
                  style={{ color: "rgba(250,246,240,0.45)" }}
                >
                  Nossa história
                </a>
              </div>

              {/* Social proof strip */}
              <div
                className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 mt-2"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="flex -space-x-2">
                  {["#C8455A","#B8873A","#7A6352"].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2"
                      style={{ background: c, borderColor: "var(--ink)" }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-medium" style={{ color: "#FAF6F0" }}>+500 clientes satisfeitos</p>
                  <p className="text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>⭐⭐⭐⭐⭐ avaliação média</p>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="flex justify-center fade-up delay-2">
              <div className="relative">
                {/* Glow ring */}
                <div
                  className="absolute inset-[-24px] rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(200,69,90,0.22) 0%, transparent 65%)" }}
                />
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: "0 0 80px 20px rgba(200,69,90,0.18)" }}
                />
                <Image
                  src="/logo-1.png"
                  placeholder="empty"
                  width={440}
                  height={440}
                  alt="Reis Doces Caseiros"
                  className="relative z-10"
                  style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.5))" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Marquee strip at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 overflow-hidden py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.25)" }}
        >
          <div className="flex gap-10 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
            {[
              "🎂 Bolos de pote", "🍫 Brigadeiros gourmet", "🍓 Morangos com chocolate",
              "🥛 Bolos brancos", "✨ Encomendas especiais", "💛 Feito com amor",
              "🎂 Bolos de pote", "🍫 Brigadeiros gourmet", "🍓 Morangos com chocolate",
              "🥛 Bolos brancos", "✨ Encomendas especiais", "💛 Feito com amor",
            ].map((t, i) => (
              <span key={i} className="text-xs font-medium" style={{ color: "rgba(250,246,240,0.45)", letterSpacing: "0.08em" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 28s linear infinite; }
        `}</style>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="py-12 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🌿", title: "Ingredientes frescos",  sub: "Selecionados com cuidado" },
            { icon: "👩‍🍳", title: "Feito na hora",        sub: "Após confirmação do pedido" },
            { icon: "🚚", title: "Entrega rápida",        sub: "Combinamos o melhor horário" },
            { icon: "💬", title: "Pedido pelo WhatsApp",  sub: "Simples e rápido" },
          ].map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-2 p-5 rounded-2xl fade-up"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", animationDelay: `${i * 0.08}s` }}
            >
              <span className="text-2xl">{b.icon}</span>
              <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{b.title}</p>
              <p className="text-xs" style={{ color: "var(--ink-muted)" }}>{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CARDÁPIO ── */}
      <section style={{ background: "var(--bg)" }} id="cardapio">
        {/* Category tabs */}
        <div
          className="sticky z-40 border-b"
          style={{ top: "69px", background: "rgba(247,242,236,0.94)", backdropFilter: "blur(16px)", borderColor: "var(--border)" }}
        >
          <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {dataOpcoes.map((o) => (
              <Opcoes
                key={o.id}
                title={o.title}
                value={o.value}
                active={tipoSelecionado === o.value}
                action={() => filtrarProdutos(o.value)}
              />
            ))}
          </div>
        </div>

        {/* Section header */}
        <div className="max-w-6xl mx-auto px-5 pt-14 pb-5">
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--rose)" }}>
            — Cardápio
          </p>
          <h2
            className="leading-tight"
            style={{
              fontFamily: "var(--font-fraunces), Fraunces, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 300,
              color: "var(--ink)",
            }}
          >
            {tipoSelecionado
              ? dataOpcoes.find((o) => o.value === tipoSelecionado)?.title
              : "Todos os produtos"}
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
            {tipoSelecionado === "bolo caseiro" && "Disponibilidade sujeita a confirmação."}
            {(tipoSelecionado === "bolo branco" || tipoSelecionado === "bolo chocolate") && "Encomenda com 2 dias de antecedência."}
          </p>
        </div>

        {/* Products grid */}
        <div className="max-w-6xl mx-auto px-5 pb-24">
          <Card
            produtos={tipoSelecionado ? produtos.filter((p) => p.tipo === tipoSelecionado) : produtos}
            isMobile={isMobile}
            id="produtos-grid"
          />
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section
        id="sobre"
        className="relative overflow-hidden"
        style={{ background: "var(--ink)" }}
      >
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--rose-mid)" }}>
              — Nossa história
            </p>
            <h2
              className="mb-6 leading-tight"
              style={{
                fontFamily: "var(--font-fraunces), Fraunces, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#FAF6F0",
              }}
            >
              Doces feitos com{" "}
              <em style={{ color: "var(--rose-mid)" }}>alma e carinho</em>
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "rgba(250,246,240,0.6)" }}>
              <p>Tudo começou com receitas de família, passadas de geração em geração com aquele toque especial que só o amor é capaz de colocar.</p>
              <p>Na Reis Doces acreditamos que um bom doce transforma um momento simples numa memória afetiva para a vida inteira.</p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {[["500+","Clientes"],["3 anos","De tradição"],["20+","Sabores"]].map(([n, l]) => (
                <div key={l}>
                  <p
                    className="text-3xl font-light mb-1"
                    style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--rose-mid)" }}
                  >{n}</p>
                  <p className="text-xs uppercase tracking-wider" style={{ color: "rgba(250,246,240,0.35)" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: quote card */}
          <div
            className="rounded-3xl p-8"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p
              className="text-2xl leading-relaxed mb-6"
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(250,246,240,0.85)",
              }}
            >
              "Um doce caseiro carrega mais do que sabor — carrega memória, cuidado e o calor de mãos que preparam com amor."
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ background: "var(--rose)", color: "#fff" }}
              >RD</div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#FAF6F0" }}>Reis Doces Caseiros</p>
                <p className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>Desde 2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contato"
        className="relative overflow-hidden py-28 text-center"
        style={{ background: "var(--cream)" }}
      >
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative max-w-xl mx-auto px-5">
          <span className="text-4xl block mb-6">💬</span>
          <h2
            className="mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 300,
              color: "var(--ink)",
            }}
          >
            Pronto para <em style={{ color: "var(--rose)" }}>encomendar</em>?
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "var(--ink-muted)" }}>
            Manda uma mensagem no WhatsApp — a gente te atende rapidinho e com todo o carinho!
          </p>
          <a
            href={`https://api.whatsapp.com/send?phone=5511984652404&text=${encodeURIComponent("Olá! Gostaria de fazer um pedido 🍫")}`}
            target="_blank"
            rel="noreferrer"
            className="btn-press inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-medium"
            style={{ background: "#25D366", color: "#fff", boxShadow: "0 10px 36px rgba(37,211,102,0.32)" }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chamar no WhatsApp
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10 text-center text-sm"
        style={{ background: "var(--ink)", color: "rgba(250,246,240,0.35)" }}
      >
        <p
          className="text-base mb-1"
          style={{ fontFamily: "var(--font-fraunces), serif", color: "rgba(250,246,240,0.75)" }}
        >
          Reis Doces Caseiros
        </p>
        <p>
          Feitos com amor ·{" "}
          <a href="/terms" className="hover:text-white transition-colors">Termos</a>
          {" "}·{" "}
          <a href="/privacy" className="hover:text-white transition-colors">Privacidade</a>
        </p>
      </footer>
    </Container>
  );
};

export default Home;
