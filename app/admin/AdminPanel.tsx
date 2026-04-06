"use client";

import { useCallback, useEffect, useState } from "react";
import type { IconName, Professional, SiteData, SpecialtyItem, Testimonial } from "@/lib/types";

const iconOptions: IconName[] = [
  "activity",
  "sparkles",
  "brain",
  "smile",
  "heart",
  "scissors",
  "stethoscope",
];

function emptyProfessional(): Professional {
  return {
    id: `p-${Date.now()}`,
    name: "",
    role: "",
    credentials: "",
    bio: "",
    photoUrl: "",
    phone: "",
    instagramUrl: "",
  };
}

export function AdminPanel() {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [tab, setTab] = useState<"site" | "content" | "team" | "services" | "reviews" | "seo">(
    "site"
  );

  const refresh = useCallback(async () => {
    const st = await fetch("/api/auth/status", { credentials: "include" });
    const j = (await st.json()) as { ok: boolean };
    setAuth(j.ok);
    if (j.ok) {
      const res = await fetch("/api/content", { credentials: "include" });
      setData(await res.json());
    } else {
      setData(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setMessage("Senha incorreta.");
      return;
    }
    setPassword("");
    await refresh();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setAuth(false);
    setData(null);
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (!res.ok) {
      setMessage("Não foi possível salvar. Verifique a sessão.");
      return;
    }
    setMessage("Alterações salvas.");
  }

  async function uploadHeroVisual(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    if (!res.ok) {
      setMessage("Falha no upload da imagem do hero.");
      return;
    }
    const { url } = (await res.json()) as { url: string };
    setData((d) => (d ? { ...d, hero: { ...d.hero, visualImageUrl: url } } : d));
    setMessage("Imagem do hero carregada. Salve para publicar.");
  }

  async function uploadAboutSectionImage(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    if (!res.ok) {
      setMessage("Falha no upload da imagem da seção Sobre.");
      return;
    }
    const { url } = (await res.json()) as { url: string };
    setData((d) =>
      d ? { ...d, about: { ...d.about, sectionImageUrl: url } } : d
    );
    setMessage("Imagem da seção Sobre carregada. Salve para publicar.");
  }

  async function uploadPhoto(profIndex: number, file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    if (!res.ok) {
      setMessage("Falha no upload da imagem.");
      return;
    }
    const { url } = (await res.json()) as { url: string };
    setData((d) => {
      if (!d) return d;
      const pros = [...d.professionals];
      pros[profIndex] = { ...pros[profIndex], photoUrl: url };
      return { ...d, professionals: pros };
    });
  }

  if (loading || auth === null) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-accent-600">
        Carregando…
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="max-w-md mx-auto card p-8 mt-12">
        <h1 className="text-2xl font-serif font-bold text-black mb-2">Administração</h1>
        <p className="text-sm text-accent-700 mb-6">
          Acesso restrito. Informe a senha definida em <code className="text-xs">ADMIN_PASSWORD</code>.
        </p>
        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="label" htmlFor="pw">
              Senha
            </label>
            <input
              id="pw"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {message ? <p className="text-sm text-accent-900">{message}</p> : null}
          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-black">Painel do site</h1>
          <p className="text-accent-700 text-sm">
            Edite textos, contatos, profissionais e imagens. Salve ao final de cada sessão.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button type="button" className="btn-secondary" onClick={() => refresh()}>
            Recarregar
          </button>
          <button type="button" className="btn-primary" onClick={save} disabled={saving}>
            {saving ? "Salvando…" : "Salvar tudo"}
          </button>
          <button
            type="button"
            className="text-sm text-accent-600 underline"
            onClick={logout}
          >
            Sair
          </button>
        </div>
      </div>

      {message ? (
        <p className="mb-4 text-sm text-primary-700 bg-primary-50 border border-primary-100 rounded-lg px-4 py-2">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2 mb-8 border-b border-accent-200 pb-2">
        {(
          [
            ["site", "Contato e redes"],
            ["content", "Textos principais"],
            ["team", "Profissionais"],
            ["services", "Especialidades"],
            ["reviews", "Depoimentos"],
            ["seo", "SEO"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === id
                ? "bg-primary-600 text-white"
                : "bg-accent-100 text-accent-800 hover:bg-accent-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "site" && (
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <Field
            label="Nome do instituto"
            value={data.site.name}
            onChange={(v) => setData({ ...data, site: { ...data.site, name: v } })}
          />
          <Field
            label="Telefone (exibição)"
            value={data.site.phone}
            onChange={(v) => setData({ ...data, site: { ...data.site, phone: v } })}
          />
          <Field
            label="WhatsApp (apenas dígitos, com DDI 55)"
            value={data.site.whatsappDigits}
            onChange={(v) => setData({ ...data, site: { ...data.site, whatsappDigits: v } })}
          />
          <Field
            label="E-mail"
            value={data.site.email}
            onChange={(v) => setData({ ...data, site: { ...data.site, email: v } })}
          />
          <Field
            label="Endereço (linha)"
            value={data.site.addressLine}
            onChange={(v) => setData({ ...data, site: { ...data.site, addressLine: v } })}
          />
          <Field
            label="Cidade"
            value={data.site.city}
            onChange={(v) => setData({ ...data, site: { ...data.site, city: v } })}
          />
          <Field
            label="UF"
            value={data.site.state}
            onChange={(v) => setData({ ...data, site: { ...data.site, state: v } })}
          />
          <Field
            label="CEP"
            value={data.site.cep}
            onChange={(v) => setData({ ...data, site: { ...data.site, cep: v } })}
          />
          <Field
            label="Horário"
            value={data.site.hours}
            onChange={(v) => setData({ ...data, site: { ...data.site, hours: v } })}
          />
          <Field
            label="Instagram (URL completa)"
            value={data.site.instagramUrl}
            onChange={(v) => setData({ ...data, site: { ...data.site, instagramUrl: v } })}
          />
          <Field
            label="Facebook (URL completa)"
            value={data.site.facebookUrl}
            onChange={(v) => setData({ ...data, site: { ...data.site, facebookUrl: v } })}
          />
          <div className="md:col-span-2">
            <label className="label">Descrição curta (rodapé)</label>
            <textarea
              className="input min-h-[96px]"
              value={data.site.shortDescription}
              onChange={(e) =>
                setData({
                  ...data,
                  site: { ...data.site, shortDescription: e.target.value },
                })
              }
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">URL embed Google Maps (iframe src)</label>
            <textarea
              className="input min-h-[80px] font-mono text-sm"
              value={data.site.mapsEmbedUrl}
              onChange={(e) =>
                setData({ ...data, site: { ...data.site, mapsEmbedUrl: e.target.value } })
              }
              placeholder="https://www.google.com/maps/embed?..."
            />
          </div>
        </div>
      )}

      {tab === "content" && (
        <div className="max-w-3xl space-y-6">
          <Field
            label="Selo do hero"
            value={data.hero.badge}
            onChange={(v) => setData({ ...data, hero: { ...data.hero, badge: v } })}
          />
          <Field
            label="Título principal"
            value={data.hero.title}
            onChange={(v) => setData({ ...data, hero: { ...data.hero, title: v } })}
          />
          <div>
            <label className="label">Subtítulo</label>
            <textarea
              className="input min-h-[100px]"
              value={data.hero.subtitle}
              onChange={(e) =>
                setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })
              }
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Destaque (número)"
              value={data.hero.highlightStat.value}
              onChange={(v) =>
                setData({
                  ...data,
                  hero: { ...data.hero, highlightStat: { ...data.hero.highlightStat, value: v } },
                })
              }
            />
            <Field
              label="Destaque (legenda)"
              value={data.hero.highlightStat.label}
              onChange={(v) =>
                setData({
                  ...data,
                  hero: { ...data.hero, highlightStat: { ...data.hero.highlightStat, label: v } },
                })
              }
            />
          </div>

          <div className="border-t border-accent-200 pt-8 space-y-4">
            <h3 className="text-lg font-semibold text-black font-serif">
              Bloco visual do hero (coluna direita)
            </h3>
            <p className="text-sm text-accent-700">
              Imagem de fundo opcional. Sem imagem, o degradê em cores da marca é usado. O emoji e a
              legenda ficam centralizados por cima.
            </p>
            <Field
              label="URL da imagem (ou envie abaixo)"
              value={data.hero.visualImageUrl}
              onChange={(v) =>
                setData({ ...data, hero: { ...data.hero, visualImageUrl: v } })
              }
            />
            <div>
              <label className="label">Enviar imagem</label>
              <input
                type="file"
                accept="image/*"
                className="block text-sm text-accent-700"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void uploadHeroVisual(f);
                  e.target.value = "";
                }}
              />
            </div>
            {data.hero.visualImageUrl ? (
              <div className="flex flex-wrap items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.hero.visualImageUrl}
                  alt=""
                  className="h-24 w-auto max-w-full rounded-lg border border-accent-200 object-cover"
                />
                <button
                  type="button"
                  className="btn-secondary text-sm py-2"
                  onClick={() =>
                    setData({ ...data, hero: { ...data.hero, visualImageUrl: "" } })
                  }
                >
                  Remover imagem
                </button>
              </div>
            ) : null}
            <Field
              label="Emoji / ícone (texto, ex.: ✨) — vazio oculta o círculo"
              value={data.hero.visualEmoji}
              onChange={(v) =>
                setData({ ...data, hero: { ...data.hero, visualEmoji: v } })
              }
            />
            <Field
              label="Legenda sobre o bloco"
              value={data.hero.visualCaption}
              onChange={(v) =>
                setData({ ...data, hero: { ...data.hero, visualCaption: v } })
              }
            />
          </div>

          <div>
            <label className="label">Introdução das especialidades (home)</label>
            <textarea
              className="input min-h-[80px]"
              value={data.specialtiesIntro}
              onChange={(e) => setData({ ...data, specialtiesIntro: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Introdução da equipe</label>
            <textarea
              className="input min-h-[80px]"
              value={data.professionalsIntro}
              onChange={(e) => setData({ ...data, professionalsIntro: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Depoimentos (intro)</label>
            <textarea
              className="input min-h-[80px]"
              value={data.testimonialsIntro}
              onChange={(e) => setData({ ...data, testimonialsIntro: e.target.value })}
            />
          </div>
          <Field
            label="Título sobre"
            value={data.about.title}
            onChange={(v) => setData({ ...data, about: { ...data.about, title: v } })}
          />
          <div>
            <label className="label">Parágrafos (um por linha em branco será um parágrafo — edite como bloco)</label>
            <textarea
              className="input min-h-[160px]"
              value={data.about.paragraphs.join("\n\n")}
              onChange={(e) =>
                setData({
                  ...data,
                  about: {
                    ...data.about,
                    paragraphs: e.target.value.split(/\n\n+/).map((s) => s.trim()).filter(Boolean),
                  },
                })
              }
            />
          </div>
          <div>
            <label className="label">Missão</label>
            <textarea
              className="input min-h-[120px]"
              value={data.mission}
              onChange={(e) => setData({ ...data, mission: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Destaques (um por linha)</label>
            <textarea
              className="input min-h-[140px]"
              value={data.about.highlights.join("\n")}
              onChange={(e) =>
                setData({
                  ...data,
                  about: {
                    ...data.about,
                    highlights: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                  },
                })
              }
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Anos de experiência (texto)"
              value={data.about.experienceYears}
              onChange={(v) => setData({ ...data, about: { ...data.about, experienceYears: v } })}
            />
            <Field
              label="Rótulo pacientes"
              value={data.about.patientsLabel}
              onChange={(v) => setData({ ...data, about: { ...data.about, patientsLabel: v } })}
            />
          </div>

          <div className="border-t border-accent-200 pt-8 space-y-4">
            <h3 className="text-lg font-semibold text-black font-serif">
              Imagem da seção &quot;Sobre&quot; na home (bloco 400px)
            </h3>
            <p className="text-sm text-accent-700">
              Ilustração à esquerda do texto &quot;Sobre o Instituto&quot;. Sem imagem, o degradê em
              cores da marca é exibido.
            </p>
            <Field
              label="URL da imagem (ou envie abaixo)"
              value={data.about.sectionImageUrl}
              onChange={(v) =>
                setData({ ...data, about: { ...data.about, sectionImageUrl: v } })
              }
            />
            <div>
              <label className="label">Enviar imagem</label>
              <input
                type="file"
                accept="image/*"
                className="block text-sm text-accent-700"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void uploadAboutSectionImage(f);
                  e.target.value = "";
                }}
              />
            </div>
            {data.about.sectionImageUrl ? (
              <div className="flex flex-wrap items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.about.sectionImageUrl}
                  alt=""
                  className="h-28 w-auto max-w-full rounded-lg border border-accent-200 object-cover"
                />
                <button
                  type="button"
                  className="btn-secondary text-sm py-2"
                  onClick={() =>
                    setData({ ...data, about: { ...data.about, sectionImageUrl: "" } })
                  }
                >
                  Remover imagem
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {tab === "team" && (
        <div className="space-y-8">
          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              setData({
                ...data,
                professionals: [...data.professionals, emptyProfessional()],
              })
            }
          >
            Adicionar profissional
          </button>
          {data.professionals.map((p, i) => (
            <div key={p.id} className="card p-6 space-y-4">
              <div className="flex justify-between items-center gap-2">
                <h3 className="font-semibold text-lg">Profissional {i + 1}</h3>
                <button
                  type="button"
                  className="text-sm text-accent-900 hover:underline"
                  onClick={() => {
                    const pros = data.professionals.filter((_, j) => j !== i);
                    setData({ ...data, professionals: pros });
                  }}
                >
                  Remover
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field
                  label="Nome"
                  value={p.name}
                  onChange={(v) => {
                    const pros = [...data.professionals];
                    pros[i] = { ...pros[i], name: v };
                    setData({ ...data, professionals: pros });
                  }}
                />
                <Field
                  label="Cargo / área"
                  value={p.role}
                  onChange={(v) => {
                    const pros = [...data.professionals];
                    pros[i] = { ...pros[i], role: v };
                    setData({ ...data, professionals: pros });
                  }}
                />
                <Field
                  label="Registro (CRM/CRO etc.)"
                  value={p.credentials}
                  onChange={(v) => {
                    const pros = [...data.professionals];
                    pros[i] = { ...pros[i], credentials: v };
                    setData({ ...data, professionals: pros });
                  }}
                />
                <Field
                  label="Telefone (opcional)"
                  value={p.phone ?? ""}
                  onChange={(v) => {
                    const pros = [...data.professionals];
                    pros[i] = { ...pros[i], phone: v };
                    setData({ ...data, professionals: pros });
                  }}
                />
                <Field
                  label="Instagram (URL)"
                  value={p.instagramUrl ?? ""}
                  onChange={(v) => {
                    const pros = [...data.professionals];
                    pros[i] = { ...pros[i], instagramUrl: v };
                    setData({ ...data, professionals: pros });
                  }}
                />
                <Field
                  label="URL da foto (ou envie abaixo)"
                  value={p.photoUrl}
                  onChange={(v) => {
                    const pros = [...data.professionals];
                    pros[i] = { ...pros[i], photoUrl: v };
                    setData({ ...data, professionals: pros });
                  }}
                />
              </div>
              <div>
                <label className="label">Upload de foto</label>
                <input
                  type="file"
                  accept="image/*"
                  className="block text-sm text-accent-700"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void uploadPhoto(i, f);
                  }}
                />
                {p.photoUrl ? (
                  <p className="text-xs text-accent-600 mt-2 break-all">{p.photoUrl}</p>
                ) : null}
              </div>
              <div>
                <label className="label">Biografia</label>
                <textarea
                  className="input min-h-[100px]"
                  value={p.bio}
                  onChange={(e) => {
                    const pros = [...data.professionals];
                    pros[i] = { ...pros[i], bio: e.target.value };
                    setData({ ...data, professionals: pros });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "services" && (
        <ServicesEditor
          specialties={data.specialties}
          onChange={(specialties) => setData({ ...data, specialties })}
        />
      )}

      {tab === "reviews" && (
        <TestimonialsEditor
          items={data.testimonials}
          onChange={(testimonials) => setData({ ...data, testimonials })}
        />
      )}

      {tab === "seo" && (
        <div className="max-w-2xl space-y-4">
          <Field
            label="Título (aba do navegador)"
            value={data.seo.title}
            onChange={(v) => setData({ ...data, seo: { ...data.seo, title: v } })}
          />
          <div>
            <label className="label">Meta descrição</label>
            <textarea
              className="input min-h-[100px]"
              value={data.seo.description}
              onChange={(e) =>
                setData({ ...data, seo: { ...data.seo, description: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="label">Palavras-chave (separadas por vírgula)</label>
            <textarea
              className="input min-h-[80px]"
              value={data.seo.keywords}
              onChange={(e) =>
                setData({ ...data, seo: { ...data.seo, keywords: e.target.value } })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ServicesEditor({
  specialties,
  onChange,
}: {
  specialties: SpecialtyItem[];
  onChange: (s: SpecialtyItem[]) => void;
}) {
  function update(i: number, patch: Partial<SpecialtyItem>) {
    const next = [...specialties];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <button
        type="button"
        className="btn-secondary"
        onClick={() =>
          onChange([
            ...specialties,
            {
              id: `s-${Date.now()}`,
              title: "",
              description: "",
              icon: "sparkles",
            },
          ])
        }
      >
        Adicionar especialidade
      </button>
      {specialties.map((s, i) => (
        <div key={s.id} className="card p-6 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Especialidade {i + 1}</span>
            <button
              type="button"
              className="text-sm text-accent-900"
              onClick={() => onChange(specialties.filter((_, j) => j !== i))}
            >
              Remover
            </button>
          </div>
          <Field label="Título" value={s.title} onChange={(v) => update(i, { title: v })} />
          <div>
            <label className="label">Descrição</label>
            <textarea
              className="input min-h-[80px]"
              value={s.description}
              onChange={(e) => update(i, { description: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Ícone</label>
            <select
              className="input"
              value={s.icon}
              onChange={(e) => update(i, { icon: e.target.value as IconName })}
            >
              {iconOptions.map((ic) => (
                <option key={ic} value={ic}>
                  {ic}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

function TestimonialsEditor({
  items,
  onChange,
}: {
  items: Testimonial[];
  onChange: (t: Testimonial[]) => void;
}) {
  function update(i: number, patch: Partial<Testimonial>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <button
        type="button"
        className="btn-secondary"
        onClick={() =>
          onChange([
            ...items,
            { id: `t-${Date.now()}`, quote: "", author: "", role: "" },
          ])
        }
      >
        Adicionar depoimento
      </button>
      {items.map((t, i) => (
        <div key={t.id} className="card p-6 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Depoimento {i + 1}</span>
            <button
              type="button"
              className="text-sm text-accent-900"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              Remover
            </button>
          </div>
          <div>
            <label className="label">Texto</label>
            <textarea
              className="input min-h-[100px]"
              value={t.quote}
              onChange={(e) => update(i, { quote: e.target.value })}
            />
          </div>
          <Field label="Autor" value={t.author} onChange={(v) => update(i, { author: v })} />
          <Field label="Função / origem" value={t.role} onChange={(v) => update(i, { role: v })} />
        </div>
      ))}
    </div>
  );
}
