import type { Metadata } from "next";
import { poppins } from "@/app/fonts/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Reis Doces Caseiros",
  other: {
    "tiktok-developers-site-verification": "nUsyhJuGzpEQx8csfuswF7Rs2s5OxsgC",
  },
  description: "Doces Caseiros",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
