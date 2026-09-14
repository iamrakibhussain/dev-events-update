export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Alicante 2026",
    image: "/images/event1.png",
    slug: "react-alicante-2026",
    location: "Alicante, Spain",
    date: "September 24–26, 2026",
    time: "All day",
  },
  {
    title: "Hacktoberfest 2026",
    image: "/images/event2.png",
    slug: "hacktoberfest-2026",
    location: "Worldwide · Online and local events",
    date: "October 2026",
    time: "All month",
  },
  {
    title: "CityJS Athens 2026",
    image: "/images/event3.png",
    slug: "cityjs-athens-2026",
    location: "Athens, Greece",
    date: "October 21–23, 2026",
    time: "9:00 AM – 5:00 PM",
  },
  {
    title: "NASA Space Apps Challenge 2026",
    image: "/images/event4.png",
    slug: "nasa-space-apps-2026",
    location: "Worldwide · Local and virtual events",
    date: "November 14–15, 2026",
    time: "48-hour hackathon",
  },
  {
    title: "React Summit US 2026",
    image: "/images/event5.png",
    slug: "react-summit-us-2026",
    location: "New York, USA · Hybrid",
    date: "November 17 & 20, 2026",
    time: "In-person and remote days",
  },
];
