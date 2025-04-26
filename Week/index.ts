import { isly } from "isly"
import { Digits as _Digits } from "./Digits"
import { Numeric as _Numeric } from "./Numeric"

export type Week = `${number}-W${Week.Digits}`

export namespace Week {
	export import Digits = _Digits
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Week>("value", /^\d{4}-W\d{2}$/)
		.rename("isoly.Week")
		.describe("An ISO 8601 week date, formatted as YYYY-Www, where YYYY is the year and ww is the week number (01-53).")
		.bind()
	export function now(): Week {
		return Numeric.now().format()
	}
	export function parse(value: globalThis.Date | Numeric.Value | number | Week | string | undefined): Week {
		return Numeric.parse(value).format()
	}
	export function next(week: Week, weeks = 1): Week {
		return Numeric.parse(week).next(weeks).format()
	}
	export function previous(week: Week, weeks = 1): Week {
		return Numeric.parse(week).previous(weeks).format()
	}
	export function getYear(week: Week): number {
		return Number.parseInt(week.substring(0, 4))
	}
	export function getMonth(week: Week): number {
		return Number.parseInt(week.substring(6, 8))
	}
}
