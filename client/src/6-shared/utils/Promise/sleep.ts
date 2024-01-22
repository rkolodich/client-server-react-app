export default function sleep(ms: number) {
	return new Promise<void>(resolve => {
		const timeout = setTimeout(() => {
			resolve()
			clearTimeout(timeout)
		}, ms)
	});
}
