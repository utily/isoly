import { isly } from "isly"

export type Date = string

export namespace Date {
	export const { type, is, flawed } = isly
		.string<Date>((value: string) => {
			const splitted = /^\d{4}-\d{2}-\d{2}$/.test(value) && value.split("-", 3)
			return (
				splitted &&
				Date.Year.type.is(splitted[0]) &&
				Date.Month.type.is(splitted[1]) &&
				Date.Day.type.is(splitted[2]) &&
				Date.Month.length(splitted[1], splitted[0]) >= Date.Day.Numeric.parse(splitted[2])
			)
		}, "YYYY-MM-DD")
		.rename("isoly.Date")
		.describe("Date string in format YYYY-MM-DD.")
		.bind()
}
