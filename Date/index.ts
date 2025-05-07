import { isly } from "isly"
import { Month } from "../Month"
import { Year } from "../Year"
import { Digits as _Digits } from "./Digits"
import { Duration as _Duration } from "./Duration"
import { Numeric as _Numeric } from "./Numeric"
import { Ordinal as _Ordinal } from "./Ordinal"

export type Date = `${number}-${Month.Digits}-${number}`
export namespace Date {
	export import Digits = _Digits
	export import Duration = _Duration
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
	export function now(): Date {
		return Numeric.now().format()
	}
	export function from(value: globalThis.Date | Date | Numeric | string | number | undefined): Date {
		return Numeric.parse(value).format()
	}
	export function next(date: Date, increment: Numeric.Value = { days: 1 }): Date {
		return Numeric.parse(date).next(increment).format()
	}
	export function previous(date: Date, decrement: Numeric.Value = { days: 1 }): Date {
		return Numeric.parse(date).previous(decrement).format()
	}
	export function first(date: Date): Date {
		return `${date.substring(0, 8)}01` as Date
	}
	export function last(date: Date): Date {
		return `${date.substring(0, 8)}${Numeric.parse(date).month.length}` as Date
	}
	export function getYear(date: Date): number {
		return Number.parseInt(date.substring(0, 4))
	}
	export function getMonth(date: Date): number {
		return Number.parseInt(date.substring(5, 7))
	}
	export function getDay(date: Date): number {
		return Number.parseInt(date.substring(8, 10))
	}
}
