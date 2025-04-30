import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
const COLLECTION_NAME = 'members';
export const load = (async ({locals, params, }) => {
    const foundFamilyByFamilyId = await locals.pb.collection(COLLECTION_NAME).getOne(params.familyId);
    if(foundFamilyByFamilyId.id === undefined) {
        throw redirect(303, '/survey');
    }
    return {};
}) satisfies PageServerLoad;

export const actions = {
	createMember: async ({ request, params, locals }) => {
		const formData = await request.formData();
		const familyId = params.familyId;
		const fullName = formData.get('fullName');
		const age = formData.get('age');
		const isMarried = formData.get('isMarried');
		const relatedAs = formData.get('relatedAs');
		const phoneNumber = formData.get('phoneNumber');
		const emailAddress = formData.get('emailAddress');
		const eduProf = formData.get('educationProfession');

		const data = {
			fullName,
			age,
			isMarried,
			relatedAs,
			phoneNumber,
			emailAddress,
			eduProf,
			familyId
		};

		try {
			await locals.pb.collection(COLLECTION_NAME).create(data);
			return { status: 'success' };
		} catch (error) {
			console.error('Error creating record:', error);
			return fail(500, { status: 'error', error: { message: 'Failed to create record.' } });
		}
	}
} satisfies Actions;
