import userModel, { UserDocument } from "#/models/UserModel.js"
import bcrypt from "bcrypt"
import { v4 } from "uuid"
import emailService from "./EmailService.js"
import tokenService from "./TokenService.js"
import UserDto from "#/dtos/UserDto.js"
import { ApiError } from "#/errors/ApiError.js"
import { API_URL } from "#/constants/env.js"
import userActivationModel from "#/models/UserActivationModel.js"
import Logger from "#/utils/Logger/Logger.js"

class UserService {
	async signup(
		data: {
			email: string,
			password: string,
			name: string,
			secondName: string
			avatar?: string
		},
		options: {
			isActivated: boolean
		} = {
			isActivated: false
		}
	) {
		const { email, password, name, secondName } = data
		const { isActivated } = options

		const candidate = await userModel.findOne({ email })
		if (candidate) {
			throw ApiError.BadRequestError(`User exists with same email ${email}`)
		}

		const hashPassword = await bcrypt.hash(password, 5)
		const user = await userModel.create({
			email,
			password: hashPassword,
			name,
			secondName,
			isActivated
		})

		if (!isActivated) {
			this.sendActivationMail(user)
		}

		return this.getUserDataWithTokens(user)
	}

	async login(email: string, password: string) {
		const user = await userModel.findOne({ email })
		if (!user) {
			// Logger.with('fs').error({user, email}, { json: true })
			throw ApiError.BadRequestError('The user with such an email was not found')
		}

		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) {
			throw ApiError.BadRequestError('Wrong password')
		}

		return this.getUserDataWithTokens(user)
	}

	async loginDirectly(email: string) {
		const user = await userModel.findOne({ email })
		if (!user) {
			throw ApiError.BadRequestError('The user with such an email was not found')
		}

		return this.getUserDataWithTokens(user)
	}

	async logout(refreshToken: string) {
		await tokenService.removeToken(refreshToken)
	}

	async activate(activationLink: string) {
		const activation = await userActivationModel.findOne({ activationLink })
		if (!activation) {
			throw ApiError.BadRequestError(`Activation link is wrong ${activationLink}`)
		}

		const user = await userModel.findOne({ _id: activation.user })
		if (!user) {
			throw ApiError.BadRequestError('User for activation don\'t exist')
		}

		user.isActivated = true

		await Promise.all([
			userActivationModel.deleteOne({ _id: activation._id }),
			user.save()
		])
	}

	async refresh(refreshToken?: string) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}

		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDB = await tokenService.findToken(refreshToken)
		if (!userData || !tokenFromDB) {
			throw ApiError.UnauthorizedError()
		}

		const user = await userModel.findById(userData.id)
		if (!user) {
			throw ApiError.UnauthorizedError()
		}

		// TODO проверку времени

		return this.getUserDataWithTokens(user)
	}

	async existsWithEmail(email: string) {
		return await userModel.exists({ email })
	}

	async getAllUsers() {
		return []
	}

	private async sendActivationMail(user: UserDocument) {
		const { email, _id } = user
		const activationLink = v4()
		const link = `${API_URL}/api/activate/${activationLink}`
		emailService.sendActivationMail(email, link)

		// TODO expires time
		await userActivationModel.create({
			activationLink,
			user: _id,
			expires: new Date()
		})
	}

	private async getUserDataWithTokens(user: UserDocument) {
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(user._id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}
}

export default new UserService()
