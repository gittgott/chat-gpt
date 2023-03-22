<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<h1>Welcome to ChatGPT Client</h1>
{#if form?.body && typeof form.body !== "string"}
	<p>{form.body.content}</p>
{/if}
<form method="POST" use:enhance>
	<textarea name="query" placeholder="Enter your query here" value={form?.query ?? ""} />
	{#if form?.missing}
		<p class="error">Please enter a query</p>
	{/if}
	<button type="submit">Send</button>
</form>

<style>
	.error {
		color: red;
		font-style: italic;
		font-size: small;
		margin: 0.25rem 0;
	}

	textarea {
		resize: none;
	}
</style>
