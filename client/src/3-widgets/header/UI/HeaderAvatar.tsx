import { LogoutIconButton } from "@features/auth"
import { Avatar } from "flowbite-react"

export default function HeaderAvatar(props: HeaderAvatarProps) {
	const {
		isLoggingOut = false,
		isLoggingIn = false,
	} = props

	if (isLoggingIn) {
		return (
			<div className="animate-pulse">
				<Avatar rounded/>
			</div>
		)
	}

	return (
		<div className="flex items-center">
			<LogoutIconButton
				className='me-2'
			/>
			<Avatar rounded/>
		</div>
	)
}

interface HeaderAvatarProps {
	isLoggingIn?: boolean
	isLoggingOut?: boolean
}
