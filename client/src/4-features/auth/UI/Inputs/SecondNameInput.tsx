import { Label, TextInput } from "flowbite-react";
import { ChangeEventHandler } from "react";
import { useAuthStore } from "../../model/store";

const inputId = 'second-name';

export default function SecondNameInput() {
	const secondName = useAuthStore(state => state.user.secondName)
	const setSecondName = useAuthStore(state => state.setSecondName)

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setSecondName(event.target.value)
	}

	return (
		<div>
			<Label
				className="inline-block mb-1"
				value="Second name"
				htmlFor={inputId}
			/>
			<TextInput
				id={inputId}
				type="text"
				value={secondName}
				onChange={handleChange}
			/>
		</div>
	)
}
