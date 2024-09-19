import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Heart, ShoppingCart, Menu} from "lucide-react";
import Link from "next/link";
import Transition from "@/components/Transition";
import {Button} from "@/components/ui/button";

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
  title: "E-commerce App",
  description: "Your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex flex-col min-h-full`}
      >
        <Transition>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-10 h-10 border bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    E
                  </div>
                  <span className="font-semibold">E-commerce</span>
                </div>
                <ul className="hidden md:flex space-x-6">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/productos"
                      className="hover:text-primary transition-colors"
                    >
                      Productos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categorias"
                      className="hover:text-primary transition-colors"
                    >
                      Categorías
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ofertas"
                      className="hover:text-primary transition-colors"
                    >
                      Ofertas
                    </Link>
                  </li>
                </ul>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Carrito</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Favoritos</span>
                  </Button>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </div>
              </nav>
            </div>
          </header>
          <main className="flex-grow">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
              {children}
            </div>
          </main>
          <footer className="border-t py-6 md:py-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-sm text-muted-foreground">
                  © 2024 Alejandro Velez Gomez. Todos los derechos reservados.
                </p>
                <nav className="flex gap-4 text-sm text-muted-foreground">
                  <Link href="#" className="hover:underline">
                    Términos
                  </Link>
                  <Link href="#" className="hover:underline">
                    Privacidad
                  </Link>
                  <Link href="#" className="hover:underline">
                    Contacto
                  </Link>
                </nav>
              </div>
            </div>
          </footer>
        </Transition>
      </body>
    </html>
  );
}
