import ig1 from "@/assets/ig/ig1.jpg.asset.json";
import ig2 from "@/assets/ig/ig2.jpg.asset.json";
import ig3 from "@/assets/ig/ig3.jpg.asset.json";
import ig4 from "@/assets/ig/ig4.jpg.asset.json";
import ig5 from "@/assets/ig/ig5.jpg.asset.json";
import ig6 from "@/assets/ig/ig6.jpg.asset.json";
import dressStanding from "@/assets/look-dress-standing.jpg";
import dressFlat from "@/assets/look-dress-flatlay.jpg";
import suitStanding from "@/assets/look-ivory-suit-standing.jpg";
import shirtDetail from "@/assets/look-tiger-shirt-detail.jpg";

export const media = {
  salon: ig1.url,
  sofa: ig2.url,
  carpet: ig3.url,
  trial: ig4.url,
  scissors: ig5.url,
  tiger: ig6.url,
  dressStanding,
  dressFlat,
  suitStanding,
  shirtDetail,
};

export type Product = {
  slug: string;
  name: string;
  collection: "menagerie" | "on-trial";
  price: number;
  line: string;
  description: string;
  details: string[];
  colours: { name: string; swatch: string }[];
  sizes: string[];
  images: string[];
};

export const products: Product[] = [
  {
    slug: "leopard-column-dress",
    name: "Leopard Column Dress",
    collection: "menagerie",
    price: 680,
    line: "Black silk satin, hand embroidered leopards",
    description:
      "A long column in liquid black satin, scattered with leopards stitched by hand in bronze thread. The collar is beaded in garnet red, the only loud thing about it.",
    details: ["Silk satin", "Hand embroidered motifs", "Beaded collar", "Concealed back zip", "Dry clean only"],
    colours: [{ name: "Noir", swatch: "oklch(0.16 0.008 40)" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [media.dressStanding, media.carpet, media.dressFlat],
  },
  {
    slug: "bengal-lounge-dress",
    name: "Bengal Lounge Dress",
    collection: "menagerie",
    price: 540,
    line: "Midi length, beaded collar",
    description:
      "Cut to be lived in: sat on, lain across, walked through. Embroidered Bengal cats prowl the hem and sleeves of a soft black satin midi.",
    details: ["Silk blend satin", "Three quarter sleeve", "Beaded garnet collar", "Relaxed fit"],
    colours: [
      { name: "Noir", swatch: "oklch(0.16 0.008 40)" },
      { name: "Oxblood", swatch: "oklch(0.3 0.09 18)" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [media.sofa, media.dressFlat, media.carpet],
  },
  {
    slug: "kiss-pinstripe-suit",
    name: "Kiss Pinstripe Suit",
    collection: "on-trial",
    price: 920,
    line: "Ivory pinstripe blazer and short",
    description:
      "Too playful for a serious suit? Ivory pinstripe tailoring, sharply cut, with red kisses embroidered across the jacket and short. Worn as a set or apart.",
    details: ["Wool blend pinstripe", "Single breasted", "Embroidered kiss motifs", "Tailored short included"],
    colours: [{ name: "Ivory", swatch: "oklch(0.94 0.02 85)" }],
    sizes: ["34", "36", "38", "40", "42"],
    images: [media.suitStanding, media.trial],
  },
  {
    slug: "tiger-patch-shirt",
    name: "Tiger Patch Shirt",
    collection: "menagerie",
    price: 460,
    line: "Silk twill, appliqued portrait patches",
    description:
      "A camp collar shirt in tiger stripe silk twill, patched with small framed tiger portraits. A collector's shirt for someone who keeps big cats in mind.",
    details: ["Silk twill", "Camp collar", "Applique patches", "Horn buttons"],
    colours: [{ name: "Amber", swatch: "oklch(0.6 0.12 60)" }],
    sizes: ["S", "M", "L", "XL"],
    images: [media.tiger, media.shirtDetail],
  },
];

export const collections = [
  {
    slug: "menagerie" as const,
    title: "The Menagerie",
    line: "Leopards, Bengals and tigers, stitched by hand onto black satin and silk.",
    cover: media.carpet,
    alt: media.tiger,
  },
  {
    slug: "on-trial" as const,
    title: "On Trial",
    line: "Tailoring put to the question: can a serious suit still be playful?",
    cover: media.trial,
    alt: media.suitStanding,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const formatPrice = (n: number) => `€${n.toLocaleString("en-US")}`;
