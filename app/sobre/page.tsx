import Link from "next/link";
import { ArrowRight, Heart, Shield, Sparkles } from "lucide-react";
import { readSiteData } from "@/lib/content";

export default async function SobrePage() {
  const data = await readSiteData();
  const { about, mission, site } = data;

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Sobre o {site.name}
          </h1>
          <p className="text-white/85 text-lg max-w-2xl">
            Saúde, estética e odontologia integradas em um ambiente pensado para o seu
            bem-estar.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container max-w-3xl">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-accent-700 text-lg leading-relaxed mb-6">
              {p}
            </p>
          ))}
          <div className="rounded-2xl bg-primary-50 border border-primary-100 p-8 mb-10">
            <h2 className="text-xl font-serif font-bold text-black mb-3">
              Nossa missão
            </h2>
            <p className="text-accent-800 leading-relaxed">{mission}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="card p-6 text-center">
              <Shield className="w-10 h-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2 font-serif">Segurança</h3>
              <p className="text-sm text-accent-700">
                Tratamentos baseados em evidência e protocolos atualizados.
              </p>
            </div>
            <div className="card p-6 text-center">
              <Sparkles className="w-10 h-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2 font-serif">Naturalidade</h3>
              <p className="text-sm text-accent-700">
                Resultados harmônicos, respeitando sua identidade.
              </p>
            </div>
            <div className="card p-6 text-center">
              <Heart className="w-10 h-10 text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold text-black mb-2 font-serif">Humanização</h3>
              <p className="text-sm text-accent-700">
                Escuta ativa e planos personalizados para cada paciente.
              </p>
            </div>
          </div>
          <Link href="/contato" className="btn-primary gap-2">
            Fale conosco
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
