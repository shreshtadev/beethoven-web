import { pb } from '$lib';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve,  }) => {
	event.locals.pb = pb;
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {

		event.locals.user = structuredClone(event.locals.pb.authStore.record);
        event.locals.isCompanyAdmin = event.locals.user?.roles === 'Admin';
	} else {
        event.locals.user = undefined;
        event.locals.isCompanyAdmin = undefined;
    }
	const response: Response = await resolve(event);
    response.headers.append('Access-Control-Allow-Origin', '*');
    response.headers.append('Access-Control-Allow-Headers', 'Authorization,ContentType');
    response.headers.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,HEAD,PATCH');
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false, maxAge: 60*60*1 }));
	return response;
};
