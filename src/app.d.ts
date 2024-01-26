// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PoolConnection } from "mysql2";

type User = {
	username: string,
	email: string
}
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: User | null;
			dbconn?: dbconn;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
