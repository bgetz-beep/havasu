export function AtAGlance() {
  const statements = [
    "PRCA Sanctioned Rodeo",
    "March 19-21, 2027",
    "Lake Havasu City, Arizona",
  ];
  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-6xl mx-auto divide-y-2 divide-charcoal">
        {statements.map((s) => (
          <p key={s} className="font-display text-5xl md:text-7xl py-8">
            {s.toUpperCase()}
          </p>
        ))}
      </div>
    </section>
  );
}
