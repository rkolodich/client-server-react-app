import { DAY_MS } from '#/constants/Time.js'
import { Response } from 'express'

export default function setRefreshToken(res: Response, refreshToken: string) {
	res.cookie('refreshToken', refreshToken, {
		maxAge: DAY_MS * 30,
		httpOnly: true,
	})
}
