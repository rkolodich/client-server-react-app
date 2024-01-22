import { ReactNode } from "react";

interface ErrorTextProps {
	children?: ReactNode | undefined
}

export function ErrorText(props: ErrorTextProps) {
	return (
		<p className="text-red-500">
			{props.children}
		</p>
	)
}
