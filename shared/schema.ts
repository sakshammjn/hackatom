import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const simulationResults = pgTable("simulation_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  industry: text("industry").notNull(),
  useCase: text("use_case").notNull(),
  budget: real("budget").notNull(),
  timeframe: integer("timeframe").notNull(),
  facilitySize: real("facility_size").notNull(),
  roiPercentage: real("roi_percentage").notNull(),
  breakevenTime: real("breakeven_time").notNull(),
  emissionsSaved: real("emissions_saved").notNull(),
  traditionalCost: real("traditional_cost").notNull(),
  isotopeCost: real("isotope_cost").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const businessCases = pgTable("business_cases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  industry: text("industry").notNull(),
  useCase: text("use_case").notNull(),
  investmentEstimate: text("investment_estimate").notNull(),
  executiveSummary: text("executive_summary").notNull(),
  timeline: text("timeline").notNull(),
  expectedROI: real("expected_roi").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSimulationResultSchema = createInsertSchema(simulationResults).omit({
  id: true,
  createdAt: true,
});

export const insertBusinessCaseSchema = createInsertSchema(businessCases).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SimulationResult = typeof simulationResults.$inferSelect;
export type InsertSimulationResult = z.infer<typeof insertSimulationResultSchema>;
export type BusinessCase = typeof businessCases.$inferSelect;
export type InsertBusinessCase = z.infer<typeof insertBusinessCaseSchema>;
