import { DAY_MS } from '#/constants/Time.js'
import { Response } from 'express'

export default function clearRefreshToken(res: Response) {
	res.clearCookie('refreshToken')
}
