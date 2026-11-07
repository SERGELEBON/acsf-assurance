"use client";

import { NEWS, VIDEOS } from "@/lib/site-data";
import { PRESS_ARTICLES } from "@/lib/press-data";
import { useRouter } from "@/lib/store";
import { PageHero, ContactCta, CtaButton, SectionLabel } from "./shared";
import { ArrowRight, ArrowUpRight, Calendar, FileText, Play, Send, Download } from "lucide-react";

/* ============ MÉDIAS ============ */
export function MediasPage() {
  const navigate = useRouter((s) => s.navigate);
  return (
    <>
      <PageHero
        breadcrumb="Médias"
        title="Médias"
        subtitle="Communiqués de presse, publications et vidéos : suivez toute l’actualité d’ACSF Assurances."
        image="/images/acsf-news-2.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <SectionLabel>actualités</SectionLabel>
          <h2 className="mt-4 font-display text-3xl md:text-4xl text-navy">
            Dernières actualités d’ACSF
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {NEWS.map((n) => (
              <button key={n.id} onClick={() => navigate(n.id as never)} className="group text-left">
                <div className="relative overflow-hidden rounded-2xl h-[280px] md:h-[340px]">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium text-navy">
                    <Calendar className="h-3.5 w-3.5" /> {n.date}
                  </span>
                  <div className="absolute bottom-0 p-6">
                    <h3 className="font-display text-xl md:text-2xl text-white leading-snug">{n.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-acsf-red-soft">
                      Lire le communiqué
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Publications */}
          <div className="mt-20">
            <SectionLabel>publications</SectionLabel>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-navy">Publications</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {["Brochure ACSF Assurances", "Guide de l’assurance vie", "Plaquette institutionnelle"].map((p) => (
                <div
                  key={p}
                  className="group flex items-center gap-4 rounded-2xl border border-border p-6 transition-all hover:border-acsf-red/60 hover:shadow-[0_18px_40px_-18px_rgba(24,32,82,0.2)] cursor-pointer"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-navy/60 transition-colors group-hover:bg-acsf-red group-hover:text-white">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-navy text-sm">{p}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">PDF — Télécharger</p>
                  </div>
                  <Download className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-acsf-red" />
                </div>
              ))}
            </div>
          </div>

          {/* Vidéos */}
          <div className="mt-20">
            <SectionLabel>vidéos</SectionLabel>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-navy">Vidéos</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {VIDEOS.map((v) => (
                <div
                  key={v.title}
                  className="group relative overflow-hidden rounded-2xl bg-navy h-[200px] cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-500 group-hover:opacity-75 group-hover:scale-105"
                    style={{ backgroundImage: "url(/images/acsf-abidjan.jpg)" }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-acsf-red text-white transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 fill-current" />
                    </span>
                    <p className="font-display text-lg text-white leading-snug">{v.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}

/* ============ ARTICLES DE PRESSE ============ */
export function PressPage({ id }: { id: string }) {
  const article = PRESS_ARTICLES[id];
  const navigate = useRouter((s) => s.navigate);
  if (!article) return null;
  const others = NEWS.filter((n) => n.id !== id);

  return (
    <>
      <PageHero
        breadcrumb={`Communiqué de presse — ${article.date}`}
        title={article.title}
        image={id === "presse-campagne" ? "/images/acsf-news-1.jpg" : "/images/acsf-news-2.jpg"}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-acsf-red" />
            {article.date}
          </div>
          <div className="mt-8 space-y-6 text-[15px] md:text-base leading-relaxed text-foreground/80">
            {article.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg text-navy font-medium leading-relaxed" : ""}>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <p className="text-sm tracking-[0.18em] uppercase text-muted-foreground mb-6">
              Autres actualités
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {others.map((n) => (
                <button
                  key={n.id}
                  onClick={() => navigate(n.id as never)}
                  className="group flex items-center gap-4 rounded-2xl border border-border p-4 text-left transition-all hover:border-acsf-red/60 hover:shadow-[0_18px_40px_-18px_rgba(24,32,82,0.2)]"
                >
                  <img src={n.image} alt={n.title} className="h-20 w-28 rounded-xl object-cover shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{n.date}</p>
                    <p className="mt-1 font-display text-base text-navy leading-snug group-hover:text-acsf-red transition-colors">
                      {n.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============ CARRIÈRES ============ */
const JOBS = [
  "Chargé(e) de Clientèle (H/F)",
  "Conseiller(e) Assurance Vie & Épargne (H/F)",
  "Souscripteur(trice) (H/F)",
  "Gestionnaire Sinistres (H/F)",
  "Chargé(e) de Production IARD (H/F)",
  "Commercial(e) Entreprises (H/F)",
];

export function CarrieresPage() {
  const navigate = useRouter((s) => s.navigate);
  return (
    <>
      <PageHero
        breadcrumb="Carrières"
        title="Carrières"
        subtitle="Chez ACSF, l’humain est au cœur de notre réussite. Rejoignez une équipe dynamique de spécialistes des assurances, conseils & services financiers, au cœur du Plateau d’Abidjan."
        image="/images/acsf-carrieres.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10">
          <SectionLabel>pourquoi nous rejoindre ?</SectionLabel>
          <div className="mt-6 space-y-5 text-[15px] md:text-base leading-relaxed text-foreground/75">
            <p>
              Chez ACSF, l’humain est au cœur de notre réussite. Notre équipe cultive une riche
              diversité de talents, de cultures et d’expertises, au service d’une ambition commune :
              être votre partenaire de confiance.
            </p>
            <p className="font-medium text-navy">
              Découvrez ci-dessous nos opportunités de carrière et construisons ensemble l’avenir
              d’ACSF :
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {JOBS.map((job, i) => (
              <button
                key={i}
                onClick={() => navigate("contactez-nous")}
                className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-border px-6 py-5 text-left transition-all hover:border-acsf-red/60 hover:shadow-[0_18px_40px_-18px_rgba(24,32,82,0.2)]"
              >
                <span className="font-display text-lg md:text-xl text-navy group-hover:text-acsf-red transition-colors">
                  {job}
                </span>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-navy/60 transition-all group-hover:bg-acsf-red group-hover:text-white">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-navy p-8 md:p-10 text-center">
            <p className="font-display text-2xl md:text-3xl text-white leading-snug max-w-xl mx-auto">
              Si vous êtes intéressé(e) par d’autres postes, veuillez nous envoyer votre CV.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <CtaButton page="contactez-nous">
                <Send className="h-4 w-4" /> Envoyer votre candidature
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
