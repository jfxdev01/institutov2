import { promises as fs } from "fs";
import path from "path";
import type { SiteData } from "./types";
import { defaultSiteData } from "./default-data";

const dataDir = path.join(process.cwd(), "data");
const siteFile = path.join(dataDir, "site.json");

function mergeSiteData(partial: Partial<SiteData>): SiteData {
  const d = structuredClone(defaultSiteData);
  return {
    ...d,
    ...partial,
    site: { ...d.site, ...partial.site },
    hero: {
      ...d.hero,
      ...partial.hero,
      highlightStat: {
        ...d.hero.highlightStat,
        ...partial.hero?.highlightStat,
      },
    },
    about: { ...d.about, ...partial.about },
    mission: partial.mission ?? d.mission,
    specialtiesIntro: partial.specialtiesIntro ?? d.specialtiesIntro,
    professionalsIntro: partial.professionalsIntro ?? d.professionalsIntro,
    testimonialsIntro: partial.testimonialsIntro ?? d.testimonialsIntro,
    specialties: partial.specialties ?? d.specialties,
    professionals: partial.professionals ?? d.professionals,
    testimonials: partial.testimonials ?? d.testimonials,
    seo: { ...d.seo, ...partial.seo },
  };
}

export async function readSiteData(): Promise<SiteData> {
  try {
    const raw = await fs.readFile(siteFile, "utf-8");
    const parsed = JSON.parse(raw) as Partial<SiteData>;
    return mergeSiteData(parsed);
  } catch {
    return structuredClone(defaultSiteData);
  }
}

export function getDefaultSiteData(): SiteData {
  return structuredClone(defaultSiteData);
}

export async function writeSiteData(data: SiteData): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(siteFile, JSON.stringify(data, null, 2), "utf-8");
}
