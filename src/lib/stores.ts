import { writable } from "svelte/store";
import type { Messages } from "$lib/schemas/chatgpt";

export const messages = writable<Messages>([]);
