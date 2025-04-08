import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  instrument: varchar("instrument", { length: 50 }),
  achievedGoals: integer("achieved_goals"),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const practiceRoutines = pgTable("practice_routines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const practiceItems = pgTable("practice_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  practiceRoutineId: integer("practice_routine_id")
    .notNull()
    .references(() => practiceRoutines.id, { onDelete: "cascade" }),
  excercise: varchar("excercise", { length: 200 }).notNull(),
  application: text("application"),
  goal: varchar("goal", { length: 150 }).notNull(),
  metronomeRange: varchar("metronome_range", { length: 100 }),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const practiceLogs = pgTable("practice_logs", {
  id: serial("id").primaryKey(),
  practiceItemId: integer("practice_item_id")
    .notNull()
    .references(() => practiceItems.id, { onDelete: "cascade" }),
  excercise: varchar("excercise", { length: 100 }).notNull(),
  metronome: varchar("metronome", { length: 30 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Create relations
export const usersRelations = relations(users, ({ many }) => ({
  practiceRoutines: many(practiceRoutines),
  practiceItems: many(practiceItems),
  practiceLogs: many(practiceLogs),
}));

export const practiceRoutinesRelations = relations(
  practiceRoutines,
  ({ one, many }) => ({
    user: one(users, {
      fields: [practiceRoutines.userId],
      references: [users.id],
    }),
    practiceItems: many(practiceItems),
  })
);

export const practiceItemsRelations = relations(
  practiceItems,
  ({ one, many }) => ({
    user: one(users, {
      fields: [practiceItems.userId],
      references: [users.id],
    }),
    practiceRoutine: one(practiceRoutines, {
      fields: [practiceItems.practiceRoutineId],
      references: [practiceRoutines.id],
    }),
    practiceLogs: many(practiceLogs),
  })
);

export const practiceLogsRelations = relations(practiceLogs, ({ one }) => ({
  practiceItem: one(practiceItems, {
    fields: [practiceLogs.practiceItemId],
    references: [practiceItems.id],
  }),
}));
