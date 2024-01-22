import { useState } from "react"

export default function useToggle(init: boolean = false) {
	const [active, setActive] = useState(init)

	const toggle = () => setActive(active => !active)

	return {
		active,
		toggle
	}
}
