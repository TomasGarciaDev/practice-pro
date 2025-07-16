import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { users } from "@/db/schema";

export const insertUserSchema = createInsertSchema(users, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  email: (schema) => schema.email("Invalid email address"),
  instrument: (schema) => schema.optional(),
  achievedGoals: (schema) => schema.optional().default(0),
});
export const selectUserSchema = createSelectSchema(users);

export const updateUserSchema = createUpdateSchema(users, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "Last name is required"),
  email: (schema) => schema.email("Invalid email address"),
  instrument: (schema) => schema.optional(),
  achievedGoals: (schema) => schema.optional().default(0),
});

export type insertUserSchemaType = typeof insertUserSchema._type;

export type selectUserSchemaType = typeof selectUserSchema._type;

export type updateUserSchemaType = typeof updateUserSchema._type;
