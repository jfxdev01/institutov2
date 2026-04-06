import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { readSiteData } from "@/lib/content";
import { ProfessionalCard } from "@/components/ProfessionalCard";

export default async function EquipePage() {
  const data = await readSiteData();
  const { professionals, professionalsIntro, site } = data;
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Nossa equipe
          </h1>
          <p className="text-white/85 text-lg max-w-2xl">{professionalsIntro}</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionals.map((p) => (
              <ProfessionalCard key={p.id} p={p} />
            ))}
          </div>
          <div className="mt-14 max-w-2xl mx-auto text-center">
            <h2 className="section-title">Faça parte da nossa equipe</h2>
            <p className="text-accent-700 mb-8">
              Buscamos profissionais alinhados aos valores do {site.name}. Envie seu
              currículo pelo e-mail{" "}
              <a className="text-primary-600 hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn-primary gap-2 justify-center">
                <Calendar className="w-5 h-5" />
                Agendar consulta
              </Link>
              <a href={tel} className="btn-secondary gap-2 justify-center">
                <ArrowRight className="w-4 h-4" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
