import { CLIENT_URL, GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT_URL } from "#/constants/env.js"
import { authServer } from "#/enums/authServer.js"
import { ApiError } from "#/errors/ApiError.js"
import { CodeError } from "#/errors/CodeError.js"
import oauthService from "#/services/OAuthService.js"
import userService from "#/services/UserService.js"
import Logger from "#/utils/Logger/Logger.js"
import { Log } from "#/utils/Logger/index.js"
import { generatePassword } from "#/utils/String/index.js"
import { setRefreshToken as setRefreshTokenInCookie } from "#/utils/express/index.js"
import { Request, Response, NextFunction } from 'express'
import { google } from "googleapis"
import jwt from "jsonwebtoken"

const oauth2Client = new google.auth.OAuth2(
	GOOGLE_OAUTH_CLIENT_ID,
	GOOGLE_OAUTH_CLIENT_SECRET,
	GOOGLE_OAUTH_REDIRECT_URL,
)

class OAuthController {
	async googleAuthUrl(req: Request, res: Response, next: NextFunction) {
		try {
			const scopes = [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile'
			]

			const authorizationUrl = oauth2Client.generateAuthUrl({
				access_type: 'offline',
				include_granted_scopes: true,
				scope: scopes
			})

			res.redirect(authorizationUrl)
		}
		catch (e) {
			next(e)
		}
	}

	async googleAuthCallbackUrl(req: Request, res: Response, next: NextFunction) {
		try {
			const { code } = req.query
			const { tokens } = await oauth2Client.getToken(code as string)
			oauth2Client.setCredentials(tokens)

			const oid = jwt.decode(tokens.id_token as string)

			if (typeof oid === 'string' || oid === null) {
				const t = typeof oid === 'string' ? "'string'" : 'null'
				throw CodeError.TypeConditionError(`JWT token is ${t}`)
			}

			const { email, sub } = oid
			const [ userExists, oauthAssociated ] = await Promise.all([
				userService.existsWithEmail(email),
				oauthService.hasAssociate(authServer.google, String(sub))
			])

			let userData
			if (userExists && !oauthAssociated) {
				userData = await userService.loginDirectly(email)
				await oauthService.associate(userData.user.id, authServer.google, String(sub))
			}
			else if (!userExists) {
				userData = await userService.signup({
					email,
					name: oid.given_name,
					secondName: oid.family_name,
					avatar: oid?.avatar ?? '',
					password: generatePassword()
				}, {
					isActivated: true
				})
				await oauthService.associate(userData.user.id, authServer.google, String(sub))
			}
			else if (oauthAssociated) {
				userData = await userService.loginDirectly(email)
			}
			else {
				throw ApiError.BadRequestError('Something went wrong')
			}

			setRefreshTokenInCookie(res, userData.refreshToken)
			res.redirect(`${CLIENT_URL}/users/login`)
		}
		catch (e) {
			throw e
		}
	}
}

export default OAuthController
