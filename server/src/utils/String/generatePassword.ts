import generator from 'generate-password'

export default function generatePassword() {
	return generator.generate({
		length: 32,
		numbers: true,
		symbols: true,
		uppercase: true,
		lowercase: true
	})
}
