import { HTMLAttributes } from "react"
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2"
import { useAuthStore } from "@features/auth"
import { onError, onSuccess } from "./types"
// TODO

type ButtonAttrs = HTMLAttributes<HTMLButtonElement>

type ButtonAttrsWithoutClickEvents = Omit<ButtonAttrs, 'onClick' | 'onSubmit'>

type LogoutIconButtonProps = ButtonAttrsWithoutClickEvents & {
	onSuccess?: onSuccess
	onError?: onError
}

export default function LogoutIconButton(props: LogoutIconButtonProps) {
	const {
		onSuccess = () => {},
		onError = () => {},
		..._props
	} = props
	const logout = useAuthStore(state => state.logout)

	const handleClickOrSubmit = async () => {
		try {
			await logout()
			onSuccess()
		}
		catch (e) {
			onError(e as Error)
		}
	}

	return (
		<button
			onSubmit={handleClickOrSubmit}
			onClick={handleClickOrSubmit}
			{..._props}
		>
			<HiOutlineArrowRightOnRectangle />
		</button>
	)
}
