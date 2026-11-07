"use client";

import { useState } from "react";
import { useRouter } from "@/lib/store";
import {
  ENTREPRISES_CATEGORIES,
  PARTICULIERS_CATEGORIES,
  SANTE_SERVICES,
} from "@/lib/site-data";
import { PageHero, ContactCta, CtaButton, SectionLabel } from "./shared";
import { ChevronDown, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============ ENTREPRISES ============ */
export function EntreprisesPage() {
  const [openCat, setOpenCat] = useState(0);
  const navigate = useRouter((s) => s.navigate);

  return (
    <>
      <PageHero
        breadcrumb="Solutions"
        title="Entreprises"
        subtitle="Comprendre votre activité pour mieux protéger vos enjeux. Chez ACSF, nous concevons des solutions d’assurance sur mesure, adaptées à votre secteur, à vos besoins et à vos objectifs."
        image="/images/acsf-entreprises.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[340px_1fr]">
            {/* Sommaire catégories */}
            <aside className="lg:sticky lg:top-28 self-start">
              <SectionLabel>Nos garanties</SectionLabel>
              <nav className="mt-5 flex flex-col gap-1" aria-label="Catégories de solutions">
                {ENTREPRISES_CATEGORIES.map((cat, i) => (
                  <button
                    key={cat.cat}
                    onClick={() => {
                      setOpenCat(i);
                      document.getElementById(`cat-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={cn(
                      "text-left rounded-lg px-4 py-3 text-sm font-medium transition-all",
                      openCat === i
                        ? "bg-navy text-white"
                        : "text-foreground/70 hover:bg-secondary hover:text-navy"
                    )}
                  >
                    {cat.cat}
                  </button>
                ))}
              </nav>
              <div className="mt-8 rounded-2xl bg-secondary p-6">
                <p className="font-display text-xl text-navy leading-snug">
                  Une question sur nos solutions entreprises ?
                </p>
                <div className="mt-4">
                  <CtaButton page="contactez-nous" className="!px-5 !py-3 text-sm">
                    Contactez-nous
                  </CtaButton>
                </div>
              </div>
            </aside>

            {/* Catégories + produits */}
            <div className="space-y-14">
              {ENTREPRISES_CATEGORIES.map((cat, ci) => (
                <div key={cat.cat} id={`cat-${ci}`} className="scroll-mt-28">
                  <h2 className="font-display text-3xl md:text-4xl text-navy pb-4 border-b-2 border-acsf-red/70">
                    {cat.cat}
                  </h2>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    {cat.products.map((p) => (
                      <article
                        key={p.name}
                        className="group rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-[0_20px_45px_-18px_rgba(24,32,82,0.22)] hover:border-acsf-red/50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-xl text-navy leading-snug">{p.name}</h3>
                          <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-navy/60 transition-all group-hover:bg-acsf-red group-hover:text-white">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/70">{p.desc}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-navy p-8 md:p-10 text-center">
                <p className="font-display text-2xl md:text-3xl text-white">
                  pour en savoir plus sur nos services et produits
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <CtaButton page="contactez-nous">Contactez-nous</CtaButton>
                  <CtaButton page="particuliers" variant="white">
                    Découvrir les solutions Particuliers
                  </CtaButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}

/* ============ PARTICULIERS ============ */
export function ParticuliersPage() {
  const [open, setOpen] = useState<number | null>(0);
  const navigate = useRouter((s) => s.navigate);

  return (
    <>
      <PageHero
        breadcrumb="Solutions"
        title="Particuliers"
        subtitle="L’assurance vie, l’épargne n°1 qui protège ceux que vous aimez ! Notre mission : vous accompagner avec des solutions adaptées à vos besoins, votre mode de vie et votre budget."
        image="/images/acsf-particuliers.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10">
          <SectionLabel>Nos solutions</SectionLabel>
          <h2 className="mt-4 font-display text-3xl md:text-4xl text-navy">
            Des garanties pour chaque instant de vie
          </h2>

          <div className="mt-10 space-y-4">
            {PARTICULIERS_CATEGORIES.map((cat, i) => (
              <div
                key={cat.name}
                className={cn(
                  "rounded-2xl border transition-all duration-300 overflow-hidden",
                  open === i ? "border-acsf-red shadow-[0_18px_40px_-18px_rgba(24,32,82,0.25)]" : "border-border"
                )}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-display text-xl md:text-2xl text-navy">{cat.name}</span>
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      open === i ? "bg-acsf-red text-white rotate-180" : "bg-secondary text-navy/60"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-400 ease-in-out",
                    open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-foreground/70 max-w-2xl">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-secondary p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-display text-2xl text-navy max-w-md">
              pour en savoir plus sur nos services et produits
            </p>
            <CtaButton page="contactez-nous">Contactez-nous</CtaButton>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}

/* ============ SANTÉ & PRÉVOYANCE ============ */
export function SantePage() {
  return (
    <>
      <PageHero
        breadcrumb="Santé & Prévoyance"
        title="ACSF Santé & Prévoyance"
        subtitle="Spécialisé dans la gestion de mutuelles et de régimes d’assurance santé, ACSF fournit aux entreprises et aux particuliers un service complet : conseil, assistance technique, audit et gestion des régimes santé."
        image="/images/acsf-sante-hero.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionLabel>Nos services</SectionLabel>
          <h2 className="mt-4 font-display text-3xl md:text-4xl text-navy max-w-2xl leading-snug">
            Une expertise santé complète, du conseil à la gestion
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SANTE_SERVICES.map((s, i) => (
              <article
                key={s.name}
                className="group rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:border-acsf-red/60 hover:shadow-[0_20px_45px_-18px_rgba(24,32,82,0.22)]"
              >
                <span className="font-display text-3xl text-acsf-red">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl text-navy tracking-wide">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{s.desc}</p>
              </article>
            ))}

            <div className="rounded-2xl bg-navy p-7 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl text-white">Un service clé en main</h3>
                <ul className="mt-4 space-y-2.5">
                  {["Conseil", "Gestion TPA", "Réseau médical", "Plateforme digitale"].map((x) => (
                    <li key={x} className="flex items-center gap-2.5 text-sm text-white/80">
                      <Check className="h-4 w-4 text-acsf-red-soft" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <CtaButton page="contactez-nous" variant="white" className="text-sm !px-5 !py-3">
                  Parler à un expert
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}

/* ============ PROTECTION DES CAPITAUX ============ */
export function ProtectionCapitauxPage() {
  return (
    <>
      <PageHero
        breadcrumb="Nos solutions"
        title="Protection des capitaux"
        subtitle="Préservez la valeur de votre patrimoine et sécurisez vos capitaux grâce à des solutions de protection adaptées à vos objectifs patrimoniaux et familiaux."
        image="/images/acsf-capitaux.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10 space-y-8 text-[15px] md:text-base leading-relaxed text-foreground/75">
          <p>
            Votre capital représente des années d’efforts : il mérite une protection à la hauteur de
            vos ambitions. Chez ACSF, nous analysons votre situation patrimoniale afin de structurer
            des solutions qui préservent vos capitaux contre les aléas de la vie comme contre les
            risques financiers.
          </p>
          <p>
            De l’assurance vie — l’épargne n°1 qui protège ceux que vous aimez — aux garanties
            décès, invalidité et prévoyance, nous concevons des dispositifs sur mesure pour
            sécuriser votre épargne, optimiser votre fiscalité et préparer la transmission de votre
            patrimoine à vos bénéficiaires.
          </p>
          <p>
            Gestionnaires de risques, nos experts sélectionnent pour vous les meilleurs supports des
            marchés d’assurances, avec une exigence constante : anticiper aujourd’hui, protéger
            demain.
          </p>
        </div>
      </section>

      <ContactCta />
    </>
  );
}

/* ============ GARANTIE FINANCIÈRE ============ */
export function GarantieFinancierePage() {
  return (
    <>
      <PageHero
        breadcrumb="Nos solutions"
        title="Garantie financière"
        subtitle="Facilitez vos engagements contractuels grâce à nos solutions de cautions et de garanties financières, adaptées aux entreprises comme aux particuliers."
        image="/images/acsf-garantie.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10">
          <div className="space-y-8 text-[15px] md:text-base leading-relaxed text-foreground/75">
            <p>
              La garantie financière sécurise vos engagements : appels d’offres, marchés publics,
              opérations douanières ou obligations contractuelles. Elle rassure vos partenaires et
              donne à votre entreprise la crédibilité financière nécessaire pour se développer.
            </p>
            <p>
              ACSF vous accompagne dans le choix et la mise en place des cautions et garanties
              adaptées à chaque situation, auprès des meilleurs assureurs du marché.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-secondary p-8">
              <h3 className="font-display text-2xl text-navy">Pourquoi une garantie financière ?</h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                La garantie financière permet de couvrir vos obligations contractuelles sans
                immobiliser votre trésorerie : vos partenaires sont indemnisés en cas de défaillance,
                et votre entreprise conserve sa capacité d’investissement.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                Protection de votre trésorerie, accès aux marchés publics, sécurisation de vos
                opérations internationales : la garantie financière constitue un levier essentiel de
                développement.
              </p>
            </div>
            <div className="rounded-2xl bg-navy p-8">
              <h3 className="font-display text-2xl text-white">Nos solutions de caution</h3>
              <ul className="mt-5 space-y-3">
                {["Caution de marché", "Caution de bonne exécution", "Retrait de cautionnement", "Caution douanière", "Garantie de paiement", "Assurance-crédit"].map((x) => (
                  <li key={x} className="flex items-center gap-3 text-sm text-white/85">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-acsf-red-soft" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/65">
                ACSF vous accompagne sur les principales formes de cautions et garanties, selon vos
                besoins et votre stratégie.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
