import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAccessToken, useNavigateAuth } from ".."

export default function AuthRequired({ children }: { children: ReactNode }) {
	const location = useLocation()
	const token = getAccessToken()
	const { tryAuthAndNavigate } = useNavigateAuth()

	useEffect(() => {
		if (!token) {
			return
		}

		tryAuthAndNavigate()
	}, [])

	if (!token) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}

	return children
}
