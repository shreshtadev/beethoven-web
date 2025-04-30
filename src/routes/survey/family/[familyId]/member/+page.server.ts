import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
const COLLECTION_NAME = 'members';

const findFamilyMembers = async (locals: App.Locals, familyId: string = '', pageNo: number = 1) => {
	const membersList = await locals.pb.collection(COLLECTION_NAME).getList(pageNo, 10, {
		filter: `familyId="${familyId}"`
	});
	return membersList;
};

export const load = (async ({ params, locals, url }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	const currPage = parseInt(url.searchParams.get('page') || '1');
	const familyId = params.familyId == undefined ? '' : params.familyId;
	if (familyId === null || familyId === undefined) {
		console.error('Searching only for families with no familyId');
	}
	const members = await findFamilyMembers(locals, familyId, currPage);
	return { members };
}) satisfies PageServerLoad;
