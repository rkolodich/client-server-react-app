import { ReactElement } from "react"

interface BaseLayoutProps {
	emailSlot: ReactElement
	passwordSlot: ReactElement
	firstNameSlot?: ReactElement
	secondNameSlot?: ReactElement
	buttonSlot?: ReactElement
}

export default function BaseLayout(props: BaseLayoutProps) {
	return (
		<>
			<div className="grid gap-3">
				{
					props.firstNameSlot
					&&
					<div>
						{props.firstNameSlot}
					</div>
				}
				{
					props.secondNameSlot
					&&
					<div>
						{props.secondNameSlot}
					</div>
				}
				<div>
					{props.emailSlot}
				</div>
				<div>
					{props.passwordSlot}
				</div>
			</div>
			{
				props.buttonSlot
				&&
				<div className="mt-8">
					{props.buttonSlot}
				</div>
			}
		</>
	)
}
