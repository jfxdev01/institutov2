import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { readSiteData } from "@/lib/content";
import { IconFor } from "@/components/IconFor";

export default async function ServicosPage() {
  const data = await readSiteData();
  const { specialties, site, specialtiesIntro } = data;
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Especialidades
          </h1>
          <p className="text-white/85 text-lg max-w-2xl">{specialtiesIntro}</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {specialties.map((s) => (
              <div key={s.id} className="card p-8 flex gap-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                  <IconFor name={s.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-black font-serif mb-3">{s.title}</h2>
                  <p className="text-accent-700 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
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
      </section>
    </>
  );
}
