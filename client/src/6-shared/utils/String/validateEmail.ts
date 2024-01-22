import { emailRegexp } from "@shared/consts";

export function validateEmail(email: string): boolean {
	return emailRegexp.test(email)
}
