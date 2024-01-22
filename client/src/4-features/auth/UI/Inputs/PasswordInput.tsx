import { Label, TextInput } from "flowbite-react";
import { ChangeEventHandler } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2"
import { useToggle } from "@shared/hooks";
import { useAuthStore } from "../../model/store";

const inputId = 'Password';

interface PasswordInputProps {
	useShowButton?: boolean
}

export default function PasswordInput(props: PasswordInputProps) {
	const { useShowButton = false } = props
	const { active: isShown, toggle: toggleShow } = useToggle()
	const password = useAuthStore(state => state.password)
	const setPassword = useAuthStore(state => state.setPassword)

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setPassword(event.target.value)
	}

	return (
		<div>
			<Label
				className="inline-block mb-1"
				value="Password"
				htmlFor={inputId}
			/>
			<TextInput
				id={inputId}
				type={isShown ? 'text' : 'password'}
				value={password}
				onChange={handleChange}
				rightIcon={useShowButton
					? () => (
						<button
							className="pointer-events-auto" onClick={toggleShow}
						>
							{
								isShown
								? <HiEyeSlash/>
								: <HiEye/>
							}
						</button>
					)
					: undefined
				}
			/>
		</div>
	)
}
