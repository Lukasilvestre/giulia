import Link from "next/link";
import { notFound } from "next/navigation";

import TimeBlock from "@/components/timeline/TimeBlock";
import IntervalExplorer from "@/components/interval/IntervalExplorer";

import {
  findIntervalBySlug,
  findIntervalPath,
} from "@/lib/geologicalTime";

import { getIntervalContent } from "@/data/intervals";

interface IntervalPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function IntervalPage({
  params,
}: IntervalPageProps) {
  const { slug } = await params;

  const interval = findIntervalBySlug(slug);
  const path = findIntervalPath(slug);

  if (!interval || !path) {
    notFound();
  }

  const scientificContent =
    getIntervalContent(slug);

  return (
    <section className="page-container interval-page">
      <div className="breadcrumbs">
        <Link href="/">
          GIULIA
        </Link>

        {path.map((item) => (
          <span key={item.id}>
            <span className="breadcrumb-separator">
              /
            </span>

            <Link href={`/interval/${item.slug}`}>
              {item.namePt}
            </Link>
          </span>
        ))}
      </div>

      <div
        className="interval-accent"
        style={{
          backgroundColor: interval.color,
        }}
      />

      <span className="eyebrow">
        {interval.rank.toUpperCase()}
      </span>

      <h1>{interval.namePt}</h1>

      <span className="interval-international-name">
        {interval.name}
      </span>

      <div className="big-time">
        {interval.startMa.toLocaleString(
          "pt-BR"
        )}{" "}
        Ma

        <span>→</span>

        {interval.endMa === 0
          ? "Presente"
          : `${interval.endMa.toLocaleString(
              "pt-BR"
            )} Ma`}
      </div>

      <p className="interval-description">
        {interval.description}
      </p>

      <div className="scientific-source">
        <span className="source-label">
          BASE CRONOESTRATIGRÁFICA
        </span>

        <strong>
          International Commission on Stratigraphy
        </strong>

        <span>
          International Chronostratigraphic Chart
        </span>
      </div>

      {scientificContent && (
        <IntervalExplorer
          content={scientificContent}
        />
      )}

      {interval.children &&
        interval.children.length > 0 && (
          <div className="children-section">
            <div className="section-heading">
              <span className="eyebrow">
                EXPLORE
              </span>

              <h2>
                Divisões do {interval.namePt}
              </h2>

              <p>
                Selecione uma subdivisão para
                avançar na escala temporal.
              </p>
            </div>

            <div className="time-grid">
              {interval.children.map(
                (child) => (
                  <TimeBlock
                    key={child.id}
                    interval={child}
                  />
                )
              )}
            </div>
          </div>
        )}
    </section>
  );
}