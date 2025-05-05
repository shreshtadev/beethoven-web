import { fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const COLLECTION_NAME = 'payments';
export const POST: RequestHandler = async ({ request, params, locals }) => {
    const formData = await request.formData();
    const id = params.paymentId;
    const slNo = formData.get('slNo');
    const paymentDate = formData.get('paymentDate') as string;
    const receivedFrom = formData.get('receivedFrom');
    const paidTo = formData.get('paidTo');
    const receivedBy = formData.get('receivedBy');
    const paymentRef = formData.get('paymentRef');
    // const paymentRefFile = formData.get('paymentRefFile') as File || undefined;
    const paymentType = formData.get('paymentType');
    const paidOn = formData.get('paidOn');
    const amount = formData.get('amount');
    const narration = `${paymentType === 'Voucher' ? 'Paid ' : 'Received payment of'} ₹ ${amount} on ${paymentDate.split('T')[0]} with referenceNo ${slNo} paid On ${paidOn}`;

    const data = {
        id,
        slNo,
        narration,
        paymentDate,
        receivedFrom,
        paidTo,
        receivedBy,
        paymentRef,
        paymentType,
        amount,
        paidOn
        //  paymentRefFile
    };

    try {
        await locals.pb.collection(COLLECTION_NAME).update(id, data);
        return { status: 'success' };
    } catch (error) {
        console.error('Error creating receipt', error);
        return fail(500, { status: 'error', error: { message: 'Failed to create a receipt' } });
    }
};
