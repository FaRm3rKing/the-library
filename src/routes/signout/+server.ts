import { getSignoutUrl } from "$lib/server/helpers";
import { redirect } from "@sveltejs/kit";

export function GET ({ cookies }) {
		cookies.delete("id_token")
		cookies.delete("refresh_token")
		// delete event.locals.user
		throw redirect(307,getSignoutUrl())
}
