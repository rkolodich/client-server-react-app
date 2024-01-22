import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { clearAccessToken, setAccessToken } from "@features/auth/lib/utils"
import { api } from "@shared/api"
import { IS_DEV } from "@shared/config"
import { IAuthByEmailState, LoginResponse, RefreshResponse, TAuthByEmailSlice } from "./types"

const DEFAULT_USER = {
	id: '',
	email: '',
	isActivated: '',
	name: '',
	secondName: '',
} as const

const createAuthByEmailSlice: TAuthByEmailSlice = (set, get) => ({
	user: Object.assign({}, DEFAULT_USER),
	password: '',

	errorText: '',
	inProcess: undefined,

	setEmail: (email) => {
		set(state => { state.user.email = email })
	},
	setPassword: (password) => {
		set(state => { state.password = password })
	},
	setName: (firstName) => {
		set(state => { state.user.name = firstName })
	},
	setSecondName: (secondName) => {
		set(state => { state.user.secondName = secondName })
	},

	signup: async () => {
		set(state => { state.inProcess = 'signup' })
		try {
			const { user, password } = get()
			const { data } = await api.post<LoginResponse>('signup', {
				password,
				email: user.email,
				name: user.name,
				secondName: user.secondName,
			})
			set(state => {
				state.inProcess = undefined
				state.user = data.user
				state.password = ''
			})
			setAccessToken(data.accessToken)
		}
		finally {
			set(state => { state.inProcess = undefined })
		}

	},
	login: async () => {
		set(state => { state.inProcess = 'login' })
		try {
			const { user, password } = get()
			const { data } = await api.post<LoginResponse>('/login', {
				email: user.email,
				password
			})
			set(state => {
				state.user = data.user
				state.password = ''
			})
			setAccessToken(data.accessToken)
		}
		finally {
			set(state => { state.inProcess = undefined })
		}
	},
	logout: async () => {
		set(state => { state.inProcess = 'logout' })
		try {
			await api.post<void>('/logout')
			set(state => {
				state.user = Object.assign({}, DEFAULT_USER)
			})
			clearAccessToken()
		}
		finally {
			set(state => { state.inProcess = undefined })
		}
	},
	check: async () => {
		set(state => { state.inProcess = 'check' })
		try {
			const { data } = await api.get<RefreshResponse>('/refresh')
			set(state => {
				state.user = data.user
			})
			setAccessToken(data.accessToken)
		}
		catch (e) {
			clearAccessToken()
		}
		finally {
			set(state => { state.inProcess = undefined })
		}
	},
})

export const useAuthStore = IS_DEV
	? create(devtools(immer<IAuthByEmailState>(createAuthByEmailSlice)))
	: create(immer<IAuthByEmailState>(createAuthByEmailSlice))
