import { useState } from "react"

interface IUseIsLoading {
	startLoading: () => void
	finishLoading: () => void
	isLoading: boolean
}

export default function useIsLoading(init: boolean = false): IUseIsLoading {
	const [isLoading, setIsLoading]  = useState(init)

	function startLoading() {
		setIsLoading(true)
	}

	function finishLoading() {
		setIsLoading(false)
	}

	return {
		isLoading,
		startLoading,
		finishLoading,
	}
}
