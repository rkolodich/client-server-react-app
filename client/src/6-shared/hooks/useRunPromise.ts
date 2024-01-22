import useIsLoading from "./useIsLoading"

interface IUsePmomiseWrap {
	isLoading: boolean
	wrappedPromise: () => Promise<void>
}

export default function usePromiseWrap(promise: () => Promise<void>): IUsePmomiseWrap {
	const { startLoading, finishLoading, isLoading } = useIsLoading()

	async function wrappedPromise() {
		try {
			startLoading()
			await promise()
		}
		catch (error) {
			if (error instanceof Error) {
				console.log(error.message)
			}
		}
		finally {
			finishLoading()
		}
	}

	return {
		isLoading,
		wrappedPromise,
	}
}
