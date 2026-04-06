"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton({
  whatsappDigits,
  siteName,
}: {
  whatsappDigits: string;
  siteName: string;
}) {
  const text = encodeURIComponent(
    `Olá! Gostaria de agendar uma consulta no ${siteName}.`
  );
  const href = `https://wa.me/${whatsappDigits}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
