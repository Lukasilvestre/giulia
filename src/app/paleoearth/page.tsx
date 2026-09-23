import PaleoEarthExplorer from "@/components/earth/PaleoEarthExplorer";

interface PaleoEarthPageProps {
  searchParams: Promise<{
    lat?: string;
    lng?: string;
    time?: string;
    taxon?: string;
    occurrence?: string;
    formation?: string;
  }>;
}

export default async function PaleoEarthPage({
  searchParams,
}: PaleoEarthPageProps) {
  const params =
    await searchParams;

  return (
    <section className="paleoearth-page">
      <header className="paleoearth-hero">
        <span className="eyebrow">
          PALEOEARTH
        </span>

        <h1>
          Reconstrua a Terra
          através do tempo.
        </h1>

        <p>
          Compare uma localidade
          geográfica atual com sua
          posição reconstruída no
          passado e visualize as
          costas continentais para a
          mesma idade.
        </p>
      </header>

      {params.occurrence && (
        <div className="paleoearth-origin-context">
          <span>
            ORIGINADO DA PBDB
          </span>

          <div>
            {params.taxon && (
              <strong>
                <i>
                  {
                    params.taxon
                  }
                </i>
              </strong>
            )}

            <small>
              Occurrence #
              {
                params.occurrence
              }
            </small>

            {params.formation && (
              <small>
                Formação:{" "}
                {
                  params.formation
                }
              </small>
            )}
          </div>
        </div>
      )}

      <div className="paleoearth-principle">
        <div>
          <span>
            01
          </span>

          <strong>
            Localidade atual
          </strong>
        </div>

        <div className="principle-arrow">
          →
        </div>

        <div>
          <span>
            02
          </span>

          <strong>
            Modelo tectônico
          </strong>
        </div>

        <div className="principle-arrow">
          →
        </div>

        <div>
          <span>
            03
          </span>

          <strong>
            Paleoposição
          </strong>
        </div>
      </div>

      <PaleoEarthExplorer
        initialLat={
          params.lat
        }
        initialLng={
          params.lng
        }
        initialTime={
          params.time
        }
        sourceTaxon={
          params.taxon
        }
        sourceOccurrence={
          params.occurrence
        }
        autoReconstruct={
          Boolean(
            params.lat &&
            params.lng &&
            params.time
          )
        }
      />
    </section>
  );
}