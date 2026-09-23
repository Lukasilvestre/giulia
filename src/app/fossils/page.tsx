import PbdbSearch from "@/components/fossils/PbdbSearch";

interface FossilsPageProps {
  searchParams: Promise<{
    taxon?: string;
    interval?: string;
  }>;
}

export default async function FossilsPage({
  searchParams,
}: FossilsPageProps) {
  const params =
    await searchParams;

  const initialTaxon =
    params.taxon ?? "";

  const initialInterval =
    params.interval ?? "";

  return (
    <section className="fossils-page">
      <header className="fossils-hero">
        <span className="eyebrow">
          FOSSIL RECORD
        </span>

        <h1>
          Explore o registro
          fóssil.
        </h1>

        <p>
          Consulte ocorrências
          paleontológicas diretamente
          da Paleobiology Database e
          transporte registros com
          coordenadas para uma
          reconstrução
          paleogeográfica.
        </p>
      </header>

      <div className="pbdb-scientific-note">
        <span>
          INTERPRETAÇÃO
        </span>

        <p>
          Ocorrências da PBDB são
          registros do banco de dados,
          não medidas diretas de
          abundância biológica. Quando
          um registro possui apenas
          limites mínimo e máximo de
          idade, o GIULIA utiliza o
          ponto médio desse intervalo
          apenas como idade
          representativa para a
          reconstrução tectônica.
        </p>
      </div>

      <PbdbSearch
        initialTaxon={
          initialTaxon
        }
        initialInterval={
          initialInterval
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