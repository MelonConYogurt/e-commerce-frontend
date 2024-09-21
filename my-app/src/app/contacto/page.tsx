import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contáctanos</h1>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nombre
            </label>
            <Input id="name" placeholder="Tu nombre" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Mensaje
            </label>
            <Textarea
              id="message"
              placeholder="¿En qué podemos ayudarte?"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Enviar mensaje
          </Button>
        </form>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            Información de contacto
          </h2>
          <p>Email: info@tuecommerce.com</p>
          <p>Teléfono: +1 234 567 890</p>
          <p>Dirección: Calle Principal 123, Ciudad, País</p>
        </div>
      </div>
    </div>
  );
}
