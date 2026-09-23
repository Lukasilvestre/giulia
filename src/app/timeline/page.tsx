import TimelineExplorer from "@/components/timeline/TimelineExplorer";

import {
  geologicalTimescale,
} from "@/data/geological-timescale";

interface TimelinePageProps {
  searchParams: Promise<{
    focus?: string;
  }>;
}

export default async function TimelinePage({
  searchParams,
}: TimelinePageProps) {
  const params =
    await searchParams;

  return (
    <main className="timeline-page-v1">
      <header className="timeline-hero-v1">
        <span className="eyebrow">
          GEOLOGICAL TIME
        </span>

        <h1>
          Navegue pela história
          da Terra.
        </h1>

        <p>
          Explore a escala
          geológica hierarquicamente:
          selecione um éon, depois
          uma era e então um período
          para acessar seus dados,
          organismos, fósseis e
          reconstruções.
        </p>
      </header>

      <TimelineExplorer
        intervals={
          geologicalTimescale
        }
        initialFocus={
          params.focus
        }
      />
    </main>
  );
}