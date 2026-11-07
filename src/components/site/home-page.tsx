"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/lib/store";
import {
  COUNTERS,
  SOLUTIONS_CARDS,
  CONSEILS_AXES,
  ERREURS_ASSURANCE_VIE,
  NEWS,
  TICKER_ITEMS,
} from "@/lib/site-data";
import { Counter, CtaButton, SectionLabel } from "./shared";
import { ArrowRight, ArrowUpRight, Landmark, Hourglass, FileWarning, Coins, Clock, UserX, TrendingDown, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const ERREUR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark,
  Hourglass,
  FileWarning,
  Coins,
  Clock,
  UserX,
  TrendingDown,
  Users,
};

/* ================= HERO ================= */
function Hero() {
  const navigate = useRouter((s) => s.navigate);
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-navy">
      <div
        className="absolute inset-0 bg-cover bg-center animate-ken-burns"
        style={{ backgroundImage: "url(/images/acsf-hero.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/45 to-navy/20" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/90 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.02] animate-fade-up">
            L’assurance vie,
            <br />
            l’épargne n°1 qui protège{" "}
            <em className="text-acsf-red-soft not-italic font-display italic">ceux que vous aimez !</em>
          </h1>
          <div className="mt-10 animate-fade-up delay-200">
            <button
              onClick={() => navigate("particuliers")}
              className="group inline-flex items-center gap-4 text-white"
            >
              <span className="text-xs tracking-[0.28em] uppercase text-white/80 group-hover:text-acsf-red-soft transition-colors">
                découvrir nos solutions
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 transition-all duration-300 group-hover:bg-acsf-red group-hover:border-acsf-red group-hover:text-white">
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Indicateur scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="text-[10px] tracking-[0.3em] uppercase">défiler</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}

/* ================= MISSION / COMPTEURS ================= */
function Mission() {
  const navigate = useRouter((s) => s.navigate);
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Texte */}
          <div className="order-2 lg:order-1">
            <SectionLabel>notre mission</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1] text-navy">
              Nous sommes
              <br />
              des gestionnaires
              <br />
              de risques
            </h2>
            <div className="mt-8 space-y-5 text-[15px] md:text-base leading-relaxed text-foreground/75 max-w-xl">
              <p>
                ACSF-ASSURANCES est une société de courtage spécialisée en assurances, conseils &amp;
                services financiers. Nous accompagnons les entreprises et les particuliers dans
                l’identification, la compréhension et la maîtrise de leurs risques.
              </p>
              <p>
                Mais surtout, ACSF est bien plus qu’un courtier : un véritable interface avec les
                marchés d’assurances, au service de la protection des biens, des personnes et des
                activités.
              </p>
            </div>
            <div className="mt-9">
              <CtaButton page="nous-connaitre" variant="outline">
                En savoir plus
              </CtaButton>
            </div>
          </div>

          {/* Images */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="pt-10 md:pt-16">
                <div className="overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(24,32,82,0.35)] group">
                  <img
                    src="/images/acsf-advisor.jpg"
                    alt="Conseiller ACSF en consultation avec un couple de clients"
                    className="h-[280px] md:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="pb-10 md:pb-16">
                <div className="overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(24,32,82,0.35)] group">
                  <img
                    src="/images/acsf-family.jpg"
                    alt="Famille africaine protégée et souriante à son domicile"
                    className="h-[280px] md:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compteurs */}
        <div className="mt-16 md:mt-20 border-t border-border pt-10 md:pt-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
            {COUNTERS.map((c) => (
              <Counter key={c.label} {...c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SOLUTIONS ================= */
function Solutions() {
  const navigate = useRouter((s) => s.navigate);
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionLabel>NOS SOLUTIONS</SectionLabel>
        <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy leading-[1.12] max-w-3xl">
          Votre partenaire de confiance pour
          <br />
          protéger l’essentiel
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SOLUTIONS_CARDS.map((card) => (
            <button
              key={card.label}
              onClick={() => navigate(card.page)}
              className="group relative overflow-hidden rounded-2xl text-left h-[380px] md:h-[440px] focus-visible:outline-ring"
            >
              <img
                src={card.image}
                alt={card.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/5 transition-opacity duration-500 group-hover:via-navy/60" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-white tracking-wide">{card.label}</h3>
                <p className="mt-3 max-h-0 overflow-hidden text-sm text-white/85 leading-relaxed opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                  {card.desc}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-acsf-red-soft">
                  En savoir plus
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= LES 8 ERREURS À ÉVITER ================= */
function Erreurs() {
  return (
    <section className="relative py-20 md:py-28 bg-navy overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel light>les erreurs que font les gens</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-white leading-[1.12]">
            8 erreurs à éviter pour assurer les coups de la vie
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed max-w-2xl">
            L’assurance vie est l’épargne n°1 qui protège ceux que vous aimez. Encore faut-il la
            souscrire et la gérer correctement : voici les erreurs les plus fréquentes à éviter.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ERREURS_ASSURANCE_VIE.map((err, i) => {
            const Icon = ERREUR_ICONS[err.icon] ?? FileWarning;
            return (
              <article
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:bg-white/10 hover:border-acsf-red-soft/50"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-acsf-red text-white font-display text-base shadow-[0_6px_18px_rgba(227,6,19,0.45)]">
                    {i + 1}
                  </span>
                  <Icon className="h-6 w-6 text-white/45 transition-colors group-hover:text-acsf-red-soft" />
                </div>
                <h3 className="mt-4 font-display text-lg text-white leading-snug">{err.title}</h3>
              </article>
            );
          })}
        </div>

        <div className="mt-12">
          <CtaButton page="particuliers" variant="white">
            Découvrir l’assurance vie
          </CtaButton>
        </div>
      </div>

      {/* Ticker des garanties */}
      <div className="mt-14 border-y border-white/10 py-5 overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-10 font-display text-xl md:text-2xl text-white/35"
            >
              {name}
              <span className="inline-block h-2 w-2 rounded-full bg-acsf-red-soft/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= NOS CONSEILS EN 3 AXES ================= */
function Axes() {
  const navigate = useRouter((s) => s.navigate);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (e) => e[0].isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <SectionLabel>NOS CONSEILS</SectionLabel>
        <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy leading-[1.12] max-w-3xl">
          Nos conseils en 3 axes pour construire
          <br />
          <em className="text-acsf-red">votre sérénité de demain.</em>
        </h2>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {CONSEILS_AXES.map((axe, i) => (
            <div
              key={axe.name}
              className={cn(
                "group border-t-2 border-border pt-6 transition-all duration-700 hover:border-acsf-red",
                visible && "animate-fade-up"
              )}
              style={visible ? { animationDelay: `${i * 120}ms` } : undefined}
            >
              <span className="font-display text-sm text-acsf-red">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl text-navy">{axe.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{axe.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <CtaButton page="nous-connaitre" variant="outline">
            Découvrir nos expertises
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

/* ================= ACTUALITÉS ================= */
function News() {
  const navigate = useRouter((s) => s.navigate);
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <SectionLabel>actualités</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-navy leading-[1.12]">
              Dernières actualités
              <br />
              d’ACSF
            </h2>
          </div>
          <CtaButton page="medias" variant="outline">
            En Savoir plus
          </CtaButton>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {NEWS.map((n) => (
            <button
              key={n.id}
              onClick={() => navigate(n.id as never)}
              className="group text-left"
            >
              <div className="relative overflow-hidden rounded-2xl h-[260px] md:h-[320px]">
                <img
                  src={n.image}
                  alt={n.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium text-navy">
                  {n.date}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl md:text-2xl text-navy leading-snug group-hover:text-acsf-red transition-colors">
                {n.title}
              </h3>
              <span className="mt-3 inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                Lire l’article
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <Solutions />
      <Erreurs />
      <Axes />
      <News />
    </>
  );
}
