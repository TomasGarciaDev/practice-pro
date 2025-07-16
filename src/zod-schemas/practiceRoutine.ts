import { createInsertSchema } from "drizzle-zod";
import { practiceRoutines } from "@/db/schema";

export const insertPracticeRoutineSchema = createInsertSchema(
  practiceRoutines,
  {
    userId: (schema) => schema.int().min(1, "User ID is required"),
    completed: (schema) => schema.optional().default(false),
  }
);

export const selectPracticeRoutineSchema = createInsertSchema(practiceRoutines);

export type insertPracticeRoutineSchemaType =
  typeof insertPracticeRoutineSchema._type;

export type selectPracticeRoutineSchemaType =
  typeof selectPracticeRoutineSchema._type;
