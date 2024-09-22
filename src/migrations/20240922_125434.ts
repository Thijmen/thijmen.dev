import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_nav_links_icon" AS ENUM('home', 'project', 'dashboard', 'blog', 'profile', 'analytics');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  UPDATE "nav_links" SET "icon" = 'home';
  ALTER TABLE "nav_links" ALTER COLUMN "icon" SET DATA TYPE enum_nav_links_icon;
  ALTER TABLE "nav_links" ALTER COLUMN "icon" SET NOT NULL;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "nav_links" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "nav_links" ALTER COLUMN "icon" DROP NOT NULL;`)
}
