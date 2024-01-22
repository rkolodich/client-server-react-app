import { ApiError } from "#/errors/ApiError.js";
import { NextFunction, Request, Response } from "express";

export default function errorMiddleware(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log(err)
	if (err instanceof ApiError) {
		return res.status(err.status).json({
			message: err.message,
			errors: err.errors
		})
	}

	return res.status(500).json({
		message: 'Непредвиденная ошибка'
	})
}
