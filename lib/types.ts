export type IconName =
  | "activity"
  | "sparkles"
  | "brain"
  | "smile"
  | "heart"
  | "scissors"
  | "stethoscope";

export interface SiteInfo {
  name: string;
  shortDescription: string;
  phone: string;
  whatsappDigits: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  cep: string;
  hours: string;
  instagramUrl: string;
  facebookUrl: string;
  mapsEmbedUrl: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  highlightStat: { value: string; label: string };
  /** Imagem de fundo do bloco visual à direita no hero (home) */
  visualImageUrl: string;
  /** Ícone/emoji sobre o bloco (ex.: ✨); vazio oculta o círculo */
  visualEmoji: string;
  /** Legenda abaixo do emoji */
  visualCaption: string;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
  highlights: string[];
  experienceYears: string;
  patientsLabel: string;
  /** Imagem do bloco ilustrativo (400px) na seção “sobre” da home */
  sectionImageUrl: string;
}

export interface SpecialtyItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  photoUrl: string;
  phone?: string;
  whatsappDigits?: string;
  instagramUrl?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string;
}

export interface SiteData {
  site: SiteInfo;
  hero: HeroContent;
  mission: string;
  about: AboutContent;
  specialtiesIntro: string;
  specialties: SpecialtyItem[];
  professionalsIntro: string;
  professionals: Professional[];
  testimonialsIntro: string;
  testimonials: Testimonial[];
  seo: SeoContent;
}
