export function PageHero({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="bg-cream border-b-2 border-charcoal px-6 lg:px-16 py-16">
      <p className="font-body text-sm uppercase tracking-widest">{eyebrow}</p>
      <h1 className="font-display text-6xl md:text-8xl mt-4">
        {title.toUpperCase()}
      </h1>
    </section>
  );
}
