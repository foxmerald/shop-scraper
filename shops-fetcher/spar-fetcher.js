// fetch topcategories
// F1 bis F12
// https://sp1004e38b.guided.lon5.atomz.com/?callback=parseResponse&sp_cs=UTF-8&category=F2-3&callback=parseResponse&_=1476975014238

// go trough all pages

// save productIds to Array

// crawl product detail pages:

// Product Detail Page
// `https://www.interspar.at/shop/lebensmittel/p/${productId}`
// e.g. https://www.interspar.at/shop/lebensmittel/p/5023660

let categoryF2_3 = {
  "general": {
    "queryCategory": "F2-3",
    "links": {
      "productUrl": "/store/p/",
      "loginUrl": "/store/login",
      "addFavouriteActionUrl": "/store/wishlist/addItemToFavourite",
      "removeFavouriteActionUrl": "/store/wishlist/removeItemFromFavourite",
      "getWishlistNamesUrl": "/store/wishlist/showListNames",
      "addToCartUrl": "/store/cart/add",
      "commonPath": "/store/_ui/desktop/common/"
    }
  },
  "resultcount": {
    "total": "277", // insgesamt produkte in dieser kategorie
    "pagelower": "1",
    "pageupper": "12"
  },
  "price_range": {},
  "applied-filters": [{
    "facetname": "",
    "value": "Glutenfrei",
    "undolink": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3"
  }, ],
  "breadcrumb": [{
    "value": "*",
    "path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
    "droppath": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3",
    "gotopath": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3",
    "removepath": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf"
  }, {
    "value": "Glutenfrei",
    "path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3",
    "droppath": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3",
    "gotopath": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
    "removepath": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3"
  }],
  "pagination": {
    "first": "",
    "previous": "",
    "current-path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
    "current-page": "",
    "next": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=2&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
    "last": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=24&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
    "viewall": "",
    "page-total": "24",
    "pages": [{
      "page": "1",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": true
    }, {
      "page": "2",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=2&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "page": "3",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=3&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "page": "4",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=4&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "page": "5",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=5&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "page": "6",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=6&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "page": "7",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=7&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "page": "8",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=8&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "page": "9",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=9&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "page": "10",
      "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&page=10&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }]
  },
  "menus": {
    "sort_menu": [{
      "value": "Relevanz",
      "path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&m_sortProdResults_egisp=relevance&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": true
    }, {
      "value": "A-Z",
      "path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&m_sortProdResults_egisp=product-brand&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "value": "Z-A",
      "path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&m_sortProdResults_egisp=product-brand-desc&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "value": "NEU",
      "path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&m_sortProdResults_egisp=product-is-new|product-name&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "value": "On Promotion",
      "path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&m_sortProdResults_egisp=prod-is-on-prom_desc|product-name&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "value": "niedrigerer Preis",
      "path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&m_sortProdResults_egisp=product-price|product-name&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }, {
      "value": "höherer Preis",
      "path": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&m_sortProdResults_egisp=product-price-desc|product-name&q=*&q1=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf",
      "selected": false
    }],
    "results_per_page_menu": [{
      "value": "12",
      "path": "12"
    }, {
      "value": "50",
      "path": "48"
    }, {
      "value": "100",
      "path": "96"
    }]
  },
  "facet_open_configuration": {
    "product-lifestyleInf": "",
    "product-brand": "",
    "product-origin": "",
    "prod-is-on-prom_desc": "",
    "product-price": ""
  },
  "facets": {
    "product-lifestyleInf": {
      "facetname": "product-lifestyleInf",
      "facettitle": "LifestyleCategories",
      "facetlong": true,
      "facetopen": "",
      "facetundo": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3",
      "facetvalues": [{
        "value": "AMA-Gutesiegel",
        "selected": false,
        "count": "23",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=AMA-Gutesiegel&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=product-lifestyleInf",
        "undolink": ""
      }, {
        "value": "Bio",
        "selected": false,
        "count": "18",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Bio&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=product-lifestyleInf",
        "undolink": ""
      }, {
        "value": "Gekühlt",
        "selected": false,
        "count": "212",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Gek%C3%BChlt&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=product-lifestyleInf",
        "undolink": ""
      }, {
        "value": "Glutenfrei",
        "selected": true,
        "count": "277",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Glutenfrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=product-lifestyleInf",
        "undolink": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3"
      }, {
        "value": "Lactosefrei",
        "selected": false,
        "count": "102",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Lactosefrei&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=product-lifestyleInf",
        "undolink": ""
      }, {
        "value": "immer Billig",
        "selected": false,
        "count": "23",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=immer+Billig&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=product-lifestyleInf",
        "undolink": ""
      }]
    },
    "prod-is-on-prom_desc": {
      "facetname": "prod-is-on-prom_desc",
      "facettitle": "Products On Promotion",
      "facetlong": true,
      "facetopen": "",
      "facetvalues": [{
        "value": "false",
        "selected": false,
        "count": "246",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=false&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=prod-is-on-prom_desc",
        "undolink": ""
      }, {
        "value": "true",
        "selected": false,
        "count": "31",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=true&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=prod-is-on-prom_desc",
        "undolink": ""
      }]
    },
    "product-actualprice": {
      "facetname": "product-actualprice",
      "facettitle": "Preis",
      "facetlong": true,
      "facetopen": "",
      "facetvalues": [{
        "value": "0,99",
        "selected": false,
        "count": "1",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=0%2C99&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=product-actualprice",
        "undolink": ""
      }, {
        "value": "1,19",
        "selected": false,
        "count": "3",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=1%2C19&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=product-actualprice",
        "undolink": ""
      }, {
        "value": "1,99",
        "selected": false,
        "count": "1",
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=1%2C99&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=product-actualprice",
        "undolink": ""
      }]
    },
  },
  "ecrfacets": [{
      "facetname": "ecr-land-filter",
      "facettitle": "Land",
      "facetlong": true,
      "facetvalues": [{
        "value": "Österreich",
        "selected": false,
        "count": 139,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=%C3%96sterreich&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Frankreich",
        "selected": false,
        "count": 53,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Frankreich&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Deutschland",
        "selected": false,
        "count": 38,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Deutschland&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Italien",
        "selected": false,
        "count": 24,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Italien&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Dänemark",
        "selected": false,
        "count": 5,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=D%C3%A4nemark&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Schweiz",
        "selected": false,
        "count": 5,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Schweiz&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Griechenland",
        "selected": false,
        "count": 3,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Griechenland&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Großbritannien",
        "selected": false,
        "count": 3,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Gro%C3%9Fbritannien&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Irland",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Irland&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Niederlande",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Niederlande&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Spanien",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Spanien&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }, {
        "value": "Zypern",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Zypern&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-land-filter",
        "undolink": ""
      }]
    },
    // Marken
    {
      "facetname": "ecr-marke",
      "facettitle": "Marke",
      "facetlong": true,
      "facetvalues": [{
        "value": "Alfa",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Alfa&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Appenzeller",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Appenzeller&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Bergader",
        "selected": false,
        "count": 4,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Bergader&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Bergbauer",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Bergbauer&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Borsault",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Borsault&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Bresse Bleu",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Bresse+Bleu&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Bresso",
        "selected": false,
        "count": 8,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Bresso&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Brie Maxim's de Paris",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Brie+Maxim's+de+Paris&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Cambozola",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Cambozola&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Castello",
        "selected": false,
        "count": 4,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Castello&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Chaumes",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Chaumes&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Chavroux",
        "selected": false,
        "count": 3,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Chavroux&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "DESPAR",
        "selected": false,
        "count": 6,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=DESPAR&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Die Käsemacher",
        "selected": false,
        "count": 11,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Die+K%C3%A4semacher&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Ellersdorfer",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Ellersdorfer&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Emmi",
        "selected": false,
        "count": 4,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Emmi&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Exquisa",
        "selected": false,
        "count": 4,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Exquisa&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Fallini",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Fallini&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Fol Epi",
        "selected": false,
        "count": 4,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Fol+Epi&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Forlasa",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Forlasa&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Fransial",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Fransial&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Fromi",
        "selected": false,
        "count": 4,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Fromi&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Galbani",
        "selected": false,
        "count": 9,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Galbani&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Germain",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Germain&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Gusteria",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Gusteria&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Heart of England",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Heart+of+England&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Höhle Kaltbach",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=H%C3%B6hle+Kaltbach&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Igor",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Igor&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Kerry",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Kerry&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Kiri",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Kiri&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Kolios",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Kolios&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Kärntnermilch",
        "selected": false,
        "count": 3,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=K%C3%A4rntnermilch&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Käserebellen",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=K%C3%A4serebellen&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "La Tournette",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=La+Tournette&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Landana",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Landana&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Latteria Mantova",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Latteria+Mantova&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Latteria Mantova 427",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Latteria+Mantova+427&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Ländle",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=L%C3%A4ndle&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Mini Babybel",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Mini+Babybel&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "NÖM",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=N%C3%96M&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Occelli",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Occelli&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Patros",
        "selected": false,
        "count": 5,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Patros&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Petrou",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Petrou&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Philadelphia",
        "selected": false,
        "count": 12,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Philadelphia&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "President",
        "selected": false,
        "count": 6,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=President&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Rambol",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Rambol&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Rougette",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Rougette&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "S-BUDGET",
        "selected": false,
        "count": 19,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=S-BUDGET&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "SPAR",
        "selected": false,
        "count": 9,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=SPAR&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "SPAR Natur*pur",
        "selected": false,
        "count": 16,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=SPAR+Natur*pur&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "SPAR PREMIUM",
        "selected": false,
        "count": 3,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=SPAR+PREMIUM&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Saint Agur",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Saint+Agur&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Saint Albray",
        "selected": false,
        "count": 5,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Saint+Albray&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Salakis",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Salakis&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "SalzburgMilch",
        "selected": false,
        "count": 3,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=SalzburgMilch&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Schlierbacher",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Schlierbacher&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Schärdinger",
        "selected": false,
        "count": 52,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Sch%C3%A4rdinger&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Sirius",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Sirius&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Tete de Moine",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Tete+de+Moine&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Tirol Milch",
        "selected": false,
        "count": 5,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Tirol+Milch&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Waldviertler",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Waldviertler&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Walserstolz",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Walserstolz&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Weizer Schafbauern",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Weizer+Schafbauern&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }, {
        "value": "Woerle",
        "selected": false,
        "count": 19,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Woerle&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-marke",
        "undolink": ""
      }]
    },
    // REGIONEN
    {
      "facetname": "ecr-region",
      "facettitle": "Region",
      "facetlong": true,
      "facetvalues": [{
        "value": "Kärnten",
        "selected": false,
        "count": 5,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=K%C3%A4rnten&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-region",
        "undolink": ""
      }, {
        "value": "Niederösterreich",
        "selected": false,
        "count": 16,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Nieder%C3%B6sterreich&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-region",
        "undolink": ""
      }, {
        "value": "Oberösterreich",
        "selected": false,
        "count": 42,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Ober%C3%B6sterreich&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-region",
        "undolink": ""
      }, {
        "value": "Salzburg",
        "selected": false,
        "count": 33,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Salzburg&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-region",
        "undolink": ""
      }, {
        "value": "Steiermark",
        "selected": false,
        "count": 20,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Steiermark&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-region",
        "undolink": ""
      }, {
        "value": "Tirol",
        "selected": false,
        "count": 6,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Tirol&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-region",
        "undolink": ""
      }, {
        "value": "Vorarlberg",
        "selected": false,
        "count": 10,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Vorarlberg&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-region",
        "undolink": ""
      }]
    },
    // SUBCATEGORIES
    {
      "facetname": "category-facet",
      "facettitle": "Unterkategorien",
      "facetlong": true,
      "facetvalues": [{
        "value": "Weißschimmel",
        "selected": false,
        "count": 26,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Wei%C3%9Fschimmel&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Rotkultur",
        "selected": false,
        "count": 14,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Rotkultur&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Grün-/Blauschimmel",
        "selected": false,
        "count": 10,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Gr%C3%BCn-~2FBlauschimmel&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Eckerl",
        "selected": false,
        "count": 8,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Eckerl&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Bergkäse",
        "selected": false,
        "count": 7,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Bergk%C3%A4se&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Hartkäse Sonstige",
        "selected": false,
        "count": 7,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Hartk%C3%A4se+Sonstige&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Doppelschimmel(BlauWeiss)",
        "selected": false,
        "count": 5,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Doppelschimmel(BlauWeiss)&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Emmentaler",
        "selected": false,
        "count": 5,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Emmentaler&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Schmelzkäse Scheiben",
        "selected": false,
        "count": 5,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Schmelzk%C3%A4se+Scheiben&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Parmesan/Grana",
        "selected": false,
        "count": 4,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Parmesan~2FGrana&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Schmelzkäse Sonstige",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Schmelzk%C3%A4se+Sonstige&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }, {
        "value": "Weichkäse Sonstige",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Weichk%C3%A4se+Sonstige&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=category-facet",
        "undolink": ""
      }]
    },
    // REZEPTUR
    {
      "facetname": "ecr-rezeptur",
      "facettitle": "Rezeptur",
      "facetlong": true,
      "facetvalues": [{
        "value": "Ananas",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Ananas&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Chili",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Chili&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Joghurt",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Joghurt&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Kren / Meerrettich",
        "selected": false,
        "count": 4,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Kren+~2F+Meerrettich&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Kräuter",
        "selected": false,
        "count": 18,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Kr%C3%A4uter&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Lachs",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Lachs&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Liptauer",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Liptauer&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Natur",
        "selected": false,
        "count": 12,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Natur&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Nuss",
        "selected": false,
        "count": 2,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Nuss&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Olive",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Olive&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Paprika",
        "selected": false,
        "count": 3,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Paprika&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Peppersweet",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Peppersweet&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Pfeffer",
        "selected": false,
        "count": 3,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Pfeffer&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Pfefferoni",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Pfefferoni&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Schinken",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Schinken&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Schnittlauch",
        "selected": false,
        "count": 6,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Schnittlauch&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }, {
        "value": "Trüffel",
        "selected": false,
        "count": 1,
        "link": "?_=1476976313688&callback=parseResponse&category=F2-3&i=1&q=*&q1=Glutenfrei&q2=Tr%C3%BCffel&rank=prod-rank&sp_cs=UTF-8&sp_q_exact_14=F2-3&x1=product-lifestyleInf&x2=ecr-rezeptur",
        "undolink": ""
      }]
    },
  ],
  "results": [{
    "code": "7546266",
    "title": "SPAR PREMIUM",
    "product-categories": "F2_Kühlregal:F2-3_Käse|F2-3_Käse:F2-3-1_Hartkäse||root_Unsere ...",
    "product-long-description": "SPAR PREMIUM Bergkaese 200g GVE 4",
    "product-short-description-2": "Bregenzerwälder Bergkäse",
    "product-short-description-3": "200 G",
    "product-price": "3,69",
    "product-actualprice": "",
    "product-regularprice": "3,69",
    "product-promo-bestprice": "3,69",
    "product-promo-bestname": "",
    "product-price-per-unit": "18,45 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "false",
    "product-promo-names": "",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/7546266/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "1",
    "product-wishlists": "sabine.krispel@post.at;Favorites|anna.eibl@gmx.net;Favorites|peter.suetoe@interspar.at;Favorites|astrid.rauscher@icloud.com;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "1568448",
    "title": "SPAR PREMIUM",
    "product-categories": "F2_Kühlregal:F2-3_Käse|F2-3_Käse:F2-3-4_Frischkäse||root_Unsere ...",
    "product-long-description": "DESPAR PREMIUM Mozzar.Buf 125g GVE 6",
    "product-short-description-2": "Mozzarella di Bufala Campana D. O. P.",
    "product-short-description-3": "125 G",
    "product-price": "1,99",
    "product-actualprice": "",
    "product-regularprice": "1,99",
    "product-promo-bestprice": "1,69",
    "product-promo-bestname": "ab 2 Pkg. je 1,69 - Mengenvorteil",
    "product-price-per-unit": "15,92 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "true",
    "product-promo-names": "ab 2 Pkg. je 1,69 - Mengenvorteil",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/1568448/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "",
    "product-wishlists": "anne.thysell@spar.at;Favorites|peter.suetoe@interspar.at;Favorites|raphaelstich@webmail.com;Erster Einkauf|nellina@verdianz.com;Favorites|etins.family@gmail.com;Favorites|astrid.rauscher@icloud.com;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "3075654",
    "title": "SPAR PREMIUM",
    "product-categories": "F2_Kühlregal:F2-3_Käse|F2-3_Käse:F2-3-4_Frischkäse||root_Unsere ...",
    "product-long-description": "PREMIUM Mini Mozzar.Buf.120g GVE 6",
    "product-short-description-2": "Mozzarella di Bufala Campana D.O.P. Mini",
    "product-short-description-3": "120 G",
    "product-price": "1,99",
    "product-actualprice": "",
    "product-regularprice": "1,99",
    "product-promo-bestprice": "1,69",
    "product-promo-bestname": "ab 2 Pkg. je 1,69 - Mengenvorteil",
    "product-price-per-unit": "16,59 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "true",
    "product-promo-names": "ab 2 Pkg. je 1,69 - Mengenvorteil",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/3075654/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "",
    "product-wishlists": "lis-a@gmx.at;Favorites|nellina@verdianz.com;Favorites|astrid.rauscher@icloud.com;Favorites|ngharwal@gmx.net;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "2160016",
    "title": "SPAR Natur*pur",
    "product-categories": "F2_Kühlregal:F2-3_Käse|F2-3_Käse:F2-3-1_Hartkäse||root_Unsere ...",
    "product-long-description": "SPAR Bio-Berg- kaese 200g GVE 12",
    "product-short-description-2": "Bio-Bergkäse aus Heumilch",
    "product-short-description-3": "200 G",
    "product-price": "2,99",
    "product-actualprice": "",
    "product-regularprice": "2,99",
    "product-promo-bestprice": "2,99",
    "product-promo-bestname": "",
    "product-price-per-unit": "14,96 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "false",
    "product-promo-names": "",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/2160016/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "1",
    "product-wishlists": "josef.melchior@outlook.com;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "4076933",
    "title": "SPAR Natur*pur",
    "product-categories": "F2_Kühlregal:F2-3_Käse||root_Unsere ...",
    "product-long-description": "SPAR Bio- Camembert 100g GVE 8",
    "product-short-description-2": "Bio-Camembert",
    "product-short-description-3": "100 G",
    "product-price": "1,55",
    "product-actualprice": "",
    "product-regularprice": "1,55",
    "product-promo-bestprice": "1,55",
    "product-promo-bestname": "",
    "product-price-per-unit": "15,50 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "false",
    "product-promo-names": "",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/4076933/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "4",
    "product-wishlists": "lis-a@gmx.at;Favorites|florian.wicher@gmail.com;Favorites|david.santer@gmx.at;Favorites|s.stiedl@gmx.at;Favorites|astrid.rauscher@icloud.com;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "8134868",
    "title": "SPAR Natur*pur",
    "product-categories": "F2_Kühlregal:F2-3_Käse|F2-3_Käse:F2-3-4_Frischkäse||root_Unsere ...",
    "product-long-description": "SPAR Bio-Frischkaese Krae.150g EVE 1",
    "product-short-description-2": "Bio-Frischkäse aus Heumilch Gartenkräuter",
    "product-short-description-3": "150 G",
    "product-price": "1,19",
    "product-actualprice": "",
    "product-regularprice": "1,19",
    "product-promo-bestprice": "1,19",
    "product-promo-bestname": "",
    "product-price-per-unit": "7,94 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "false",
    "product-promo-names": "",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/8134868/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "",
    "product-wishlists": "interspar@stefanov.at;Sonstige Merkliste",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "1265491",
    "title": "SPAR Natur*pur",
    "product-categories": "F2_Kühlregal:F2-3_Käse||root_Unsere Themen:F2_Kühlregal|F2-3_Käse:F2-3-7_Käse...",
    "product-long-description": "SPAR Bio-Gouda Heum. Sch. 150g GVE 10",
    "product-short-description-2": "Bio-Gouda aus Heumilch in Scheiben",
    "product-short-description-3": "150 G",
    "product-price": "2,19",
    "product-actualprice": "",
    "product-regularprice": "2,19",
    "product-promo-bestprice": "1,69",
    "product-promo-bestname": "ab 2 Pkg. je 1,69 - Mengenvorteil",
    "product-price-per-unit": "14,60 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "true",
    "product-promo-names": "ab 2 Pkg. je 1,69 - Mengenvorteil",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/1265491/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "",
    "product-wishlists": "tanja_weidenauer@hotmail.com;Favorites|im71-300@interspar.at;Favorites|fifistargate@gmail.com;Favorites|alexander_schneider@yahoo.com;Favorites|alexander_schneider@yahoo.com;Wocheneinkauf|mcgoebel@gmail.com;Favorites|adisa.kos@gmail.com;My favourites|adisa.kos@gmail.com;Favorites|hannelore.desilva@wu.ac.at;Favorites|mbelalcazar@yahoo.com;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "2020001258468",
    "title": "SPAR Natur*pur",
    "product-categories": "F2_Kühlregal:F2-3_Käse||root_Unsere ...",
    "product-long-description": "SPAR Bio-Gouda a.Heumilch 250g GVE 12",
    "product-short-description-2": "Bio-Gouda aus Heumilch",
    "product-short-description-3": "250 G",
    "product-price": "2,99",
    "product-actualprice": "",
    "product-regularprice": "2,99",
    "product-promo-bestprice": "2,99",
    "product-promo-bestname": "",
    "product-price-per-unit": "11,96 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "false",
    "product-promo-names": "",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/2020001258468/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "",
    "product-wishlists": "alexander_schneider@yahoo.com;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "4174578",
    "title": "SPAR Natur*pur",
    "product-categories": "F2_Kühlregal:F2-3_Käse|F2-3_Käse:F2-3-8_Käse gerieben||root_Unsere ...",
    "product-long-description": "SPAR Bio-Pizza-kaese ger. 150g GVE 10",
    "product-short-description-2": "Bio-Pizzakäse aus Wiesenmilch",
    "product-short-description-3": "150 G",
    "product-price": "1,69",
    "product-actualprice": "",
    "product-regularprice": "1,69",
    "product-promo-bestprice": "1,69",
    "product-promo-bestname": "",
    "product-price-per-unit": "11,27 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "false",
    "product-promo-names": "",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/4174578/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "",
    "product-wishlists": "tanja_weidenauer@hotmail.com;Favorites|david.hartl@gmx.at;Favorites|ngharwal@gmx.net;Favorites|mbelalcazar@yahoo.com;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "8134967",
    "title": "SPAR Natur*pur",
    "product-categories": "F2_Kühlregal:F2-3_Käse|F2-3_Käse:F2-3-4_Frischkäse||root_Unsere ...",
    "product-long-description": "SPAR Bio-Frischkaese Nat.150g EVE 1",
    "product-short-description-2": "Bio-Frischkäse aus Heumilch Natur",
    "product-short-description-3": "150 G",
    "product-price": "1,19",
    "product-actualprice": "",
    "product-regularprice": "1,19",
    "product-promo-bestprice": "1,19",
    "product-promo-bestname": "",
    "product-price-per-unit": "7,94 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "false",
    "product-promo-names": "",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/8134967/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "",
    "product-wishlists": "adisa.kos@gmail.com;Favorites|adisa.kos@gmail.com;My favourites|s.stiedl@gmx.at;Favorites|ljiljana.skiczuk@gmail.com;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "8201102",
    "title": "SPAR Natur*pur",
    "product-categories": "F2_Kühlregal:F2-3_Käse|F2-3_Käse:F2-3-4_Frischkäse||root_Unsere ...",
    "product-long-description": "SPAR Bio-Zie- genfr.Schn.140g GVE 6",
    "product-short-description-2": "Bio-Ziegenfrischkäse Schnittlauch",
    "product-short-description-3": "140 G",
    "product-price": "2,29",
    "product-actualprice": "",
    "product-regularprice": "2,29",
    "product-promo-bestprice": "2,29",
    "product-promo-bestname": "",
    "product-price-per-unit": "16,36 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "false",
    "product-promo-names": "",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/8201102/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "",
    "product-wishlists": "",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }, {
    "code": "8201126",
    "title": "SPAR Natur*pur",
    "product-categories": "F2_Kühlregal:F2-3_Käse|F2-3_Käse:F2-3-4_Frischkäse||root_Unsere ...",
    "product-long-description": "SPAR Bio-Zie- genfr.Nat.140g GVE 6",
    "product-short-description-2": "Bio-Ziegen-Frischkäse Natur",
    "product-short-description-3": "140 G",
    "product-price": "2,29",
    "product-actualprice": "",
    "product-regularprice": "2,29",
    "product-promo-bestprice": "2,29",
    "product-promo-bestname": "",
    "product-price-per-unit": "16,36 €/kg",
    "product-sales-per-unit": "Stück",
    "product-stock-status": "inStock",
    "product-quantity-selector": "",
    "product-creation-date": "",
    "product-is-new": "false",
    "product-is-on-promotion": "false",
    "product-promo-names": "",
    "product-is-own-brand": "",
    "product-is-available-soon": "",
    "product-brand": "",
    "product-size": "",
    "product-origin": "",
    "product-type": "Product",
    "product-image": "http://cdn1.interspar.at/cachableservlets/articleImage.dam/at/8201126/dt_main.jpg",
    "product-badge-icon": "",
    "product-badge-short": "",
    "product-badge-name": "",
    "product-ecr-sortlev": "",
    "product-wishlists": "s.stiedl@gmx.at;Favorites",
    "contentid": "",
    "content-categories": "",
    "content-name": "",
    "content-long-description": "",
    "content-short-description": "",
    "content-website": "",
    "content-creation-date": "",
    "content-is-new": "",
    "approx-weight-article": "",
    "content-origin": ""
  }],
  "searchSuggestions": {
    "original": "F2-3",
    "suggestions": []
  }
}
