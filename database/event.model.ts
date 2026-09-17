import { model, models, Schema, type Document } from "mongoose";

export interface EventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const requiredTextFields = [
  "title",
  "description",
  "overview",
  "image",
  "venue",
  "location",
  "date",
  "time",
  "mode",
  "audience",
  "organizer",
] as const;

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeTime = (value: string): string => {
  const match = /^(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(value.trim());

  if (!match) {
    throw new Error("Event time must use HH:mm or HH:mm:ss format");
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) {
    throw new Error("Event time must be a valid 24-hour time");
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const eventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          value.length > 0 && value.every((item) => item.trim().length > 0),
        message: "Agenda must contain at least one non-empty item",
      },
    },
    organizer: { type: String, required: true, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          value.length > 0 && value.every((item) => item.trim().length > 0),
        message: "Tags must contain at least one non-empty item",
      },
    },
  },
  { timestamps: true },
);

eventSchema.index({ slug: 1 }, { unique: true });

eventSchema.pre("save", function (this: EventDocument): void {
  // Keep required text values meaningful even when validation is bypassed upstream.
  for (const field of requiredTextFields) {
    if (this[field].trim().length === 0) {
      throw new Error(`Event ${field} cannot be empty`);
    }
  }

  if (this.isNew || this.isModified("title")) {
    const slug = slugify(this.title);
    if (!slug) {
      throw new Error("Event title must contain letters or numbers");
    }

    // Generate a URL-friendly slug only for new events or changed titles.
    this.slug = slug;
  }

  // Normalize dates to a single ISO representation before persistence.
  const parsedDate = new Date(this.date);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Event date must be a valid date");
  }
  this.date = parsedDate.toISOString();
  this.time = normalizeTime(this.time);
});

export const Event = models.Event ?? model<EventDocument>("Event", eventSchema);
