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
          Consulte ocorrências
          paleontológicas diretamente da
          Paleobiology Database por táxon
          e intervalo geológico.
        </p>
      </header>

      <div className="pbdb-scientific-note">
        <span>
          SOBRE OS DADOS
        </span>

        <p>
          Uma ocorrência representa um
          registro cadastrado na base de
          dados. O número de ocorrências
          não deve ser interpretado
          diretamente como abundância
          biológica ou como um inventário
          completo do registro fóssil.
        </p>
      </div>

      <PbdbSearch
        initialTaxon={
          params.taxon ?? ""
        }
        initialInterval={
          params.interval ?? ""
        }
      />
    </section>
  );
}