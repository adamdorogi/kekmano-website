import type { StaticImageData } from "next/image";
import drainPhoto from "../assets/plates/drain-photo.png";
import womaPhoto from "../assets/plates/woma-photo.png";
import cameraPhoto from "../assets/plates/camera-photo.png";
import sourceReviews from "../content/reviews.json";

export const business = {
  name: "Kék Manó",
  company: "Kék Manó Csepi Kft.",
  person: "Csepregi Gyuri",
  phone: "+36 30 822 0869",
  phoneHref: "tel:+36308220869",
  email: "csepregigyuri@hotmail.com",
  address: "1104 Budapest, Kiskert utca 3. fsz. 1. ajtó",
  taxId: "32100264-1-42",
  companyId: "01-09-406599",
  maps: "https://maps.app.goo.gl/PuqStxH5YpbGpKfu7",
  reviews: "https://maps.app.goo.gl/qnU3wqLXEMc587mJ9",
  trustindex: "https://www.trustindex.io/reviews/kekmano.hu-1",
  logo: "/images/dugulaselharitas-budapest-kekmano-logo-3.png",
  portrait: "/images/kekmano-dugulaselharitas-budapest-csepregi-gyuri-4a.jpg",
} as const;

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  lead: string;
  image: string | StaticImageData;
  imageAlt: string;
  price: string;
  priceRows: [string, string][];
  introTitle: string;
  paragraphs: string[];
  applications: string[];
  equipment?: string;
};

export const services: Service[] = [
  {
    slug: "dugulaselharitas-budapest",
    title: "Duguláselhárítás Budapesten",
    shortTitle: "Duguláselhárítás",
    description:
      "Eldugult mosogató, WC vagy lefolyó? Szakszerű segítség, bontás nélkül, a hét minden napján.",
    lead: "Ne a dugulás körül forogjon a napja. Megkeressük és megszüntetjük a problémát, majd ellenőrizzük, hogy újra szabadon folyik-e a víz.",
    image: drainPhoto,
    imageAlt:
      "Újra szabadon lefolyó víz a Kék Manó által kitisztított mosogatóban",
    price: "34 990",
    priceRows: [
      ["Kád, zuhanytálca, padlóösszefolyó", "34 990"],
      ["WC és piszoár duguláselhárítása", "34 990"],
      ["Mosogató és mosdó lefolyójának tisztítása", "34 990"],
      ["Fő- és ejtővezeték spirálos tisztítása", "49 990"],
      ["Darálós WC javítása", "34 990"],
      ["Vízszivattyúzás", "34 990"],
    ],
    introTitle: "Szabad lefolyó. Nyugodtabb hétköznapok.",
    paragraphs: [
      "A visszatérő dugulásnak sokszor nem egyetlen oka van. A szakszerűtlenül kialakított csatornarendszerben – például egymás után beépített 90°-os könyököknél – könnyebben megül a zsír és a szennyeződés. A kevés öblítővíz tovább növelheti a lerakódások kialakulásának esélyét.",
      "A helyszíni állapotnak megfelelő géppel dolgozunk. A legtöbb háztartási dugulás bontás nélkül megszüntethető; a visszatérő hibák okát kamerás vizsgálattal is fel tudjuk tárni. Régi vagy sérült vezeték esetén a munka megkezdése előtt egyeztetünk a lehetőségekről.",
      "A szokásos helyszíni munka körülbelül 30–60 perc, nagyobb csatornatisztításnál 2–3 óra is lehet. A tisztítás végén átfolyási próbával ellenőrizzük az eredményt. Ha az érintett szakaszon 1–2 napon belül ismét jelentkezik a dugulás, kérjük, hívjon a garanciális egyeztetéshez.",
    ],
    applications: [
      "Mosogató és mosdó",
      "WC és piszoár",
      "Kád és zuhanytálca",
      "Padlóösszefolyó",
      "Fő- és ejtővezeték",
      "Vízszivattyúzás",
    ],
  },
  {
    slug: "woma-csatornatisztitas-budapest",
    title: "WOMA csatornatisztítás",
    shortTitle: "WOMA csatornatisztítás",
    description:
      "Makacs lerakódások ellen nagynyomású vízzel. Alapos csatornatisztítás, agresszív vegyszerek nélkül.",
    lead: "Amikor a spirál már kevés, a nagynyomású víz segít. A WOMA berendezés a cső belső faláról is eltávolítja a lerakódásokat.",
    image: womaPhoto,
    imageAlt:
      "A Kék Manó mobil csatornatisztító felszerelése a munkára előkészített autóban",
    price: "49 990",
    priceRows: [["WOMA csatornatisztítás nagynyomású mosóval", "49 990"]],
    introTitle: "Erős vízsugár. Alapos tisztítás.",
    paragraphs: [
      "A WOMA csatornatisztítás speciális nagynyomású mosóval történik. A saját, 25 lóerős motorral működő berendezésünk 150 bar nyomással dolgozik. A csőbe vezetett flexibilis tömlő és a megfelelő tisztítófej a lerakódásokat vízzel távolítja el, agresszív vegyi anyagok használata nélkül.",
      "Elsősorban a lakáson kívüli, nagyobb átmérőjű csatornákhoz, távolabbi vagy nehezen hozzáférhető dugulásokhoz alkalmazzuk. Lakossági, üzleti és ipari környezetben is segítséget jelenthet, különösen ott, ahol a spirálos tisztítás kockázatos lenne.",
      "A technológia zsíros lerakódásoknál, hordaléknál és gyökérbenövésnél is használható, de a sérült cső javítását nem helyettesíti. Gyökérbenövésnél az átjárhatóság helyreállítása átmeneti megoldás lehet: a hibás csőszakaszt cserélni kell. Nagyon régi vezetékeknél az alkalmazható nyomást és a tisztítás módját az állapothoz igazítjuk.",
      "A berendezés helyigénye miatt a hozzáférést előzetesen egyeztetjük. Rendszeres karbantartással csökkenthető a nagyobb lerakódások és váratlan dugulások kialakulásának esélye.",
    ],
    applications: [
      "Kültéri csatornahálózat",
      "Makacs zsíros lerakódás",
      "Nagyobb átmérőjű vezeték",
      "Társasház és üzlet",
      "Ipari csatornahálózat",
      "Megelőző karbantartás",
    ],
    equipment: "25 LE · 150 bar · vegyszermentes tisztítás",
  },
  {
    slug: "csatorna-kamerazas-budapest",
    title: "Csatorna kamerázás",
    shortTitle: "Csatorna kamerázás",
    description:
      "Lássuk, mi van a háttérben. A dugulás pontos helyének és okának felderítése, bontás nélkül.",
    lead: "Újra és újra eldugul a lefolyó? A csőkamera megmutatja, mi okozza a problémát, és pontosan hol van szükség beavatkozásra.",
    image: cameraPhoto,
    imageAlt:
      "REMS csőkamera kijelzője egy helyszíni kamerás csatornavizsgálat közben",
    price: "49 990",
    priceRows: [
      ["Kamerás csatornavizsgálat lakáson belül", "49 990"],
      ["Kamerás vizsgálat helymeghatározással, csőtörés bemérése", "49 990"],
    ],
    introTitle: "A jó megoldás a pontos oknál kezdődik.",
    paragraphs: [
      "A kamerás csatornavizsgálat során szennyvízálló kamerát és fényforrást vezetünk a csőbe. A monitoron valós időben látható a vezeték belső állapota; a felvételek rögzíthetők a későbbi értékeléshez is.",
      "A vizsgálattal felderíthető a lerakódás, építési törmelék, idegen tárgy, gyökérbenövés, repedés vagy beszakadt csőszakasz. A helymeghatározó segítségével a vezeték nyomvonaláról, mélységéről és a hiba helyéről is pontosabb képet kapunk.",
      "Visszatérő dugulás, csatorna menti talajsüllyedés, vizesedés, beázás vagy megmagyarázhatatlan csatornaszag esetén különösen hasznos a kamerázás. Új és használt ingatlan vásárlása előtt is érdemes ellenőriztetni a csatornahálózat állapotát és kialakítását.",
      "A kamera diagnosztikai eszköz: megmutatja a hibát, de a törött vagy szakszerűtlenül beépített vezetéket önmagában nem javítja meg. Ha csőtörést találunk, a hibás szakasz feltárására és cseréjére lehet szükség. A vizsgálat után elmondjuk, milyen beavatkozás indokolt.",
    ],
    applications: [
      "Visszatérő dugulás",
      "Csőtörés és repedés felderítése",
      "Vizesedés, beázás",
      "Idegen tárgy a vezetékben",
      "Nyomvonal-meghatározás",
      "Ingatlanvásárlás előtti ellenőrzés",
    ],
  },
];

export const testimonials = sourceReviews;

export const partners = [
  ["Eurostars Hotel", "kekmano-dugulaselharitas-budapest-eurostars-hotel.jpg"],
  ["Morrison’s 2", "kekmano-dugulaselharitas-morrisons2.jpg"],
  [
    "Marczibányi Téri Művelődési Központ",
    "kekmano-dugulaselharitas-marczibanyi-ter-muvelodesi-haz.jpg",
  ],
  ["3B Scientific", "kekmano-dugulaselharitas-3b-scientific.jpg"],
  ["Oriental Soup House", "kekmano-dugulaselharitas-oriental-soup-house.jpg"],
  ["Gödöllői Anyaotthon", "kekmano-dugulaselharitas-godolloi-anyaotthon.jpg"],
  ["P2 Club", "kekmano-dugulaselharitas-budapest-p2-club.jpg"],
  [
    "Zöldtetőépítő Kisvakond",
    "kekmano-dugulaselharitas-zoldtetoepito-kisvakond.jpg",
  ],
  [
    "Gyáli Egészségügyi Központ",
    "kekmano-dugulaselharitas-egeszsegugyi-kozpont-gyal.jpg",
  ],
  ["Dohány Kft.", "kekmano-dugulaselharitas-gyal-dohany-kft-jatek.jpg"],
];

export const commonFaqs = [
  {
    question: "Milyen gyorsan tudnak kiérni?",
    html: "<p>Budapesten és Pest megyében általában 1–2 órán belül érkezünk. Az aktuális elérhetőséget és a várható érkezést telefonon egyeztetjük. Hétvégén és ünnepnapokon is hívhat minket, 0–24 órában.</p>",
  },
  {
    question: "Mennyibe kerül a duguláselhárítás?",
    html: "<p>A háztartási duguláselhárítás 34 990 Ft-tól, a WOMA csatornatisztítás és a kamerás vizsgálat 49 990 Ft-tól érhető el. A pontos árat vagy az előzetes ársávot a hiba leírása alapján telefonon egyeztetjük. A részletes díjfeltételeket az egyes szolgáltatások árlistáján találja.</p>",
  },
  {
    question: "Van kiszállási díj vagy hétvégi felár?",
    html: "<p>Az elvégzett munkákhoz nem számítunk fel külön kiszállási, parkolási, folyóméter- vagy óradíjat. Ha a munka rajtunk kívül álló okból nem végezhető el, a külön feltételek érvényesek: munkavégzés nélkül Pesten belül 20 000 Ft, Pest megyében 30 000 Ft kiszállási díjat számítunk fel. A részleteket az áraknál olvashatja. Hétvégén és ünnepnapokon is elérhetők vagyunk; a végleges díjat mindig egyeztetjük.</p>",
  },
  {
    question: "Bontás nélkül is megoldható a dugulás?",
    html: "<p>A legtöbb hagyományos dugulást gépi spirállal vagy nagynyomású vízzel, bontás nélkül elhárítjuk. Sérült, eltört vagy szakszerűtlenül kiépített cső esetén azonban feltárásra és javításra lehet szükség. A visszatérő problémák okát kamerás vizsgálattal keressük meg.</p>",
  },
  {
    question: "Vállalnak garanciát a munkára?",
    html: "<p>Igen. A munka után ellenőrizzük a csatorna átjárhatóságát. Ha a tisztított szakaszon 1–2 napon belül újra jelentkezik a dugulás, kérjük, hívjon minket a garanciális ismételt munkavégzés egyeztetéséhez.</p>",
  },
];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kekmano.hu";
