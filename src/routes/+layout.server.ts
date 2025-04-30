import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    if (locals.user) {
		return {
            profile: locals.user,
            isCompanyAdmin: locals.isCompanyAdmin
		};
	}
}) satisfies LayoutServerLoad;
