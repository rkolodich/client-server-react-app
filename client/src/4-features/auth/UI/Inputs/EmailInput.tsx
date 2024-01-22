import { Label, TextInput } from "flowbite-react";
import { ChangeEventHandler } from "react";
import { useAuthStore } from "../../model/store";

const inputId = 'email';

export default function EmailInput() {
	const email = useAuthStore(state => state.user.email)
	const setEmail = useAuthStore(state => state.setEmail)

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setEmail(event.target.value)
	}

	return (
		<div>
			<Label
				className="inline-block mb-1"
				value="Email"
				htmlFor={inputId}
			/>
			<TextInput
				id={inputId}
				type="email"
				value={email}
				onChange={handleChange}
			/>
		</div>
	)
}
