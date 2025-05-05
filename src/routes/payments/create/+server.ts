const COLLECTION_NAME = 'payments';
export const POST = async () => {
	async ({ request, locals }) => {
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
		const narration = `${paymentType === 'Voucher' ? 'Paid ' : 'Received payment of'} ₹ ${amount} on ${paymentDate.split('T')[0]} with referenceNo ${slNo} paid On ${paidOn}`;

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
	};
};
