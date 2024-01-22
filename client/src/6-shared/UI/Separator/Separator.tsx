import { HTMLAttributes } from 'react'

interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {

}

export default function Separator(props: SeparatorProps) {
	return (
		<hr
			className="border-t-2"
			{...props}
		/>
	)
}
