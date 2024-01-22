import { Button } from "flowbite-react"
import { useAuthStore } from "../../model/store"
import { BaseButtonProps } from "./types"

export default function LoginButton(props: BaseButtonProps) {
	const {
		onSuccess = () => {},
		onError = () => {},
		..._props
	} = props
	const login = useAuthStore(state => state.login)
	const inProcess = useAuthStore(state => state.inProcess)

	const handleClickOrSubmit = async () => {
		try {
			await login()
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
			isProcessing={inProcess === 'login' || inProcess === 'check'}
			{..._props}
		>
			Log in
		</Button>
	)
}
