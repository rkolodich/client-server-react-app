import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "@features/auth"
import { getAccessToken } from "../utils"

export default function useNavigateAuth() {
	const navigate = useNavigate()
	const checkAuth = useAuthStore(state => state.check)
	const location = useLocation()

	const navigateToLogin = () => {
		navigate('/login')
	}

	const navigateToSignup = () => {
		navigate('/signup')
	}

	const navigateAfterAuth = () => {
		navigate('/', { state: { from: location } })
	}

	const tryAuthAndNavigate = async () => {
		if (!getAccessToken()) {
			return
		}

		await checkAuth()
		navigateAfterAuth()
	}

	return {
		navigateToSignup,
		navigateToLogin,
		navigateAfterAuth,
		tryAuthAndNavigate,
	}
}
