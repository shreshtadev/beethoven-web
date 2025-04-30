import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isSurveyFeatureEnabled } from '$lib';
const COLLECTION_NAME = "families";

export const load = (async ({locals, url}) => {
    if (!locals.pb.authStore.isValid) {
            throw redirect(303, '/login');
    }
    if(!isSurveyFeatureEnabled(locals.user?.features)) {
        throw redirect(303, "/");
    }
    const currPage = parseInt(url.searchParams.get('page') || '1');
    const families = await locals.pb.collection(COLLECTION_NAME).getList(currPage, 10, {sort: '-created'}) || [];
    return {families};
}) satisfies PageServerLoad;
