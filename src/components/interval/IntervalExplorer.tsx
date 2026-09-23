"use client";

import Link from "next/link";
import { useState } from "react";

import type {
  IntervalScientificContent,
  LifeEntry,
} from "@/types/interval-content";

interface IntervalExplorerProps {
  content: IntervalScientificContent;
}

type TabId =
  | "overview"
  | "stratigraphy"
  | "earth"
  | "climate"
  | "life"
  | "events"
  | "fossils"
  | "references";

const tabs: {
  id: TabId;
  label: string;
}[] = [
  { id: "overview", label: "Visão geral" },
  { id: "stratigraphy", label: "Escala" },
  { id: "earth", label: "Terra" },
  { id: "climate", label: "Clima" },
  { id: "life", label: "Vida" },
  { id: "events", label: "Eventos" },
  { id: "fossils", label: "Fósseis" },
  { id: "references", label: "Referências" },
];

function LifeCard({
  item,
}: {
  item: LifeEntry;
}) {
  const card = (
    <article
      className={
        item.organismSlug
          ? "life-card clickable-life-card"
          : "life-card"
      }
    >
      <div className="life-card-heading">
        <h4>{item.name}</h4>

        {item.subtitle && (
          <span>{item.subtitle}</span>
        )}
      </div>

      <p>{item.description}</p>

      {item.tags && (
        <div className="tag-list">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="content-tag"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {item.organismSlug && (
        <span className="organism-card-link">
          Explorar organismo →
        </span>
      )}
    </article>
  );

  if (!item.organismSlug) {
    return card;
  }

  return (
    <Link
      href={`/organisms/${item.organismSlug}`}
      className="organism-card-anchor"
    >
      {card}
    </Link>
  );
}

export default function IntervalExplorer({
  content,
}: IntervalExplorerProps) {
  const [activeTab, setActiveTab] =
    useState<TabId>("overview");

  return (
    <section className="scientific-explorer">
      <div className="explorer-introduction">
        <span className="eyebrow">
          SCIENTIFIC DOSSIER
        </span>

        <h2>{content.tagline}</h2>

        <p>{content.summary}</p>
      </div>

      <div
        className="explorer-tabs"
        role="tablist"
        aria-label="Conteúdo científico"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={
              activeTab === tab.id
            }
            className={
              activeTab === tab.id
                ? "explorer-tab active"
                : "explorer-tab"
            }
            onClick={() =>
              setActiveTab(tab.id)
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="explorer-content">
        {activeTab === "overview" && (
          <div>
            <div className="fact-grid">
              {content.facts.map(
                (fact) => (
                  <article
                    className="fact-card"
                    key={fact.label}
                  >
                    <span className="fact-label">
                      {fact.label}
                    </span>

                    <strong>
                      {fact.value}
                    </strong>

                    {fact.detail && (
                      <small>
                        {fact.detail}
                      </small>
                    )}
                  </article>
                )
              )}
            </div>

            <div className="overview-note">
              <span className="eyebrow">
                CONTEXTO
              </span>

              <p>
                {content.summary}
              </p>
            </div>
          </div>
        )}

        {activeTab === "stratigraphy" && (
          <div>
            <div className="content-section-header">
              <span className="section-index">
                CHRONOSTRATIGRAPHY
              </span>

              <h3>
                Dentro do Cretáceo
              </h3>

              <p>
                A escala pode ser explorada
                progressivamente do período
                às épocas/séries e,
                posteriormente, às
                idades/andares.
              </p>
            </div>

            {content.stratigraphy ? (
              <div className="stratigraphy-container">
                {content.stratigraphy.map(
                  (division) => (
                    <section
                      key={division.id}
                      className="stratigraphy-division"
                    >
                      <div className="stratigraphy-heading">
                        <div>
                          <span className="section-index">
                            ÉPOCA
                          </span>

                          <h4>
                            {division.namePt}
                          </h4>

                          <span className="stratigraphy-english">
                            {division.name}
                          </span>
                        </div>

                        <div className="stratigraphy-range">
                          {division.startMa.toLocaleString(
                            "pt-BR"
                          )}{" "}
                          Ma

                          <span>→</span>

                          {division.endMa.toLocaleString(
                            "pt-BR"
                          )}{" "}
                          Ma
                        </div>
                      </div>

                      <div className="chrono-equivalent">
                        <span>
                          Equivalente
                          cronoestratigráfico
                        </span>

                        <strong>
                          {
                            division.chronostratigraphicName
                          }
                        </strong>
                      </div>

                      <div className="stage-list">
                        {division.stages.map(
                          (stage) => {
                            const duration =
                              stage.startMa -
                              stage.endMa;

                            return (
                              <article
                                key={
                                  stage.name
                                }
                                className="stage-row"
                              >
                                <div className="stage-name">
                                  <strong>
                                    {
                                      stage.namePt
                                    }
                                  </strong>

                                  <span>
                                    {stage.name}
                                  </span>
                                </div>

                                <div className="stage-bar-container">
                                  <div
                                    className="stage-bar"
                                    style={{
                                      width: `${Math.max(
                                        duration *
                                          4,
                                        12
                                      )}px`,
                                    }}
                                  />
                                </div>

                                <div className="stage-range">
                                  {stage.startMa.toLocaleString(
                                    "pt-BR"
                                  )}
                                  {" – "}
                                  {stage.endMa.toLocaleString(
                                    "pt-BR"
                                  )}{" "}
                                  Ma
                                </div>
                              </article>
                            );
                          }
                        )}
                      </div>
                    </section>
                  )
                )}
              </div>
            ) : (
              <p>
                Escala estratigráfica ainda
                não cadastrada.
              </p>
            )}

            <div className="stratigraphy-note">
              <strong>
                Época × Série
              </strong>

              <p>
                Early e Late Cretaceous são
                unidades geocronológicas.
                Lower e Upper Cretaceous são
                seus equivalentes
                cronoestratigráficos. Da
                mesma forma, uma idade
                geocronológica corresponde
                a um andar na
                cronoestratigrafia.
              </p>
            </div>
          </div>
        )}

        {activeTab === "earth" && (
          <div className="scientific-section-layout">
            <div>
              <span className="section-index">
                PALEOGEOGRAFIA
              </span>

              <h3>
                {content.earth.title}
              </h3>

              <p className="section-lead">
                {
                  content.earth
                    .introduction
                }
              </p>

              {content.earth.paragraphs.map(
                (paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                )
              )}
            </div>

            <aside className="highlight-panel">
              <span className="panel-label">
                DESTAQUES
              </span>

              {content.earth.highlights?.map(
                (highlight) => (
                  <div
                    key={highlight}
                    className="highlight-item"
                  >
                    <span className="highlight-dot" />
                    {highlight}
                  </div>
                )
              )}

              <div className="future-module">
                <span>PaleoEarth</span>

                <strong>
                  Globo paleogeográfico
                  interativo
                </strong>

                <small>
                  Integração planejada com
                  reconstruções tectônicas.
                </small>
              </div>
            </aside>
          </div>
        )}

        {activeTab === "climate" && (
          <div className="scientific-section-layout">
            <div>
              <span className="section-index">
                PALEOCLIMA
              </span>

              <h3>
                {content.climate.title}
              </h3>

              <p className="section-lead">
                {
                  content.climate
                    .introduction
                }
              </p>

              {content.climate.paragraphs.map(
                (paragraph) => (
                  <p key={paragraph}>
                    {paragraph}
                  </p>
                )
              )}
            </div>

            <aside className="highlight-panel">
              <span className="panel-label">
                CARACTERÍSTICAS
              </span>

              {content.climate.highlights?.map(
                (highlight) => (
                  <div
                    key={highlight}
                    className="highlight-item"
                  >
                    <span className="highlight-dot" />
                    {highlight}
                  </div>
                )
              )}
            </aside>
          </div>
        )}

        {activeTab === "life" && (
          <div>
            <div className="life-section">
              <div className="life-title">
                <span className="section-index">
                  FAUNA
                </span>

                <h3>
                  Animais e grupos
                  representativos
                </h3>
              </div>

              <div className="life-grid">
                {content.fauna.map(
                  (item) => (
                    <LifeCard
                      key={item.name}
                      item={item}
                    />
                  )
                )}
              </div>
            </div>

            <div className="life-section flora-section">
              <div className="life-title">
                <span className="section-index">
                  FLORA
                </span>

                <h3>
                  Vegetação e evolução
                  vegetal
                </h3>
              </div>

              <div className="life-grid">
                {content.flora.map(
                  (item) => (
                    <LifeCard
                      key={item.name}
                      item={item}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="event-timeline">
            {content.events.map(
              (event, index) => (
                <article
                  className="event-row"
                  key={`${event.age}-${event.title}`}
                >
                  <div className="event-axis">
                    <span className="event-point" />

                    {index <
                      content.events.length -
                        1 && (
                      <span className="event-line" />
                    )}
                  </div>

                  <div className="event-age">
                    {event.age}
                  </div>

                  <div className="event-body">
                    <span
                      className={`event-type event-${event.type}`}
                    >
                      {event.type}
                    </span>

                    <h4>
                      {event.title}
                    </h4>

                    <p>
                      {event.description}
                    </p>
                  </div>
                </article>
              )
            )}
          </div>
        )}

        {activeTab === "fossils" && (
          <div>
            <div className="content-section-header">
              <span className="section-index">
                FOSSIL RECORD
              </span>

              <h3>
                Exemplos para explorar
              </h3>

              <p>
                Estes exemplos não
                representam uma lista
                completa da diversidade do
                período.
              </p>
            </div>

            <div className="fossil-grid">
              {content.fossils.map(
                (fossil) => (
                  <article
                    key={fossil.name}
                    className="fossil-card"
                  >
                    <div className="fossil-placeholder">
                      <span>
                        FÓSSIL
                      </span>
                    </div>

                    <div className="fossil-content">
                      <span className="fossil-group">
                        {fossil.group}
                      </span>

                      <h4>
                        {fossil.name}
                      </h4>

                      <strong>
                        {
                          fossil.interval
                        }
                      </strong>

                      <p>
                        {
                          fossil.description
                        }
                      </p>

                      {fossil.organismSlug && (
                        <Link
                          href={`/organisms/${fossil.organismSlug}`}
                          className="reference-link"
                        >
                          Explorar organismo →
                        </Link>
                      )}
                    </div>
                  </article>
                )
              )}
            </div>

            <div className="database-preview">
              <div>
                <span className="eyebrow">
                  FUTURE DATA CONNECTION
                </span>

                <h4>
                  Paleobiology Database
                </h4>

                <p>
                  Em breve, ocorrências
                  fósseis reais poderão ser
                  consultadas por organismo,
                  idade e localização.
                </p>
              </div>

              <span className="database-status">
                API
              </span>
            </div>
          </div>
        )}

        {activeTab === "references" && (
          <div>
            <div className="content-section-header">
              <span className="section-index">
                PROVENIÊNCIA
              </span>

              <h3>
                Fontes científicas
              </h3>

              <p>
                Cada conjunto de dados deve
                manter sua proveniência
                científica identificável.
              </p>
            </div>

            <div className="reference-list">
              {content.references.map(
                (reference, index) => (
                  <article
                    key={reference.id}
                    className="reference-item"
                  >
                    <span className="reference-number">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <div>
                      <span className="reference-institution">
                        {
                          reference.institution
                        }
                      </span>

                      <h4>
                        {reference.title}
                      </h4>

                      <p>
                        {reference.role}
                      </p>

                      {reference.url && (
                        <a
                          className="reference-link"
                          href={
                            reference.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Abrir fonte ↗
                        </a>
                      )}
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}