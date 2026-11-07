"use client";

import { useRouter } from "@/lib/store";
import { COMPANY, LEGAL_PAGES, SOCIALS } from "@/lib/site-data";
import { AcsfLogo } from "./logo";
import { Facebook, Instagram, ArrowRight } from "lucide-react";

export function SiteFooter() {
  const navigate = useRouter((s) => s.navigate);

  return (
    <footer className="mt-auto bg-navy text-white">
      {/* Bande Carrières */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <h3 className="font-display text-2xl sm:text-3xl">Carrières</h3>
          <button
            onClick={() => navigate("carrieres")}
            className="group inline-flex items-center gap-3 text-[15px] font-medium text-acsf-red-soft hover:text-white transition-colors"
          >
            Découvrez nos opportunités de carrière
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-acsf-red-soft/60 group-hover:bg-acsf-red group-hover:border-acsf-red group-hover:text-white transition-all">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <button onClick={() => navigate("accueil")} aria-label="Accueil ACSF Assurances">
              <AcsfLogo variant="white" className="h-14 w-auto" />
            </button>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              ACSF-ASSURANCES est une société de courtage spécialisée en assurances, conseils &amp;
              services financiers. Gestionnaires de risques et interface avec les marchés
              d’assurances, nous accompagnons entreprises et particuliers : anticiper aujourd’hui,
              protéger demain.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook ACSF Assurances"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all hover:bg-acsf-red hover:text-white hover:border-acsf-red"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram ACSF Assurances"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all hover:bg-acsf-red hover:text-white hover:border-acsf-red"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                aria-label="Email ACSF Assurances"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all hover:bg-acsf-red hover:text-white hover:border-acsf-red"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-acsf-red-soft mb-5">
              Informations légales
            </h3>
            <ul className="flex flex-col gap-3">
              {LEGAL_PAGES.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => navigate(l.page)}
                    className="text-sm text-white/75 hover:text-acsf-red-soft transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-acsf-red-soft mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/75">
              <li>Immeuble Harmonies, Plateau – Abidjan, Côte d’Ivoire</li>
              {COMPANY.phones.map((p, i) => (
                <li key={p}>
                  <a href={COMPANY.phoneLinks[i]} className="hover:text-acsf-red-soft transition-colors">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-acsf-red-soft transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate("contactez-nous")}
                  className="text-acsf-red-soft hover:text-white transition-colors font-medium"
                >
                  Contactez-nous →
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-5 text-center text-xs text-white/55">
          © 2026 – ACSF Assurances, Conseils &amp; Services Financiers
        </div>
      </div>
    </footer>
  );
}
