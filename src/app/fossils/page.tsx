import PbdbSearch from "@/components/fossils/PbdbSearch";

interface FossilsPageProps {
  searchParams: Promise<{
    taxon?: string;
    interval?: string;
    country?: string;
    region?: string;
  }>;
}

export default async function FossilsPage({
  searchParams,
}: FossilsPageProps) {
  const params =
    await searchParams;

  const initialTaxon =
    params.taxon ?? "";

  return (
    <section className="fossils-page">
      <header className="fossils-hero">
        <span className="eyebrow">
          FOSSIL RECORD
        </span>

        <h1>
          Explore o registro fóssil.
        </h1>

        <p>
          Consulte ocorrências paleontológicas,
          explore sua distribuição geográfica,
          examine registros individuais e
          transporte ocorrências para
          reconstruções paleogeográficas.
        </p>
      </header>

      <div className="pbdb-scientific-note">
        <span>
          INTERPRETAÇÃO
        </span>

        <p>
          Uma ocorrência representa um registro
          cadastrado na Paleobiology Database.
          Contagens de ocorrências não equivalem
          diretamente à abundância biológica e
          estão sujeitas a vieses de preservação,
          coleta, publicação e amostragem.
        </p>
      </div>

      <PbdbSearch
        initialTaxon={
          initialTaxon
        }

        initialInterval={
          params.interval ??
          ""
        }

        initialCountry={
          params.country ??
          ""
        }

        initialRegion={
          params.region ??
          ""
        }

        autoSearch={
          Boolean(
            initialTaxon
          )
        }
      />
    </section>
  );
}