import { isly } from "isly"
import { Numeric as NumericClass } from "./Numeric"
import type { Date } from "../Date"

export type Year = Date.Year

export namespace Year {
	export const { type, is, flawed } = isly
		.string<Year>(value => /^[0-9]{4}$/.test(value), "YYYY")
		.rename("isoly.Year")
		.describe("ISO 8601 year in the format YYYY.")
		.bind()
	export const Numeric = NumericClass
	export function now(): Year {
		return Numeric.now().toString() as Year
	}
	export function from(date: Date): Year {
		return date.substring(0, 4) as Year
	}
	export function next(year: Year, years = 1): Year {
		return (Numeric.from(year).valueOf() + years).toString().padStart(4, "0") as Year
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
		return Numeric.from(year).valueOf()
	}
	export function isLeapYear(year: Year | number): boolean {
		return Numeric.isLeapYear(year)
	}
	export function length(year: Year): 365 | 366 {
		return isLeapYear(year) ? 366 : 365
	}
}
