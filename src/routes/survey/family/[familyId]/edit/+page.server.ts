import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
const COLLECTION_NAME = "families";
export const load = (async ({params, locals}) => {
    const familyId = params.familyId;
    // Fetch family data from the database using familyId
    const foundFamily = await locals.pb.collection(COLLECTION_NAME).getOne(familyId);

    return {foundFamily};
}) satisfies PageServerLoad;

export const actions = {
    updateFamily: async ({ request, params, locals }) => {
		const formData = await request.formData();

        const id = params.familyId;
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
            id,
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
			await locals.pb.collection(COLLECTION_NAME).update(id, data);
			return { status: 'success' };
		} catch (error) {
			console.error('Error creating record:', error);
			return fail(500, { status: 'error', error: { message: 'Failed to create record.' } });
		}
	},
}
