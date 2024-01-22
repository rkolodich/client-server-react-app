import { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT_URL } from "#/constants/env.js"
import { google } from "googleapis"
import { Schema } from "mongoose"
import { authServer } from "../enums/authServer.js"
import oauthModel from "#/models/OAuthModel.js"
import { ApiError } from "#/errors/ApiError.js"
import { UserDocument } from "#/models/UserModel.js"

class OAuthService {
	private googleClient
	private googleUrl = ''

	constructor() {
		this.googleClient = new google.auth.OAuth2(
			GOOGLE_OAUTH_CLIENT_ID,
			GOOGLE_OAUTH_CLIENT_SECRET,
			GOOGLE_OAUTH_REDIRECT_URL,
		)
	}

	getGoogleClient() {
		return this.googleClient
	}

	getGoogleUrl(): string {
		if (this.googleUrl) {
			return this.googleUrl
		}

		const scopes = [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
		]

		this.googleUrl = this.googleClient.generateAuthUrl({
			access_type: 'offline',
			include_granted_scopes: true,
			scope: scopes
		})

		return this.googleUrl
	}

	async associate(
		user: UserDocument['_id'],
		authServer: authServer,
		sub: string
	) {
		try {
			const associated = await this.hasAssociate(authServer, sub)
			if (associated) {
				throw ApiError.BadRequestError('The user could not be authorized')
			}

			await oauthModel.create({
				user: user._id,
				authServer,
				sub
			})
		}
		catch (e) {
			throw e
		}
	}

	async hasAssociate(authServer: authServer, sub: string) {
		return await oauthModel.exists({ authServer, sub })
	}
}

export default new OAuthService()
