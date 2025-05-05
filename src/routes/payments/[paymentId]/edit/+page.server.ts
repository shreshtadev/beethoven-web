import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
const COLLECTION_NAME = 'payments';
const CUSTOMERS = 'customers';
export const load = (async ({ params, locals }) => {
	const paymentId = params.paymentId;
	const foundPayment = await locals.pb.collection(COLLECTION_NAME).getOne(paymentId);
	const customers = await locals.pb.collection(CUSTOMERS).getFullList();
	return {
		foundPayment,
		customers,
		loading: false,
		alert: null as { type: 'success' | 'error' | 'info' | 'warning'; message: string } | null
	};
}) satisfies PageServerLoad;
