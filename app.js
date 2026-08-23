/* ================================================================== *
 *  Monika, Run Coach · 29 weken naar haar eerste halve marathon
 *  Tussendoel: Bruggenloop 15 km (13 december 2026).
 *  Drie FLEXIBELE trainingen per week; wedstrijden op de echte zondag.
 *  Gebouwd op de hoofdapp van Kim. Alles lokaal in de browser.
 * ================================================================== */

const CONFIG = {
  unit:       "km",
  zonePaceSuffix: "/km",
  footEmoji:  "🏃‍♀️",
  mottos: [
    "Zet 'm op, strijder!",
    "Lekker begonnen, strijder!",
    "Je basis groeit, strijder.",
    "Halverwege, sterk volgehouden! ⚡",
    "De halve komt in zicht, strijder!",
    "Halve marathon gelopen! Wat een prestatie! 🏅",
  ],
  appName:    "Op naar 21,1K",
  runner:     "Monika",
  goal:       "Je eerste halve marathon",
  startDate:  new Date(2026, 7, 24),
  storeKey:   "monika-hm.log.v1",
  coachName:  "Coach Bart",
  coachHandle:"@bartlopen",
  coachPhoto: "coach.jpg",
  athleteWord:"strijder",
  catchphrase:"Stap voor stap, strijder!",
};

const RUNNER = CONFIG.runner;
const GOAL = CONFIG.goal;
const START_DATE = CONFIG.startDate;
const STORE_KEY = CONFIG.storeKey;
const TOTAL_WEEKS = 29;
const UNIT = CONFIG.unit === "min" ? "min" : "km";
const UNIT_LABEL = UNIT;
const ZONE_SUFFIX = CONFIG.zonePaceSuffix ?? "/km";
const COACH_INITIAL = (CONFIG.coachName.replace(/^coach\s+/i, "")[0] || "C").toUpperCase();

/* --- Tempozones (richttempo's, we ijken ze na je eerste weken) ------- */
const ZONES = [
  { key: "herstel",  name: "Herstel",          pace: "7:45-8:15", info: "RPE 2 · bewust makkelijk" },
  { key: "duur",     name: "Rustige duurloop", pace: "7:10-7:40",    info: "RPE 3-4 · praattempo" },
  { key: "lang",     name: "Lange duurloop",   pace: "7:00-7:30",    info: "RPE 4 · de langste van je week" },
  { key: "doel",     name: "Wedstrijdtempo",   pace: "6:35-6:45",    info: "RPE 6-7 · 1:40 op 15 km" },
  { key: "tempo",    name: "Drempeltempo",     pace: "6:10-6:30",   info: "RPE 7-8 · 2 of 3 woorden" },
  { key: "interval", name: "Interval",         pace: "5:50-6:10",     info: "RPE 8-9 · kort en snel" },
];
const zoneByKey = Object.fromEntries(ZONES.map((z) => [z.key, z]));

const COACH = {
  herstel: [
    "Vandaag echt rustig, strijder. Hier komt de winst binnen.",
    "Makkelijk moet makkelijk zijn. Niet stoerder doen dan nodig.",
    "Geen puf? Dan is dit precies de goede training. Rustig aan.",
    "Slim getraind is half gewonnen, strijder.",
  ],
  duur: [
    "Rustige kilometers, strijder. Saai maar goud waard.",
    "Praattempo. Kun je geen hele zin uitspreken, dan loop je te hard.",
    "Het grootste deel van je week hoort rustig te zijn. Precies dit dus.",
    "Ontspannen schouders, rustige adem. Jij doet dit gewoon.",
  ],
  lang: [
    "De belangrijkste training van je week, strijder. Rustig starten.",
    "Verdeel je krachten. De laatste kilometers moeten nog kunnen.",
    "Tijd op de benen is precies wat je richting de halve nodig hebt.",
    "Rustig tempo, hoofd erbij. Jij maakt dit af.",
  ],
  tempo: [
    "Drempeltempo, strijder. Stevig maar beheerst, niet alles geven.",
    "Zoek het tempo waarbij nog 2 of 3 woorden lukken.",
    "Tussen de blokken echt rustig joggen. Dat hoort erbij.",
    "Weinig puf vandaag? Maak er dan een rustige duurloop van. Geen punt.",
  ],
  doel: [
    "Wedstrijdtempo, strijder. Dit is je Bruggenloop-gevoel.",
    "Voel goed hoe dit zit, straks doe je dit 15 km lang.",
    "Niet sneller dan afgesproken. Beheersing is hier de training.",
    "Elke meter op dit tempo maakt je doel concreter.",
  ],
  interval: [
    "Kort en snel, strijder. Techniek boven kracht.",
    "Dit maakt je wedstrijdtempo straks makkelijker.",
    "Ruim joggen tussen de blokken, dan blijft de kwaliteit hoog.",
    "Korte scherpe training. Morgen ben je weer los.",
  ],
};
const coachLine = (zone) => {
  const arr = COACH[zone] || COACH.duur;
  return arr[Math.floor(Math.random() * arr.length)];
};

const DONE = [
  "💪 Sterk gedaan, strijder!",
  "🔥 Weer eentje afgevinkt.",
  "👏 Lekker bezig, strijder.",
  "🌟 Zo bouw je een basis.",
  "✅ Weer een stukje sterker.",
  "🧡 Weer een stap richting je halve.",
];

const WHY = {
  herstel:  "Heel rustig lopen houdt je los en laat het bloed stromen zonder nieuwe belasting. Juist op deze dagen komt de winst van je zwaardere trainingen binnen. En als je krachttraining in je benen zit, is dit precies de juiste training.",
  duur:     "Rustige duurlopen op praattempo bouwen je aerobe motor: een sterker hart, meer haarvaten en betere vetverbranding. Dit is het fundament onder je halve marathon en het hoort het grootste deel van je week te zijn.",
  lang:     "De lange duurloop is jouw belangrijkste training. Je bouwt uithoudingsvermogen op, je lichaam leert efficiënter met brandstof omgaan, en je hoofd leert dat lange afstanden normaal zijn. Rustig tempo, gewoon volhouden.",
  doel:     "Op wedstrijdtempo lopen leert je gevoel precies wat 6:35-6:45 per km betekent. Zo weet je op de dag zelf hoe je moet starten en verdelen, in plaats van te gokken en halverwege in te storten.",
  tempo:    "Drempeltempo verhoogt de snelheid waarbij je nog net in balans blijft. Als je drempel stijgt, voelt je wedstrijdtempo op den duur een stuk makkelijker aan.",
  interval: "Korte snelle stukken verbeteren je loopeconomie: je gebruikt minder zuurstof bij hetzelfde tempo. We houden ze kort en met ruime pauzes, want je hebt je energie ook nodig voor je krachttraining.",
};

/* --- Helpers: drie flexibele slots, wedstrijden op de echte zondag ---- */
const d1 = (o) => ({ day: "d1", dayLabel: "Training 1 · rustig",    ...o });
const d2 = (o) => ({ day: "d2", dayLabel: "Training 2 · kwaliteit", ...o });
const d3 = (o) => ({ day: "d3", dayLabel: "Training 3 · lang",      ...o });
const zo = (o) => ({ day: "zo", dayLabel: "Zondag",                 ...o });

/* --- Het schema ------------------------------------------------------- */
const PLAN = [
  { week: 1, dates: "24-30 aug", phase: "Fase 1 · Basis verbreden", sessions: [
    d1({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Rustig beginnen", goal: "Je lichaam laten wennen aan het ritme", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Nog een rustige", goal: "Twee keer rustig, dat is genoeg deze week", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d3({ zone: "lang", km: 10, kind: "Lange duurloop", title: "10 km, je vertrouwde afstand", goal: "Waar je nu al staat", blocks: [
      "10 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 2, dates: "31 aug-6 sep", phase: "Fase 1 · Basis verbreden", sessions: [
    d1({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Ontspannen 6 km", goal: "Rustig blijft rustig", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Met 4 versnellingen", goal: "Even soepele benen maken", blocks: [
      "6 km op 7:10-7:40/km",
      "Daarna 4x 20 sec versnellen, met 1 min wandelen ertussen",
      "Rustig uitlopen",
    ] }),
    d3({ zone: "lang", km: 11, kind: "Lange duurloop", title: "11 km", goal: "Eén kilometer verder dan je gewend bent", blocks: [
      "11 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 3, dates: "7-13 sep", phase: "Fase 1 · Basis verbreden", sessions: [
    d1({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "7 km rustig", goal: "Basis groeit mee", blocks: [
      "7 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "Met 5 versnellingen", goal: "Soepel blijven", blocks: [
      "7 km op 7:10-7:40/km",
      "Daarna 5x 20 sec versnellen, met 1 min wandelen ertussen",
      "Rustig uitlopen",
    ] }),
    d3({ zone: "lang", km: 12, kind: "Lange duurloop", title: "12 km", goal: "Nieuwe langste", blocks: [
      "12 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 4, dates: "14-20 sep", phase: "Fase 1 · Basis verbreden", recovery: true, sessions: [
    d1({ zone: "herstel", km: 5, kind: "Herstel", title: "Rustige week", goal: "Elke vierde week is lichter", blocks: [
      "5 km heel rustig op 7:45-8:15/km",
      "Bewust makkelijk, dit is een cadeautje aan je benen",
    ] }),
    d2({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Kort en soepel", goal: "Fris blijven", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d3({ zone: "lang", km: 9, kind: "Lange duurloop", title: "Terugvalweek", goal: "Nu terugschakelen, straks sterker", blocks: [
      "9 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 5, dates: "21-27 sep", phase: "Fase 1 · Basis verbreden", sessions: [
    d1({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "Weer opbouwen", goal: "Fris na de rustige week", blocks: [
      "7 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 7, kind: "Drempeltempo", title: "3x 5 min drempel", goal: "Je eerste echte tempotraining", blocks: [
      "1,5 km inlopen op 7:30/km",
      "3x 5 min op 6:10-6:30/km, met 3 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 12, kind: "Lange duurloop", title: "12 km", goal: "Rustig, het tempowerk zat al in slot 2", blocks: [
      "12 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 6, dates: "28 sep-4 okt", phase: "Fase 1 · Basis verbreden", sessions: [
    d1({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "7 km rustig", goal: "Onderhoud", blocks: [
      "7 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 8, kind: "Drempeltempo", title: "4x 5 min drempel", goal: "Een blok erbij", blocks: [
      "1,5 km inlopen op 7:30/km",
      "4x 5 min op 6:10-6:30/km, met 3 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 13, kind: "Lange duurloop", title: "13 km", goal: "Fase 1 afsluiten", blocks: [
      "13 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 7, dates: "5-11 okt", phase: "Fase 2 · Op weg naar 15 km", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Volume vasthouden", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 8, kind: "Drempeltempo", title: "2x 10 min drempel", goal: "Langere blokken, zelfde tempo", blocks: [
      "1,5 km inlopen op 7:30/km",
      "2x 10 min op 6:10-6:30/km, met 4 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 13, kind: "Lange duurloop", title: "13 km", goal: "Geduldig verder", blocks: [
      "13 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 8, dates: "12-18 okt", phase: "Fase 2 · Op weg naar 15 km", recovery: true, sessions: [
    d1({ zone: "herstel", km: 5, kind: "Herstel", title: "Rustige week", goal: "Opladen", blocks: [
      "5 km heel rustig op 7:45-8:15/km",
      "Bewust makkelijk, dit is een cadeautje aan je benen",
    ] }),
    d2({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Met 4 versnellingen", goal: "Benen wakker houden", blocks: [
      "6 km op 7:10-7:40/km",
      "Daarna 4x 20 sec versnellen, met 1 min wandelen ertussen",
      "Rustig uitlopen",
    ] }),
    d3({ zone: "lang", km: 10, kind: "Lange duurloop", title: "Terugvalweek", goal: "Gas terug", blocks: [
      "10 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 9, dates: "19-25 okt", phase: "Fase 2 · Op weg naar 15 km", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Basis op peil", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 9, kind: "Drempeltempo", title: "3x 8 min drempel", goal: "Stevig blok", blocks: [
      "1,5 km inlopen op 7:30/km",
      "3x 8 min op 6:10-6:30/km, met 3 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 14, kind: "Lange duurloop", title: "14 km", goal: "De 15 komt in zicht", blocks: [
      "14 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 10, dates: "26 okt-1 nov", phase: "Fase 2 · Op weg naar 15 km", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Rustig herstellen", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "doel", km: 9, kind: "Wedstrijdtempo", title: "3x 2 km op wedstrijdtempo", goal: "Kennismaken met je Bruggenloop-tempo", blocks: [
      "1,5 km inlopen op 7:30/km",
      "3x 2 km op wedstrijdtempo 6:35-6:45/km, met 3 min joggen ertussen",
      "Dit is het tempo van de Bruggenloop, voel hoe het zit",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 15, kind: "Mijlpaal", title: "🎉 Je eerste 15 km", goal: "De afstand van de Bruggenloop, nu al", blocks: [
      "15 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 11, dates: "2-8 nov", phase: "Fase 2 · Op weg naar 15 km", recovery: true, sessions: [
    d1({ zone: "herstel", km: 6, kind: "Herstel", title: "Rustige week", goal: "Je hebt 15 km gelopen, geniet hiervan", blocks: [
      "6 km heel rustig op 7:45-8:15/km",
      "Bewust makkelijk, dit is een cadeautje aan je benen",
    ] }),
    d2({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Met 5 versnellingen", goal: "Soepel", blocks: [
      "6 km op 7:10-7:40/km",
      "Daarna 5x 20 sec versnellen, met 1 min wandelen ertussen",
      "Rustig uitlopen",
    ] }),
    d3({ zone: "lang", km: 12, kind: "Lange duurloop", title: "Terugvalweek", goal: "Bijtanken", blocks: [
      "12 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 12, dates: "9-15 nov", phase: "Fase 2 · Op weg naar 15 km", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Onderhoud", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 10, kind: "Drempeltempo", title: "2x 15 min drempel", goal: "Je langste drempelblokken", blocks: [
      "1,5 km inlopen op 7:30/km",
      "2x 15 min op 6:10-6:30/km, met 5 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 16, kind: "Lange duurloop", title: "16 km", goal: "Verder dan de Bruggenloop", blocks: [
      "16 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 13, dates: "16-22 nov", phase: "Fase 2 · Op weg naar 15 km", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Rustig", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "doel", km: 9, kind: "Wedstrijdtempo", title: "3x 2 km op wedstrijdtempo", goal: "Tempo scherp krijgen", blocks: [
      "1,5 km inlopen op 7:30/km",
      "3x 2 km op wedstrijdtempo 6:35-6:45/km, met 3 min joggen ertussen",
      "Dit is het tempo van de Bruggenloop, voel hoe het zit",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 14, kind: "Lange duurloop", title: "14 km", goal: "Vanaf nu bouwen we af naar de race", blocks: [
      "14 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 14, dates: "23-29 nov", phase: "Fase 3 · Scherp naar de Bruggenloop", sessions: [
    d1({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "7 km rustig", goal: "Afbouwen begint", blocks: [
      "7 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 8, kind: "Drempeltempo", title: "4x 4 min drempel", goal: "Kort en scherp", blocks: [
      "1,5 km inlopen op 7:30/km",
      "4x 4 min op 6:10-6:30/km, met 3 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 12, kind: "Lange duurloop", title: "12 km", goal: "Benen sparen", blocks: [
      "12 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 15, dates: "30 nov-6 dec", phase: "Fase 3 · Scherp naar de Bruggenloop", taper: true, sessions: [
    d1({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "6 km rustig", goal: "Energie opsparen", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "doel", km: 7, kind: "Wedstrijdtempo", title: "2x 2 km op wedstrijdtempo", goal: "Laatste keer voelen hoe het tempo zit", blocks: [
      "1,5 km inlopen op 7:30/km",
      "2x 2 km op wedstrijdtempo 6:35-6:45/km, met 3 min joggen ertussen",
      "Dit is het tempo van de Bruggenloop, voel hoe het zit",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 10, kind: "Lange duurloop", title: "10 km, laatste lange", goal: "Fris naar de startlijn", blocks: [
      "10 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 16, dates: "7-13 dec", phase: "Fase 3 · Scherp naar de Bruggenloop", tuneup: true, raceLabel: "🏁 Bruggenloop · 15 km", tuneupTag: "Bruggenloop", sessions: [
    d1({ zone: "herstel", km: 5, kind: "Herstel", title: "Losmaken", goal: "Kort en rustig, niets forceren", blocks: [
      "5 km heel rustig op 7:45-8:15/km",
      "Bewust makkelijk, dit is een cadeautje aan je benen",
    ] }),
    d2({ zone: "herstel", km: 4, kind: "Herstel", title: "Kort met 3 versnellingen", goal: "Scherp maar uitgerust", blocks: [
      "4 km heel rustig op 7:45-8:15/km",
      "3x 20 sec versnellen, met ruim wandelen ertussen",
      "Bewust makkelijk, dit is een cadeautje aan je benen",
    ] }),
    zo({ zone: "doel", km: 15, kind: "Wedstrijd", title: "🏁 Bruggenloop 15 km", goal: "Je eerste doel: rond 1:40 over de bruggen", blocks: [
      "Eet 2 tot 3 uur vooraf iets vertrouwds, niets nieuws",
      "Ruim op tijd aanwezig, dan blijft het ontspannen",
      "Start bewust rustig op 6:50 tot 7:00/km, de eerste kilometers voelen te makkelijk",
      "Daarna gelijkmatig op 6:35-6:45/km, dat is 1:40 over de streep",
      "De bruggen zijn de enige klim: rustiger omhoog, laat lopen omlaag",
      "Laatste 3 km: hier haal je 'm binnen, strijder 🧡",
    ] }),
  ]},
  { week: 17, dates: "14-20 dec", phase: "Fase 4 · Herstel en feestdagen", recovery: true, sessions: [
    d1({ zone: "herstel", km: 5, kind: "Herstel", title: "Bijkomen van de race", goal: "Je hebt 15 km gelopen, rust is verdiend", blocks: [
      "5 km heel rustig op 7:45-8:15/km",
      "Bewust makkelijk, dit is een cadeautje aan je benen",
    ] }),
    d2({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Soepel", goal: "Alles los", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d3({ zone: "lang", km: 8, kind: "Lange duurloop", title: "8 km rustig", goal: "Rustig weer opstarten", blocks: [
      "8 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 18, dates: "21-27 dec", phase: "Fase 4 · Herstel en feestdagen", recovery: true, sessions: [
    d1({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Kerstloopje", goal: "Even naar buiten tussen de drukte", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "Met 5 versnellingen", goal: "Geen druk deze week", blocks: [
      "7 km op 7:10-7:40/km",
      "Daarna 5x 20 sec versnellen, met 1 min wandelen ertussen",
      "Rustig uitlopen",
    ] }),
    d3({ zone: "lang", km: 11, kind: "Lange duurloop", title: "11 km", goal: "Komt het niet uit? Schuif gerust een dag", blocks: [
      "11 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 19, dates: "28 dec-3 jan", phase: "Fase 4 · Herstel en feestdagen", sessions: [
    d1({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Het jaar uitlopen", goal: "Ontspannen afsluiten", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 7, kind: "Drempeltempo", title: "3x 5 min drempel", goal: "Voorzichtig weer wat tempo", blocks: [
      "1,5 km inlopen op 7:30/km",
      "3x 5 min op 6:10-6:30/km, met 3 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 12, kind: "Lange duurloop", title: "Eerste lange van het jaar", goal: "Nieuw doel, nieuwe energie", blocks: [
      "12 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 20, dates: "4-10 jan", phase: "Fase 5 · Naar de halve marathon", sessions: [
    d1({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "7 km rustig", goal: "Nu op naar de halve", blocks: [
      "7 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 8, kind: "Drempeltempo", title: "4x 5 min drempel", goal: "Weer opbouwen", blocks: [
      "1,5 km inlopen op 7:30/km",
      "4x 5 min op 6:10-6:30/km, met 3 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 14, kind: "Lange duurloop", title: "14 km", goal: "Rustig terug op niveau", blocks: [
      "14 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 21, dates: "11-17 jan", phase: "Fase 5 · Naar de halve marathon", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Basis groeit", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 9, kind: "Drempeltempo", title: "2x 10 min drempel", goal: "Stevig maar beheerst", blocks: [
      "1,5 km inlopen op 7:30/km",
      "2x 10 min op 6:10-6:30/km, met 4 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 15, kind: "Lange duurloop", title: "15 km", goal: "Zo ver als de Bruggenloop", blocks: [
      "15 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 22, dates: "18-24 jan", phase: "Fase 5 · Naar de halve marathon", recovery: true, sessions: [
    d1({ zone: "herstel", km: 6, kind: "Herstel", title: "Rustige week", goal: "Vierde week, dus lichter", blocks: [
      "6 km heel rustig op 7:45-8:15/km",
      "Bewust makkelijk, dit is een cadeautje aan je benen",
    ] }),
    d2({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Soepel", goal: "Fris blijven", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d3({ zone: "lang", km: 12, kind: "Lange duurloop", title: "Terugvalweek", goal: "Bijtanken", blocks: [
      "12 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 23, dates: "25-31 jan", phase: "Fase 5 · Naar de halve marathon", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Onderhoud", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "doel", km: 9, kind: "Wedstrijdtempo", title: "3x 2 km op tempo", goal: "Tempogevoel terughalen", blocks: [
      "1,5 km inlopen op 7:30/km",
      "3x 2 km op wedstrijdtempo 6:35-6:45/km, met 3 min joggen ertussen",
      "Dit is het tempo van de Bruggenloop, voel hoe het zit",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 16, kind: "Lange duurloop", title: "16 km", goal: "Nieuwe opbouw", blocks: [
      "16 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 24, dates: "1-7 feb", phase: "Fase 5 · Naar de halve marathon", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Rustig", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 10, kind: "Drempeltempo", title: "2x 15 min drempel", goal: "Lange blokken", blocks: [
      "1,5 km inlopen op 7:30/km",
      "2x 15 min op 6:10-6:30/km, met 5 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 17, kind: "Lange duurloop", title: "17 km", goal: "Langste tot nu toe", blocks: [
      "17 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 25, dates: "8-14 feb", phase: "Fase 5 · Naar de halve marathon", recovery: true, sessions: [
    d1({ zone: "herstel", km: 6, kind: "Herstel", title: "Rustige week", goal: "Even helemaal rustig", blocks: [
      "6 km heel rustig op 7:45-8:15/km",
      "Bewust makkelijk, dit is een cadeautje aan je benen",
    ] }),
    d2({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Met 5 versnellingen", goal: "Soepel", blocks: [
      "6 km op 7:10-7:40/km",
      "Daarna 5x 20 sec versnellen, met 1 min wandelen ertussen",
      "Rustig uitlopen",
    ] }),
    d3({ zone: "lang", km: 13, kind: "Lange duurloop", title: "Terugvalweek", goal: "Opladen voor de laatste weken", blocks: [
      "13 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 26, dates: "15-21 feb", phase: "Fase 5 · Naar de halve marathon", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Laatste opbouw", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "doel", km: 10, kind: "Wedstrijdtempo", title: "3x 3 km op tempo", goal: "Grotere blokken", blocks: [
      "1,5 km inlopen op 7:30/km",
      "3x 3 km op wedstrijdtempo 6:35-6:45/km, met 4 min joggen ertussen",
      "Dit is het tempo van de Bruggenloop, voel hoe het zit",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 18, kind: "Mijlpaal", title: "🎉 18 km", goal: "Verder dan je ooit liep", blocks: [
      "18 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 27, dates: "22-28 feb", phase: "Fase 5 · Naar de halve marathon", sessions: [
    d1({ zone: "duur", km: 8, kind: "Rustige duurloop", title: "8 km rustig", goal: "Rustig", blocks: [
      "8 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "tempo", km: 11, kind: "Drempeltempo", title: "2x 20 min drempel", goal: "Je laatste zware training", blocks: [
      "1,5 km inlopen op 7:30/km",
      "2x 20 min op 6:10-6:30/km, met 5 min rustig joggen ertussen",
      "Stevig maar beheerst: 2 of 3 woorden moeten nog lukken",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 19, kind: "Mijlpaal", title: "🎉 19 km, bijna de halve", goal: "Nu weet je: de 21,1 gaat lukken", blocks: [
      "19 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 28, dates: "1-7 mrt", phase: "Fase 6 · Afbouwen", taper: true, sessions: [
    d1({ zone: "duur", km: 7, kind: "Rustige duurloop", title: "7 km rustig", goal: "Vanaf nu spaar je energie", blocks: [
      "7 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "doel", km: 8, kind: "Wedstrijdtempo", title: "3x 2 km op tempo", goal: "Scherp maken, niet moe maken", blocks: [
      "1,5 km inlopen op 7:30/km",
      "3x 2 km op wedstrijdtempo 6:35-6:45/km, met 3 min joggen ertussen",
      "Dit is het tempo van de Bruggenloop, voel hoe het zit",
      "1 km uitlopen",
    ] }),
    d3({ zone: "lang", km: 14, kind: "Lange duurloop", title: "14 km, afbouwen", goal: "Laatste lange loop", blocks: [
      "14 km op 7:00-7:30/km",
      "Rustig starten, gelijkmatig blijven",
      "Neem drinken mee vanaf ongeveer 90 minuten",
      "Laatste kilometer lekker uitlopen",
    ] }),
  ]},
  { week: 29, dates: "8-14 mrt", phase: "Fase 7 · Raceweek", race: true, raceLabel: "🏅 Doelrace · halve marathon", sessions: [
    d1({ zone: "duur", km: 6, kind: "Rustige duurloop", title: "Losmaken", goal: "Kort en rustig", blocks: [
      "6 km op 7:10-7:40/km",
      "Praattempo: je kunt een hele zin uitspreken",
      "Rustig uitlopen en even losmaken",
    ] }),
    d2({ zone: "herstel", km: 4, kind: "Herstel", title: "Kort met 3 versnellingen", goal: "Scherp en uitgerust naar zondag", blocks: [
      "4 km heel rustig op 7:45-8:15/km",
      "3x 20 sec versnellen, met ruim wandelen ertussen",
      "Bewust makkelijk, dit is een cadeautje aan je benen",
    ] }),
    zo({ zone: "doel", km: 21.1, kind: "Wedstrijd", title: "🏅 Jouw eerste halve marathon", goal: "21,1 km, gewoon overleven en genieten", blocks: [
      "Eet 2 tot 3 uur vooraf iets vertrouwds, geen experimenten",
      "Draag de schoenen en kleding waarin je getraind hebt",
      "Start op 7:00 tot 7:15/km. Dit is uitlopen, geen tijdrit",
      "Drink bij elke post een paar slokken, ook als je geen dorst hebt",
      "Kilometer 15 tot 18 zijn het zwaarst. Dan weet je: nog maar 3 km",
      "Wandelen mag altijd. Over de finish komen is het doel",
      "Geniet, strijder. Je hebt hier 29 weken voor gewerkt 🧡",
    ] }),
  ]},
];

const INFO = [
  { icon: "🎯", title: "Je twee doelen", items: [
    "Tussendoel: de Bruggenloop 15 km op 13 december 2026, richting 1:40.",
    "Hoofddoel: je eerste halve marathon op 14 maart 2027. Daar is uitlopen het doel, niet de tijd.",
    "Je loopt je eerste 15 km al in week 10, dus ruim vóór de Bruggenloop.",
    "In week 27 loop je 19 km. Dan weet je zeker dat die 21,1 km gaat lukken.",
    "Staat de halve marathon op een andere datum? Zeg het tegen Coach Bart, dan passen we het schema aan.",
  ]},
  { icon: "🗓️", title: "Flexibel lopen, zo werkt het", items: [
    "Je hebt geen vaste dagen. Elke week staan er drie trainingen klaar, jij kiest wanneer.",
    "Training 1 is je rustige loop, training 2 is de kwaliteitstraining, training 3 is de lange.",
    "Houd minstens één rustdag tussen training 2 en training 3. Die twee zijn de zwaarste.",
    "Volgorde is niet heilig, maar loop de lange nooit direct na de kwaliteitstraining.",
    "Komt een hele week niet uit? Gebruik de knop bij het schema om alles een week op te schuiven.",
  ]},
  { icon: "🏋️", title: "Krachttraining naast het lopen", items: [
    "Twee keer per week krachttraining blijft gewoon staan. Dat maakt je sterker en blessurebestendiger.",
    "Plan zware benen niet vlak vóór je lange loop. Een dag ertussen is genoeg.",
    "Ga voor zwaar en weinig herhalingen (6 tot 8) in plaats van veel herhalingen met licht gewicht.",
    "Squats, lunges, bruggetje en kuitwerk hebben het meeste effect op je lopen.",
    "In de weken vlak vóór een wedstrijd (15, 16, 28, 29) bouw je ook je kracht wat af.",
  ]},
  { icon: "🔋", title: "Geen puf meer? Zo kies je slim", items: [
    "Je gaf aan dat je soms geen puf over hebt. Dat is normaal met werk, kracht én lopen.",
    "Moet je kiezen: laat training 1 (de rustige) vallen. Die is het makkelijkst te missen.",
    "Kwaliteit en de lange loop dragen je doel. Die twee wil je zoveel mogelijk vasthouden.",
    "Te moe voor de kwaliteitstraining? Maak er een rustige duurloop van. Beter dan niets, beter dan forceren.",
    "Twee weken op rij futloos? Dan is het geen motivatie maar herstel. Neem een rustige week.",
    "Eén gemiste training maakt niets uit. Drie weken niets doen wel. Blijf in beweging.",
  ]},
  { icon: "🏁", title: "De Bruggenloop, 15 km", items: [
    "13 december 2026. Vijftien kilometer over de Rotterdamse bruggen.",
    "Voor 1:40 loop je 6:35-6:45 per km. Dat oefen je in week 10, 13, 15 en 16.",
    "Start bewust rustiger dan je wilt, rond 6:50 tot 7:00 per km. Iedereen vertrekt te hard.",
    "De bruggen zijn de enige echte klim. Rustiger omhoog, en laat je gewoon lopen omlaag.",
    "December betekent kou. Kleed je in laagjes en trek iets uit wat je bij de start kunt weggooien.",
  ]},
  { icon: "🏅", title: "De halve marathon", items: [
    "Jouw woorden: gewoon overleven. Precies de goede instelling voor een eerste halve.",
    "Start op 7:00 tot 7:15 per km, dus rustiger dan je Bruggenloop-tempo. Je loopt 6 km verder.",
    "Drink bij elke post een paar slokken, ook als je geen dorst hebt.",
    "Kilometer 15 tot 18 zijn mentaal het zwaarst. Daarna weet je: nog maar 3 km.",
    "Wandelen mag altijd. Over de finish komen is het doel.",
  ]},
  { icon: "🥤", title: "Eten en drinken op lange lopen", items: [
    "Onder een uur hoef je onderweg niets. Daarboven wordt het belangrijk.",
    "Vanaf 90 minuten: drinken meenemen en elke 20 minuten een paar slokken.",
    "Vanaf ongeveer 75 minuten ook iets eetbaars: een gel, dadels of sportdrank.",
    "Oefen dat tijdens je lange lopen. Op de wedstrijddag wil je niets nieuws proberen.",
    "Eet na een lange loop binnen een uur iets met koolhydraten en eiwit. Dat scheelt echt in je herstel.",
  ]},
  { icon: "🌙", title: "Donker en koud lopen", items: [
    "Een groot deel van je opbouw valt in het donkere seizoen. Draag iets fels of reflecterends.",
    "Een klein hoofdlampje maakt een groot verschil op onverlichte stukken.",
    "Kleed je in laagjes en start liever een tikje kouder. Na 10 minuten warm je flink op.",
    "IJzel of spekgladde stoep? Niet lopen. Verzet de training of pak de loopband.",
    "Loop in het donker een bekende, verlichte route en laat thuis weten waar je bent.",
  ]},
  { icon: "😴", title: "Herstel en signalen", items: [
    "Slaap is je goedkoopste winst. Zeven tot negen uur maakt een groot verschil.",
    "Een dag spierpijn is normaal. Drie dagen moeheid betekent te veel of te snel.",
    "Verhoogde rusthartslag, slecht slapen of geen zin: dat zijn signalen, geen zwakte.",
    "Ziek met koorts? Niet lopen. Wacht tot je een dag klachtenvrij bent en pak dan rustig op.",
    "Twijfel je over een klacht? Stuur Coach Bart een bericht, dan passen we het aan.",
  ]},
];

const BADGES = [
  { id: "first",   icon: "👟", name: "Eerste training", desc: "1 training afgevinkt",    test: (s) => s.done >= 1 },
  { id: "week",    icon: "✅", name: "Week compleet",   desc: "Een hele week afgerond",  test: (s) => s.fullWeeks >= 1 },
  { id: "streak",  icon: "🔥", name: "Drie weken vol",  desc: "Reeks van 9 trainingen",  test: (s) => s.streak >= 9 },
  { id: "twaalf",  icon: "🧭", name: "Twaalf",          desc: "12 km in één training",   test: (s) => s.maxDist >= 12 },
  { id: "sub7",    icon: "⏱️", name: "Onder de 7",      desc: "Tempo onder 7:00/km",     test: (s) => s.bestPace > 0 && s.bestPace <= 420 },
  { id: "vijftien",icon: "🏁", name: "Vijftien",        desc: "15 km in één training",   test: (s) => s.maxDist >= 15 },
  { id: "half",    icon: "⚡", name: "Halverwege",      desc: "50% van je schema",       test: (s) => s.done >= s.total / 2 },
  { id: "honderd", icon: "💯", name: "Honderd km",      desc: "100 km totaal gelopen",   test: (s) => s.km >= 100 },
  { id: "achttien",icon: "🏔️", name: "Achttien",        desc: "18 km in één training",   test: (s) => s.maxDist >= 18 },
  { id: "loyal",   icon: "📅", name: "Vaste klant",     desc: "40 trainingen gedaan",    test: (s) => s.done >= 40 },
  { id: "driehond",icon: "🚀", name: "Driehonderd km",  desc: "300 km totaal gelopen",   test: (s) => s.km >= 300 },
  { id: "finish",  icon: "🏅", name: "Halve marathon",  desc: "Je doelrace voltooid",    test: (s) => s.raceDone },
];

/* ================================================================== *
 *  State
 * ================================================================== */
function loadLog() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch { return {}; }
}
function saveLog() { localStorage.setItem(STORE_KEY, JSON.stringify(log)); }
let log = loadLog();

const sid = (week, day) => `w${week}-${day}`;
const flatSessions = PLAN.flatMap((w) => w.sessions.map((s) => ({ ...s, week: w.week })));
const totalSessions = flatSessions.length;
const LAST_SESSION = flatSessions[flatSessions.length - 1];
const DAY_OFFSET = { ma: 0, di: 1, wo: 2, do: 3, vr: 4, za: 5, zo: 6, d1: 0, d2: 2, d3: 4, d4: 6 };

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function dateAtDay(dayIndex) {
  const date = new Date(schedStartMs());
  date.setDate(date.getDate() + dayIndex);
  date.setHours(12, 0, 0, 0);
  return date;
}

function sessionDate(week, day) {
  return dateAtDay((week - 1) * 7 + (DAY_OFFSET[day] ?? 0));
}

function isoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function planningEntries() {
  return Array.isArray(log.__planning) ? log.__planning : [];
}

function planningForWeek(week) {
  const start = isoDate(dateAtDay((week - 1) * 7));
  const end = isoDate(dateAtDay((week - 1) * 7 + 6));
  return planningEntries().filter((entry) => entry.start <= end && (entry.end || entry.start) >= start);
}

function parseTime(str) {
  if (!str) return null;
  const parts = String(str).split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] * 60;
}

function durationParts(str) {
  const total = parseTime(str) || 0;
  return { minutes: Math.floor(total / 60), seconds: total % 60 };
}

function durationValue(minutes, seconds) {
  const m = Math.max(0, parseInt(minutes, 10) || 0);
  const s = Math.min(59, Math.max(0, parseInt(seconds, 10) || 0));
  return `${m}:${String(s).padStart(2, "0")}`;
}
function paceSeconds(distance, timeStr) {
  const d = parseFloat(String(distance).replace(",", "."));
  const sec = parseTime(timeStr);
  if (!d || !sec) return null;
  return sec / d;
}
function fmtPace(perKm) {
  if (!perKm) return null;
  const m = Math.floor(perKm / 60);
  const s = Math.round(perKm % 60);
  return `${m}:${String(s).padStart(2, "0")} /km`;
}

/* Afgeleide statistieken uit de log */
function computeStats() {
  let done = 0, km = 0, maxDist = 0, maxTime = 0, bestPace = 0, raceDone = false;
  flatSessions.forEach((s) => {
    const e = log[sid(s.week, s.day)];
    if (!e || !e.done) return;
    done++;
    const d = parseFloat(String(e.distance || "").replace(",", ".")) || 0;
    km += d;
    if (d > maxDist) maxDist = d;
    const t = parseTime(e.time) || 0;
    if (t > maxTime) maxTime = t;
    const p = paceSeconds(e.distance, e.time);
    if (p && (bestPace === 0 || p < bestPace)) bestPace = p;
    if (s.week === LAST_SESSION.week && s.day === LAST_SESSION.day) raceDone = true;
  });
  let streak = 0, run = 0;
  flatSessions.forEach((s) => {
    const e = log[sid(s.week, s.day)];
    if (e && e.done) { run++; streak = Math.max(streak, run); } else run = 0;
  });
  let fullWeeks = 0;
  PLAN.forEach((w) => {
    if (w.sessions.every((s) => log[sid(w.week, s.day)]?.done)) fullWeeks++;
  });
  return { done, total: totalSessions, km, maxDist, maxTime, bestPace, raceDone, streak, fullWeeks };
}

function currentWeek() {
  const diff = Math.floor((Date.now() - schedStartMs()) / (7 * 864e5));
  return Math.min(TOTAL_WEEKS, Math.max(1, diff + 1));
}

/* ================================================================== *
 *  Rendering
 * ================================================================== */
const $ = (id) => document.getElementById(id);

function animateCount(el, to, suffix = "") {
  const dur = 700, t0 = performance.now();
  const dec = to % 1 !== 0;
  function step(t) {
    const k = Math.min(1, (t - t0) / dur);
    const v = to * (1 - Math.pow(1 - k, 3));
    el.textContent = (dec ? v.toFixed(1) : Math.round(v)) + suffix;
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function renderHero(stats) {
  $("runnerName").textContent = RUNNER;
  $("goalText").textContent = GOAL;
  const pct = Math.round((stats.done / stats.total) * 100);
  $("ringPct").textContent = `${pct}%`;
  const r = 52, c = 2 * Math.PI * r;
  const fg = $("ringFg");
  fg.style.strokeDasharray = c;
  fg.style.strokeDashoffset = c;
  requestAnimationFrame(() => { fg.style.strokeDashoffset = c * (1 - pct / 100); });
  const mottos = CONFIG.mottos || ["Zet 'm op, strijder!", "Lekker bezig, strijder!", "Je bouwt 'm rustig op, strijder.", "Halverwege, knap volgehouden! ⚡", "Bijna race-klaar, strijder!", "Finisher! Wat een prestatie, strijder. 🏅"];
  $("heroMotto").textContent =
    stats.raceDone ? mottos[5] : pct >= 80 ? mottos[4] : pct >= 50 ? mottos[3] : pct >= 20 ? mottos[2] : pct > 0 ? mottos[1] : mottos[0];
  renderCountdown();
}

function raceInfo() {
  const rw = PLAN.find((w) => w.race || w.finish) || PLAN.find((w) => w.tuneup) || PLAN[PLAN.length - 1];
  const rs = rw.sessions[rw.sessions.length - 1];
  const off = DAY_OFFSET[rs.day] ?? 6;
  const date = dateAtDay((rw.week - 1) * 7 + off);
  const days = Math.round((date.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 864e5);
  return { days, name: rs.title.replace(/^[^\p{L}\d]+/u, "").trim() };
}
function renderCountdown() {
  const motto = $("heroMotto");
  if (!motto) return;
  let el = $("raceCountdown");
  if (!el) {
    el = document.createElement("p");
    el.id = "raceCountdown";
    el.className = "hero-countdown";
    motto.after(el);
  }
  const { days, name } = raceInfo();
  const wks = Math.round(days / 7), mon = Math.round(days / 30);
  el.textContent =
    days > 180 ? `🗓️ jouw grote doel: over ~${mon} maanden, ${name}` :
    days > 14 ? `🗓️ nog ${wks} weken tot je ${name}` :
    days > 1 ? `🗓️ nog ${days} dagen tot je ${name}` :
    days === 1 ? `🗓️ morgen is het zover: ${name}!` :
    days === 0 ? `🔥 vandaag is het zover: ${name}!` :
    `🎉 ${name} volbracht, chapeau!`;
}

function renderStats(stats) {
  animateCount($("statDone"), stats.done);
  animateCount($("statKm"), Math.round(stats.km * 10) / 10, " km");
  animateCount($("statStreak"), stats.streak);
  const cw = currentWeek();
  const wk = PLAN.find((w) => w.week === cw);
  const wkDone = wk.sessions.filter((s) => log[sid(cw, s.day)]?.done).length;
  $("statWeek").textContent = `${wkDone}/${wk.sessions.length}`;
}

function renderNextUp() {
  const cw = currentWeek();
  const next =
    flatSessions.find((s) => s.week >= cw && !log[sid(s.week, s.day)]?.done) ||
    flatSessions.find((s) => !log[sid(s.week, s.day)]?.done);
  const box = $("nextUp");
  if (!next) {
    box.innerHTML = `<div class="nextup-card done"><span class="nextup-eyebrow">🏅 Schema compleet</span><strong>Alles afgevinkt, chapeau, ${RUNNER}!</strong></div>`;
    return;
  }
  const z = zoneByKey[next.zone];
  box.innerHTML = `
    <button class="nextup-card zone-${next.zone}" data-week="${next.week}" data-day="${next.day}">
      <span class="nextup-eyebrow">Volgende training · week ${next.week} · ${next.dayLabel}</span>
      <strong>${next.title}</strong>
      <span class="nextup-meta">${next[UNIT]} ${UNIT_LABEL} · ${z.name}</span>
      <span class="nextup-go">Openen ›</span>
    </button>`;
  box.querySelector(".nextup-card").addEventListener("click", () => openDetail(next.week, next.day));
}

const PLANNING_META = {
  race: {
    icon: "🏁", label: "Tussentijdse race",
    advice: "Laat deze race je lange training vervangen. Houd de training ervoor rustig en plan daarna minimaal één hersteldag.",
  },
  vacation: {
    icon: "🌴", label: "Vakantie",
    advice: "Gemiste trainingen hoef je niet in te halen. Pak bij thuiskomst de eerstvolgende rustige training op.",
  },
  rest: {
    icon: "🩹", label: "Rust / blessure",
    advice: "Herstel gaat voor het schema. Hervat pas pijnvrij en bouw de eerste week extra rustig op.",
  },
};

function formatPlanDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
}

function renderPlanning() {
  const list = $("planningList");
  if (!list) return;
  const entries = [...planningEntries()].sort((a, b) => a.start.localeCompare(b.start));
  if (!entries.length) {
    list.innerHTML = `<div class="planning-empty"><span>🗓️</span><p>Nog niets gepland. Voeg een vakantie of oefenwedstrijd toe zodra je die weet.</p></div>`;
    return;
  }
  list.innerHTML = entries.map((entry) => {
    const meta = PLANNING_META[entry.type] || PLANNING_META.rest;
    const period = entry.end && entry.end !== entry.start
      ? `${formatPlanDate(entry.start)} – ${formatPlanDate(entry.end)}`
      : formatPlanDate(entry.start);
    return `<article class="planning-item plan-${entry.type}">
      <span class="planning-icon">${meta.icon}</span>
      <div class="planning-copy">
        <span class="planning-type">${meta.label} · ${period}</span>
        <strong>${escapeHtml(entry.title)}</strong>
        ${entry.note ? `<p>${escapeHtml(entry.note)}</p>` : ""}
        <p class="planning-advice"><b>Coachadvies:</b> ${meta.advice}</p>
      </div>
      <button class="planning-remove" type="button" data-plan-id="${escapeHtml(entry.id)}" aria-label="${escapeHtml(entry.title)} verwijderen">×</button>
    </article>`;
  }).join("");
  list.querySelectorAll(".planning-remove").forEach((button) => {
    button.addEventListener("click", () => {
      log.__planning = planningEntries().filter((entry) => entry.id !== button.dataset.planId);
      saveLog();
      renderAll();
      toast("Uit je planning verwijderd");
    });
  });
}

function renderZones() {
  $("zonesList").innerHTML = ZONES.map((z) => `
    <div class="zone-row zone-${z.key}">
      <span class="zone-dot"></span>
      <div class="zone-main"><strong>${z.name}</strong><span>${z.info}</span></div>
      <span class="zone-pace">${z.pace}${ZONE_SUFFIX ? `<small>${ZONE_SUFFIX}</small>` : ""}</span>
    </div>`).join("");
}

function renderChart() {
  const cwBar = currentWeek();
  const max = Math.max(...PLAN.map((w) => w.sessions.reduce((n, s) => n + s[UNIT], 0)));
  $("volumeChart").innerHTML = PLAN.map((w) => {
    const planned = w.sessions.reduce((n, s) => n + s[UNIT], 0);
    const doneMin = w.sessions.reduce((n, s) => n + (log[sid(w.week, s.day)]?.done ? s[UNIT] : 0), 0);
    const h = Math.round((planned / max) * 100);
    const fill = planned ? Math.round((doneMin / planned) * 100) : 0;
    const cls = ((w.race || w.tuneup || w.finish) ? "is-race" : w.recovery ? "is-rest" : "") + (w.week === cwBar ? " is-now" : "");
    return `
      <div class="bar ${cls}" title="Week ${w.week}: ${planned} ${UNIT_LABEL} gepland">
        <div class="bar-track" style="height:${h}%">
          <div class="bar-fill" style="height:${fill}%"></div>
        </div>
        <span class="bar-x">${w.week}</span>
      </div>`;
  }).join("");
}

function tagOf(w) {
  if (w.finish) return `<span class="week-tag tag-race">Finale</span>`;
  if (w.race) return `<span class="week-tag tag-race">Raceweek</span>`;
  if (w.tuneup) return `<span class="week-tag tag-tuneup">${w.tuneupTag || "Wedstrijd"}</span>`;
  if (w.recovery) return `<span class="week-tag tag-rest">Herstel</span>`;
  if (w.taper) return `<span class="week-tag tag-taper">Taper</span>`;
  return "";
}

function renderWeeks() {
  const cw = currentWeek();
  const todayIso = isoDate(new Date());
  let html = "", lastPhase = "";
  PLAN.forEach((w, i) => {
    if (w.phase !== lastPhase) { html += `<h4 class="sub-phase reveal">${w.phase}</h4>`; lastPhase = w.phase; }
    const sess = w.sessions.map((s) => {
      const e = log[sid(w.week, s.day)] || {};
      const z = zoneByKey[s.zone];
      const pace = fmtPace(paceSeconds(e.distance, e.time));
      const bits = [];
      if (e.distance) bits.push(`${e.distance} km`);
      if (pace) bits.push(pace);
      if (e.hr) bits.push(`${e.hr} bpm`);
      const logged = bits.length ? `<span class="session-logged">📊 ${bits.join(" · ")}</span>` : "";
      const lastDay = w.sessions[w.sessions.length - 1].day;
      const isRaceSession = (w.race || w.tuneup || w.finish) && s.day === lastDay;
      const isToday = isoDate(sessionDate(w.week, s.day)) === todayIso;
      const raceKicker = isRaceSession
        ? `<span class="session-race-kicker">${w.raceLabel || (w.race ? "🏅 Doelrace" : w.tuneup ? "🏁 Wedstrijd" : "🏁 Finale")}</span>`
        : "";
      const isFlexibleSlot = /^d\d+$/.test(s.day);
      const badgeLabel = isFlexibleSlot ? s.day.slice(1) : s.dayLabel.slice(0, 2);
      return `
        <button class="session zone-${s.zone} ${isRaceSession ? "is-race-session" : ""} ${e.done ? "is-done" : ""} ${isToday ? "is-today" : ""}" data-week="${w.week}" data-day="${s.day}">
          <span class="session-day ${isFlexibleSlot ? "is-slot" : ""}" title="${s.dayLabel}">${isRaceSession ? "<small>🏁</small>" : ""}${badgeLabel}</span>
          <span class="session-body">
            ${raceKicker}
            <span class="session-title">${s.title}${isToday ? ' <span class="today-badge">Vandaag</span>' : ""}</span>
            <span class="session-meta">${s[UNIT]} ${UNIT_LABEL} · ${s.kind}</span>
            ${logged}
          </span>
          <span class="session-check">${e.done ? "✓" : ""}</span>
        </button>`;
    }).join("");
    const weekPlans = planningForWeek(w.week);
    const planStrip = weekPlans.length ? `<div class="week-planning">${weekPlans.map((entry) => {
      const meta = PLANNING_META[entry.type] || PLANNING_META.rest;
      return `<span>${meta.icon} ${escapeHtml(entry.title)}</span>`;
    }).join("")}</div>` : "";
    html += `
      <article class="week-card reveal ${w.tuneup ? "is-tuneup-week" : ""} ${w.race ? "is-goal-race-week" : ""} ${w.week === cw ? "is-current" : ""} ${w.week < cw ? (w.sessions.every((x) => log[sid(w.week, x.day)]?.done) ? "is-complete" : "is-missed") : ""}" style="--i:${i % 4}">
        <header class="week-head">
          <div><span class="week-no">Week ${w.week}</span><span class="week-dates">${weekDateLabel(w)}</span></div>
          ${w.week === cw ? `<span class="week-tag tag-now">Nu</span>` : w.week < cw ? (w.sessions.every((x) => log[sid(w.week, x.day)]?.done) ? `<span class="week-tag tag-done">✓ af</span>` : `<span class="week-tag tag-missed">gemist</span>`) : tagOf(w)}
        </header>
        ${planStrip}
        <div class="session-list">${sess}</div>
      </article>`;
  });
  $("weeksList").innerHTML = html;
  $("weeksList").querySelectorAll(".session").forEach((b) =>
    b.addEventListener("click", () => openDetail(+b.dataset.week, b.dataset.day)));
  observeReveals();
}

function renderBadges(stats) {
  $("badgeGrid").innerHTML = BADGES.map((b) => {
    const got = b.test(stats);
    return `
      <div class="badge ${got ? "got" : "locked"}" title="${b.desc}">
        <span class="badge-icon">${got ? b.icon : "🔒"}</span>
        <strong>${b.name}</strong>
        <span class="badge-desc">${b.desc}</span>
      </div>`;
  }).join("");
}

function renderInfo() {
  $("infoList").innerHTML = INFO.map((c, i) => `
    <article class="info-card reveal" style="--i:${i}">
      <span class="info-icon">${c.icon}</span>
      <h4>${c.title}</h4>
      <ul>${c.items.map((t) => `<li>${t}</li>`).join("")}</ul>
    </article>`).join("");
}

function addJumpButton() {
  const head = document.querySelector(".weeks .phase-head");
  if (!head || document.getElementById("jumpNow")) return;
  const btn = document.createElement("button");
  btn.id = "jumpNow";
  btn.type = "button";
  btn.className = "jump-now";
  btn.textContent = "Naar deze week ↓";
  btn.addEventListener("click", () =>
    document.querySelector(".week-card.is-current")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  head.insertAdjacentElement("afterend", btn);
}

/* ----- Extra's: begroeting, records, consistentie ------------------- */
function greetingWord() {
  const h = new Date().getHours();
  return h < 6 ? "Goedenacht" : h < 12 ? "Goedemorgen" : h < 18 ? "Goedemiddag" : "Goedenavond";
}
function renderGreeting() {
  const copy = document.querySelector(".hero-copy");
  if (!copy) return;
  let el = document.getElementById("heroGreeting");
  if (!el) {
    el = document.createElement("p");
    el.id = "heroGreeting";
    el.className = "hero-greeting";
    copy.insertBefore(el, copy.firstChild);
  }
  el.textContent = `${greetingWord()}, ${RUNNER.split(" ")[0]} 👋`;
}
function renderRecords(stats) {
  const anchor = document.querySelector(".weeks");
  if (!anchor) return;
  let sec = document.getElementById("recordsPanel");
  if (!sec) {
    sec = document.createElement("section");
    sec.id = "recordsPanel";
    sec.className = "panel reveal";
    anchor.parentNode.insertBefore(sec, anchor);
  }
  const pace = fmtPace(stats.bestPace);
  const longest = UNIT === "min"
    ? (stats.maxTime ? `${Math.round(stats.maxTime / 60)} min` : "–")
    : (stats.maxDist ? `${stats.maxDist} km` : "–");
  const rows = [
    ["⚡ Snelste tempo", pace || "–"],
    [UNIT === "min" ? "⏱️ Langste loop" : "🏔️ Verste loop", longest],
    ["📊 Totaal gelopen", `${Math.round(stats.km * 10) / 10} km`],
    ["🔥 Langste reeks", String(stats.streak)],
  ];
  sec.innerHTML = `<h3 class="panel-head">Jouw records</h3>
    <div class="records">${rows.map(([l, v]) =>
      `<div class="record"><span class="record-val">${v}</span><span class="record-label">${l}</span></div>`).join("")}</div>`;
}
function renderConsistency() {
  const grid = document.querySelector(".stats-grid");
  if (!grid) return;
  let sec = document.getElementById("consistencyStrip");
  if (!sec) {
    sec = document.createElement("section");
    sec.id = "consistencyStrip";
    sec.className = "panel consistency-panel reveal";
    grid.parentNode.insertBefore(sec, grid.nextSibling);
  }
  const todayIso = isoDate(new Date());
  const cw = currentWeek();
  let done = 0, total = 0;
  const cols = PLAN.map((w) => {
    const cells = w.sessions.map((s) => {
      const e = log[sid(w.week, s.day)] || {};
      const dIso = isoDate(sessionDate(w.week, s.day));
      total++;
      if (e.done) done++;
      const cls = e.done ? "is-done" : dIso < todayIso ? "is-missed" : "is-todo";
      return `<span class="ccell ${cls}${dIso === todayIso ? " is-today" : ""}" title="Week ${w.week} \u00b7 ${s.dayLabel}"></span>`;
    }).join("");
    return `<div class="cweek${w.week === cw ? " is-current" : ""}"><div class="ccells">${cells}</div><span class="cweek-no">${w.week}</span></div>`;
  }).join("");
  const pct = total ? Math.round((done / total) * 100) : 0;
  sec.innerHTML = `
    <h3 class="panel-head">Consistentie <span class="panel-sub">elk blokje is een training</span></h3>
    <div class="cweeks">${cols}</div>
    <div class="cons-foot">
      <div class="cons-legend"><span><i class="ck ck-done"></i>afgerond</span><span><i class="ck ck-missed"></i>gemist</span><span><i class="ck ck-todo"></i>komt nog</span></div>
      <span class="cons-score"><strong>${done}/${total}</strong> gedaan \u00b7 ${pct}%</span>
    </div>`;
}

/* ----- Schema opschuiven (drukke week) ------------------------------ */
const NL_MND = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
function weekOffset() { return (log && log.__weekOffset) || 0; }
function schedStartMs() { return START_DATE.getTime() + weekOffset() * 7 * 864e5; }
function weekDateLabel(w) {
  if (!weekOffset()) return w.dates;
  const mon = dateAtDay((w.week - 1) * 7), sun = dateAtDay((w.week - 1) * 7 + 6);
  return `${mon.getDate()} ${NL_MND[mon.getMonth()]}–${sun.getDate()} ${NL_MND[sun.getMonth()]}`;
}
function renderShiftControl() {
  const head = document.querySelector(".weeks .phase-head");
  if (!head) return;
  let el = document.getElementById("shiftControl");
  if (!el) {
    el = document.createElement("div");
    el.id = "shiftControl";
    el.className = "shift-control reveal";
    head.insertAdjacentElement("afterend", el);
  }
  const off = weekOffset();
  const wk = (n) => `${n} week${n > 1 ? "en" : ""}`;
  el.innerHTML = off > 0
    ? `<div class="shift-copy"><strong>Schema ${wk(off)} opgeschoven</strong><span>Je hele schema loopt nu ${wk(off)} langer. Niks staat op gemist.</span></div><div class="shift-btns"><button id="shiftMore" type="button">Nog een week</button><button id="shiftReset" type="button" class="ghost">Ongedaan maken</button></div>`
    : `<div class="shift-copy"><strong>Drukke week gehad?</strong><span>Schuif je hele schema een week op, dan raak je niks kwijt.</span></div><div class="shift-btns"><button id="shiftMore" type="button">Schuif 1 week op ↦</button></div>`;
  el.querySelector("#shiftMore").addEventListener("click", () => {
    log.__weekOffset = weekOffset() + 1; saveLog(); renderAll();
    toast("Schema een week opgeschoven 📅");
  });
  const rs = el.querySelector("#shiftReset");
  if (rs) rs.addEventListener("click", () => {
    log.__weekOffset = 0; saveLog(); renderAll();
    toast("Opschuiven ongedaan gemaakt");
  });
}

function renderAll() {
  const stats = computeStats();
  renderHero(stats);
  renderStats(stats);
  renderGreeting();
  renderConsistency();
  renderNextUp();
  renderPlanning();
  renderChart();
  renderZones();
  renderWeeks();
  addJumpButton();
  renderShiftControl();
  renderBadges(stats);
  renderRecords(stats);
  renderInfo();
  observeReveals();
}

/* ----- Detailweergave ------------------------------------------------ */
function openDetail(week, day) {
  const w = PLAN.find((x) => x.week === week);
  const s = w.sessions.find((x) => x.day === day);
  const id = sid(week, day);
  const e = log[id] || {};
  const z = zoneByKey[s.zone];
  const enteredTime = durationParts(e.time);

  $("detailTitle").textContent = `Week ${week} · ${s.dayLabel}`;
  $("detailBody").innerHTML = `
    <div class="detail-hero zone-${s.zone}">
      <span class="detail-kind">${s.kind} · ${s[UNIT]} ${UNIT_LABEL}</span>
      <h2>${s.title}</h2>
      <p class="detail-goal">${s.goal}</p>
      <span class="detail-zone">${z.name} · ${z.info}</span>
    </div>

    <div class="coach-bubble">
      <div class="coach-ava">
        <img src="${CONFIG.coachPhoto}" alt="${CONFIG.coachName}" onerror="this.style.display='none'">
        <span>${COACH_INITIAL}</span>
      </div>
      <div class="coach-text">
        <strong>${CONFIG.coachName} <span class="coach-handle">${CONFIG.coachHandle}</span></strong>
        <p>${coachLine(s.zone)}</p>
      </div>
    </div>

    <section class="detail-block why">
      <h4>${w.race || w.tuneup ? "Waarom deze wedstrijd" : "Waarom deze training"}</h4>
      <p>${s.why || WHY[s.zone] || ""}</p>
    </section>

    <section class="detail-block">
      <h4>Opbouw</h4>
      <ol class="block-list">${s.blocks.map((b) => `<li>${b}</li>`).join("")}</ol>
    </section>

    <section class="detail-block">
      <h4>${w.race || w.tuneup ? "Invullen na de wedstrijd" : "Invullen na de training"}</h4>
      <div class="form-grid">
        <label>Afstand (km)
          <input id="fDistance" type="text" inputmode="decimal" placeholder="bv. 6,2" value="${escapeHtml(e.distance ?? "")}">
        </label>
        <label>Tijd
          <span class="duration-input">
            <input id="fTimeMinutes" type="number" inputmode="numeric" min="0" max="999" placeholder="36" value="${enteredTime.minutes || ""}" aria-label="Minuten">
            <span>min</span>
            <input id="fTimeSeconds" type="number" inputmode="numeric" min="0" max="59" placeholder="30" value="${enteredTime.seconds || ""}" aria-label="Seconden">
            <span>sec</span>
          </span>
        </label>
        <label class="full">Gemiddeld tempo
          <output id="fPace" class="pace-out">${fmtPace(paceSeconds(e.distance, e.time)) || "–"}</output>
        </label>
        <label>Hartslag (bpm)
          <input id="fHr" type="number" inputmode="numeric" placeholder="bv. 152" value="${escapeHtml(e.hr ?? "")}">
        </label>
        <label>Gevoel / zwaarte
          <select id="fFeel">
            ${["", "1 · heel licht", "2 · licht", "3 · prima", "4 · pittig", "5 · zwaar"]
              .map((o) => `<option value="${o}" ${String(e.feel ?? "") === o ? "selected" : ""}>${o || "Kies…"}</option>`).join("")}
          </select>
        </label>
        <label class="full">Notitie
          <textarea id="fNote" rows="2" placeholder="Hoe ging het?">${escapeHtml(e.note ?? "")}</textarea>
        </label>
      </div>
    </section>

    <div class="detail-actions">
      <button id="toggleDone" class="btn-primary ${e.done ? "is-done" : ""}">${e.done ? "✓ Gedaan" : "Markeer als gedaan"}</button>
      <button id="saveSession" class="btn-ghost">Opslaan</button>
    </div>`;

  const readTime = () => {
    if (!$("fTimeMinutes").value && !$("fTimeSeconds").value) return "";
    return durationValue($("fTimeMinutes").value, $("fTimeSeconds").value);
  };
  const recalc = () => ($("fPace").textContent = fmtPace(paceSeconds($("fDistance").value, readTime())) || "–");
  $("fDistance").addEventListener("input", recalc);
  $("fTimeMinutes").addEventListener("input", recalc);
  $("fTimeSeconds").addEventListener("input", () => {
    if (+$("fTimeSeconds").value > 59) $("fTimeSeconds").value = "59";
    recalc();
  });

  const collect = () => ({
    ...log[id],
    distance: $("fDistance").value.trim(),
    time: readTime(),
    hr: $("fHr").value.trim(),
    feel: $("fFeel").value,
    note: $("fNote").value.trim(),
  });

  $("saveSession").addEventListener("click", () => {
    log[id] = collect(); saveLog();
    toast("Opgeslagen 💾");
    closeDetail();
  });
  $("toggleDone").addEventListener("click", () => {
    const cur = collect();
    cur.done = !cur.done;
    log[id] = cur; saveLog();
    if (cur.done) {
      celebrate();
      toast(w.finish ? "🏁 Gehaald! Wat een strijder!" : w.race ? "🏅 Finisher! Wat een prestatie, strijder!" : w.tuneup ? "🏁 Wedstrijd voltooid, sterk gepacet!" : DONE[Math.floor(Math.random() * DONE.length)]);
    }
    closeDetail();
  });

  showView("detail");
}

function closeDetail() { renderAll(); showView("list"); }

function showView(name) {
  const list = $("listView"), detail = $("detailView"), back = $("backButton");
  if (name === "detail") {
    list.classList.add("hidden");
    detail.classList.remove("hidden");
    requestAnimationFrame(() => detail.classList.add("is-in"));
    back.classList.remove("hidden");
    window.scrollTo(0, 0);
  } else {
    detail.classList.remove("is-in");
    back.classList.add("hidden");
    setTimeout(() => {
      detail.classList.add("hidden");
      list.classList.remove("hidden");
      window.scrollTo(0, 0);
    }, 280);
  }
}

/* ----- Invliegende beelden -------------------------------------------- */
let io, initialRevealDone = false;
function observeReveals() {
  // Na de eerste keer: nieuw getekende blokken meteen tonen (geen her-animatie bij navigeren)
  if (initialRevealDone) {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
    return;
  }
  io = io || new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
}

/* ----- Toast ----------------------------------------------------------- */
let toastT;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ----- Confetti --------------------------------------------------------- */
function celebrate() {
  const cv = $("confetti");
  const ctx = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;
  const cs = getComputedStyle(document.documentElement);
  const colors = ["--volt", "--flame", "--pastel-blue", "--violet"]
    .map((v) => cs.getPropertyValue(v).trim()).filter(Boolean).concat("#ffffff");
  const parts = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2, y: innerHeight / 3,
    vx: (Math.random() - 0.5) * 14, vy: Math.random() * -16 - 4,
    s: Math.random() * 7 + 4, c: colors[(Math.random() * colors.length) | 0],
    r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
  }));
  let frame = 0;
  (function loop() {
    frame++;
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach((p) => {
      p.vy += 0.45; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      ctx.restore();
    });
    if (frame < 120) requestAnimationFrame(loop);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  })();
}

/* ================================================================== *
 *  Init
 * ================================================================== */
/* Branding uit CONFIG zetten (zodat templaten makkelijk is) */
document.title = `${CONFIG.appName}, ${CONFIG.coachHandle}`;
if ($("appName")) $("appName").textContent = CONFIG.appName;
if ($("brandHandle")) $("brandHandle").textContent = CONFIG.coachHandle;
if ($("footCredit")) {
  $("footCredit").innerHTML =
    `<span class="catch">${CONFIG.catchphrase}</span>` +
    `Coaching door ${CONFIG.coachName} · TikTok <strong>${CONFIG.coachHandle}</strong> ${CONFIG.footEmoji || "🏃\u200d♀️"}`;
}

function setPlanningForm(open) {
  const form = $("planningForm");
  const toggle = $("togglePlanningForm");
  form.classList.toggle("hidden", !open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "× Sluiten" : "＋ Toevoegen";
  if (open && !$("planStart").value) $("planStart").value = isoDate(new Date());
}

$("togglePlanningForm").addEventListener("click", () => {
  setPlanningForm($("planningForm").classList.contains("hidden"));
});
$("cancelPlanning").addEventListener("click", () => setPlanningForm(false));
$("planningForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const start = $("planStart").value;
  const end = $("planEnd").value || start;
  if (end < start) {
    toast("De einddatum ligt vóór de startdatum");
    return;
  }
  const entry = {
    id: `plan-${Date.now()}`,
    type: $("planType").value,
    title: $("planTitle").value.trim(),
    start,
    end,
    note: $("planNote").value.trim(),
  };
  log.__planning = [...planningEntries(), entry];
  saveLog();
  $("planningForm").reset();
  setPlanningForm(false);
  renderAll();
  toast("Toegevoegd aan je schema 🗓️");
});

$("backButton").addEventListener("click", closeDetail);
$("resetButton").addEventListener("click", () => {
  if (confirm("Alle ingevulde voortgang wissen?")) { log = {}; saveLog(); renderAll(); toast("Voortgang gewist"); }
});

/* ----- Back-up: exporteren / importeren ------------------------------- */
function downloadJSON(filename, obj) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" }));
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function downloadText(filename, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function icsEscape(value) {
  return String(value || "")
    .replaceAll("\\", "\\\\")
    .replaceAll(/\r?\n/g, "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function icsDay(value) {
  const date = typeof value === "string" ? new Date(`${value}T12:00:00`) : value;
  return isoDate(date).replaceAll("-", "");
}

function addDays(value, amount) {
  const date = typeof value === "string" ? new Date(`${value}T12:00:00`) : new Date(value);
  date.setDate(date.getDate() + amount);
  return date;
}

function calendarFile() {
  const stamp = new Date().toISOString().replaceAll(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//bartlopen//Run Coach//NL",
    `X-WR-CALNAME:${icsEscape(CONFIG.appName)} · ${icsEscape(RUNNER)}`,
  ];
  flatSessions.forEach((session) => {
    const date = sessionDate(session.week, session.day);
    const z = zoneByKey[session.zone];
    lines.push(
      "BEGIN:VEVENT",
      `UID:${sid(session.week, session.day)}-${icsDay(date)}@bartlopen.nl`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDay(date)}`,
      `DTEND;VALUE=DATE:${icsDay(addDays(date, 1))}`,
      `SUMMARY:${icsEscape(`${CONFIG.footEmoji || "🏃\u200d♀️"} ${session.title}`)}`,
      `DESCRIPTION:${icsEscape(`${session[UNIT]} ${UNIT_LABEL} · ${z.name}\n${session.goal}\n\n${session.blocks.join("\n")}`)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  });
  planningEntries().forEach((entry) => {
    const meta = PLANNING_META[entry.type] || PLANNING_META.rest;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${icsEscape(entry.id)}@bartlopen.nl`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDay(entry.start)}`,
      `DTEND;VALUE=DATE:${icsDay(addDays(entry.end || entry.start, 1))}`,
      `SUMMARY:${icsEscape(`${meta.icon} ${entry.title}`)}`,
      `DESCRIPTION:${icsEscape(`${entry.note ? `${entry.note}\n\n` : ""}Coachadvies: ${meta.advice}`)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}
$("exportBtn").addEventListener("click", () => {
  downloadJSON(`${CONFIG.appName.replace(/\s+/g, "-")}-voortgang.json`, {
    app: "bartlopen-runcoach", storeKey: STORE_KEY, runner: RUNNER,
    exportedAt: new Date().toISOString(), log,
  });
  toast("Back-up opgeslagen ⬇︎");
});
$("importBtn").addEventListener("click", () => $("importFile").click());
$("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const incoming = data && data.log ? data.log : data;
      if (!incoming || typeof incoming !== "object") throw new Error("ongeldig");
      log = { ...log, ...incoming };
      saveLog(); renderAll();
      toast("Back-up geladen ⬆︎, welkom terug!");
    } catch {
      toast("Kon dit bestand niet lezen");
    }
    e.target.value = "";
  };
  reader.readAsText(file);
});

$("calendarBtn").addEventListener("click", () => {
  downloadText(`${CONFIG.appName.replace(/\s+/g, "-")}-schema.ics`, calendarFile(), "text/calendar;charset=utf-8");
  toast("Agenda-bestand staat klaar 🗓️");
});

$("pdfBtn").addEventListener("click", () => {
  document.body.classList.add("print-schema");
  const cleanup = () => document.body.classList.remove("print-schema");
  window.addEventListener("afterprint", cleanup, { once: true });
  window.print();
  setTimeout(cleanup, 1500);
});

/* Alles tekenen */
renderAll();
/* Na de intro-animatie geen her-fade meer; failsafe die alles zeker toont */
setTimeout(() => { initialRevealDone = true; }, 900);
setTimeout(() => document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in")), 1600);

/* Intro-splash netjes weg laten faden (tikken slaat 'm over) */
(function () {
  const splash = $("splash");
  if (!splash) return;
  const hide = () => splash.classList.add("gone");
  setTimeout(hide, 1100);
  splash.addEventListener("click", hide);
  setTimeout(() => splash.remove(), 1700);
})();

/* Service worker voor offline gebruik (alleen op http/https, niet via file://) */
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  /* Auto-verversen: nieuwe versie neemt over -> pagina herlaadt zichzelf een keer */
  const hadController = !!navigator.serviceWorker.controller;
  let autoReloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || autoReloaded) return;
    autoReloaded = true;
    window.location.reload();
  });
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
