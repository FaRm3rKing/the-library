import { authenticateUser } from "$lib/server/auth";
import { getSignoutUrlRedirect, parseJWT, getTokens } from "$lib/server/helpers"
import { redirect } from "@sveltejs/kit"
import type { Handle } from "@sveltejs/kit";
import { connection } from "$lib/server/db";

export const handle = (async ({event, resolve})=> {
	// first check if id_token exists, this tells us if someone
	// is logged in or authenticated
	event.locals.user = authenticateUser(event)
	let dbconn



	// protected routes
	// change the /vault to your preferred protected route
	if (event.url.pathname.startsWith('/vault')) {
		// is user not logged in through login
		if (!event.locals.user) {
			// then check refresh token
			const refreshToken = event.cookies.get('refresh_token')
			if(!refreshToken) {
				// user has to log in again
				const signOutUrl = getSignoutUrlRedirect() 
				throw redirect(307, signOutUrl)
			}

			// if refresh token exists get the id_token through it 
			// and set the locals and cookies again
			// Get Tokens
			try {
				const updatedTokens = await getTokens({ refreshToken });

				//cookies
				const idExpires = new Date();
				idExpires.setSeconds(idExpires.getSeconds() + updatedTokens.expires_in);
				event.cookies.set("id_token", updatedTokens.id_token, { path: "/", expires: idExpires });

				//locals
				const userInfo = parseJWT(updatedTokens.id_token)
				event.locals.user = {
					email: userInfo.email, 
					username: userInfo["cognito:username"]
				}
			} catch (e) {
				// maybe refreshtoken is expired
				// user has to log in again
				const signOutUrl = getSignoutUrlRedirect() 
				throw redirect(307, signOutUrl)
			}
		} 	
		dbconn = await connection?.getConnection()
		event.locals.dbconn = dbconn
	} 
	const response = await resolve(event);
	dbconn?.release()
	return response;

}) satisfies Handle
