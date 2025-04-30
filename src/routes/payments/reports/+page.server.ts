import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isPaymentFeatureEnabled } from '$lib';

export const load = (async ({ locals, fetch }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	if (!isPaymentFeatureEnabled(locals.user?.features)) {
		throw redirect(303, '/');
	}

	const baseURL = locals.pb.baseURL;
	const authToken = locals.pb.authStore.token;
	const headers = {
		Authorization: `Bearer ${authToken}`,
		'Content-Type': 'application/json'
	};
	const openingBalanceResp = await fetch(`${baseURL}/api/payments/balance/open`, {
		method: 'GET',
		headers: headers
	});
    if(!openingBalanceResp.ok) {
        return fail(500, { error: 'Failed to fetch opening balance' });
    }
    const openingBalanceJson = await openingBalanceResp.json();
    const closingBalanceResp = await fetch(`${baseURL}/api/payments/balance/close`, {
		method: 'GET',
		headers: headers
	});
    if(!closingBalanceResp.ok) {
        return fail(500, { error: 'Failed to fetch closing balance' });
    }
    const closingBalanceJson = await closingBalanceResp.json();

    const dayBookResp = await fetch(`${baseURL}/api/payments/daybook`, {
        method: 'GET',
        headers: headers
    });

    if(!dayBookResp.ok) {
        return fail(500, { error: 'Failed to fetch daybook' });
    }
    const dayBookJson = await dayBookResp.json();

	return {open: openingBalanceJson, close: closingBalanceJson, dayBook: dayBookJson, loading: false, alert: null as { type: 'success' | 'error' | 'info' | 'warning'; message: string } | null};
}) satisfies PageServerLoad;
