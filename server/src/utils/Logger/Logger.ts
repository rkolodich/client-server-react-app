import ConsoleLogger from "./ConsoleLogger.js";
import FSLogger from "./FSlogger.js";
import { ILogger, TLoggerOptions, TLoggerValue } from "./types.js";

type logAlias = 'console' | 'fs'

export default class Logger implements ILogger {
	private logger = {} as ILogger;

	constructor(log: ILogger) {
		this.logger = log
	}

	static with(loggerAlias: logAlias): ILogger | never {
		switch (loggerAlias) {
			case 'console': return new Logger(new ConsoleLogger)
			case 'fs':      return new Logger(new FSLogger)
		}
	}

	info(value: TLoggerValue, options?: TLoggerOptions) {
		this.logger.info(value, options)
		return this
	}

	warning(value: TLoggerValue, options?: TLoggerOptions) {
		this.logger.warning(value, options)
		return this
	}

	error(value: TLoggerValue, options?: TLoggerOptions) {
		this.logger.error(value, options)
		return this
	}

	clear() {
		this.logger.clear()
		return this
	}
}
