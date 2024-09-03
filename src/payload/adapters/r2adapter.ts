import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";

export const r2Adapter = s3Adapter({
	config: {
		endpoint: process.env.S3_ENDPOINT,
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY_ID!,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
		},
		// ... Other S3 configuration
		region: "auto",
	},
	bucket: process.env.S3_BUCKET!,
});
