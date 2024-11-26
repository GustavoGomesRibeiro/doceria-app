import type { Metadata } from "next";
import { poppins } from "@/app/fonts/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Reis Doces Caseiros",
  description: "Doces Caseiros",
  icons: {
    icon: ["/favicon.ico?v=4"],
    shortcut: ["/public/apple-touch-icon.png"],
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
