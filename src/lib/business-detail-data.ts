import heroImg from "@/assets/hero-slide-1.jpg";

export type BusinessDetail = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  isOpen: boolean;
  phone: string;
  whatsapp: string;
  address: string;
  mapsUrl?: string;
  ownerName: string;
  ownerId: string;
  about: string;
  img: string;
};

export const businessDetails: Record<string, BusinessDetail> = {
  "1": {
    id: "1",
    name: "Kohali Buildcon Pvt Ltd",
    category: "Construction & Real Estate",
    rating: 4.8,
    reviews: 120,
    isOpen: true,
    phone: "+919876543210",
    whatsapp: "919876543210",
    address: "123 Heritage Marg, Kohali Enclave, Pune, Maharashtra 411038",
    mapsUrl: "https://maps.google.com",
    ownerName: "Rajesh Kohali",
    ownerId: "prakash-balbudhe",
    about: "Kohali Buildcon has been serving the community for over 15 years, delivering quality construction projects with a focus on trust and craftsmanship.",
    img: heroImg,
  },
  "2": {
    id: "2",
    name: "Hotel Royal Palace",
    category: "Hotels & Restaurants",
    rating: 4.5,
    reviews: 86,
    isOpen: true,
    phone: "+919876543211",
    whatsapp: "919876543211",
    address: "45 MG Road, Colaba, Mumbai, Maharashtra 400001",
    mapsUrl: "https://maps.google.com",
    ownerName: "Amol Mungmode",
    ownerId: "amol-mungmode",
    about: "A landmark hospitality venue known for banquet halls and community event hosting, run by the Kohali family since 2008.",
    img: heroImg,
  },
  "3": {
    id: "3",
    name: "Kohali Supermart",
    category: "Retail & Grocery",
    rating: 4.6,
    reviews: 210,
    isOpen: false,
    phone: "+919876543212",
    whatsapp: "919876543212",
    address: "Plot 7, Gawande Layout, Ring Road, Narendranagar, Nagpur 440027",
    ownerName: "Manikrao Lothe",
    ownerId: "manikrao-lothe",
    about: "Kohali Supermart has been serving the community for over 15 years, providing fresh groceries, daily essentials, and specialty cultural items.",
    img: heroImg,
  },
};