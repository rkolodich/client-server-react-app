import { redirect } from "react-router-dom";

export function AuthLoader() {
	redirect('/auth/signup');
	return {}
}
