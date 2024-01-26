type TokenCode = {
	code: string
	refreshToken?: never
}
type TokenRefresh = {
	code?: never
	refreshToken: string
}

export type TokenOption = TokenCode | TokenRefresh

export type TokenPayload = {
	grant_type: "authorization_code" | "refresh_token";
	client_id: string;
	client_secret: string;
	redirect_uri: string;
	code?: string;
	refresh_token?: string;
}

export type TokenResponse = {
	"access_token": string
	"id_token": string
	"refresh_token": string
	"token_type": "Bearer" 
	"expires_in": number
}

export type userInfoResponse = {
    "sub": string;
    "phone_number": string,
    "email": string,
    "cognito:username": string
}

export type BookmarksResponse = {
	id: number
	title: string
	url: string
	tags: number[] | null
	type: string
	created_at: Date
	updated_at: Date
} 
