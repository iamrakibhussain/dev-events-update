import {
  model,
  models,
  Schema,
  Types,
  type Document,
} from "mongoose";
import { Event } from "./event.model";

export interface BookingDocument extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<BookingDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [emailPattern, "Please provide a valid email address"],
    },
  },
  { timestamps: true },
);

bookingSchema.pre("save", async function (this: BookingDocument): Promise<void> {
  if (!emailPattern.test(this.email.trim())) {
    throw new Error("Please provide a valid email address");
  }

  // Verify the referenced event exists before creating the booking.
  const eventExists = await Event.exists({ _id: this.eventId });
  if (!eventExists) {
    throw new Error("Cannot create a booking for an event that does not exist");
  }
});

export const Booking =
  models.Booking ?? model<BookingDocument>("Booking", bookingSchema);
