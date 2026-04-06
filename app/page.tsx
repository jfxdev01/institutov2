import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Phone,
  Quote,
  Shield,
  Star,
  Clock,
} from "lucide-react";
import { readSiteData } from "@/lib/content";
import { IconFor } from "@/components/IconFor";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { withBasePath } from "@/lib/basePath";

export default async function HomePage() {
  const data = await readSiteData();
  const {
    site,
    hero,
    about,
    mission,
    specialties,
    professionals,
    professionalsIntro,
    testimonials,
  } = data;
  const preview = professionals.slice(0, 4);
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />
        <div className="container relative py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                {hero.badge}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black leading-tight mb-6">
                {hero.title}
              </h1>
              <p className="text-lg text-accent-700 mb-8 max-w-lg">{hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/contato" className="btn-primary gap-2">
                  <Calendar className="w-5 h-5" />
                  Agendar consulta
                </Link>
                <a href={tel} className="btn-secondary gap-2">
                  <Phone className="w-5 h-5" />
                  {site.phone}
                </a>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-sm text-accent-700">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span>{site.hours.split("|")[0]?.trim()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-accent-700">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span>Resultados naturais e seguros</span>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up hidden lg:block">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-primary-200 to-accent-200 rounded-3xl overflow-hidden">
                {hero.visualImageUrl ? (
                  <Image
                    src={withBasePath(hero.visualImageUrl)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0px, 50vw"
                    priority
                    unoptimized={/^https?:\/\//i.test(hero.visualImageUrl)}
                  />
                ) : null}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    hero.visualImageUrl ? "bg-black/20" : ""
                  }`}
                >
                  <div className="text-center px-6">
                    {hero.visualEmoji ? (
                      <div className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-5xl" aria-hidden>
                          {hero.visualEmoji}
                        </span>
                      </div>
                    ) : null}
                    {hero.visualCaption ? (
                      <p
                        className={`font-medium drop-shadow-sm ${
                          hero.visualImageUrl ? "text-white" : "text-primary-800"
                        }`}
                      >
                        {hero.visualCaption}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-800">
                    <span className="text-2xl" aria-hidden>
                      ✓
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-black">
                      {hero.highlightStat.value}
                    </p>
                    <p className="text-sm text-accent-600">
                      {hero.highlightStat.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Nossas especialidades</h2>
            <p className="section-subtitle mx-auto">{data.specialtiesIntro}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((s) => (
              <div
                key={s.id}
                className="card p-6 group hover:border-primary-200"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <IconFor
                    name={s.icon}
                    className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-xl font-semibold text-black font-serif mb-2">
                  {s.title}
                </h3>
                <p className="text-accent-700 text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/servicos" className="btn-primary gap-2">
              Ver todas as especialidades
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-primary-50/80">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="relative w-full h-[400px] bg-gradient-to-br from-primary-300 to-accent-300 rounded-3xl overflow-hidden">
                  {about.sectionImageUrl ? (
                    <Image
                      src={withBasePath(about.sectionImageUrl)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized={/^https?:\/\//i.test(about.sectionImageUrl)}
                    />
                  ) : null}
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary-600">
                        {about.experienceYears}
                      </p>
                      <p className="text-sm text-accent-600">Anos de experiência</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary-600">
                        {hero.highlightStat.value}
                      </p>
                      <p className="text-sm text-accent-600">{about.patientsLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="section-title">{about.title}</h2>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-accent-700 mb-6 leading-relaxed">
                  {p}
                </p>
              ))}
              <p className="text-accent-800 font-medium mb-4">Missão</p>
              <p className="text-accent-700 mb-8 leading-relaxed border-l-4 border-primary-500 pl-4">
                {mission}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {about.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-sm text-accent-800">{h}</span>
                  </div>
                ))}
              </div>
              <Link href="/sobre" className="btn-primary gap-2">
                Conheça o instituto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Nossa equipe</h2>
            <p className="section-subtitle mx-auto">{professionalsIntro}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preview.map((p) => (
              <ProfessionalCard key={p.id} p={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/equipe" className="btn-secondary gap-2">
              Ver equipe completa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-primary-600">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              O que nossos pacientes dizem
            </h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              {data.testimonialsIntro}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Quote className="w-10 h-10 text-primary-200 mb-4" />
                <p className="text-white mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{t.author}</p>
                    <p className="text-primary-200 text-sm">{t.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-white/90 fill-white/90"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-accent-600 to-primary-700">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Agende sua consulta
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Nossa equipe está pronta para receber você com acolhimento e segurança.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-800 hover:bg-accent-100 px-8 py-4 rounded-full font-medium transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Agendar online
              </Link>
              <a
                href={tel}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-colors"
              >
                <Phone className="w-5 h-5" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
