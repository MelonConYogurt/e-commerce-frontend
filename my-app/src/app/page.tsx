/* eslint-disable @next/next/no-img-element */
import Banner from "@/components/Banner";
import LastProductsCard from "@/components/LastProducts";

export default async function Home() {
  return (
    <div>
      <main className="flex flex-col justify-center items-center">
        <Banner></Banner>
        <section className="w-full h-fit mx-10 my-10 flex flex-col justify-center items-center ">
          <h1 className="text-3xl my-10 text">Unete a la moda con nosotros</h1>
          <div className="flex flex-row gap-5 overflow-x-scroll">
            <img className="rounded-lg" src="images/raro1.png" alt="imagen" />
            <img className="rounded-lg" src="images/raro2.png" alt="imagen" />
            <img className="rounded-lg" src="images/raro3.png" alt="imagen" />
          </div>
        </section>
        <section className="w-full h-fit mx-10 my-10 flex flex-col justify-center items-center ">
          <h1 className="text-3xl my-10 text">Nuestros ultimos disenos</h1>
          <div className="flex flex-row gap-5 overflow-x-scroll ">
            <LastProductsCard></LastProductsCard>
          </div>
        </section>
        <section className="w-full h-fit mx-10 my-10 flex flex-col justify-center items-center ">
          <h1 className="text-3xl my-10 text">Nuestra nueva gama de colores</h1>
          <div className="flex flex-row gap-5 overflow-x-scroll">
            <img className="rounded-lg" src="images/moda-1.jpg" alt="imagen" />
            <img className="rounded-lg" src="images/moda-2.jpg" alt="imagen" />
            <img className="rounded-lg" src="images/moda-3.jpg" alt="imagen" />
          </div>
        </section>
      </main>
    </div>
  );
}
