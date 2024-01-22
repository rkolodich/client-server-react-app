import { Button, ButtonProps } from "flowbite-react"
import { API_URL } from "@shared/config"


type AuthWithGoogleProps = ButtonProps & {
	text: 'signup' | 'login'
}

export default function AuthWithGoogle(props: AuthWithGoogleProps) {
	const { text, ..._props } = props

	return (
		<Button
			href={`${API_URL}/auth/google`}
			fullSized
			outline
			{..._props}
		>
			{getText(text)}
		</Button>
	)
}

function getText(text: AuthWithGoogleProps['text']) {
	switch (text) {
		case 'login':
			return 'Log in with Google'
		default:
			return 'Sign up with Google'
	}
}
