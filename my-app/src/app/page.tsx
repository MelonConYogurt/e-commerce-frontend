import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import Banner from "@/components/Banner";
import LastProductsCard from "@/components/LastProducts";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Banner />

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Únete a la moda con nosotros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["raro1.png", "raro2.png", "raro3.png"].map((img, index) => (
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
          <h2 className="text-3xl font-bold text-center mb-8">
            Nuestros últimos diseños
          </h2>
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4">
              <LastProductsCard />
            </div>
          </div>
        </section>

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
      </main>
    </div>
  );
}
