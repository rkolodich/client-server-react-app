import { useAuthStore } from "./store"

export const useEmail = () =>
	useAuthStore(state => [state.user.email, state.setEmail])

export const usePassword = () =>
	useAuthStore(state => [state.password, state.setPassword])

export const useFirstName = () =>
	useAuthStore(state => [state.user.name, state.setName])

export const useSecondName = () =>
	useAuthStore(state => [state.user.secondName, state.setSecondName])

export const useCheck = () =>
	useAuthStore(state => state.check)
