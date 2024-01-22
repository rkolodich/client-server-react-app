import { Button } from "flowbite-react"
import { useAuthStore } from "../../model/store"
import { BaseButtonProps } from "./types"

export default function LogoutButton(props: BaseButtonProps) {
	const {
		onSuccess = () => {},
		onError = () => {},
		..._props
	} = props
	const logout = useAuthStore(state => state.logout)
	const inProcess = useAuthStore(state => state.inProcess)

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
		<Button
			type="submit"
			onSubmit={handleClickOrSubmit}
			onClick={handleClickOrSubmit}
			fullSized
			disabled={!!inProcess}
			isProcessing={inProcess === 'logout' || inProcess === 'check'}
			{..._props}
		>
			Log in
		</Button>
	)
}
