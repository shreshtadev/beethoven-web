import { fail, redirect } from '@sveltejs/kit';
import type {  PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const reportType = params.reportType;
	if (!locals.pb.authStore.isValid && !locals.isCompanyAdmin) {
		throw redirect(303, '/login');
	}
	return { reportType };
}) satisfies PageServerLoad;
