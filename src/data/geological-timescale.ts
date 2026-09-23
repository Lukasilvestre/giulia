import { GeologicalInterval } from "@/types/geological";

export const geologicalTimescale: GeologicalInterval[] = [
  {
    id: "hadean",
    name: "Hadean",
    namePt: "Hadeano",
    slug: "hadean",
    rank: "eon",
    startMa: 4567,
    endMa: 4031,
    description:
      "O Hadeano corresponde aos estágios mais antigos da história da Terra, abrangendo sua formação e diferenciação inicial.",
    color: "#b85a46",
  },

  {
    id: "archean",
    name: "Archean",
    namePt: "Arqueano",
    slug: "archean",
    rank: "eon",
    startMa: 4031,
    endMa: 2500,
    description:
      "Durante o Arqueano, a crosta terrestre tornou-se progressivamente mais estável e surgiram algumas das evidências mais antigas de vida.",
    color: "#d48745",
  },

  {
    id: "proterozoic",
    name: "Proterozoic",
    namePt: "Proterozoico",
    slug: "proterozoic",
    rank: "eon",
    startMa: 2500,
    endMa: 538.8,
    description:
      "O Proterozoico foi marcado por profundas transformações atmosféricas, ambientais e biológicas, incluindo a diversificação dos eucariotos.",
    color: "#8ba55b",
  },

  {
    id: "phanerozoic",
    name: "Phanerozoic",
    namePt: "Fanerozoico",
    slug: "phanerozoic",
    rank: "eon",
    startMa: 538.8,
    endMa: 0,
    description:
      "O Fanerozoico reúne a maior parte do registro fóssil macroscópico amplamente conhecido e compreende as eras Paleozoica, Mesozoica e Cenozoica.",
    color: "#4b9e9b",

    children: [
      {
        id: "paleozoic",
        name: "Paleozoic",
        namePt: "Paleozoico",
        slug: "paleozoic",
        rank: "era",
        startMa: 538.8,
        endMa: 251.902,
        description:
          "Era marcada pela grande diversificação da vida marinha, pela colonização dos continentes e por importantes transformações evolutivas.",
        color: "#70a982",

        children: [
          {
            id: "cambrian",
            name: "Cambrian",
            namePt: "Cambriano",
            slug: "cambrian",
            rank: "period",
            startMa: 538.8,
            endMa: 486.85,
            description:
              "Período associado a uma grande diversificação de organismos marinhos e à expansão do registro fóssil de animais com partes mineralizadas.",
            color: "#7fae93",
          },

          {
            id: "ordovician",
            name: "Ordovician",
            namePt: "Ordoviciano",
            slug: "ordovician",
            rank: "period",
            startMa: 486.85,
            endMa: 443.1,
            description:
              "Período de intensa diversificação dos ecossistemas marinhos e expansão de diversos grupos de invertebrados.",
            color: "#74a99c",
          },

          {
            id: "silurian",
            name: "Silurian",
            namePt: "Siluriano",
            slug: "silurian",
            rank: "period",
            startMa: 443.1,
            endMa: 419.62,
            description:
              "Período marcado pela recuperação após a extinção do final do Ordoviciano e pela expansão da vida em ambientes continentais.",
            color: "#62a39c",
          },

          {
            id: "devonian",
            name: "Devonian",
            namePt: "Devoniano",
            slug: "devonian",
            rank: "period",
            startMa: 419.62,
            endMa: 358.86,
            description:
              "Período de grande diversificação dos peixes, expansão das florestas primitivas e importantes mudanças nos ecossistemas terrestres.",
            color: "#739f75",
          },

          {
            id: "carboniferous",
            name: "Carboniferous",
            namePt: "Carbonífero",
            slug: "carboniferous",
            rank: "period",
            startMa: 358.86,
            endMa: 298.9,
            description:
              "Período conhecido por extensas florestas pantanosas, grandes depósitos de carvão e diversificação dos tetrápodes.",
            color: "#4f9474",
          },

          {
            id: "permian",
            name: "Permian",
            namePt: "Permiano",
            slug: "permian",
            rank: "period",
            startMa: 298.9,
            endMa: 251.902,
            description:
              "Último período do Paleozoico, marcado pela formação da Pangeia e encerrado pela maior crise biótica conhecida do Fanerozoico.",
            color: "#b76f52",
          },
        ],
      },

      {
        id: "mesozoic",
        name: "Mesozoic",
        namePt: "Mesozoico",
        slug: "mesozoic",
        rank: "era",
        startMa: 251.902,
        endMa: 66,
        description:
          "Era que compreende Triássico, Jurássico e Cretáceo e inclui a grande diversificação dos dinossauros, répteis marinhos e aves.",
        color: "#4f9c6c",

        children: [
          {
            id: "triassic",
            name: "Triassic",
            namePt: "Triássico",
            slug: "triassic",
            rank: "period",
            startMa: 251.902,
            endMa: 201.4,
            description:
              "Primeiro período do Mesozoico, marcado pela recuperação após a crise Permiano-Triássico e pelo surgimento dos primeiros dinossauros.",
            color: "#9c6f78",
          },

          {
            id: "jurassic",
            name: "Jurassic",
            namePt: "Jurássico",
            slug: "jurassic",
            rank: "period",
            startMa: 201.4,
            endMa: 143.1,
            description:
              "Período marcado pela diversificação dos dinossauros, abundância de répteis marinhos e mudanças importantes na configuração continental.",
            color: "#5d9c76",
          },

          {
            id: "cretaceous",
            name: "Cretaceous",
            namePt: "Cretáceo",
            slug: "cretaceous",
            rank: "period",
            startMa: 143.1,
            endMa: 66,
            description:
              "Último período do Mesozoico, marcado pela diversificação das angiospermas e encerrado pelo evento de extinção Cretáceo-Paleógeno.",
            color: "#86aa55",
          },
        ],
      },

      {
        id: "cenozoic",
        name: "Cenozoic",
        namePt: "Cenozoico",
        slug: "cenozoic",
        rank: "era",
        startMa: 66,
        endMa: 0,
        description:
          "Era marcada pela diversificação dos mamíferos, aves e angiospermas e pela formação progressiva dos ecossistemas modernos.",
        color: "#d6ba48",

        children: [
          {
            id: "paleogene",
            name: "Paleogene",
            namePt: "Paleógeno",
            slug: "paleogene",
            rank: "period",
            startMa: 66,
            endMa: 23.04,
            description:
              "Primeiro período do Cenozoico, marcado por importantes radiações evolutivas de mamíferos e aves após a extinção K-Pg.",
            color: "#d7ad49",
          },

          {
            id: "neogene",
            name: "Neogene",
            namePt: "Neógeno",
            slug: "neogene",
            rank: "period",
            startMa: 23.04,
            endMa: 2.58,
            description:
              "Período de modernização progressiva de muitos ecossistemas e diversificação de numerosos grupos modernos.",
            color: "#e0c55b",
          },

          {
            id: "quaternary",
            name: "Quaternary",
            namePt: "Quaternário",
            slug: "quaternary",
            rank: "period",
            startMa: 2.58,
            endMa: 0,
            description:
              "Período mais recente da história geológica, marcado por ciclos glaciais e pela evolução e expansão do gênero Homo.",
            color: "#f0df79",
          },
        ],
      },
    ],
  },
];
