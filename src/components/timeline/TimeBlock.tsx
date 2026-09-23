import Link from "next/link";
import type { GeologicalInterval } from "@/types/geological";

type TimeBlockProps = {
  interval: GeologicalInterval;
};

export default function TimeBlock({ interval }: TimeBlockProps) {
  return (
    <Link
      href={`/interval/${interval.slug}`}
      className="time-block"
      style={{ borderTopColor: interval.color }}
    >
      <div>
        <span className="rank">{interval.rank}</span>

        <h3>{interval.namePt}</h3>

        <span className="international-name">
          {interval.name}
        </span>
      </div>

      <div className="time-range">
        {interval.startMa.toLocaleString("pt-BR")} Ma –{" "}
        {interval.endMa === 0
          ? "Presente"
          : `${interval.endMa.toLocaleString("pt-BR")} Ma`}
      </div>

      <p>{interval.description}</p>

      <span className="explore">
        Explorar →
      </span>
    </Link>
  );
}
