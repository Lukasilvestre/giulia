import type {
  GeologicalInterval,
} from "@/types/geological";

import type {
  IntervalScientificContent,
} from "@/types/interval-content";

import {
  organisms,
} from "@/data/organisms";

function rankLabel(
  rank: string
) {
  switch (
    rank
  ) {
    case "eon":
      return "Éon";

    case "era":
      return "Era";

    case "period":
      return "Período";

    case "epoch":
      return "Época / série";

    case "age":
      return "Idade";

    default:
      return rank;
  }
}

function duration(
  interval:
    GeologicalInterval
) {
  return Math.abs(
    interval.startMa -
      interval.endMa
  );
}

function overlap(
  organismStart: number,
  organismEnd: number,
  intervalStart: number,
  intervalEnd: number
) {
  return (
    organismStart >=
      intervalEnd &&
    organismEnd <=
      intervalStart
  );
}

export function buildGenericIntervalContent(
  interval:
    GeologicalInterval,
  path:
    GeologicalInterval[]
): IntervalScientificContent {
  const parent =
    path.length > 1
      ? path[
          path.length -
            2
        ]
      : undefined;

  const children =
    interval.children ??
    [];

  const hierarchy =
    path
      .map(
        (
          item
        ) =>
          item.namePt
      )
      .join(
        " → "
      );

  const relatedOrganisms =
    organisms.filter(
      (
        organism
      ) =>
        overlap(
          organism.temporalRange.startMa,
          organism.temporalRange.endMa,
          interval.startMa,
          interval.endMa
        )
    );

  const fauna =
    relatedOrganisms.map(
      (
        organism
      ) => ({
        name:
          organism.scientificName,

        subtitle:
          organism.group,

        description:
          organism.description,

        tags: [
          organism.temporalRange.label,
        ],

        organismSlug:
          organism.slug,
      })
    );

  const fossils =
    relatedOrganisms.map(
      (
        organism
      ) => ({
        name:
          organism.scientificName,

        group:
          organism.group,

        interval:
          interval.namePt,

        description:
          `Organismo cadastrado no GIULIA com intervalo temporal sobreposto a ${interval.namePt}.`,

        organismSlug:
          organism.slug,
      })
    );

  const events =
    children.length >
    0
      ? children.map(
          (
            child
          ) => ({
            age:
              `${child.startMa} Ma`,

            title:
              `Início de ${child.namePt}`,

            type:
              "geology" as const,

            description:
              `Limite inferior utilizado para a subdivisão ${child.namePt} dentro de ${interval.namePt}.`,
          })
        )
      : [
          {
            age:
              `${interval.startMa} Ma`,

            title:
              `Início de ${interval.namePt}`,

            type:
              "geology" as const,

            description:
              `Limite inferior do intervalo ${interval.namePt}.`,
          },

          {
            age:
              interval.endMa ===
              0
                ? "Presente"
                : `${interval.endMa} Ma`,

            title:
              interval.endMa ===
              0
                ? "Presente"
                : `Fim de ${interval.namePt}`,

            type:
              "geology" as const,

            description:
              interval.endMa ===
              0
                ? `${interval.namePt} alcança o presente.`
                : `Limite superior do intervalo ${interval.namePt}.`,
          },
        ];

  const subdivisionText =
    children.length >
    0
      ? children
          .map(
            (
              child
            ) =>
              child.namePt
          )
          .join(
            ", "
          )
      : "Nenhuma subdivisão adicional cadastrada neste nível.";

  return {
    slug:
      interval.slug,

    tagline:
      `${rankLabel(
        interval.rank
      )} da escala geológica internacional`,

    summary:
      interval.description,

    facts: [
      {
        label:
          "Classificação",

        value:
          rankLabel(
            interval.rank
          ),
      },

      {
        label:
          "Início",

        value:
          `${interval.startMa} Ma`,
      },

      {
        label:
          "Fim",

        value:
          interval.endMa ===
          0
            ? "Presente"
            : `${interval.endMa} Ma`,
      },

      {
        label:
          "Duração",

        value:
          `${duration(
            interval
          ).toLocaleString(
            "pt-BR",
            {
              maximumFractionDigits:
                3,
            }
          )} Ma`,
      },

      {
        label:
          "Hierarquia",

        value:
          hierarchy,
      },

      {
        label:
          "Subdivisões",

        value:
          String(
            children.length
          ),

        detail:
          subdivisionText,
      },
    ],

    earth: {
      title:
        "Contexto geológico",

      introduction:
        `${interval.namePt} ocupa o intervalo entre ${interval.startMa} e ${interval.endMa === 0 ? "o presente" : `${interval.endMa} Ma`} na escala geológica utilizada pelo GIULIA.`,

      paragraphs: [
        interval.description,

        parent
          ? `${interval.namePt} está contido em ${parent.namePt}.`
          : `${interval.namePt} representa uma das unidades de maior nível da escala temporal.`,

        children.length >
        0
          ? `No GIULIA, este intervalo está subdividido em: ${subdivisionText}.`
          : "Não há uma subdivisão adicional cadastrada abaixo desta unidade nesta versão da plataforma.",
      ],

      highlights: [
        `Hierarquia: ${hierarchy}.`,

        `Duração aproximada: ${duration(
          interval
        ).toLocaleString(
          "pt-BR",
          {
            maximumFractionDigits:
              3,
          }
        )} milhões de anos.`,
      ],

      sources: [
        "ics-2026",
      ],
    },

    climate: {
      title:
        "Clima e ambiente",

      introduction:
        `Intervalos geológicos abrangem mudanças ambientais potencialmente muito extensas; ${interval.namePt} não deve ser interpretado como possuindo uma única condição climática uniforme.`,

      paragraphs: [
        "As condições atmosféricas, oceânicas, tectônicas e climáticas podem variar significativamente dentro de uma mesma unidade da escala geológica.",

        "O GIULIA separa a posição cronológica formal do intervalo de interpretações paleoclimáticas específicas, evitando tratar toda a unidade como um ambiente homogêneo.",
      ],

      highlights: [
        "Os limites cronológicos e as interpretações paleoambientais são tipos diferentes de informação.",

        "Reconstruções detalhadas devem considerar idade, localidade e evidência geológica específica.",
      ],

      sources: [
        "ics-2026",
      ],
    },

    fauna,

    flora: [],

    events,

    fossils,

    references: [
      {
        id:
          "ics-2026",

        institution:
          "International Commission on Stratigraphy",

        title:
          "International Chronostratigraphic Chart 2026/06",

        role:
          "Referência para hierarquia e limites cronostratigráficos.",

        url:
          "https://stratigraphy.org/ICSchart/ChronostratChart2026-06.pdf",
      },

      {
        id:
          "pbdb",

        institution:
          "Paleobiology Database",

        title:
          "Paleobiology Database",

        role:
          "Fonte externa utilizada pelo Fossil Explorer para ocorrências paleontológicas.",

        url:
          "https://paleobiodb.org/",
      },
    ],
  };
}