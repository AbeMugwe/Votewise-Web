import type { PollingVenue } from "../pollingStations";

export interface CountyVenueIndexEntry {
  centreCount: number;
  constituencies: Readonly<Record<string, readonly string[]>>;
}

export const COUNTY_VENUE_INDEX = {
  "001": {
    "centreCount": 227,
    "constituencies": {
      "Changamwe": [
        "Airport",
        "Chaani",
        "Changamwe",
        "Kipevu",
        "Port Reitz"
      ],
      "Jomvu": [
        "Jomvu Kuu",
        "Mikindani",
        "Miritini"
      ],
      "Kisauni": [
        "Bamburi",
        "Junda",
        "Magogoni",
        "Mjambere",
        "Mtopanga",
        "Mwakirunge",
        "Shanzu"
      ],
      "Likoni": [
        "Bofu",
        "Likoni",
        "Mtongwe",
        "Shika Adabu",
        "Timbwani"
      ],
      "Mvita": [
        "Majengo",
        "Mji Wa",
        "Mji Wa Kale/Makada ra",
        "Shimanzi/Ga njoni",
        "Tononoka",
        "Tudor"
      ],
      "Nyali": [
        "Frere Town",
        "Kadzandani",
        "Kongowea",
        "Mkomani",
        "Ziwa La Ng'ombe"
      ]
    }
  },
  "002": {
    "centreCount": 497,
    "constituencies": {
      "Kinango": [
        "Chengoni/Sa",
        "Chengoni/Sa mburu",
        "Kasemeni",
        "Kinango",
        "Mackinnon",
        "Mackinnon Road",
        "Mwavumbo",
        "Ndavaya",
        "Puma"
      ],
      "Lungalunga": [
        "Dzombo",
        "Mwereni",
        "Pongwe/Kiko neni",
        "Vanga"
      ],
      "Matuga": [
        "Kubo South",
        "Mkongani",
        "Tiwi",
        "Tsimba Golini",
        "Waa"
      ],
      "Msambweni": [
        "Gombato Bongwe",
        "Kinondo",
        "Ramisi",
        "Ukunda"
      ]
    }
  },
  "003": {
    "centreCount": 580,
    "constituencies": {
      "Ganze": [
        "Bamba",
        "Ganze",
        "Jaribuni",
        "Sokoke"
      ],
      "Kaloleni": [
        "Kaloleni",
        "Kayafungo",
        "Mariakani",
        "Mwanamwin ga"
      ],
      "Kilifi North": [
        "Dabaso",
        "Kibarani",
        "Matsangoni",
        "Mnarani",
        "Sokoni",
        "Tezo",
        "Watamu"
      ],
      "Kilifi South": [
        "Chasimba",
        "Junju",
        "Mtepeni",
        "Mwarakaya",
        "Shimo La Tewa"
      ],
      "Magarini": [
        "Adu",
        "Garashi",
        "Gongoni",
        "Magarini",
        "Marafa",
        "Sabaki"
      ],
      "Malindi": [
        "Ganda",
        "Jilore",
        "Kakuyuni",
        "Malindi Town",
        "Shella"
      ],
      "Rabai": [
        "Kambe/Ribe",
        "Mwawesa",
        "Rabai/Kisuru tini",
        "Ruruma"
      ]
    }
  },
  "004": {
    "centreCount": 284,
    "constituencies": {
      "Bura": [
        "Bangale",
        "Chewele",
        "Hirimani",
        "Madogo",
        "Sala"
      ],
      "Galole": [
        "Chewani",
        "Kinakomba",
        "Mikinduni",
        "Wayu"
      ],
      "Garsen": [
        "Garsen Central",
        "Garsen North",
        "Garsen South",
        "Garsen West",
        "Kipini East",
        "Kipini West"
      ]
    }
  },
  "005": {
    "centreCount": 133,
    "constituencies": {
      "Lamu East": [
        "Basuba",
        "Faza",
        "Kiunga"
      ],
      "Lamu West": [
        "Bahari",
        "Hindi",
        "Hongwe",
        "Mkomani",
        "Mkunumbi",
        "Shella",
        "Witu"
      ]
    }
  },
  "006": {
    "centreCount": 284,
    "constituencies": {
      "Mwatate": [
        "Bura",
        "Chawia",
        "Mwatate",
        "Rong'e",
        "Wusi/Kisham ba"
      ],
      "Taveta": [
        "Bomani",
        "Chala",
        "Mahoo",
        "Mata",
        "Mboghoni"
      ],
      "Voi": [
        "Kaloleni",
        "Kasigau",
        "Marungu",
        "Mbololo",
        "Ngolia",
        "Sagalla"
      ],
      "Wundanyi": [
        "Mwanda/Mg ange",
        "Werugha",
        "Wumingu/Ki shushe",
        "Wundanyi/M bale"
      ]
    }
  },
  "007": {
    "centreCount": 435,
    "constituencies": {
      "Balambala": [
        "Balambala",
        "Danyere",
        "Jara Jara",
        "Saka",
        "Sankuri"
      ],
      "Dadaab": [
        "Abakaile",
        "Dadaab",
        "Damajale",
        "Dertu",
        "Labasigale",
        "Liboi"
      ],
      "Fafi": [
        "Bura",
        "Dekaharia",
        "Fafi",
        "Jarajila",
        "Nanighi"
      ],
      "Garissa": [
        "Iftin",
        "Township",
        "Waberi"
      ],
      "Garissa Township": [
        "Galbet",
        "Iftin",
        "Township",
        "Waberi"
      ],
      "Ijara": [
        "Hulugho",
        "Ijara",
        "Masalani",
        "Sangailu"
      ],
      "Lagdera": [
        "Baraki",
        "Benane",
        "Goreale",
        "Maalimin",
        "Modogashe",
        "Sabena"
      ]
    }
  },
  "008": {
    "centreCount": 512,
    "constituencies": {
      "Eldas": [
        "Della",
        "Eldas",
        "Elnur/Tula Tula",
        "Lakoley South/Basir"
      ],
      "Tarbaj": [
        "Elben",
        "Sarman",
        "Tarbaj",
        "Wargadud"
      ],
      "Wajir East": [
        "Barwago",
        "Khorof/Harar",
        "Township",
        "Wagberi"
      ],
      "Wajir North": [
        "Batalu",
        "Bute",
        "Danaba",
        "Godoma",
        "Gurar",
        "Korondile",
        "Malkagufu"
      ],
      "Wajir South": [
        "Benane",
        "Burder",
        "Dadaja Bulla",
        "Diif",
        "Habasswein",
        "Ibrahim Ure",
        "Lagboghol",
        "Lagboghol South"
      ],
      "Wajir West": [
        "Adamasajide",
        "Arbajahan",
        "Ganyure/ Wagalla",
        "Hadado/Athi bohol"
      ]
    }
  },
  "009": {
    "centreCount": 403,
    "constituencies": {
      "Banissa": [
        "Banissa",
        "Derkhale",
        "Guba",
        "Kiliwehiri",
        "Malkamari"
      ],
      "Lafey": [
        "Alango Gof",
        "Fino",
        "Lafey",
        "Sala",
        "Waranqara"
      ],
      "Mandera East": [
        "Arabia",
        "Khalalio",
        "Libehia",
        "Neboi",
        "Township"
      ],
      "Mandera North": [
        "Ashabito",
        "Guticha",
        "Morothile",
        "Rhamu",
        "Rhamu-",
        "Rhamu- Dimtu"
      ],
      "Mandera South": [
        "Elwak North",
        "Elwak South",
        "Kutulo",
        "Shimbir Fatuma",
        "Wargadud"
      ],
      "Mandera West": [
        "Dandu",
        "Gither",
        "Lagsure",
        "Takaba",
        "Takaba South"
      ]
    }
  },
  "010": {
    "centreCount": 344,
    "constituencies": {
      "Laisamis": [
        "Kargi/South Horr",
        "Korr/Nguru nit",
        "Laisamis",
        "Logo Logo",
        "Loiyangalan i"
      ],
      "Moyale": [
        "Butiye",
        "Golbo",
        "Heillu/Many atta",
        "Moyale Township",
        "Obbu",
        "Sololo",
        "Uran"
      ],
      "North Horr": [
        "Dukana",
        "Illeret",
        "Maikona",
        "North Horr",
        "Turbi"
      ],
      "Saku": [
        "Karare",
        "Marsabit Central",
        "Sagante/Jald esa"
      ]
    }
  },
  "011": {
    "centreCount": 157,
    "constituencies": {
      "Isiolo North": [
        "Bulla Pesa",
        "Burat",
        "Chari",
        "Cherab",
        "Ngare Mara",
        "Oldo/Nyiro",
        "Wabera"
      ],
      "Isiolo South": [
        "Garbatulla",
        "Kinna",
        "Sericho"
      ]
    }
  },
  "012": {
    "centreCount": 1014,
    "constituencies": {
      "Buuri": [
        "Kibirichia",
        "Kiirua/Naari",
        "Kisima",
        "Ruiri/Rware ra",
        "Ruiri/Rwarera",
        "Timau"
      ],
      "Central Imenti": [
        "Abothuguchi Central",
        "Abothuguchi West",
        "Kiagu",
        "Mwanganthia"
      ],
      "Igembe Central": [
        "Akirang'ondu",
        "Athiru Ruujine",
        "Igembe East",
        "Kangeta",
        "Njia"
      ],
      "Igembe North": [
        "Amwathi",
        "Antuambui",
        "Antubetwe Kiongo",
        "Naathu",
        "Ntunene"
      ],
      "Igembe South": [
        "Akachiu",
        "Athiru Gaiti",
        "Kanuni",
        "Kiegoi/Antu bochiu",
        "Maua"
      ],
      "North Imenti": [
        "Municipality",
        "Ntima East",
        "Ntima West",
        "Nyaki East",
        "Nyaki West"
      ],
      "South Imenti": [
        "Abogeta East",
        "Abogeta West",
        "Igoji East",
        "Igoji West",
        "Mitunguu",
        "Nkuene"
      ],
      "Tigania East": [
        "Karama",
        "Kiguchwa",
        "Mikinduri",
        "Muthara",
        "Thangatha"
      ],
      "Tigania West": [
        "Akithii",
        "Athwana",
        "Kianjai",
        "Mbeu",
        "Nkomo"
      ]
    }
  },
  "013": {
    "centreCount": 267,
    "constituencies": {
      "Chuka/Igamban g'ombe": [
        "Karingani",
        "Magumoni",
        "Mariani",
        "Mugwe"
      ],
      "Chuka/Igambang": [
        "Igambang'ombe"
      ],
      "Maara": [
        "Chogoria",
        "Ganga",
        "Mitheru",
        "Muthambi",
        "Mwimbi"
      ],
      "Tharaka": [
        "Chiakariga",
        "Gatunga",
        "Marimanti",
        "Mukothima",
        "Nkondi"
      ]
    }
  },
  "014": {
    "centreCount": 493,
    "constituencies": {
      "Manyatta": [
        "Gaturi South",
        "Kirimari",
        "Kithimu",
        "Mbeti North",
        "Nginda",
        "Ruguru/",
        "Ruguru/ Ngandori"
      ],
      "Mbeere North": [
        "Evurore",
        "Muminji",
        "Nthawa"
      ],
      "Mbeere South": [
        "Kiambere",
        "Makima",
        "Mavuria",
        "Mbeti South",
        "Mwea"
      ],
      "Runyenjes": [
        "Central Ward",
        "Gaturi North",
        "Kagaari North",
        "Kagaari South",
        "Kyeni North",
        "Kyeni South"
      ]
    }
  },
  "015": {
    "centreCount": 1413,
    "constituencies": {
      "Kitui Central": [
        "Kyangwithya",
        "Kyangwithya East",
        "Kyangwithya West",
        "Miambani",
        "Mulango",
        "Township"
      ],
      "Kitui East": [
        "Chuluni",
        "Endau/ Malalani",
        "Mutito/Kaliku",
        "Nzambani",
        "Voo/Kyamatu",
        "Zombe/ Mwitika"
      ],
      "Kitui Rural": [
        "Kanyangi",
        "Kisasi",
        "Kwavonza/ Yatta",
        "Mbitini"
      ],
      "Kitui South": [
        "Athi",
        "Ikanga/Kyatune",
        "Ikutha",
        "Kanziko",
        "Mutha",
        "Mutomo"
      ],
      "Kitui West": [
        "Kauwi",
        "Kwa Mutonga/",
        "Kwa Mutonga/ Kithumula",
        "Kwa Mutonga/Kit humula",
        "Matinyani",
        "Mutonguni"
      ],
      "Mwingi Central": [
        "Central",
        "Kivou",
        "Mui",
        "Nguni",
        "Nuu",
        "Waita"
      ],
      "Mwingi North": [
        "Kyuso",
        "Mumoni",
        "Ngomeni",
        "Tharaka",
        "Tseikuru"
      ],
      "Mwingi West": [
        "Kiomo/ Kyethani",
        "Kyome/ Thaana",
        "Kyome/Thaa na",
        "Migwani",
        "Nguutani"
      ]
    }
  },
  "016": {
    "centreCount": 954,
    "constituencies": {
      "Kangundo": [
        "Kangundo",
        "Kangundo Central",
        "Kangundo East",
        "Kangundo North",
        "Kangundo West"
      ],
      "Kathiani": [
        "Kathiani Central",
        "Lower",
        "Lower Kaewa/Kaani",
        "Mitaboni",
        "Upper",
        "Upper Kaewa/Iveti"
      ],
      "Machakos Town": [
        "Kalama",
        "Kola",
        "Machakos",
        "Machakos Central",
        "Mua",
        "Mumbuni",
        "Mumbuni North",
        "Mutituni",
        "Muvuti/Kiima -Kimwe"
      ],
      "Masinga": [
        "Ekalakala",
        "Kivaa",
        "Masinga",
        "Masinga Central",
        "Muthesya",
        "Ndithini"
      ],
      "Matungulu": [
        "Kyeleni",
        "Matungulu",
        "Matungulu East",
        "Matungulu North",
        "Matungulu West",
        "Tala"
      ],
      "Mavoko": [
        "Athi River",
        "Kinanie",
        "Muthwani",
        "Syokimau/ Mulolongo"
      ],
      "Mwala": [
        "Kibauni",
        "Makutano/ Mwala",
        "Masii",
        "Mbiuni",
        "Muthetheni",
        "Wamunyu"
      ],
      "Yatta": [
        "Ikombe",
        "Katangi",
        "Kithimani",
        "Matuu",
        "Ndalani"
      ]
    }
  },
  "017": {
    "centreCount": 876,
    "constituencies": {
      "Kaiti": [
        "Ilima",
        "Kee",
        "Kilungu",
        "Ukia"
      ],
      "Kibwezi East": [
        "Ivingoni/Nza mbani",
        "Masongaleni",
        "Mtito Andei",
        "Thange"
      ],
      "Kibwezi West": [
        "Emali/Mulala",
        "Kikumbulyu",
        "Kikumbulyu North",
        "Kikumbulyu South",
        "Makindu",
        "Nguu/Masum ba",
        "Nguumo"
      ],
      "Kilome": [
        "Kasikeu",
        "Kiima Kiu/Kalanzo",
        "Kiima Kiu/Kalanzo ni",
        "Mukaa"
      ],
      "Makueni": [
        "Kathonzweni",
        "Kitise/Kithuki",
        "Mavindini",
        "Mbitini",
        "Muvau/Kiku",
        "Muvau/Kiku umini",
        "Nzaui/Kilili/ Kalamba",
        "Wote"
      ],
      "Mbooni": [
        "Kalawa",
        "Kiteta/Kisau",
        "Kithungo/Kit undu",
        "Mbooni",
        "Tulimani",
        "Waia-Kako"
      ]
    }
  },
  "018": {
    "centreCount": 402,
    "constituencies": {
      "Kinangop": [
        "Engineer",
        "Gathara",
        "Githabai",
        "Magumu",
        "Murungaru",
        "Njabini\\Kiburu",
        "North Kinangop",
        "Nyakio"
      ],
      "Kipipiri": [
        "Geta",
        "Githioro",
        "Kipipiri",
        "Wanjohi"
      ],
      "Ndaragwa": [
        "Central",
        "Kiriita",
        "Leshau/Pondo",
        "Shamata"
      ],
      "Ol Jorok": [
        "Charagita",
        "Gathanji",
        "Gatimu",
        "Weru"
      ],
      "Ol Kalou": [
        "Kaimbaga",
        "Kanjuiri Range",
        "Karau",
        "Mirangine",
        "Rurii"
      ]
    }
  },
  "019": {
    "centreCount": 545,
    "constituencies": {
      "Kieni": [
        "Gakawa",
        "Gatarakwa",
        "Kabaru",
        "Mugunda",
        "Mweiga",
        "Mwiyogo/En darasha",
        "Naromoru",
        "Naromoru Kiamathaga",
        "Thegu River"
      ],
      "Mathira": [
        "Iriaini",
        "Karatina Town",
        "Kirimukuyu",
        "Konyu",
        "Magutu",
        "Ruguru"
      ],
      "Mukurweini": [
        "Gikondi",
        "Mukurwe-Ini Central",
        "Mukurwe-Ini West",
        "Rugi"
      ],
      "Nyeri Town": [
        "Gatitu/Murug uru",
        "Kamakwa/ Mukaro",
        "Kiganjo/Mat hari",
        "Ruring'u",
        "Rware"
      ],
      "Othaya": [
        "Chinga",
        "Iria-Ini",
        "Karima",
        "Mahiga"
      ],
      "Tetu": [
        "Aguthi-Gaaki",
        "Dedan Kimanthi",
        "Wamagana"
      ]
    }
  },
  "020": {
    "centreCount": 282,
    "constituencies": {
      "Gichugu": [
        "Baragwi",
        "Kabare",
        "Karumandi",
        "Ngariama",
        "Njukiini"
      ],
      "Kirinyaga": [
        "Kanyekini"
      ],
      "Kirinyaga Central": [
        "Inoi",
        "Kanyekini",
        "Kerugoya",
        "Mutira"
      ],
      "Mwea": [
        "Gathigiriri",
        "Kangai",
        "Murinduko",
        "Mutithi",
        "Nyangati",
        "Tebere",
        "Thiba",
        "Wamumu"
      ],
      "Ndia": [
        "Kariti",
        "Kiine",
        "Mukure"
      ]
    }
  },
  "021": {
    "centreCount": 584,
    "constituencies": {
      "Gatanga": [
        "Gatanga",
        "Ithanga",
        "Kakuzi/Mitu biri",
        "Kariara",
        "Kihumbu-Ini",
        "Mugumo-Ini"
      ],
      "Kandara": [
        "Gaichanjiru",
        "Ithiru",
        "Kagundu-Ini",
        "Muruka",
        "Ng'araria",
        "Ruchu"
      ],
      "Kangema": [
        "Kanyenya-Ini",
        "Muguru",
        "Rwathia"
      ],
      "Kigumo": [
        "Kahumbu",
        "Kangari",
        "Kigumo",
        "Kinyona",
        "Muthithi"
      ],
      "Kiharu": [
        "Gaturi",
        "Mbiri",
        "Mugoiri",
        "Murarandia",
        "Township",
        "Wangu"
      ],
      "Maragwa": [
        "Ichagaki",
        "Kamahuha",
        "Kambiti",
        "Kimorori/",
        "Kimorori/ Wempa",
        "Makuyu",
        "Nginda"
      ],
      "Mathioya": [
        "Gitugi",
        "Kamacharia",
        "Kiru"
      ]
    }
  },
  "022": {
    "centreCount": 565,
    "constituencies": {
      "Gatundu North": [
        "Chania",
        "Githobokoni",
        "Gituamba",
        "Mang'u"
      ],
      "Gatundu South": [
        "Kiamwangi",
        "Kiganjo",
        "Ndarugu",
        "Ngenda"
      ],
      "Githunguri": [
        "Githiga",
        "Githunguri",
        "Ikinu",
        "Komothai",
        "Ngewa"
      ],
      "Juja": [
        "Juja",
        "Kalimoni",
        "Murera",
        "Theta",
        "Witeithie"
      ],
      "Kabete": [
        "Gitaru",
        "Kabete",
        "Muguga",
        "Nyadhuna",
        "Uthiru"
      ],
      "Kiambaa": [
        "Cianda",
        "Karuri",
        "Kihara",
        "Muchatha",
        "Ndenderu"
      ],
      "Kiambu": [
        "Ndumberi",
        "Riabai",
        "Ting'ang'a",
        "Township"
      ],
      "Kikuyu": [
        "Karai",
        "Kikuyu",
        "Kinoo",
        "Nachu",
        "Sigona"
      ],
      "Lari": [
        "Kamburu",
        "Kijabe",
        "Kinale",
        "Lari/Kirenga",
        "Nyanduma"
      ],
      "Limuru": [
        "Bibirioni",
        "Limuru Central",
        "Limuru East",
        "Ndeiya",
        "Ngecha Tigoni"
      ],
      "Ruiru": [
        "Biashara",
        "Gatongora",
        "Gitothua",
        "Kahawa",
        "Kahawa Sukari",
        "Kahawa Wendani",
        "Kiuu",
        "Mwihoko",
        "Mwiki"
      ],
      "Thika Town": [
        "Gatuanyaga",
        "Hospital",
        "Kamenu",
        "Ngoliba",
        "Township"
      ]
    }
  },
  "023": {
    "centreCount": 673,
    "constituencies": {
      "Loima": [
        "Kotaruk/ Lobei",
        "Loima",
        "Lokiriama/Lo rengippi",
        "Turkwel"
      ],
      "Turkana Central": [
        "Kalokol",
        "Kanamkemer",
        "Kang'atotha",
        "Kerio Delta",
        "Lodwar Township"
      ],
      "Turkana East": [
        "Kapedo/Nape itom",
        "Katilia",
        "Lokori/Koch odin"
      ],
      "Turkana North": [
        "Kaaleng/ Kaikor",
        "Kaeris",
        "Kibish",
        "Lake Zone",
        "Lapur",
        "Nakalale"
      ],
      "Turkana South": [
        "Kalapata",
        "Kaputir",
        "Katilu",
        "Lobokat",
        "Lokichar"
      ],
      "Turkana West": [
        "Kakuma",
        "Kalobeyei",
        "Letea",
        "Lokichoggio",
        "Lopur",
        "Nanaam",
        "Songot"
      ]
    }
  },
  "024": {
    "centreCount": 790,
    "constituencies": {
      "Kacheliba": [
        "Alale",
        "Kapchok",
        "Kasei",
        "Kiwawa",
        "Kodich",
        "Suam"
      ],
      "Kapenguria": [
        "Endugh",
        "Kapenguria",
        "Mnagei",
        "Riwo",
        "Siyoi",
        "Sook"
      ],
      "Pokot South": [
        "Batei",
        "Chepareria",
        "Lelan",
        "Tapach"
      ],
      "Sigor": [
        "Lomut",
        "Masool",
        "Sekerr",
        "Weiwei"
      ]
    }
  },
  "025": {
    "centreCount": 309,
    "constituencies": {
      "Samburu East": [
        "Wamba East",
        "Wamba North",
        "Wamba West",
        "Waso"
      ],
      "Samburu North": [
        "Angata Nanyokie",
        "Baawa",
        "El-Barta",
        "Nachola",
        "Ndoto",
        "Nyiro"
      ],
      "Samburu West": [
        "Lodokejek",
        "Loosuk",
        "Maralal",
        "Poro",
        "Suguta",
        "Suguta Marmar"
      ]
    }
  },
  "026": {
    "centreCount": 367,
    "constituencies": {
      "Cherangany": [
        "Chepsiro/ Kiptoror",
        "Cherangany/ Suwerwa",
        "Kaplamai",
        "Makutano",
        "Motosiet",
        "Sinyerere",
        "Sitatunga"
      ],
      "Endebess": [
        "Chepchoina",
        "Endebess",
        "Matumbei"
      ],
      "Kiminini": [
        "Hospital",
        "Kiminini",
        "Nabiswa",
        "Sikhendu",
        "Sirende",
        "Waitaluk"
      ],
      "Kwanza": [
        "Bidii",
        "Kapomboi",
        "Keiyo",
        "Kwanza"
      ],
      "Saboti": [
        "Kinyoro",
        "Machewa",
        "Matisi",
        "Saboti",
        "Tuwani"
      ]
    }
  },
  "027": {
    "centreCount": 481,
    "constituencies": {
      "Ainabkoi": [
        "Ainabkoi/Olare",
        "Kapsoya",
        "Kaptagat"
      ],
      "Kapseret": [
        "Kipkenyo",
        "Langas",
        "Megun",
        "Ngeria",
        "Simat/ Kapseret",
        "Simat/Kapser et"
      ],
      "Kesses": [
        "Cheptiret/ Kipchamo",
        "Racecourse",
        "Tarakwa",
        "Tulwet/Chuiyat"
      ],
      "Moiben": [
        "Karuna/ Meibeki",
        "Kimumu",
        "Moiben",
        "Sergoit",
        "Tembelio"
      ],
      "Soy": [
        "Kapkures",
        "Kipsomba",
        "Kuinet/Kapsu swa",
        "Moi's Bridge",
        "Segero/ Barsombe",
        "Segero/Barso mbe",
        "Soy",
        "Ziwa"
      ],
      "Turbo": [
        "Huruma",
        "Kamagut",
        "Kapsaos",
        "Kiplombe",
        "Ngenyilel",
        "Tapsagoi"
      ]
    }
  },
  "028": {
    "centreCount": 490,
    "constituencies": {
      "Keiyo North": [
        "Emsoo",
        "Kamariny",
        "Kapchemutwa",
        "Tambach"
      ],
      "Keiyo South": [
        "Chepkorio",
        "Kabiemit",
        "Kaptarakwa",
        "Metkei",
        "Soy North",
        "Soy South"
      ],
      "Marakwet East": [
        "Embobut / Embulot",
        "Endo",
        "Kapyego",
        "Sambirir"
      ],
      "Marakwet West": [
        "Arror",
        "Cherang'any/ Chebororwa",
        "Kapsowar",
        "Lelan",
        "Moiben/Kuse rwo",
        "Sengwer"
      ]
    }
  },
  "029": {
    "centreCount": 679,
    "constituencies": {
      "Aldai": [
        "Kabwareng",
        "Kaptumo- Kaboi",
        "Kemeloi- Maraba",
        "Kobujoi",
        "Koyo-Ndurio",
        "Terik"
      ],
      "Chesumei": [
        "Chemundu/K apng'etuny",
        "Kaptel/Kamo iywo",
        "Kiptuya",
        "Kosirai",
        "Lelmokwo/N gechek"
      ],
      "Emgwen": [
        "Chepkumia",
        "Kapkangani",
        "Kapsabet",
        "Kilibwoni"
      ],
      "Mosop": [
        "Chepterwai",
        "Kabisaga",
        "Kabiyet",
        "Kipkaren",
        "Kurgung/Sur ungai",
        "Ndalat",
        "Sangalo/Keb",
        "Sangalo/Keb ulonik"
      ],
      "Nandi Hills": [
        "Chepkunyuk",
        "Kapchorua",
        "Nandi Hills",
        "Ol'lessos"
      ],
      "Tinderet": [
        "Chemelil/Che mase",
        "Kapsimotwo",
        "Songhor/Soba",
        "Tindiret"
      ]
    }
  },
  "030": {
    "centreCount": 971,
    "constituencies": {
      "Baringo Central": [
        "Ewalel/Chap chap",
        "Kabarnet",
        "Kapropita",
        "Sacho",
        "Tenges"
      ],
      "Baringo North": [
        "Bartabwa",
        "Barwessa",
        "Kabartonjo",
        "Saimo/Kipsar aman",
        "Saimo/Soi"
      ],
      "Baringo South": [
        "Ilchamus",
        "Marigat",
        "Mochongoi",
        "Mukutani"
      ],
      "Eldama Ravine": [
        "Koibatek",
        "Lembus",
        "Lembus Kwen",
        "Lembus/Perk erra",
        "Mumberes/M aji Mazuri",
        "Ravine"
      ],
      "Mogotio": [
        "Emining",
        "Kisanana",
        "Mogotio"
      ],
      "Tiaty": [
        "Churo/Amaya",
        "Kolowa",
        "Loiyamorock",
        "Ribkwo",
        "Silale",
        "Tangulbei/Ko rossi",
        "Tirioko"
      ]
    }
  },
  "031": {
    "centreCount": 344,
    "constituencies": {
      "Laikipia East": [
        "Nanyuki",
        "Ngobit",
        "Thingithu",
        "Tigithi",
        "Umande"
      ],
      "Laikipia North": [
        "Mugogodo",
        "Mugogodo East",
        "Mugogodo West",
        "Segera",
        "Sosian"
      ],
      "Laikipia West": [
        "Githiga",
        "Igwamiti",
        "Marmanet",
        "Ol-Moran",
        "Rumuruti Township",
        "Salama"
      ]
    }
  },
  "032": {
    "centreCount": 1022,
    "constituencies": {
      "Bahati": [
        "Bahati",
        "Dundori",
        "Kabatini",
        "Kiamaina",
        "Lanet/Umoja"
      ],
      "Gilgil": [
        "Elementaita",
        "Gilgil",
        "Malewa West",
        "Mbaruk/Ebur u",
        "Murindati"
      ],
      "Kuresoi North": [
        "Kamara",
        "Kiptororo",
        "Nyota",
        "Sirikwa"
      ],
      "Kuresoi South": [
        "Amalo",
        "Keringet",
        "Kiptagich",
        "Tinet"
      ],
      "Molo": [
        "Elburgon",
        "Mariashoni",
        "Molo",
        "Turi"
      ],
      "Naivasha": [
        "Biashara",
        "Hells Gate",
        "Lake View",
        "Mai Mahiu",
        "Maiella",
        "Naivasha East",
        "Olkaria",
        "Viwandani"
      ],
      "Nakuru Town East": [
        "Biashara",
        "Flamingo",
        "Kivumbini",
        "Menengai",
        "Nakuru East"
      ],
      "Nakuru Town West": [
        "Barut",
        "Kapkures",
        "Kaptembwo",
        "London",
        "Rhoda",
        "Shaabab"
      ],
      "Njoro": [
        "Kihingo",
        "Lare",
        "Mau Narok",
        "Mauche",
        "Nessuit",
        "Njoro"
      ],
      "Rongai": [
        "Menengai West",
        "Mosop",
        "Soin",
        "Solai",
        "Visoi"
      ],
      "Subukia": [
        "Kabazi",
        "Subukia",
        "Waseges"
      ]
    }
  },
  "033": {
    "centreCount": 595,
    "constituencies": {
      "Emurua Dikirr": [
        "Ilkerin",
        "Kapsasian",
        "Mogondo",
        "Ololmasani"
      ],
      "Kilgoris": [
        "Angata Barikoi",
        "Keyian",
        "Kilgoris Central",
        "Kimintet",
        "Lolgorian",
        "Shankoe"
      ],
      "Narok East": [
        "Ildamat",
        "Keekonyokie",
        "Mosiro",
        "Suswa"
      ],
      "Narok North": [
        "Melili",
        "Narok Town",
        "Nkareta",
        "Olokurto",
        "Olorropil",
        "Olpusimoru"
      ],
      "Narok South": [
        "Loita",
        "Majimoto/ Naroosura",
        "Melelo",
        "Ololulung'a",
        "Sagamian",
        "Sogoo"
      ],
      "Narok West": [
        "Ilmotiok",
        "Mara",
        "Naikarra",
        "Siana"
      ]
    }
  },
  "034": {
    "centreCount": 442,
    "constituencies": {
      "Kajiado Central": [
        "Dalalekutuk",
        "Ildamat",
        "Matapato",
        "Matapato North",
        "Matapato South",
        "Purko"
      ],
      "Kajiado East": [
        "Imaroro",
        "Kaputiei North",
        "Kenyawa- Poka",
        "Kitengela",
        "Oloosirkon/S holinke"
      ],
      "Kajiado North": [
        "Ngong",
        "Nkaimurunya",
        "Olkeri",
        "Oloolua",
        "Ongata Rongai"
      ],
      "Kajiado South": [
        "Entonet/Lenk isim",
        "Kimana",
        "Kuku",
        "Mbirikani/ Eselenkei",
        "Rombo"
      ],
      "Kajiado West": [
        "Ewuaso",
        "Ewuaso Oonkidong’i",
        "Iloodokilani",
        "Keekonyokie",
        "Magadi",
        "Mosiro"
      ]
    }
  },
  "035": {
    "centreCount": 542,
    "constituencies": {
      "Ainamoi": [
        "Ainamoi",
        "Kapkugerwet",
        "Kapsaos",
        "Kapsoit",
        "Kipchebor",
        "Kipchimchim"
      ],
      "Belgut": [
        "Chaik",
        "Cheptororiet/",
        "Cheptororiet/ Seretut",
        "Kabianga",
        "Kapsuser",
        "Waldai"
      ],
      "Bureti": [
        "Cheboin",
        "Chemosot",
        "Cheplanget",
        "Kapkatet",
        "Kisiara",
        "Litein",
        "Tebesonik"
      ],
      "Kipkelion East": [
        "Chepseon",
        "Kedowa/Kim ugul",
        "Londiani",
        "Tendeno/ Sorget"
      ],
      "Kipkelion West": [
        "Chilchila",
        "Kamasian",
        "Kipkelion",
        "Kunyak"
      ],
      "Sigowet/Soin": [
        "Kaplelartet",
        "Sigowet",
        "Soin",
        "Soliat"
      ]
    }
  },
  "036": {
    "centreCount": 625,
    "constituencies": {
      "Bomet Central": [
        "Chesoen",
        "Mutarakwa",
        "Ndaraweta",
        "Silibwet Township",
        "Singorwet"
      ],
      "Bomet East": [
        "Chemaner",
        "Kembu",
        "Kipreres",
        "Longisa",
        "Merigi"
      ],
      "Chepalungu": [
        "Chebunyo",
        "Kong'asis",
        "Nyangores",
        "Sigor",
        "Siongiroi"
      ],
      "Konoin": [
        "Boito",
        "Chepchabas",
        "Embomos",
        "Kimulot",
        "Mogogosiek"
      ],
      "Sotik": [
        "Chemagel",
        "Kapletundo",
        "Kipsonoi",
        "Ndanai/Abosi",
        "Rongena/Ma naret"
      ]
    }
  },
  "037": {
    "centreCount": 965,
    "constituencies": {
      "Butere": [
        "Marama Central",
        "Marama North",
        "Marama South",
        "Marama West",
        "Marenyo - Shianda"
      ],
      "Ikolomani": [
        "Idakho",
        "Idakho Central",
        "Idakho East",
        "Idakho North",
        "Idakho South"
      ],
      "Khwisero": [
        "Kisa Central",
        "Kisa East",
        "Kisa North",
        "Kisa West"
      ],
      "Likuyani": [
        "Kongoni",
        "Likuyani",
        "Nzoia",
        "Sango",
        "Sinoko"
      ],
      "Lugari": [
        "Chekalini",
        "Chevaywa",
        "Lugari",
        "Lumakanda",
        "Lwandeti",
        "Mautuma"
      ],
      "Lurambi": [
        "Butsotso Central",
        "Butsotso East",
        "Butsotso South",
        "Mahiakalo",
        "Sheywe",
        "Shirere"
      ],
      "Malava": [
        "Butali/",
        "Butali/ Chegulo",
        "Chemuche",
        "East Kabras",
        "Manda- Shivanga",
        "Shirugu-",
        "Shirugu- Mugai",
        "South Kabras",
        "West Kabras"
      ],
      "Matungu": [
        "Khalaba",
        "Kholera",
        "Koyonzo",
        "Mayoni",
        "Namamali"
      ],
      "Mumias East": [
        "East Wanga",
        "Lusheya/Lubi nu",
        "Malaha/Isong o/Makunga"
      ],
      "Mumias West": [
        "Etenje",
        "Mumias",
        "Mumias Central",
        "Mumias North",
        "Musanda"
      ],
      "Navakholo": [
        "Bunyala",
        "Bunyala Central",
        "Bunyala East",
        "Bunyala West",
        "Ingostse- Mathia",
        "Shinoyi- Shikomari-",
        "Shinoyi- Shikomari- Esumeyia"
      ],
      "Shinyalu": [
        "Isukha Central",
        "Isukha East",
        "Isukha North",
        "Isukha South",
        "Isukha West",
        "Murhanda"
      ]
    }
  },
  "038": {
    "centreCount": 363,
    "constituencies": {
      "Emuhaya": [
        "Central Bunyore",
        "North East Bunyore",
        "West Bunyore"
      ],
      "Hamisi": [
        "Banja",
        "Gisambai",
        "Jepkoyai",
        "Muhudu",
        "Shamakhokh o",
        "Shiru",
        "Tambua"
      ],
      "Luanda": [
        "Emabungo",
        "Luanda South",
        "Luanda Township",
        "Mwibona",
        "Wemilabi"
      ],
      "Sabatia": [
        "Busali",
        "Chavakali",
        "Lyaduywa/Iz ava",
        "North Maragoli",
        "West Sabatia",
        "Wodanga"
      ],
      "Vihiga": [
        "Central Maragoli",
        "Lugaga-",
        "Lugaga- Wamuluma",
        "Mungoma",
        "South",
        "South Maragoli"
      ]
    }
  },
  "039": {
    "centreCount": 892,
    "constituencies": {
      "Bumula": [
        "Bumula",
        "Kabula",
        "Khasoko",
        "Kimaeti",
        "Siboti",
        "South Bukusu",
        "West Bukusu"
      ],
      "Kabuchai": [
        "Bwake/Luuya",
        "Kabuchai/ Chwele",
        "Kabuchai/Ch",
        "Kabuchai/Ch wele",
        "Mukuyuni",
        "West Nalondo"
      ],
      "Kanduyi": [
        "Bukembe",
        "Bukembe East",
        "Bukembe West",
        "East Sang’alo",
        "Khalaba",
        "Marakaru/Tu uti",
        "Musikoma",
        "Township",
        "West Sang’alo"
      ],
      "Kimilili": [
        "Kamukuywa",
        "Kibingei",
        "Kimilili",
        "Maeni"
      ],
      "Mt. Elgon": [
        "Cheptais",
        "Chepyuk",
        "Chesikaki",
        "Elgon",
        "Kapkateny",
        "Kaptama"
      ],
      "Sirisia": [
        "Lwandanyi",
        "Malakisi/Sout h Kulisiru",
        "Malakisi/South",
        "Malakisi/South Kulisiru",
        "Namwela"
      ],
      "Tongaren": [
        "Mbakalo",
        "Milima",
        "Naitiri/Kabuy efwe",
        "Ndalu/ Tabani",
        "Soysambu/ Mitua",
        "Tongaren"
      ],
      "Webuye East": [
        "Maraka",
        "Mihuu",
        "Ndivisi"
      ],
      "Webuye West": [
        "Bokoli",
        "Matulo",
        "Misikhu",
        "Sitikho"
      ]
    }
  },
  "040": {
    "centreCount": 534,
    "constituencies": {
      "Budalangi": [
        "Bunyala",
        "Bunyala Central",
        "Bunyala North",
        "Bunyala South",
        "Bunyala West"
      ],
      "Butula": [
        "Elugulu",
        "Kingandole",
        "Marachi",
        "Marachi Central",
        "Marachi East",
        "Marachi North",
        "Marachi West"
      ],
      "Funyula": [
        "Ageng'a Nanguba",
        "Bwiri",
        "Namboboto",
        "Namboboto Nambuku",
        "Nangina"
      ],
      "Matayos": [
        "Bukhayo West",
        "Burumba",
        "Busibwabo",
        "Matayos",
        "Matayos South",
        "Mayenje"
      ],
      "Nambale": [
        "Bukhayo Central",
        "Bukhayo East",
        "Bukhayo North/Waltsi",
        "Nambale Township"
      ],
      "Teso North": [
        "Ang'urai",
        "Ang'urai East",
        "Ang'urai North",
        "Ang'urai South",
        "Malaba Central",
        "Malaba North",
        "Malaba South"
      ],
      "Teso South": [
        "Amukura Central",
        "Amukura East",
        "Amukura West",
        "Ang'orom",
        "Chakol North",
        "Chakol South"
      ]
    }
  },
  "041": {
    "centreCount": 580,
    "constituencies": {
      "Alego Usonga": [
        "Central Alego",
        "North Alego",
        "Siaya",
        "Siaya Township",
        "South East",
        "South East Alego",
        "Usonga",
        "West Alego"
      ],
      "Bondo": [
        "Central",
        "Central Sakwa",
        "North Sakwa",
        "South Sakwa",
        "West Sakwa",
        "West Yimbo",
        "Yimbo East"
      ],
      "Gem": [
        "Central Gem",
        "East Gem",
        "North Gem",
        "South Gem",
        "West Gem",
        "Yala Township"
      ],
      "Rarieda": [
        "East Asembo",
        "North Uyoma",
        "South Uyoma",
        "West Asembo",
        "West Uyoma"
      ],
      "Ugenya": [
        "East Ugenya",
        "North Ugenya",
        "Ukwala",
        "West Ugenya"
      ],
      "Ugunja": [
        "Sidindi",
        "Sigomere",
        "Ugunja"
      ]
    }
  },
  "042": {
    "centreCount": 582,
    "constituencies": {
      "Kisumu Central": [
        "Kondele",
        "Market Milimani",
        "Migosi",
        "Nyalenda B",
        "Railways",
        "Shaurimoyo Kaloleni"
      ],
      "Kisumu East": [
        "Kajulu",
        "Kolwa",
        "Kolwa Central",
        "Kolwa East",
        "Manyatta 'B'",
        "Nyalenda 'A'"
      ],
      "Kisumu West": [
        "Central",
        "Central Kisumu",
        "Kisumu North",
        "North West Kisumu",
        "South West",
        "South West Kisumu",
        "West Kisumu"
      ],
      "Muhoroni": [
        "Chemelil",
        "Masogo/Nyan g'oma",
        "Miwani",
        "Muhoroni/Ko ru",
        "Ombeyi"
      ],
      "Nyakach": [
        "Central Nyakach",
        "North Nyakach",
        "South East Nyakach",
        "South West Nyakach",
        "West Nyakach"
      ],
      "Nyando": [
        "Ahero",
        "Awasi/Onjiko",
        "East Kano/Wawid hi",
        "Kabonyo/Kan yagwal",
        "Kobura"
      ],
      "Seme": [
        "Central Seme",
        "East Seme",
        "North Seme",
        "West Seme"
      ]
    }
  },
  "043": {
    "centreCount": 908,
    "constituencies": {
      "Homa Bay Town": [
        "Homa Bay",
        "Homa Bay Arujo",
        "Homa Bay Central",
        "Homa Bay East",
        "Homa Bay West"
      ],
      "Kabondo Kasipul": [
        "Kabondo",
        "Kabondo East",
        "Kabondo West",
        "Kojwach",
        "Kokwanyo/K akelo"
      ],
      "Karachuonyo": [
        "Central",
        "Kanyaluo",
        "Kendu Bay Town",
        "Kibiri",
        "North",
        "North Karachuonyo",
        "Wangchieng",
        "West Karachuonyo"
      ],
      "Kasipul": [
        "Central",
        "Central Kasipul",
        "East Kamagak",
        "South Kasipul",
        "West",
        "West Kamagak",
        "West Kasipul"
      ],
      "Ndhiwa": [
        "Kabuoch",
        "Kabuoch North",
        "Kabuoch South/Pala",
        "Kanyadoto",
        "Kanyamwa",
        "Kanyamwa Kologi",
        "Kanyamwa Kosewe",
        "Kanyikela",
        "Kwabwai"
      ],
      "Rangwe": [
        "East Gem",
        "Kagan",
        "Kochia",
        "West Gem"
      ],
      "Suba North": [
        "Gembe",
        "Kasgunga",
        "Lambwe",
        "Mfangano",
        "Mfangano Island",
        "Rusinga Island"
      ],
      "Suba South": [
        "Gwassi North",
        "Gwassi South",
        "Kaksingri",
        "Kaksingri West",
        "Ruma- Kaksingri"
      ]
    }
  },
  "044": {
    "centreCount": 543,
    "constituencies": {
      "Awendo": [
        "Central",
        "Central Sakwa",
        "North Sakwa",
        "South Sakwa",
        "West Sakwa"
      ],
      "Kuria East": [
        "Ntimaru East",
        "Nyabasi East",
        "Nyabasi West"
      ],
      "Kuria West": [
        "Bukira East",
        "Isibania",
        "Makerero",
        "Masaba",
        "Tagare"
      ],
      "Nyatike": [
        "Got Kachola",
        "Kachien'g",
        "Kaler",
        "Kanyasa",
        "Macalder/Ka",
        "Muhuru",
        "North Kadem"
      ],
      "Rongo": [
        "Central",
        "Central Kamagambo",
        "East Kamagambo",
        "North",
        "North Kamagambo",
        "South",
        "South Kamagambo"
      ],
      "Suna East": [
        "God Jope",
        "Kakrao",
        "Kwa",
        "Suna Central"
      ],
      "Suna West": [
        "Ragana-",
        "Ragana- Oruba",
        "Wasimbete",
        "Wasweta Ii",
        "Wiga"
      ],
      "Uriri": [
        "Central",
        "West Kanyamkago"
      ]
    }
  },
  "045": {
    "centreCount": 627,
    "constituencies": {
      "Bobasi": [
        "Basi",
        "Basi Central",
        "Masige East",
        "Masige West",
        "Nyacheki",
        "Sameta/Mok"
      ],
      "Bomachoge": [
        "Boochi",
        "Boochi/Tend"
      ],
      "Bomachoge Borabu": [
        "Bokimonge",
        "Magenche"
      ],
      "Bomachoge Chache": [
        "Majoge Basi"
      ],
      "Bonchari": [
        "Bogiakumu",
        "Bomariba",
        "Bomorenda",
        "Riana"
      ],
      "Kitutu Chache": [
        "Bogeka",
        "Kitutu",
        "Marani"
      ],
      "Kitutu Chache North": [
        "Kegogi",
        "Marani",
        "Monyerero",
        "Sensi"
      ],
      "Kitutu Chache South": [
        "Bogeka",
        "Bogusero",
        "Nyakoe",
        "Nyatieko"
      ],
      "Nyaribari": [
        "Bobaracho",
        "Gesusu",
        "Ibeno",
        "Ichuni",
        "Keumbu"
      ],
      "Nyaribari Chache": [
        "Birongo",
        "Bobaracho",
        "Ibeno",
        "Keumbu",
        "Kiogoro",
        "Kisii Central"
      ],
      "Nyaribari Masaba": [
        "Gesusu",
        "Ichuni",
        "Kiamokama",
        "Masimba",
        "Nyamasibi"
      ],
      "South": [
        "Boikang'a",
        "Borabu /"
      ],
      "South Mugirango": [
        "Bogetenga",
        "Boikang'a",
        "Getenga",
        "Moticho",
        "Tabaka"
      ]
    }
  },
  "046": {
    "centreCount": 349,
    "constituencies": {
      "Borabu": [
        "Esise",
        "Kiabonyoru",
        "Mekenene",
        "Nyansiongo"
      ],
      "Kitutu Masaba": [
        "Gachuba",
        "Gesima",
        "Kemera",
        "Magombo",
        "Manga",
        "Rigoma"
      ],
      "North": [
        "Itibo",
        "Magwagwa"
      ],
      "North Mugirango": [
        "Bokeira",
        "Bomwagamo",
        "Ekerenyo",
        "Itibo",
        "Magwagwa"
      ],
      "West Mugirango": [
        "Bogichora",
        "Bonyamatuta",
        "Bosamaro",
        "Nyamaiya",
        "Township"
      ]
    }
  },
  "047": {
    "centreCount": 358,
    "constituencies": {
      "Dagoretti North": [
        "Gatina",
        "Kabiro",
        "Kawangware",
        "Kileleshwa",
        "Kilimani"
      ],
      "Dagoretti South": [
        "Mutu-Ini",
        "Ngando",
        "Riruta",
        "Uthiru/",
        "Waithaka"
      ],
      "Embakasi": [
        "Kayole North",
        "Kayole South",
        "Komarock"
      ],
      "Embakasi Central": [
        "Kayole Central",
        "Kayole North",
        "Kayole South",
        "Komarock",
        "Matopeni/Spring Valley"
      ],
      "Embakasi East": [
        "Embakasi",
        "Lower Savannah",
        "Mihango",
        "Upper Savannah",
        "Utawala"
      ],
      "Embakasi North": [
        "Dandora Area I",
        "Dandora Area Ii",
        "Dandora Area Iii",
        "Dandora Area Iv",
        "Kariobangi North"
      ],
      "Embakasi South": [
        "Imara Daima",
        "Kwa Njenga",
        "Kwa Reuben",
        "Kware",
        "Pipeline"
      ],
      "Embakasi West": [
        "Mowlem",
        "Umoja I",
        "Umoja Ii"
      ],
      "Kamukunji": [
        "Airbase",
        "California",
        "Eastleigh North",
        "Eastleigh South",
        "Pumwani"
      ],
      "Kasarani": [
        "Clay City",
        "Kasarani",
        "Mwiki",
        "Njiru",
        "Ruai"
      ],
      "Kibra": [
        "Laini Saba",
        "Lindi",
        "Makina",
        "Sarangombe"
      ],
      "Langata": [
        "Karen",
        "Mugumu-Ini",
        "Nairobi West",
        "Nyayo",
        "South C"
      ],
      "Makadara": [
        "Harambee",
        "Makongeni",
        "Maringo/Hamza",
        "Viwandani"
      ],
      "Mathare": [
        "Hospital",
        "Huruma",
        "Kiamaiko",
        "Mabatini",
        "Mlango Kubwa",
        "Ngei"
      ],
      "Roysambu": [
        "Githurai",
        "Kahawa",
        "Kahawa West",
        "Roysambu",
        "Zimmerman"
      ],
      "Ruaraka": [
        "Baba Dogo",
        "Korogocho",
        "Lucky Summer",
        "Mathare North",
        "Utalii"
      ],
      "Starehe": [
        "Landimawe",
        "Nairobi Central",
        "Nairobi South",
        "Ngara",
        "Pangani",
        "Ziwani/Kariokor"
      ],
      "Westlands": [
        "Kangemi",
        "Karura",
        "Kitisuru",
        "Mountain",
        "Mountain View",
        "Parklands/Hi",
        "Parklands/Hi ghridge"
      ]
    }
  }
} as const satisfies Readonly<Record<string, CountyVenueIndexEntry>>;

const COUNTY_LOADERS: Readonly<Record<string, () => Promise<PollingVenue[]>>> = {
  "001": () => import("./venues/001.data").then((module) => module.VENUES_001),
  "002": () => import("./venues/002.data").then((module) => module.VENUES_002),
  "003": () => import("./venues/003.data").then((module) => module.VENUES_003),
  "004": () => import("./venues/004.data").then((module) => module.VENUES_004),
  "005": () => import("./venues/005.data").then((module) => module.VENUES_005),
  "006": () => import("./venues/006.data").then((module) => module.VENUES_006),
  "007": () => import("./venues/007.data").then((module) => module.VENUES_007),
  "008": () => import("./venues/008.data").then((module) => module.VENUES_008),
  "009": () => import("./venues/009.data").then((module) => module.VENUES_009),
  "010": () => import("./venues/010.data").then((module) => module.VENUES_010),
  "011": () => import("./venues/011.data").then((module) => module.VENUES_011),
  "012": () => import("./venues/012.data").then((module) => module.VENUES_012),
  "013": () => import("./venues/013.data").then((module) => module.VENUES_013),
  "014": () => import("./venues/014.data").then((module) => module.VENUES_014),
  "015": () => import("./venues/015.data").then((module) => module.VENUES_015),
  "016": () => import("./venues/016.data").then((module) => module.VENUES_016),
  "017": () => import("./venues/017.data").then((module) => module.VENUES_017),
  "018": () => import("./venues/018.data").then((module) => module.VENUES_018),
  "019": () => import("./venues/019.data").then((module) => module.VENUES_019),
  "020": () => import("./venues/020.data").then((module) => module.VENUES_020),
  "021": () => import("./venues/021.data").then((module) => module.VENUES_021),
  "022": () => import("./venues/022.data").then((module) => module.VENUES_022),
  "023": () => import("./venues/023.data").then((module) => module.VENUES_023),
  "024": () => import("./venues/024.data").then((module) => module.VENUES_024),
  "025": () => import("./venues/025.data").then((module) => module.VENUES_025),
  "026": () => import("./venues/026.data").then((module) => module.VENUES_026),
  "027": () => import("./venues/027.data").then((module) => module.VENUES_027),
  "028": () => import("./venues/028.data").then((module) => module.VENUES_028),
  "029": () => import("./venues/029.data").then((module) => module.VENUES_029),
  "030": () => import("./venues/030.data").then((module) => module.VENUES_030),
  "031": () => import("./venues/031.data").then((module) => module.VENUES_031),
  "032": () => import("./venues/032.data").then((module) => module.VENUES_032),
  "033": () => import("./venues/033.data").then((module) => module.VENUES_033),
  "034": () => import("./venues/034.data").then((module) => module.VENUES_034),
  "035": () => import("./venues/035.data").then((module) => module.VENUES_035),
  "036": () => import("./venues/036.data").then((module) => module.VENUES_036),
  "037": () => import("./venues/037.data").then((module) => module.VENUES_037),
  "038": () => import("./venues/038.data").then((module) => module.VENUES_038),
  "039": () => import("./venues/039.data").then((module) => module.VENUES_039),
  "040": () => import("./venues/040.data").then((module) => module.VENUES_040),
  "041": () => import("./venues/041.data").then((module) => module.VENUES_041),
  "042": () => import("./venues/042.data").then((module) => module.VENUES_042),
  "043": () => import("./venues/043.data").then((module) => module.VENUES_043),
  "044": () => import("./venues/044.data").then((module) => module.VENUES_044),
  "045": () => import("./venues/045.data").then((module) => module.VENUES_045),
  "046": () => import("./venues/046.data").then((module) => module.VENUES_046),
  "047": () => import("./venues/047.data").then((module) => module.VENUES_047),
};

/** Load one county chunk on demand. Unknown county codes return an empty list. */
export async function loadCountyVenues(code: string): Promise<PollingVenue[]> {
  return COUNTY_LOADERS[code]?.() ?? [];
}
