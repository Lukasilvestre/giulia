import type { IntervalScientificContent } from "@/types/interval-content";

export const cretaceousContent: IntervalScientificContent = {
  slug: "cretaceous",

  tagline:
    "Continentes em transformação e ecossistemas em rápida diversificação.",

  summary:
    "O Cretáceo foi o último período da Era Mesozoica. Durante aproximadamente 77 milhões de anos, os continentes continuaram sua fragmentação, extensos mares rasos ocuparam regiões continentais e importantes transformações ocorreram nos ecossistemas terrestres e marinhos. O período terminou há 66 milhões de anos com a extinção em massa do limite Cretáceo-Paleógeno.",

  facts: [
    {
      label: "Intervalo",
      value: "143,1 – 66 Ma",
      detail: "International Commission on Stratigraphy",
    },
    {
      label: "Duração",
      value: "≈ 77 milhões de anos",
      detail: "Último período do Mesozoico",
    },
    {
      label: "Era",
      value: "Mesozoico",
    },
    {
      label: "Éon",
      value: "Fanerozoico",
    },
    {
      label: "Subdivisão principal",
      value: "Early / Late Cretaceous",
      detail: "Lower / Upper em cronoestratigrafia",
    },
    {
      label: "Evento final",
      value: "Extinção K–Pg",
      detail: "66 Ma",
    },
  ],

  earth: {
    title: "Uma Terra em transformação",

    introduction:
      "Durante o Cretáceo, a fragmentação da Pangeia continuou e os continentes aproximaram-se progressivamente de configurações mais familiares.",

    paragraphs: [
      "A abertura e expansão de oceanos separaram massas continentais que anteriormente faziam parte da Pangeia.",

      "Grandes áreas continentais foram cobertas por mares epicontinentais rasos. Na América do Norte, por exemplo, o Western Interior Seaway dividiu partes do continente.",

      "A distribuição diferente de continentes e oceanos influenciou circulação oceânica, clima e isolamento de populações, contribuindo para diferentes trajetórias evolutivas regionais.",
    ],

    highlights: [
      "Fragmentação contínua da Pangeia",
      "Expansão do Atlântico",
      "Grandes mares epicontinentais",
      "Continentes ainda em posições diferentes das atuais",
    ],

    sources: [
      "International Commission on Stratigraphy",
      "Natural History Museum",
    ],
  },

  climate: {
    title: "Um planeta geralmente mais quente",

    introduction:
      "Grande parte do Cretáceo apresentou condições de efeito estufa mais intensas que as atuais.",

    paragraphs: [
      "As temperaturas globais eram geralmente mais elevadas que as atuais e, durante partes importantes do período, havia pouco ou nenhum gelo permanente nas regiões polares.",

      "Níveis do mar elevados produziram extensas áreas marinhas rasas sobre os continentes.",

      "Evidências fósseis mostram que florestas temperadas conseguiram existir em altas latitudes, incluindo regiões atualmente cobertas pelo gelo antártico.",
    ],

    highlights: [
      "Clima global quente",
      "Pouco gelo polar durante grande parte do período",
      "Nível do mar elevado",
      "Florestas em altas latitudes",
    ],

    sources: [
      "Natural History Museum",
    ],
  },

  fauna: [
    {
      name: "Dinossauros não avianos",
      subtitle: "Dinosauria",

      description:
        "Os dinossauros permaneceram componentes dominantes de muitos ecossistemas terrestres. Diferentes linhagens de terópodes, saurópodes, ornitópodes, ceratopsianos e anquilossauros ocorreram durante o período.",

      tags: [
        "Terrestre",
        "Vertebrados",
      ],
    },

    {
      name: "Tyrannosaurus",
      subtitle: "Tyrannosauridae",
      organismSlug: "tyrannosaurus-rex",

      description:
        "Grandes terópodes tiranossaurídeos viveram durante partes do Cretáceo Superior. Tyrannosaurus rex é um representante tardio desse grupo.",

      tags: [
        "Cretáceo Superior",
        "Predador",
      ],
    },

    {
      name: "Triceratops",
      subtitle: "Ceratopsia",
      organismSlug: "triceratops",

      description:
        "Triceratops é um conhecido representante dos ceratopsianos do final do Cretáceo.",

      tags: [
        "Herbívoro",
        "Terrestre",
      ],
    },

    {
      name: "Mossassauros",
      subtitle: "Mosasauridae",

      description:
        "Répteis marinhos altamente diversificados ocuparam ambientes oceânicos durante o Cretáceo Superior.",

      tags: [
        "Marinho",
        "Predador",
      ],
    },

    {
      name: "Ammonites",
      subtitle: "Ammonoidea",

      description:
        "Cefalópodes de concha espiralada foram importantes componentes dos ambientes marinhos e são muito relevantes para estudos bioestratigráficos.",

      tags: [
        "Marinho",
        "Invertebrados",
      ],
    },

    {
      name: "Aves e mamíferos",

      description:
        "Aves continuaram sua diversificação enquanto diferentes linhagens de pequenos mamíferos ocuparam uma variedade crescente de nichos ecológicos.",

      tags: [
        "Vertebrados",
        "Diversificação",
      ],
    },
  ],

  flora: [
    {
      name: "Angiospermas",
      subtitle: "Plantas com flores",

      description:
        "As angiospermas tornaram-se progressivamente mais importantes e diversificadas ao longo do Cretáceo.",

      tags: [
        "Grande transformação evolutiva",
      ],
    },

    {
      name: "Coníferas",

      description:
        "Coníferas continuaram sendo componentes importantes das paisagens, incluindo florestas de altas latitudes.",

      tags: [
        "Gimnospermas",
      ],
    },

    {
      name: "Samambaias",

      description:
        "Samambaias eram abundantes e ocupavam diferentes ambientes, incluindo paisagens relativamente abertas.",

      tags: [
        "Plantas vasculares",
      ],
    },

    {
      name: "Cicadófitas",

      description:
        "Plantas semelhantes às cicadáceas modernas continuaram presentes em diversos ecossistemas terrestres.",

      tags: [
        "Gimnospermas",
      ],
    },
  ],

  events: [
    {
      age: "143,1 Ma",
      title: "Início do Cretáceo",
      type: "geology",

      description:
        "Limite temporal atualmente utilizado pela International Commission on Stratigraphy para o início do período.",
    },

    {
      age: "Cretáceo Inferior",
      title: "Expansão das angiospermas",
      type: "evolution",

      description:
        "As plantas com flores passam a tornar-se progressivamente mais importantes no registro fóssil.",
    },

    {
      age: "100,5 Ma",
      title: "Início do Cretáceo Superior",
      type: "geology",

      description:
        "O início do Cenomaniano marca a base da subdivisão superior do Cretáceo.",
    },

    {
      age: "Cretáceo Superior",
      title: "Diversificação de ecossistemas regionais",
      type: "evolution",

      description:
        "O isolamento crescente entre massas continentais contribuiu para faunas regionais distintas.",
    },

    {
      age: "66 Ma",
      title: "Extinção Cretáceo–Paleógeno",
      type: "extinction",

      description:
        "O impacto de um grande asteroide desencadeou profundas alterações ambientais e está associado à extinção dos dinossauros não avianos e de muitos outros grupos.",
    },
  ],

  fossils: [
    {
      name: "Tyrannosaurus rex",
      organismSlug: "tyrannosaurus-rex",
      group: "Theropoda",
      interval: "Final do Cretáceo",

      description:
        "Um dos grandes predadores terrestres mais conhecidos do final do período.",
    },

    {
      name: "Triceratops",
      organismSlug: "triceratops",
      group: "Ceratopsidae",
      interval: "Final do Cretáceo",

      description:
        "Grande dinossauro herbívoro ceratopsiano conhecido principalmente do oeste da América do Norte.",
    },

    {
      name: "Mosasauridae",
      group: "Squamata",
      interval: "Cretáceo Superior",

      description:
        "Grupo de grandes répteis marinhos representado em depósitos oceânicos de várias regiões do mundo.",
    },

    {
      name: "Ammonoidea",
      group: "Cephalopoda",
      interval: "Cretáceo",

      description:
        "Ammonites são particularmente úteis para correlação bioestratigráfica de muitas sequências marinhas.",
    },

    {
      name: "Angiospermas fósseis",
      group: "Plantae",
      interval: "Cretáceo",

      description:
        "Folhas, pólen, sementes e outras estruturas registram a crescente diversificação das plantas com flores.",
    },
  ],

  references: [
    {
      id: "ics",
      institution:
        "International Commission on Stratigraphy",
      title:
        "International Chronostratigraphic Chart",
      role:
        "Cronologia e limites estratigráficos",
    },

    {
      id: "ics-cretaceous",
      institution:
        "Subcommission on Cretaceous Stratigraphy",
      title:
        "Cretaceous Stratigraphic Scale",
      role:
        "Subdivisões e limites do Cretáceo",
    },

    {
      id: "nhm-cretaceous",
      institution:
        "Natural History Museum, London",
      title:
        "The Cretaceous Period",
      role:
        "Paleogeografia, clima, fauna e flora",
    },

    {
      id: "smithsonian-extinction",
      institution:
        "Smithsonian National Museum of Natural History",
      title:
        "Extinction Over Time",
      role:
        "Extinção do final do Cretáceo",
    },

    {
      id: "pbdb",
      institution:
        "Paleobiology Database",
      title:
        "Fossil occurrence database",
      role:
        "Ocorrências fósseis e distribuição paleobiológica",
    },
  ],
};

export default cretaceousContent;