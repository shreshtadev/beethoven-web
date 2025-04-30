import { fail, redirect, type Actions } from '@sveltejs/kit';
export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid && !locals.isCompanyAdmin) {
		throw redirect(303, '/login');
	}
	return {
		loading: false,
		alert: null as { type: 'success' | 'error' | 'info' | 'warning'; message: string } | null
	};
};

export const actions: Actions = {
	s3upload: async ({ locals, request, fetch }) => {
		const fileUploader = await request.formData();
		const slug = fileUploader.get('slug') as string;
		const fileToUpload = fileUploader.get('files') as File;
		if (!slug || slug === 'undefined') {
			return fail(400, {
				error: true,
				message: 'You must provide a search name for further searches.'
			});
		}
		if (!fileToUpload.name || fileToUpload.name === 'undefined') {
			return fail(400, {
				error: true,
				message: 'You must provide a file to upload'
			});
		}
		const authToken = locals.pb.authStore.token;
		const baseURL = locals.pb.baseURL;
		const response = await fetch(`${baseURL}/api/s3/upload`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${authToken}`
			},
			body: fileUploader
		});
		return { message: response.statusText, status: response.status };
	}
};
