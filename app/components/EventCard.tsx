"use client";

import Link from "next/link";
import Image from "next/image";
import { captureEvent } from "@/lib/posthog";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ image, title, slug, location, date, time }: Props) => {
  return (
    <Link
      href={`/events/${slug}`}
      className="event-card"
      onClick={() =>
        captureEvent("event_selected", {
          event_slug: slug,
          event_location: location,
          event_date: date,
          event_time: time,
        })
      }
    >
      <Image
        src={image}
        alt={title}
        height={300}
        width={410}
        className="poster"
      />
      <div className="metadata-item">
        <Image src="/icons/pin.svg" alt="" height={14} width={14} />
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>
      <div className="datetime">
        <Image src="/icons/calendar.svg" alt="" height={14} width={14} />
        <p>{date}</p>
      </div>
      <div className="metadata-item">
        <Image src="/icons/clock.svg" alt="" height={14} width={14} />
        <p>{time}</p>
      </div>
    </Link>
  );
};

export default EventCard;
