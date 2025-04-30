import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { isPaymentFeatureEnabled } from '$lib';
const COLLECTION_NAME = 'payments';
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

export const actions = {
	createPayment: async ({ request, locals }) => {
		const formData = await request.formData();
		const slNo = formData.get('slNo');
		const paymentDate = formData.get('paymentDate') as string;
		const receivedFrom = formData.get('receivedFrom');
		const receivedBy = formData.get('receivedBy');
		const paymentRef = formData.get('paymentRef');
		const paymentType = formData.get('paymentType');
        const paidTo = formData.get('paidTo');
		const paidOn = formData.get('paidOn');
		const amount = formData.get('amount');
        // const paymentRefFile = formData.get('paymentRefFile') as File || undefined;
        const narration = `${paymentType === 'Voucher'? 'Paid ' : 'Received payment of'} ₹ ${amount} on ${paymentDate.split("T")[0]} with referenceNo ${slNo} paid On ${paidOn}`;

		const data = {
			slNo,
			narration,
			paymentDate,
			receivedFrom,
            paidTo,
			receivedBy,
			paymentRef,
			paymentType,
            // paymentRefFile,
			amount,
			paidOn
		};

		try {
			await locals.pb.collection(COLLECTION_NAME).create(data);
			return { status: 'success' };
		} catch (error) {
			console.error('Error creating receipt', error);
			return fail(500, { status: 'error', error: { message: 'Failed to create a receipt' } });
		}
	}
} satisfies Actions;
