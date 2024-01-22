import { ReactNode } from "react"

interface AuthWrapperProps {
	children: ReactNode
}

export default function AuthWrapper(props: AuthWrapperProps) {
	return (
		<div className="mx-auto p-4 w-80 shadow rounded-2xl">
			{props.children}
		</div>
	)
}

