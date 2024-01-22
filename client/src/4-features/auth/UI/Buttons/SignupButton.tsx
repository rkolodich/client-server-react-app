import { Button } from "flowbite-react"
import { useAuthStore } from "../../model/store"
import { BaseButtonProps } from "./types"

export default function SignupByEmailButton(props: BaseButtonProps) {
	const {
		onSuccess = () => {},
		onError = () => {},
		..._props
	} = props
	const signup = useAuthStore(state => state.signup)
	const inProcess = useAuthStore(state => state.inProcess)

	const handleClickOrSubmit = async () => {
		try {
			await signup()
			onSuccess && onSuccess()
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
			isProcessing={inProcess === 'signup' || inProcess === 'check'}
			{..._props}
		>
			Sign up
		</Button>
	)
}

