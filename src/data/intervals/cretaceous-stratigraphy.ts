import type {
  StratigraphicDivision,
} from "@/types/interval-content";

export const cretaceousStratigraphy: StratigraphicDivision[] = [
  {
    id: "early-cretaceous",

    name: "Early Cretaceous",
    namePt: "Cretáceo Inicial",

    chronostratigraphicName:
      "Lower Cretaceous / Cretáceo Inferior",

    startMa: 143.1,
    endMa: 100.5,

    stages: [
      {
        name: "Berriasian",
        namePt: "Berriasiano",
        startMa: 143.1,
        endMa: 137.7,
      },
      {
        name: "Valanginian",
        namePt: "Valanginiano",
        startMa: 137.7,
        endMa: 132.6,
      },
      {
        name: "Hauterivian",
        namePt: "Hauteriviano",
        startMa: 132.6,
        endMa: 126.5,
      },
      {
        name: "Barremian",
        namePt: "Barremiano",
        startMa: 126.5,
        endMa: 121.4,
      },
      {
        name: "Aptian",
        namePt: "Aptiano",
        startMa: 121.4,
        endMa: 113.2,
      },
      {
        name: "Albian",
        namePt: "Albiano",
        startMa: 113.2,
        endMa: 100.5,
      },
    ],
  },

  {
    id: "late-cretaceous",

    name: "Late Cretaceous",
    namePt: "Cretáceo Tardio",

    chronostratigraphicName:
      "Upper Cretaceous / Cretáceo Superior",

    startMa: 100.5,
    endMa: 66,

    stages: [
      {
        name: "Cenomanian",
        namePt: "Cenomaniano",
        startMa: 100.5,
        endMa: 93.9,
      },
      {
        name: "Turonian",
        namePt: "Turoniano",
        startMa: 93.9,
        endMa: 89.39,
      },
      {
        name: "Coniacian",
        namePt: "Coniaciano",
        startMa: 89.39,
        endMa: 85.7,
      },
      {
        name: "Santonian",
        namePt: "Santoniano",
        startMa: 85.7,
        endMa: 83.65,
      },
      {
        name: "Campanian",
        namePt: "Campaniano",
        startMa: 83.65,
        endMa: 72.17,
      },
      {
        name: "Maastrichtian",
        namePt: "Maastrichtiano",
        startMa: 72.17,
        endMa: 66,
      },
    ],
  },
];

export default cretaceousStratigraphy;
