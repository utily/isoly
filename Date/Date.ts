import { isly } from "isly"
import { Month } from "../Month"
import { Year } from "../Year"
import { Digits as _Digits } from "./Digits"
import { Duration as _Duration } from "./Duration"
import { Interval as _Interval } from "./Interval"
import { Numeric as _Numeric } from "./Numeric"
import { Ordinal as _Ordinal } from "./Ordinal"

export type Date = `${number}-${number}-${number}`
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
				Number.parseInt(matched[3]) <= Month.parse(`${matched[1]}-${matched[2]}` as any as Month)?.length
			)
		}, "YYYY-MM-DD")
		.rename("isoly.Date")
		.describe("Date string in format YYYY-MM-DD.")
		.bind()
	export function parse(value: Date): Numeric
	export function parse(value: Date | string | undefined): Numeric | undefined
	export function parse(value: Date | string | undefined): Numeric | undefined {
		const result =
			value == undefined
				? undefined
				: (/^(\d{4})-(\d{2})-(\d{2})$/.exec(value) ?? /^(\d+)-(\d+)-(\d+)$/.exec(value))
						?.slice(1)
						.map(n => Number.parseInt(n))
		return result?.length == 3 && result.every(Number.isSafeInteger)
			? new Numeric(result[0], result[1] - 1, result[2] - 1)
			: undefined
	}
}
