import PaleoEarthExplorer from "@/components/earth/PaleoEarthExplorer";

export default function PaleoEarthPage() {
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
          Compare uma coordenada
          geográfica atual com sua
          posição reconstruída no
          passado e visualize as
          costas continentais para a
          mesma idade geológica.
        </p>
      </header>

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

      <PaleoEarthExplorer />
    </section>
  );
}