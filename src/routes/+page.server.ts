import type { PageServerLoad } from "./$types";
import { getSignInUrl } from "$lib/server/helpers";

export const load = (async ({ locals }) => {
	const signInUrl = getSignInUrl();

	return { signInUrl, username: locals.user?.username };
}) satisfies PageServerLoad
