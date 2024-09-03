import { z } from "zod";

const envSchema = z.object({
	CMS_ADMIN_EMAIL: z.string().email(),
	CMS_ADMIN_PASSWORD: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
