import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { openai } from "$lib/utils/openai";
import { messageSchema, type Messages } from "$lib/schemas/chatgpt";
import { isAxiosError } from "axios";

export const POST = (async ({ request }) => {
	const requestData = await request.json();

	const userSuppliedMessages = messageSchema.safeParse(requestData);

	if (!userSuppliedMessages.success) {
		return json({ error: userSuppliedMessages.error.issues }, { status: 400 });
	}

	const messages: Messages = [...userSuppliedMessages.data];

	const response = await (async () => {
		try {
			const message = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages
			});
			return message.data;
		} catch (e) {
			if (isAxiosError(e)) {
				throw new Error({ ...e.response?.data });
			}
			throw new Error("An unknown error occurred")
		}
	})();

	return json(response);
}) satisfies RequestHandler;
