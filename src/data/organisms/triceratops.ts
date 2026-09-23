import type { Organism } from "@/types/organism";

export const triceratops: Organism = {
  id: "triceratops",

  slug: "triceratops",

  scientificName: "Triceratops",

  displayName: "Triceratops",

  rank: "genus",

  group: "Ceratopsia",

  pbdbTaxon: "Triceratops",

  temporalRange: {
    startMa: 68,
    endMa: 66,
    label: "Cretáceo Tardio",
  },

  diet: "Herbívoro",

  locomotion: "Quadrúpede",

  length: "≈ 9 m",

  mass: "até ≈ 10 t",

  distribution: [
    "América do Norte",
    "Estados Unidos",
  ],

  environment: [
    "Ambientes terrestres",
    "Planícies fluviais",
    "Vegetação diversificada",
  ],

  description:
    "Triceratops é um gênero de grandes dinossauros ceratopsianos do final do Cretáceo. Caracterizava-se pelo grande crânio, gola óssea e três chifres.",

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
      name: "Ornithischia",
    },
    {
      rank: "Clado",
      name: "Ceratopsia",
    },
    {
      rank: "Família",
      name: "Ceratopsidae",
    },
    {
      rank: "Gênero",
      name: "Triceratops",
    },
  ],

  highlights: [
    "Grande dinossauro herbívoro",
    "Três chifres cranianos",
    "Grande gola óssea",
    "Contemporâneo de Tyrannosaurus rex",
  ],

  evidenceNotes: [
    "Há numerosos fósseis cranianos conhecidos.",
    "Alguns fósseis apresentam marcas de mordida compatíveis com grandes tiranossaurídeos.",
    "Lesões cicatrizadas fornecem evidências de sobrevivência após determinados ferimentos.",
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
        "Triceratops — Dino Directory",

      url:
        "https://www.nhm.ac.uk/discover/dino-directory/triceratops.html",
    },

    {
      institution:
        "Smithsonian National Museum of Natural History",

      title:
        "The Last American Dinosaurs",

      url:
        "https://naturalhistory.si.edu/exhibits/last-american-dinosaurs-discovering-lost-world",
    },
  ],
};

export default triceratops;
