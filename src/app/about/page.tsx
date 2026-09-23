export default function AboutPage() {
  return (
    <main className="about-v1">
      <header className="about-v1-hero">
        <span className="eyebrow">
          ABOUT GIULIA
        </span>

        <h1>
          Uma interface para
          explorar tempo, vida e
          evidência paleontológica.
        </h1>

        <p>
          GIULIA — Geological
          Interactive Universe of
          Life in Ages — organiza
          diferentes camadas de
          informação geológica e
          paleontológica em uma
          navegação integrada.
        </p>
      </header>

      <section className="about-v1-principles">
        <article>
          <span>
            01
          </span>

          <h2>
            Tempo
          </h2>

          <p>
            A escala geológica é
            apresentada
            hierarquicamente,
            permitindo navegar de
            éons para eras e
            períodos.
          </p>
        </article>

        <article>
          <span>
            02
          </span>

          <h2>
            Registro fóssil
          </h2>

          <p>
            Registros de ocorrência
            provenientes da
            Paleobiology Database
            são apresentados como
            evidências cadastradas,
            e não como medidas
            diretas de abundância
            biológica.
          </p>
        </article>

        <article>
          <span>
            03
          </span>

          <h2>
            Paleogeografia
          </h2>

          <p>
            Paleoposições são
            reconstruções
            dependentes do modelo
            tectônico utilizado,
            não medições diretas de
            uma coordenada histórica.
          </p>
        </article>

        <article>
          <span>
            04
          </span>

          <h2>
            Proveniência
          </h2>

          <p>
            Sempre que dados
            externos são
            consultados, o GIULIA
            procura manter a fonte,
            o serviço utilizado e o
            momento da recuperação.
          </p>
        </article>
      </section>

      <section className="about-v1-sources">
        <header>
          <span className="eyebrow">
            DATA SOURCES
          </span>

          <h2>
            Fontes e serviços.
          </h2>
        </header>

        <div>
          <a
            href="https://stratigraphy.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              GEOLOGICAL TIME
            </span>

            <strong>
              International
              Commission on
              Stratigraphy
            </strong>

            <small>
              stratigraphy.org ↗
            </small>
          </a>

          <a
            href="https://paleobiodb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              FOSSIL DATA
            </span>

            <strong>
              Paleobiology Database
            </strong>

            <small>
              paleobiodb.org ↗
            </small>
          </a>

          <a
            href="https://gws.gplates.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              PALEOGEOGRAPHY
            </span>

            <strong>
              GPlates Web Service
            </strong>

            <small>
              gws.gplates.org ↗
            </small>
          </a>
        </div>
      </section>

      <section className="about-v1-limitations">
        <span className="eyebrow">
          INTERPRETATION
        </span>

        <h2>
          Limitações fazem parte
          dos dados.
        </h2>

        <p>
          O registro fóssil é
          incompleto e sujeito a
          vieses de preservação,
          descoberta, coleta,
          publicação e
          digitalização. Da mesma
          forma, reconstruções
          paleogeográficas dependem
          de hipóteses e modelos.
          O GIULIA deve ser usado
          como ferramenta de
          exploração e organização
          da evidência disponível.
        </p>
      </section>
    </main>
  );
}