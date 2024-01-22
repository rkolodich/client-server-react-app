import { Form } from "react-router-dom";
import { AuthWithGoogle, BaseLayout, EmailInput, LoginButton, PasswordInput, useNavigateAuth } from "@features/auth";
import { Separator } from "@shared/UI";
import AuthWrapper from "./Helpers/AuthWrapper";


export default function AuthLogin() {
	const { navigateAfterAuth } =  useNavigateAuth()

	return (
		<AuthWrapper>
			<Form method="post">
				<BaseLayout
					emailSlot={
						<EmailInput />
					}
					passwordSlot={
						<PasswordInput useShowButton />
					}
					buttonSlot={
						<LoginButton onSuccess={navigateAfterAuth} />
					}
				/>
			</Form>

			<Separator className="my-6" />

			<AuthWithGoogle text="login" />
		</AuthWrapper>
	)
}
