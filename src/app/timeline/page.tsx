import TimeBlock from "@/components/timeline/TimeBlock";
import { geologicalTimescale } from "@/data/geological-timescale";

export default function TimelinePage() {
  return (
    <section className="page-container">
      <div className="page-header">
        <span className="eyebrow">DEEP TIME</span>
        <h1>Linha do tempo geológica</h1>
        <p>
          Explore a história da Terra começando pelos grandes éons.
        </p>
      </div>

      <div className="time-grid">
        {geologicalTimescale.map((interval) => (
          <TimeBlock key={interval.id} interval={interval} />
        ))}
      </div>
    </section>
  );
}
