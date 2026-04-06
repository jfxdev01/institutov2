import { readSiteData } from "@/lib/content";
import { ContactForm } from "@/components/ContactForm";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export default async function ContatoPage() {
  const data = await readSiteData();
  const { site, specialties } = data;
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;
  const wa = `https://wa.me/${site.whatsappDigits}`;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Contato
          </h1>
          <p className="text-white/85 text-lg max-w-2xl">
            Estamos prontos para atender você. Agende sua consulta ou tire dúvidas com a
            recepção.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-bold text-black mb-6">
                Agende sua consulta
              </h2>
              <ContactForm specialties={specialties.map((s) => s.title)} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-black mb-6">
                Informações
              </h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Telefone</h3>
                    <a href={tel} className="text-accent-700 hover:text-primary-600">
                      {site.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">WhatsApp</h3>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-700 hover:text-primary-700"
                    >
                      Clique para conversar
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">E-mail</h3>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-accent-700 hover:text-accent-800 break-all"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Endereço</h3>
                    <p className="text-accent-700">
                      {site.addressLine}
                      <br />
                      {site.city} — {site.state}
                      <br />
                      CEP: {site.cep}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-200/80 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Horário</h3>
                    <p className="text-accent-700">{site.hours}</p>
                  </div>
                </div>
              </div>
              {site.mapsEmbedUrl ? (
                <div className="h-64 rounded-2xl overflow-hidden border border-accent-200">
                  <iframe
                    title="Mapa"
                    src={site.mapsEmbedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="h-64 bg-accent-100 rounded-2xl flex items-center justify-center text-accent-600 text-sm px-4 text-center">
                  Configure o link do mapa em Administração → Dados do site
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
