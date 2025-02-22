import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FooterCard from "@/components/FooterCard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Shop",
  description: "Green Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/headerLogo.svg" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <FooterCard/>
      </body>
    </html>
  );
}
