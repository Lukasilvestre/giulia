import type {
  GeologicalInterval,
} from "@/types/geological";

function intervalColor(
  rank: GeologicalInterval["rank"]
): string {
  switch (rank) {
    case "eon":
      return "#D6C684";

    case "era":
      return "#A8C7A1";

    case "period":
      return "#7FA7A0";

    case "epoch":
      return "#8E9FB5";

    default:
      return "#9AA39E";
  }
}
function n(
  slug: string,
  name: string,
  namePt: string,
  rank: GeologicalInterval["rank"],
  startMa: number,
  endMa: number,
  description: string,
  children?: GeologicalInterval[]
): GeologicalInterval {
  return {
    id: slug,
    slug,
    name,
    namePt,
    rank,
    startMa,
    endMa,
    description,
    color: intervalColor(rank),
    children,
  };
}

export const geologicalTimescale: GeologicalInterval[] = [

  n(
    "hadean",
    "Hadean",
    "Hadeano",
    "eon",
    4567,
    4031,
    "Intervalo mais antigo da história da Terra, iniciado com a formação do planeta e caracterizado por um registro geológico extremamente escasso."
  ),

  n(
    "archean",
    "Archean",
    "Arqueano",
    "eon",
    4031,
    2500,
    "Éon marcado pelo desenvolvimento de antigas crostas continentais e por algumas das evidências mais antigas de vida.",
    [
      n(
        "eoarchean",
        "Eoarchean",
        "Eoarqueano",
        "era",
        4031,
        3600,
        "Era inicial do Arqueano, contendo algumas das rochas crustais mais antigas conhecidas."
      ),

      n(
        "paleoarchean",
        "Paleoarchean",
        "Paleoarqueano",
        "era",
        3600,
        3200,
        "Intervalo arqueano associado à expansão de terrenos crustais muito antigos."
      ),

      n(
        "mesoarchean",
        "Mesoarchean",
        "Mesoarqueano",
        "era",
        3200,
        2800,
        "Era marcada pela evolução de antigos crátons e ecossistemas microbianos."
      ),

      n(
        "neoarchean",
        "Neoarchean",
        "Neoarqueano",
        "era",
        2800,
        2500,
        "Fase final do Arqueano, marcada por importantes transformações tectônicas e ambientais."
      ),
    ]
  ),

  n(
    "proterozoic",
    "Proterozoic",
    "Proterozoico",
    "eon",
    2500,
    538.8,
    "Longo éon marcado por profundas mudanças na atmosfera, nos oceanos e na biosfera.",
    [
      n(
        "paleoproterozoic",
        "Paleoproterozoic",
        "Paleoproterozoico",
        "era",
        2500,
        1600,
        "Era inicial do Proterozoico, associada a grandes transformações atmosféricas e tectônicas.",
        [
          n(
            "siderian",
            "Siderian",
            "Sideriano",
            "period",
            2500,
            2300,
            "Primeiro período do Paleoproterozoico."
          ),

          n(
            "rhyacian",
            "Rhyacian",
            "Riaciano",
            "period",
            2300,
            2050,
            "Período paleoproterozoico marcado por importantes mudanças tectônicas e ambientais."
          ),

          n(
            "orosirian",
            "Orosirian",
            "Orosiriano",
            "period",
            2050,
            1800,
            "Intervalo caracterizado por intensa reorganização crustal em várias regiões."
          ),

          n(
            "statherian",
            "Statherian",
            "Statheriano",
            "period",
            1800,
            1600,
            "Período final do Paleoproterozoico."
          ),
        ]
      ),

      n(
        "mesoproterozoic",
        "Mesoproterozoic",
        "Mesoproterozoico",
        "era",
        1600,
        1000,
        "Era intermediária do Proterozoico, marcada por extensos ambientes marinhos e evolução de eucariotos.",
        [
          n(
            "calymmian",
            "Calymmian",
            "Calymmiano",
            "period",
            1600,
            1400,
            "Primeiro período do Mesoproterozoico."
          ),

          n(
            "ectasian",
            "Ectasian",
            "Ectasiano",
            "period",
            1400,
            1200,
            "Período intermediário do Mesoproterozoico."
          ),

          n(
            "stenian",
            "Stenian",
            "Steniano",
            "period",
            1200,
            1000,
            "Período final do Mesoproterozoico."
          ),
        ]
      ),

      n(
        "neoproterozoic",
        "Neoproterozoic",
        "Neoproterozoico",
        "era",
        1000,
        538.8,
        "Era final do Proterozoico, incluindo grandes glaciações e diversificação de organismos multicelulares.",
        [
          n(
            "tonian",
            "Tonian",
            "Toniano",
            "period",
            1000,
            720,
            "Primeiro período do Neoproterozoico."
          ),

          n(
            "cryogenian",
            "Cryogenian",
            "Cryogeniano",
            "period",
            720,
            635,
            "Período associado a extensos episódios glaciais."
          ),

          n(
            "ediacaran",
            "Ediacaran",
            "Ediacarano",
            "period",
            635,
            538.8,
            "Último período do Proterozoico, conhecido por importantes registros de organismos multicelulares de corpo mole."
          ),
        ]
      ),
    ]
  ),

  n(
    "phanerozoic",
    "Phanerozoic",
    "Fanerozoico",
    "eon",
    538.8,
    0,
    "Éon atual, caracterizado por um registro fóssil abundante e pela grande diversificação da vida animal e vegetal.",
    [
      n(
        "paleozoic",
        "Paleozoic",
        "Paleozoico",
        "era",
        538.8,
        251.902,
        "Era de grande diversificação da vida marinha e colonização progressiva dos ambientes terrestres.",
        [
          n(
            "cambrian",
            "Cambrian",
            "Cambriano",
            "period",
            538.8,
            486.85,
            "Período associado à rápida diversificação de muitos grupos animais.",
            [
              n(
                "terreneuvian",
                "Terreneuvian",
                "Terreneuviano",
                "epoch",
                538.8,
                521,
                "Primeira série do Cambriano."
              ),

              n(
                "cambrian-series-2",
                "Cambrian Series 2",
                "Série 2 do Cambriano",
                "epoch",
                521,
                506.5,
                "Segunda série do Cambriano."
              ),

              n(
                "miaolingian",
                "Miaolingian",
                "Miaolingiano",
                "epoch",
                506.5,
                497,
                "Terceira série do Cambriano."
              ),

              n(
                "furongian",
                "Furongian",
                "Furongiano",
                "epoch",
                497,
                486.85,
                "Série superior do Cambriano."
              ),
            ]
          ),

          n(
            "ordovician",
            "Ordovician",
            "Ordoviciano",
            "period",
            486.85,
            443.1,
            "Período de ampla diversificação dos ecossistemas marinhos.",
            [
              n(
                "early-ordovician",
                "Early Ordovician",
                "Ordoviciano Inferior",
                "epoch",
                486.85,
                471.3,
                "Primeira época do Ordoviciano."
              ),

              n(
                "middle-ordovician",
                "Middle Ordovician",
                "Ordoviciano Médio",
                "epoch",
                471.3,
                458.2,
                "Época intermediária do Ordoviciano."
              ),

              n(
                "late-ordovician",
                "Late Ordovician",
                "Ordoviciano Superior",
                "epoch",
                458.2,
                443.1,
                "Época final do Ordoviciano."
              ),
            ]
          ),

          n(
            "silurian",
            "Silurian",
            "Siluriano",
            "period",
            443.1,
            419.62,
            "Período de recuperação após a crise do final do Ordoviciano.",
            [
              n(
                "llandovery",
                "Llandovery",
                "Llandovery",
                "epoch",
                443.1,
                432.9,
                "Primeira série do Siluriano."
              ),

              n(
                "wenlock",
                "Wenlock",
                "Wenlock",
                "epoch",
                432.9,
                426.7,
                "Segunda série do Siluriano."
              ),

              n(
                "ludlow",
                "Ludlow",
                "Ludlow",
                "epoch",
                426.7,
                422.7,
                "Terceira série do Siluriano."
              ),

              n(
                "pridoli",
                "Pridoli",
                "Pridoli",
                "epoch",
                422.7,
                419.62,
                "Série final do Siluriano."
              ),
            ]
          ),

          n(
            "devonian",
            "Devonian",
            "Devoniano",
            "period",
            419.62,
            358.86,
            "Período marcado pela diversificação dos peixes, expansão das primeiras florestas e importantes transformações dos ecossistemas terrestres.",
            [
              n(
                "early-devonian",
                "Early Devonian",
                "Devoniano Inferior",
                "epoch",
                419.62,
                393.47,
                "Primeira época do Devoniano."
              ),

              n(
                "middle-devonian",
                "Middle Devonian",
                "Devoniano Médio",
                "epoch",
                393.47,
                382.31,
                "Época intermediária do Devoniano."
              ),

              n(
                "late-devonian",
                "Late Devonian",
                "Devoniano Superior",
                "epoch",
                382.31,
                358.86,
                "Época final do Devoniano."
              ),
            ]
          ),

          n(
            "carboniferous",
            "Carboniferous",
            "Carbonífero",
            "period",
            358.86,
            298.9,
            "Período marcado por extensos ecossistemas terrestres e grandes depósitos de carvão.",
            [
              n(
                "mississippian",
                "Mississippian",
                "Mississippiano",
                "epoch",
                358.86,
                323.4,
                "Grande subdivisão inferior do Carbonífero."
              ),

              n(
                "pennsylvanian",
                "Pennsylvanian",
                "Pennsylvaniano",
                "epoch",
                323.4,
                298.9,
                "Grande subdivisão superior do Carbonífero."
              ),
            ]
          ),

          n(
            "permian",
            "Permian",
            "Permiano",
            "period",
            298.9,
            251.902,
            "Último período do Paleozoico, encerrado pela maior extinção em massa conhecida.",
            [
              n(
                "cisuralian",
                "Cisuralian",
                "Cisuraliano",
                "epoch",
                298.9,
                274.4,
                "Primeira série do Permiano."
              ),

              n(
                "guadalupian",
                "Guadalupian",
                "Guadalupiano",
                "epoch",
                274.4,
                259.857,
                "Série intermediária do Permiano."
              ),

              n(
                "lopingian",
                "Lopingian",
                "Lopingiano",
                "epoch",
                259.857,
                251.902,
                "Série superior do Permiano."
              ),
            ]
          ),
        ]
      ),

      n(
        "mesozoic",
        "Mesozoic",
        "Mesozoico",
        "era",
        251.902,
        66,
        "Era marcada pela grande diversificação dos dinossauros e profundas mudanças nos continentes e oceanos.",
        [
          n(
            "triassic",
            "Triassic",
            "Triássico",
            "period",
            251.902,
            201.4,
            "Primeiro período do Mesozoico, iniciado após a extinção do Permiano.",
            [
              n(
                "early-triassic",
                "Early Triassic",
                "Triássico Inferior",
                "epoch",
                251.902,
                247,
                "Primeira época do Triássico."
              ),

              n(
                "middle-triassic",
                "Middle Triassic",
                "Triássico Médio",
                "epoch",
                247,
                237,
                "Época intermediária do Triássico."
              ),

              n(
                "late-triassic",
                "Late Triassic",
                "Triássico Superior",
                "epoch",
                237,
                201.4,
                "Época final do Triássico."
              ),
            ]
          ),

          n(
            "jurassic",
            "Jurassic",
            "Jurássico",
            "period",
            201.4,
            143.1,
            "Período de grande diversificação dos dinossauros, répteis marinhos e outros grupos mesozoicos.",
            [
              n(
                "early-jurassic",
                "Early Jurassic",
                "Jurássico Inferior",
                "epoch",
                201.4,
                174.7,
                "Primeira época do Jurássico."
              ),

              n(
                "middle-jurassic",
                "Middle Jurassic",
                "Jurássico Médio",
                "epoch",
                174.7,
                161.5,
                "Época intermediária do Jurássico."
              ),

              n(
                "late-jurassic",
                "Late Jurassic",
                "Jurássico Superior",
                "epoch",
                161.5,
                143.1,
                "Época final do Jurássico."
              ),
            ]
          ),

          n(
            "cretaceous",
            "Cretaceous",
            "Cretáceo",
            "period",
            143.1,
            66,
            "Último período do Mesozoico, marcado por importantes mudanças paleogeográficas e biológicas.",
            [
              n(
                "early-cretaceous",
                "Early Cretaceous",
                "Cretáceo Inferior",
                "epoch",
                143.1,
                100.5,
                "Primeira grande divisão do Cretáceo."
              ),

              n(
                "late-cretaceous",
                "Late Cretaceous",
                "Cretáceo Superior",
                "epoch",
                100.5,
                66,
                "Divisão superior do Cretáceo, encerrada no limite K–Pg."
              ),
            ]
          ),
        ]
      ),

      n(
        "cenozoic",
        "Cenozoic",
        "Cenozoico",
        "era",
        66,
        0,
        "Era atual, marcada pela ampla diversificação de mamíferos, aves e ecossistemas modernos.",
        [
          n(
            "paleogene",
            "Paleogene",
            "Paleógeno",
            "period",
            66,
            23.04,
            "Primeiro período do Cenozoico.",
            [
              n(
                "paleocene",
                "Paleocene",
                "Paleoceno",
                "epoch",
                66,
                56,
                "Primeira época do Cenozoico."
              ),

              n(
                "eocene",
                "Eocene",
                "Eoceno",
                "epoch",
                56,
                33.9,
                "Época marcada por grande diversificação de mamíferos e importantes mudanças climáticas."
              ),

              n(
                "oligocene",
                "Oligocene",
                "Oligoceno",
                "epoch",
                33.9,
                23.04,
                "Época final do Paleógeno."
              ),
            ]
          ),

          n(
            "neogene",
            "Neogene",
            "Neógeno",
            "period",
            23.04,
            2.58,
            "Período de expansão de diversos ecossistemas modernos.",
            [
              n(
                "miocene",
                "Miocene",
                "Mioceno",
                "epoch",
                23.04,
                5.333,
                "Primeira época do Neógeno."
              ),

              n(
                "pliocene",
                "Pliocene",
                "Plioceno",
                "epoch",
                5.333,
                2.58,
                "Época final do Neógeno."
              ),
            ]
          ),

          n(
            "quaternary",
            "Quaternary",
            "Quaternário",
            "period",
            2.58,
            0,
            "Período mais recente, caracterizado por ciclos glaciais e pela história evolutiva recente do gênero Homo.",
            [
              n(
                "pleistocene",
                "Pleistocene",
                "Pleistoceno",
                "epoch",
                2.58,
                0.0117,
                "Época marcada por repetidos ciclos glaciais e interglaciais."
              ),

              n(
                "holocene",
                "Holocene",
                "Holoceno",
                "epoch",
                0.0117,
                0,
                "Época atual da escala geológica."
              ),
            ]
          ),
        ]
      ),
    ]
  ),
];