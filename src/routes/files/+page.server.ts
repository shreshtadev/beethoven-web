import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { isDMSFeatureEnabled } from '$lib';
const COLLECTION_NAME = 's3_file_metadata';
export const load = (async ({ locals, url }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
    if (!isDMSFeatureEnabled(locals.user?.features)) {
        throw redirect(303, "/");
    }
	const currPage = parseInt(url.searchParams.get('page') || '1');
	const allFiles = await locals.pb.collection(COLLECTION_NAME).getList(currPage, 10, { sort: '-created' });
	return { allFiles };
}) satisfies PageServerLoad;

export const actions = {
	downloadFile: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const documentID = formData.get('documentID') as string;
		if (!documentID || documentID === undefined) {
			return fail(400, {
				error: true,
				message: 'You must provide a valid documentID.'
			});
		}
		const authToken = locals.pb.authStore.token;
		const baseURL = locals.pb.baseURL;
		const foundDocument = await locals.pb.collection('s3_file_metadata').getOne(documentID);
		try {
			const response = await fetch(`${baseURL}/api/s3/download`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${authToken}`
				},
				body: JSON.stringify({"documentID": documentID})
			});
			if (!response.ok) {
				console.error(`HTTP error! status: ${response.status}`);
				return;
			}
			const downloaded = await response.blob();
			return downloaded;
		} catch (error: any) {
			console.error('Error downloading:', error);
			return fail(500, { message: 'Failed to download from link.' });
		}
	}
} satisfies Actions;
