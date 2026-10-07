export default function Debug() {
  const swatches: Array<[string, string]> = [
    ["--color-terracotta", "#D4421A"],
    ["--color-turquoise", "#0F6E6E"],
    ["--color-cream", "#F2EBD9"],
    ["--color-charcoal", "#1A1A1A"],
    ["--color-ochre", "#C98B2A"],
  ];
  return (
    <main className="p-8 space-y-8">
      <section className="space-y-2">
        {swatches.map(([v, hex]) => (
          <div key={v} className="flex items-center gap-4">
            <div className="h-16 w-16 border border-charcoal" style={{ background: `var(${v})` }} />
            <code className="font-mono text-sm">{v} = {hex}</code>
          </div>
        ))}
      </section>
      <h1 className="text-7xl text-terracotta">BIG SHOULDERS DISPLAY HAVASU STAMPEDE</h1>
      <p className="text-lg">
        Space Grotesk body copy. March 19-21, 2027. Lake Havasu City, Arizona.
      </p>
    </main>
  );
}
