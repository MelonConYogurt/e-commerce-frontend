/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import Banner from "@/components/Banner";
import Link from "next/link";
import {Truck, RefreshCw, ShieldCheck, Star} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Banner />

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nuestra nueva gama de colores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["moda-1.jpg", "moda-2.jpg", "moda-3.jpg"].map((img, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={`/images/${img}`}
                    alt={`Gama de colores ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Únete a la moda con nosotros
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "raro4.jpg",
              "raro5.png",
              "raro6.jpg",
              "raro9.jpg",
              "raro7.jpg",
              "raro8.jpg",
            ].map((img, index) => (
              <Card key={index} className="overflow-hidden bg-[#d4d0ca]">
                <CardContent className="p-0">
                  <Image
                    src={`/images/${img}`}
                    alt={`Moda imagen ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">Photo shot</h2>
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            <Card className="col-span-2 row-span-2 overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="relative h-full">
                  <Image
                    src="/images/Portada1.jpg"
                    alt="Photo shot 1"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="relative h-full">
                  <Image
                    src="/images/portada2.jpg"
                    alt="Photo shot 2"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="relative h-full">
                  <Image
                    src="/images/moda-4.jpg"
                    alt="Photo shot 3"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2 overflow-hidden">
              <CardContent className="p-0 h-full">
                <div className="relative h-full">
                  <Image
                    src="/images/raro3.jpg"
                    alt="Photo shot 4"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para renovar tu estilo?
          </h2>
          <p className="text-muted-foreground mb-8">
            Descubre nuestra colección completa y encuentra tu próximo look
            favorito.
          </p>
          <Link href="/productos">
            <Button size="lg">Ver todos los productos</Button>
          </Link>
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Por qué elegirnos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Truck className="w-12 h-12 mb-4" />,
                title: "Envío Gratis",
                description: "En pedidos superiores a $50",
              },
              {
                icon: <RefreshCw className="w-12 h-12 mb-4" />,
                title: "Devoluciones Fáciles",
                description: "30 días para cambios",
              },
              {
                icon: <ShieldCheck className="w-12 h-12 mb-4" />,
                title: "Compra Segura",
                description: "Pago 100% seguro",
              },
              {
                icon: <Star className="w-12 h-12 mb-4" />,
                title: "Calidad Premium",
                description: "Materiales de primera",
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  {item.icon}
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
