import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ACSF Assurances – Assurances, Conseils & Services Financiers",
  description:
    "ACSF-ASSURANCES, société de courtage spécialisée en assurances, conseils & services financiers à Abidjan. L’assurance vie, l’épargne n°1 qui protège ceux que vous aimez ! Gestionnaires de risques : assurances, protection des capitaux, garantie financière.",
  keywords: [
    "ACSF",
    "ACSF Assurances",
    "assurance vie",
    "épargne",
    "courtage",
    "Côte d’Ivoire",
    "Abidjan",
    "assurance entreprise",
    "assurance particuliers",
    "protection des capitaux",
    "garantie financière",
    "santé",
    "prévoyance",
  ],
  authors: [{ name: "ACSF Assurances, Conseils & Services Financiers" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "ACSF Assurances – Assurances, Conseils & Services Financiers",
    description:
      "L’assurance vie, l’épargne n°1 qui protège ceux que vous aimez ! ACSF, votre partenaire de confiance : anticiper aujourd’hui, protéger demain.",
    siteName: "ACSF Assurances",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSerif.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
