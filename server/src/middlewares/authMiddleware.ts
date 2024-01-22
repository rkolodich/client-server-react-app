import { ApiError } from "#/errors/ApiError.js";
import tokenService from "#/services/TokenService.js";
import { NextFunction, Request, Response } from "express";

export default function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const authorizationHeader = req.headers.authorization

		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError())
		}

		const accessToken = authorizationHeader.split(' ')[1]
		if (!accessToken) {
			return next(ApiError.UnauthorizedError())
		}

		const userData = tokenService.validateAccessToken(accessToken)
		if (!userData) {
			return next(ApiError.UnauthorizedError())
		}

		next()
	} catch (e) {
		return next(ApiError.UnauthorizedError())
	}
}
