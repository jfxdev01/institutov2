import type { Metadata } from "next";
import { Barlow_Condensed, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { readSiteData } from "@/lib/content";

export const dynamic = "force-static";
export const revalidate = false;

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await readSiteData();
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    robots: "index, follow",
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await readSiteData();
  return (
    <html
      lang="pt-BR"
      className={`${dmSerif.variable} ${barlowCondensed.variable}`}
    >
      <body className="font-sans antialiased text-black bg-white">
        <Header site={data.site} />
        <main className="min-h-screen">{children}</main>
        <Footer site={data.site} />
        <WhatsAppButton
          whatsappDigits={data.site.whatsappDigits}
          siteName={data.site.name}
        />
      </body>
    </html>
  );
}
