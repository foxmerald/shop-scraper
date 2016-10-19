"use strict";

const tagsTranslator = {
  organic: {
    tags: ["bio", "s_bio", "bio-austria", "eu-bio", "ama-bio"],
    label: "Bio",
  },
  brand: {
    tags: ["s_marke"],
    label: "Markenprodukt",
  },
  cooled: {
    tags: ["s_gekuehlt"],
    label: "Gekühlt",
  },
  frozen: {
    tags: ["s_tiefgek"],
    label: "Tiefgekühlt",
  },
  sealOfQuality: {
    tags: ["s_guetesie", "ama-guetesiegel"],
    label: "AMA Gütesiegel",
  },
  specialDiet: {
    tags: ["s_spezern"],
    label: "Spezielle Ernährung",
  },
  countryOfOrigin: {
    tags: ["s_herkunft", "s_hkland"],
    label: "Herkunftsland",
  },
  regional: {
    tags: ["s_regio"],
    label: "Regional",
  },
  newProduct: {
    tags: ["s_new"],
    label: "Neu",
  },
  varyingWeight: {
    tags: ["mengemin", "weightArticle", "weightPieceArticle"],
    label: "Gewichtsprodukt",
  },
  fairtrade: {
    tags: ["fairtrade"],
    label: "Fairtrade",
  },
  decaffeinated: {
    tags: ["koffeinfrei"],
    label: "Koffenfrei",
  },
  lactoseFree: {
    tags: ["laktosefrei"],
    label: "Laktosefrei",
  },
  vegan: {
    tags: ["vegan", "veganblume"],
    label: "Vegan",
  },
  vegetarian: {
    tags: ["vegetarisch"],
    label: "Vegetarisch",
  },
  alcoholFree: {
    tags: ["alkoholfrei"],
    label: "Alkoholfrei",
  },
  geneticallyUnmodified: {
    tags: ["gentechnikfrei"],
    label: "Gentechnikfrei",
  },
  fairtrade: {
    tags: ["fairtrade"],
    label: "Fairtrade",
  },
  light: {
    tags: ["leichtproduct"],
    label: "Light Produkt",
  },
  glutenfree: {
    tags: ["glutenfrei"],
    label: "Glutenfrei",
  },
  demeter: {
    tags: ["demeter"],
    label: "Demeter",
  },
  proPlanet: {
    tags: ["pro-planet"],
    label: "Pro Planet",
  },
  utz: {
    tags: ["utz"],
    label: "UTZ-Siegel (nachhaltiger Anbau von Agrarprodukten)",
  },
  msc: {
    tags: ["msc"],
    label: "MSC-Gütesiegel (nachhaltige Fischerei)",
  },
  aoc: {
    tags: ["aoc"],
    label: "AOC-Siegel (geschützte Herkunftsbezeichnung) ",
  },
  aop: {
    tags: ["aop"],
    label: "AOP-Siegel (geschützte Herkunftsbezeichnung)",
  },
  asc: {
    tags: ["asc"],
    label: "ASC-Siegel (nachhaltige Fischzucht)",
  },
  doc: {
    tags: ["doc"],
    label: "DOC-Siegel (geschützte Herkunftsbezeichnung)",
  },
  dop: {
    tags: ["dop"],
    label: "DOP-Siegel (geschützte Herkunftsbezeichnung)",
  },
  fsc: {
    tags: ["fsc"],
    label: "FSC-Siegel (nachhaltige Forstwirtschaft)",
  },
  gga: {
    tags: ["gga"],
    label: "g.g.A.-Siegel (geschützte geografische Angabe)",
  },
  gts: {
    tags: ["gts"],
    label: "g.t.S-Siegel (garantierte traditionelle Spezialität)",
  },
  gu: {
    tags: ["gu"],
    label: "g.U.-Siegel (geschützte Ursprungsbezeichnung)",
  },
  arge: {
    tags: ["arge-heumilch"],
    label: "ARGE Heumilch",
  },
  umweltzeichen: {
    tags: ["oesterreichisches-umweltzeichen"],
    label: "Österreichisches Umweltzeichen",
  },
  rainforestAlliance: {
    tags: ["rainforest-alliance"],
    label: "Rainforest Alliance",
  },
  sale: {
    tags: ["sale", "AKTION"],
    label: "Sale",
  },
  dauertiefpreis: {
    tags: ["DAUERTIEFPREIS"],
    label: "Dauertiefpreis",
  },
  satterrabatt: {
    tags: ["SATTERRABATT"],
    label: "Satter Rabatt",
  },
  sugar: {
    tags: ["s_zucker"],
    label: "Zucker",
  },
  fat: {
    tags: ["s_fett"],
    label: "Fett",
  },
  allergen: {
    tags: ["s_falergen"],
    label: "Allergene",
  },
  nutrition: {
    tags: ["s_naehrsto"],
    label: "Nährstoffe",
  },
  inStoreBakery: {
    tags: ["backshop"],
    label: "Backshop",
  },
  fineFoodsCounter: {
    tags: ["feinkost"],
    label: "Feinkost",
  },
  meatCounter: {
    tags: ["fleischerei"],
    label: "Fleischerei",
  },
  pastryCounter: {
    tags: ["konditorei"],
    label: "Konditorei",
  },
  vitaminBar: {
    tags: ["vitaminbar"],
    label: "Vitaminbar",
  },
  vacuumPackaging: {
    tags: ["vacuumPackagingAvailable"],
    label: "Vakuumverpackung",
  }
};

module.exports = function() {
  let translator = {};

  for (let prop in tagsTranslator) {
    let tagObj = tagsTranslator[prop];
    let tags = tagObj.tags;

    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i];

      translator[tag] = {
        key: prop,
        label: tagObj.label
      };
    }
  }

  return translator;
};
