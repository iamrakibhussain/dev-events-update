"use client";

import Image from "next/image";
import Link from "next/link";
import { captureEvent } from "@/lib/posthog";
const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>DevEvent</p>
        </Link>
        <ul className="list-none">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#events">Events</Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={() =>
                captureEvent("create_event_clicked", { source: "navbar" })
              }
            >
              Create Event
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
