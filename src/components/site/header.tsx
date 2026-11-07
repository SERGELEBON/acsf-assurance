"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/lib/store";
import { NAV, type MenuItem } from "@/lib/site-data";
import { AcsfLogo } from "./logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

function NavItemLink({ item, onNavigate }: { item: MenuItem; onNavigate?: () => void }) {
  const navigate = useRouter((s) => s.navigate);
  const page = useRouter((s) => s.page);
  if (!item.page) return null;
  const active = page === item.page;
  return (
    <button
      onClick={() => {
        navigate(item.page!, item.anchor);
        onNavigate?.();
      }}
      className={cn(
        "text-left link-underline text-[15px] font-medium transition-colors hover:text-acsf-red-soft",
        active && "active text-acsf-red-soft"
      )}
    >
      {item.label}
    </button>
  );
}

/* ---------- Panneau déroulant contrôlé par état React ---------- */
function Dropdown({
  items,
  open,
  onClose,
}: {
  items: MenuItem[];
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 min-w-[290px]"
    >
      <div
        className={cn(
          "bg-white rounded-xl shadow-[0_24px_60px_-12px_rgba(24,32,82,0.3)] border border-border/60 p-6",
        )}
      >
        {items.map((item, idx) => (
          <div key={idx} className={cn(item.children && "mb-4 last:mb-0")}>
            {item.children ? (
              <>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-2.5 mt-1 first:mt-0">
                  {item.label}
                </p>
                <div className="flex flex-col gap-2.5 border-l border-border/70 pl-3 ml-0.5">
                  {item.children.map((child, i) => (
                    <NavItemLink key={i} item={child} onNavigate={onClose} />
                  ))}
                </div>
              </>
            ) : (
              <NavItemLink item={item} onNavigate={onClose} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const navigate = useRouter((s) => s.navigate);
  return (
    <div className="mt-2">
      <Accordion type="multiple" className="w-full">
        {NAV.map((item, idx) => (
          <div key={idx}>
            {item.children ? (
              <AccordionItem value={`item-${idx}`} className="border-border/60">
                <AccordionTrigger className="text-[15px] font-medium hover:no-underline py-3.5">
                  {item.label}
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <div className="flex flex-col gap-2.5 pl-1">
                    {item.children.map((child, ci) =>
                      child.page ? (
                        <button
                          key={ci}
                          onClick={() => {
                            navigate(child.page!, child.anchor);
                            onNavigate();
                          }}
                          className="text-left text-sm text-foreground/80 hover:text-acsf-red-soft transition-colors"
                        >
                          {child.label}
                        </button>
                      ) : null
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <AccordionItem value={`item-${idx}`} className="border-border/60">
                <button
                  onClick={() => {
                    navigate(item.page!);
                    onNavigate();
                  }}
                  className="flex w-full items-center justify-between py-3.5 text-[15px] font-medium"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 opacity-40" />
                </button>
              </AccordionItem>
            )}
          </div>
        ))}
      </Accordion>
      <button
        onClick={() => {
          navigate("accueil");
          onNavigate();
        }}
        className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground/70"
      >
        <Globe className="h-4.5 w-4.5" />
        English
      </button>
    </div>
  );
}

export function SiteHeader({ transparent = true }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useRouter((s) => s.navigate);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  const solid = scrolled || !transparent;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        solid
          ? "bg-navy/95 backdrop-blur-md shadow-[0_8px_30px_rgba(24,32,82,0.25)]"
          : "bg-gradient-to-b from-black/55 to-transparent"
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <button
            onClick={() => navigate("accueil")}
            aria-label="Accueil ACSF Assurances"
            className="shrink-0"
          >
            <AcsfLogo variant="white" className="h-11 w-auto" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {NAV.map((item, idx) =>
              item.children ? (
                <div key={idx} className="relative">
                  <button
                    onMouseEnter={() => open(item.label)}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    aria-expanded={openMenu === item.label}
                    className={cn(
                      "flex items-center gap-1.5 text-[15px] font-medium py-6 transition-colors",
                      openMenu === item.label ? "text-acsf-red-soft" : "text-white/90 hover:text-acsf-red-soft"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 opacity-70 transition-transform duration-300",
                        openMenu === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  <Dropdown
                    items={item.children}
                    open={openMenu === item.label}
                    onClose={() => setOpenMenu(null)}
                  />
                </div>
              ) : (
                <div key={idx} className="text-white/90 hover:text-acsf-red-soft transition-colors">
                  <NavItemLink item={item} />
                </div>
              )
            )}
            {/* Langue */}
            <button
              className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-acsf-red-soft transition-colors"
              aria-label="Switch to English"
              title="English version"
            >
              <Globe className="h-4.5 w-4.5" />
              EN
            </button>
          </nav>

          {/* Mobile burger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                aria-label="Ouvrir le menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[380px] overflow-y-auto bg-white custom-scrollbar">
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <div className="mt-2 mb-6">
                <AcsfLogo variant="navy" className="h-10 w-auto" />
              </div>
              <MobileMenu onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
