import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
const COLLECTION_NAME = "members";
export const load = (async ({params, locals}) => {
    const memberId = params.memberId;
    // Fetch family data from the database using familyId
    const foundMember = await locals.pb.collection(COLLECTION_NAME).getOne(memberId);

    return {foundMember};
}) satisfies PageServerLoad;

export const actions = {
    updateMember: async ({ request, params, locals }) => {
        const formData = await request.formData();

        const id = params.memberId;
        const familyId = params.familyId;
        const fullName = formData.get('fullName');
        const age = formData.get('age');
        const isMarried = formData.get('isMarried');
        const relatedAs = formData.get('relatedAs');
        const educationProfession = formData.get('educationProfession');
        const phoneNumber = formData.get('phoneNumber');
        const emailAddress = formData.get('emailAddress');

        const data = {
            id,
            familyId,
            fullName,
            age,
            relatedAs,
            isMarried,
            educationProfession,
            emailAddress,
            phoneNumber
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
