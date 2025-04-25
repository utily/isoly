import { isly } from "isly"
import { Year } from "Year"
import { Date } from "../Date"
import { Digits as _Digits } from "./Digits"
import { Numeric as _Numeric } from "./Numeric"

export type Month =
	| `${Year}-${"01" | "02" | "03" | "04" | "05" | "06"}`
	| `${Year}-${"07" | "08" | "09" | "10" | "11" | "12"}`

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

	export function now(): Month {
		return Numeric.now().format()
	}
	export function from(date: Date): Month {
		return date.substring(0, 7) as Month
	}
	export function next(month: Month, months = 1): Month {
		return Numeric.parse(month).next(months).format()
	}
	export function previous(month: Month, months = 1): Month {
		return Numeric.parse(month).previous(months).format()
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
		return Numeric.parse(month).length
	}
	export function getDay(month: Month, day: number): Date {
		return `${month}-${(day + 1).toString().padStart(2, "0")}`
	}
	export function getDays(month: Month): Date[] {
		return [...Array(length(month)).keys()].map(day => getDay(month, day))
	}
}
