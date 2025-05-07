import { isly } from "isly"
import { Year } from "Year"
import type { Date } from "../Date/Date"
import { Digits as _Digits } from "./Digits"
import { Numeric as _Numeric } from "./Numeric"

export type Month = `${number}-${number}` // `${number}-${Month.Digits}`

export namespace Month {
	export import Digits = _Digits
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Month>(value => {
			const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value)
			return !!match && Year.is(match[1]) && Digits.is(match[2])
		}, "YYYY-MM")
		.rename("isoly.Month")
		.describe("ISO 8601 month in the format YYYY-MM.")
		.bind()
	export function parse(value: Month): Numeric
	export function parse(value: Month | string | undefined): Numeric | undefined
	export function parse(value: Month | string | undefined): Numeric | undefined {
		const parsed =
			typeof value == "string"
				? ([Number.parseInt(value.substring(0, 4)), Number.parseInt(value.substring(5, 7)) - 1] as const)
				: value == undefined
				? ([undefined, undefined] as const)
				: undefined
		return parsed && new Numeric(parsed[0], parsed[1])
	}
	export function from(value: Date | Numeric | Month | string | undefined): Month | undefined {
		return value == undefined ? undefined : (typeof value == "string" ? parse(value) : Numeric.create(value))?.format()
	}
	export function now(): Month {
		return Numeric.now().format()
	}
	export function next(month: Month, months = 1): Month {
		return parse(month).next(months).format()
	}
	export function previous(month: Month, months = 1): Month {
		return parse(month).previous(months).format()
	}
	export function first(month: Month): Date {
		return getDay(month, 0)
	}
	export function last(month: Month): Date {
		return getDay(month, length(month) - 1)
	}
	export function getYear(month: Month): number {
		return Number.parseInt(month.substring(0, 4))
	}
	export function getMonth(month: Month): number {
		return Number.parseInt(month.substring(5, 7))
	}
	export function length(month: Month): 28 | 29 | 30 | 31 {
		return parse(month).length
	}
	export function getDay(month: Month, day: number): Date {
		return `${month}-${(day + 1).toString().padStart(2, "0")}` as Date
	}
	export function getDays(month: Month): Date[] {
		return [...Array(length(month)).keys()].map(day => getDay(month, day))
	}
}
