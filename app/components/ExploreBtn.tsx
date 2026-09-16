"use client";

import Image from "next/image";
import { captureEvent } from "@/lib/posthog";

const ExploreBtn = () => {
  return (
    <a
      id="explore-btn"
      className="mt-7 mx-auto"
      href="#events"
      onClick={() =>
        captureEvent("explore_events_clicked", { source: "hero" })
      }
    >
      Explore Events
      <Image
        src="/icons/arrow-down.svg"
        alt="Arrow Down"
        width={24}
        height={24}
      />
    </a>
  );
};

export default ExploreBtn;
