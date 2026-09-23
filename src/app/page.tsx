import Link from "next/link";
import TimeBlock from "@/components/timeline/TimeBlock";
import { geologicalTimescale } from "@/data/geological-timescale";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            EXPLORE DEEP TIME
          </span>

          <h1>
            A histÃ³ria da Terra,
            <br />
            explorada no tempo.
          </h1>

          <p>
            Viaje por bilhÃµes de anos de histÃ³ria geolÃ³gica,
            explore os mundos do passado e acompanhe a
            evoluÃ§Ã£o da vida na Terra.
          </p>

          <div className="hero-buttons">
            <Link href="/timeline" className="primary-button">
              Explorar linha do tempo
            </Link>

            <a href="#eons" className="secondary-button">
              Conhecer os Ã©ons
            </a>
          </div>
        </div>

        <div className="earth-container">
          <div className="earth" />

          <span className="earth-caption">
            4,6 bilhÃµes de anos de histÃ³ria
          </span>
        </div>
      </section>

      <section className="intro-section" id="eons">
        <div className="section-heading">
          <span className="eyebrow">
            GEOLOGICAL TIME
          </span>

          <h2>
            Os grandes capÃ­tulos da Terra
          </h2>

          <p>
            A histÃ³ria geolÃ³gica da Terra pode ser organizada
            hierarquicamente em Ã©ons, eras, perÃ­odos, Ã©pocas e idades.
          </p>
        </div>

        <div className="time-grid">
          {geologicalTimescale.map((interval) => (
            <TimeBlock
              key={interval.id}
              interval={interval}
            />
          ))}
        </div>
      </section>

      <section className="timeline-preview">
        <span className="timeline-label">
          4,6 Ga
        </span>

        <div className="timeline-line">
          {geologicalTimescale.map((interval) => (
            <div
              key={interval.id}
              className="timeline-segment"
              style={{
                backgroundColor: interval.color,
                flexGrow:
                  interval.startMa - interval.endMa,
              }}
              title={interval.namePt}
            />
          ))}
        </div>

        <span className="timeline-label">
          Hoje
        </span>
      </section>
    </>
  );
}

