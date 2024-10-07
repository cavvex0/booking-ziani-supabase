import { z } from "zod";

export const BookingSchema = z.object({
  id: z.string().optional(),
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

export type BookingSchemaType = z.infer<typeof BookingSchema>;
