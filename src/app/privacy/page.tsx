import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade do aplicativo.",
};

export default function PrivacyPage() {
  return (
    <main
      style={{
        maxWidth: 860,
        margin: "40px auto",
        padding: 24,
        lineHeight: 1.6,
      }}
    >
      <h1>Política de Privacidade</h1>
      <p>
        Esta Política descreve como coletamos, usamos e protegemos informações
        ao utilizar nosso aplicativo.
      </p>

      <h2>Coleta de Informações</h2>
      <p>
        O aplicativo pode coletar informações mínimas necessárias para
        autenticação e uso da API do TikTok, como tokens de acesso. Não
        coletamos informações pessoais além do necessário para funcionamento.
      </p>

      <h2>Uso de Informações</h2>
      <p>
        As informações coletadas são usadas exclusivamente para permitir que o
        usuário publique conteúdo em sua conta TikTok, mediante autorização.
      </p>

      <h2>Compartilhamento</h2>
      <p>
        Não vendemos, alugamos ou compartilhamos informações pessoais com
        terceiros, exceto quando exigido por lei.
      </p>

      <h2>Segurança</h2>
      <p>
        Adotamos medidas de segurança para proteger dados contra acesso não
        autorizado. No entanto, nenhum sistema é 100% seguro e não podemos
        garantir proteção absoluta.
      </p>

      <h2>Contato</h2>
      <p>
        Em caso de dúvidas, escreva para{" "}
        <a href="gustavoribeiro.gomes@gmail.com">
          gustavoribeiro.gomes@gmail.com
        </a>
        .
      </p>

      <p>
        <strong>Última atualização:</strong> Agosto de 2025
      </p>
    </main>
  );
}
