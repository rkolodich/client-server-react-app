import { DAY_MS } from '#/constants/Time.js'
import { CLIENT_URL } from '#/constants/env.js'
import { ApiError } from '#/errors/ApiError.js'
import userService from '#/services/UserService.js'
import {
	clearRefreshToken as clearRefreshTokenFromCookie,
	setRefreshToken as setRefreshTokenInCookie
} from '#/utils/express/index.js'
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

class UserController {
	async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequestError('Ошибка валидации', errors.array()))
			}

			const { email, password, name, secondName } = req.body
			const userData = await userService.signup({ email, password, name, secondName })
			setRefreshTokenInCookie(res, userData.refreshToken)

			return res.json(userData)
		}
		catch (e) {
			next(e)
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body
			const userData = await userService.login(email, password)
			setRefreshTokenInCookie(res, userData.refreshToken)

			return res.json(userData)
		}
		catch (e) {
			next(e)
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies
			await userService.logout(refreshToken)
			clearRefreshTokenFromCookie(res)

			return res.status(200).send()
		}
		catch (e) {
			next(e)
		}
	}

	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)
			return res.redirect(CLIENT_URL)
		}
		catch (e) {
			next(e)
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies
			const userData = await userService.refresh(refreshToken)
			setRefreshTokenInCookie(res, userData.refreshToken)

			return res.json(userData)
		}
		catch (e) {
			next(e)
		}
	}

	async getUsers(req: Request, res: Response, next: NextFunction) {
		return res.json([1,2,3])
	}
}

export default UserController
