import { Payload } from "payload";
import env from "../../../../../env";

export const UserSeeder = async (payload: Payload) => {
	const existingUsers = await payload.find({
		collection: "users",
		limit: 1,
	});

	if (existingUsers.docs.length === 0) {
		await payload.create({
			collection: "users",
			data: {
				email: env.CMS_ADMIN_EMAIL,
				password: env.CMS_ADMIN_PASSWORD,
			},
		});
	}
};
