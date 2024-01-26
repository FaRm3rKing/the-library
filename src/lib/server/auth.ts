import { parseJWT } from "./helpers"

export function authenticateUser (event){
	const { cookies } = event

	const id_token = cookies.get('id_token')

	if (!id_token) return null

	const token = parseJWT(id_token)
	return  {
		email: token.email, 
		username: token["cognito:username"]
	}
}
