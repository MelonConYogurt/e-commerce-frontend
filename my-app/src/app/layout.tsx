import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Heart, ShoppingCart} from "lucide-react";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex flex-row justify-between items-center w-full h-fit p-3 px-2">
          <div className="flex flex-row items-center justify-center gap-1">
            <div className="rounded-full w-10 h-10 border"></div>
            <span>E-commerce</span>
          </div>
          <ul className="flex flex-row gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/productos">Productos</Link>
            </li>
            <li>
              <Link href="/categorias">Categorías</Link>
            </li>
            <li>
              <Link href="/ofertas">Ofertas</Link>
            </li>
          </ul>
          <div className="flex flex-row gap-4">
            <div className="flex flex-row items-center justify-center gap-1">
              <ShoppingCart />
              <span>Mi carrito</span>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <Heart />
              <span>Favoritos</span>
            </div>
          </div>
        </nav>
        {children}
        <footer className="flex flex-row justify-between items-center border-t w-full h-fit p-3 px-2">
          <div>
            © 2024 Alejandro Velez Gomez. Todos los derechos reservados.
          </div>
          <div className="flex flex-row gap-3 items-center justify-center">
            <span>Términos</span>
            <span>Privacidad</span>
            <span>Contacto</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
