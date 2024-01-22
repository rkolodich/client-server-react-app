import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "#/constants/env.js"
import nodemailer, { Transport } from "nodemailer"

class MailService {
	transporter: ReturnType<typeof nodemailer.createTransport>

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: SMTP_PORT,
			secure: false,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASSWORD
			}
		})
	}

	async sendActivationMail(to: string, link: string) {
		await this.transporter.sendMail({
			from: SMTP_USER,
			to,
			subject: 'Account activation',
			text: '',
			html: `
				<div>
					Activate account with <a href="${link}">link<a>
				</div>
			`
		})
	}
}

export default new MailService()
