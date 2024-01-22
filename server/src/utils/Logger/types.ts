export type TLoggerValue = undefined | null | string | object

export type TLoggerOptions = {
	json: boolean
}

export interface ILogger {
	info: (value: TLoggerValue, options?: TLoggerOptions) => this

	warning: (value: TLoggerValue, options?: TLoggerOptions) => this

	error: (value: TLoggerValue, options?: TLoggerOptions) => this

	clear: () => this
}
