import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const COLLECTION_NAME = 'families';
export const load = (async ({locals}) => {
    if (!locals.pb.authStore.isValid && !locals.isCompanyAdmin ) {
            throw redirect(303, '/login');
    }
    return {};
}) satisfies PageServerLoad;

export const actions = {
    createFamily: async ({ request, locals }) => {
		const formData = await request.formData();

		const fullName = formData.get('fullName');
		const addressLine = formData.get('addressLine');
		const veda = formData.get('veda');
		const category = formData.get('category');
		const subCategory = formData.get('subCategory');
		const gothra = formData.get('gothra');
		const area = formData.get('area');
		const taluk = formData.get('taluk');
		const profession = formData.get('profession');
		const phoneNumber = formData.get('phoneNumber');
		const emailAddress = formData.get('emailAddress');

		const data = {
			fullName,
			addressLine,
			veda,
			category,
			subCategory,
			gothra,
			area,
			taluk,
			profession,
			phoneNumber,
			emailAddress
		};

		try {
			await locals.pb.collection(COLLECTION_NAME).create(data);
			return { status: 'success' };
		} catch (error) {
			console.error('Error creating record:', error);
			return fail(500, { status: 'error', error: { message: 'Failed to create record.' } });
		}
	},
}
