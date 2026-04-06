"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "@/lib/types";
import { withBasePath } from "@/lib/basePath";

const nav = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Especialidades" },
  { href: "/equipe", label: "Equipe" },
  { href: "/contato", label: "Contato" },
];

export function Header({ site }: { site: SiteData["site"] }) {
  const [open, setOpen] = useState(false);
  const phone = site.phone;
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container flex items-center justify-between py-4">
        <Link
          href="/"
          className="site-header-brand"
          aria-label="Instituto V2 — Saúde, Estética e Odontologia"
        >
          <Image
            src={withBasePath("/logov2.png")}
            alt=""
            width={52}
            height={52}
            className="site-header-mark"
            priority
          />
          <div className="site-header-text">
            <span className="site-header-name">INSTITUTO V2</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-accent-700 hover:text-primary-600 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={telHref}
            className="flex items-center gap-2 text-primary-600 font-medium"
          >
            <Phone className="w-4 h-4" />
            {phone}
          </a>
          <Link href="/contato" className="btn-primary">
            Agendar Consulta
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-accent-700"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-accent-100 bg-white px-4 pb-4">
          <div className="flex flex-col gap-3 pt-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-accent-800 font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href={telHref} className="flex items-center gap-2 text-primary-600 font-medium py-2">
              <Phone className="w-4 h-4" />
              {phone}
            </a>
            <Link href="/contato" className="btn-primary w-full justify-center" onClick={() => setOpen(false)}>
              Agendar Consulta
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
