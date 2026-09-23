import Link from "next/link";

import {
  searchGiulia,
} from "@/lib/global-search";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params =
    await searchParams;

  const query =
    params.q?.trim() ??
    "";

  const results =
    query.length >= 2
      ? searchGiulia(
          query
        )
      : [];

  return (
    <section className="global-search-page">
      <header className="global-search-hero">
        <span className="eyebrow">
          GIULIA SEARCH
        </span>

        <h1>
          Busque através do tempo e da vida.
        </h1>

        <p>
          Pesquise intervalos geológicos e
          organismos cadastrados no GIULIA ou
          encaminhe a mesma consulta para o
          registro fóssil da PBDB.
        </p>
      </header>

      <form
        className="global-search-form"
        action="/search"
      >
        <input
          type="search"
          name="q"
          defaultValue={
            query
          }
          placeholder="Ex.: Cretaceous, Tyrannosaurus..."
          autoFocus
        />

        <button type="submit">
          Buscar
        </button>
      </form>

      {query.length >= 2 && (
        <>
          <div className="global-search-summary">
            <span>
              RESULTADOS GIULIA
            </span>

            <strong>
              {
                results.length
              }{" "}
              resultado(s)
            </strong>
          </div>

          <div className="global-search-results">
            {results.map(
              (
                result
              ) => (
                <Link
                  key={`${result.type}-${result.href}`}
                  href={
                    result.href
                  }
                  className="global-search-result"
                >
                  <span>
                    {
                      result.type ===
                      "interval"
                        ? "GEOLOGICAL TIME"
                        : "LIFE"
                    }
                  </span>

                  <h2>
                    {
                      result.title
                    }
                  </h2>

                  <p>
                    {
                      result.subtitle
                    }
                  </p>

                  <small>
                    Abrir →
                  </small>
                </Link>
              )
            )}
          </div>

          <section className="global-search-pbdb">
            <div>
              <span className="eyebrow">
                FOSSIL RECORD
              </span>

              <h2>
                Procurar “{query}” na PBDB
              </h2>

              <p>
                A busca acima consulta somente
                o conteúdo estruturado
                localmente no GIULIA. Para
                registros fósseis, continue
                para a Paleobiology Database.
              </p>
            </div>

            <Link
              href={`/fossils?taxon=${encodeURIComponent(
                query
              )}`}
            >
              Buscar ocorrências →
            </Link>
          </section>
        </>
      )}
    </section>
  );
}