import { ReactNode, useEffect } from "react";
import { useAuthStore } from "..";

export default function CheckAuthProvider({ children }: { children: ReactNode }) {
	const check = useAuthStore(state => state.check)

	useEffect(() => {
		check()
	}, [])

	return children
}
