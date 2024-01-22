type ISODateString = string

export default function getISODate(date = new Date()): ISODateString {
	return date.toISOString().split('T')[0]
}
