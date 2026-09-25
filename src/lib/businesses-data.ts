import heroImg from "@/assets/hero-slide-1.jpg";

export type Business = {
  id: string;
  name: string;
  location: string;
  category: string;
  tag: string;
  img: string;
};

export const categories = ["All", "Construction & Real Estate", "Hotels & Restaurants", "Retail & Grocery"] as const;

export const businesses: Business[] = [
  { id: "1", name: "Kohali Buildcon Pvt Ltd", location: "Pune, Maharashtra", category: "Construction & Real Estate", tag: "Construction", img: heroImg },
  { id: "2", name: "Hotel Royal Palace", location: "Mumbai, Maharashtra", category: "Hotels & Restaurants", tag: "Hospitality", img: heroImg },
  { id: "3", name: "Kohali Supermart", location: "Nagpur, Maharashtra", category: "Retail & Grocery", tag: "Retail", img: heroImg },
];