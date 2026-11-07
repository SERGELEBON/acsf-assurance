"use client";

import { COMPANY, EXPERTISES, VALEURS, ENGAGEMENTS } from "@/lib/site-data";
import { PageHero, ContactCta, CtaButton, SectionLabel } from "./shared";
import { User, Play } from "lucide-react";

export function NousConnaitrePage() {
  return (
    <>
      <PageHero
        breadcrumb="À propos"
        title="Nous Connaître"
        subtitle="ACSF-ASSURANCES, société de courtage spécialisée en assurances, conseils & services financiers, accompagne les entreprises et les particuliers dans la gestion et la maîtrise de leurs risques à Abidjan et en Côte d’Ivoire."
        image="/images/acsf-abidjan.jpg"
      />

      {/* Histoire */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <SectionLabel>notre histoire</SectionLabel>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy leading-[1.1]">
                ACSF, votre partenaire de confiance
              </h2>
              <div className="mt-8 space-y-5 text-[15px] md:text-base leading-relaxed text-foreground/75">
                <p>
                  ACSF-ASSURANCES est une société de courtage spécialisée en assurances, conseils
                  &amp; services financiers. Basée au coeur du Plateau d’Abidjan, au sein de
                  l’Immeuble Harmonies, notre équipe de spécialistes met son expertise au service
                  des entreprises comme des particuliers.
                </p>
                <p>
                  Mais surtout, ACSF est bien plus qu’un courtier : un véritable interface avec les
                  marchés d’assurances. Gestionnaires de risques, nous défendons vos intérêts, de la
                  souscription jusqu’au règlement des sinistres, afin d’anticiper aujourd’hui et de
                  protéger demain.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_70px_-25px_rgba(24,32,82,0.4)] group cursor-pointer">
              <img
                src="/images/acsf-abidjan.jpg"
                alt="Vue du Plateau d'Abidjan — présentation d'ACSF Assurances"
                className="h-[300px] md:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/35 transition-colors group-hover:bg-navy/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-acsf-red text-white shadow-[0_0_0_12px_rgba(227,6,19,0.25)] transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-8 w-8 fill-current" />
                </span>
                <p className="text-sm tracking-[0.2em] uppercase text-white">
                  Visionnez la vidéo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertises */}
      <section id="expertises-section" className="py-16 md:py-24 bg-secondary scroll-mt-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionLabel>NOS EXPERTISES</SectionLabel>
          <h2 className="mt-4 font-display text-3xl md:text-5xl text-navy leading-[1.12] max-w-3xl">
            Avec vous à chaque instant pour construire{" "}
            <em className="text-acsf-red">votre sérénité de demain.</em>
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERTISES.map((exp, i) => (
              <div key={exp.name} className="border-t-2 border-border pt-6 transition-all hover:border-acsf-red">
                <span className="font-display text-sm text-acsf-red">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl text-navy">{exp.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organisation : Valeurs + Engagements */}
      <section id="valeurs-section" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionLabel>NOS VALEURS</SectionLabel>
          <h2 className="mt-4 font-display text-3xl md:text-4xl text-navy">Ce qui nous guide</h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALEURS.map((m) => (
              <article
                key={m.name}
                className="group rounded-2xl border border-border p-6 transition-all duration-300 hover:border-acsf-red/60 hover:shadow-[0_20px_45px_-18px_rgba(24,32,82,0.22)]"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-navy/70 transition-colors group-hover:bg-acsf-red group-hover:text-white">
                  <User className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl text-navy">{m.name}</h3>
                {m.roles.map((r) => (
                  <p key={r} className="mt-1.5 text-[13px] leading-relaxed text-foreground/65">
                    {r}
                  </p>
                ))}
              </article>
            ))}
          </div>

          <h2 className="mt-20 font-display text-3xl md:text-4xl text-navy">Nos engagements</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENTS.map((m) => (
              <article
                key={m.name}
                className="group rounded-2xl bg-secondary p-6 transition-all duration-300 hover:bg-navy"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy/70 transition-colors group-hover:bg-acsf-red group-hover:text-white">
                  <User className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl text-navy transition-colors group-hover:text-white">
                  {m.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/65 transition-colors group-hover:text-white/70">
                  {m.role}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <CtaButton page="contactez-nous" variant="outline">
              Prendre contact
            </CtaButton>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
