import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAccessToken, useNavigateAuth } from "..";

export default function AlreadyAuth({ children }: { children: ReactNode }) {
	const location = useLocation()
	const token = getAccessToken()
	const { tryAuthAndNavigate } =  useNavigateAuth()


	useEffect(() => {
		if (!token) {
			return
		}

		tryAuthAndNavigate()
	}, [])

	if (token) {
		return <Navigate to="/" state={{ from: location }} />
	}

	return children
}
