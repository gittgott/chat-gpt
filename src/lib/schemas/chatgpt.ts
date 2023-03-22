import { z } from "zod";

export const messageSchema = z.array(
	z.object({
		role: z.enum(["user", "system", "assistant"]),
		content: z.string(),
		name: z.string().optional()
	})
);

export type Messages = z.infer<typeof messageSchema>;
