import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@shared/config"

export function validatePasswordLength(password: string): boolean {
	return validateMinPasswordLength(password) && validateMaxPasswordLength(password)
}

export function validateMinPasswordLength(password: string): boolean {
	return password.length >= MIN_PASSWORD_LENGTH
}

export function validateMaxPasswordLength(password: string): boolean {
	return password.length <= MAX_PASSWORD_LENGTH
}

