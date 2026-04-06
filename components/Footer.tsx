import Link from "next/link";
import Image from "next/image";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import type { SiteData } from "@/lib/types";
import { withBasePath } from "@/lib/basePath";

const quick = [
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/servicos", label: "Especialidades" },
  { href: "/equipe", label: "Nossa Equipe" },
  { href: "/contato", label: "Contato" },
];

export function Footer({ site }: { site: SiteData["site"] }) {
  const year = new Date().getFullYear();
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <footer className="bg-black text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="site-header-brand site-header-brand--footer mb-4">
              <Image
                src={withBasePath("/logov2.png")}
                alt=""
                width={56}
                height={56}
                className="site-header-mark site-header-mark--footer"
              />
              <div className="site-header-text">
                <span className="site-header-name site-header-name--footer">
                  INSTITUTO V2
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{site.shortDescription}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Links rápidos</h3>
            <ul className="space-y-3">
              {quick.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-primary-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-white/50 hover:text-primary-300 transition-colors text-sm"
                >
                  Administração
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
                <a href={tel} className="text-white/70 hover:text-primary-300">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-white/70 hover:text-primary-300 break-all"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
                <span className="text-white/70">
                  {site.addressLine}
                  <br />
                  {site.city} — {site.state}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Horário</h3>
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
              <span className="text-white/70 text-sm">{site.hours}</span>
            </div>
            <div className="flex gap-4">
              {site.instagramUrl ? (
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              ) : null}
              {site.facebookUrl ? (
                <a
                  href={site.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {year} {site.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
