import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isPaymentFeatureEnabled} from '$lib';
const COLLECTION_NAME = 'payments';

export const load = (async ({locals, url}) => {
if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	} else if (!isPaymentFeatureEnabled(locals.user?.features)) {
        throw redirect(303, "/");
    }
    const currPage = parseInt(url.searchParams.get('page') || '1');
    const receipts = await locals.pb.collection(COLLECTION_NAME).getList(currPage, 10, {sort: "-created"}) || [];
    return {receipts};
}) satisfies PageServerLoad;
