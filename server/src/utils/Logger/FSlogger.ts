import { ILogger, TLoggerOptions, TLoggerValue } from "./types.js"
import { cwd } from 'process'
import { join } from 'path'
import fs from 'fs'


const ROOT_PATH = cwd()

const INFO_LOG_PATH = join(ROOT_PATH, 'logs/info/')
const WARNING_LOG_DIR = join(ROOT_PATH, 'logs/warning/')
const ERROR_LOG_DIR = join(ROOT_PATH, 'logs/error/')

export default class FSLogger implements ILogger {
	info(value: TLoggerValue, options?: TLoggerOptions) {
		return this.write(INFO_LOG_PATH, value, options)
	}

	warning(value: TLoggerValue, options?: TLoggerOptions) {
		return this.write(WARNING_LOG_DIR, value, options)
	}

	error(value: TLoggerValue, options?: TLoggerOptions) {
		return this.write(ERROR_LOG_DIR, value, options)
	}

	clear() {
		return this
			.clearInfo()
			.clearWarning()
			.clearError()
	}

	clearInfo(date?: string) {
		this.remove(INFO_LOG_PATH, date)
		return this
	}

	clearWarning(date?: string) {
		this.remove(WARNING_LOG_DIR, date)
		return this
	}

	clearError(date?: string) {
		this.remove(ERROR_LOG_DIR, date)
		return this
	}

	private write(dir: string, value: TLoggerValue, options?: TLoggerOptions) {
		const { date, time } = this.getDateTime()
		const path = join(dir, date)
		const { json } = options || {}

		if (value === null) {
			value = 'null'
		}
		else if (value === undefined) {
			value = 'undefined'
		}
		else if (json) {
			value = '\n' + JSON.stringify(json, null, '\t')
		}
		else if (typeof value === 'object') {
			value = value.toString()
		}

		value = `${time}: ${value}\n`

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		fs.appendFileSync(path, value)

		return this
	}

	private remove(dir: string, date?: string) {
		if (date) {
			const path = join(dir, date)

			if (fs.existsSync(path)) {
				fs.unlinkSync(path)
			}
		}
		else {
			fs.rmSync(dir, { recursive: true, force: true });
		}
	}

	private getDateTime() {
		const [date, time] = new Date().toISOString().split('T')
		return {
			date,
			time: time.split('.')[0]
		}
	}
}
