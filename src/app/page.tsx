"use client";

import { useEffect } from "react";
import { useRouter } from "@/lib/store";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { HomePage } from "@/components/site/home-page";
import { NousConnaitrePage } from "@/components/site/nous-connaitre-page";
import {
  EntreprisesPage,
  ParticuliersPage,
  SantePage,
  ProtectionCapitauxPage,
  GarantieFinancierePage,
} from "@/components/site/solutions-pages";
import { MediasPage, PressPage, CarrieresPage } from "@/components/site/medias-carrieres-pages";
import { ContactPage, LegalPage } from "@/components/site/contact-legal-pages";

function PageContent() {
  const page = useRouter((s) => s.page);

  if (page === "accueil") return <HomePage />;
  if (page === "nous-connaitre") return <NousConnaitrePage />;
  if (page === "entreprises") return <EntreprisesPage />;
  if (page === "particuliers") return <ParticuliersPage />;
  if (page === "sante") return <SantePage />;
  if (page === "protection-capitaux") return <ProtectionCapitauxPage />;
  if (page === "garantie-financiere") return <GarantieFinancierePage />;
  if (page === "medias") return <MediasPage />;
  if (page === "carrieres") return <CarrieresPage />;
  if (page === "contactez-nous") return <ContactPage />;
  if (page === "mentions-legales" || page === "protection-donnees" || page === "gestion-cookies")
    return <LegalPage id={page} />;
  if (page === "presse-campagne" || page === "presse-partenaire")
    return <PressPage id={page} />;

  // Page inconnue → accueil
  return <HomePage />;
}

export default function Site() {
  const syncFromHash = useRouter((s) => s.syncFromHash);
  const anchor = useRouter((s) => s.anchor);

  useEffect(() => {
    syncFromHash();
    const onPop = () => syncFromHash();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [syncFromHash]);

  // Défilement vers l'ancre au chargement direct d'une URL avec ancre
  useEffect(() => {
    if (!anchor) return;
    const t = setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
    return () => clearTimeout(t);
  }, [anchor]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <PageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
