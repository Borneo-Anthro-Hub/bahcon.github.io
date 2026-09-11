interface SectionProps {
  id?: string;
  index: string;
  eyebrow: string;
  noBorder?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Modular content section used across pages - a numbered badge + eyebrow
 * label header, followed by a border-b divider (unless `noBorder`). Keeps
 * every section on the site announcing itself the same "wireframe module"
 * way (e.g. "01 / About").
 */
export default function Section({
  id,
  index,
  eyebrow,
  noBorder = false,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`border-border px-4 py-8 md:px-8 ${noBorder ? "" : "border-b"} ${className}`}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-4 flex items-center gap-2">
          <span className="border-border text-muted-foreground border px-1.5 py-0.5 font-mono text-[10px]">
            {index}
          </span>
          <h2 className="text-muted-foreground text-xs tracking-widest uppercase">
            {eyebrow}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
