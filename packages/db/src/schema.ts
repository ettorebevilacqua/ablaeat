import { relations, sql } from "drizzle-orm";
import {
  boolean,
  smallint,
  integer,
  pgTable,
  pgSchema,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const AuthSchema = pgSchema("auth");

export const Users = AuthSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const Profiles = pgTable("profiles", {
	id: uuid("id").primaryKey().references(() => Users.id, { onDelete: "cascade" }),
	username: varchar("username", { length: 255 }),
	full_name:  varchar("full_name", { length: 255 }),
	avatar_url:  varchar("avatar_url", { length: 255 }),
	website: varchar("website", { length: 255 }),
	born: varchar("born", { length: 12 }),
	nation: varchar("nation", { length: 255 }),
	city: varchar("city", { length: 255 }),
	position : varchar("position", { length: 255 }),
	vote: smallint("vote"),
	aboutme: text("aboutme"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at", {
		mode: "date", withTimezone: true,
	}).$onUpdateFn(() => sql`now()`),
});

export const Post = pgTable("post", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: varchar("name", { length: 256 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdatePostSchema = createInsertSchema(Post, {
  id:z.string().min(1),
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  // id: true,
  createdAt: true,
  updatedAt: true,
});

export const Offers = pgTable("offers", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content"),
  idUser:  uuid("id_user").notNull().references(() => Profiles.id, { onDelete: "cascade" }),
  img: varchar("img", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});
/*
export const OffersRelations = relations(Offers, ({ one }) => ({
  user: one(Profiles, { fields: [Offers.userId], references: [Profiles.id] }),
}));
*/

export const CreateOffersSchema = createInsertSchema(Offers, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateOffersSchema = createInsertSchema(Offers, {
  id:z.string().min(1),
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  // id: true,
  idUser: true,
  createdAt: true,
  updatedAt: true,
});


/*
export const UserRelations = relations(User, ({ many }) => ({
  accounts: many(Account),
}));

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, { fields: [Account.userId], references: [User.id] }),
}));*/


export const OffersSub = pgTable("offers_sub", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  offerId: uuid("offerId").notNull().references(() => Offers.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content"),
  idUser: uuid("id_user").notNull().references(() => Profiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});
/*
export const OffersSubRelations = relations(OffersSub, ({ one }) => ({
  user: one(User, { fields: [OffersSub.userId], references: [Profiles.id] }),
  offer: one(Offers, { fields: [OffersSub.offerId], references: [Offers.id] }),
}));
*/

export const UserImages = pgTable("users_images", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }).notNull(),
  descr: text("descr"),
  img: varchar("img", { length: 256 }),
  vote: smallint("vote"),
  public: boolean('public').default(true),
  like: smallint("like"),
  id_user: uuid("id_user").notNull().references(() => Profiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});

export const OfferImages = pgTable("offer_images", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }).notNull(),
  descr: text("descr"),
  img: varchar("img", { length: 256 }),
  vote: smallint("vote"),
  public: boolean('public').default(true),
  like: smallint("like"),
  offerId: uuid("offer_id").notNull().references(() => Offers.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  }).$onUpdateFn(() => sql`now()`),
});
