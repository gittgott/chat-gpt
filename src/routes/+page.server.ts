import { messageSchema } from "$lib/schemas/chatgpt";
import type { Actions } from "./$types";
import { messages } from "$lib/stores";
import { get } from "svelte/store";
import { fail } from "@sveltejs/kit";
import type { CreateChatCompletionResponse } from "openai";

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const query = data.get("query");

		if (!query) {
			return fail(400, { query, missing: true });
		}

		const message = messageSchema.safeParse([{ role: "user", content: query?.toString() }]);

		if (!message.success) {
			return {
				status: 400,
				body: "Invalid request"
			};
		}

		messages.update((messages) => [...messages, message.data[0]]);

		const response = await fetch("/chat", {
			method: "POST",
			body: JSON.stringify(get(messages))
		});
		const json: CreateChatCompletionResponse = await response.json();
		return {
			body: json.choices[0].message
		};
	}
} satisfies Actions;
