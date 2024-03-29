import { getSignoutUrl } from "$lib/server/helpers";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET:RequestHandler = ({ cookies }) => {
	cookies.delete("id_token")
	cookies.delete("refresh_token")
	throw redirect(307,getSignoutUrl())
}
