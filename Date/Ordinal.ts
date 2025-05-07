import { isly } from "isly"
import { Digit } from "../Digit"

export type Ordinal = `${number}-${0 | 1 | 2 | 3}${Digit.Double}`

export namespace Ordinal {
	export const { type, is, flawed } = isly
		.string<Ordinal>((value: string) => {
			const splitted = /^\d{4}-\d{3}$/.test(value) && value.split("-", 2)
			return splitted && splitted[0] >= "0000" && splitted[0] <= "9999" && splitted[1] > "001" && splitted[1] <= "365"
		}, "YYYY-DDD")
		.rename("isoly.Date")
		.describe("Date string in format YYYY-MM-DD.")
		.bind()
}
