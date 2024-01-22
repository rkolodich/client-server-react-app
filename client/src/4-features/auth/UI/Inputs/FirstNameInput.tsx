import { Label, TextInput } from "flowbite-react";
import { ChangeEventHandler } from "react";
import { useAuthStore } from "../../model/store";

const inputId = 'first-name';

export default function FirstNameInput() {
	const firstName = useAuthStore(state => state.user.name)
	const setFirstName = useAuthStore(state => state.setName)

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setFirstName(event.target.value)
	}

	return (
		<div>
			<Label
				className="inline-block mb-1"
				value="First name"
				htmlFor={inputId}
			/>
			<TextInput
				id={inputId}
				type="text"
				value={firstName}
				onChange={handleChange}
			/>
		</div>
	)
}
