import Image from "next/image";
import { notFound } from "next/navigation";

const event = {
  image: "/images/event1.png",
  title: "event1",
  location: "location 1",
  date: "date 1",
  time: "time 1",
};

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== "event-1") notFound();

  return (
    <section id="event">
      <div className="header">
        <h1>{event.title}</h1>
        <p>{event.location}</p>
        <p>{event.date}</p>
        <p>{event.time}</p>
      </div>
      <Image
        src={event.image}
        alt={event.title}
        width={1200}
        height={800}
        className="banner"
      />
    </section>
  );
}
