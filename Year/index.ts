import { isly } from "isly"
import type { Date } from "../Date"

export type Year = Date.Year

export namespace Year {
	export const { type, is, flawed } = isly
		.string<Year>(value => /^[0-9]{4}$/.test(value), "YYYY")
		.rename("isoly.Year")
		.describe("ISO 8601 year in the format YYYY.")
		.bind()

	export function now(): Year {
		return new globalThis.Date().getFullYear().toString().padStart(4, "0") as Year
	}
	export function from(date: Date): Year {
		return date.substring(0, 4) as Year
	}
	export function next(year: Year, years = 1): Year {
		return (Number.parseInt(year) + years).toString().padStart(4, "0") as Year
	}
	export function previous(year: Year, years = 1): Year {
		return next(year, -years)
	}
	export function first(year: Year): Date {
		return `${year}-01-01` as Date
	}
	export function last(year: Year): Date {
		return `${year}-12-31` as Date
	}
	export function getYear(year: Year): number {
		return Number.parseInt(year)
	}
	export function isLeapYear(year: Year | number): boolean {
		const y = typeof year == "number" ? year : Number.parseInt(year)
		return !!y && y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)
	}
	export function length(year: Year): 365 | 366 {
		return isLeapYear(year) ? 366 : 365
	}
}
