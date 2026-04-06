"use client";

import { FormEvent, useState } from "react";

export function ContactForm({ specialties }: { specialties: string[] }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-black">
        <p className="font-medium mb-2">Obrigado pelo contato!</p>
        <p className="text-sm text-accent-700">
          Em breve nossa equipe retornará. Para agendamento rápido, use o WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="nome">
            Nome completo
          </label>
          <input id="nome" name="nome" type="text" className="input" placeholder="Seu nome" required />
        </div>
        <div>
          <label className="label" htmlFor="tel">
            Telefone
          </label>
          <input id="tel" name="tel" type="tel" className="input" placeholder="(82) 99999-9999" required />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="email">
          E-mail
        </label>
        <input id="email" name="email" type="email" className="input" placeholder="seu@email.com" />
      </div>
      <div>
        <label className="label" htmlFor="esp">
          Especialidade / assunto
        </label>
        <select id="esp" name="esp" className="input" defaultValue="">
          <option value="" disabled>
            Selecione
          </option>
          {specialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="msg">
          Mensagem
        </label>
        <textarea
          id="msg"
          name="msg"
          className="input h-32"
          placeholder="Como podemos ajudar?"
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        Solicitar contato
      </button>
      <p className="text-xs text-accent-600">
        Este formulário é uma demonstração local. Para produção, integre com e-mail ou CRM.
      </p>
    </form>
  );
}
