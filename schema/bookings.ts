import { z } from "zod";

export const BookingSchema = z.object({
  hotel: z.string().min(3),
  reception: z.string(),
  createdBy: z.string(),
  soin: z.string(),
  people: z.string(),
  status: z.boolean().default(false),
  details: z.string(),
  deleted: z.boolean().default(false),
  date: z.date(),
  person: z.string(),
});
export const BookingSchemaTable = z.object({
  id: z.number(),
  hotel: z.string().min(3),
  reception: z.string(),
  createdBy: z.string(),
  soin: z.string(),
  people: z.string(),
  status: z.boolean().default(false),
  details: z.string(),
  deleted: z.boolean().default(false),
  date: z.date(),
  person: z.string(),
});
export const EditSchemaTable = z.object({
  id: z.number(),
  hotel: z.string().min(3),
  reception: z.string(),
  soin: z.string(),
  people: z.string(),
  details: z.string(),
  date: z.date(),
});

export type EditBookingSchemaType = z.infer<typeof EditSchemaTable>;
export type BookingSchemaType = z.infer<typeof BookingSchema>;
export type BookingSchemaTableType = z.infer<typeof BookingSchemaTable>;
