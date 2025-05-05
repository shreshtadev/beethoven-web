import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { isPaymentFeatureEnabled } from '$lib';
const CUSTOMERS = 'customers';
export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	if (!isPaymentFeatureEnabled(locals.user?.features)) {
		throw redirect(303, '/');
	}

    const customers = await locals.pb.collection(CUSTOMERS).getFullList();
	return {customers};
}) satisfies PageServerLoad;
