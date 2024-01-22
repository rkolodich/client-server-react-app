import { ImmerStateCreator } from "@shared/models"

export type TAuthByEmailSlice = ImmerStateCreator<IAuthByEmailState>

export interface IAuthByEmailState {
	user: {
		id: string
		email: string
		isActivated: string
		name: string
		secondName: string
	},
	password: string
	errorText: string
	inProcess: undefined | 'login' | 'signup' | 'logout' | 'check'

	setEmail: (email: string) => void,
	setPassword: (password: string) => void,
	setName: (firstName: string) => void,
	setSecondName: (secondName: string) => void,

	login: () => Promise<void>
	logout: () => Promise<void>
	signup: () => Promise<void>
	check: () => Promise<void>
}

type TJwtTokens = {
	accessToken: string
	refreshToken: string
}

type TUser = {
	id: string
	email: string
	isActivated: string
	name: string
	secondName: string
	avatar: string
}

export type LoginResponse = TJwtTokens & {
	user: TUser
}

export type SignupResponse = LoginResponse

export type RefreshResponse = LoginResponse
