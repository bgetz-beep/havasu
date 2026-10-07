export function TicketsBlock() {
  return (
    <section className="bg-charcoal text-cream border-b-2 border-charcoal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-16 py-20 max-w-7xl mx-auto">
        <div>
          <p className="font-body text-sm uppercase tracking-widest text-ochre">
            Tickets
          </p>
          <h2 className="font-display text-6xl lg:text-7xl mt-4">
            BUY ONLINE,<br />SAVE $5.
          </h2>
          <p className="font-body text-base mt-6 max-w-md">
            Advance tickets are $5 less than at the gate. Multiple-night passes
            available. All sales handled by rodeoticket.com.
          </p>
        </div>
        <div className="flex items-center justify-center lg:justify-end">
          <a
            href="https://www.rodeoticket.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-terracotta text-cream px-10 py-8 font-display text-3xl md:text-4xl hover:bg-ochre transition-colors"
          >
            GET TICKETS ↗
          </a>
        </div>
      </div>
    </section>
  );
}
