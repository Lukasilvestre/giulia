"use client";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  StudyItem,
  StudyItemType,
} from "@/types/study";

const STORAGE_KEY =
  "giulia.study.v1";

type FilterType =
  | "all"
  | StudyItemType;

function readItems():
  StudyItem[] {
  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  const raw =
    window.localStorage.getItem(
      STORAGE_KEY
    );

  if (!raw) {
    return [];
  }

  try {
    const parsed =
      JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function writeItems(
  items: StudyItem[]
) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );

  window.dispatchEvent(
    new CustomEvent(
      "giulia-study-updated"
    )
  );
}

function getKey(
  item: StudyItem
) {
  return `${item.type}:${item.id}`;
}

function typeLabel(
  type: StudyItemType
) {
  if (
    type ===
    "organism"
  ) {
    return "ORGANISM";
  }

  return "PBDB OCCURRENCE";
}

function downloadText(
  filename: string,
  content: string,
  mimeType: string
) {
  const blob =
    new Blob(
      [content],
      {
        type:
          mimeType,
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const anchor =
    document.createElement(
      "a"
    );

  anchor.href =
    url;

  anchor.download =
    filename;

  document.body.appendChild(
    anchor
  );

  anchor.click();

  anchor.remove();

  URL.revokeObjectURL(
    url
  );
}

function escapeCsv(
  value: unknown
) {
  const text =
    String(
      value ?? ""
    );

  return `"${text.replace(
    /"/g,
    '""'
  )}"`;
}

export default function StudyWorkspace() {
  const [
    items,
    setItems,
  ] =
    useState<StudyItem[]>(
      []
    );

  const [
    query,
    setQuery,
  ] =
    useState("");

  const [
    filter,
    setFilter,
  ] =
    useState<FilterType>(
      "all"
    );

  const [
    compareKeys,
    setCompareKeys,
  ] =
    useState<string[]>(
      []
    );

  useEffect(() => {
    const refresh = () => {
      setItems(
        readItems()
      );
    };

    refresh();

    window.addEventListener(
      "storage",
      refresh
    );

    window.addEventListener(
      "giulia-study-updated",
      refresh
    );

    return () => {
      window.removeEventListener(
        "storage",
        refresh
      );

      window.removeEventListener(
        "giulia-study-updated",
        refresh
      );
    };
  }, []);

  const organisms =
    items.filter(
      (
        item
      ) =>
        item.type ===
        "organism"
    );

  const occurrences =
    items.filter(
      (
        item
      ) =>
        item.type ===
        "occurrence"
    );

  const filteredItems =
    useMemo(() => {
      const normalized =
        query
          .trim()
          .toLowerCase();

      return items.filter(
        (
          item
        ) => {
          if (
            filter !==
              "all" &&
            item.type !==
              filter
          ) {
            return false;
          }

          if (
            !normalized
          ) {
            return true;
          }

          const haystack =
            [
              item.title,
              item.subtitle,
              item.note,
              item.metadata.group,
              item.metadata.temporalRange,
              item.metadata.age,
              item.metadata.formation,
              item.metadata.environment,
              item.metadata.location,
              item.metadata.pbdbOccurrence,
            ]
              .filter(
                Boolean
              )
              .join(" ")
              .toLowerCase();

          return haystack.includes(
            normalized
          );
        }
      );
    }, [
      items,
      query,
      filter,
    ]);

  const compareItems =
    compareKeys
      .map(
        (
          key
        ) =>
          items.find(
            (
              item
            ) =>
              getKey(
                item
              ) === key
          )
      )
      .filter(
        (
          item
        ): item is StudyItem =>
          Boolean(item)
      );

  function removeItem(
    item: StudyItem
  ) {
    const key =
      getKey(item);

    const next =
      items.filter(
        (
          current
        ) =>
          getKey(
            current
          ) !== key
      );

    writeItems(next);

    setItems(next);

    setCompareKeys(
      (
        current
      ) =>
        current.filter(
          (
            value
          ) =>
            value !== key
        )
    );
  }

  function updateNote(
    item: StudyItem,
    note: string
  ) {
    const key =
      getKey(item);

    const next =
      items.map(
        (
          current
        ) =>
          getKey(
            current
          ) === key
            ? {
                ...current,
                note,
              }
            : current
      );

    setItems(next);

    writeItems(next);
  }

  function toggleCompare(
    item: StudyItem
  ) {
    const key =
      getKey(item);

    if (
      compareKeys.includes(
        key
      )
    ) {
      setCompareKeys(
        compareKeys.filter(
          (
            value
          ) =>
            value !== key
        )
      );

      return;
    }

    if (
      compareKeys.length >=
      4
    ) {
      return;
    }

    setCompareKeys([
      ...compareKeys,
      key,
    ]);
  }

  function clearStudy() {
    const accepted =
      window.confirm(
        "Remover todos os itens salvos no Estudo?"
      );

    if (!accepted) {
      return;
    }

    writeItems([]);

    setItems([]);

    setCompareKeys(
      []
    );
  }

  function exportJson() {
    const date =
      new Date()
        .toISOString()
        .slice(
          0,
          10
        );

    downloadText(
      `giulia-study-${date}.json`,

      JSON.stringify(
        {
          exportedAt:
            new Date()
              .toISOString(),

          application:
            "GIULIA",

          count:
            items.length,

          items,
        },
        null,
        2
      ),

      "application/json;charset=utf-8"
    );
  }

  function exportCsv() {
    const header = [
      "type",
      "id",
      "title",
      "subtitle",
      "savedAt",
      "note",
      "group",
      "temporalRange",
      "age",
      "formation",
      "environment",
      "location",
      "coordinates",
      "pbdbOccurrence",
      "reconstructionAge",
      "href",
    ];

    const rows =
      items.map(
        (
          item
        ) => [
          item.type,
          item.id,
          item.title,
          item.subtitle,
          item.savedAt,
          item.note,
          item.metadata.group,
          item.metadata.temporalRange,
          item.metadata.age,
          item.metadata.formation,
          item.metadata.environment,
          item.metadata.location,
          item.metadata.coordinates,
          item.metadata.pbdbOccurrence,
          item.metadata.reconstructionAge,
          item.href,
        ]
          .map(
            escapeCsv
          )
          .join(",")
      );

    const csv =
      [
        header
          .map(
            escapeCsv
          )
          .join(","),

        ...rows,
      ].join(
        "\r\n"
      );

    const date =
      new Date()
        .toISOString()
        .slice(
          0,
          10
        );

    downloadText(
      `giulia-study-${date}.csv`,

      "\uFEFF" + csv,

      "text/csv;charset=utf-8"
    );
  }

  return (
    <div className="study-workspace">
      <section className="study-dashboard">
        <article>
          <span>
            ITENS
          </span>

          <strong>
            {
              items.length
            }
          </strong>
        </article>

        <article>
          <span>
            ORGANISMOS
          </span>

          <strong>
            {
              organisms.length
            }
          </strong>
        </article>

        <article>
          <span>
            OCORRÊNCIAS
          </span>

          <strong>
            {
              occurrences.length
            }
          </strong>
        </article>

        <article>
          <span>
            COMPARAÇÃO
          </span>

          <strong>
            {
              compareKeys.length
            }
            /4
          </strong>
        </article>
      </section>

      <section className="study-toolbar">
        <div className="study-search">
          <label
            htmlFor="study-search"
          >
            Pesquisar coleção
          </label>

          <input
            id="study-search"
            type="search"
            value={
              query
            }
            onChange={(
              event
            ) =>
              setQuery(
                event.target.value
              )
            }
            placeholder="Táxon, formação, ambiente..."
          />
        </div>

        <div className="study-filter">
          <button
            type="button"
            className={
              filter ===
              "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(
                "all"
              )
            }
          >
            Todos
          </button>

          <button
            type="button"
            className={
              filter ===
              "organism"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(
                "organism"
              )
            }
          >
            Organismos
          </button>

          <button
            type="button"
            className={
              filter ===
              "occurrence"
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(
                "occurrence"
              )
            }
          >
            Ocorrências
          </button>
        </div>

        <div className="study-export">
          <button
            type="button"
            onClick={
              exportJson
            }
            disabled={
              items.length ===
              0
            }
          >
            JSON ↓
          </button>

          <button
            type="button"
            onClick={
              exportCsv
            }
            disabled={
              items.length ===
              0
            }
          >
            CSV ↓
          </button>
        </div>
      </section>

      {items.length ===
      0 ? (
        <section className="study-empty">
          <span className="eyebrow">
            EMPTY WORKSPACE
          </span>

          <h2>
            Sua coleção de estudo
            está vazia.
          </h2>

          <p>
            Explore organismos e
            ocorrências fósseis e use
            o botão “Salvar no Estudo”
            para construir uma coleção
            de pesquisa.
          </p>

          <div>
            <Link href="/organisms">
              Explorar vida →
            </Link>

            <Link href="/fossils">
              Explorar fósseis →
            </Link>
          </div>
        </section>
      ) : (
        <>
          <section className="study-collection-header">
            <div>
              <span className="eyebrow">
                RESEARCH COLLECTION
              </span>

              <h2>
                Coleção
              </h2>
            </div>

            <button
              type="button"
              onClick={
                clearStudy
              }
              className="study-clear-button"
            >
              Limpar coleção
            </button>
          </section>

          <div className="study-card-grid">
            {filteredItems.map(
              (
                item
              ) => {
                const key =
                  getKey(
                    item
                  );

                const selected =
                  compareKeys.includes(
                    key
                  );

                return (
                  <article
                    key={
                      key
                    }
                    className={[
                      "study-card",

                      selected
                        ? "selected"
                        : "",
                    ]
                      .filter(
                        Boolean
                      )
                      .join(
                        " "
                      )}
                  >
                    <header>
                      <span>
                        {
                          typeLabel(
                            item.type
                          )
                        }
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(
                            item
                          )
                        }
                        aria-label="Remover do estudo"
                      >
                        ×
                      </button>
                    </header>

                    <h3>
                      {item.type ===
                      "organism" ? (
                        <i>
                          {
                            item.title
                          }
                        </i>
                      ) : (
                        item.title
                      )}
                    </h3>

                    {item.subtitle && (
                      <p className="study-card-subtitle">
                        {
                          item.subtitle
                        }
                      </p>
                    )}

                    <dl>
                      {item.metadata.group && (
                        <div>
                          <dt>
                            Grupo
                          </dt>

                          <dd>
                            {
                              item.metadata.group
                            }
                          </dd>
                        </div>
                      )}

                      {item.metadata.temporalRange && (
                        <div>
                          <dt>
                            Intervalo
                          </dt>

                          <dd>
                            {
                              item.metadata.temporalRange
                            }
                          </dd>
                        </div>
                      )}

                      {item.metadata.age && (
                        <div>
                          <dt>
                            Idade
                          </dt>

                          <dd>
                            {
                              item.metadata.age
                            }
                          </dd>
                        </div>
                      )}

                      {item.metadata.formation && (
                        <div>
                          <dt>
                            Formação
                          </dt>

                          <dd>
                            {
                              item.metadata.formation
                            }
                          </dd>
                        </div>
                      )}

                      {item.metadata.environment && (
                        <div>
                          <dt>
                            Ambiente
                          </dt>

                          <dd>
                            {
                              item.metadata.environment
                            }
                          </dd>
                        </div>
                      )}

                      {item.metadata.location && (
                        <div>
                          <dt>
                            Localidade
                          </dt>

                          <dd>
                            {
                              item.metadata.location
                            }
                          </dd>
                        </div>
                      )}

                      {item.metadata.pbdbOccurrence && (
                        <div>
                          <dt>
                            PBDB
                          </dt>

                          <dd>
                            #
                            {
                              item.metadata.pbdbOccurrence
                            }
                          </dd>
                        </div>
                      )}
                    </dl>

                    <label className="study-note">
                      Nota

                      <textarea
                        value={
                          item.note ??
                          ""
                        }
                        onChange={(
                          event
                        ) =>
                          updateNote(
                            item,
                            event.target.value
                          )
                        }
                        placeholder="Adicione uma observação sobre este item..."
                      />
                    </label>

                    <footer>
                      <Link
                        href={
                          item.href
                        }
                      >
                        Abrir →
                      </Link>

                      <button
                        type="button"
                        className={
                          selected
                            ? "active"
                            : ""
                        }
                        disabled={
                          !selected &&
                          compareKeys.length >=
                            4
                        }
                        onClick={() =>
                          toggleCompare(
                            item
                          )
                        }
                      >
                        {selected
                          ? "Comparando ✓"
                          : "Comparar"}
                      </button>
                    </footer>
                  </article>
                );
              }
            )}
          </div>
        </>
      )}

      {compareItems.length >
        0 && (
        <section className="study-comparison">
          <header>
            <span className="eyebrow">
              COMPARATIVE VIEW
            </span>

            <h2>
              Comparação
            </h2>

            <p>
              Compare até quatro
              elementos salvos na
              coleção.
            </p>
          </header>

          <div className="study-comparison-scroll">
            <table>
              <thead>
                <tr>
                  <th>
                    Campo
                  </th>

                  {compareItems.map(
                    (
                      item
                    ) => (
                      <th
                        key={
                          getKey(
                            item
                          )
                        }
                      >
                        {
                          item.title
                        }
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>
                    Tipo
                  </th>

                  {compareItems.map(
                    (
                      item
                    ) => (
                      <td
                        key={
                          getKey(
                            item
                          )
                        }
                      >
                        {
                          typeLabel(
                            item.type
                          )
                        }
                      </td>
                    )
                  )}
                </tr>

                <tr>
                  <th>
                    Tempo
                  </th>

                  {compareItems.map(
                    (
                      item
                    ) => (
                      <td
                        key={
                          getKey(
                            item
                          )
                        }
                      >
                        {item.metadata.temporalRange ??
                          item.metadata.age ??
                          "—"}
                      </td>
                    )
                  )}
                </tr>

                <tr>
                  <th>
                    Grupo /
                    Formação
                  </th>

                  {compareItems.map(
                    (
                      item
                    ) => (
                      <td
                        key={
                          getKey(
                            item
                          )
                        }
                      >
                        {item.metadata.group ??
                          item.metadata.formation ??
                          "—"}
                      </td>
                    )
                  )}
                </tr>

                <tr>
                  <th>
                    Ambiente
                  </th>

                  {compareItems.map(
                    (
                      item
                    ) => (
                      <td
                        key={
                          getKey(
                            item
                          )
                        }
                      >
                        {item.metadata.environment ??
                          "—"}
                      </td>
                    )
                  )}
                </tr>

                <tr>
                  <th>
                    Localidade
                  </th>

                  {compareItems.map(
                    (
                      item
                    ) => (
                      <td
                        key={
                          getKey(
                            item
                          )
                        }
                      >
                        {item.metadata.location ??
                          "—"}
                      </td>
                    )
                  )}
                </tr>

                <tr>
                  <th>
                    Nota
                  </th>

                  {compareItems.map(
                    (
                      item
                    ) => (
                      <td
                        key={
                          getKey(
                            item
                          )
                        }
                      >
                        {
                          item.note ||
                          "—"
                        }
                      </td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}