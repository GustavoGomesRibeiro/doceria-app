import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Serviço",
  description: "Termos de Serviço do aplicativo.",
};

export default function TermsPage() {
  return (
    <main style={{maxWidth: 860, margin: "40px auto", padding: 24, lineHeight: 1.6}}>
      <h1>Termos de Serviço</h1>
      <p>Bem-vindo ao nosso aplicativo! Ao usar este serviço, você concorda com os seguintes termos:</p>

      <h2>Uso do Aplicativo</h2>
      <p>O aplicativo foi desenvolvido para fins de entretenimento e geração de conteúdo para redes sociais.
      O usuário se compromete a não utilizar o aplicativo de forma ilegal, fraudulenta ou que cause danos a terceiros.</p>

      <h2>Responsabilidade</h2>
      <p>O aplicativo é fornecido “no estado em que se encontra”, sem garantias de funcionamento ininterrupto ou livre de erros.
      Não nos responsabilizamos por eventuais perdas, danos ou prejuízos decorrentes do uso.</p>

      <h2>Propriedade Intelectual</h2>
      <p>Todos os direitos de código, textos e elementos visuais pertencem ao desenvolvedor.
      O usuário não pode copiar, modificar ou distribuir o aplicativo sem autorização.</p>

      <h2>Contato</h2>
      <p>Se tiver dúvidas, entre em contato: <a href="mailto:gustavoribeiro.gomes@gmail.com">gustavoribeiro.gomes@gmail.com</a>.</p>

      <p><strong>Última atualização:</strong> Agosto de 2025</p>
    </main>
  );
}
