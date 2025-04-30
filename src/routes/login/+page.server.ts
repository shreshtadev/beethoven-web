import { redirect, type Actions } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};

export const actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

		try {
			const { token } = await locals.pb.collection('users').authWithPassword(email, password);
            if(!token) {
                console.error('Error:', 'UnAuthorized');
                return {
                    error: true,
                    email: null
                }
            }
		} catch (err) {
			console.error('Error:', err);
			return {
				error: true,
				email: email
			};
		}
		throw redirect(303, '/');
	}
} satisfies Actions;
