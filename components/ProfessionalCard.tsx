import Image from "next/image";
import { UserRound } from "lucide-react";
import type { Professional } from "@/lib/types";
import { withBasePath } from "@/lib/basePath";

export function ProfessionalCard({ p }: { p: Professional }) {
  return (
    <div className="card overflow-hidden group">
      <div className="h-56 bg-gradient-to-br from-primary-200 to-accent-200 relative overflow-hidden">
        {p.photoUrl ? (
          <Image
            src={withBasePath(p.photoUrl)}
            alt={p.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center">
              <UserRound className="w-12 h-12 text-primary-600" aria-hidden />
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-black mb-1 font-serif">{p.name}</h3>
        <p className="text-primary-600 font-medium mb-1">{p.role}</p>
        {p.credentials ? (
          <p className="text-accent-500 text-sm mb-4">{p.credentials}</p>
        ) : (
          <div className="mb-4" />
        )}
        <p className="text-accent-700 text-sm leading-relaxed">{p.bio}</p>
        {(p.phone || p.instagramUrl) && (
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {p.phone ? (
              <a
                href={`tel:${p.phone.replace(/\s/g, "")}`}
                className="text-primary-600 hover:underline"
              >
                {p.phone}
              </a>
            ) : null}
            {p.instagramUrl ? (
              <a
                href={p.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Instagram
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
