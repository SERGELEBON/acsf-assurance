"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/lib/store";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- Bannière des pages intérieures ---------- */
export function PageHero({
  title,
  subtitle,
  image,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative min-h-[380px] md:min-h-[460px] flex items-end overflow-hidden bg-navy">
      <div
        className="absolute inset-0 bg-cover bg-center animate-ken-burns"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-12 md:pb-16 pt-40">
        {breadcrumb && (
          <p className="text-xs tracking-[0.22em] uppercase text-acsf-red-soft mb-3 animate-fade-up">
            {breadcrumb}
          </p>
        )}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white max-w-3xl leading-[1.08] animate-fade-up delay-100">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed animate-fade-up delay-200">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------- Compteur animé ---------- */
export function Counter({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const [display, setDisplay] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.max(1, Math.round(eased * value)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex items-baseline gap-2">
      <span className="font-display text-5xl md:text-6xl text-navy">
        {display}
        <span className="text-acsf-red">{suffix}</span>
      </span>
      <span className="text-sm md:text-base text-muted-foreground">{label}</span>
    </div>
  );
}

/* ---------- Bouton CTA ---------- */
export function CtaButton({
  page,
  anchor,
  children,
  variant = "primary",
  className,
}: {
  page?: Parameters<ReturnType<typeof useRouter.getState>["navigate"]>[0];
  anchor?: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "white";
  className?: string;
}) {
  const navigate = useRouter((s) => s.navigate);
  return (
    <button
      onClick={() => page && navigate(page, anchor)}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[15px] font-medium transition-all duration-300",
        variant === "primary" &&
          "bg-acsf-red text-white hover:bg-white hover:text-navy hover:shadow-[0_10px_35px_rgba(227,6,19,0.4)]",
        variant === "outline" &&
          "border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-white",
        variant === "white" &&
          "border border-white/40 text-white hover:bg-white hover:text-navy",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

/* ---------- Étiquette de section ---------- */
export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={cn("section-label", light && "!text-acsf-red-soft")}>{children}</p>
  );
}

/* ---------- Bandeau contact CTA réutilisable ---------- */
export function ContactCta() {
  const navigate = useRouter((s) => s.navigate);
  return (
    <section className="relative overflow-hidden bg-navy py-16 md:py-20">
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/acsf-abidjan.jpg)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">
            Anticiper aujourd’hui, protéger demain.
          </h2>
          <p className="mt-3 text-white/75">
            ACSF : votre partenaire de confiance. Nos experts vous accompagnent dans la gestion et la
            maîtrise de vos risques.
          </p>
        </div>
        <button
          onClick={() => navigate("contactez-nous")}
          className="group inline-flex items-center gap-3 rounded-full bg-acsf-red px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-white hover:text-navy hover:shadow-[0_10px_35px_rgba(227,6,19,0.4)]"
        >
          Contactez-nous
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
