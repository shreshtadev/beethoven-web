import { redirect, type Actions } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};
