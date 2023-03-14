import type { Actions } from './$types';

export const actions = {
	default: async ({request}) => {
		const data = await request.formData();
		return {
			body: 'Hello world!'
		};
	}
} satisfies Actions;
