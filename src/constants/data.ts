import { BsPerson, BsCheckCircle } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";

import {
  FaRegEnvelope,
  FaInstagram,
  FaTiktok
} from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { HiOutlineLocationMarker } from 'react-icons/hi'

export const scrollSpeed = 15000;

const sharedNavItems = [
  { title: "Fête Des Mères", link: "/" },
  { title: "Bagues", link: "/products/bague" },
  { title: "Colliers", link: "/products/colliers" },
  { title: "Bracelets", link: "/products/bracelet" },
  { title: "Boucles d’oreilles", link: "/products/boucles-d-oreilles" },
  { title: "Diamant", link: "/products/diamant" },
  { title: "Mariage", link: "/products/mariage" },
];


export const navbarData = {
  desktopNavBarList: sharedNavItems,
  mobileNavBarList: [{ title: "HOMEPAGE", link: "/" }, ...sharedNavItems],
};


export const images = [
  '/images/img1.png',
  '/images/img2.png',
  '/images/img3.png',
];

export interface MegaMenuItem {
  label: string;
  image: string;
  types: string[];
}

export const SORT_OPTIONS = [
  { label: "Nouveautés", value: "created_at-desc" },
  { label: "Prix croissant", value: "price-asc" },
  { label: "Prix décroissant", value: "price-desc" },
  { label: "Le plus recherché", value: "is_featured-desc" },
];


export const megaMenuData = [
  {
    label: "Fête Des Mères",
    image: "/images/bg.jpg",
    subcategories: [
      {
        title: "Idées Cadeaux",
        items: ["Bagues", "Colliers", "Bracelets"]
      }
    ]
  },

  {
    label: "BRACELETS",
    image: "/images/bg.jpg",
    subcategories: [
      {
        title: "TYPE",
        items: [
          "Alliances",
          "Bagues de fiançailles",
          "Bagues de promesse",
          "Solitaires",
          "Chevalières",
          "Bagues simples",
          "Bagues empierrées",
          "Toutes les bagues"
        ]
      },
      {
        title: "MATIÈRE",
        items: [
          "Bagues en Or 18 carats",
          "Bagues en Argent",
          "Bagues Plaqué or",
          "Bagues en Acier Inoxydable",

        ]
      },

    ]
  },
  {
    label: "BAGUES",
    image: "/images/bg.jpg",
    subcategories: [
      {
        title: "TYPE",
        items: [
          "Alliances",
          "Bagues de fiançailles",
          "Bagues de promesse",
          "Solitaires",
          "Chevalières",
          "Bagues simples",
          "Bagues empierrées",
          "Toutes les bagues"
        ]
      },
      {
        title: "MATIÈRE",
        items: [
          "Bagues en Or 18 carats",
          "Bagues en Argent",
          "Bagues Plaqué or",
          "Bagues en Acier Inoxydable",

        ]
      },
      {
        title: "PIERRE",
        items: [
          "Bagues Diament",
          "Bagues Perles",
          "Bagues Oxyde",
          "Bagues Précieuses",

        ]
      },
      {
        title: "PRIX",
        items: [
          "Petits prix",
          "Entre 30000DA et 80000DA",
          "Entre 80000DA et 120000DA",
          "Entre 120000DA et 200000DA",
          "Plus de 200000DA",

        ]
      }
    ]
  },
  {
    label: "COLLIERS",
    image: "/images/bg.jpg",
    subcategories: [
      {
        title: "TYPE",
        items: [
          "Alliances",
          "Bagues de fiançailles",
          "Bagues de promesse",
          "Solitaires",
          "Chevalières",
          "Bagues simples",
          "Bagues empierrées",
          "Toutes les bagues"
        ]
      },
      {
        title: "MATIÈRE",
        items: [
          "Collier en Or 18 carats",
          "Collier en Argent",
          "Collier Plaqué or",
          "Collier en Acier Inoxydable",

        ]
      },
      {
        title: "PIERRE",
        items: [
          "Collier Diament",
          "Collier Perles",
          "Collier Oxyde",
          "Collier Précieuses",

        ]
      },
      {
        title: "PRIX",
        items: [
          "Petits prix",
          "Entre 30000DA et 80000DA",
          "Entre 80000DA et 120000DA",
          "Entre 120000DA et 200000DA",
          "Plus de 200000DA",

        ]
      }
    ]
  },
  {
    label: "BRACELETS",
    image: "/images/bg.jpg",
    subcategories: [
      {
        title: "TYPE",
        items: [
          "Alliances",
          "Bagues de fiançailles",
          "Bagues de promesse",
          "Solitaires",
          "Chevalières",
          "Bagues simples",
          "Bagues empierrées",
          "Toutes les bagues"
        ]
      },
      {
        title: "MATIÈRE",
        items: [
          "Or jaune",
          "Or blanc",
          "Or rose",
          "Argent",
          "Platine",
          "Titane"
        ]
      },

    ]
  },
  {
    label: "boucles-d-oreilles",
    image: "/images/bg.jpg",
    subcategories: [
      {
        title: "TYPE",
        items: [
          "Alliances",
          "Bagues de fiançailles",
          "Bagues de promesse",
          "Solitaires",
          "Chevalières",
          "Bagues simples",
          "Bagues empierrées",
          "Toutes les bagues"
        ]
      },
      {
        title: "MATIÈRE",
        items: [
          "Or jaune",
          "Or blanc",
          "Or rose",
          "Argent",
          "Platine",
          "Titane"
        ]
      },

    ]
  },
  {
    label: "diamant",
    image: "/images/bg.jpg",
    subcategories: [
      {
        title: "TYPE",
        items: [
          "Alliances",
          "Bagues de fiançailles",
          "Bagues de promesse",
          "Solitaires",
          "Chevalières",
          "Bagues simples",
          "Bagues empierrées",
          "Toutes les bagues"
        ]
      },
      {
        title: "MATIÈRE",
        items: [
          "Or jaune",
          "Or blanc",
          "Or rose",
          "Argent",
          "Platine",
          "Titane"
        ]
      },

    ]
  },
  {
    label: "Mariage",
    image: "/images/bg.jpg",
    subcategories: [
      {
        title: "TYPE",
        items: [
          "Alliances",
          "Bagues de fiançailles",
          "Bagues de promesse",
          "Solitaires",
          "Chevalières",
          "Bagues simples",
          "Bagues empierrées",
          "Toutes les bagues"
        ]
      },
      {
        title: "MATIÈRE",
        items: [
          "Or jaune",
          "Or blanc",
          "Or rose",
          "Argent",
          "Platine",
          "Titane"
        ]
      },

    ]
  },

];

export const globalFilters: {
  filters: {
    title: string;
    options: string[];
  }[];
} = {
  filters: [
    {
      title: "Prix",
      options: [
        "Petits prix",
        "Entre 30 000 DA et 80 000 DA",
        "Entre 80 000 DA et 120 000 DA",
        "Entre 120 000 DA et 200 000 DA",
        "Plus de 200 000 DA",
      ],
    },
    {
      title: "Catégories",
      options: [
        "Bijoux",
        "Bague",
        "Boucles d’oreilles",
        "Bracelets",
        "Colliers",
        "Diamants",
      ],
    },
    {
      title: "Type d'or",
      options: ["18k local", "22k", "24k"],
    },
    {
      title: "Marque",
      options: ["Tiffany & Co.", "Guess", "Cartier"],
    },
  ],
};



export const accordionItems = [
  {
    title: "Quelle est la différence entre l’or 18K, 21K et 24K ?",
    content:
      "Quelle est la différence entre l’or 18K, 21K et 24K ?",
  },
  {
    title: "Est-ce que l'achat d'or est un bon investissement ?",
    content:
      "Est-ce que l'achat d'or est un bon investissement ?",
  },
  {
    title: "Fournissez-vous un certificat d’authenticité avec les bijoux ?",
    content:
      "Fournissez-vous un certificat d’authenticité avec les bijoux ?",
  },
  {
    title: "Puis-je personnaliser le design de mon bijou ?",
    content:
      "Puis-je personnaliser le design de mon bijou ?",
  },
  {
    title: "Quelle est votre politique de retour ou d’échange ?",
    content:
      "Quelle est votre politique de retour ou d’échange ?",
  },
  {
    title: "Livrez-vous à l’international ?",
    content:
      "Livrez-vous à l’international ?",
  },
];

export const socialLinks = [
  {
    title: "Facebook",
    link: "https://www.facebook.com/name",
    icons: FiFacebook,
    iconColor: "#0A142F",
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/microbrains.tech/",
    icons: FaInstagram,
    iconColor: "#0A142F",
  },
  {
    title: "Tiktok",
    link: "https://www.Tiktok.com/",
    icons: FaTiktok,
    iconColor: "#0A142F",
  },

];



export const contactLinks = [
  {
    title: "+213 123 456 789",
    link: "",
    icons: FiPhone,
    iconColor: "#0A142F",
  },
  {
    title: "Contact@moussaoui.com",
    link: "",
    icons: FaRegEnvelope,
    iconColor: "#0A142F",
  },
  {
    title: "Jijel,Jijel,Algeria",
    link: "",
    icons: HiOutlineLocationMarker,
    iconColor: "#0A142F",
  },

];




export const textScroll = [
  "Cartier",
  "Tiffany",
  "Bvlgari",
  "Chopard",
  "Van Cleef & Arpels",
  "Graff",
  "Piaget",
  "Damas",
  "L’azurde",
  "Taiba Jewellery",
  "Jawhara",

];

export const steps = [
  { label: "Confirmer le produit", icon: FiShoppingBag },
  { label: "Informations personnelles", icon: BsPerson },
  { label: "Confirmation finale", icon: BsCheckCircle },
];