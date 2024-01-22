import { ValidationError } from "express-validator";

export class CodeError extends Error {
	status: number
	logMessage: string

	constructor(status: number, message: string, logMessage: string) {
		super(message)
		this.status = status
		this.logMessage = message
	}

	static TypeConditionError(logMessage: string) {
		return new CodeError(400, 'Something is wrong on our side.', logMessage)
	}
}
