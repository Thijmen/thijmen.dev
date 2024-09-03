import { getAvailableDevices } from "@/core/services/spotify";

export async function GET() {
	try {
		const response = await getAvailableDevices();

		return Response.json(response.data, {
			headers: {
				"Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
			},
			status: response.status,
		});
	} catch {
		return Response.json(
			{ message: "Internal Server Error" },
			{
				status: 500,
			},
		);
	}
}

export const dynamic = "force-dynamic";
