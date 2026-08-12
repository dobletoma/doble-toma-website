export type Category = "Boutique Hotels" | "Villas" | "Airbnbs" | "Wellness Retreats" | "Experiences";

export interface Project {
  id: string;
  title: string;
  location: string;
  category: Category;
  image: string;
  video?: string;
  tags: string[];
  wide?: boolean;
  aspect?: string;
}

export const projects: Project[] = [
  {
    id: "1b",
    title: "Casa Yuma",
    location: "Puerto Escondido, Oaxaca",
    category: "Boutique Hotels",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=85&auto=format&fit=crop",
    video: "/casa-yuma-breakfast.mp4",
    tags: ["Restaurant", "Reels"],
    aspect: "aspect-[9/16]",
  },
  {
    id: "2",
    title: "Casa Ohana",
    location: "Puerto Escondido, Oaxaca",
    category: "Villas",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=85&auto=format&fit=crop",
    video: "/casa-ohana-hero.mp4",
    tags: ["Reels", "Social Media"],
    aspect: "aspect-[9/16]",
  },
  {
    id: "7",
    title: "Casa Cauri",
    location: "Puerto Escondido, Oaxaca",
    category: "Villas",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=85&auto=format&fit=crop",
    video: "/casa-cauri.mp4",
    tags: ["Reels", "Social Media"],
    aspect: "aspect-[9/16]",
  },
  {
    id: "3",
    title: "Casa Naomi",
    location: "Puerto Escondido, Oaxaca",
    category: "Airbnbs",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=85&auto=format&fit=crop",
    video: "/casa-naomi.mp4",
    tags: ["Reels", "Social Media"],
    aspect: "aspect-[9/16]",
  },
  {
    id: "5",
    title: "Casa Lyuu",
    location: "Puerto Escondido, Oaxaca",
    category: "Airbnbs",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=700&q=85&auto=format&fit=crop",
    video: "/casa-lyuu.mp4",
    tags: ["Reels", "Trend"],
    aspect: "aspect-[9/16]",
  },
  {
    id: "1",
    title: "Casa Yuma",
    location: "Puerto Escondido, Oaxaca",
    category: "Boutique Hotels",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=85&auto=format&fit=crop",
    video: "/casa-yuma.mp4",
    tags: ["UGC", "Reels"],
    aspect: "aspect-[9/16]",
  },
  // Paused for now, per client request — bring back when asked:
  // {
  //   id: "4",
  //   title: "The Quiet House",
  //   location: "San Miguel de Allende, Mexico",
  //   category: "Wellness Retreats",
  //   image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=85&auto=format&fit=crop",
  //   tags: ["Strategy", "Video"],
  //   wide: true,
  // },
  // {
  //   id: "6",
  //   title: "Sunset Sessions",
  //   location: "Careyes, Mexico",
  //   category: "Experiences",
  //   image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=85&auto=format&fit=crop",
  //   tags: ["Video", "UGC"],
  // },
];
