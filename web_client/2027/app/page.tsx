"use client";

import Link from "next/link";
import { ArrowRight, FileText, Moon, Send, Shield, Users } from "lucide-react";
import Section from "@/components/server/layout/Section";
import PlaceholderImage from "@/components/server/home/PlaceholderImage";
import HomeCta from "@/components/client/home/HomeCta";
import SocialLinks from "@/components/server/layout/SocialLinks";
import { useSiteState } from "@/components/client/SiteStateProvider";

// ---------------------------------------------------------------------------
// Brand copy — single source of truth for hero text repeated across every
// landing variant (Dormant / Teaser / Themed).
// ---------------------------------------------------------------------------

const BRAND_NAME = "Borneo Anthro Hub";
const BRAND_TAGLINE = "Where the wild meets wonderful";
const BRAND_LOCATION = "Kota Kinabalu · Sabah";
const EVENT_DAY_RANGE = "29 – 30";
const EVENT_MONTH_YEAR = "February 2027";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

/** Evergreen-only links shown on the Dormant landing page. */
const evergreenLinks = [
  { label: "About Us", href: "/about" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Volunteer", href: "/contribution" },
];

/** "What to do when I'm in Sabah?" — sub-question under the What column. */
const whatToDoButtons = [
  { label: "Food", href: "/food-guide" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/activities" },
  { label: "BAHjet Guide", href: "/bahjet-guide" },
];

/** "Where is BAH held at?" — top question in the Where column. */
const whereButtons = [
  { label: "Activities", href: "/activities" },
  { label: "How to get there?", href: "/travel" },
];

/** "How to be a part of BAH!" — sub-question under the Where column. */
const contributeButtons = [
  { label: "Art Submission", href: "/art-submission", key: "art-submission" },
  { label: "Panelist", href: "/panel-submission", key: "panelist" },
  { label: "Volunteer", href: "/contribution", key: "volunteer" },
  { label: "Dealer's Den", href: "/booth-listing", key: "dealer" },
];

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

/** A pill-link button used in the question sections. */
function PillLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full border px-5 py-2 text-sm font-medium transition-colors"
    >
      {label}
    </Link>
  );
}

/** "00 · Kota Kinabalu · Sabah" eyebrow shown above the hero title. */
function LocationBadge({
  showIndex = true,
  className = "mb-4",
}: {
  showIndex?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIndex && (
        <span className="border-border text-muted-foreground border px-1.5 py-0.5 font-mono text-[10px]">
          00
        </span>
      )}
      <p className="text-muted-foreground text-xs tracking-widest uppercase">
        {BRAND_LOCATION}
      </p>
    </div>
  );
}

/** Brand name + tagline, sized consistently across every hero variant. */
function BrandTitle({
  titleClassName = "mb-2",
  taglineClassName = "mb-8",
}: {
  titleClassName?: string;
  taglineClassName?: string;
}) {
  return (
    <>
      <h1
        className={`font-display text-brand-accent text-4xl md:text-5xl ${titleClassName}`}
      >
        {BRAND_NAME}
      </h1>
      <p
        className={`font-heading text-muted-foreground text-lg md:text-xl ${taglineClassName}`}
      >
        {BRAND_TAGLINE}
      </p>
    </>
  );
}

/** Event date badge ("29 – 30" + "February 2027" pill). */
function DateBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="text-center">
        <p className="font-display text-foreground text-4xl leading-none md:text-5xl">
          {EVENT_DAY_RANGE}
        </p>
      </div>
      <div className="bg-primary text-primary-foreground font-caption rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
        {EVENT_MONTH_YEAR}
      </div>
    </div>
  );
}

/** Bordered status/teaser card shared by the Dormant and Teaser heroes. */
function MessageCard({
  className = "max-w-md p-5",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border-border bg-card w-full rounded-lg border text-center ${className}`}
    >
      {children}
    </div>
  );
}

/** Full-bleed placeholder banner (art asset drop-in later), optionally with overlaid text. */
function FullBleedBanner({
  aspectRatio,
  label,
  children,
}: {
  aspectRatio: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <PlaceholderImage
        className="w-full"
        aspectRatio={aspectRatio}
        label={label}
      />
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          {children}
        </div>
      )}
    </div>
  );
}

/** Hanging "signpost" pair (heading plank + pill plank) used in the Explore grid. */
function SignpostGroup({
  icon,
  title,
  subtitle,
  links,
}: {
  icon: string;
  title: string;
  subtitle: string;
  links: { label: string; href: string; key?: string }[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center">
      <div className="bg-brand-surface text-brand-text w-full rounded-xl px-4 py-3 text-center shadow-md">
        <span className="bg-brand-accent text-brand-surface mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full text-sm">
          {icon}
        </span>
        <p className="font-heading text-base leading-tight">{title}</p>
        <p className="text-brand-text/70 text-[11px]">{subtitle}</p>
      </div>
      <div className="bg-brand-surface/40 h-4 w-px" aria-hidden="true" />
      <div className="bg-brand-surface/90 flex w-full flex-wrap justify-center gap-2 rounded-xl px-3 py-3 shadow-md">
        {links.map((l) => (
          <Link
            key={l.key ?? l.href}
            href={l.href}
            className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-90"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dormant landing (no theme — evergreen only)
// ---------------------------------------------------------------------------

/** Decorative paw-print used as a soft watermark on the dormant hero. */
function PawPrint({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <ellipse cx="32" cy="42" rx="12" ry="10" />
      <ellipse cx="14" cy="25" rx="5" ry="7" transform="rotate(-22 14 25)" />
      <ellipse cx="25" cy="17" rx="5" ry="7" transform="rotate(-8 25 17)" />
      <ellipse cx="39" cy="17" rx="5" ry="7" transform="rotate(8 39 17)" />
      <ellipse cx="50" cy="25" rx="5" ry="7" transform="rotate(22 50 25)" />
    </svg>
  );
}

/** A small "at a glance" fact chip used in the dormant About section. */
function FactChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-border bg-card text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
      <span
        className="bg-brand-accent h-1.5 w-1.5 rounded-full"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}

/** A hover-lift icon card used in the dormant Policies section. */
function PolicyCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group border-border bg-card hover:border-brand-accent/60 flex flex-col items-start gap-3 rounded-2xl border p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="bg-brand-subtle text-brand-surface group-hover:bg-brand-accent/25 flex h-11 w-11 items-center justify-center rounded-xl transition-colors">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-heading text-base">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
      <span className="text-brand-accent mt-auto inline-flex items-center gap-1.5 text-sm font-medium">
        Read more
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function DormantHome() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ================================================================ */}
      {/* HERO — immersive "jungle at rest" scene                          */}
      {/* ================================================================ */}
      <section className="border-brand-surface/20 relative overflow-hidden border-b px-4 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        {/* Layered jungle-dusk wash */}
        <div
          aria-hidden="true"
          className="from-brand-surface via-brand-bg to-brand-bg absolute inset-0 bg-linear-to-b"
        />
        {/* Soft sun glow + coral ground light */}
        <div
          aria-hidden="true"
          className="animate-glow-pulse bg-brand-accent/30 absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl md:h-112 md:w-md"
        />
        <div
          aria-hidden="true"
          className="bg-brand-secondary/25 absolute -bottom-32 -left-24 h-72 w-72 rounded-full blur-3xl"
        />
        {/* Film grain */}
        <div aria-hidden="true" className="noise-overlay absolute inset-0" />
        {/* Drifting paw prints */}
        <PawPrint className="text-brand-accent/25 animate-float absolute top-8 right-4 w-24 rotate-12 md:right-12 md:w-36" />
        <PawPrint className="text-brand-text/10 animate-float-slow absolute bottom-6 left-4 w-28 -rotate-12 md:left-12 md:w-44" />
        <PawPrint className="text-brand-secondary/20 animate-float-slow absolute top-1/3 left-1/4 hidden w-20 -rotate-6 md:block" />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
          {/* Eyebrow chip */}
          <div className="animate-fade-up border-brand-text/20 mb-6 inline-flex items-center gap-2 rounded-full border bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span
              className="bg-brand-accent h-1.5 w-1.5 rounded-full"
              aria-hidden="true"
            />
            <p className="text-brand-text/90 font-mono text-[11px] tracking-[0.25em] uppercase">
              {BRAND_LOCATION}
            </p>
          </div>

          {/* Title + tagline */}
          <h1 className="font-display text-brand-text animate-fade-up text-5xl leading-[1.05] drop-shadow-sm [animation-delay:80ms] md:text-7xl">
            Borneo <span className="text-brand-accent">Anthro</span> Hub
          </h1>
          <p className="font-heading text-brand-text/80 animate-fade-up mt-4 text-lg [animation-delay:160ms] md:text-xl">
            {BRAND_TAGLINE}
          </p>

          {/* Status card — frosted glass over the dusk scene */}
          <div className="animate-fade-up relative mt-10 w-full max-w-md [animation-delay:240ms]">
            <div className="border-brand-text/15 shadow-brand-surface/40 rounded-3xl border bg-white/10 p-6 text-center shadow-2xl backdrop-blur-md md:p-8">
              <span className="border-brand-accent/40 bg-brand-accent/15 text-brand-accent inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase">
                <span
                  className="bg-brand-accent h-1.5 w-1.5 animate-pulse rounded-full"
                  aria-hidden="true"
                />
                Between events
              </span>

              <div className="text-brand-accent bg-brand-accent/15 relative mx-auto mt-5 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Moon className="h-6 w-6" />
                <span className="text-brand-text/70 absolute -top-1 -right-2 font-mono text-[10px]">
                  zzz
                </span>
              </div>

              <h2 className="font-heading text-brand-text text-2xl md:text-3xl">
                The garden&rsquo;s resting for now
              </h2>
              <p className="text-brand-text/75 mx-auto mt-2 max-w-sm text-sm leading-relaxed">
                We&rsquo;re between events &mdash; stay tuned for our next
                gathering in Kota Kinabalu.
              </p>

              {/* <div className="mt-6 flex justify-center">
                <a
                  href="mailto:admin@borneoanthrohub.com?subject=Notify me when BAH wakes up"
                  className="font-caption text-brand-surface bg-brand-accent hover:bg-brand-hover shadow-brand-accent/25 focus-visible:ring-brand-accent inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold tracking-wide uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  Notify me
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div> */}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="animate-fade-up text-brand-text/50 mt-12 hidden flex-col items-center gap-2 [animation-delay:320ms] md:flex">
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase">
              Scroll to explore
            </span>
            <span className="from-brand-text/60 h-10 w-px bg-linear-to-b to-transparent" />
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" index="01" eyebrow="About">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            Borneo Anthro Hub (BAH) is a home-grown celebration of the anthro
            and furry community in Southeast Asia &mdash; a welcoming hub built
            for connection, joy, and Bornean warmth, right here in Kota
            Kinabalu, Sabah.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <FactChip>Kota Kinabalu · Sabah</FactChip>
            <FactChip>Anthro &amp; furry</FactChip>
            <FactChip>Community-driven</FactChip>
          </div>
          <div className="mt-7 flex justify-center gap-3">
            <PillLink label="About Us" href="/about" />
          </div>
        </div>
      </Section>

      {/* Get involved */}
      <Section id="get-involved" index="02" eyebrow="Get Involved">
        <div className="border-brand-accent/30 from-brand-subtle relative mx-auto max-w-2xl overflow-hidden rounded-2xl border bg-linear-to-br via-white to-white p-6 text-center md:p-8">
          <div
            aria-hidden="true"
            className="bg-brand-accent/10 absolute -top-16 -right-16 h-40 w-40 rounded-full blur-2xl"
          />
          <div className="relative">
            <span className="bg-brand-accent/15 text-brand-surface mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Users className="h-6 w-6" />
            </span>
            <h3 className="font-heading text-xl md:text-2xl">
              A place for you when we wake up
            </h3>
            <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-relaxed">
              BAH is built by the community, for the community. When the next
              crew recruitment opens, there&rsquo;s a place for you &mdash; no
              prior experience needed, just a willingness to help.
            </p>
            {/* <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <PillLink label="Volunteer" href="/contribution" />
              <a
                href="mailto:admin@borneoanthrohub.com?subject=Recruitment - keep me posted"
                className="font-caption text-brand-surface hover:bg-brand-surface hover:text-brand-text border-brand-surface/30 inline-flex items-center rounded-full border px-5 py-2 text-sm font-bold tracking-wide uppercase transition-colors"
              >
                Keep me posted
              </a>
            </div> */}
          </div>
        </div>
      </Section>

      {/* Policies */}
      <Section id="policies" index="03" eyebrow="Policies">
        <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-center text-sm leading-relaxed">
          A safe, inclusive, and welcoming experience is at the heart of BAH.
          Please take a moment to read our community guidelines.
        </p>
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <PolicyCard
            icon={Shield}
            title="Code of Conduct"
            description="Our shared promise for a safe, inclusive, and harassment-free space — for attendees, artists, and fursuiters alike."
            href="/code-of-conduct"
          />
          <PolicyCard
            icon={FileText}
            title="Terms & Conditions"
            description="The fine print that keeps every visit smooth — registration, ticketing, venue rules, and more."
            href="/terms-and-conditions"
          />
        </div>
      </Section>

      {/* Stay connected */}
      <Section id="connect" index="04" eyebrow="Stay Connected" noBorder>
        <div className="border-border bg-card mx-auto max-w-lg rounded-2xl border p-6 text-center md:p-8">
          <span className="bg-brand-subtle text-brand-surface mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Send className="h-5 w-5" />
          </span>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Follow along for announcements, art, and community updates &mdash;
            and drop us a line anytime.
          </p>
          <div className="border-border bg-brand-subtle mt-6 inline-flex items-center justify-center gap-4 rounded-full border px-6 py-3">
            <SocialLinks linkClassName="text-brand-surface/70 transition-colors hover:text-brand-accent" />
          </div>
          <div className="mt-5">
            <a
              href="mailto:admin@borneoanthrohub.com"
              className="text-brand-accent inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            >
              admin@borneoanthrohub.com
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Teaser landing (coming soon — theme announced, no convention details yet)
// ---------------------------------------------------------------------------

function ComingSoonHome() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero — name + date + teaser message, no venue image / full CTA */}
      <section className="border-border relative border-b px-4 pt-10 pb-8 md:px-8 md:pt-14 md:pb-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <LocationBadge showIndex={false} className="mb-1" />
          <BrandTitle titleClassName="mb-2" taglineClassName="mb-6" />

          {/* Date badge */}
          <DateBadge className="mb-8" />

          {/* Teaser message */}
          <MessageCard className="max-w-lg p-6">
            <p className="font-heading text-foreground mb-2 text-lg">
              Something&rsquo;s Coming
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The theme has been chosen and the team is hard at work. Full
              convention details — venue, guests, activities, and travel guides
              — will be revealed soon. Stay tuned!
            </p>
          </MessageCard>
        </div>
      </section>

      {/* Evergreen links */}
      <Section id="evergreen" index="01" eyebrow="Information">
        <p className="text-muted-foreground mx-auto mb-6 max-w-lg text-center text-sm leading-relaxed">
          Borneo Anthro Hub (BAH) is a home-grown celebration of the anthro and
          furry community in Southeast Asia — a weekend packed with panels, art,
          fursuiting, dances, and good vibes, right here in Kota Kinabalu,
          Sabah.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {evergreenLinks.map((link) => (
            <PillLink key={link.href} {...link} />
          ))}
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Themed landing (Announcement onward)
// ---------------------------------------------------------------------------

function ThemedHome() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ================================================================ */}
      {/* THEME BANNERS — year theme art, replace placeholders with real  */}
      {/* illustrations when ready.                                        */}
      {/* ================================================================ */}
      <FullBleedBanner aspectRatio="9/2" label="Tinyverse Garden Banner">
        <p className="font-display text-brand-surface text-4xl drop-shadow-sm md:text-5xl">
          Tinyverse Garden
        </p>
        <p className="font-heading text-brand-surface/80 mt-1 text-sm md:text-base">
          to be lost in the big, big garden&hellip;
        </p>
      </FullBleedBanner>
      <FullBleedBanner aspectRatio="16/5" label="Theme Illustration" />

      {/* ================================================================ */}
      {/* HERO — name, date, tagline                                       */}
      {/* ================================================================ */}
      <section className="border-border relative border-b px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <LocationBadge />
          <BrandTitle titleClassName="mb-2" taglineClassName="mb-8" />
          <DateBadge />
        </div>
      </section>

      {/* ================================================================ */}
      {/* FESTIVAL TEASER — venue photo + compass badge / ticket card      */}
      {/* ================================================================ */}
      <Section id="festival" index="01" eyebrow="Borneo&rsquo;s Next Festival">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Venue photo + compass badge */}
          <div className="relative mx-auto w-full max-w-sm">
            <PlaceholderImage
              className="border-card absolute -top-6 -left-4 z-10 h-20 w-20 rounded-full border-4 shadow-md"
              aspectRatio="1/1"
              label="Compass"
            />
            <PlaceholderImage
              className="border-border rounded-lg border"
              aspectRatio="4/3"
              label="Mount Kinabalu"
            />
            <div className="bg-primary text-primary-foreground absolute bottom-3 left-3 rounded-md px-3 py-1.5 shadow">
              <p className="text-xs font-bold">Mount Kinabalu</p>
              <p className="text-[10px] font-normal opacity-90">Event Venue</p>
            </div>
          </div>

          {/* Ticket card */}
          <div className="border-brand-accent bg-card mx-auto w-full max-w-sm rounded-2xl border-2 border-dashed p-6">
            <p className="text-brand-accent mb-2 text-sm font-bold tracking-wide uppercase">
              Borneo&rsquo;s Next Festival
            </p>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              The next chapter for East Malaysia unfolds. Borneo Anthro Hub
              brings together fans, artists, and fursuiters for a weekend of
              creativity and connection, set against the natural beauty of
              Sabah.
            </p>
            <HomeCta />
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/* EXPLORE BAH — What? (left) / Where? (right), each paired with a */}
      {/* sub-question sign, mirroring the hanging signpost layout mockup. */}
      {/* ================================================================ */}
      <Section
        id="explore"
        index="02"
        eyebrow="Explore BAH"
        className="bg-brand-subtle"
      >
        <div className="grid gap-8 md:grid-cols-2">
          {/* What column */}
          <div className="flex flex-col items-center gap-6">
            <SignpostGroup
              icon="?"
              title="What?"
              subtitle="is BAH?"
              links={[{ label: "About Us", href: "/about" }]}
            />
            <SignpostGroup
              icon="🍴"
              title="What to do"
              subtitle="when I&rsquo;m in Sabah?"
              links={whatToDoButtons}
            />
          </div>

          {/* Where column */}
          <div className="flex flex-col items-center gap-6">
            <SignpostGroup
              icon="📍"
              title="Where?"
              subtitle="is BAH held at?"
              links={whereButtons}
            />
            <SignpostGroup
              icon="🎫"
              title="How to be"
              subtitle="a part of BAH!"
              links={contributeButtons}
            />
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/* GUEST(S) OF HONOUR                                               */}
      {/* ================================================================ */}
      <Section id="goh" index="03" eyebrow="Guest(s) of Honour" noBorder>
        <div className="mx-auto max-w-lg">
          <PlaceholderImage
            className="border-border mb-4 rounded-lg border"
            aspectRatio="16/9"
            label="Guests of Honour"
          />
          <div className="text-center">
            <PillLink label="Guests of Honour" href="/guest-of-honor" />
          </div>
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page (branches on site state)
// ---------------------------------------------------------------------------

export default function Home() {
  // Reads the shared client context (seeded from getSiteState() in
  // layout.tsx) so the DevSiteStateSwitcher can preview instantly.
  const { state } = useSiteState();

  if (state === "D") {
    return <DormantHome />;
  }

  if (state === "T") {
    return <ComingSoonHome />;
  }

  return <ThemedHome />;
}
