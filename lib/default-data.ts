import type { SiteData } from "./types";

export const defaultSiteData: SiteData = {
  site: {
    name: "Instituto V2",
    shortDescription:
      "Saúde, estética e odontologia em Maceió: tecnologia, ciência e cuidado humanizado.",
    phone: "(82) 3333-4444",
    whatsappDigits: "5582999994444",
    email: "contato@institutov2.com.br",
    addressLine: "Av. Fernandes Lima, 2500 - Farol",
    city: "Maceió",
    state: "AL",
    cep: "57055-000",
    hours: "Segunda a Sexta: 7h às 19h | Sábado: 7h às 12h",
    instagramUrl: "https://instagram.com/institutov2",
    facebookUrl: "",
    mapsEmbedUrl: "",
  },
  hero: {
    badge: "Tecnologia, ciência e cuidado humanizado",
    title: "Experiência completa em saúde, estética e odontologia",
    subtitle:
      "Mais que uma clínica: integramos diferentes áreas em um ambiente sofisticado e acolhedor, com foco em resultados naturais, segurança e bem-estar.",
    highlightStat: { value: "+50.000", label: "Pacientes atendidos" },
    visualImageUrl: "",
    visualEmoji: "✨",
    visualCaption: "Sua experiência em um só lugar",
  },
  mission:
    "Promover saúde, beleza e bem-estar por meio de tratamentos seguros e personalizados, baseados em evidência, elevando a autoestima e a qualidade de vida dos nossos pacientes.",
  about: {
    title: "Sobre o Instituto V2",
    paragraphs: [
      "O Instituto V2 é um espaço voltado à saúde, à estética e à odontologia, criado para oferecer atendimento de alta qualidade que alia tecnologia, conhecimento científico e cuidado humanizado.",
      "Somos mais que uma clínica: proporcionamos uma experiência completa ao paciente, integrando diferentes áreas em um único ambiente, com profissionais qualificados e em constante atualização. Seguimos um conceito atual que valoriza autoestima, confiança e resultados seguros e naturais.",
    ],
    highlights: [
      "Ambiente sofisticado e confortável",
      "Equipe multidisciplinar e atualizada",
      "Tratamentos personalizados e baseados em evidências",
      "Odontologia completa: clínica, estética e ortodontia",
      "Estética avançada e cuidados integrados",
      "Psicologia clínica para adultos e crianças",
    ],
    experienceYears: "15+",
    patientsLabel: "Pacientes acolhidos",
    sectionImageUrl: "",
  },
  specialtiesIntro:
    "Reunimos serviços especializados em fisioterapia, estética avançada, psicologia, odontologia e bem-estar — tudo pensado para o seu conforto e resultados naturais.",
  specialties: [
    {
      id: "fisio",
      title: "Fisioterapia e quiropraxia",
      description:
        "Cuidados com a coluna, postura e recuperação funcional com acompanhamento especializado.",
      icon: "activity",
    },
    {
      id: "estetica",
      title: "Estética avançada",
      description:
        "Da limpeza de pele e tratamentos faciais a preenchimentos, bioestimuladores, toxina botulínica e tratamento de gordura localizada.",
      icon: "sparkles",
    },
    {
      id: "psico",
      title: "Psicologia clínica",
      description:
        "Atendimento para adultos e crianças, avaliação psicológica e orientação vocacional e profissional.",
      icon: "brain",
    },
    {
      id: "odonto",
      title: "Odontologia completa",
      description:
        "Estética e clínica com implantes, facetas, restaurações, limpeza, aclareamento e ortodontia.",
      icon: "smile",
    },
    {
      id: "masso",
      title: "Massoterapia e estética básica",
      description:
        "Massagens e cuidados essenciais para relaxamento e manutenção da pele.",
      icon: "heart",
    },
    {
      id: "beauty",
      title: "Beauty e autocuidado",
      description:
        "Design de sobrancelhas, brow lamination, cílios, extensão de unhas, manicure e cuidados com os pés.",
      icon: "scissors",
    },
  ],
  professionalsIntro:
    "Profissionais dedicados a uma jornada de saúde e estética integrada, com atendimento próximo e seguro.",
  professionals: [
    {
      id: "lucas-rodrigues",
      name: "Lucas Rodrigues",
      role: "Fisioterapia e quiropraxia",
      credentials: "",
      bio: "Atendimento em fisioterapia e quiropraxia para mobilidade, postura e bem-estar.",
      photoUrl: "",
    },
    {
      id: "valeria-durandao",
      name: "Dra. Valéria Durandão",
      role: "Estética avançada",
      credentials: "",
      bio: "Procedimentos que vão da limpeza de pele e tratamentos faciais a técnicas mais avançadas, como preenchimentos, bioestimuladores, toxina botulínica e gordura localizada.",
      photoUrl: "",
    },
    {
      id: "vitor-correia",
      name: "Dr. Vitor Correia",
      role: "Odontologia estética e clínica",
      credentials: "CRO/AL",
      bio: "Odontologia estética e clínica com foco em sorriso harmônico e saúde bucal integral.",
      photoUrl: "",
    },
    {
      id: "felipe-lins",
      name: "Dr. Felipe Lins",
      role: "Odontologia clínica",
      credentials: "CRO/AL",
      bio: "Atendimento clínico em odontologia, em conjunto com a equipe do instituto.",
      photoUrl: "",
    },
    {
      id: "enisa",
      name: "Enisa",
      role: "Massoterapia e estética básica",
      credentials: "",
      bio: "Massoterapia e estética básica para relaxamento e cuidados essenciais.",
      photoUrl: "",
    },
    {
      id: "virginia-brandao",
      name: "Virgínia Brandão",
      role: "Beauty — sobrancelhas, cílios e unhas",
      credentials: "",
      bio: "Design de sobrancelhas, eyebrow lamination, extensão de cílios, extensão de unha, manicure, pé de cura e spa dos pés.",
      photoUrl: "",
    },
  ],
  testimonialsIntro: "A satisfação dos nossos pacientes é nossa maior recompensa.",
  testimonials: [
    {
      id: "t1",
      quote:
        "Atendimento acolhedor e equipe muito profissional. Me senti segura em todos os procedimentos.",
      author: "Paciente",
      role: "Avaliação Google",
    },
    {
      id: "t2",
      quote:
        "Ambiente lindo e confortável. Adorei poder resolver estética e odontologia no mesmo lugar.",
      author: "Paciente",
      role: "Avaliação Google",
    },
    {
      id: "t3",
      quote:
        "Profissionais atentos e explicam tudo com clareza. Resultados naturais como eu queria.",
      author: "Paciente",
      role: "Avaliação Google",
    },
  ],
  seo: {
    title: "Instituto V2 | Saúde, Estética e Odontologia em Maceió — AL",
    description:
      "Instituto multidisciplinar em Maceió: saúde, estética e odontologia integradas. Equipe especializada, ambiente sofisticado e tratamentos personalizados.",
    keywords:
      "instituto v2, maceió, saúde, estética, odontologia, fisioterapia, psicologia, clínica",
  },
};
