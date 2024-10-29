import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "dynamiccontent" jsonb;
  ALTER TABLE "_projects_v" ADD COLUMN "version_dynamiccontent" jsonb;
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_description";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "description" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_description" varchar;
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "dynamiccontent";
  ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_dynamiccontent";`)
}
