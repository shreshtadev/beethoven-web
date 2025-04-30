import type { RequestHandler } from './$types';

import { chromium } from 'playwright';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals, fetch }) {
	try {
        const {paymentType, paymentId} = await request.json();
        const authToken = locals.pb.authStore.token;
        const baseURL = locals.pb.baseURL
        const htmlContentResp = await fetch(`${baseURL}/api/payments/generate/${paymentType}`, {
            method: 'POST',
            headers: {
                'Authorization': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({paymentId: paymentId})
        });
        if (!htmlContentResp.ok) {
            console.error('Failed to fetch HTML content:', htmlContentResp.statusText);
            return json({ error: 'Failed to fetch HTML content' }, { status: 500 });
        }
        const htmlContent = await htmlContentResp.text();
		if (!htmlContent) {
			return json({ error: 'HTML content is required' }, { status: 400 });
		}

		const browser = await chromium.launch({ headless: true });
		const page = await browser.newPage();
		await page.setContent(htmlContent);
		const pdfBuffer = await page.pdf({preferCSSPageSize: true});
		await browser.close();

		return new Response(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename="generated.pdf"'
			}
		});
	} catch (error) {
		console.error('Error generating PDF:', error);
		return json({ error: 'Failed to generate PDF' }, { status: 500 });
	}
}
