import { Form } from "react-router-dom"
import { BaseLayout, EmailInput, SignupButton, PasswordInput, FirstNameInput, SecondNameInput, AuthWithGoogle, useNavigateAuth } from "@features/auth"
import { Separator } from "@shared/UI"
import AuthWrapper from "./Helpers/AuthWrapper"

export default function AuthLogin() {
	const { navigateAfterAuth } =  useNavigateAuth()

	return (
		<AuthWrapper>
			<Form method="post">
				<BaseLayout
					firstNameSlot={
						<FirstNameInput />
					}
					secondNameSlot={
						<SecondNameInput />
					}
					emailSlot={
						<EmailInput />
					}
					passwordSlot={
						<PasswordInput useShowButton />
					}
					buttonSlot={
						<SignupButton onSuccess={navigateAfterAuth} />
					}
				/>

				<Separator className="my-6" />

				<AuthWithGoogle text="signup" />
			</Form>
		</AuthWrapper>
	)
}
