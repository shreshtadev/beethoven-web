import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

const CUSTOMERS = 'customers';

export const load = (async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	return {
        loading: false,
        alert: null as { type: 'success' | 'error' | 'info' | 'warning'; message: string } | null
    };
}) satisfies PageServerLoad;

export const actions = {
    createCustomer: async ({ request, locals }) => {
        const formData = await request.formData();
        const fullName = formData.get('fullName');
        // const email = formData.get('email') as string;
        const phoneNumber = formData.get('phoneNumber');
        const addressLine1 = formData.get('addressLine1');
        const area = formData.get('area');
        const taluk = formData.get('taluk');
        const pinCode = formData.get('pinCode');
        // const gstNo = formData.get('gstNo') as string;
        const panNo = formData.get('panNo');
        const addressLine = `${addressLine1}${area === '' ? '' : ', '+area}${taluk === '' ? '' : ', '+taluk}${pinCode === '' ? '' : ', '+pinCode}`;
        const data = {
            fullName,
            // email,
            phoneNumber,
            addressLine,
            // gstNo,
            panNo
        };

        try {
            await locals.pb.collection(CUSTOMERS).create(data);
            return { status: 'success', message: 'Customer created successfully', type: 'success' };
        } catch (error) {
            console.error('Error creating customer', error);
            return fail(500, { type: 'error', status: 'error', error: { message: 'Failed to create a customer' } });
        }
    }
} satisfies Actions;
