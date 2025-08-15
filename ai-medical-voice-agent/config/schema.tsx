import SuggestedDoctorCard from "@/app/(routes)/dashboard/_components/SuggestedDoctorCard";
import { integer, pgTable,json,text, varchar } from "drizzle-orm/pg-core";
import { number } from "motion";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits:integer ()
});


export const SessionChatTable=pgTable('SessionChatTable',{

  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId:varchar().notNull(),
  notes:text(),
  selectedDoctor: json(),
  conversation:json(),
  createdBy: varchar({ length: 255 }).references(() => usersTable.email),
  createdOn:varchar(),
  report:text()

})