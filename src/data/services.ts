export interface ServiceOption {
  name: string;
  price: number;
  duration: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: string;
  baseDuration: string;
  options: ServiceOption[];
}

export const services: Service[] = [
  {
    id: "knotless-braids",
    name: "Knotless Braids",
    description: "All prices include hair.",
    basePrice: "From $200",
    baseDuration: "2 hr+",
    options: [
      { name: "Jumbo Knotless", price: 200, duration: "2 hr" },
      { name: "Large mid-back", price: 250, duration: "3 hr" },
      { name: "Medium mid-back", price: 300, duration: "4 hr" },
      { name: "Small Medium mid-back", price: 350, duration: "4 hr" },
      { name: "Small mid-back", price: 400, duration: "5 hr" },
    ],
  },
  {
    id: "cornrows-men",
    name: "Cornrows for Men",
    description:
      "Straight back cornrows ONLY. Send a picture for designed style pricing. Hair must be at least 5 inches.",
    basePrice: "Price varies",
    baseDuration: "1 hr",
    options: [],
  },
  {
    id: "crochet",
    name: "Crochet",
    description: "Client provides the crochet hair.",
    basePrice: "$160",
    baseDuration: "2 hr",
    options: [{ name: "Crochet", price: 160, duration: "2 hr" }],
  },
  {
    id: "passion-senegalese-twist",
    name: "Passion/Senegalese Twist",
    description: "All prices include hair.",
    basePrice: "From $250",
    baseDuration: "3 hr+",
    options: [
      { name: "Large", price: 250, duration: "3 hr" },
      { name: "Medium", price: 300, duration: "4 hr" },
      { name: "Small Medium", price: 350, duration: "4 hr" },
      { name: "Small", price: 400, duration: "5 hr" },
    ],
  },
  {
    id: "women-cornrows",
    name: "Women Cornrows (6–8)",
    description: "All prices include hair.",
    basePrice: "From $100",
    baseDuration: "1 hr+",
    options: [
      { name: "Cornrows without hair (6–7 cornrows)", price: 100, duration: "1 hr" },
      { name: "Stitch Braids with hair (6–8 cornrows)", price: 140, duration: "1 hr 30 min" },
    ],
  },
  {
    id: "faux-locs-synthetic",
    name: "Faux-Locs or Butterfly Locs – Synthetic Hair",
    description: "All prices include hair.",
    basePrice: "From $270",
    baseDuration: "3 hr 30 min+",
    options: [
      { name: "Large", price: 270, duration: "3 hr 30 min" },
      { name: "Medium", price: 320, duration: "4 hr" },
      { name: "Small", price: 380, duration: "5 hr" },
    ],
  },
  {
    id: "french-pochahontas",
    name: "French/Pochahontas Braids",
    description: "All prices include hair.",
    basePrice: "From $80",
    baseDuration: "1 hr",
    options: [
      { name: "2 French Braids", price: 80, duration: "1 hr" },
      { name: "4 French Braids", price: 100, duration: "1 hr" },
      { name: "2 Stitch French Braids", price: 100, duration: "1 hr" },
    ],
  },
  {
    id: "bohemian-knotless",
    name: "Bohemian Knotless Braids with Human Hair Curls",
    description: "All prices include hair.",
    basePrice: "From $320",
    baseDuration: "3 hr 30 min+",
    options: [
      { name: "Large", price: 320, duration: "3 hr 30 min" },
      { name: "Medium", price: 380, duration: "4 hr" },
      { name: "Small-Medium", price: 420, duration: "4 hr" },
      { name: "Small", price: 470, duration: "5 hr" },
    ],
  },
  {
    id: "french-curls-box-braids",
    name: "French Curls Box Braids",
    description: "All prices include hair.",
    basePrice: "Price varies",
    baseDuration: "3 hr 30 min+",
    options: [],
  },
  {
    id: "knotless-feedins",
    name: "Knotless Braids with Feedins",
    description: "All prices include hair.",
    basePrice: "From $250",
    baseDuration: "3 hr+",
    options: [
      { name: "Large", price: 250, duration: "3 hr" },
      { name: "Medium", price: 300, duration: "4 hr" },
      { name: "Small", price: 380, duration: "5 hr" },
    ],
  },
  {
    id: "kinky-twist",
    name: "Kinky Twist Extensions (Shoulder length)",
    description: "All prices include hair EXCEPT human hair.",
    basePrice: "$400",
    baseDuration: "5 hr",
    options: [{ name: "Kinky Twist Extensions", price: 400, duration: "5 hr" }],
  },
  {
    id: "box-braids",
    name: "Box Braids",
    description: "All prices include hair.",
    basePrice: "From $250",
    baseDuration: "2 hr 30 min+",
    options: [
      { name: "Large", price: 250, duration: "3 hr" },
      { name: "Medium", price: 300, duration: "4 hr" },
      { name: "Small", price: 400, duration: "5 hr" },
    ],
  },
  {
    id: "two-strand-twist-men",
    name: "Two Strand Twist on Natural Hair for Men",
    description: "No hair added.",
    basePrice: "From $100",
    baseDuration: "1 hr+",
    options: [
      { name: "Medium", price: 100, duration: "1 hr" },
      { name: "Small", price: 140, duration: "2 hr" },
    ],
  },
  {
    id: "feedins-braids",
    name: "Feedins Braids",
    description: "All prices include hair.",
    basePrice: "From $150",
    baseDuration: "2 hr+",
    options: [
      { name: "Feedins straightback – Medium", price: 150, duration: "2 hr" },
      { name: "Feedins in a bun/ponytail – Medium", price: 200, duration: "3 hr" },
      { name: "Feedins in a bun/ponytail – Small", price: 250, duration: "4 hr" },
    ],
  },
  {
    id: "lemonade-braids",
    name: "Lemonade Braids",
    description: "All prices include hair.",
    basePrice: "From $180",
    baseDuration: "3 hr+",
    options: [
      { name: "Medium", price: 180, duration: "3 hr" },
      { name: "Small", price: 220, duration: "3 hr 30 min" },
    ],
  },
  {
    id: "shampoo-wash",
    name: "Shampoo Wash & Blow-Dry",
    description: "Hair must be detangled.",
    basePrice: "$50",
    baseDuration: "1 hr",
    options: [{ name: "Shampoo Wash & Blow-Dry", price: 50, duration: "1 hr" }],
  },
  {
    id: "braids-takedown",
    name: "Braids Take Down",
    description: "",
    basePrice: "From $100",
    baseDuration: "1 hr 30 min+",
    options: [
      { name: "Medium", price: 100, duration: "1 hr 30 min" },
      { name: "Small", price: 150, duration: "2 hr" },
    ],
  },
  {
    id: "touchup-knotless",
    name: "Braids Touch-Up – Knotless Braids",
    description: "Prices assume medium braids. Reach out for Small or Smedium pricing.",
    basePrice: "From $120",
    baseDuration: "1 hr 30 min+",
    options: [
      { name: "2 rows", price: 120, duration: "1 hr 30 min" },
      { name: "3 rows", price: 150, duration: "2 hr" },
      { name: "4 rows", price: 180, duration: "2 hr" },
    ],
  },
  {
    id: "touchup-bohemian",
    name: "Braids Touch-Up – Bohemian Knotless Braids",
    description:
      "Prices assume medium braids. Take down the number of rows you booked, wash and blow dry before appointment.",
    basePrice: "From $160",
    baseDuration: "2 hr+",
    options: [
      { name: "2 rows", price: 160, duration: "2 hr" },
      { name: "4 rows", price: 200, duration: "3 hr" },
    ],
  },
  {
    id: "faux-locs-human",
    name: "Faux-Locs – Human Hair",
    description: "All prices include hair.",
    basePrice: "From $320",
    baseDuration: "3 hr 30 min+",
    options: [
      { name: "Large", price: 320, duration: "3 hr 30 min" },
      { name: "Medium", price: 380, duration: "4 hr" },
      { name: "Small", price: 470, duration: "5 hr" },
    ],
  },
  {
    id: "knotless-designed-feedins",
    name: "Knotless Braids with Designed Feedins",
    description: "",
    basePrice: "From $330",
    baseDuration: "4 hr+",
    options: [
      { name: "Medium", price: 330, duration: "4 hr" },
      { name: "Small", price: 380, duration: "5 hr" },
    ],
  },
  {
    id: "bob-bohemian",
    name: "Bob Bohemian Knotless Braids with Human Curls",
    description: "",
    basePrice: "From $320",
    baseDuration: "3 hr 30 min+",
    options: [
      { name: "Large", price: 320, duration: "3 hr 30 min" },
      { name: "Medium", price: 380, duration: "4 hr" },
      { name: "Smedium", price: 420, duration: "4 hr" },
      { name: "Small", price: 470, duration: "5 hr" },
    ],
  },
  {
    id: "bohemian-feedins",
    name: "Bohemian Knotless Braids with Feedins",
    description: "",
    basePrice: "From $320",
    baseDuration: "3 hr 30 min+",
    options: [
      { name: "Large", price: 320, duration: "3 hr 30 min" },
      { name: "Medium", price: 380, duration: "4 hr" },
      { name: "Smedium", price: 420, duration: "4 hr" },
      { name: "Small", price: 470, duration: "5 hr" },
    ],
  },
  {
    id: "bora-bora",
    name: "Bora Bora Braids",
    description: "Bohemian with extra human hair curls.",
    basePrice: "From $370",
    baseDuration: "4 hr+",
    options: [
      { name: "Large", price: 370, duration: "4 hr" },
      { name: "Medium", price: 470, duration: "5 hr" },
      { name: "Smedium", price: 650, duration: "6 hr" },
      { name: "Small", price: 750, duration: "7 hr" },
    ],
  },
  {
    id: "boho-french-curls",
    name: "Boho French Curls",
    description: "",
    basePrice: "From $350",
    baseDuration: "3 hr 30 min+",
    options: [
      { name: "Large", price: 350, duration: "3 hr 30 min" },
      { name: "Medium", price: 400, duration: "4 hr" },
      { name: "Smedium", price: 450, duration: "4 hr" },
      { name: "Small", price: 500, duration: "5 hr" },
    ],
  },
  {
    id: "cornrows-sewin-crochet",
    name: "Cornrows/Sew-in or Cornrows/Crochet",
    description: "$250 is the minimum for this style depending on the design.",
    basePrice: "$250+",
    baseDuration: "3 hr",
    options: [{ name: "Cornrows/Sew-in or Cornrows/Crochet", price: 250, duration: "3 hr" }],
  },
  {
    id: "miracle-knots",
    name: "Miracle Knots",
    description: "Hair included in the price.",
    basePrice: "From $400",
    baseDuration: "4 hr+",
    options: [
      { name: "Medium", price: 400, duration: "4 hr" },
      { name: "Smedium", price: 450, duration: "4 hr" },
      { name: "Small", price: 500, duration: "4 hr 30 min" },
    ],
  },
  {
    id: "mens-box-braids",
    name: "Men's Box Braids",
    description: "",
    basePrice: "From $100",
    baseDuration: "1 hr+",
    options: [
      { name: "Medium", price: 100, duration: "1 hr" },
      { name: "Small", price: 150, duration: "2 hr" },
    ],
  },
];
