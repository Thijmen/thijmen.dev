import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "back_button_override_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_back_button_override_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "back_button_override_url";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_back_button_override_url";`)
}
