import WireframeFrame from "@/components/server/layout/WireframeFrame";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  index?: string;
}

export default function PageHero({
  eyebrow,
  title,
  description,
  index = "00",
}: PageHeroProps) {
  return (
    <section className="border-border border-b px-4 py-10 md:px-8">
      <WireframeFrame className="mx-auto flex max-w-md flex-col items-center gap-4 p-6 text-center">
        <div className="flex items-center gap-2">
          <span className="border-border text-muted-foreground border px-1.5 py-0.5 font-mono text-[10px]">
            {index}
          </span>
          <p className="text-muted-foreground text-xs tracking-widest uppercase">
            {eyebrow}
          </p>
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </WireframeFrame>
    </section>
  );
}
