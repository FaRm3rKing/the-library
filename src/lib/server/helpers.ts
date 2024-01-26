import { COGNITO_BASE_URI, COGNITO_CLIENT_ID, COGNITO_CLIENT_SECRET, CF_PAGES_URL } from "$env/static/private";
import type { TokenOption, TokenPayload, TokenResponse, userInfoResponse } from "./types";

export function getSignInUrl(): string {
	const baseUrl = COGNITO_BASE_URI;
	const clientId = COGNITO_CLIENT_ID;

	// The login api endpoint with the required parameters.
	const loginUrl = new URL("/login", baseUrl);
	loginUrl.searchParams.set("client_id", clientId);
	loginUrl.searchParams.set("response_type", "code");
	loginUrl.searchParams.set("scope", "email openid phone");
	loginUrl.searchParams.set("redirect_uri", getRedirectUrl());

	return loginUrl.toString();
}

/** 
 * @see https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html
 * */
export function getSignoutUrlRedirect() {
	const baseUrl = COGNITO_BASE_URI;
	const clientId = COGNITO_CLIENT_ID;

	// The login api endpoint with the required parameters.
	const signoutUrl = new URL("/logout", baseUrl);
	signoutUrl.searchParams.set("client_id", clientId);
	signoutUrl.searchParams.set("response_type", 'code' )
	signoutUrl.searchParams.set("redirect_uri", getRedirectUrl());

	return signoutUrl.toString();
}

export function getSignoutUrl(){
	const baseUrl = COGNITO_BASE_URI;
	const clientId = COGNITO_CLIENT_ID;
	const landingPage = CF_PAGES_URL;

	// The login api endpoint with the required parameters.
	const signoutUrl = new URL("/logout", baseUrl);
	signoutUrl.searchParams.set("client_id", clientId);
	signoutUrl.searchParams.set("logout_uri", landingPage);

	return signoutUrl.toString();
}

function getRedirectUrl(): string {
	return new URL("/callback", CF_PAGES_URL).toString();
}

/**
 * This function can either generate tokens from a code or from a refresh token.
 * If a code is provided, this all tokens is generated (requires a fresh login)
 * If a refresh token is provided, only the access/id token is updated.
 * @see https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
 */
export async function getTokens(option: TokenOption): Promise<TokenResponse>{
	const baseUrl = COGNITO_BASE_URI
	const clientId = COGNITO_CLIENT_ID
	const clientSecret = COGNITO_CLIENT_SECRET


	// Authorization header
	const authHeader = btoa(`${clientId}:${clientSecret}`)

	// request parameters
	const body:TokenPayload = {
		grant_type: option.code ? 'authorization_code' : 'refresh_token',
		client_id: clientId,
		client_secret: clientSecret,
		redirect_uri: getRedirectUrl(),
	}

	// provide code or refresh_token depending on grant_type
	if (body.grant_type === 'authorization_code') body.code = option.code 
	if (body.grant_type === 'refresh_token')  body.refresh_token = option.refreshToken

	// transform the body so it follows 
	// application/x-www-form-urlencoded content type
	const bodyTransformed = Object.entries(body).map(([key, val]) => `${key}=${val}`).join('&')	

	// The token api endpoint.
	const url = new URL("/oauth2/token/", baseUrl);

	const response = await fetch(url.toString(), {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + authHeader
	  },
	  body: bodyTransformed
	})

	return await response.json()
}

/**
 * @see https://docs.aws.amazon.com/cognito/latest/developerguide/userinfo-endpoint.html
 * */
export async function getUserInfo( accessToken: string ): Promise<userInfoResponse> {
	const baseUrl = COGNITO_BASE_URI
	const url = new URL("/oauth2/userInfo/", baseUrl);

	const response = await fetch( url.toString(), {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer '  +  accessToken
		}
	})
	return await response.json()
}

/**
 * Used to parse the JWT into the user info
 * @param id_token the id_token
 * */
export function parseJWT(id_token: string): userInfoResponse{
	return JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString())
}

export function getUsername(id_token:string): string{
	const userInfo = parseJWT(id_token)
	return userInfo['cognito:username']
}



