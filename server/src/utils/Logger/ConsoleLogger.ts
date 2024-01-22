import { ILogger, TLoggerOptions, TLoggerValue } from "./types.js"
import chalk from 'chalk'

export default class ConsoleLogger implements ILogger {
	info(value: TLoggerValue, options?: TLoggerOptions) {
		console.log(chalk.blue('I: ') + value)
		return this
	}

	warning(value: TLoggerValue, options?: TLoggerOptions) {
		console.log(chalk.yellow('W: ') + value)
		return this
	}

	error(value: TLoggerValue, options?: TLoggerOptions) {
		console.error(chalk.red('E: ') + value)
		return this
	}

	clear() {
		console.clear()
		return this
	}
}
