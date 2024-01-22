import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "#/constants/env.js"
import tokenModel from "#/models/TokenModel.js"
import userModel, { UserDocument } from "#/models/UserModel.js"
import jwt from "jsonwebtoken"
import { Schema } from "mongoose"

type Tokens = {
	accessToken: string,
	refreshToken: string,
}

class TokenService {
	generateTokens(payload: object): Tokens {
		const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET as string, {
			expiresIn: '1d',
		})
		const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET as string, {
			expiresIn: '30d',
		})

		return { accessToken, refreshToken }
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, JWT_ACCESS_SECRET as string)
			return userData as any;
		} catch (error) {
			return null
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, JWT_REFRESH_SECRET as string)
			return userData as any
		} catch (error) {
			return null
		}
	}

	async saveToken(userId: UserDocument['_id'], refreshToken: Tokens['refreshToken']) {
		const tokenData = await tokenModel.findOne({ user: userId })
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}

		const token = await tokenModel.create({ user: userId, refreshToken })
		return token
	}

	async removeToken(refreshToken: string) {
		await tokenModel.deleteOne({ refreshToken })
	}

	async findToken(refreshToken: string) {
		const tokenData = await tokenModel.findOne({ refreshToken })
		return tokenData
	}
}

export default new TokenService()
