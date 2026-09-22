const CLIENTS = ['AETHER', 'LUMEN', 'KIN', 'ORBITAL', 'VANTAGE', 'NORTH', 'HALO', 'RIDGE'];

export default function Clients() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28" id="clients">
      <h2 className="font-display text-xs tracking-[0.28em] text-muted">TRUSTED BY</h2>
      <ul className="mt-10 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        {CLIENTS.map((name) => (
          <li key={name} className="bg-ink">
            <div className="flex h-28 items-center justify-center text-paper/35 transition duration-500 hover:scale-[1.04] hover:text-paper">
              <span className="font-display text-xl tracking-[0.2em] md:text-2xl">{name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
