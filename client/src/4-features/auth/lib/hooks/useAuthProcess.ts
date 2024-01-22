import { useAuthStore } from "@features/auth";

export default function useAuthProcess() {
	const inProcess = useAuthStore(state => state.inProcess)
	const email = useAuthStore(state => state.user.email)

	const isLoggingIn = () => inProcess === 'login'

	const isLoggingOut = () => inProcess === 'login'

	const isSigningUp = () => inProcess === 'signup'

	const isChecking = () => inProcess === 'check'

	const isLoggedIn = () => email !== ''

	return {
		isLoggingIn,
		isLoggingOut,
		isSigningUp,
		isChecking,
		inProcess,
		isLoggedIn,
	}
}
