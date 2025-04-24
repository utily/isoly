import { isly } from "isly"
import { Month } from "Month"
import { Year } from "Year"
import { Digits as _Digits } from "./Digits"
import { Numeric as _Numeric } from "./Numeric"

export type Date = string

export namespace Date {
	export import Digits = _Digits
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Date>((value: string) => {
			const splitted = /^\d{4}-\d{2}-\d{2}$/.test(value) && value.split("-", 3)
			return (
				splitted &&
				Year.type.is(splitted[0]) &&
				Month.type.is(splitted[1]) &&
				Digits.type.is(splitted[2]) &&
				Month.Numeric.parse(`${splitted[0]}-${splitted[1]}`).length >= Number.parseInt(splitted[2])
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
	export function next(date: Date, days = 1): Date {
		return Numeric.parse(date).next(days).format()
	}
	export function previous(date: Date, days = 1): Date {
		return Numeric.parse(date).previous(days).format()
	}
	export function first(date: Date): Date {
		return `${date.substring(0, 8)}01` as Date
	}
	export function last(date: Date): Date {
		return `${date.substring(0, 8)}${Numeric.parse(date).length}` as Date
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
	export function getDays(date: Date): Date[] {
		return [...Array(Numeric.parse(date).length).keys()].map(
			day => `${date.substring(0, 8)}${(day + 1).toString().padStart(2, "0")}` as Date
		)
	}
}
