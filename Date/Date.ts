import { isly } from "isly"
import { Month } from "../Month"
import { Year } from "../Year"
import { Digits as _Digits } from "./Digits"
import { Duration as _Duration } from "./Duration"
import { Interval as _Interval } from "./Interval"
import { Numeric as _Numeric } from "./Numeric"
import { Ordinal as _Ordinal } from "./Ordinal"

export type Date = `${number}-${Month.Digits}-${number}`
export namespace Date {
	export import Digits = _Digits
	export import Duration = _Duration
	export import Interval = _Interval
	export import Numeric = _Numeric
	export import Ordinal = _Ordinal
	export const { type, is, flawed } = isly
		.string<Date>(value => {
			const matched = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
			return (
				!!matched &&
				Year.type.is(matched[1]) &&
				Month.Digits.type.is(matched[2]) &&
				Digits.type.is(matched[3]) &&
				Number.parseInt(matched[3]) <= Month.Numeric.parse(`${matched[1]}-${matched[2]}`).length
			)
		}, "YYYY-MM-DD")
		.rename("isoly.Date")
		.describe("Date string in format YYYY-MM-DD.")
		.bind()
}
