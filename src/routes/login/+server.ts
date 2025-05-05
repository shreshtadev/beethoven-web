import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	try {
		const { token } = await locals.pb.collection('users').authWithPassword(email, password);
		if (!token) {
			console.error('Error:', 'UnAuthorized');
			return {
				error: true,
				email: null
			};
		}
	} catch (err) {
		console.error('Error:', err);
		return {
			error: true,
			email: email
		};
	}
};
