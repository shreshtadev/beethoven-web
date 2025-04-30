import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch, locals }) => {
	try {
		const reportFormData = await request.formData();
		const startRange = parseInt(reportFormData.get('startRange')?.toString() || '0');
		const endRange = parseInt(reportFormData.get('endRange')?.toString() || '0');
		const reportResp = await fetch(`${locals.pb.baseURL}/api/exportByAge`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${locals.pb.authStore.token}`
			},
			body: `{"minAge":${startRange},"maxAge":${endRange}}`
		});
		if (!reportResp.ok) {
			return new Response(JSON.stringify({ error: 'Failed to fetch CSV blob' }), {
				status: reportResp.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const arrayBuffer = await reportResp.arrayBuffer();
		const uint8Array = new Uint8Array(arrayBuffer);
		const decoder = new TextDecoder('utf-8');
		const csvText = decoder.decode(uint8Array);
		return new Response(csvText, {
			headers: { 'Content-Type': 'text/csv' }
		});
	} catch (error) {
		console.error('Error generating report.', error);
		return new Response('Failed to generate report', {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
			statusText: 'InternalServerError'
		});
	}
};
