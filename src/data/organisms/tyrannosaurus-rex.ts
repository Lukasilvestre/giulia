import type { Organism } from "@/types/organism";

export const tyrannosaurusRex: Organism = {
  id: "tyrannosaurus-rex",

  slug: "tyrannosaurus-rex",

  scientificName: "Tyrannosaurus rex",

  displayName: "Tyrannosaurus rex",

  rank: "species",

  group: "Theropoda",

  pbdbTaxon: "Tyrannosaurus",

  temporalRange: {
    startMa: 68,
    endMa: 66,
    label: "Cretáceo Tardio",
  },

  diet: "Carnívoro",

  locomotion: "Bípede",

  length: "≈ 12 m",

  mass: "≈ 7 t",

  distribution: [
    "Oeste da América do Norte",
    "Estados Unidos",
    "Canadá",
  ],

  environment: [
    "Planícies fluviais",
    "Ambientes terrestres",
    "Ecossistemas subtropicais a temperados",
  ],

  description:
    "Tyrannosaurus rex foi um grande dinossauro terópode da família Tyrannosauridae que viveu próximo ao final do Cretáceo. É um dos grandes predadores terrestres mais conhecidos do registro fóssil.",

  classification: [
    {
      rank: "Reino",
      name: "Animalia",
    },
    {
      rank: "Filo",
      name: "Chordata",
    },
    {
      rank: "Clado",
      name: "Dinosauria",
    },
    {
      rank: "Clado",
      name: "Saurischia",
    },
    {
      rank: "Clado",
      name: "Theropoda",
    },
    {
      rank: "Família",
      name: "Tyrannosauridae",
    },
    {
      rank: "Gênero",
      name: "Tyrannosaurus",
    },
    {
      rank: "Espécie",
      name: "Tyrannosaurus rex",
    },
  ],

  highlights: [
    "Grande terópode predador",
    "Dentes adaptados para cortar e esmagar",
    "Viveu aproximadamente entre 68 e 66 Ma",
    "Um dos últimos grandes dinossauros não avianos",
  ],

  evidenceNotes: [
    "Fósseis incluem crânios, dentes e esqueletos relativamente completos.",
    "Marcas de mordida e anatomia dentária fornecem evidências importantes sobre alimentação.",
    "A função exata dos pequenos membros anteriores ainda é discutida.",
  ],

  parentInterval: {
    name: "Cretáceo",
    slug: "cretaceous",
  },

  references: [
    {
      institution:
        "Natural History Museum, London",

      title:
        "Tyrannosaurus — Dino Directory",

      url:
        "https://www.nhm.ac.uk/discover/dino-directory/tyrannosaurus.html",
    },

    {
      institution:
        "Smithsonian Institution",

      title:
        "Tyrannosaurus rex Fact Sheet",

      url:
        "https://www.si.edu/newsdesk/factsheets/tyrannosaurus-rex",
    },

    {
      institution:
        "Smithsonian National Museum of Natural History",

      title:
        "The Nation's T. rex",

      url:
        "https://naturalhistory.si.edu/explore/dinosaurs-fossils/nations-t-rex",
    },
  ],
};

export default tyrannosaurusRex;
