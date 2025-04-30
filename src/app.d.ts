// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AuthRecord } from "pocketbase";
import PocketBase from 'pocketbase';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
			user: AuthRecord | undefined;
            isSuperUser: boolean | undefined;
            isCompanyAdmin: boolean | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
