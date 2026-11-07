"use client";

import { useState } from "react";
import { COMPANY, CONTACT_COUNTRIES, CONTACT_TYPES } from "@/lib/site-data";
import { PageHero, SectionLabel } from "./shared";
import { MapPin, Phone, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

export function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    country: "",
    enquiryType: "",
    message: "",
    accepted: false,
    quiz: "",
  });
  const [quizA] = useState(() => 2 + Math.floor(Math.random() * 8));
  const [quizB] = useState(() => 2 + Math.floor(Math.random() * 8));
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.country || !form.enquiryType || !form.message) {
      toast({ title: "Champs manquants", description: "Merci de remplir tous les champs obligatoires (*).", variant: "destructive" });
      return;
    }
    if (!form.accepted) {
      toast({ title: "Consentement requis", description: "Merci d’accepter la politique de protection des données.", variant: "destructive" });
      return;
    }
    if (parseInt(form.quiz, 10) !== quizA + quizB) {
      toast({ title: "Vérification incorrecte", description: "Le résultat du calcul est incorrect.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quizExpected: quizA + quizB }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur d’envoi");
      setDone(true);
      toast({ title: "Message envoyé", description: "Nous reviendrons vers vous dans les meilleurs délais." });
    } catch (err) {
      toast({ title: "Erreur", description: err instanceof Error ? err.message : "Une erreur est survenue.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        title="Contactez-nous"
        subtitle="Nos experts vous accompagnent dans l’identification, la compréhension et la maîtrise de vos risques, à Abidjan et partout en Côte d’Ivoire."
        image="/images/acsf-contact.jpg"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Formulaire */}
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="mt-4 font-display text-3xl md:text-4xl text-navy">CONTACTEZ-NOUS</h2>

              {done ? (
                <div className="mt-10 rounded-2xl border border-acsf-red/50 bg-secondary p-10 text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-acsf-red" />
                  <h3 className="mt-5 font-display text-2xl text-navy">Merci pour votre message</h3>
                  <p className="mt-3 text-sm text-foreground/70 max-w-md mx-auto">
                    Votre demande a bien été transmise. Un de nos conseillers vous recontactera dans
                    les meilleurs délais.
                  </p>
                  <button
                    onClick={() => {
                      setDone(false);
                      setForm({ firstName: "", lastName: "", email: "", tel: "", country: "", enquiryType: "", message: "", accepted: false, quiz: "" });
                    }}
                    className="mt-6 text-sm font-medium text-acsf-red hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-10 grid gap-5 sm:grid-cols-2" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Prénom <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Nom <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="vous@exemple.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tel">Téléphone</Label>
                    <Input
                      id="tel"
                      type="tel"
                      value={form.tel}
                      onChange={(e) => set("tel", e.target.value)}
                      placeholder="+225 07 57 97 80 80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Pays <span className="text-destructive">*</span>
                    </Label>
                    <Select value={form.country} onValueChange={(v) => set("country", v)}>
                      <SelectTrigger aria-label="Pays">
                        <SelectValue placeholder="Sélectionnez votre pays" />
                      </SelectTrigger>
                      <SelectContent className="max-h-72 custom-scrollbar">
                        {CONTACT_COUNTRIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Type de demande <span className="text-destructive">*</span>
                    </Label>
                    <Select value={form.enquiryType} onValueChange={(v) => set("enquiryType", v)}>
                      <SelectTrigger aria-label="Type de demande">
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTACT_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Décrivez votre besoin..."
                      rows={6}
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="quiz">
                      Vérification : combien font {quizA} + {quizB} ? <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="quiz"
                      inputMode="numeric"
                      value={form.quiz}
                      onChange={(e) => set("quiz", e.target.value.replace(/[^\d]/g, ""))}
                      placeholder="Votre réponse"
                      className="max-w-[200px]"
                    />
                  </div>
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <Checkbox
                      id="accept"
                      checked={form.accepted}
                      onCheckedChange={(v) => set("accepted", v === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="accept" className="text-sm font-normal leading-relaxed cursor-pointer">
                      J’ai lu et j’accepte la Politique de protection de données personnelles
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground sm:col-span-2">
                    *Tous les champs sont obligatoires
                  </p>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex items-center gap-3 rounded-full bg-acsf-red px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-navy hover:text-white disabled:opacity-60"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      )}
                      Envoyer le message
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Coordonnées ACSF */}
            <aside className="self-start lg:sticky lg:top-28">
              <div className="rounded-2xl bg-navy p-8 text-white">
                <h3 className="font-display text-2xl">Nos bureaux</h3>
                <ul className="mt-6 space-y-5 text-sm">
                  <li className="flex gap-3.5">
                    <MapPin className="h-5 w-5 shrink-0 text-acsf-red-soft" />
                    <span className="text-white/85 leading-relaxed">
                      ACSF Assurances
                      <br />
                      Immeuble Harmonies
                      <br />
                      Plateau – Abidjan, Côte d’Ivoire
                    </span>
                  </li>
                  {COMPANY.phones.map((p, i) => (
                    <li key={p} className="flex gap-3.5 items-center">
                      <Phone className="h-5 w-5 shrink-0 text-acsf-red-soft" />
                      <a href={COMPANY.phoneLinks[i]} className="text-white/85 hover:text-acsf-red-soft transition-colors">
                        {p}
                      </a>
                    </li>
                  ))}
                  <li className="flex gap-3.5 items-center">
                    <Mail className="h-5 w-5 shrink-0 text-acsf-red-soft" />
                    <a href={`mailto:${COMPANY.email}`} className="text-white/85 hover:text-acsf-red-soft transition-colors">
                      {COMPANY.email}
                    </a>
                  </li>
                </ul>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-sm text-white/65 leading-relaxed">
                    Vous êtes une entreprise ou un particulier ? Nos experts sont à votre écoute :
                    anticipez aujourd’hui, protégez demain.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============ PAGES LÉGALES ============ */

const LEGAL_CONTENT: Record<string, { title: string; sections: { h: string; p: string[] }[] }> = {
  "mentions-legales": {
    title: "Mentions légales",
    sections: [
      {
        h: "Éditeur du site",
        p: [
          "Le présent site est édité par ACSF Assurances, Conseils & Services Financiers (ACSF-ASSURANCES), société de courtage d’assurance, dont le siège social est situé Immeuble Harmonies, Plateau – Abidjan, Côte d’Ivoire.",
          "Directeur de la publication : le Dirigeant d’ACSF-ASSURANCES.",
          "Contact : infos.acsf@gmail.com – +225 07 57 97 80 80 / +225 01 53 63 93 93.",
        ],
      },
      {
        h: "Hébergement",
        p: ["Le site est hébergé par un prestataire professionnel garantissant un niveau de disponibilité et de sécurité adapté."],
      },
      {
        h: "Propriété intellectuelle",
        p: [
          "L’ensemble des contenus présents sur ce site (textes, visuels, logos, marques, vidéos) est la propriété d’ACSF-ASSURANCES ou de ses partenaires. Toute reproduction, représentation ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite.",
        ],
      },
      {
        h: "Responsabilité",
        p: [
          "Les informations diffusées sur ce site le sont à titre indicatif et ne constituent pas une offre contractuelle. ACSF s’efforce d’assurer leur exactitude et leur mise à jour, sans pouvoir garantir l’absence d’erreurs ou d’omissions.",
        ],
      },
    ],
  },
  "protection-donnees": {
    title: "Protection de données personnelles",
    sections: [
      {
        h: "Responsable du traitement",
        p: ["ACSF Assurances, Conseils & Services Financiers, Immeuble Harmonies, Plateau – Abidjan, Côte d’Ivoire, est responsable des traitements de données personnelles réalisés via ce site."],
      },
      {
        h: "Données collectées",
        p: [
          "Via le formulaire de contact, nous collectons : prénom, nom, adresse email, numéro de téléphone, pays, type de demande et contenu du message. Ces données sont utilisées uniquement pour répondre à votre demande.",
        ],
      },
      {
        h: "Durée de conservation",
        p: ["Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis archivées conformément à nos obligations légales."],
      },
      {
        h: "Vos droits",
        p: [
          "Conformément à la réglementation applicable, vous disposez d’un droit d’accès, de rectification, d’opposition, d’effacement et de portabilité de vos données. Pour l’exercer, contactez-nous à l’adresse infos.acsf@gmail.com.",
        ],
      },
    ],
  },
  "gestion-cookies": {
    title: "Gestion des cookies",
    sections: [
      {
        h: "Qu’est-ce qu’un cookie ?",
        p: ["Un cookie est un petit fichier déposé sur votre terminal lors de la visite d’un site. Il permet notamment d’assurer le bon fonctionnement du site et de mesurer son audience."],
      },
      {
        h: "Cookies utilisés",
        p: [
          "Cookies techniques nécessaires au fonctionnement du site (session, préférences d’affichage, consentement). Ces cookies ne requièrent pas de consentement.",
        ],
      },
      {
        h: "Gérer vos préférences",
        p: [
          "Vous pouvez à tout moment paramétrer votre navigateur pour refuser les cookies. La désactivation de certains cookies peut toutefois altérer votre expérience de navigation.",
        ],
      },
    ],
  },
};

export function LegalPage({ id }: { id: string }) {
  const content = LEGAL_CONTENT[id];
  if (!content) return null;
  return (
    <>
      <PageHero
        breadcrumb="Informations légales"
        title={content.title}
        image="/images/acsf-contact.jpg"
      />
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[860px] px-4 sm:px-6 lg:px-10 space-y-12">
          {content.sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-2xl md:text-3xl text-navy pb-3 border-b-2 border-acsf-red/60">
                {s.h}
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-foreground/75">
                {s.p.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
